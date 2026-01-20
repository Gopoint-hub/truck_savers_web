import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL no está configurada');
  process.exit(1);
}

// Leer los datos del JSON
const data = JSON.parse(fs.readFileSync('/home/ubuntu/excel_data.json', 'utf-8'));

// Mapear prioridades del Excel a las del CMS
function mapPriority(priority) {
  if (!priority) return 'media';
  const p = priority.toString().toLowerCase().trim();
  if (p.includes('alta')) return 'alta';
  if (p.includes('baja')) return 'baja';
  return 'media';
}

// Mapear ubicaciones
function mapLocation(ubicacion) {
  if (!ubicacion) return null;
  const u = ubicacion.toString().toLowerCase();
  if (u.includes('houston')) return 'Houston, TX';
  if (u.includes('dallas')) return 'Dallas, TX';
  if (u.includes('monterrey')) return 'Monterrey, NL';
  return null;
}

// Mapear línea de negocio
function mapBusinessLine(linea) {
  if (!linea) return null;
  const l = linea.toString().toLowerCase();
  if (l.includes('servicio')) return 'Servicios';
  if (l.includes('producto') || l.includes('ecommerce')) return 'E-commerce';
  if (l.includes('apu')) return 'APU Go Green';
  return null;
}

async function importData() {
  const connection = await mysql.createConnection(DATABASE_URL);
  
  try {
    console.log('Conectado a la base de datos');
    
    // 1. Insertar líneas de negocio
    console.log('\n=== Insertando líneas de negocio ===');
    const businessLines = [
      { name: 'Servicios', description: 'Servicios de taller mecánico' },
      { name: 'E-commerce', description: 'Venta de productos en línea' },
      { name: 'APU Go Green', description: 'Unidades de potencia auxiliar' }
    ];
    
    for (const bl of businessLines) {
      try {
        await connection.execute(
          'INSERT INTO business_lines (name, description) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=name',
          [bl.name, bl.description]
        );
        console.log(`  ✓ Línea de negocio: ${bl.name}`);
      } catch (e) {
        console.log(`  - Línea de negocio ${bl.name}: ${e.message}`);
      }
    }
    
    // 2. Insertar ubicaciones
    console.log('\n=== Insertando ubicaciones ===');
    const locations = [
      { name: 'Houston, TX', state: 'TX', country: 'USA' },
      { name: 'Dallas, TX', state: 'TX', country: 'USA' },
      { name: 'Monterrey, NL', state: 'NL', country: 'Mexico' }
    ];
    
    for (const loc of locations) {
      try {
        await connection.execute(
          'INSERT INTO locations (name, state, country) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=name',
          [loc.name, loc.state, loc.country]
        );
        console.log(`  ✓ Ubicación: ${loc.name}`);
      } catch (e) {
        console.log(`  - Ubicación ${loc.name}: ${e.message}`);
      }
    }
    
    // 3. Insertar categorías de tareas
    console.log('\n=== Insertando categorías de tareas ===');
    const categories = [
      { name: 'Marketing', color: '#3B82F6' },
      { name: 'Analítica', color: '#8B5CF6' },
      { name: 'Web', color: '#10B981' },
      { name: 'Ventas', color: '#F59E0B' },
      { name: 'Reportes', color: '#6B7280' },
      { name: 'General', color: '#368A45' }
    ];
    
    for (const cat of categories) {
      try {
        await connection.execute(
          'INSERT INTO task_categories (name, color) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=name',
          [cat.name, cat.color]
        );
        console.log(`  ✓ Categoría: ${cat.name}`);
      } catch (e) {
        console.log(`  - Categoría ${cat.name}: ${e.message}`);
      }
    }
    
    // Obtener IDs de ubicaciones, líneas de negocio y categorías
    const [blRows] = await connection.execute('SELECT id, name FROM business_lines');
    const [locRows] = await connection.execute('SELECT id, name FROM locations');
    const [catRows] = await connection.execute('SELECT id, name FROM task_categories');
    
    const blMap = {};
    blRows.forEach(row => { blMap[row.name] = row.id; });
    
    const locMap = {};
    locRows.forEach(row => { locMap[row.name] = row.id; });
    
    const catMap = {};
    catRows.forEach(row => { catMap[row.name.toLowerCase()] = row.id; });
    
    console.log('Líneas de negocio:', blMap);
    console.log('Ubicaciones:', locMap);
    console.log('Categorías:', catMap);
    
    // 4. Insertar objetivos comerciales
    console.log('\n=== Insertando objetivos comerciales ===');
    let objectivesCount = 0;
    
    for (const obj of data.objetivos) {
      const blName = mapBusinessLine(obj.linea_negocio);
      const locName = mapLocation(obj.ubicacion);
      
      const businessLineId = blName ? blMap[blName] : null;
      const locationId = locName ? locMap[locName] : null;
      
      // Parsear la meta (ej: "150 / mes" -> targetNumeric: 150)
      let targetNumeric = null;
      if (obj.meta) {
        const metaStr = obj.meta.toString();
        const match = metaStr.match(/(\d+)/);
        if (match) {
          targetNumeric = parseInt(match[1]);
        }
      }
      
      try {
        await connection.execute(
          `INSERT INTO objectives (businessLineId, locationId, serviceProduct, targetValue, targetNumeric, period, currentProgress, isActive) 
           VALUES (?, ?, ?, ?, ?, 'monthly', 0, 1)`,
          [
            businessLineId,
            locationId,
            obj.servicio_producto,
            obj.meta || 'Por definir',
            targetNumeric
          ]
        );
        objectivesCount++;
        console.log(`  ✓ Objetivo: ${obj.servicio_producto}`);
      } catch (e) {
        console.log(`  ✗ Error en objetivo ${obj.servicio_producto}: ${e.message}`);
      }
    }
    console.log(`Total objetivos insertados: ${objectivesCount}`);
    
    // 5. Insertar tareas/pendientes
    console.log('\n=== Insertando tareas/pendientes ===');
    let tasksCount = 0;
    
    // Mapear categorías del Excel
    function getCategoryId(categoria) {
      if (!categoria) return catMap['general'];
      const c = categoria.toString().toLowerCase().trim();
      if (c.includes('marketing')) return catMap['marketing'];
      if (c.includes('analitica') || c.includes('analítica')) return catMap['analítica'];
      if (c.includes('web')) return catMap['web'];
      if (c.includes('ventas')) return catMap['ventas'];
      if (c.includes('reportes')) return catMap['reportes'];
      return catMap['general'];
    }
    
    for (const pend of data.pendientes) {
      const locName = mapLocation(pend.ubicacion);
      const locationId = locName ? locMap[locName] : null;
      const categoryId = getCategoryId(pend.categoria);
      
      try {
        await connection.execute(
          `INSERT INTO tasks (title, description, status, priority, categoryId, locationId) 
           VALUES (?, ?, 'pendiente', ?, ?, ?)`,
          [
            pend.pendiente.substring(0, 500), // Título (máx 500 chars según schema)
            pend.pendiente, // Descripción completa
            mapPriority(pend.prioridad),
            categoryId,
            locationId
          ]
        );
        tasksCount++;
      } catch (e) {
        console.log(`  ✗ Error en tarea: ${e.message}`);
      }
    }
    console.log(`Total tareas insertadas: ${tasksCount}`);
    
    // 6. Insertar checklist SEO
    console.log('\n=== Insertando checklist SEO ===');
    let checklistCount = 0;
    
    for (const item of data.checklist) {
      const status = item.estado?.toLowerCase() === 'ok' ? 'completado' : 'pendiente';
      
      try {
        await connection.execute(
          `INSERT INTO seo_checklist (area, item, status) VALUES (?, ?, ?)`,
          [
            item.area || 'General',
            item.item,
            status
          ]
        );
        checklistCount++;
      } catch (e) {
        console.log(`  ✗ Error en checklist: ${e.message}`);
      }
    }
    console.log(`Total items checklist insertados: ${checklistCount}`);
    
    console.log('\n=== IMPORTACIÓN COMPLETADA ===');
    console.log(`- Objetivos: ${objectivesCount}`);
    console.log(`- Tareas: ${tasksCount}`);
    console.log(`- Checklist SEO: ${checklistCount}`);
    
  } catch (error) {
    console.error('Error durante la importación:', error);
  } finally {
    await connection.end();
  }
}

importData();
