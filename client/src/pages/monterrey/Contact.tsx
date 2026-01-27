import { Link } from 'wouter';
import { Phone, MapPin, Clock, Mail, MessageCircle, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Monterrey Contact Page - SEO Local Architecture
 * URL: /monterrey/contact/
 * Canonical: https://thetrucksavers.com/monterrey/contact/
 */

export default function MonterreyContact() {
  const whatsappNumber = "17134555572";
  const whatsappMessage = encodeURIComponent("Hola, me gustaría agendar una cita en Monterrey");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-12 md:py-16">
        <div 
          className="absolute inset-0 bg-cover opacity-30"
          style={{ backgroundImage: "url('/images/reto-truck-savers-servicios-camiones.jpg')", backgroundPosition: 'center 35%' }}
        />
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="container relative z-10">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/monterrey" className="hover:text-white">Monterrey</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contacto</span>
          </nav>
          <span className="inline-block bg-[#368A45] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Monterrey, N.L.
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Contacto - The Truck Savers Monterrey
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
                    <p className="text-gray-600">Libramiento Noreste KM 33.5, Interior 30</p>
                    <p className="text-gray-600">Nueva Castilla</p>
                    <p className="text-gray-600">66052, Ciudad General Escobedo, N.L.</p>
                    <p className="text-gray-600">México</p>
                    <a 
                      href="https://maps.google.com/?q=Libramiento+Noreste+KM+33.5+Nueva+Castilla+Escobedo+Nuevo+Leon+Mexico"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#368A45] hover:underline text-sm mt-2 inline-block"
                    >
                      Ver en Google Maps →
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#368A45]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <a href="tel:+528135414652" className="text-xl text-[#368A45] font-semibold hover:underline">
                      +52 81 3541 4652
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Llamadas y WhatsApp</p>
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
                      <p><span className="font-medium">Lunes a Domingo:</span> 7:00 AM - 7:00 PM</p>
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
                <a href="tel:+528135414652" className="block">
                  <Button size="lg" variant="outline" className="w-full border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                    <Phone className="w-5 h-5 mr-2" />
                    Llamar Ahora: +52 81 3541 4652
                  </Button>
                </a>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Ubicación
              </h2>
              <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.5!2d-100.2!3d25.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLibramiento%20Noreste%20KM%2033.5%2C%20Nueva%20Castilla%2C%20Escobedo%2C%20N.L.!5e0!3m2!1ses!2smx!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Truck Savers Monterrey Location"
                />
              </div>

              {/* Parking Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                <Car className="w-5 h-5 text-[#368A45] mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Estacionamiento Disponible</h4>
                  <p className="text-gray-600 text-sm">
                    Contamos con estacionamiento para más de 50 vehículos, incluyendo camiones y trailers de todos los tamaños.
                  </p>
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
            <Link href="/monterrey">
              <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                Ver Servicios en Monterrey →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
