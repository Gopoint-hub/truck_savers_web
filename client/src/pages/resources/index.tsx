import { Link } from 'wouter';
import { BookOpen, Podcast, Lightbulb, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Resources Hub - SEO Local Architecture
 * URL: /resources/
 * Canonical: https://thetrucksavers.com/resources/
 */

const blogPosts = [
  {
    slug: 'go-green-apu-ahorro-diesel',
    title: 'Go Green APU: ¿Por qué te ahorra tanto diésel?',
    excerpt: 'Descubre cómo un Go Green APU puede ayudarte a ahorrar miles de dólares en combustible cada año.',
    image: '/images/go-green-apu-ahorro-diesel.jpg',
    date: '30 Dic 2025',
    category: 'Ahorro',
  },
  {
    slug: 'significado-luces-tablero',
    title: 'Luces del tablero: ¿Qué te está diciendo tu troca?',
    excerpt: 'Guía completa sobre el significado de las luces de advertencia en tu camión.',
    image: '/images/significado-luces-tablero-camion-2.jpg',
    date: '30 Dic 2025',
    category: 'Mantenimiento',
  },
  {
    slug: 'sistema-enfriamiento',
    title: '¡Que no se caliente! Cuida el sistema de enfriamiento',
    excerpt: 'El sistema de enfriamiento es crucial para la salud de tu motor. Aprende cómo mantenerlo.',
    image: '/images/mecanico-mantenimiento-sistema-enfriamiento-camiones-diesel.jpg',
    date: '30 Dic 2025',
    category: 'Mantenimiento',
  },
  {
    slug: 'inspeccion-carga-diaria',
    title: 'Inspección de carga diario: Guía del trokero',
    excerpt: 'Conoce los puntos clave que debes revisar diariamente en tu camión.',
    image: '/images/mecanico-inspeccion-carga-diario-guia-trokero.jpg',
    date: '30 Dic 2025',
    category: 'Seguridad',
  },
];

const resourceCategories = [
  {
    slug: 'blog',
    title: 'Blog',
    description: 'Artículos y consejos para el mantenimiento de tu camión',
    icon: BookOpen,
    count: 7,
  },
  {
    slug: 'podcasts',
    title: 'Podcasts',
    description: 'Escucha nuestros podcasts sobre la industria del transporte',
    icon: Podcast,
    count: 10,
  },
  {
    slug: 'ahorro',
    title: 'Ahorro',
    description: 'Tips y estrategias para ahorrar en mantenimiento y combustible',
    icon: Lightbulb,
    count: 3,
  },
];

export default function ResourcesHub() {
  return (
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
            <span className="text-white">Recursos</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Recursos y Contenido
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Más de 20 años de experiencia mecánica compartida. Aprende a ahorrar y prevenir daños costosos con nuestros consejos prácticos.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resourceCategories.map((category) => (
              <Link key={category.slug} href={`/resources/${category.slug}`}>
                <div className="group bg-white rounded-lg p-6 border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#368A45]/10 rounded-lg flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-[#368A45]" />
                    </div>
                    <span className="text-sm text-gray-500">{category.count} artículos</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#368A45] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Últimos Artículos
            </h2>
            <Link href="/resources/blog">
              <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                Ver todos →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer">
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/thetrucksavers-banner-3.webp';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#368A45] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Síguenos en YouTube
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Videos educativos sobre mantenimiento de camiones, consejos de ahorro y más.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <a 
              href="https://www.youtube.com/@LosTruckSavers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Los Truck Savers en YouTube
                </h3>
                <p className="text-gray-600 mb-4">
                  Suscríbete para más contenido sobre camiones
                </p>
                <span className="inline-flex items-center text-[#368A45] font-semibold">
                  Visitar Canal <ChevronRight className="w-5 h-5 ml-1" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#368A45]">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Necesitas ayuda con tu camión?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Agenda tu inspección gratuita "La Bailada" en cualquiera de nuestras ubicaciones.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-[#368A45] hover:bg-gray-100">
              Ver Ubicaciones
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
