import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { CircleDot, Wrench, Gauge, Settings, ChevronRight, Youtube, CheckCircle, Scale, Scissors, ShoppingCart } from 'lucide-react';

/**
 * Ahorro en Llantas - Soluciones para Extender la Durabilidad de Neumáticos
 * URL: /recursos/ahorro/llantas
 */

const services = [
  {
    slug: '/houston/inspeccion-la-bailada',
    title: 'La Bailada',
    description: 'Servicio indispensable que permite encontrar problemas en diferentes componentes de la barra cardán, suspensión y dirección, especialmente lo relacionado con el desgaste de llantas.',
    icon: Wrench,
  },
  {
    slug: '/houston/suspensiones',
    title: 'Suspensión y Dirección',
    description: 'Herramientas modernas y personal capacitado para diagnosticar correctamente e instalar componentes que afectan el desgaste de llantas.',
    icon: Settings,
  },
  {
    slug: '/houston/alineacion-de-camiones',
    title: 'Alineación de Llantas',
    description: 'Alineamos 3 ejes del camión y también los trailers porque están directamente relacionados con el desgaste de llantas.',
    icon: Gauge,
  },
  {
    slug: '/houston/sellos-de-rueda',
    title: 'Sellos de Rueda',
    description: 'Inspección y cambio de baleros/rodamientos de rueda que pueden causar fricción excesiva y resistencia al rodamiento.',
    icon: CircleDot,
  },
  {
    slug: '/houston/balanceo-de-llantas',
    title: 'Balanceo de Llantas',
    description: 'El balanceo correcto de tus morenas evita vibraciones y desgaste irregular, extendiendo significativamente la vida útil de tus llantas.',
    icon: Scale,
  },
  {
    slug: '/houston/reparacion-de-neumaticos',
    title: 'Depilada de Llantas',
    description: 'Servicio de depilada profesional que elimina el desgaste irregular y extiende la vida útil de tus llantas, ahorrando en reemplazos prematuros.',
    icon: Scissors,
  },
];

const factors = [
  'Deficiencias en alineación y balanceo',
  'Problemas de suspensión y dirección',
  'Baleros de rueda en mal estado',
  'Presión de aire incorrecta',
  'Distribución inadecuada de carga',
  'Falta de inspección regular',
];

const products = [
  {
    name: 'Vibrasavers',
    description: 'Amortiguadores de vibraciones para una conducción más suave y confortable.',
  },
  {
    name: 'Salvamorenas',
    description: 'Sellador y balanceador de llantas que previene ponchaduras y reduce vibraciones.',
  },
  {
    name: 'Llantasavers',
    description: 'Tapones con indicador de presión que ayudan a mantener la presión de aire correcta, crucial para el ahorro de llantas y combustible.',
  },
];

const youtubeVideos = [
  {
    title: 'Causas de Desgaste de Llantas',
    url: 'https://www.youtube.com/watch?v=WnftRhn_CUg',
  },
  {
    title: 'Causa de desgaste que nadie revisa',
    url: 'https://www.youtube.com/watch?v=Whzddb82OHA',
  },
];

export default function AhorroLlantas() {
  return (
    <>
      <Helmet>
        <title>Ahorro en Llantas para Camiones | The Truck Savers</title>
        <meta
          name="description"
          content="Descubre cómo extender la vida útil de las llantas de tu camión con servicios de alineación, balanceo y diagnóstico profesional en The Truck Savers."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-700 to-gray-800 text-white py-16 md:py-20">
          <div className="container relative z-10">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/recursos" className="hover:text-white">Recursos</Link>
              <span className="mx-2">/</span>
              <Link href="/recursos/ahorro" className="hover:text-white">Ahorro</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Llantas</span>
            </nav>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <CircleDot className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Ahorro en Llantas
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl">
              Entre los puntos más importantes a considerar para prevenir el desgaste prematuro de los neumáticos se encuentra el mantenimiento adecuado del camión.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Cómo prevenir el desgaste prematuro de llantas
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                <p>
                  Entre los puntos más importantes a considerar para prevenir el desgaste prematuro de los neumáticos se encuentra el mantenimiento adecuado del camión: revisar la presión de aire y la forma en que se distribuye la carga en tu camión. Es importante revisar e inspeccionar tu camión regularmente.
                </p>
                <p>
                  Las deficiencias mecánicas en alineación y balanceo, sin olvidar la suspensión y dirección, son una de las principales razones por las que tus llantas se desgastan. Además, mantener la presión de aire correcta es fundamental, y productos como los Llantasavers pueden ayudarte a monitorearla fácilmente. Si estás gastando demasiado en llantas, ya sabes por qué.
                </p>
              </div>

              {/* Factors */}
              <div className="bg-gray-100 rounded-xl p-8 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Factores que causan desgaste prematuro
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {factors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-700 flex-shrink-0" />
                      <span className="text-gray-700">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              Servicios para Ahorrar en Llantas
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Nuestros servicios no requieren cita previa
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {services.map((service) => (
                <Link key={service.slug} href={service.slug}>
                  <div className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer h-full">
                    <div className="w-14 h-14 bg-[#368A45]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#368A45]/20 transition-colors">
                      <service.icon className="w-7 h-7 text-[#368A45]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#368A45] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-[#368A45] font-semibold">
                      Ver servicio <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Productos Recomendados
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="group bg-green-50 rounded-xl p-6 border border-green-200 hover:border-green-400 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <a href="https://store.thetrucksavers.com/collections/tire-and-wheel-products?utm_source=website&utm_medium=cta&utm_campaign=ahorro_llantas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#368A45] font-semibold">
                    Ver productos en la tienda <ChevronRight className="w-5 h-5 ml-1" />
                </a>
            </div>
            </div>
          </div>
        </section>

        {/* YouTube Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Videos Relacionados
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {youtubeVideos.map((video, index) => (
                  <a
                    key={index}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-red-50 rounded-xl p-6 border border-red-200 hover:border-red-400 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h3>
                    <span className="inline-flex items-center text-red-600 text-sm font-semibold">
                      Ver en YouTube <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#368A45]">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Quieres extender la vida de tus llantas?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Agenda tu inspección gratuita y descubre cómo podemos ayudarte a reducir el desgaste de tus neumáticos.
            </p>
            <Link href="/houston/inspeccion-la-bailada">
              <button className="bg-white text-[#368A45] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Agendar Inspección Gratis
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
