import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { Fuel, CircleDot, ChevronRight, Wrench, Gauge, Settings, Droplet, Wind } from 'lucide-react';

/**
 * Ahorro Hub - Ahorros y Vibraciones
 * URL: /resources/ahorro
 */

const ahorroOptions = [
  {
    slug: 'diesel',
    title: 'Ahorro en Diésel',
    description: 'Optimiza el consumo de combustible y reduce costos operativos con nuestros servicios y productos especializados.',
    icon: Fuel,
    color: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-50',
  },
  {
    slug: 'llantas',
    title: 'Ahorro en Llantas',
    description: 'Extiende la vida útil de tus neumáticos y previene el desgaste prematuro con el mantenimiento y los productos adecuados.',
    icon: CircleDot,
    color: 'bg-gray-700',
    hoverColor: 'hover:bg-gray-50',
  },
  {
    slug: 'reduccion-vibraciones',
    title: 'Reducción de Vibraciones',
    description: 'Mejora el confort, la seguridad y el desempeño de tu vehículo eliminando las vibraciones desde su origen.',
    icon: Wind,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-50',
  },
];

export default function AhorroHub() {
  return (
    <>
      <Helmet>
        <title>Ahorros y Vibraciones | The Truck Savers</title>
        <meta
          name="description"
          content="Descubre cómo ahorrar en combustible diésel, extender la vida útil de tus llantas y reducir las vibraciones con los servicios especializados de The Truck Savers."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-16 md:py-20">
          <div 
            className="absolute inset-0 bg-cover opacity-30"
            style={{ backgroundImage: "url('/images/fondo-preefooter-webp.webp')", backgroundPosition: 'center 35%' }}
          />
          <div className="absolute inset-0 bg-gray-900/70" />
          <div className="container relative z-10">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/resources" className="hover:text-white">Recursos</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Ahorros y Vibraciones</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ahorros y Vibraciones
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Optimiza los costos de operación, reduce las vibraciones y extiende la vida de tus llantas con nuestras soluciones integrales.
            </p>
          </div>
        </section>

        {/* Ahorro Options */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {ahorroOptions.map((option) => (
                <Link key={option.slug} href={`/resources/ahorro/${option.slug}`}>
                  <div className={`group bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-[#368A45] ${option.hoverColor} hover:shadow-xl transition-all cursor-pointer h-full`}>
                    <div className={`w-20 h-20 ${option.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <option.icon className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#368A45] transition-colors">
                      {option.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {option.description}
                    </p>
                    <span className="inline-flex items-center text-[#368A45] font-semibold">
                      Ver más <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              Servicios que te Ayudan a Ahorrar
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Nuestros servicios están diseñados para optimizar el rendimiento de tu camión y reducir costos operativos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Link href="/houston/inspeccion-la-bailada">
                <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer text-center">
                  <div className="w-14 h-14 bg-[#368A45]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-7 h-7 text-[#368A45]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">La Bailada</h3>
                  <p className="text-sm text-gray-600">Diagnóstico dinámico completo</p>
                </div>
              </Link>

              <Link href="/houston/alineacion-de-camiones">
                <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer text-center">
                  <div className="w-14 h-14 bg-[#368A45]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gauge className="w-7 h-7 text-[#368A45]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Alineación</h3>
                  <p className="text-sm text-gray-600">3 ejes del camión y trailer</p>
                </div>
              </Link>

              <Link href="/houston/suspensiones">
                <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer text-center">
                  <div className="w-14 h-14 bg-[#368A45]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-7 h-7 text-[#368A45]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Suspensión</h3>
                  <p className="text-sm text-gray-600">Diagnóstico y reparación</p>
                </div>
              </Link>

              <Link href="/houston/cambio-de-aceite">
                <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer text-center">
                  <div className="w-14 h-14 bg-[#368A45]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Droplet className="w-7 h-7 text-[#368A45]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Cambio de Aceite</h3>
                  <p className="text-sm text-gray-600">Lubricación profesional</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#368A45]">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Listo para empezar a ahorrar?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Agenda tu inspección gratuita y descubre cómo podemos ayudarte a reducir tus costos de operación.
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
