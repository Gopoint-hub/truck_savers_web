import { Link } from 'wouter';
import { Phone, MapPin, Clock, ChevronRight, Wrench, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO, { houstonLocalBusinessSchema, createBreadcrumbSchema } from '@/components/SEO';
import FAQSection, { houstonFAQs } from '@/components/FAQSection';
import GoogleMap from '@/components/GoogleMap';

/**
 * Houston City Hub - SEO Local Architecture
 * URL: /houston/
 * Canonical: https://thetrucksavers.com/houston/
 */

const houstonServices = [
  { slug: 'inspeccion-la-bailada', title: 'Inspección "La Bailada"', description: 'Simulador de camino para detectar problemas en suspensión, dirección y componentes críticos.' },
  { slug: 'alineacion-de-camiones', title: 'Alineación de Camiones', description: 'Alineación de precisión para camiones y trailers con equipos de última generación.' },
  { slug: 'suspensiones', title: 'Taller de Suspensiones', description: 'Reparación y mantenimiento de sistemas de suspensión y amortiguadores.' },
  { slug: 'frenos', title: 'Taller de Frenos', description: 'Especialistas en reparación y mantenimiento de sistemas de frenos para camiones.' },
  { slug: 'direccion-hidraulica', title: 'Dirección', description: 'Reparación de sistemas de dirección para camiones.' },
  { slug: 'cambio-de-aceite', title: 'Cambio de Aceite', description: 'Mantenimiento rutinario con productos de calidad para motores diésel.' },
  { slug: 'balanceo-de-camiones', title: 'Balanceo de Llantas', description: 'Servicio de balanceo profesional de llantas para camiones y remolques.' },
  { slug: 'reparacion-de-neumaticos', title: 'Reparación de Neumáticos', description: 'Reparación profesional de llantas para camiones comerciales.' },
  { slug: 'reparacion-de-cardanes', title: 'Reparación de Cardanes', description: 'Servicio especializado en reparación de barra cardán.' },
  { slug: 'mofles', title: 'Taller de Mofles', description: 'Reparación y reemplazo de sistemas de escape para camiones.' },
  { slug: 'cambio-reten-de-maza', title: 'Sellos de Rueda', description: 'Servicio de sellos de rueda para camiones y remolques.' },
  { slug: 'sellador-de-llantas', title: 'Sellador de Llantas', description: 'Protección preventiva para tus llantas con sellador profesional.' },
  { slug: 'go-green-apu', title: 'Go Green APU', description: 'Instalación de APU para ahorro de diésel y mayor eficiencia.' },
];

// Schema combinado para Houston
const houstonPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    houstonLocalBusinessSchema,
    createBreadcrumbSchema([
      { name: "Inicio", url: "https://truck-savers-web.onrender.com/" },
      { name: "Houston", url: "https://truck-savers-web.onrender.com/houston" }
    ])
  ]
};

export default function HoustonHub() {
  const whatsappNumber = "17134555572";
  const whatsappMessage = encodeURIComponent("Hola, me gustaría agendar una cita en Houston");

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Taller Mecánico de Camiones en Houston, TX"
        description="Taller mecánico de camiones y trailers en Houston, Texas. Más de 24 años de experiencia. Inspección gratuita 'La Bailada', alineación, suspensión, frenos, cambio de aceite. Ubicados en 1362 Sheffield Blvd."
        keywords="taller mecánico camiones Houston, truck repair Houston TX, semi truck mechanic Houston, alineación camiones Houston, suspensión camiones Houston, frenos camiones Houston"
        canonical="/houston"
        structuredData={houstonPageSchema}
      />
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70" />
        <div 
          className="absolute inset-0 bg-cover opacity-40"
          style={{ backgroundImage: "url('/images/thetrucksavers-banner-3.webp')", backgroundPosition: 'center 35%' }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#368A45] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Houston, TX
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Taller Mecánico de Camiones en Houston
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Más de 24 años de experiencia en reparación y mantenimiento de camiones diésel. 
              Inspección gratuita "La Bailada" disponible.
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
              <a href="tel:+17134555566">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar: 713-455-5566
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
                <p className="text-gray-600">1362 Sheffield Blvd, Houston, TX 77015</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#368A45]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Teléfono</p>
                <a href="tel:+17134555566" className="text-[#368A45] hover:underline">713-455-5566</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#368A45]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Horario</p>
                <p className="text-gray-600">Lun-Vie: 8am - 6pm</p>
                <p className="text-gray-600">Sáb: 8am - 3pm</p>
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
              Nuestros Servicios en Houston
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos todos los servicios de mantenimiento y reparación para tu camión y tráiler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houstonServices.map((service) => (
              <Link key={service.slug} href={`/houston/${service.slug}`}>
                <div className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer">
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
            <Link href="/houston/contact">
              <Button size="lg" className="bg-white text-[#368A45] hover:bg-gray-100 w-full sm:w-auto">
                Ir a Contacto Houston
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
      <GoogleMap location="houston" />

      {/* FAQs */}
      <FAQSection 
        faqs={houstonFAQs} 
        title="Preguntas Frecuentes - Houston"
        subtitle="Respuestas a las preguntas más comunes sobre nuestros servicios en Houston"
      />

      {/* Breadcrumb / Internal Links */}
      <section className="py-8 bg-white">
        <div className="container">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-[#368A45]">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Houston</span>
          </nav>
        </div>
      </section>
    </div>
  );
}
