import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function AlineacionMonterrey() {
  const serviceData = {
    title: "Alineación de Camiones en Monterrey, N.L.",
    subtitle: "Tecnología de punta y más de 24 años de experiencia llegan a Monterrey",
    heroImage: "/images/thetrucksavers-7.webp",
    description:
      "En The Truck Savers Monterrey ofrecemos servicios profesionales de alineación para camiones y trailers. Tecnología de punta y más de 24 años de experiencia en alineación de precisión ahora disponibles en Monterrey, Nuevo León. Una alineación correcta es esencial para la seguridad, el rendimiento y la economía de combustible de tu vehículo.",
    features: [
      "Alineación de precisión computarizada",
      "Inspección completa de dirección",
      "Ajuste de ángulos de rueda",
      "Diagnóstico de problemas de dirección",
      "Equipos de última generación",
      "Garantía de precisión",
    ],
    faqs: [
      {
        question: "¿Con qué frecuencia debo alinear mi camión?",
        answer:
          "Se recomienda alinear tu camión cada 6 meses o aproximadamente 50,000 millas u 80,000 kms, cuando notes que el vehículo se desvía hacia un lado, o alguna llanta o neumático presenta desgaste irregular.",
      },
      {
        question: "¿Cómo sé si mi camión necesita alineación?",
        answer:
          "Signos comunes incluyen: el vehículo se desvía hacia un lado, desgaste irregular de llantas, volante descentrado, o vibraciones en la dirección.",
      },
      {
        question: "¿Cuánto tiempo tarda una alineación?",
        answer:
          "Una alineación típica tarda entre 1 a 2 horas, dependiendo del tipo de camión y la complejidad del trabajo.",
      },
      {
        question: "¿Una buena alineación ahorra combustible?",
        answer:
          "Sí, una alineación correcta reduce la resistencia al rodamiento y puede mejorar el consumo de combustible hasta en un 10%.",
      },
    ],
    relatedServices: [
      { title: "Taller de Suspensiones", slug: "suspensiones" },
      { title: "Balanceo de Llantas", slug: "balanceo-de-llantas" },
      { title: "Inspección La Bailada", slug: "inspeccion-la-bailada" },
    ],
    ctaText: "Agendar Alineación en Monterrey",
    location: "monterrey",
  };

  return <ServicePageTemplate {...serviceData} />;
}
