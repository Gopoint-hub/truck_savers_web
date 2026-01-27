import { Link } from 'wouter';
import { BookOpen, Podcast, Lightbulb, ChevronRight, GraduationCap } from 'lucide-react';
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
            Más de 24 años de experiencia mecánica compartida. Aprende a ahorrar y prevenir daños costosos con nuestros consejos prácticos.
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

      {/* Cursos en Línea Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/resources/cursos"
              className="block"
            >
              <div className="bg-gradient-to-r from-[#368A45] to-[#2D6E39] rounded-2xl p-8 md:p-12 text-white hover:shadow-2xl transition-all">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Cursos en Línea
                    </h2>
                    <p className="text-white/90 text-lg mb-6 leading-relaxed">
                      Si te interesa aprender la normativa del DOT, a realizar inspecciones, a alinear y diagnosticar el problema de desgaste irregular de llantas, únete a nuestros cursos en línea. También puedes registrarte en una lista de espera para futuros cursos presenciales.
                    </p>
                    <span className="inline-flex items-center bg-white text-[#368A45] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Explorar Cursos <ChevronRight className="w-5 h-5 ml-2" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Síguenos en Redes Sociales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mantente conectado con la comunidad de transportistas
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/LosTruckSavers/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all min-w-[140px]"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="font-semibold text-gray-900 group-hover:text-blue-600">Facebook</span>
              <span className="text-sm text-gray-500">@LosTruckSavers</span>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/lostrucksavers/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-pink-50 hover:shadow-lg transition-all min-w-[140px]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="font-semibold text-gray-900 group-hover:text-pink-600">Instagram</span>
              <span className="text-sm text-gray-500">@lostrucksavers</span>
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@lostrucksavers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-lg transition-all min-w-[140px]"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
              <span className="font-semibold text-gray-900 group-hover:text-gray-700">TikTok</span>
              <span className="text-sm text-gray-500">@lostrucksavers</span>
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
