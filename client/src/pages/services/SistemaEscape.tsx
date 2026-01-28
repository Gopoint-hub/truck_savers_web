import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function SistemaEscape() {
  const serviceData = {
    title: "Sistema de Escape para Camiones y Trailers",
    subtitle: "Mantenimiento y reparación especializada de mofles y escape",
    heroImage: "/images/thetrucksavers-4.webp",
    description:
      "Nuestro taller se especializa en el mantenimiento, reparación y personalización del sistema de escape de camiones comerciales y trailers. Un sistema de escape en buen estado es fundamental para el rendimiento del motor, la eficiencia del combustible y el cumplimiento de las regulaciones de emisiones. Ofrecemos desde inspecciones hasta reemplazos completos y personalizaciones para mejorar el flujo de gases.",
    features: [
      "Inspección inicial del sistema de escape",
      "Reparación de mofles y tubos",
      "Reemplazo de componentes dañados",
      "Personalización del sistema de escape",
      "Verificación de emisiones",
      "Sellado de fugas",
      "Instalación de sistemas completos",
      "Pruebas de funcionamiento y ajuste",
    ],
    faqs: [
      {
        question: "¿Cómo sé si mi sistema de escape necesita reparación?",
        answer:
          "Algunos signos comunes incluyen: ruido excesivo (mofle dañado o tubos rotos), olor a gases de escape dentro de la cabina, manchas negras cerca de las uniones del sistema, pérdida de potencia o aumento en el consumo de combustible, y luz de 'Check Engine' encendida.",
      },
      {
        question: "¿El sistema de escape afecta la eficiencia del combustible?",
        answer:
          "Sí, un sistema de escape obstruido o con fugas puede hacer que el motor trabaje más para expulsar los gases, afectando el rendimiento y aumentando el consumo de combustible. Un escape en buen estado optimiza el flujo de gases y mejora la eficiencia.",
      },
      {
        question: "¿Qué mantenimiento preventivo debo realizar?",
        answer:
          "Se recomienda inspeccionar visualmente el sistema de escape regularmente, verificar que no haya fugas ni corrosión, mantener limpios los componentes del sistema de emisiones, y realizar inspecciones profesionales cada 25,000-50,000 millas.",
      },
      {
        question: "¿Cuáles son las consecuencias de no reparar un escape con fugas?",
        answer:
          "Las fugas en el escape pueden permitir que gases tóxicos entren a la cabina (peligro para la salud), causar pérdida de potencia del motor, aumentar el consumo de combustible, y resultar en multas por no cumplir con las regulaciones de emisiones.",
      },
      {
        question: "¿Qué significa si mi mofle está obstruido?",
        answer:
          "Un mofle obstruido restringe el flujo de gases de escape, lo que causa contrapresión en el motor. Esto resulta en pérdida de potencia, mayor consumo de combustible, sobrecalentamiento del motor, y puede dañar otros componentes del sistema de escape.",
      },
    ],
    relatedServices: [
      { title: "Cambio de Aceite", slug: "cambio-aceite" },
      { title: "Inspección Mecánica La Bailada", slug: "inspeccion-bailada" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
    ],
    ctaText: "Agendar Inspección de Escape",
  };

  return <ServicePageTemplate {...serviceData} />;
}
