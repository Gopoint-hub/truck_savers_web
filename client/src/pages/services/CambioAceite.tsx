import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function CambioAceite() {
  const serviceData = {
    title: "Cambio de Aceite para Camión",
    subtitle: "Mantenimiento rutinario con productos de calidad premium",
    heroImage: "/images/llave.webp",
    description:
      "En The Truck Savers, entendemos que el cambio de aceite es uno de los mantenimientos más importantes para tu camión diésel. Utilizamos productos de calidad premium y seguimos los estándares más rigurosos de la industria. Nuestro equipo de mecánicos expertos garantiza que tu motor reciba el cuidado que merece, asegurando un rendimiento óptimo y una vida útil prolongada.",
    features: [
      "Aceite sintético de calidad premium",
      "Cambio de filtro de aceite",
      "Inspección de niveles de fluidos",
      "Limpieza de componentes",
      "Garantía de calidad",
      "Servicio rápido y eficiente",
    ],
    faqs: [
      {
        question: "¿Cada cuánto tiempo debo cambiar el aceite?",
        answer:
          "Recomendamos cambiar el aceite mínimo cada 10,000 millas o 15,000 km, o según las especificaciones del fabricante. También recomendamos realizar análisis de aceite usado para definir la frecuencia adecuada para cada motor.",
      },
      {
        question: "¿Qué tipo de aceite utilizan?",
        answer:
          "Utilizamos aceites sintéticos y semi sintéticos de calidad premium que cumplen con las especificaciones de los motores diésel modernos. Nuestros productos son de marcas reconocidas en la industria.",
      },
      {
        question: "¿Cuánto tiempo tarda el servicio?",
        answer:
          "El cambio de aceite generalmente tarda entre 30 a 45 minutos, dependiendo del modelo de tu camión. Puedes esperar cómodamente en nuestras instalaciones.",
      },
      {
        question: "¿Qué incluye el cambio de aceite?",
        answer:
          "El cambio de aceite incluye además el engrasado de todos los puntos requeridos en la dirección, suspensión, frenos y barra cardán. También se revisan visualmente más de 100 puntos de dirección, suspensión, frenos, barra cardán y rueda. Se inspecciona el nivel y calidad de aceites de transmisión y diferenciales.",
      },
    ],
    relatedServices: [
      { title: "Inspección Mecánica La Bailada", slug: "inspeccion-bailada" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
      { title: "Reparación de Frenos", slug: "frenos" },
    ],
    ctaText: "Agendar Cita",
    location: "houston",
  };

  return <ServicePageTemplate {...serviceData} />;
}
