import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { Fuel, Wrench, Gauge, Settings, Droplet, ChevronRight, Youtube, CheckCircle, Zap } from 'lucide-react';

/**
 * Ahorro en Diésel - Soluciones para el Ahorro de Combustible
 * URL: /resources/ahorro/diesel
 */

const services = [
  {
    slug: '/houston/inspeccion-la-bailada',
    title: 'La Bailada',
    description: 'Servicio indispensable que permite encontrar problemas en diferentes componentes como la barra cardán, suspensión y dirección. Equipo único que realiza diagnósticos dinámicos poniendo el camión en movimiento.',
    icon: Wrench,
  },
  {
    slug: '/houston/suspensiones',
    title: 'Suspensión y Dirección',
    description: 'Usamos herramientas modernas y personal capacitado para diagnosticar correctamente e instalar componentes de suspensión y dirección.',
    icon: Settings,
  },
  {
    slug: '/houston/alineacion-de-camiones',
    title: 'Alineación de Llantas',
    description: 'Alineamos 3 ejes del camión y también los trailers porque están relacionados con el desgaste de llantas y el consumo de combustible.',
    icon: Gauge,
  },
  {
    slug: '/houston/cambio-de-aceite',
    title: 'Cambio de Aceite',
    description: 'Incluye marcas famosas de aceite lubricante 100% virgen para mantener el motor en mejor estado y reducir la fricción.',
    icon: Droplet,
  },
  {
    slug: '/houston/go-green-apu',
    title: 'Instalación de APU',
    description: 'Ahorra hasta $14,000 al año en combustible y mantenimiento. El APU permite climatizar la cabina sin encender el motor principal, reduciendo drásticamente el consumo de diésel.',
    icon: Zap,
  },
];

const factors = [
  'Calibración de válvulas e inyectores',
  'Desgaste prematuro de llantas',
  'Presión de inflado incorrecta',
  'Fricción excesiva en componentes',
  'Problemas de suspensión y dirección',
  'Lubricación inadecuada',
];

const youtubeVideos = [
  {
    title: 'Causas de Desgaste de Llantas',
    url: 'https://www.youtube.com/watch?v=WnftRhn_CUg',
  },
  {
    title: 'Ahorrar Diesel',
    url: 'https://www.youtube.com/watch?v=2C9tZDSqvVg',
  },
];

export default function AhorroDiesel() {
  return (
    <>
      <Helmet>
        <title>Ahorro en Diésel para Camiones | The Truck Savers</title>
        <meta
          name="description"
          content="Descubre cómo ahorrar combustible diésel en tu camión con servicios de lubricación, alineación y diagnóstico profesional en The Truck Savers."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16 md:py-20">
          <div className="container relative z-10">
            <nav className="text-sm text-amber-200 mb-6">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/resources" className="hover:text-white">Recursos</Link>
              <span className="mx-2">/</span>
              <Link href="/resources/ahorro" className="hover:text-white">Ahorro</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Diésel</span>
            </nav>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Fuel className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Ahorro en Diésel
              </h1>
            </div>
            <p className="text-xl text-amber-100 max-w-3xl">
              La lubricación adecuada de las partes móviles del camión minimiza la fricción entre los componentes, lo que ayuda a reducir el desgaste y prolonga la vida útil de los mecanismos.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Para aprovechar al máximo tu combustible diésel, lubrica tu camión adecuadamente
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                <p>
                  La lubricación adecuada de las partes móviles del camión minimiza la fricción entre los componentes, lo que ayuda a reducir el desgaste y prolonga la vida útil de las piezas mecánicas. Previene el desgaste prematuro de piezas, sobrecalentamiento del motor, eficiencia reducida, aumento de ruido y vibración, y también puede ahorrar dinero en costos de mantenimiento.
                </p>
                <p>
                  Obviamente, es el costo principal de la operación de una unidad de carga, y es crucial tomar medidas para reducir el consumo de combustible porque estamos muy acostumbrados al consumo excesivo de combustible, a pesar de ser uno de los mayores costos.
                </p>
                <p>
                  Una de las formas más efectivas de ahorrar diésel es la instalación de un APU (Auxiliary Power Unit). Con un APU puedes climatizar tu cabina sin necesidad de encender el motor principal, ahorrando hasta $14,000 al año en combustible y mantenimiento.
                </p>
              </div>

              {/* Factors */}
              <div className="bg-amber-50 rounded-xl p-8 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Factores que afectan el consumo de diésel
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {factors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
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
              Servicios para Ahorrar Diésel
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
              ¿Quieres empezar a ahorrar diésel?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Agenda tu inspección gratuita y descubre cómo podemos ayudarte a reducir tu consumo de combustible.
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
