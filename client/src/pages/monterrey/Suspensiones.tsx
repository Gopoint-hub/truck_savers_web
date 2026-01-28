import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function SuspensionesMonterrey() {
  const serviceData = {
    title: "Taller de Suspensiones en Monterrey, N.L.",
    subtitle: "Tecnología de punta y más de 24 años de experiencia llegan a Monterrey",
    heroImage: "/images/thetrucksavers-4.webp",
    description:
      "En The Truck Savers Monterrey, nuestro taller de suspensiones es especializado en la reparación y mantenimiento de sistemas de suspensión para camiones y trailers. Tecnología de punta y más de 24 años de experiencia ahora disponibles en Monterrey, Nuevo León. Nuestros mecánicos certificados diagnostican y reparan problemas en suspensión delantera, trasera, amortiguadores y componentes relacionados.",
    features: [
      "Reparación de suspensión delantera y trasera",
      "Cambio de amortiguadores",
      "Reparación de muelles y resortes",
      "Alineación de suspensión",
      "Diagnóstico completo con La Bailada",
      "Garantía en todos nuestros trabajos",
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
          "El costo varía según el tipo de reparación. Te recomendamos contactarnos para una inspección gratuita con La Bailada, donde podemos darte un presupuesto exacto.",
      },
      {
        question: "¿Cuánto tiempo tarda la reparación?",
        answer:
          "Dependiendo de la complejidad, las reparaciones de suspensión pueden tardar de 2 a 8 horas. Nuestro equipo trabajará lo más rápido posible sin comprometer la calidad.",
      },
      {
        question: "¿Qué es La Bailada?",
        answer:
          "Es nuestro simulador de carretera que detecta problemas en suspensión, dirección y otros componentes sin necesidad de estar en carretera. Permite una inspección precisa y detallada.",
      },
    ],
    relatedServices: [
      { title: "Inspección La Bailada", slug: "inspeccion-la-bailada" },
      { title: "Alineación de Camiones", slug: "alineacion-de-camiones" },
      { title: "Taller de Frenos", slug: "frenos" },
    ],
    ctaText: "Agendar Cita",
    location: "monterrey",
    youtubePlaylist: "https://www.youtube.com/live/Oz58TvWp9xA?si=0Rw-UeJ1abRabL4w",
    youtubeTitle: "Video de Suspensión",
    youtubeDescription: "Conoce cómo funciona el sistema de suspensión de tu camión y cómo detectamos problemas con nuestro simulador de camino.",
  };

  return <ServicePageTemplate {...serviceData} />;
}
