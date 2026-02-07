import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { Zap, Wrench, Gauge, Settings, ChevronRight, Youtube, CheckCircle, Wind } from 'lucide-react';

/**
 * Reducción de Vibraciones - Soluciones para el Confort y Seguridad
 * URL: /recursos/ahorro/reduccion-vibraciones
 */

const services = [
  {
    slug: '/houston/alineacion-de-camiones',
    title: 'Alineación de Llantas',
    description: 'La alineación precisa de los 3 ejes del camión y del remolque es fundamental para evitar vibraciones y un desgaste irregular de las llantas.',
    icon: Gauge,
  },
  {
    slug: '/houston/balanceo-de-llantas',
    title: 'Balanceo de Llantas',
    description: 'Eliminamos las vibraciones de las ruedas mediante un balanceo dinámico, mejorando el confort y la vida útil de tus neumáticos.',
    icon: Wrench,
  },
  {
    slug: '/houston/reparacion-de-neumaticos',
    title: 'Depilado de Llantas',
    description: 'Corregimos el desgaste irregular de las llantas, una fuente común de vibraciones, para restaurar una conducción suave.',
    icon: Settings,
  },
];

const products = [
  {
    name: 'Vibrasavers',
    description: 'Innovadores amortiguadores de vibraciones que se instalan en las ruedas para una conducción más suave.',
  },
  {
    name: 'Salvamorenas',
    description: 'Un sellador de llantas que no solo previene ponchaduras, sino que también ayuda a balancear el conjunto de la rueda, reduciendo vibraciones.',
  },
];

const sources = [
  'Motor: Desbalances o fallos en los soportes.',
  'Barra Cardán: Desgaste en crucetas o yugos, o falta de balanceo.',
  'Ruedas: Llantas desbalanceadas, desgaste irregular o rines dañados.',
];

const youtubeVideos = [
  {
    title: '¿Qué causa las vibraciones en un camión?',
    url: 'https://youtu.be/wBb9SQ4Szew?si=jcVBnp_qsIrfo9jq',
  },
];

export default function ReduccionVibraciones() {
  return (
    <>
      <Helmet>
        <title>Reducción de Vibraciones en Camiones | The Truck Savers</title>
        <meta
          name="description"
          content="Aprende a identificar y solucionar las fuentes de vibraciones en tu camión para mejorar el confort, la seguridad y el rendimiento."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-20">
          <div className="container relative z-10">
            <nav className="text-sm text-blue-200 mb-6">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/recursos" className="hover:text-white">Recursos</Link>
              <span className="mx-2">/</span>
              <Link href="/recursos/ahorro" className="hover:text-white">Ahorros y Vibraciones</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Reducción de Vibraciones</span>
            </nav>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Reducción de Vibraciones
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Nos enfocamos en reducir vibraciones para mejorar no solo el desempeño del vehículo, sino también el confort y la seguridad del conductor.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Un Enfoque Integral Más Allá de los Fierros
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                <p>
                  En The Truck Savers, entendemos que las vibraciones son más que una simple molestia. Afectan la seguridad, el confort del operador y la vida útil de los componentes del camión. Por eso, nuestro enfoque es integral: no solo reparamos los fierros, sino que investigamos constantemente para desarrollar y probar productos que mejoren el desempeño y la experiencia de manejo.
                </p>
                <p>
                  Una llanta que vibra se desgasta de forma irregular y prematura, lo que no solo reduce su vida útil, sino que también incrementa el consumo de combustible. Muchos de nuestros videos se enfocan en explicar las fuentes de estas vibraciones para que puedas identificarlas a tiempo.
                </p>
              </div>

              {/* Sources */}
              <div className="bg-blue-50 rounded-xl p-8 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Principales Fuentes de Vibraciones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sources.map((source, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{source}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              Productos para Reducir Vibraciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              {products.map((product) => (
                <div key={product.name} className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#368A45] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
                <a href="https://store.thetrucksavers.com/collections/tire-and-wheel-products?utm_source=website&utm_medium=cta&utm_campaign=reduccion_vibraciones" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#368A45] font-semibold">
                    Ver productos en la tienda <ChevronRight className="w-5 h-5 ml-1" />
                </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              Servicios para Eliminar Vibraciones
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Nuestros técnicos especializados diagnostican y corrigen las causas de las vibraciones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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

        {/* YouTube Section */}
        <section className="py-16 bg-gray-50">
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
              ¿Sientes vibraciones en tu camión?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              No esperes más. Agenda una inspección y deja que nuestros expertos te devuelvan la tranquilidad al volante.
            </p>
            <Link href="/houston/inspeccion-la-bailada">
              <button className="bg-white text-[#368A45] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Agendar Inspección
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
