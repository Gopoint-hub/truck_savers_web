import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function DireccionMonterrey() {
  const serviceData = {
    title: "Dirección Hidráulica en Monterrey, N.L.",
    subtitle: "Más de 24 años de experiencia en dirección hidráulica llegan a Monterrey",
    heroImage: "/images/thetrucksavers-7.webp",
    description:
      "En The Truck Savers Monterrey, nuestro taller de dirección está especializado en el mantenimiento, reparación y diagnóstico de sistemas de dirección hidráulica para camiones de carga y trailers. La dirección hidráulica es uno de los sistemas más críticos en cualquier vehículo de carga. Tecnología de punta y más de 24 años de experiencia ahora disponibles en Monterrey, Nuevo León.",
    features: [
      "Inspección inicial del sistema de dirección",
      "Revisión y cambio de líquido hidráulico",
      "Detección y reparación de fugas",
      "Prueba de presión del sistema",
      "Reparación de bomba hidráulica",
      "Cambio de mangueras y conexiones",
      "Reparación de cilindros de dirección",
      "Pruebas de funcionamiento en carretera",
    ],
    faqs: [
      {
        question: "¿Por qué es crucial el servicio de dirección hidráulica?",
        answer:
          "La dirección hidráulica facilita el giro del volante, permitiendo un manejo más seguro y menos agotador. Sin el mantenimiento adecuado, puede sufrir fallas que afecten tanto la seguridad como la eficiencia del vehículo, poniendo en riesgo al conductor y la carga.",
      },
      {
        question: "¿Por qué se pone dura la dirección hidráulica de un camión?",
        answer:
          "Las causas más comunes incluyen: bajo nivel de líquido hidráulico, fugas en el sistema, problemas con la bomba hidráulica, obstrucción o contaminación del sistema, cinturón de la bomba desgastado, fallos en la válvula de presión, o temperaturas extremas que afectan el rendimiento del líquido.",
      },
      {
        question: "¿Cómo puedo prevenir que la dirección se ponga dura?",
        answer:
          "Mantén el nivel de líquido hidráulico adecuado, realiza inspecciones regulares para detectar fugas, cambia el líquido según las recomendaciones del fabricante, y evita giros bruscos del volante cuando el vehículo está detenido.",
      },
      {
        question: "¿Con qué frecuencia debo inspeccionar el sistema de dirección?",
        answer:
          "Se recomienda una inspección cada 50,000 millas o anualmente. Sin embargo, si notas cualquier dificultad al girar el volante, ruidos extraños o fugas, debes traer tu camión inmediatamente.",
      },
      {
        question: "¿Cómo afectan las condiciones climáticas extremas al sistema?",
        answer:
          "En temperaturas muy bajas, el fluido puede volverse más viscoso dificultando el funcionamiento. En temperaturas altas puede degradarse rápidamente, afectando la presión y el rendimiento del sistema. Por eso es importante usar el líquido hidráulico adecuado para tu zona.",
      },
    ],
    relatedServices: [
      { title: "Alineación de Camiones", slug: "alineacion-de-camiones" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
      { title: "Inspección La Bailada", slug: "inspeccion-la-bailada" },
    ],
    ctaText: "Agendar Revisión de Dirección en Monterrey",
    location: "monterrey",
  };

  return <ServicePageTemplate {...serviceData} />;
}
