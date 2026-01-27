import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function Alineacion() {
  const serviceData = {
    title: "Servicio de Alineación para Camiones",
    subtitle: "Alineación de precisión con equipos de última generación",
    heroImage: "/images/thetrucksavers-7.webp",
    description:
      "Ofrecemos servicios profesionales de alineación para camiones y trailers. Una alineación correcta es esencial para la seguridad, el rendimiento y la economía de combustible de tu vehículo. Utilizamos equipos de última generación para garantizar una alineación precisa que cumple con los estándares de la industria.",
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
          "Se recomienda alinear tu camión cada 10,000 a 15,000 km, o cuando notes que el vehículo se desvía hacia un lado o si has golpeado algo.",
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
      { title: "Reparación de Neumáticos", slug: "neumaticos" },
      { title: "Inspección Mecánica La Bailada", slug: "inspeccion-bailada" },
    ],
  };

  return <ServicePageTemplate {...serviceData} />;
}
