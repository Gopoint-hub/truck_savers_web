import BlogArticleTemplate from '@/components/templates/BlogArticleTemplate';

export default function SuspensionTrocaArticle() {
  const articleData = {
    title: "Suspensión de tu troca: El secreto pa' un ride suave",
    subtitle: "Todo lo que necesitas saber sobre la suspensión de tu camión. Aprende a identificar problemas y mantener tu ride cómodo y seguro.",
    heroImage: "/images/suspensin-de-tu-troca-el-secreto-pa-un-ride-suave.jpg",
    category: "Mantenimiento",
    date: "15 de enero, 2026",
    readTime: "7 min",
    relatedArticles: [
      {
        slug: "diferencial-transmision",
        title: "Diferencial o transmisión: ¡No te confundas!",
        image: "/images/diferencial-o-transmisin-no-te-confundas.jpg",
      },
      {
        slug: "inspeccion-carga-diaria",
        title: "Inspección de carga diaria: Guía del trokero",
        image: "/images/mecanico-inspeccion-carga-diario-guia-trokero.jpg",
      },
    ],
    content: (
      <>
        <p>
          Si pasas horas en la carretera, sabes lo importante que es tener un 
          <strong> ride suave</strong>. La suspensión de tu camión no solo afecta tu 
          comodidad - también impacta la seguridad, el desgaste de llantas y hasta 
          el consumo de combustible. En este artículo te explicamos todo lo que 
          necesitas saber.
        </p>

        <h2>¿Qué hace la suspensión?</h2>
        <p>
          El sistema de suspensión tiene varias funciones críticas:
        </p>
        <ul>
          <li><strong>Absorber impactos:</strong> Baches, topes y irregularidades del camino</li>
          <li><strong>Mantener contacto:</strong> Las llantas siempre pegadas al pavimento</li>
          <li><strong>Soportar carga:</strong> Distribuir el peso de manera uniforme</li>
          <li><strong>Estabilidad:</strong> Mantener el control en curvas y frenadas</li>
          <li><strong>Proteger la carga:</strong> Evitar daños por vibración excesiva</li>
        </ul>

        <h2>Tipos de suspensión en camiones</h2>

        <h3>Suspensión de muelles (leaf springs)</h3>
        <p>
          La más común en camiones de carga. Consiste en hojas de acero apiladas que 
          se flexionan para absorber impactos. Es robusta y económica de reparar.
        </p>

        <h3>Suspensión neumática (air ride)</h3>
        <p>
          Utiliza bolsas de aire en lugar de muelles. Ofrece un ride más suave y 
          permite ajustar la altura del camión. Es más costosa pero ideal para 
          cargas delicadas.
        </p>

        <h3>Suspensión de torsión</h3>
        <p>
          Menos común en camiones pesados, pero se encuentra en algunos modelos. 
          Usa barras de torsión que se tuercen para absorber impactos.
        </p>

        <h2>Señales de problemas en la suspensión</h2>
        <p>
          Presta atención a estas señales de advertencia:
        </p>
        <ul>
          <li><strong>Ride áspero:</strong> Sientes cada bache más de lo normal</li>
          <li><strong>Camión inclinado:</strong> Un lado más bajo que el otro</li>
          <li><strong>Rebote excesivo:</strong> El camión sigue rebotando después de un bache</li>
          <li><strong>Ruidos:</strong> Golpes, rechinidos o crujidos al pasar baches</li>
          <li><strong>Desgaste irregular de llantas:</strong> Especialmente en los bordes</li>
          <li><strong>Dificultad para controlar:</strong> El camión se siente inestable</li>
          <li><strong>Nariz que se hunde al frenar:</strong> La parte delantera baja mucho</li>
        </ul>

        <h2>Componentes que se desgastan</h2>

        <h3>Amortiguadores</h3>
        <p>
          Controlan el rebote de la suspensión. Duran entre 50,000 y 100,000 millas 
          dependiendo de las condiciones. Cuando fallan, el camión rebota excesivamente.
        </p>

        <h3>Muelles</h3>
        <p>
          Las hojas de los muelles pueden romperse o perder su curvatura con el tiempo. 
          Una hoja rota puede causar que el camión se incline hacia un lado.
        </p>

        <h3>Bujes y bushings</h3>
        <p>
          Son las piezas de goma que conectan los componentes. Se deterioran con el 
          tiempo y causan ruidos y vibración.
        </p>

        <h3>Bolsas de aire (air bags)</h3>
        <p>
          En suspensiones neumáticas, las bolsas pueden desarrollar fugas o reventarse. 
          Revisa regularmente si hay pérdida de altura.
        </p>

        <h2>Mantenimiento preventivo</h2>
        <p>
          Para mantener tu suspensión en óptimas condiciones:
        </p>
        <ul>
          <li><strong>Inspección visual:</strong> Revisa muelles, amortiguadores y conexiones regularmente</li>
          <li><strong>Lubricación:</strong> Engrasa los puntos de pivote según el manual</li>
          <li><strong>Revisa la presión de aire:</strong> En suspensiones neumáticas, mantén la presión correcta</li>
          <li><strong>Alineación:</strong> Una mala alineación acelera el desgaste de la suspensión</li>
          <li><strong>No sobrecargues:</strong> El exceso de peso daña la suspensión prematuramente</li>
        </ul>

        <h2>¿Cuándo reemplazar componentes?</h2>
        <p>
          Aquí hay algunas guías generales:
        </p>
        <ul>
          <li><strong>Amortiguadores:</strong> Cada 50,000-100,000 millas o cuando muestren fugas</li>
          <li><strong>Muelles:</strong> Cuando se rompen o pierden altura</li>
          <li><strong>Bujes:</strong> Cuando muestren grietas o desgaste visible</li>
          <li><strong>Bolsas de aire:</strong> Cuando tengan fugas o grietas</li>
        </ul>

        <h2>Servicio de suspensión en The Truck Savers</h2>
        <p>
          En <strong>The Truck Savers</strong> somos especialistas en suspensiones de 
          camiones. Nuestro taller cuenta con:
        </p>
        <ul>
          <li>Técnicos certificados en suspensiones</li>
          <li>Equipo de diagnóstico especializado</li>
          <li>Amplio inventario de refacciones</li>
          <li>Garantía de 1 año en trabajos realizados</li>
        </ul>

        <blockquote>
          "Una buena suspensión no es un lujo - es una necesidad. Tu espalda, tu carga 
          y tus llantas te lo agradecerán."
        </blockquote>

        <h2>Conclusión</h2>
        <p>
          La suspensión es uno de los sistemas más importantes de tu camión. Un 
          mantenimiento adecuado no solo mejora tu comodidad, sino que también 
          protege tu carga y reduce el desgaste de otros componentes. Si notas 
          cualquier síntoma de problemas, <strong>contáctanos</strong> y nuestro 
          equipo te ayudará a mantener tu ride suave y seguro.
        </p>
      </>
    ),
  };

  return <BlogArticleTemplate {...articleData} />;
}
