import { Link } from 'wouter';
import { Phone, MapPin, Clock, ChevronRight, Wrench, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO, { monterreyLocalBusinessSchema, createBreadcrumbSchema } from '@/components/SEO';
import FAQSection, { monterreyFAQs } from '@/components/FAQSection';
import GoogleMap from '@/components/GoogleMap';

/**
 * Monterrey City Hub - SEO Local Architecture
 * URL: /monterrey/
 * Canonical: https://thetrucksavers.com/monterrey/
 */

const monterreyServices = [
  { slug: 'inspeccion-la-bailada', title: 'Inspección "La Bailada" en Monterrey', description: 'Tecnología de punta llega a Monterrey: simulador de carretera para detectar problemas ocultos en suspensión, dirección y componentes críticos.' },
  { slug: 'alineacion-de-camiones', title: 'Alineación de Camiones en Monterrey', description: 'Más de 24 años de experiencia en alineación de precisión para camiones y trailers ahora en Monterrey, N.L.' },
  { slug: 'suspensiones', title: 'Taller de Suspensiones en Monterrey', description: 'Reparación y mantenimiento especializado de sistemas de suspensión para camiones en Monterrey.' },
  { slug: 'frenos', title: 'Taller de Frenos en Monterrey', description: 'Especialistas en reparación de sistemas de frenos de aire para camiones en Monterrey, Nuevo León.' },
  { slug: 'direccion', title: 'Dirección en Monterrey', description: 'Reparación profesional de sistemas de dirección para camiones comerciales en Monterrey.' },
  { slug: 'balanceo-de-llantas', title: 'Balanceo de Llantas en Monterrey', description: 'Servicio de balanceo profesional para tus morenas. Tecnología de punta llega a Monterrey.' },
  { slug: 'depilada-de-llantas', title: 'Depilada de Llantas en Monterrey', description: 'Reparación profesional de neumáticos para camiones y trailers en Monterrey, N.L.' },
  { slug: 'reparacion-de-cardanes', title: 'Reparación de Cardanes en Monterrey', description: 'Servicio especializado en reparación y balanceo de cardanes para camiones en Monterrey.' },
  { slug: 'sellos-de-rueda', title: 'Retenes de Rueda en Monterrey', description: 'Cambio profesional de retenes de rueda para proteger los baleros de tu camión en Monterrey.' },
  { slug: 'go-green-apu', title: 'Instalación de APU para Camión en Monterrey', description: 'Go Green APU para ahorro de diésel y mayor eficiencia. Ahorra hasta $5,000 al año en combustible.' },
];

// Schema combinado para Monterrey
const monterreyPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    monterreyLocalBusinessSchema,
    createBreadcrumbSchema([
      { name: "Inicio", url: "https://truck-savers-web.onrender.com/" },
      { name: "Monterrey", url: "https://truck-savers-web.onrender.com/monterrey" }
    ])
  ]
};

export default function MonterreyHub() {
  const whatsappNumber = "17134555572";
  const whatsappMessage = encodeURIComponent("Hola, me gustaría agendar una cita en Monterrey");

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Taller Mecánico de Camiones en Monterrey, N.L."
        description="Taller mecánico de camiones y trailers en Monterrey, Nuevo León. Tecnología de punta y más de 24 años de experiencia llegan a Monterrey. Inspección gratuita 'La Bailada', alineación, suspensión, frenos, balanceo, Go Green APU. Ubicados en Libramiento Noreste KM 33.5."
        keywords="taller mecánico camiones Monterrey, reparación trailers Nuevo León, alineación camiones Monterrey, suspensión camiones Monterrey, frenos camiones Monterrey, taller diésel Monterrey"
        canonical="/monterrey"
        structuredData={monterreyPageSchema}
      />
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70" />
        <div 
          className="absolute inset-0 bg-cover opacity-40"
          style={{ backgroundImage: "url('/images/thetrucksavers-banner-4.webp')", backgroundPosition: 'center 35%' }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#368A45] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Monterrey, N.L.
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Taller Mecánico de Camiones en Monterrey
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Tecnología de punta y más de 24 años de experiencia en reparación de camiones diésel llegan a Monterrey. Inspección gratuita "La Bailada" disponible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-[#368A45] hover:bg-[#2D6E39] text-white w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Agendar por WhatsApp
                </Button>
              </a>
              <a href="tel:+528135414652">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar: +52 81 3541 4652
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#368A45]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dirección</p>
                <p className="text-gray-600 text-sm">Libramiento Noreste KM 33.5, Interior 30, Nueva Castilla, Escobedo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#368A45]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Teléfono</p>
                <a href="tel:+528135414652" className="text-[#368A45] hover:underline">+52 81 3541 4652</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#368A45]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Horario</p>
                <p className="text-gray-600">Lunes a Domingo: 7am - 7pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios en Monterrey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos todos los servicios de mantenimiento y reparación para tu camión y tráiler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monterreyServices.map((service) => (
              <Link key={service.slug} href={`/monterrey/${service.slug}`}>
                <div className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-[#368A45]/10 rounded-lg flex items-center justify-center mb-4">
                      <Wrench className="w-6 h-6 text-[#368A45]" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#368A45] transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#368A45] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#368A45] py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para tu Inspección Gratis?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Agenda tu inspección "La Bailada" hoy mismo. Nuestro equipo te atenderá rápidamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/monterrey/contact">
              <Button size="lg" className="bg-white text-[#368A45] hover:bg-gray-100 w-full sm:w-auto">
                Ir a Contacto Monterrey
              </Button>
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#368A45] w-full sm:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Directo
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <GoogleMap location="monterrey" />

      {/* FAQs */}
      <FAQSection 
        faqs={monterreyFAQs} 
        title="Preguntas Frecuentes - Monterrey"
        subtitle="Respuestas a las preguntas más comunes sobre nuestros servicios en Monterrey"
      />

      {/* Breadcrumb */}
      <section className="py-8 bg-white">
        <div className="container">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-[#368A45]">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Monterrey</span>
          </nav>
        </div>
      </section>
    </div>
  );
}
