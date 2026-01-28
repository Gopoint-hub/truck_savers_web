import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function SelladorLlantas() {
  const serviceData = {
    title: "Sellador de Llantas Salvamorenas",
    subtitle: "Protector y sellador para tus morenas - ¡No te quedes parado en la ruta!",
    heroImage: "/images/thetrucksavers-7.webp",
    description:
      "Nuestro sellador de llantas Salvamorenas tiene dos propiedades clave: actúa como protector preventivo y como sellador de llantas tras un pinchazo. Diseñado específicamente para neumáticos de vehículos pesados como camiones de carga y trailers, el Salvamorenas te ayuda a mantener tus morenas en funcionamiento sin preocuparte por las fugas de aire causadas por objetos punzantes en el camino.",
    features: [
      "Protección preventiva a largo plazo para tus morenas",
      "Sella pinchazos de hasta ½ pulgada automáticamente",
      "Reduce paradas inesperadas en carretera",
      "Aplicación rápida: 2-3 horas para 10 llantas",
      "Prolonga la vida útil de los neumáticos",
      "Solución económica vs. reparaciones frecuentes",
      "Durabilidad de 6 meses a 1 año",
      "Ideal para flotas de camiones comerciales",
    ],
    faqs: [
      {
        question: "¿Cómo funciona el sellador de llantas Salvamorenas?",
        answer:
          "El Salvamorenas está formulado para sellar perforaciones o pinchazos en los neumáticos. Su función principal es cerrar el agujero temporalmente para mantener la presión del aire dentro del neumático, evitando que el camión quede detenido en medio de la ruta.",
      },
      {
        question: "¿Qué tipo de pinchazos puede sellar el Salvamorenas?",
        answer:
          "El Salvamorenas es un sellador diseñado específicamente para neumáticos de vehículos pesados como camiones y trailers. Sella pinchazos de hasta ½ pulgada y puede ser utilizado de forma preventiva para proteger las llantas de daños futuros.",
      },
      {
        question: "¿Cuánto tiempo dura el sellador de llantas?",
        answer:
          "La durabilidad depende de varios factores como las condiciones de conducción y el tamaño del agujero que se sella. En general, el Salvamorenas puede durar entre 6 meses y 1 año, aunque se recomienda hacer un seguimiento regular de las llantas.",
      },
      {
        question: "¿El sellador reparará una fuga lenta?",
        answer:
          "Sí, el Salvamorenas puede sellar fugas lentas causadas por pequeñas perforaciones. Sin embargo, si la fuga es causada por daño en el rin o la válvula, se recomienda una inspección profesional.",
      },
      {
        question: "¿Es mejor usar sellador que reparar una pinchadura?",
        answer:
          "El sellador es una solución preventiva y de emergencia. Para pinchazos grandes o daños estructurales, siempre se recomienda una reparación profesional. El Salvamorenas es ideal como primera línea de defensa para evitar quedarte varado.",
      },
      {
        question: "¿Cuánto tiempo tarda la aplicación del Salvamorenas?",
        answer:
          "La instalación del sellador en los neumáticos de camiones y trailers es relativamente rápida. En promedio, toma entre 2 y 3 horas para un conjunto de 10 llantas.",
      },
    ],
    relatedServices: [
      { title: "Balanceo de Llantas", slug: "balanceo-de-llantas" },
      { title: "Depilada de Llantas", slug: "reparacion-de-neumaticos" },
      { title: "Alineación de Camiones", slug: "alineacion-de-camiones" },
    ],
    ctaText: "Agendar Cita",
  };

  return <ServicePageTemplate {...serviceData} />;
}
