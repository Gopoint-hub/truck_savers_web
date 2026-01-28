import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function Suspensiones() {
  const serviceData = {
    title: "Taller de Suspensiones para Camiones y Trailers",
    subtitle: "Reparación especializada con 1 año de garantía en EE.UU.",
    heroImage: "/images/thetrucksavers-4.webp",
    description:
      "Nuestro taller de suspensiones es especializado en la reparación y mantenimiento de sistemas de suspensión para camiones y trailers. Con más de 24 años de experiencia, nuestros mecánicos certificados diagnostican y reparan problemas en suspensión delantera, trasera, amortiguadores y componentes relacionados. Ofrecemos garantía de 1 año en todos nuestros trabajos realizados en Estados Unidos.",
    features: [
      "Reparación de suspensión delantera y trasera",
      "Cambio de amortiguadores",
      "Reparación de muelles y resortes",
      "Alineación de suspensión",
      "Diagnóstico completo con El Bailador",
      "Garantía de 1 año en trabajos de suspensión (EE.UU.)",
    ],
    faqs: [
      {
        question: "¿Cuáles son los signos de problemas en la suspensión?",
        answer:
          "Algunos signos incluyen: ruidos al pasar por baches o al girar, vibraciones excesivas en el volante, inclinación del vehículo, manejo inestable, desgaste irregular de llantas y dificultad para controlar el camión.",
      },
      {
        question: "¿Cuál es el costo aproximado de una reparación?",
        answer:
          "El costo varía según el tipo de reparación. Te recomendamos contactarnos para una inspección gratuita con El Bailador, donde podemos darte un presupuesto exacto.",
      },
      {
        question: "¿Cuánto tiempo tarda la reparación?",
        answer:
          "Dependiendo de la complejidad, las reparaciones de suspensión pueden tardar de 2 a 8 horas. Nuestro equipo trabajará lo más rápido posible sin comprometer la calidad.",
      },
      {
        question: "¿Qué es El Bailador?",
        answer:
          "Es nuestro simulador de camino que detecta problemas en suspensión, dirección y otros componentes sin necesidad de estar en carretera. Permite una inspección precisa y detallada.",
      },
    ],
    relatedServices: [
      { title: "Inspección Mecánica La Bailada", slug: "inspeccion-bailada" },
      { title: "Alineación de Camiones", slug: "alineacion" },
      { title: "Cambio de Aceite", slug: "cambio-aceite" },
    ],
    ctaText: "Agendar Cita",
    location: "houston",
    youtubePlaylist: "https://youtu.be/reHVeqVXKbE?si=fJBVbN8Ke6bg7eue",
    youtubeTitle: "Video de Suspensión",
    youtubeDescription: "Conoce cómo funciona el sistema de suspensión de tu camión y cómo detectamos problemas con nuestro simulador de camino.",
  };

  return <ServicePageTemplate {...serviceData} />;
}
