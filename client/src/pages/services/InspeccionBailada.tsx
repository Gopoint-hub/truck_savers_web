import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function InspeccionBailada() {
  const serviceData = {
    title: "Inspección Mecánica La Bailada",
    subtitle: "Simulador de camino para detección completa de problemas",
    heroImage: "/images/thetrucksavers-banner-3.webp",
    description:
      "La Bailada es nuestro exclusivo simulador de camino que permite detectar problemas en tu camión sin necesidad de estar en carretera. Este servicio revolucionario inspecciona más de 100 puntos de seguridad de tu vehículo, incluyendo suspensión, dirección, frenos y componentes críticos. Es completamente GRATIS para todos nuestros clientes.",
    features: [
      "Inspección de más de 100 puntos de seguridad",
      "Simulador de camino (La Bailada)",
      "Diagnóstico de suspensión",
      "Evaluación de dirección",
      "Inspección de frenos",
      "Reporte detallado de hallazgos",
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta la inspección La Bailada?",
        answer:
          "¡Es completamente GRATIS! Creemos que todo camionero merece saber el estado de su vehículo sin costo alguno.",
      },
      {
        question: "¿Qué es exactamente La Bailada?",
        answer:
          "Es un simulador de camino que hace que tu camión 'baile' controladamente, permitiéndonos detectar problemas en suspensión, dirección y otros componentes sin estar en carretera.",
      },
      {
        question: "¿Cuánto tiempo tarda la inspección?",
        answer:
          "La inspección completa tarda aproximadamente 30 a 45 minutos. Puedes esperar cómodamente en nuestras instalaciones.",
      },
      {
        question: "¿Qué información recibo después?",
        answer:
          "Recibirás un reporte detallado con todos los hallazgos, recomendaciones de reparación y presupuestos para cualquier trabajo necesario.",
      },
    ],
    relatedServices: [
      { title: "Taller de Suspensiones", slug: "suspensiones" },
      { title: "Alineación de Camiones", slug: "alineacion" },
      { title: "Cambio de Aceite", slug: "cambio-aceite" },
    ],
  };

  return <ServicePageTemplate {...serviceData} />;
}
