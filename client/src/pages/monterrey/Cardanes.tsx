import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function CardanesMonterrey() {
  const serviceData = {
    title: "Reparación de Cardanes en Monterrey, N.L.",
    subtitle: "Protege tu transmisión - Más de 24 años de experiencia llegan a Monterrey",
    heroImage: "/images/thetrucksavers-4.webp",
    description:
      "En The Truck Savers Monterrey, el cardán es una parte esencial del sistema de transmisión de tu camión, ya que transmite la potencia del motor a las ruedas. Tecnología de punta y más de 24 años de experiencia ahora disponibles en Monterrey, Nuevo León. Un cardán en mal estado puede afectar significativamente el rendimiento del motor, la transmisión y el consumo de combustible.",
    features: [
      "Diagnóstico completo del cardán",
      "Reparación de crucetas y rodamientos",
      "Balanceo de cardán",
      "Cambio de cardán completo",
      "Inspección de juntas universales",
      "Lubricación especializada",
      "Alineación del sistema de transmisión",
      "Pruebas de funcionamiento",
    ],
    faqs: [
      {
        question: "¿Cómo afecta un cardán defectuoso al motor?",
        answer:
          "Cuando un cardán no funciona correctamente, el sistema de transmisión no opera de manera fluida. Esto provoca que el motor trabaje más para mover el vehículo a la misma velocidad, operando a revoluciones más altas para compensar la falta de eficiencia, lo que también eleva el consumo de combustible.",
      },
      {
        question: "¿Qué pasa si no reparo el cardán a tiempo?",
        answer:
          "Un cardán defectuoso puede llevar a un fallo completo del sistema de transmisión, causando paradas imprevistas y pérdida de productividad. Además de los costos de reparación, la parada de un camión representa un gasto adicional en combustible y tiempo perdido.",
      },
      {
        question: "¿Cómo afecta el cardán al consumo de combustible?",
        answer:
          "Si el cardán está dañado o mal ajustado, la energía que genera el motor no se transmite de manera eficiente a las ruedas. Este esfuerzo adicional del motor puede aumentar significativamente el consumo de combustible.",
      },
      {
        question: "¿Cuáles son los signos de un cardán en mal estado?",
        answer:
          "Los síntomas más comunes incluyen: vibraciones al acelerar, ruidos metálicos o golpeteos debajo del camión, dificultad para cambiar de velocidad, y sensación de 'saltos' durante la aceleración.",
      },
      {
        question: "¿Con qué frecuencia debo revisar el cardán?",
        answer:
          "Se recomienda una inspección del cardán cada 50,000 millas o durante el mantenimiento regular del vehículo. La lubricación de las crucetas debe hacerse según las especificaciones del fabricante.",
      },
    ],
    relatedServices: [
      { title: "Inspección La Bailada", slug: "inspeccion-la-bailada" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
      { title: "Taller de Frenos", slug: "frenos" },
    ],
    ctaText: "Agendar Revisión de Cardán en Monterrey",
    location: "monterrey",
  };

  return <ServicePageTemplate {...serviceData} />;
}
