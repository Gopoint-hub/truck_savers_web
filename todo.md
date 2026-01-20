## CMS Backend - Módulos de Marketing

- [x] Crear esquema de base de datos para pendientes, metas y objetivos
- [x] Crear esquema de base de datos para newsletter y suscriptores
- [x] Crear esquema de base de datos para gestión de usuarios/roles del CMS
- [x] Crear ruta /cms para acceso al panel de administración
- [x] Crear módulo de pendientes con CRUD completo
- [x] Crear módulo de metas/objetivos con CRUD completo
- [x] Crear dashboard con métricas de pendientes y metas
- [x] Crear módulo de newsletter con envío de correos
- [x] Crear módulo de base de datos de clientes/suscriptores
- [x] Crear módulo de gestión de usuarios administradores
- [x] Importar datos del Excel de pendientes
- [ ] Configurar servicio de envío de emails para newsletter


## Rediseño CMS - Tema Claro y Mobile
- [x] Cambiar tema del CMS a colores claros (fondo blanco)
- [x] Reducir tamaños de fuente en desktop
- [x] Optimizar navegación para móvil
- [x] Mejorar usabilidad del sidebar en móvil
- [x] Corregir redirección después del login para volver al CMS

## Corrección OAuth
- [x] Corregir error "code and state are required" en OAuth callback
- [x] Agregar sebastian@gopointagency.com como administrador

## Corrección Mobile CMS
- [x] Corregir desbordamiento de contenido en móvil (Dashboard)
- [x] Ajustar textos largos para que no se salgan del viewport

## Corrección UI Mobile CMS - Fase 2
- [x] Corregir desbordamiento en página Tasks en móvil
- [x] Corregir línea negra y bordes cortados en móvil
- [x] Hacer que el menú se cierre automáticamente al seleccionar módulo en móvil

## Mejoras Tasks CMS
- [x] Agregar colores diferenciados por status en lista de tareas
- [x] Crear vista Kanban estilo Pipedrive con columnas por status
- [x] Permitir cambiar entre vista lista y vista Kanban

## Mejoras Módulo Usuarios
- [x] Agregar funcionalidad para crear usuarios manualmente
- [x] Agregar Jorge@thetrucksavers.com como administrador

## Asignación de Pendientes
- [x] Agregar selector para asignar pendientes a usuarios del CMS
- [x] Agregar filtro por usuario asignado en lista y Kanban
- [x] Mostrar avatar y nombre del usuario asignado en cada tarea

## Mejoras UI CMS - Prioridad y Colores
- [x] Agregar selector de prioridad editable en cada tarea
- [x] Optimizar colores de texto en el CMS para mejor contraste y legibilidad

## Corrección Layout Desktop CMS
- [x] Corregir layout del Dashboard en versión desktop (tarjetas de estadísticas, listas de tareas)

## Sistema Kanban para Tareas
- [x] Agregar nuevo status 'esperando_respuesta' al esquema de base de datos
- [x] Convertir vista de tareas a Kanban como vista principal
- [x] Crear columnas: Pendiente, En Progreso, Esperando Respuesta, Completada
- [x] Implementar drag & drop para mover tareas entre columnas
- [x] Eliminar vista de lista, dejar solo Kanban

## Sistema de Autenticación CMS
- [ ] Revisar problema de acceso denegado para usuarios existentes
- [ ] Agregar campo de contraseña hash al esquema de usuarios
- [ ] Crear página de login con email/contraseña para CMS
- [ ] Implementar endpoint de autenticación con email/contraseña
- [ ] Implementar recuperación de contraseña por email
- [ ] Crear página para restablecer contraseña

## Reestructuración CMS - 4 Áreas
- [x] Crear esquema de base de datos para Checklist SEO
- [x] Crear esquema de base de datos para Roadmap del Proyecto
- [x] Crear endpoints tRPC para Checklist SEO y Roadmap
- [x] Reorganizar sidebar en 4 áreas: Proyecto, Negocio, Operaciones, Marketing
- [x] Crear página de Checklist SEO con items agrupados por área
- [x] Crear página de Roadmap con etapas y entregables
- [x] Renombrar "Metas y Objetivos" a "Objetivos Comerciales"
- [x] Importar datos del Checklist SEO desde el Excel
- [ ] Importar datos del Roadmap desde el Excel (pendiente: usuario debe agregar etapas manualmente)
