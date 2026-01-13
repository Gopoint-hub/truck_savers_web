import ServicePageTemplate from "@/components/templates/ServicePageTemplate";

export default function Neumaticos() {
  const serviceData = {
    title: "Reparaciones de Neumáticos de Camión y Trailer",
    subtitle: "Servicio especializado en rectificación y reparación de llantas",
    heroImage: "/images/thetrucksavers-banner-3.webp",
    description:
      "En The Truck Savers ofrecemos servicios completos de reparación y rectificación de neumáticos para camiones y trailers. Si tu camión ha sido inspeccionado por un DOT y detectaron desgaste irregular, te ofrecemos soluciones profesionales. Nuestro equipo utiliza equipos de última generación para asegurar que tus llantas estén en óptimas condiciones.",
    features: [
      "Rectificación de llantas",
      "Reparación de punciones",
      "Balanceo de llantas",
      "Inspección de desgaste",
      "Alineación preventiva",
      "Asesoramiento en mantenimiento",
    ],
    faqs: [
      {
        question: "¿Qué es la rectificación de llantas?",
        answer:
          "Es un proceso que elimina el desgaste irregular de la llanta para extender su vida útil. Se realiza cuando el DOT detecta desgaste no uniforme que podría causar problemas de seguridad.",
      },
      {
        question: "¿Cuánto cuesta una rectificación?",
        answer:
          "El costo depende del tamaño y condición de la llanta. Te recomendamos contactarnos para una evaluación sin costo.",
      },
      {
        question: "¿Cuál es la diferencia entre reparación y rectificación?",
        answer:
          "La reparación trata punciones específicas, mientras que la rectificación corrige el desgaste irregular de toda la superficie de la llanta.",
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
  };

  return <ServicePageTemplate {...serviceData} />;
}
