import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
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
}

export default function ServicePageTemplate({
  title,
  subtitle,
  heroImage,
  description,
  features,
  faqs,
  relatedServices,
  ctaText = "Agendar Cita",
}: ServicePageTemplateProps) {
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
              <Button
                className="w-full bg-white text-green-600 hover:bg-gray-100 font-semibold"
                size="lg"
              >
                {ctaText}
              </Button>
              <div className="mt-6 pt-6 border-t border-green-500 space-y-3">
                <div>
                  <p className="text-sm text-green-100">Teléfono</p>
                  <a
                    href="tel:+17134555566"
                    className="text-lg font-semibold hover:underline"
                  >
                    713-455-5566
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
