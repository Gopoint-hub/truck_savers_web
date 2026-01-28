import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function SellosRuedaMonterrey() {
  const serviceData = {
    title: "Retenes de Rueda en Monterrey, N.L.",
    subtitle: "Cambio profesional de retenes - Tecnología de punta llega a Monterrey",
    heroImage: "/images/thetrucksavers-4.webp",
    description:
      "En The Truck Savers Monterrey, el retén de rueda es un componente esencial que protege los baleros de la rueda, evitando fugas de lubricante y la entrada de contaminantes. Tecnología de punta y más de 24 años de experiencia ahora disponibles en Monterrey, Nuevo León. En nuestro taller seguimos un procedimiento estructurado para asegurar la calidad del servicio.",
    features: [
      "Inspección detallada del retén de rueda",
      "Verificación de fugas y desgaste",
      "Desmontaje y limpieza de componentes",
      "Evaluación de eje y baleros",
      "Instalación de nuevo retén de rueda",
      "Aplicación de lubricante adecuado",
      "Prueba y verificación final",
      "Garantía en el servicio",
    ],
    faqs: [
      {
        question: "¿Qué es un retén de rueda?",
        answer:
          "El retén de rueda es un componente que sella la maza de la rueda para evitar fugas de lubricante y la entrada de contaminantes al sistema de rodamientos. Es esencial para proteger los baleros y mantener el funcionamiento correcto de las ruedas.",
      },
      {
        question: "¿Cómo sé si el retén de rueda necesita ser reemplazado?",
        answer:
          "Señales comunes incluyen: fugas de aceite o grasa cerca de las ruedas, ruidos inusuales al girar, acumulación de suciedad en la zona de la maza, y manchas de lubricante en el interior de la llanta.",
      },
      {
        question: "¿Cuánto dura un retén de rueda en un camión?",
        answer:
          "La duración depende del uso y las condiciones de operación. Generalmente se recomienda inspeccionar cada 50,000-100,000 millas. Factores como sobrecarga, caminos en mal estado y falta de mantenimiento pueden acortar su vida útil.",
      },
      {
        question: "¿Puedo seguir conduciendo si noto una fuga en el retén?",
        answer:
          "No es recomendable. Una fuga puede provocar daño a los baleros por falta de lubricación, sobrecalentamiento de la maza, y eventualmente fallas más costosas o incluso peligrosas.",
      },
      {
        question: "¿Qué sucede si el retén no se reemplaza a tiempo?",
        answer:
          "Puede causar daño severo a los rodamientos, sobrecalentamiento de la maza, contaminación del sistema de frenos, y en casos extremos, falla de la rueda que puede resultar en accidentes.",
      },
      {
        question: "¿Cuánto tiempo tarda el reemplazo de un retén de rueda?",
        answer:
          "El proceso generalmente toma entre 1-2 horas por rueda, dependiendo del estado del sistema y si se requieren reparaciones adicionales en los baleros o el eje.",
      },
      {
        question: "¿Debo reemplazar ambos retenes al mismo tiempo?",
        answer:
          "Se recomienda reemplazar ambos retenes si tienen el mismo desgaste o kilometraje, para mantener un rendimiento uniforme y evitar tener que repetir el trabajo poco después.",
      },
    ],
    relatedServices: [
      { title: "Taller de Frenos", slug: "frenos" },
      { title: "Inspección La Bailada", slug: "inspeccion-la-bailada" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
    ],
    ctaText: "Agendar Cambio de Retenes en Monterrey",
    location: "monterrey",
  };

  return <ServicePageTemplate {...serviceData} />;
}
