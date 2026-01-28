import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function AlineacionDallas() {
  const serviceData = {
    title: "Alineación de Camiones en Dallas, TX",
    subtitle: "Alineación de precisión con equipos de última generación en Dallas-Fort Worth",
    heroImage: "/images/thetrucksavers-7.webp",
    description:
      "En The Truck Savers Dallas ofrecemos servicios profesionales de alineación para camiones y trailers. Una alineación correcta es esencial para la seguridad, el rendimiento y la economía de combustible de tu vehículo. Utilizamos equipos de última generación para garantizar una alineación precisa que cumple con los estándares de la industria.",
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
      { title: "Dirección Hidráulica", slug: "direccion" },
      { title: "Inspección La Bailada", slug: "inspeccion-la-bailada" },
    ],
    ctaText: "Agendar Cita",
    location: "dallas",
    youtubePlaylist: "https://youtube.com/playlist?list=PLCJ62d3C3v0sKYdYVPDK3JlbiTcEsDf2a&si=D2pJ3p3skuPu-mD-",
    youtubeTitle: "Videos de Alineación",
    youtubeDescription: "Mira nuestra lista de reproducción con videos explicativos sobre el servicio de alineación para camiones y cómo mantener tu vehículo en óptimas condiciones.",
  };

  return <ServicePageTemplate {...serviceData} />;
}
