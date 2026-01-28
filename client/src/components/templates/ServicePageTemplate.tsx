import { Button } from "@/components/ui/button";
import { ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedService {
  title: string;
  slug: string;
}

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  features: string[];
  faqs: FAQ[];
  relatedServices: RelatedService[];
  ctaText?: string;
  location?: string;
  youtubePlaylist?: string;
  youtubeTitle?: string;
  youtubeDescription?: string;
}

// Configuración de WhatsApp por ubicación
const locationConfig: Record<string, { phone: string; displayPhone: string; locationName: string }> = {
  houston: {
    phone: "17134555566",
    displayPhone: "713-455-5566",
    locationName: "Houston, TX"
  },
  dallas: {
    phone: "17134555566",
    displayPhone: "713-455-5566",
    locationName: "Dallas, TX"
  },
  monterrey: {
    phone: "528180232466",
    displayPhone: "+52 81 8023 2466",
    locationName: "Monterrey, N.L."
  }
};

export default function ServicePageTemplate({
  title,
  subtitle,
  heroImage,
  description,
  features,
  faqs,
  relatedServices,
  ctaText = "Agendar Cita",
  location = "houston",
  youtubePlaylist,
  youtubeTitle = "Videos del Servicio",
  youtubeDescription = "Mira nuestra lista de reproducción con videos explicativos sobre este servicio.",
}: ServicePageTemplateProps) {
  // Obtener configuración de la ubicación
  const config = locationConfig[location] || locationConfig.houston;
  
  // Crear mensaje de WhatsApp personalizado con servicio y ubicación
  const whatsappMessage = encodeURIComponent(
    `Hola, me interesa el servicio de ${title} en ${config.locationName}. ¿Podrían darme más información?`
  );
  const whatsappUrl = `https://wa.me/${config.phone}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-gray-900">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-200">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Descripción del Servicio
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {description}
              </p>
            </section>

            {/* Features */}
            {features.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  ¿Qué Incluye?
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
            )}

            {/* YouTube Playlist Section */}
            {youtubePlaylist && (
              <section className="mb-12 bg-red-50 p-8 rounded-lg border border-red-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  {youtubeTitle}
                </h2>
                <p className="text-gray-700 mb-4">
                  {youtubeDescription}
                </p>
                <a 
                  href={youtubePlaylist} 
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
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
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
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* CTA Box */}
            <div className="sticky top-20 bg-green-600 text-white p-8 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
              <p className="text-green-100 mb-6">
                Contáctanos hoy para agendar tu cita o resolver tus dudas.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  className="w-full bg-white text-green-600 hover:bg-gray-100 font-semibold flex items-center justify-center gap-2"
                  size="lg"
                >
                  <MessageCircle size={20} />
                  {ctaText}
                </Button>
              </a>
              <div className="mt-6 pt-6 border-t border-green-500 space-y-3">
                <div>
                  <p className="text-sm text-green-100">Teléfono</p>
                  <a
                    href={`tel:+${config.phone}`}
                    className="text-lg font-semibold hover:underline"
                  >
                    {config.displayPhone}
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

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">
                  Otros Servicios
                </h3>
                <ul className="space-y-2">
                  {relatedServices.map((service, idx) => (
                    <li key={idx}>
                      <Link href={`/servicios/${service.slug}`}>
                        <a className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
                          <ChevronRight size={16} />
                          {service.title}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
