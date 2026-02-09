import { Button } from "@/components/ui/button";
import { ChevronRight, MessageCircle, Calendar, Clock, Phone, Mail, User, Check, ChevronDown, Truck, Wrench, Shield, CircleGauge } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";

/**
 * Auto / Pickup Repair — Servicio de Diagnóstico y Reparación
 * URL: /pickup (principal) y /auto (redirección)
 * Destaca El Bailador como herramienta de diagnóstico para autos y pickups
 * Incluye calendario de citas para "La Bailada" gratuita
 */

// Generar días disponibles para el calendario (próximos 14 días, excluyendo domingos)
function getAvailableDays(): { date: Date; label: string; dayName: string }[] {
  const days: { date: Date; label: string; dayName: string }[] = [];
  const today = new Date();
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  for (let i = 1; i <= 21 && days.length < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue; // Excluir domingos
    days.push({
      date: d,
      label: `${d.getDate()} ${monthNames[d.getMonth()]}`,
      dayName: dayNames[d.getDay()],
    });
  }
  return days;
}

// Horarios disponibles
const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

export default function AutoPickupRepair() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Formulario de cita
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const availableDays = getAvailableDays();

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const footerRect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setShowFloatingCTA(footerRect.top >= windowHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay === null || !selectedTime) return;
    setSubmitting(true);
    // Construir mensaje de WhatsApp con los datos de la cita
    const day = availableDays[selectedDay];
    const message = encodeURIComponent(
      `Hola The Truck Savers, quiero agendar La Bailada (diagnóstico gratuito) para mi pickup/auto.\n\n` +
      `📅 Fecha: ${day.dayName} ${day.label}\n` +
      `🕐 Hora: ${selectedTime}\n` +
      `👤 Nombre: ${formData.name}\n` +
      `📱 Teléfono: ${formData.phone}\n` +
      `📧 Correo: ${formData.email}`
    );
    // Simular envío y luego redirigir a WhatsApp
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSubmitted(true);
    // Abrir WhatsApp con los datos
    window.open(`https://wa.me/17134555566?text=${message}`, '_blank');
  };

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const whatsappMessage = encodeURIComponent(
    "Hola The Truck Savers, me gustaría agendar La Bailada para mi pickup/auto. ¿Cuál es la disponibilidad?"
  );
  const whatsappLink = `https://wa.me/17134555566?text=${whatsappMessage}`;

  const services = [
    {
      icon: <CircleGauge className="w-8 h-8" />,
      title: 'Diagnóstico con El Bailador',
      description: 'Nuestro simulador de carretera detecta la fuente de ruidos, vibraciones y piezas desgastadas en suspensión y dirección sin necesidad de desarmar.',
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Reparación de Suspensión',
      description: 'Reemplazo de amortiguadores, muelles, rótulas, baleros, bujes y todos los componentes de suspensión para autos y pickups.',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Reparación de Dirección',
      description: 'Diagnóstico y reparación de cremalleras, bombas de dirección, terminales, brazos pitman y componentes de dirección hidráulica y eléctrica.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Alineación de Precisión',
      description: 'Servicio de alineación computarizada para corregir el desgaste irregular de morenas y mejorar la estabilidad de manejo.',
    },
  ];

  const diagnosticPoints = [
    'Ruidos y golpeteos en suspensión delantera y trasera',
    'Vibraciones excesivas al frenar o acelerar',
    'Desgaste irregular de morenas (llantas)',
    'Holgura en rótulas, terminales y bujes',
    'Problemas de dirección: volante flojo o pesado',
    'Condiciones inseguras en componentes de rodamiento',
    'Evaluación de amortiguadores y muelles',
    'Inspección de barras estabilizadoras y ligas',
  ];

  const faqs = [
    {
      question: '¿Cuánto cuesta el diagnóstico con El Bailador?',
      answer: '¡Es completamente GRATIS! Creemos que todo dueño de pickup o auto merece saber el estado real de su suspensión y dirección sin costo alguno. El Bailador simula las condiciones reales de carretera para encontrar problemas que una inspección estática no detecta.',
    },
    {
      question: '¿Qué tipo de vehículos pueden diagnosticarse?',
      answer: 'El Bailador está diseñado para vehículos ligeros de hasta 1.8 toneladas, incluyendo pickups (Ford F-150, Chevrolet Silverado, RAM 1500, Toyota Tacoma, etc.), SUVs, y automóviles de todas las marcas.',
    },
    {
      question: '¿Cuánto tiempo tarda el diagnóstico?',
      answer: 'El diagnóstico completo con El Bailador tarda aproximadamente 20 a 30 minutos. Recibirás un reporte detallado con todos los hallazgos y recomendaciones de reparación.',
    },
    {
      question: '¿Por qué especializarse en pickups?',
      answer: 'Las pickups enfrentan esfuerzos únicos que los talleres convencionales no siempre entienden. Remolcar, cargar peso y manejar en terreno irregular desgasta la suspensión y dirección de manera diferente. Nuestro equipo tiene experiencia específica en estos vehículos y El Bailador detecta problemas que otros pasan por alto.',
    },
    {
      question: '¿Qué pasa después del diagnóstico?',
      answer: 'Te entregamos un reporte completo con fotos y explicaciones claras de cada hallazgo. Si se requieren reparaciones, te damos un presupuesto detallado sin compromiso. Tú decides si proceder con nosotros.',
    },
    {
      question: '¿Ofrecen servicio de alineación para pickups?',
      answer: 'Sí, contamos con equipo de alineación computarizada capaz de manejar pickups y SUVs de todas las marcas. La alineación es fundamental para evitar el desgaste prematuro de morenas y mantener la estabilidad del vehículo.',
    },
  ];

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <SEO
        title="Reparación de Suspensión y Dirección para Pickups y Autos | Houston TX"
        description="Especialistas en diagnóstico y reparación de suspensión, dirección y alineación para pickups y autos en Houston. Diagnóstico GRATUITO con El Bailador, simulador de carretera. Agenda tu cita hoy."
        keywords="reparación suspensión pickup Houston, alineación pickup Houston, mecánico pickup Houston TX, diagnóstico suspensión auto, El Bailador diagnóstico, taller pickup Houston"
        canonical="/pickup"
      />

      {/* Floating WhatsApp CTA - Mobile */}
      {showFloatingCTA && (
        <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-in fade-in">
          <button onClick={scrollToCalendar} className="w-full">
            <Button className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white font-bold py-4 flex items-center justify-center gap-2 shadow-lg">
              <Calendar size={24} />
              Agendar La Bailada GRATIS
            </Button>
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/60" />
        <div
          className="absolute inset-0 bg-cover opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80')", backgroundPosition: 'center 40%' }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#368A45] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Houston, TX — Especialistas en Pickups
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Reparación de Suspensión y Dirección para Pickups y Autos
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Diagnosticamos con <strong className="text-white">El Bailador</strong> — nuestro simulador de carretera que encuentra la fuente exacta de ruidos, vibraciones y condiciones inseguras en tu vehículo.
            </p>
            <p className="text-lg text-green-300 font-semibold mb-8">
              Diagnóstico La Bailada — 100% GRATIS. Agenda tu cita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#368A45] hover:bg-[#2D6E39] text-white font-bold w-full sm:w-auto"
                onClick={scrollToCalendar}
              >
                <Calendar size={20} className="mr-2" />
                Agendar La Bailada
              </Button>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold w-full sm:w-auto">
                  <MessageCircle size={20} className="mr-2" />
                  WhatsApp Directo
                </Button>
              </a>
              <a href="tel:+17134555566">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold w-full sm:w-auto">
                  <Phone size={20} className="mr-2" />
                  713-455-5566
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué es El Bailador? */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-green-100 text-[#2D6E39] px-3 py-1 rounded-full text-sm font-semibold mb-4">
                Tecnología Exclusiva
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Qué es El Bailador?
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                El Bailador es nuestro <strong>simulador de carretera exclusivo</strong> diseñado para diagnosticar pickups y autos. A diferencia de una inspección estática donde el vehículo está quieto, El Bailador replica las condiciones reales del camino — baches, pavimento irregular, velocidad — para detectar problemas que otros talleres simplemente no encuentran.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Cuando tu pickup o auto "baila" en nuestro simulador, podemos ver y escuchar exactamente qué componentes están fallando: rótulas flojas, bujes desgastados, amortiguadores vencidos, terminales de dirección con holgura, y más.
              </p>
              <div className="bg-green-50 border-l-4 border-[#368A45] p-4 rounded-r-lg">
                <p className="text-[#1B3A1B] font-semibold">
                  El diagnóstico con El Bailador es 100% GRATUITO. Sin compromiso, sin letra chica.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663291837994/XdvSLhyalAsSGYzP.webp"
                alt="El Bailador - Simulador de carretera para pickups y autos"
                className="w-full rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#368A45] text-white px-6 py-3 rounded-lg shadow-lg font-bold text-lg">
                GRATIS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué Diagnosticamos? */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Qué Detecta El Bailador en Tu Pickup o Auto?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Nuestro simulador identifica problemas que una inspección visual o estática no puede encontrar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {diagnosticPoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <ChevronRight className="text-[#368A45] flex-shrink-0 mt-0.5" size={20} />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Servicios */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Diagnosticamos y Reparamos
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Servicio completo de suspensión, dirección, ruedas y alineación para pickups y autos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all hover:border-[#368A45]/30 group"
              >
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-[#368A45] mb-5 group-hover:bg-[#368A45] group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="py-16 md:py-20 bg-[#1B3A1B] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por Qué Somos Diferentes?
            </h2>
            <p className="text-green-200 text-lg max-w-2xl mx-auto">
              Pocos talleres en Houston se especializan en suspensión y dirección de pickups. Nosotros sí.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Diagnóstico Real',
                desc: 'El Bailador simula condiciones reales de carretera. No adivinamos — encontramos el problema exacto.',
              },
              {
                title: 'Especialistas en Pickups',
                desc: 'Entendemos los esfuerzos únicos que enfrentan las pickups: remolque, carga pesada, terreno irregular.',
              },
              {
                title: '+24 Años de Experiencia',
                desc: 'Más de dos décadas reparando vehículos en Houston. Tu pickup está en manos expertas.',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="w-16 h-16 bg-[#368A45] rounded-full flex items-center justify-center mx-auto mb-5">
                  <Check size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-green-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDARIO DE CITAS — La Bailada */}
      <section ref={calendarRef} id="agendar" className="py-16 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-green-100 text-[#2D6E39] px-4 py-1 rounded-full text-sm font-bold mb-4">
                DIAGNÓSTICO GRATUITO
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Agenda Tu Bailada
              </h2>
              <p className="text-gray-600 text-lg">
                Selecciona un día y horario para diagnosticar tu pickup o auto con El Bailador. Es 100% gratis.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-[#368A45] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B3A1B] mb-3">¡Cita Agendada!</h3>
                <p className="text-gray-600 mb-2">
                  Te hemos redirigido a WhatsApp para confirmar tu cita con nuestro equipo.
                </p>
                <p className="text-gray-600 mb-6">
                  Si no se abrió WhatsApp, puedes contactarnos directamente:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-green-500 hover:bg-green-600 text-white font-bold">
                      <MessageCircle size={20} className="mr-2" />
                      Abrir WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+17134555566">
                    <Button variant="outline" className="font-bold">
                      <Phone size={20} className="mr-2" />
                      Llamar: 713-455-5566
                    </Button>
                  </a>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedDay(null);
                    setSelectedTime(null);
                    setFormData({ name: '', phone: '', email: '' });
                  }}
                  className="mt-6 text-[#368A45] hover:underline font-semibold text-sm"
                >
                  Agendar otra cita
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Paso 1: Seleccionar Día */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-[#368A45] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <h3 className="text-lg font-bold text-gray-900">Selecciona un Día</h3>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {availableDays.map((day, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedDay(idx)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          selectedDay === idx
                            ? 'border-[#368A45] bg-green-50 text-[#1B3A1B]'
                            : 'border-gray-200 hover:border-[#368A45]/50 text-gray-700'
                        }`}
                      >
                        <div className="text-xs font-medium text-gray-500">{day.dayName.slice(0, 3)}</div>
                        <div className="text-lg font-bold">{day.date.getDate()}</div>
                        <div className="text-xs text-gray-500">{day.label.split(' ')[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paso 2: Seleccionar Hora */}
                <div className={`p-6 border-b border-gray-100 transition-opacity ${selectedDay === null ? 'opacity-40 pointer-events-none' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${selectedDay !== null ? 'bg-[#368A45]' : 'bg-gray-300'}`}>2</div>
                    <h3 className="text-lg font-bold text-gray-900">Selecciona un Horario</h3>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'border-[#368A45] bg-green-50 text-[#1B3A1B]'
                            : 'border-gray-200 hover:border-[#368A45]/50 text-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paso 3: Datos de Contacto */}
                <div className={`p-6 transition-opacity ${!selectedTime ? 'opacity-40 pointer-events-none' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${selectedTime ? 'bg-[#368A45]' : 'bg-gray-300'}`}>3</div>
                    <h3 className="text-lg font-bold text-gray-900">Tus Datos de Contacto</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Tu nombre completo"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#368A45] focus:outline-none transition-colors text-gray-800"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Tu número de teléfono"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#368A45] focus:outline-none transition-colors text-gray-800"
                      />
                    </div>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Tu correo electrónico"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#368A45] focus:outline-none transition-colors text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Resumen */}
                  {selectedDay !== null && selectedTime && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-600 mb-1">Tu cita:</p>
                      <p className="font-bold text-[#1B3A1B]">
                        <Calendar size={16} className="inline mr-1" />
                        {availableDays[selectedDay].dayName} {availableDays[selectedDay].label}
                        <Clock size={16} className="inline ml-3 mr-1" />
                        {selectedTime}
                      </p>
                      <p className="text-sm text-[#368A45] mt-1 font-semibold">Diagnóstico La Bailada — GRATIS</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting || selectedDay === null || !selectedTime}
                    className="w-full mt-6 bg-[#368A45] hover:bg-[#2D6E39] disabled:bg-gray-300 text-white font-bold py-4 text-lg"
                  >
                    {submitting ? 'Agendando...' : 'Confirmar Cita por WhatsApp'}
                  </Button>
                  <p className="text-center text-gray-500 text-sm mt-3">
                    Al confirmar, se abrirá WhatsApp con los datos de tu cita para coordinar con nuestro equipo.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === idx ? 'max-h-[500px]' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-[#1B3A1B] text-white" ref={footerRef}>
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Tu Pickup Hace Ruidos o Vibra?
          </h2>
          <p className="text-green-200 text-lg mb-8 max-w-2xl mx-auto">
            No esperes a que el problema empeore. Agenda tu Bailada gratuita y descubre exactamente qué necesita tu vehículo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#1B3A1B] hover:bg-gray-100 font-bold"
              onClick={scrollToCalendar}
            >
              <Calendar size={20} className="mr-2" />
              Agendar La Bailada GRATIS
            </Button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold w-full sm:w-auto">
                <MessageCircle size={20} className="mr-2" />
                WhatsApp: 713-455-5566
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
