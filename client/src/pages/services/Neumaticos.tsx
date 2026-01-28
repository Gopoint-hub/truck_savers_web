import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function Neumaticos() {
  const serviceData = {
    title: "Depilada de Llantas para Camión y Trailer",
    subtitle: "Servicio especializado en depilado, reparación y balanceo de llantas",
    heroImage: "/images/amarillo-camion-decorativo.webp",
    description:
      "En The Truck Savers ofrecemos servicios completos de reparación y mantenimiento de llantas para camiones y trailers. Si inspeccionaste tus llantas y encontraste algún desgaste irregular, te ofrecemos soluciones profesionales: desde la reparación de una llanta ponchada hasta un rectificado o depilado, balanceo y alineación. Nuestro equipo utiliza equipos de última generación para asegurar que tus llantas estén en óptimas condiciones.",
    features: [
      "Depilado de llantas",
      "Reparación de punciones",
      "Balanceo de llantas",
      "Inspección de desgaste",
      "Alineación preventiva",
      "Asesoramiento en mantenimiento",
    ],
    faqs: [
      {
        question: "¿Qué es la depilada o rectificado de llantas?",
        answer:
          "También conocido como depilado, es un proceso que elimina el desgaste irregular, haciendo a la llanta redonda y emparejando el dibujo. Esto evita vibraciones y extiende la vida útil de la llanta.",
      },
      {
        question: "¿Cuánto cuesta una depilada?",
        answer:
          "El costo depende del tamaño y condición de la llanta. Te recomendamos contactarnos para una evaluación sin costo.",
      },
      {
        question: "¿Cuál es la diferencia entre reparación y depilado?",
        answer:
          "La reparación trata punciones específicas, mientras que el depilado o rectificado corrige el desgaste irregular de toda la superficie de la llanta.",
      },
      {
        question: "¿Cómo puedo prevenir el desgaste irregular?",
        answer:
          "Mantén la alineación correcta, verifica la presión de aire regularmente, y realiza inspecciones periódicas con nuestro servicio La Bailada.",
      },
    ],
    relatedServices: [
      { title: "Alineación de Camiones", slug: "alineacion" },
      { title: "Inspección Mecánica La Bailada", slug: "inspeccion-bailada" },
      { title: "Taller de Suspensiones", slug: "suspensiones" },
    ],
    ctaText: "Agendar Cita",
    location: "houston",
  };

  return <ServicePageTemplate {...serviceData} />;
}
