import { Link } from 'wouter';
import { MapPin, Phone, MessageCircle, ChevronRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO, { organizationSchema, houstonLocalBusinessSchema } from '@/components/SEO';
import FAQSection, { generalFAQs } from '@/components/FAQSection';

/**
 * Home Page - SEO Local Architecture
 * URL: /
 * Simplified home with city selector as per SEO requirements
 */

const cities = [
  {
    slug: 'houston',
    name: 'Houston',
    state: 'TX',
    country: 'EE.UU.',
    address: '1362 Sheffield Blvd, Houston, TX 77015',
    phone: '713-455-5566',
    whatsapp: '17134555566',
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    state: 'TX',
    country: 'EE.UU.',
    address: '4739 Lucky Ln, Dallas, TX 75247',
    phone: '469-775-9715',
    whatsapp: '14697759715',
  },
  {
    slug: 'monterrey',
    name: 'Monterrey',
    state: 'N.L.',
    country: 'México',
    address: 'Libramiento Noreste KM 33.5, Interior 30, Nueva Castilla, 66052',
    phone: '52 81 3541 4652',
    whatsapp: '528135414652',
  },
];

// Schema combinado para la página principal
const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    houstonLocalBusinessSchema,
    {
      "@type": "WebSite",
      "name": "The Truck Savers",
      "url": "https://thetrucksavers.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://thetrucksavers.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function Home() {
  const mainWhatsapp = "17134555572";
  const mainWhatsappMessage = encodeURIComponent("Hola, me gustaría información sobre sus servicios");

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Taller Mecánico de Camiones y Trailers - 24 Años en Houston"
        description="Taller mecánico especializado en camiones y trailers con más de 24 años de experiencia. Inspección gratuita, alineación, suspensión, frenos y más. Ubicaciones en Houston, Dallas y Monterrey."
        keywords="taller mecánico camiones Houston, reparación trailers Texas, alineación camiones, suspensión camiones, frenos camiones, cambio aceite diésel, The Truck Savers"
        canonical="/"
        structuredData={homePageSchema}
      />
      {/* Hero Section - Simplified */}
      <section className="relative bg-gray-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/80" />
        <div 
          className="absolute inset-0 bg-cover opacity-30"
          style={{ backgroundImage: "url('/images/thetrucksavers-banner-3.webp')", backgroundPosition: 'center 35%' }}
        />
        <div className="container relative z-10 text-center">
          <img 
            src="/images/home_logo.png" 
            alt="The Truck Savers - Taller Mecánico de Camiones en Houston, Dallas y Monterrey" 
            className="h-20 md:h-24 mx-auto mb-8"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Truck Savers
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Taller mecánico de camiones y trailers con más de 24 años de experiencia. 
            Inspección gratuita "La Bailada" disponible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${mainWhatsapp}?text=${mainWhatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-[#368A45] hover:bg-[#2D6E39] text-white w-full sm:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
            <a href="tel:+17134555566">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                713-455-5566
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* City Selector - Main Focus */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Selecciona tu Ubicación
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra el taller The Truck Savers más cercano a ti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cities.map((city) => (
              <Link key={city.slug} href={`/${city.slug}`}>
                <div className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#368A45] transition-all cursor-pointer hover:shadow-xl h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-[#368A45]/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-[#368A45]" />
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#368A45] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#368A45] transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-gray-500 mb-4">{city.state}, {city.country}</p>
                  <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
                    {city.address}
                  </p>
                  <p className="text-[#368A45] font-semibold">
                    {city.phone}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Especialistas en mantenimiento y reparación de camiones diésel
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'Inspección "La Bailada"',
              'Alineación',
              'Suspensiones',
              'Frenos',
              'Cambio de Aceite',
              'Dirección',
              'Neumáticos',
              'Mofles',
            ].map((service) => (
              <div key={service} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Wrench className="w-5 h-5 text-[#368A45] flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{service}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/houston">
              <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                Ver todos los servicios →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#368A45] py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Inspección Gratuita
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ponemos a bailar tu camión sin costo alguno. Escaneamos tus llantas y visualmente 
            inspeccionamos más de 100 puntos de seguridad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/houston">
              <Button size="lg" className="bg-white text-[#368A45] hover:bg-gray-100 w-full sm:w-auto">
                Agendar en Houston
              </Button>
            </Link>
            <a
              href={`https://wa.me/${mainWhatsapp}?text=${mainWhatsappMessage}`}
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

      {/* FAQs */}
      <FAQSection 
        faqs={generalFAQs} 
        title="Preguntas Frecuentes"
        subtitle="Respuestas a las preguntas más comunes sobre nuestros servicios"
      />

      {/* Resources Link */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Recursos y Contenido
              </h3>
              <p className="text-gray-600">
                Blog, podcasts y consejos para el mantenimiento de tu camión
              </p>
            </div>
            <Link href="/resources">
              <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white whitespace-nowrap">
                Ver Recursos →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
