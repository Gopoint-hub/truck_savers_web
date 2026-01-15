import BlogArticleTemplate from '@/components/templates/BlogArticleTemplate';

export default function InspeccionCargaArticle() {
  const articleData = {
    title: "Inspección de carga diaria: Guía del trokero",
    subtitle: "Todo lo que necesitas saber sobre la inspección de carga diaria para cumplir con las regulaciones DOT y mantener la seguridad en la carretera.",
    heroImage: "/images/mecanico-inspeccion-carga-diario-guia-trokero.jpg",
    category: "Seguridad",
    date: "30 de diciembre, 2025",
    readTime: "8 min",
    relatedArticles: [
      {
        slug: "significado-luces-tablero",
        title: "Luces del tablero: ¿Qué te está diciendo tu troca?",
        image: "/images/significado-luces-tablero-camion-2.jpg",
      },
      {
        slug: "sistema-enfriamiento",
        title: "¡Que no se caliente! Cuida el sistema de enfriamiento",
        image: "/images/mecanico-mantenimiento-sistema-enfriamiento-camiones-diesel.jpg",
      },
    ],
    content: (
      <>
        <p>
          La inspección de carga diaria no es solo un requisito legal - es tu primera línea 
          de defensa contra accidentes, multas y problemas en la carretera. Como trokero, 
          realizar una inspección completa antes de cada viaje puede ser la diferencia entre 
          un día productivo y un día de problemas.
        </p>

        <h2>¿Por qué es importante la inspección diaria?</h2>
        <p>
          Las regulaciones del DOT (Department of Transportation) requieren que los conductores 
          comerciales realicen una inspección pre-viaje antes de operar el vehículo. Pero más 
          allá de las regulaciones, hay razones prácticas:
        </p>
        <ul>
          <li><strong>Seguridad:</strong> Detectar problemas antes de que causen accidentes</li>
          <li><strong>Ahorro:</strong> Identificar problemas pequeños antes de que se vuelvan costosos</li>
          <li><strong>Cumplimiento:</strong> Evitar multas y violaciones del DOT</li>
          <li><strong>Eficiencia:</strong> Reducir tiempo perdido por descomposturas en ruta</li>
        </ul>

        <h2>Lista de verificación pre-viaje</h2>
        <p>
          Una inspección completa debe cubrir estas áreas:
        </p>

        <h3>1. Documentos y equipo de seguridad</h3>
        <ul>
          <li>Licencia de conducir comercial (CDL) vigente</li>
          <li>Registro del vehículo</li>
          <li>Prueba de seguro</li>
          <li>Permisos necesarios</li>
          <li>Triángulos reflectantes</li>
          <li>Extintor de incendios</li>
          <li>Botiquín de primeros auxilios</li>
        </ul>

        <h3>2. Exterior del vehículo</h3>
        <ul>
          <li><strong>Luces:</strong> Todas funcionando (delanteras, traseras, direccionales, frenos)</li>
          <li><strong>Llantas:</strong> Presión adecuada, profundidad de banda, sin daños</li>
          <li><strong>Espejos:</strong> Limpios y bien ajustados</li>
          <li><strong>Parabrisas:</strong> Sin grietas que obstruyan la visión</li>
          <li><strong>Limpiadores:</strong> Funcionando correctamente</li>
          <li><strong>Tanques de combustible:</strong> Tapas seguras, sin fugas</li>
        </ul>

        <h3>3. Bajo el capó</h3>
        <ul>
          <li><strong>Nivel de aceite:</strong> Entre las marcas de mínimo y máximo</li>
          <li><strong>Refrigerante:</strong> Nivel adecuado</li>
          <li><strong>Líquido de dirección:</strong> Nivel correcto</li>
          <li><strong>Bandas y mangueras:</strong> Sin grietas ni desgaste</li>
          <li><strong>Batería:</strong> Conexiones limpias y seguras</li>
        </ul>

        <h3>4. Sistema de frenos</h3>
        <ul>
          <li><strong>Presión de aire:</strong> Debe alcanzar 100-120 psi</li>
          <li><strong>Prueba de fuga:</strong> No más de 3 psi de pérdida por minuto</li>
          <li><strong>Freno de estacionamiento:</strong> Funcionando correctamente</li>
          <li><strong>Indicadores de desgaste:</strong> Verificar pastillas y tambores</li>
        </ul>

        <h3>5. Acoplamiento (si aplica)</h3>
        <ul>
          <li><strong>Quinta rueda:</strong> Enganchada y asegurada</li>
          <li><strong>Patas del trailer:</strong> Completamente levantadas</li>
          <li><strong>Conexiones eléctricas:</strong> Bien conectadas</li>
          <li><strong>Líneas de aire:</strong> Sin fugas, bien conectadas</li>
        </ul>

        <h3>6. Carga</h3>
        <ul>
          <li><strong>Peso:</strong> Dentro de los límites legales</li>
          <li><strong>Distribución:</strong> Balanceada correctamente</li>
          <li><strong>Aseguramiento:</strong> Cadenas, correas o cables en buen estado</li>
          <li><strong>Puertas:</strong> Cerradas y aseguradas</li>
        </ul>

        <h2>Inspección post-viaje</h2>
        <p>
          Al final de cada día, también debes realizar una inspección post-viaje y reportar 
          cualquier defecto encontrado. Esto incluye:
        </p>
        <ul>
          <li>Problemas de frenos</li>
          <li>Problemas de dirección</li>
          <li>Luces que no funcionan</li>
          <li>Llantas dañadas</li>
          <li>Cualquier otro defecto que afecte la seguridad</li>
        </ul>

        <h2>Consecuencias de no inspeccionar</h2>
        <p>
          Ignorar la inspección diaria puede resultar en:
        </p>
        <ul>
          <li><strong>Multas del DOT:</strong> Desde $100 hasta $16,000 por violación</li>
          <li><strong>Puntos en tu CSA score:</strong> Afecta tu empleabilidad</li>
          <li><strong>Fuera de servicio:</strong> El oficial puede prohibirte continuar</li>
          <li><strong>Accidentes:</strong> Responsabilidad legal y personal</li>
          <li><strong>Pérdida de empleo:</strong> Muchas compañías tienen políticas estrictas</li>
        </ul>

        <h2>Nuestra inspección "La Bailada"</h2>
        <p>
          En <strong>The Truck Savers</strong> ofrecemos nuestra famosa inspección 
          <strong> "La Bailada"</strong> - una inspección mecánica completa de más de 100 puntos 
          que va más allá de la inspección básica. Nuestro simulador de carretera detecta 
          problemas que no se ven a simple vista.
        </p>

        <blockquote>
          "La inspección diaria no es una pérdida de tiempo - es una inversión en tu seguridad, 
          tu licencia y tu sustento. 15 minutos pueden ahorrarte horas de problemas."
        </blockquote>

        <h2>Conclusión</h2>
        <p>
          La inspección de carga diaria es una responsabilidad que todo trokero profesional 
          debe tomar en serio. No solo es la ley, es sentido común. Si necesitas ayuda para 
          mantener tu camión en condiciones óptimas, <strong>contáctanos</strong>. Nuestro 
          equipo está listo para ayudarte a mantener tu troca segura y en cumplimiento.
        </p>
      </>
    ),
  };

  return <BlogArticleTemplate {...articleData} />;
}
