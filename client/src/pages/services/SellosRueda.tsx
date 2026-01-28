import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function SellosRueda() {
  const serviceData = {
    title: "Sellos de Rueda para Camiones y Trailers",
    subtitle: "Cambio profesional de sellos de rueda",
    heroImage: "/images/thetrucksavers-4.webp",
    description:
      "El sello de rueda es un componente esencial que protege los baleros de la rueda, evitando fugas de lubricante y la entrada de contaminantes. En nuestro taller seguimos un procedimiento estructurado para asegurar la calidad del servicio, desde la inspección inicial hasta las pruebas finales. Un sello de rueda en mal estado puede causar daños costosos a los rodamientos y comprometer la seguridad del vehículo.",
    features: [
      "Inspección detallada del sello de rueda",
      "Verificación de fugas y desgaste",
      "Desmontaje y limpieza de componentes",
      "Evaluación de eje y baleros",
      "Instalación de nuevo sello de rueda",
      "Aplicación de lubricante adecuado",
      "Prueba y verificación final",
      "Garantía en el servicio",
    ],
    faqs: [
      {
        question: "¿Qué es un sello de rueda?",
        answer:
          "El sello de rueda es un componente que sella la maza de la rueda para evitar fugas de lubricante y la entrada de contaminantes al sistema de rodamientos. Es esencial para proteger los baleros y mantener el funcionamiento correcto de las ruedas.",
      },
      {
        question: "¿Cómo sé si el sello de rueda necesita ser reemplazado?",
        answer:
          "Señales comunes incluyen: fugas de aceite o grasa cerca de las ruedas, ruidos inusuales al girar, acumulación de suciedad en la zona de la maza, y manchas de lubricante en el interior de la llanta.",
      },
      {
        question: "¿Cuánto dura un sello de rueda en un camión?",
        answer:
          "La duración depende del uso y las condiciones de operación. Generalmente se recomienda inspeccionar cada 50,000-100,000 millas. Factores como sobrecarga, caminos en mal estado y falta de mantenimiento pueden acortar su vida útil.",
      },
      {
        question: "¿Puedo seguir conduciendo si noto una fuga en el sello?",
        answer:
          "No es recomendable. Una fuga puede provocar daño a los baleros por falta de lubricación, sobrecalentamiento de la maza, y eventualmente fallas más costosas o incluso peligrosas.",
      },
      {
        question: "¿Qué sucede si el sello no se reemplaza a tiempo?",
        answer:
          "Puede causar daño severo a los rodamientos, sobrecalentamiento de la maza, contaminación del sistema de frenos, y en casos extremos, falla de la rueda que puede resultar en accidentes.",
      },
      {
        question: "¿Cuánto tiempo tarda el reemplazo de un sello de rueda?",
        answer:
          "El proceso generalmente toma entre 1-2 horas por rueda, dependiendo del estado del sistema y si se requieren reparaciones adicionales en los baleros o el eje.",
      },
      {
        question: "¿Debo reemplazar ambos sellos al mismo tiempo?",
        answer:
          "Se recomienda reemplazar ambos sellos si tienen el mismo desgaste o kilometraje, para mantener un rendimiento uniforme y evitar tener que repetir el trabajo poco después.",
      },
    ],
    relatedServices: [
      { title: "Taller de Frenos", slug: "taller-de-frenos" },
      { title: "Inspección Mecánica La Bailada", slug: "inspeccion-la-bailada" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
    ],
    ctaText: "Agendar Cita",
  };

  return <ServicePageTemplate {...serviceData} />;
}
