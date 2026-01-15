import { Link } from 'wouter';
import { Phone, MapPin, Clock, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Dallas Contact Page - SEO Local Architecture
 * URL: /dallas/contact/
 * Canonical: https://thetrucksavers.com/dallas/contact/
 */

export default function DallasContact() {
  const whatsappNumber = "17134555566"; // Actualizar con número de Dallas
  const whatsappMessage = encodeURIComponent("Hola, me gustaría agendar una cita en Dallas");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-12 md:py-16">
        <div className="container">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/dallas" className="hover:text-white">Dallas</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contacto</span>
          </nav>
          <span className="inline-block bg-[#368A45] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Dallas, TX
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Contacto - The Truck Savers Dallas
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Estamos listos para atenderte. Agenda tu cita o visítanos directamente en nuestro taller.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Información de Contacto
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#368A45]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">Dallas, TX</p>
                    <p className="text-gray-500 text-sm mt-1">Dirección próximamente</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#368A45]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <a href="tel:+17134555566" className="text-xl text-[#368A45] font-semibold hover:underline">
                      713-455-5566
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Línea central - Pregunte por Dallas</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#368A45]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@thetrucksavers.com" className="text-[#368A45] hover:underline">
                      info@thetrucksavers.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#368A45]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horario de Atención</h3>
                    <div className="text-gray-600 space-y-1">
                      <p><span className="font-medium">Lunes a Viernes:</span> 8:00 AM - 6:00 PM</p>
                      <p><span className="font-medium">Sábado:</span> 8:00 AM - 2:00 PM</p>
                      <p><span className="font-medium">Domingo:</span> Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 space-y-4">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Agendar por WhatsApp
                  </Button>
                </a>
                <a href="tel:+17134555566" className="block">
                  <Button size="lg" variant="outline" className="w-full border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                    <Phone className="w-5 h-5 mr-2" />
                    Llamar Ahora
                  </Button>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Ubicación
              </h2>
              <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Ubicación próximamente</p>
                  <p className="text-gray-500 text-sm mt-2">Estamos preparando nuestra nueva sucursal en Dallas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Hub */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600">
              ¿Buscas información sobre nuestros servicios?
            </p>
            <Link href="/dallas">
              <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                Ver Servicios en Dallas →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
