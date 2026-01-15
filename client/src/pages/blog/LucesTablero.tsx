import BlogArticleTemplate from '@/components/templates/BlogArticleTemplate';

export default function LucesTableroArticle() {
  const articleData = {
    title: "Luces del tablero: ¿Qué te está diciendo tu troca?",
    subtitle: "Guía completa sobre el significado de las luces de advertencia en tu camión. Aprende a identificar problemas antes de que se conviertan en costosas reparaciones.",
    heroImage: "/images/significado-luces-tablero-camion-2.jpg",
    category: "Mantenimiento",
    date: "30 de diciembre, 2025",
    readTime: "7 min",
    relatedArticles: [
      {
        slug: "go-green-apu-ahorro-diesel",
        title: "Go Green APU: ¿Por qué te ahorra tanto diésel?",
        image: "/images/go-green-apu-ahorro-diesel-camiones-2.jpg",
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
          Las luces del tablero de tu camión son como un sistema de comunicación entre tu vehículo 
          y tú. Cuando se enciende una luz, tu troca te está diciendo algo importante. Ignorar 
          estas señales puede resultar en <strong>reparaciones costosas</strong> o incluso en 
          situaciones peligrosas en la carretera.
        </p>

        <h2>Luces Rojas: ¡Detente inmediatamente!</h2>
        <p>
          Las luces rojas indican problemas críticos que requieren atención inmediata. Si ves 
          alguna de estas luces, <strong>detén tu camión de manera segura lo antes posible</strong>.
        </p>

        <h3>🔴 Luz de temperatura del motor</h3>
        <p>
          Indica que el motor está sobrecalentado. Continuar manejando puede causar daños graves 
          al motor. Detente, apaga el motor y espera a que se enfríe. Revisa el nivel de 
          refrigerante y busca fugas.
        </p>

        <h3>🔴 Luz de presión de aceite</h3>
        <p>
          La presión de aceite es demasiado baja. Sin lubricación adecuada, el motor puede 
          sufrir daños catastróficos en minutos. Detente inmediatamente y verifica el nivel 
          de aceite.
        </p>

        <h3>🔴 Luz de frenos</h3>
        <p>
          Puede indicar que el freno de mano está activado, bajo nivel de líquido de frenos, 
          o un problema en el sistema de frenos. Verifica el freno de mano primero; si no es 
          eso, no continúes manejando.
        </p>

        <h2>Luces Amarillas/Naranjas: Precaución</h2>
        <p>
          Las luces amarillas o naranjas indican problemas que necesitan atención pronto, pero 
          no son emergencias inmediatas. Sin embargo, no las ignores por mucho tiempo.
        </p>

        <h3>🟡 Check Engine (Motor)</h3>
        <p>
          Esta luz puede indicar desde un problema menor (como la tapa del tanque de combustible 
          suelta) hasta problemas serios en el motor. Es importante hacer un diagnóstico con 
          escáner para identificar el código de error específico.
        </p>

        <h3>🟡 Luz de ABS</h3>
        <p>
          El sistema de frenos antibloqueo tiene un problema. Los frenos regulares seguirán 
          funcionando, pero el ABS no. Programa una revisión pronto.
        </p>

        <h3>🟡 Luz de batería</h3>
        <p>
          El sistema de carga no está funcionando correctamente. Puede ser el alternador, 
          la batería o las conexiones. Tu camión puede quedarse sin energía si no lo atiendes.
        </p>

        <h3>🟡 Luz de filtro de partículas (DPF)</h3>
        <p>
          El filtro de partículas diésel necesita regeneración. Si la ignoras, puede causar 
          problemas de rendimiento y costosas reparaciones.
        </p>

        <h2>Luces Verdes/Azules: Informativas</h2>
        <p>
          Estas luces simplemente te informan que ciertos sistemas están activos. No indican 
          problemas.
        </p>
        <ul>
          <li><strong>Luz verde de direccionales:</strong> Las direccionales están activas</li>
          <li><strong>Luz azul de luces altas:</strong> Las luces altas están encendidas</li>
          <li><strong>Luz verde de cruise control:</strong> El control de crucero está activo</li>
        </ul>

        <h2>¿Qué hacer cuando se enciende una luz?</h2>
        <ol>
          <li><strong>No entres en pánico:</strong> Evalúa la situación con calma</li>
          <li><strong>Identifica el color:</strong> Rojo = urgente, Amarillo = pronto, Verde = informativo</li>
          <li><strong>Consulta el manual:</strong> Cada camión puede tener variaciones</li>
          <li><strong>Actúa según la urgencia:</strong> Detente si es rojo, programa revisión si es amarillo</li>
          <li><strong>Busca ayuda profesional:</strong> Un diagnóstico con escáner puede identificar el problema exacto</li>
        </ol>

        <h2>Diagnóstico profesional en The Truck Savers</h2>
        <p>
          En <strong>The Truck Savers</strong> contamos con equipos de diagnóstico de última 
          generación que pueden leer los códigos de error de tu camión y determinar exactamente 
          qué está causando que se encienda esa luz. Nuestros técnicos certificados pueden 
          explicarte el problema en términos simples y darte opciones de reparación.
        </p>

        <blockquote>
          "Una luz de advertencia ignorada hoy puede convertirse en una reparación de miles 
          de dólares mañana. No esperes a que el problema empeore."
        </blockquote>

        <h2>Conclusión</h2>
        <p>
          Las luces del tablero son tu primera línea de defensa contra problemas mecánicos 
          costosos. Aprende a reconocerlas, respétalas y actúa rápidamente cuando se enciendan. 
          Si tienes dudas sobre alguna luz en tu tablero, <strong>contáctanos</strong> y 
          nuestro equipo te ayudará a identificar y resolver el problema.
        </p>
      </>
    ),
  };

  return <BlogArticleTemplate {...articleData} />;
}
