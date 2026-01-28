import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function Balanceo() {
  const serviceData = {
    title: "Balanceo de Llantas para Camiones y Trailers",
    subtitle: "Mantén tus morenas en perfecto equilibrio",
    heroImage: "/images/thetrucksavers-7.webp",
    description:
      "Nuestro servicio de balanceo de llantas está diseñado para garantizar que tus morenas (llantas) giren de manera uniforme y sin vibraciones. Un balanceo correcto es esencial para la seguridad, el confort de manejo y la vida útil de tus neumáticos. Utilizamos máquinas especializadas para realizar balanceo estático y dinámico, asegurando que tu camión se maneje de manera estable en cualquier condición.",
    features: [
      "Inspección inicial de neumáticos",
      "Balanceo estático y dinámico",
      "Detección de desgaste irregular",
      "Ajuste de pesos de equilibrio",
      "Prueba de manejo post-balanceo",
      "Evaluación de condición de morenas",
      "Recomendaciones de rotación",
      "Equipos de balanceo de última generación",
    ],
    faqs: [
      {
        question: "¿Cuándo debo hacer el balanceo de mi camión o trailer?",
        answer:
          "Se recomienda balancear las llantas cada vez que se montan neumáticos nuevos, cuando notes vibraciones en el volante o en el asiento, después de reparar una llanta, o cada 10,000-15,000 millas como mantenimiento preventivo.",
      },
      {
        question: "¿Cuáles son los beneficios del balanceo de neumáticos?",
        answer:
          "Un balanceo correcto reduce las vibraciones, mejora el confort de manejo, extiende la vida útil de las llantas, reduce el desgaste de la suspensión y dirección, y puede mejorar el consumo de combustible al reducir la resistencia al rodamiento.",
      },
      {
        question: "¿Cómo sé si mis llantas necesitan balanceo?",
        answer:
          "Los signos más comunes incluyen: vibraciones en el volante especialmente a altas velocidades, vibraciones en el asiento o piso, desgaste irregular de las llantas, y ruidos inusuales provenientes de las ruedas.",
      },
      {
        question: "¿Cuál es la diferencia entre balanceo estático y dinámico?",
        answer:
          "El balanceo estático corrige el desequilibrio vertical de la rueda, mientras que el balanceo dinámico evalúa las fuerzas que se generan cuando la rueda está en movimiento, permitiendo un ajuste más preciso para eliminar vibraciones laterales.",
      },
      {
        question: "¿Cuánto tiempo tarda el servicio de balanceo?",
        answer:
          "El balanceo completo de todas las ruedas de un camión típicamente toma entre 30 minutos a 1 hora, dependiendo del número de ejes y la condición de los neumáticos.",
      },
    ],
    relatedServices: [
      { title: "Alineación de Camiones", slug: "alineacion" },
      { title: "Depilada de Llantas", slug: "neumaticos" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
    ],
    ctaText: "Agendar Cita",
  };

  return <ServicePageTemplate {...serviceData} />;
}
