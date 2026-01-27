import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({ faqs, title = "Preguntas Frecuentes", subtitle }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Generar datos estructurados para FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 bg-gray-50">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#368A45] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQs predefinidas para Houston
export const houstonFAQs: FAQ[] = [
  {
    question: "¿Cuánto cuesta la inspección 'La Bailada' en Houston?",
    answer: "La inspección 'La Bailada' es completamente gratuita. Nuestro simulador de camino detecta problemas en suspensión, dirección y componentes críticos sin costo alguno para usted."
  },
  {
    question: "¿Qué servicios de camiones ofrecen en Houston?",
    answer: "Ofrecemos servicios completos incluyendo alineación de camiones, reparación de suspensiones, servicio de frenos, cambio de aceite para motores diésel, balanceo, reparación de neumáticos, cardanes, mofles y más."
  },
  {
    question: "¿Cuál es el horario del taller en Houston?",
    answer: "Nuestro taller en Houston está abierto de Lunes a Viernes de 8:00 AM a 6:00 PM, y los Sábados de 8:00 AM a 2:00 PM."
  },
  {
    question: "¿Dónde está ubicado The Truck Savers en Houston?",
    answer: "Estamos ubicados en 1362 Sheffield Blvd, Houston, TX 77015. Puede llamarnos al 713-455-5566 o contactarnos por WhatsApp para obtener direcciones."
  },
  {
    question: "¿Trabajan con flotas de camiones en Houston?",
    answer: "Sí, ofrecemos servicios especializados para flotas comerciales con mantenimiento preventivo programado, precios especiales por volumen y atención prioritaria."
  },
  {
    question: "¿Qué marcas de camiones reparan en Houston?",
    answer: "Reparamos todas las marcas principales incluyendo Freightliner, Kenworth, Peterbilt, Volvo, International, Mack y más. Nuestros técnicos están certificados para trabajar con cualquier marca."
  }
];

// FAQs predefinidas para Dallas
export const dallasFAQs: FAQ[] = [
  {
    question: "¿Cuánto cuesta la inspección 'La Bailada' en Dallas?",
    answer: "La inspección 'La Bailada' es completamente gratuita en nuestra ubicación de Dallas. Detectamos problemas en suspensión, dirección y componentes críticos sin costo."
  },
  {
    question: "¿Qué servicios de camiones ofrecen en Dallas?",
    answer: "En Dallas ofrecemos alineación de camiones, reparación de suspensiones, servicio de frenos, cambio de aceite diésel, dirección hidráulica y mantenimiento preventivo completo."
  },
  {
    question: "¿Cuál es el horario del taller en Dallas?",
    answer: "Nuestro taller en Dallas está abierto de Lunes a Viernes de 8:00 AM a 6:00 PM, y los Sábados de 8:00 AM a 2:00 PM."
  },
  {
    question: "¿Dónde está ubicado The Truck Savers en Dallas?",
    answer: "Estamos ubicados en 4739 Lucky Ln, Dallas, TX 75247. Puede contactarnos al 713-455-5566 o por WhatsApp para más información."
  },
  {
    question: "¿Ofrecen servicio de emergencia en Dallas?",
    answer: "Sí, contamos con servicio de atención prioritaria para emergencias. Contáctenos por WhatsApp o teléfono y haremos lo posible por atenderle lo antes posible."
  }
];

// FAQs predefinidas para Monterrey
export const monterreyFAQs: FAQ[] = [
  {
    question: "¿Cuánto cuesta la inspección 'La Bailada' en Monterrey?",
    answer: "La inspección 'La Bailada' es completamente gratuita en nuestra ubicación de Monterrey. Nuestro simulador detecta problemas sin costo para usted."
  },
  {
    question: "¿Qué servicios de camiones ofrecen en Monterrey?",
    answer: "En Monterrey ofrecemos alineación de camiones, reparación de suspensiones, servicio de frenos, cambio de aceite diésel, dirección hidráulica y mantenimiento completo."
  },
  {
    question: "¿Cuál es el horario del taller en Monterrey?",
    answer: "Nuestro taller en Monterrey está abierto de Lunes a Domingo de 7:00 AM a 7:00 PM, ofreciendo mayor disponibilidad para nuestros clientes."
  },
  {
    question: "¿Dónde está ubicado The Truck Savers en Monterrey?",
    answer: "Estamos ubicados en Libramiento Noreste KM 33.5, Interior 30, Nueva Castilla, Escobedo, Nuevo León. Puede contactarnos al +52 81 3541 4652."
  },
  {
    question: "¿Atienden camiones de carga internacional en Monterrey?",
    answer: "Sí, atendemos camiones de carga nacional e internacional. Nuestra ubicación estratégica cerca del Libramiento Noreste facilita el acceso para transportistas."
  }
];

// FAQs generales
export const generalFAQs: FAQ[] = [
  {
    question: "¿Qué es la inspección 'La Bailada'?",
    answer: "La Bailada es nuestra inspección gratuita exclusiva que utiliza un simulador de camino para detectar problemas en la suspensión, dirección y más de 100 puntos de seguridad de tu camión mientras está en movimiento."
  },
  {
    question: "¿Cuántos años de experiencia tiene The Truck Savers?",
    answer: "The Truck Savers tiene más de 24 años de experiencia en reparación y mantenimiento de camiones y trailers, sirviendo a la comunidad de transportistas en Texas y México."
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), y ofrecemos opciones de financiamiento."
  },
  {
    question: "¿Ofrecen garantía en sus servicios?",
    answer: "Sí, todos nuestros servicios incluyen garantía. La duración varía según el tipo de servicio. Consulte con nuestro equipo para conocer los detalles específicos de cada garantía."
  },
  {
    question: "¿Necesito cita previa?",
    answer: "Recomendamos agendar cita para asegurar disponibilidad, especialmente para servicios mayores. Sin embargo, también atendemos sin cita previa según disponibilidad."
  }
];
