import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function Frenos() {
  const serviceData = {
    title: "Taller de Frenos para Camiones y Trailers",
    subtitle: "Frenos al 100% - Protege tu carga y tu viaje",
    heroImage: "/images/thetrucksavers-4.webp",
    description:
      "Nuestro taller de frenos está especializado en la inspección, diagnóstico y reparación del sistema de frenos de camiones de carga y trailers. Con más de 24 años de experiencia, nuestros mecánicos certificados utilizan equipos de diagnóstico de última generación para prevenir fallas críticas y garantizar tu seguridad en carretera. Ofrecemos servicios completos desde inspección de pastillas y discos hasta ajustes de frenos de aire.",
    features: [
      "Inspección y diagnóstico del sistema de frenos",
      "Reemplazo de pastillas y discos de freno",
      "Ajuste del pedal del freno",
      "Reparación de frenos de aire",
      "Cambio de líquido de frenos",
      "Prueba de funcionamiento en carretera",
      "Diagnóstico con equipos especializados",
      "Garantía en todos nuestros trabajos",
    ],
    faqs: [
      {
        question: "¿Por qué los camiones usan frenos de aire?",
        answer:
          "Los camiones utilizan frenos de aire porque proporcionan una gran potencia de frenado y son más eficientes para manejar el peso y las demandas de frenado de vehículos pesados. El sistema de frenos de aire utiliza aire comprimido para accionar los cilindros de freno, lo que permite una mayor fuerza de frenado sin la necesidad de un sistema hidráulico. Además, son más fiables en condiciones de trabajo exigentes, como en largas distancias o rutas montañosas.",
      },
      {
        question: "¿Cómo sé si los frenos de mi camión necesitan atención?",
        answer:
          "Signos comunes incluyen: pedal de freno 'blando' o difícil de presionar, ruidos extraños al frenar, vibraciones durante el frenado, mayor distancia de frenado, o luz de advertencia de frenos encendida.",
      },
      {
        question: "¿Qué tipos de frenos se usan en camiones?",
        answer:
          "Existen varios tipos: frenos de disco (comunes en camiones modernos por su capacidad de disipar calor), frenos de tambor (más tradicionales y económicos), frenos de aire (esenciales en camiones de carga pesada), frenos hidráulicos, frenos regenerativos (en camiones eléctricos) y frenos de retardo para pendientes.",
      },
      {
        question: "¿Cuánto tiempo tarda una reparación de frenos?",
        answer:
          "El tiempo varía según el tipo de reparación. Una inspección básica toma aproximadamente 1 hora, mientras que reparaciones más complejas como cambio de discos o ajuste del sistema de aire pueden tomar de 2 a 4 horas.",
      },
      {
        question: "¿Con qué frecuencia debo revisar los frenos de mi camión?",
        answer:
          "Se recomienda una inspección de frenos cada 25,000 millas o cada 6 meses, lo que ocurra primero. Sin embargo, si notas cualquier síntoma de problemas, debes traer tu camión inmediatamente.",
      },
    ],
    relatedServices: [
      { title: "Inspección Mecánica La Bailada", slug: "inspeccion-bailada" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
      { title: "Alineación de Camiones", slug: "alineacion" },
    ],
    ctaText: "Agendar Cita",
    location: "houston",
  };

  return <ServicePageTemplate {...serviceData} />;
}
