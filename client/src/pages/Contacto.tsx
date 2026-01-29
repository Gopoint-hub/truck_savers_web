import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contacto() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-xl text-green-100">
            Estamos aquí para ayudarte. Contáctanos hoy mismo.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Phone */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Teléfono</h3>
            <a
              href="tel:+17134555566"
              className="text-green-600 hover:text-green-700 font-semibold text-lg"
            >
              713-455-5566
            </a>
            <p className="text-gray-600 mt-2 text-sm">
              Disponible de lunes a viernes, 8am - 6pm
            </p>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <a
              href="mailto:info@thetrucksavers.com"
              className="text-green-600 hover:text-green-700 font-semibold text-lg"
            >
              info@thetrucksavers.com
            </a>
            <p className="text-gray-600 mt-2 text-sm">
              Responderemos en menos de 24 horas
            </p>
          </div>

          {/* Location */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ubicación</h3>
            <p className="text-gray-700 font-semibold">
              1362 Sheffield Blvd
              <br />
              Houston, TX 77015
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Estacionamiento para 50+ vehículos
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Envíanos un Mensaje
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="713-XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asunto *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje *
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Cuéntanos más detalles..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
              size="lg"
            >
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-100 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Ubicación en el Mapa
          </h2>
          <div className="bg-gray-300 rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <p className="text-gray-600">
              Mapa interactivo - 1362 Sheffield Blvd, Houston, TX 77015
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
