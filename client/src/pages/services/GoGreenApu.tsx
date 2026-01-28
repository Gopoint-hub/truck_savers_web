import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function GoGreenApu() {
  const serviceData = {
    title: "Go Green APU",
    subtitle: "Ahorra hasta $5,000 al año en combustible",
    heroImage: "/images/thetrucksavers-4.webp",
    description:
      "El Go Green APU es una unidad compacta y eficiente que proporciona aire acondicionado, calefacción y energía eléctrica a tu camión cuando está estacionado, sin necesidad de dejar el motor principal encendido. Mientras un camión en ralentí gasta hasta 3.75 litros de diésel por hora, el Go Green APU solo consume 0.75 litros por hora, lo que representa un ahorro de hasta 80% en combustible. Es la solución inteligente y eco-friendly para truckers que quieren confort sin gastar de más.",
    features: [
      "Ahorro de hasta 80% en combustible (hasta $5,000/año)",
      "Aire acondicionado y calefacción sin motor encendido",
      "Energía para microondas, refrigerador, TV y más",
      "Menor desgaste del motor principal",
      "Cumple con regulaciones ambientales de EE.UU.",
      "Mantenimiento sencillo cada 1,000 horas",
      "Opciones: usado, remanufacturado o nuevo",
      "Financiamiento disponible en México y EE.UU.",
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta un Go Green APU?",
        answer:
          "Los precios varían según el modelo y condición. Un Go Green APU usado comienza desde $3,995 USD con opción de reserva por $500 USD. Los equipos remanufacturados y nuevos tienen precios más altos pero mayor vida útil y garantía extendida.",
      },
      {
        question: "¿Cuánto combustible consume el Go Green APU por hora?",
        answer:
          "El Go Green APU consume aproximadamente 0.75 litros de diésel por hora, comparado con los 3.75 litros que consume un camión en ralentí. Esto representa un ahorro de hasta 80% en combustible.",
      },
      {
        question: "¿Cuánto dura un Go Green APU?",
        answer:
          "La vida útil depende del tipo de equipo: los usados tienen 3-5 años de vida restante, los remanufacturados 5-7 años, y los nuevos pueden durar hasta 10 años con el mantenimiento adecuado.",
      },
      {
        question: "¿Qué garantía tiene el Go Green APU?",
        answer:
          "Los equipos usados cuentan con 180 días de garantía para el motor y el APU. Los remanufacturados y nuevos tienen 1 año de garantía para el APU y 2 años para el motor. También ofrecemos asistencia técnica remota.",
      },
      {
        question: "¿Qué dispositivos puedo alimentar con el Go Green APU?",
        answer:
          "El APU genera energía suficiente para cargar las baterías del camión, aire acondicionado, calefacción, microondas, refrigeradores, televisores, cargadores de celular/laptop, luces LED y más.",
      },
      {
        question: "¿El Go Green APU cumple con las regulaciones ambientales?",
        answer:
          "Sí. En muchos estados de EE.UU. está prohibido dejar el camión encendido en reposo por más de cierto tiempo. El Go Green APU permite cumplir con esas regulaciones y puede ayudarte a acceder a beneficios fiscales.",
      },
      {
        question: "¿Cada cuánto se le da mantenimiento al APU?",
        answer:
          "El mantenimiento preventivo se realiza cada 1,000 horas de uso, incluyendo cambio de filtros y aceite. Las piezas de repuesto están disponibles en refaccionarias comunes o directamente con nosotros.",
      },
    ],
    relatedServices: [
      { title: "Cambio de Aceite", slug: "cambio-de-aceite" },
      { title: "Inspección Mecánica La Bailada", slug: "inspeccion-la-bailada" },
      { title: "Sistema de Escape", slug: "sistema-de-escape" },
    ],
    ctaText: "Cotizar Go Green APU",
  };

  return <ServicePageTemplate {...serviceData} />;
}
