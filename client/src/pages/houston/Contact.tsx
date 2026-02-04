import { Link } from 'wouter';
import { Phone, MapPin, Clock, Mail, MessageCircle, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

const CMS_API = import.meta.env.VITE_CMS_API_URL;

/**
 * Houston Contact Page - SEO Local Architecture
 * URL: /houston/contact/
 * Canonical: https://thetrucksavers.com/houston/contact/
 */

export default function HoustonContact() {
  const whatsappNumber = "17134555566";
  const whatsappMessage = encodeURIComponent("Hola, me gustaría agendar una cita en Houston");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${CMS_API}/contact/houston`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'houston-contact'
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('¡Mensaje enviado! Te contactaremos pronto.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(result.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      toast.error('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-12 md:py-16">
        <div 
          className="absolute inset-0 bg-cover opacity-30"
          style={{ backgroundImage: "url('/images/the-truck-savers-best-truck-repair.jpg')", backgroundPosition: 'center 35%' }}
        />
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="container relative z-10">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/houston" className="hover:text-white">Houston</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contacto</span>
          </nav>
          <span className="inline-block bg-[#368A45] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Houston, TX
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Contacto - The Truck Savers Houston
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
                    <p className="text-gray-600">1362 Sheffield Blvd</p>
                    <p className="text-gray-600">Houston, TX 77015</p>
                    <a 
                      href="https://maps.google.com/?q=1362+Sheffield+Blvd+Houston+TX+77015"
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
                    <a href="tel:+17134555566" className="text-xl text-[#368A45] font-semibold hover:underline">
                      713-455-5566
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Llamadas y mensajes de texto</p>
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
                      <p><span className="font-medium">Sábado:</span> 8:00 AM - 3:00 PM</p>
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
                    Llamar Ahora: 713-455-5566
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Form & Map */}
            <div className="space-y-8">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Envíanos un Mensaje
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Nombre completo *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      placeholder="Correo electrónico *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                    <Input
                      type="tel"
                      placeholder="Teléfono *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <Textarea
                    placeholder="¿En qué podemos ayudarte? *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ubicación
                </h2>
                <div className="bg-gray-100 rounded-lg overflow-hidden h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.8!2d-95.3!3d29.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1362+Sheffield+Blvd%2C+Houston%2C+TX+77015!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="The Truck Savers Houston Location"
                  />
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-4 bg-[#368A45]/5 border border-[#368A45]/20 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Estacionamiento Disponible</h3>
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
            <Link href="/houston">
              <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                Ver Servicios en Houston →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
