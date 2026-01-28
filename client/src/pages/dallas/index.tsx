import { Link } from 'wouter';
import { Phone, MapPin, Clock, ChevronRight, Wrench, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO, { dallasLocalBusinessSchema, createBreadcrumbSchema } from '@/components/SEO';
import FAQSection, { dallasFAQs } from '@/components/FAQSection';
import GoogleMap from '@/components/GoogleMap';

/**
 * Dallas City Hub - SEO Local Architecture
 * URL: /dallas/
 * Canonical: https://thetrucksavers.com/dallas/
 */

const dallasServices = [
  { slug: 'inspeccion-la-bailada', title: 'Inspección "La Bailada" en Dallas', description: 'Simulador de carretera para detectar problemas ocultos en suspensión, dirección y componentes críticos de tu camión en Dallas.' },
  { slug: 'alineacion-de-camiones', title: 'Alineación de Camiones en Dallas', description: 'Servicio de alineación de precisión para camiones y trailers en el área de Dallas-Fort Worth.' },
  { slug: 'suspensiones', title: 'Taller de Suspensiones en Dallas', description: 'Reparación y mantenimiento de sistemas de suspensión y amortiguadores para camiones en Dallas, TX.' },
  { slug: 'frenos', title: 'Taller de Frenos en Dallas', description: 'Especialistas en reparación y mantenimiento de sistemas de frenos de aire para camiones en Dallas.' },
  { slug: 'direccion', title: 'Dirección Hidráulica en Dallas', description: 'Reparación de sistemas de dirección hidráulica para camiones comerciales en Dallas, TX.' },
  { slug: 'sistema-de-escape', title: 'Sistema de Escape en Dallas', description: 'Reparación y mantenimiento de mofles y sistemas de escape para camiones en Dallas.' },
  { slug: 'sellos-de-rueda', title: 'Sellos de Rueda en Dallas', description: 'Cambio profesional de sellos de rueda para proteger los baleros de tu camión en Dallas.' },
  { slug: 'sellador-de-llantas', title: 'Sellador de Llantas Salvamorenas en Dallas', description: 'Protección preventiva para tus morenas con nuestro sellador profesional Salvamorenas en Dallas.' },
  { slug: 'go-green-apu', title: 'Go Green APU en Dallas', description: 'Instalación de APU para ahorro de diésel y mayor eficiencia en tu camión. Ahorra hasta $5,000 al año.' },
];

// Schema combinado para Dallas
const dallasPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    dallasLocalBusinessSchema,
    createBreadcrumbSchema([
      { name: "Inicio", url: "https://truck-savers-web.onrender.com/" },
      { name: "Dallas", url: "https://truck-savers-web.onrender.com/dallas" }
    ])
  ]
};

export default function DallasHub() {
  const whatsappNumber = "17134555572";
  const whatsappMessage = encodeURIComponent("Hola, me gustaría agendar una cita en Dallas");

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Taller Mecánico de Camiones en Dallas, TX"
        description="Taller mecánico de camiones y trailers en Dallas, Texas. Con más de 24 años de experiencia ahora también llegamos a Dallas. Inspección gratuita 'La Bailada', alineación, suspensión, frenos, sistema de escape, Go Green APU. Ubicados en 4739 Lucky Ln."
        keywords="taller mecánico camiones Dallas, truck repair Dallas TX, semi truck mechanic Dallas, alineación camiones Dallas, suspensión camiones Dallas, frenos camiones Dallas"
        canonical="/dallas"
        structuredData={dallasPageSchema}
      />
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70" />
        <div 
          className="absolute inset-0 bg-cover opacity-40"
          style={{ backgroundImage: "url('/images/thetrucksavers-banner-6.webp')", backgroundPosition: 'center 35%' }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#368A45] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Dallas, TX
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Taller Mecánico de Camiones en Dallas
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Con más de 24 años de experiencia en reparación y mantenimiento de camiones diésel, ahora también llegamos a Dallas. Inspección gratuita "La Bailada" disponible.
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
              <a href="tel:+14697759715">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar: 469-775-9715
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
                <p className="text-gray-600">4739 Lucky Ln, Dallas, TX 75247</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#368A45]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Teléfono</p>
                <a href="tel:+14697759715" className="text-[#368A45] hover:underline">469-775-9715</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#368A45]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Horario</p>
                <p className="text-gray-600">Lunes a Viernes: 8am - 6pm</p>
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
              Nuestros Servicios en Dallas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos todos los servicios de mantenimiento y reparación para tu camión y tráiler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dallasServices.map((service) => (
              <Link key={service.slug} href={`/dallas/${service.slug}`}>
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
            <Link href="/dallas/contact">
              <Button size="lg" className="bg-white text-[#368A45] hover:bg-gray-100 w-full sm:w-auto">
                Ir a Contacto Dallas
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
      <GoogleMap location="dallas" />

      {/* FAQs */}
      <FAQSection 
        faqs={dallasFAQs} 
        title="Preguntas Frecuentes - Dallas"
        subtitle="Respuestas a las preguntas más comunes sobre nuestros servicios en Dallas"
      />

      {/* Breadcrumb */}
      <section className="py-8 bg-white">
        <div className="container">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-[#368A45]">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Dallas</span>
          </nav>
        </div>
      </section>
    </div>
  );
}
