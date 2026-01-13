import { Button } from "@/components/ui/button";
import { ChevronRight, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function InspeccionBailada() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;

      const footerRect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Ocultar el botón flotante si está cerca del footer
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
    "Hola The Truck Savers, me gustaría agendar una inspección La Bailada. ¿Cuál es la disponibilidad?"
  );
  const whatsappLink = `https://wa.me/17134555566?text=${whatsappMessage}`;

  const features = [
    "Inspección de más de 100 puntos de seguridad",
    "Simulador de camino (La Bailada)",
    "Diagnóstico de suspensión",
    "Evaluación de dirección",
    "Inspección de frenos",
    "Reporte detallado de hallazgos",
  ];

  const faqs = [
    {
      question: "¿Cuánto cuesta la inspección La Bailada?",
      answer:
        "¡Es completamente GRATIS! Creemos que todo camionero merece saber el estado de su vehículo sin costo alguno.",
    },
    {
      question: "¿Qué es exactamente La Bailada?",
      answer:
        "Es un simulador de camino que hace que tu camión 'baile' controladamente, permitiéndonos detectar problemas en suspensión, dirección y otros componentes sin estar en carretera.",
    },
    {
      question: "¿Cuánto tiempo tarda la inspección?",
      answer:
        "La inspección completa tarda aproximadamente 30 a 45 minutos. Puedes esperar cómodamente en nuestras instalaciones.",
    },
    {
      question: "¿Qué información recibo después?",
      answer:
        "Recibirás un reporte detallado con todos los hallazgos, recomendaciones de reparación y presupuestos para cualquier trabajo necesario.",
    },
  ];

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Floating WhatsApp CTA - Mobile (oculto cuando se acerca al footer) */}
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
          src="/images/thetrucksavers-bailador-1-webp.webp"
          alt="La Bailada - Inspección Mecánica"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Inspección Mecánica La Bailada
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              Simulador de camino para detección completa de problemas
            </p>
            <div className="hidden md:flex gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 flex items-center gap-2">
                  <MessageCircle size={20} />
                  Agendar por WhatsApp
                </Button>
              </a>
              <Button className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8">
                Llamar: 713-455-5566
              </Button>
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
                ¿Por Qué La Bailada es Importante?
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                La Bailada es nuestro exclusivo simulador de camino que permite detectar problemas en tu camión sin necesidad de estar en carretera. Este servicio revolucionario inspecciona más de 100 puntos de seguridad de tu vehículo, incluyendo suspensión, dirección, frenos y componentes críticos.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Es completamente GRATIS para todos nuestros clientes. Sabemos que tu camión es tu negocio, y queremos asegurarnos de que esté en perfectas condiciones.
              </p>
            </section>

            {/* Features */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Qué Incluye La Inspección?
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
                Beneficios de La Bailada
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Detección temprana:</strong> Identifica problemas antes de que se conviertan en costosas reparaciones
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Ahorro de dinero:</strong> Previene daños mayores y extiende la vida útil de tu camión
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Seguridad:</strong> Asegura que tu vehículo cumple con los estándares de seguridad DOT
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Tranquilidad:</strong> Conduce con confianza sabiendo que tu camión está en óptimas condiciones
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

          {/* Right Column - Sidebar (no sticky en mobile) */}
          <div className="lg:col-span-1">
            {/* CTA Box - Sticky solo en desktop */}
            <div className="hidden lg:block lg:sticky lg:top-20">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-lg shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4">¿Listo para Inspeccionar tu Camión?</h3>
                <p className="text-green-100 mb-6">
                  Agenda tu inspección La Bailada GRATIS hoy mismo. Nuestro equipo te atenderá rápidamente.
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

                <a href="tel:+17134555566" className="block">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3">
                    Llamar: 713-455-5566
                  </Button>
                </a>

                <div className="mt-6 pt-6 border-t border-green-400 space-y-3">
                  <div>
                    <p className="text-sm text-green-100">Disponibilidad</p>
                    <p className="font-semibold">Lunes a Viernes, 8am - 6pm</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-100">Duración</p>
                    <p className="font-semibold">30 a 45 minutos</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-100">Costo</p>
                    <p className="font-semibold">¡COMPLETAMENTE GRATIS!</p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">📍 Ubicación</h3>
                <p className="text-gray-700 mb-4">
                  1362 Sheffield Blvd
                  <br />
                  Houston, TX 77020
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Estacionamiento para 50+ vehículos
                </p>
                <a
                  href="tel:+17134555566"
                  className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
                >
                  📞 Llamar ahora
                </a>
              </div>
            </div>

            {/* Mobile Version - No Sticky */}
            <div className="lg:hidden space-y-6 mt-12">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">¿Listo para Inspeccionar tu Camión?</h3>
                <p className="text-green-100 mb-4 text-sm">
                  Agenda tu inspección La Bailada GRATIS hoy mismo.
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

                <a href="tel:+17134555566" className="block">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 text-sm">
                    Llamar: 713-455-5566
                  </Button>
                </a>

                <div className="mt-4 pt-4 border-t border-green-400 space-y-2">
                  <div>
                    <p className="text-xs text-green-100">Disponibilidad</p>
                    <p className="font-semibold text-sm">Lunes a Viernes, 8am - 6pm</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-100">Costo</p>
                    <p className="font-semibold text-sm">¡COMPLETAMENTE GRATIS!</p>
                  </div>
                </div>
              </div>

              {/* Info Box Mobile */}
              <div ref={footerRef} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">📍 Ubicación</h3>
                <p className="text-gray-700 mb-4">
                  1362 Sheffield Blvd
                  <br />
                  Houston, TX 77020
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Estacionamiento para 50+ vehículos
                </p>
                <a
                  href="tel:+17134555566"
                  className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
                >
                  📞 Llamar ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
