import { Button } from "@/components/ui/button";
import { ChevronRight, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";

export default function InspeccionBailadaDallas() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;

      const footerRect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        setShowFloatingCTA(false);
      } else {
        setShowFloatingCTA(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hola The Truck Savers Dallas, quiero programar una inspección La Bailada para mi camión. ¿Tienen disponibilidad?"
  );
  const whatsappLink = `https://wa.me/14697759715?text=${whatsappMessage}`;

  const features = [
    "Diagnóstico completo de más de 100 componentes",
    "Prueba en simulador de carretera (La Bailada)",
    "Análisis de sistema de suspensión",
    "Verificación de sistema de dirección",
    "Revisión integral de frenos",
    "Informe técnico detallado con recomendaciones",
  ];

  const faqs = [
    {
      question: "¿La inspección La Bailada tiene algún costo en Dallas?",
      answer:
        "No, la inspección es totalmente GRATUITA. En The Truck Savers creemos que conocer el estado de tu camión no debería costarte nada.",
    },
    {
      question: "¿Cómo funciona el simulador La Bailada?",
      answer:
        "Nuestro simulador reproduce las condiciones de manejo en carretera, haciendo que el camión se mueva de forma controlada para detectar desgastes, holguras y problemas en suspensión, dirección y otros sistemas.",
    },
    {
      question: "¿Cuánto dura el proceso de inspección?",
      answer:
        "El diagnóstico completo toma entre 30 y 45 minutos. Contamos con área de espera cómoda mientras revisamos tu vehículo.",
    },
    {
      question: "¿Qué obtengo al finalizar la inspección?",
      answer:
        "Te entregamos un reporte técnico completo con los hallazgos, nivel de urgencia de cada reparación y cotización sin compromiso para los trabajos necesarios.",
    },
  ];

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <SEO
        title="Inspección La Bailada en Dallas, TX | The Truck Savers"
        description="Inspección mecánica GRATIS para camiones en Dallas. Simulador de carretera La Bailada detecta problemas en suspensión, frenos y dirección. 24 años de experiencia."
        keywords="inspección camiones Dallas, La Bailada Dallas, taller camiones Dallas TX, diagnóstico suspensión camiones"
        canonical="https://thetrucksavers.com/dallas/inspeccion-la-bailada"
      />

      {/* Floating WhatsApp CTA - Mobile */}
      {showFloatingCTA && (
        <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-in fade-in">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 flex items-center justify-center gap-2 shadow-lg">
              <MessageCircle size={24} />
              Agendar por WhatsApp
            </Button>
          </a>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-gray-900">
        <img
          src="/bailada-header.jpg"
          alt="La Bailada - Inspección Mecánica de Camiones en Dallas"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
          <div className="container">
            <p className="text-green-400 font-semibold mb-2">Dallas, TX</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Inspección La Bailada
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              Diagnóstico avanzado con simulador de carretera
            </p>
            <div className="hidden md:flex gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 flex items-center gap-2">
                  <MessageCircle size={20} />
                  Agendar por WhatsApp
                </Button>
              </a>
              <a href="tel:+14697759715">
                <Button className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8">
                  Llamar: 469-775-9715
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16 pb-24 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tecnología de Diagnóstico Avanzada en Dallas
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                En The Truck Savers Dallas contamos con La Bailada, un innovador simulador de carretera que reproduce las condiciones reales de manejo. Esta tecnología nos permite identificar problemas ocultos en tu camión que no se detectan en una inspección visual tradicional.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Con más de 24 años de experiencia en el área de Dallas-Fort Worth, nuestros técnicos certificados analizan más de 100 puntos críticos de tu vehículo. Y lo mejor: esta inspección es completamente GRATIS.
              </p>
            </section>

            {/* Features */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Qué Revisamos en Tu Camión?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <ChevronRight className="text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section className="mb-12 bg-blue-50 p-8 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ventajas de Inspeccionar Tu Camión con Nosotros
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Prevención inteligente:</strong> Detectamos fallas antes de que te dejen varado en la carretera
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Protege tu inversión:</strong> Evita reparaciones costosas con mantenimiento preventivo
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Cumple con DOT:</strong> Asegura que tu camión pase las inspecciones federales
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Viaja seguro:</strong> Protege tu vida y la de otros conductores en la carretera
                  </span>
                </li>
              </ul>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Preguntas Frecuentes
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition"
                  >
                    <summary className="font-semibold text-gray-900 flex items-center justify-between">
                      {faq.question}
                      <span className="ml-2">▼</span>
                    </summary>
                    <p className="mt-3 text-gray-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block lg:sticky lg:top-20">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-lg shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4">Agenda Tu Inspección GRATIS</h3>
                <p className="text-green-100 mb-6">
                  Nuestro equipo en Dallas está listo para revisar tu camión. Sin costo, sin compromiso.
                </p>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-3 mb-3 flex items-center justify-center gap-2">
                    <MessageCircle size={20} />
                    Agendar por WhatsApp
                  </Button>
                </a>

                <a href="tel:+14697759715" className="block">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3">
                    Llamar: 469-775-9715
                  </Button>
                </a>

                <div className="mt-6 pt-6 border-t border-green-400 space-y-3">
                  <div>
                    <p className="text-sm text-green-100">Horario de Atención</p>
                    <p className="font-semibold">Lun-Vie: 8am - 6pm</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-100">Tiempo de Inspección</p>
                    <p className="font-semibold">30 a 45 minutos</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-100">Precio</p>
                    <p className="font-semibold">¡GRATIS!</p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">📍 Nuestra Ubicación en Dallas</h3>
                <p className="text-gray-700 mb-4">
                  Dallas, TX
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Amplio estacionamiento para camiones
                </p>
                <a
                  href="tel:+14697759715"
                  className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
                >
                  📞 Llamar ahora
                </a>
              </div>
            </div>

            {/* Mobile Version */}
            <div className="lg:hidden space-y-6 mt-12">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Agenda Tu Inspección GRATIS</h3>
                <p className="text-green-100 mb-4 text-sm">
                  Revisamos tu camión sin costo en Dallas.
                </p>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-2 mb-2 flex items-center justify-center gap-2 text-sm">
                    <MessageCircle size={18} />
                    Agendar por WhatsApp
                  </Button>
                </a>

                <a href="tel:+14697759715" className="block">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 text-sm">
                    Llamar: 469-775-9715
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Reference for Floating CTA */}
      <div ref={footerRef} />
    </div>
  );
}
