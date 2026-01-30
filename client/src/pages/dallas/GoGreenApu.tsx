import { Button } from "@/components/ui/button";
import { ChevronRight, MessageCircle, Phone, DollarSign, CreditCard, Building2 } from "lucide-react";
import { Link } from "wouter";
import ApuCalculator from "@/components/ApuCalculator";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

export default function GoGreenApuDallas() {
  // WhatsApp específico para APU
  const whatsappNumber = "17134555572";
  const whatsappMessage = encodeURIComponent(
    "Hola, me interesa cotizar un Go Green APU en Dallas. ¿Podrían darme más información?"
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Estado para la galería de imágenes
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const features = [
    "❄️ 26,000 BTU de AC y calefacción sin ralentí",
    "⚡ Generador de energía de 4.0 kW",
    "🔋 Carga las baterías de tu camión",
    "🔥 Sistema de precalentamiento de motor para el invierno",
    "✅ Todo incluido, no requiere accesorios adicionales",
    "🔧 Mantenimiento económico con piezas automotrices estándar (sin depender de dealer)",
    "⛽ Ahorro de hasta $14,000/año entre diésel + motor",
    "🌱 Cumple con todas las regulaciones anti-idle de EE.UU.",
  ];

  const faqs = [
    {
      question: "¿Cuál es el monto de inversión de un Go Green APU?",
      answer:
        "El monto de inversión varía según el modelo y condición, desde $5,495 hasta $13,995 USD. Puedes reservar tu equipo con solo $500 USD para programar la instalación.",
    },
    {
      question: "¿Cuánto combustible consume el Go Green APU por hora?",
      answer:
        "Sin APU, tu camión consume aproximadamente 1 GAL/hora en ralentí. Con el Go Green APU, el consumo baja a solo 0.2 GAL/hora. Esto representa un ahorro de hasta 80% en combustible.",
    },
    {
      question: "¿Cuánto dura un Go Green APU?",
      answer:
        "La vida útil depende del tipo de equipo: los usados tienen 3-5 años de vida restante, los remanufacturados 5-7 años, y los nuevos pueden durar hasta 10 años con el mantenimiento adecuado.",
    },
    {
      question: "¿Qué garantía tiene el Go Green APU?",
      answer:
        "Los equipos usados cuentan con 180 días de garantía para el motor y el APU. Los remanufacturados y nuevos tienen 1 año de garantía para el APU y 2 años para el motor. También ofrecemos asistencia técnica remota.",
    },
    {
      question: "¿Qué dispositivos puedo alimentar con el Go Green APU?",
      answer:
        "El APU genera energía suficiente para cargar las baterías del camión, aire acondicionado, calefacción, microondas, refrigeradores, televisores, cargadores de celular/laptop, luces LED y más.",
    },
    {
      question: "¿El Go Green APU cumple con las regulaciones ambientales?",
      answer:
        "Sí. En muchos estados de EE.UU. está prohibido dejar el camión encendido en reposo por más de cierto tiempo. El Go Green APU permite cumplir con esas regulaciones y puede ayudarte a acceder a beneficios fiscales.",
    },
    {
      question: "¿Cada cuánto se le da mantenimiento al APU?",
      answer:
        "El mantenimiento preventivo se realiza cada 1,000 horas de uso, incluyendo cambio de filtros y aceite. Las piezas son automotrices estándar, por lo que el mantenimiento es económico y fácil de realizar sin depender de un dealer.",
    },
    {
      question: "¿Dónde están ubicados?",
      answer:
        "Contamos con centros de instalación de APU en: 📍 Houston, TX | 📍 Dallas, TX | 📍 Altoona, PA",
    },
  ];

  // Galería de instalaciones (incluye imágenes de producto y de instalaciones)
  const galleryImages = [
    // Imágenes de producto/tecnología
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/SBpusmDpnXQoQUKi.webp",
      alt: "App móvil y controlador de cabina Go Green APU",
      caption: "App Móvil + Controlador de Cabina"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/FlgWyNdPffiAbVfF.webp",
      alt: "PDM y controlador de cabina Go Green APU",
      caption: "PDM Inteligente"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/MtJnABOKarAXEvZQ.webp",
      alt: "Cubierta de acero inoxidable Go Green APU",
      caption: "Cubierta Premium Acero Inoxidable"
    },
    // Instalaciones en camiones
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/syswrXjOyyOhtzob.jpg",
      alt: "Instalación APU en Freightliner Cascadia blanco - Crete Carrier",
      caption: "Freightliner Cascadia - Crete Carrier"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/cBJNWgKwucBAKsLU.jpg",
      alt: "Instalación APU en Kenworth T680 verde - TM Transport",
      caption: "Kenworth T680 - TM Transport"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/weCPDHqdPMUuJPcM.jpg",
      alt: "Instalación APU en Freightliner Cascadia blanco - Mercer Transportation",
      caption: "Freightliner Cascadia - Mercer"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/jBBHbNtKjekyqvDv.jpeg",
      alt: "Instalación APU Remanufacturado en Peterbilt gris",
      caption: "Peterbilt - APU Remanufacturado"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/FvusVxHOIftNLGCS.jpg",
      alt: "Detalle de instalación APU con cubierta de aluminio diamantado",
      caption: "Detalle de cubierta diamantada"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/zyWPmqQOrSjmjBny.jpeg",
      alt: "Instalación APU en camión amarillo Altom Transport",
      caption: "Prostar - Altom Transport"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/cphxZDmVPlCApqgH.jpeg",
      alt: "Detalle lateral de instalación APU en camión amarillo",
      caption: "Vista lateral - Altom Transport"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/wjPuZpVrQtGKHzUZ.jpeg",
      alt: "Vista trasera de instalación APU",
      caption: "Vista trasera de instalación"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/NYwBxrrmMMOOvxMC.jpg",
      alt: "Motor Kubota del Go Green APU durante instalación",
      caption: "Motor Kubota - Durante instalación"
    },
    {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/osEfrLMWfGmLVNlW.jpeg",
      alt: "Vista interna del motor APU instalado",
      caption: "Vista interna del motor"
    },
  ];

  // Imágenes de producto
  const productImages = {
    phoneApp: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/SBpusmDpnXQoQUKi.webp",
    pdmController: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/FlgWyNdPffiAbVfF.webp",
    stainlessCover: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/MtJnABOKarAXEvZQ.webp",
  };

  const relatedServices = [
    { title: "Sistema de Escape", slug: "sistema-de-escape" },
    { title: "Inspección La Bailada", slug: "inspeccion-la-bailada" },
    { title: "Taller de Suspensiones", slug: "suspensiones" },
  ];

  return (
    <>
      <Helmet>
        <title>Go Green APU en Dallas - Reduce hasta 80% tu Gasto en Diésel | The Truck Savers</title>
        <meta
          name="description"
          content="Ahorra hasta $14,000 al año con el Go Green APU en Dallas, TX. Aire acondicionado, calefacción y energía eléctrica sin dejar el motor encendido. Instalación profesional."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section con nuevo banner */}
        <div className="relative h-auto min-h-[400px] overflow-hidden bg-gray-900">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/upuvJphqCtsBoXOA.webp"
            alt="Go Green APU instalado en camión - The Truck Savers Dallas"
            className="w-full h-full object-cover opacity-50 absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
          <div className="container relative z-10 py-16 md:py-24">
            <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              📍 Dallas, TX
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
              Reduce hasta 80% tu Gasto en Diésel
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
              Aire acondicionado, calefacción y energía eléctrica sin dejar el motor encendido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Cotizar APU
                </Button>
              </a>
              <a href="tel:+17134555572">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-6 text-lg"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Llámanos Ahora
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Problem Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  El Problema del Ralentí
                </h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Cuando tu camión está en ralentí, puede consumir hasta <strong>1 galón de diésel por hora</strong>, generando:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✗</span> Gasto innecesario de combustible
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✗</span> Desgaste prematuro del motor
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✗</span> Costos altos de mantenimiento
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    El <strong>Go Green APU</strong> es una unidad auxiliar compacta que mantiene tu cabina cómoda mientras ahorras dinero, consumiendo solo <strong>0.20 galones por hora</strong>.
                  </p>
                  <p className="text-green-700 font-bold text-lg mt-4">
                    👉 Eso significa hasta 80% menos combustible, menos horas de motor, más vida útil para tu camión y mejores rendimientos para tu negocio.
                  </p>
                </div>
              </section>

              {/* Micro-segmentation */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Ideal para:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">🚚 Owner Operators</h3>
                    <p className="text-gray-600">Ideal para quienes buscan reducir gastos mensuales y aumentar su rentabilidad.</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">🚛 Flotas Pequeñas (4-10 camiones)</h3>
                    <p className="text-gray-600">Controla costos operativos y de mantenimiento mientras ofreces mejores condiciones a tus operadores.</p>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  ¿Qué Incluye el Go Green APU?
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

              {/* Financing Section */}
              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                  Opciones de Financiamiento
                </h2>
                <p className="text-gray-600 mb-6">
                  Sabemos que la inversión inicial puede ser un reto. Por eso ofrecemos varias opciones de financiamiento para que puedas comenzar a ahorrar desde hoy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-5 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-gray-800">Pago Directo</h4>
                    </div>
                    <p className="text-sm text-gray-600">Reserva con $500 USD y paga el resto en la instalación. Acepta tarjeta, transferencia o efectivo.</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Building2 className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="font-bold text-gray-800">Financiamiento</h4>
                    </div>
                    <p className="text-sm text-gray-600">Trabajamos con financieras especializadas en equipo para camiones. Plazos de 12 a 36 meses.</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <DollarSign className="w-5 h-5 text-amber-600" />
                      </div>
                      <h4 className="font-bold text-gray-800">Plan de Pagos</h4>
                    </div>
                    <p className="text-sm text-gray-600">Pregunta por nuestros planes de pago personalizados según tu situación.</p>
                  </div>
                </div>
                <div className="text-center">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Preguntar por Financiamiento
                    </Button>
                  </a>
                </div>
              </section>

              {/* Calculator Section */}
              <section id="calculadora">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                  Calcula ahora cuánto puedes ahorrar
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  Descubre tu ahorro mensual y anual con el Go Green APU
                </p>
                <ApuCalculator />
              </section>

              {/* Installation Gallery */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Galería de Instalaciones
                </h2>
                <p className="text-gray-600 mb-6">
                  Mira algunos de los APUs que hemos instalado a nuestros clientes. Cada instalación es realizada por técnicos certificados.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((image, idx) => (
                    <div 
                      key={idx}
                      className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:border-green-500 transition-all"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end">
                        <p className="text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-500 text-sm mt-4">
                  Haz clic en cualquier imagen para verla en tamaño completo
                </p>
              </section>

              {/* Image Modal */}
              {selectedImage && (
                <div 
                  className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="relative max-w-4xl max-h-[90vh]">
                    <img 
                      src={selectedImage} 
                      alt="Instalación de APU ampliada"
                      className="max-w-full max-h-[85vh] object-contain rounded-lg"
                    />
                    <button 
                      className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
                      onClick={() => setSelectedImage(null)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* YouTube Section */}
              <section className="bg-red-50 p-8 rounded-lg border border-red-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Video Go Green APU
                </h2>
                <p className="text-gray-700 mb-4">
                  Conoce cómo funciona el Go Green APU y cómo puede ayudarte a ahorrar hasta $14,000 al año en combustible y mantenimiento.
                </p>
                <a 
                  href="https://youtu.be/bQxRJUHde-M?si=zDedtLaCHCanNZ5H" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Ver Videos en YouTube
                </a>
              </section>

              {/* FAQs */}
              <section>
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
              {/* CTA Box */}
              <div className="sticky top-20 bg-green-600 text-white p-8 rounded-lg shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4">¿Listo para ahorrar?</h3>
                <p className="text-green-100 mb-6">
                  Contáctanos hoy para una recomendación personalizada.
                </p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    className="w-full bg-white text-green-600 hover:bg-gray-100 font-semibold flex items-center justify-center gap-2 mb-4"
                    size="lg"
                  >
                    <MessageCircle size={20} />
                    Cotizar APU
                  </Button>
                </a>
                <a href="tel:+17134555572">
                  <Button
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-green-600 font-semibold flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <Phone size={20} />
                    Llámanos Ahora
                  </Button>
                </a>
                <div className="mt-6 pt-6 border-t border-green-500 space-y-3">
                  <div>
                    <p className="text-sm text-green-100">Teléfono APU</p>
                    <a
                      href="tel:+17134555572"
                      className="text-lg font-semibold hover:underline"
                    >
                      713-455-5572
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-green-100">Email</p>
                    <a
                      href="mailto:info@thetrucksavers.com"
                      className="text-lg font-semibold hover:underline"
                    >
                      info@thetrucksavers.com
                    </a>
                  </div>
                </div>
              </div>

              {/* ROI Box */}
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
                <h3 className="font-bold text-amber-800 mb-2">
                  ⏱️ Retorno de Inversión
                </h3>
                <p className="text-amber-700">
                  <strong>6 meses a 1 año y 2 meses</strong>
                </p>
                <p className="text-amber-600 text-sm mt-1">
                  (Depende del modelo y uso)
                </p>
              </div>

              {/* Financing Quick Box */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
                <h3 className="font-bold text-blue-800 mb-2">
                  💳 Financiamiento Disponible
                </h3>
                <p className="text-blue-700 text-sm">
                  Reserva con solo <strong>$500 USD</strong>
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  Plazos de 12 a 36 meses
                </p>
              </div>

              {/* Related Services */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">
                  Otros Servicios en Dallas
                </h3>
                <ul className="space-y-2">
                  {relatedServices.map((service, idx) => (
                    <li key={idx}>
                      <Link href={`/dallas/${service.slug}`}>
                        <span className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 cursor-pointer">
                          <ChevronRight size={16} />
                          {service.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para dejar de perder dinero?
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Cada día sin un APU es dinero que estás dejando escapar. Contáctanos ahora para una cotización personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Cotizar APU
                </Button>
              </a>
              <a href="tel:+17134555572">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 font-bold px-8 py-6 text-lg"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Llámanos: 713-455-5572
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
