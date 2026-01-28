import { Button } from "@/components/ui/button";
import { ChevronRight, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";

export default function InspeccionBailadaMonterrey() {
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
    "Hola The Truck Savers Monterrey, me interesa agendar una inspección La Bailada. ¿Cuándo puedo llevar mi camión?"
  );
  const whatsappLink = `https://wa.me/528112534696?text=${whatsappMessage}`;

  const features = [
    "Evaluación exhaustiva de más de 100 puntos de control",
    "Simulador de condiciones de carretera (La Bailada)",
    "Diagnóstico especializado de suspensión",
    "Inspección completa del sistema de dirección",
    "Análisis detallado del sistema de frenado",
    "Reporte técnico con hallazgos y cotización",
  ];

  const faqs = [
    {
      question: "¿Cuánto cuesta la inspección La Bailada en Monterrey?",
      answer:
        "La inspección es completamente GRATIS. En The Truck Savers queremos que todos los transportistas conozcan el estado real de su unidad sin ningún costo.",
    },
    {
      question: "¿Qué es el simulador La Bailada?",
      answer:
        "Es un equipo especializado que simula las condiciones de la carretera, haciendo que el camión se mueva de manera controlada para detectar problemas en suspensión, dirección, frenos y otros componentes críticos.",
    },
    {
      question: "¿Cuánto tiempo toma la revisión completa?",
      answer:
        "La inspección dura aproximadamente 30 a 45 minutos. Puedes esperar en nuestras instalaciones mientras nuestros técnicos revisan tu unidad.",
    },
    {
      question: "¿Qué información me entregan después?",
      answer:
        "Recibes un reporte detallado con todos los hallazgos, clasificados por nivel de urgencia, junto con una cotización sin compromiso para las reparaciones necesarias.",
    },
  ];

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <SEO
        title="Inspección La Bailada en Monterrey | The Truck Savers"
        description="Inspección mecánica GRATIS para tractocamiones en Monterrey. Simulador La Bailada para detectar fallas en suspensión, frenos y dirección. 24 años de experiencia."
        keywords="inspección camiones Monterrey, La Bailada Monterrey, taller tractocamiones Monterrey, diagnóstico suspensión camiones México"
        canonical="https://thetrucksavers.com/monterrey/inspeccion-la-bailada"
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
          alt="La Bailada - Inspección Mecánica de Tractocamiones en Monterrey"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
          <div className="container">
            <p className="text-green-400 font-semibold mb-2">Monterrey, N.L.</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Inspección La Bailada
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              Diagnóstico profesional con tecnología de simulación
            </p>
            <div className="hidden md:flex gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 flex items-center gap-2">
                  <MessageCircle size={20} />
                  Agendar por WhatsApp
                </Button>
              </a>
              <a href="tel:+528112534696">
                <Button className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8">
                  Llamar: 81 1253 4696
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
                Tecnología de Punta para el Transporte en México
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                En The Truck Savers Monterrey traemos la misma tecnología que ha revolucionado el mantenimiento de tractocamiones en Estados Unidos. Nuestro simulador La Bailada reproduce las condiciones reales de las carreteras mexicanas, permitiendo detectar problemas que no se ven a simple vista.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Con 24 años de experiencia atendiendo a transportistas, nuestro equipo de técnicos especializados revisa más de 100 puntos críticos de tu unidad. Esta inspección es completamente GRATIS porque creemos que la seguridad no debe tener costo.
              </p>
            </section>

            {/* Features */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Qué Incluye la Inspección?
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
                ¿Por Qué Hacer la Inspección La Bailada?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Evita paros inesperados:</strong> Detecta fallas antes de que te dejen tirado en la carretera
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Ahorra en reparaciones:</strong> El mantenimiento preventivo cuesta menos que las reparaciones de emergencia
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Cumple normativas:</strong> Mantén tu unidad en condiciones óptimas para las verificaciones
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Protege tu carga:</strong> Un camión en buen estado protege tu mercancía y tu inversión
                  </span>
                </li>
              </ul>
            </section>

            {/* Videos de YouTube */}
            <section className="mb-12 bg-red-50 p-8 rounded-lg border border-red-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Videos de La Bailada
              </h2>
              <p className="text-gray-700 mb-4">
                Mira nuestra lista de reproducción con videos explicativos sobre el servicio de inspección La Bailada y cómo funciona nuestro simulador de camino.
              </p>
              <a 
                href="https://youtube.com/playlist?list=PLCJ62d3C3v0tnBwSycip-zPLaslH5htkR&si=ys0eqDU0_eZft9fy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Ver Videos en YouTube
              </a>
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
                  Nuestro equipo en Monterrey está listo para revisar tu tractocamión. Sin costo, sin compromiso.
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

                <a href="tel:+528112534696" className="block">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3">
                    Llamar: 81 1253 4696
                  </Button>
                </a>

                <div className="mt-6 pt-6 border-t border-green-400 space-y-3">
                  <div>
                    <p className="text-sm text-green-100">Horario de Atención</p>
                    <p className="font-semibold">Lun-Vie: 8am - 6pm</p>
                    <p className="font-semibold">Sáb: 8am - 2pm</p>
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
                <h3 className="font-bold text-gray-900 mb-4">📍 Nuestra Ubicación en Monterrey</h3>
                <p className="text-gray-700 mb-4">
                  Monterrey, Nuevo León
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Amplio patio para tractocamiones
                </p>
                <a
                  href="tel:+528112534696"
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
                  Revisamos tu tractocamión sin costo en Monterrey.
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

                <a href="tel:+528112534696" className="block">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 text-sm">
                    Llamar: 81 1253 4696
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
