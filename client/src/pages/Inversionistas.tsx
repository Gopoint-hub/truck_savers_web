import { Helmet } from "react-helmet-async";
import { MessageCircle, Mail, TrendingUp, Users, MapPin, Cpu, Package, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Inversionistas() {
  const whatsappNumber = "+523340478182";
  const whatsappMessage = encodeURIComponent(
    "Hola, me interesa conocer más sobre las oportunidades de inversión en The Truck Savers."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const reasons = [
    {
      icon: Users,
      title: "Comunidad Digital Masiva",
      description: "Más de 800,000 seguidores y 230 millones de visualizaciones en 2025.",
    },
    {
      icon: TrendingUp,
      title: "Demanda Comprobada",
      description: "Cientos de comentarios pidiendo talleres en su ciudad demuestran el potencial de expansión.",
    },
    {
      icon: MapPin,
      title: "Experiencia Probada",
      description: "24 años operando en Houston, ya abiertos en Monterrey y Dallas.",
    },
    {
      icon: Cpu,
      title: "Tecnología Icónica",
      description: "Tecnología de diagnóstico única en la industria con 'La Bailada'.",
    },
    {
      icon: Package,
      title: "Relaciones Estratégicas",
      description: "Relación directa con fabricantes internacionales de repuestos.",
    },
    {
      icon: Target,
      title: "Marketing Avanzado",
      description: "Campañas hiperpersonalizadas a bases de datos propias con las aplicaciones de IA más avanzadas.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Oportunidades de Inversión | The Truck Savers</title>
        <meta
          name="description"
          content="Invierte en el crecimiento de The Truck Savers. Más de 24 años de experiencia y una comunidad de 800k seguidores."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Invierte en el Futuro del Transporte
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Únete al crecimiento de The Truck Savers y sé parte de la revolución en el mantenimiento de camiones en América.
            </p>
          </div>
        </section>

        {/* Why Invest Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            ¿Por qué invertir con nosotros?
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            The Truck Savers representa una oportunidad única de inversión en un mercado en constante crecimiento.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <reason.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">24+</div>
                <div className="text-gray-600">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">800K+</div>
                <div className="text-gray-600">Seguidores</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">230M+</div>
                <div className="text-gray-600">Visualizaciones en 2025</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">3</div>
                <div className="text-gray-600">Ubicaciones Activas</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para ser parte de nuestro crecimiento?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Contáctanos para recibir más información sobre las oportunidades de inversión en The Truck Savers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar por WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                <a href="mailto:info@thetrucksavers.com">
                  <Mail className="w-5 h-5 mr-2" />
                  info@thetrucksavers.com
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
