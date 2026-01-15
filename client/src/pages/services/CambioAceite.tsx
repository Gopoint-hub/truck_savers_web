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
          "Recomendamos cambiar el aceite cada 10,000 a 15,000 km o según las especificaciones del fabricante de tu camión. El cambio regular de aceite previene el desgaste prematuro del motor.",
      },
      {
        question: "¿Qué tipo de aceite utilizan?",
        answer:
          "Utilizamos aceites sintéticos de calidad premium que cumplen con las especificaciones de los motores diésel modernos. Nuestros productos son de marcas reconocidas en la industria.",
      },
      {
        question: "¿Cuánto tiempo tarda el servicio?",
        answer:
          "El cambio de aceite generalmente tarda entre 30 a 45 minutos, dependiendo del modelo de tu camión. Puedes esperar cómodamente en nuestras instalaciones.",
      },
      {
        question: "¿Incluye inspección adicional?",
        answer:
          "Sí, durante el cambio de aceite realizamos una inspección visual de otros componentes importantes como correas, mangueras y niveles de otros fluidos.",
      },
    ],
    relatedServices: [
      { title: "Inspección Mecánica La Bailada", slug: "inspeccion-bailada" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
      { title: "Reparación de Frenos", slug: "frenos" },
    ],
  };

  return <ServicePageTemplate {...serviceData} />;
}
