import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  dateSort: string; // formato YYYY-MM-DD para ordenar
  category: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "8",
    title: "Desgaste Prematuro de Llantas: Causas, Mitos y Soluciones",
    excerpt:
      "¿Cansado del desgaste prematuro de llantas? Descubre las 3 causas principales (alineación, balanceo, presión), los mitos que te cuestan dinero y las soluciones reales.",
    date: "4 de febrero, 2026",
    dateSort: "2026-02-04",
    category: "Llantas",
    image: "/images/desgaste-prematuro-llantas-camion.jpg",
    slug: "desgaste-prematuro-llantas",
  },
  {
    id: "5",
    title: "Diferencial o transmisión: ¡No te confundas!",
    excerpt:
      "Aprende a identificar la diferencia entre problemas del diferencial y la transmisión. Conoce los síntomas y cuándo llevar tu camión al taller.",
    date: "15 de enero, 2026",
    dateSort: "2026-01-15",
    category: "Mecánica",
    image: "/images/diferencial-o-transmisin-no-te-confundas.jpg",
    slug: "diferencial-transmision",
  },
  {
    id: "6",
    title: "Suspensión de tu troca: El secreto pa' un ride suave",
    excerpt:
      "Todo lo que necesitas saber sobre la suspensión de tu camión. Aprende a identificar problemas y mantener tu ride cómodo y seguro.",
    date: "15 de enero, 2026",
    dateSort: "2026-01-15",
    category: "Mantenimiento",
    image: "/images/suspensin-de-tu-troca-el-secreto-pa-un-ride-suave.jpg",
    slug: "suspension-troca",
  },
  {
    id: "7",
    title: "No dejes que el torque te haga wrap",
    excerpt:
      "Entiende qué es el torque, cómo afecta tu camión y qué hacer para evitar daños costosos en el tren motriz.",
    date: "15 de enero, 2026",
    dateSort: "2026-01-15",
    category: "Mecánica",
    image: "/images/no-dejes-que-el-torque-te-haga-wrap.jpg",
    slug: "torque-wrap",
  },
  {
    id: "1",
    title: "Go Green APU: ¿Por qué te ahorra tanto diésel?",
    excerpt:
      "Descubre cómo un Go Green APU puede ayudarte a ahorrar miles de dólares en combustible cada año. Aprende sobre esta tecnología revolucionaria.",
    date: "30 de diciembre, 2025",
    dateSort: "2025-12-30",
    category: "Ahorro",
    image: "/images/go-green-apu-ahorro-diesel.jpg",
    slug: "go-green-apu-ahorro-diesel",
  },
  {
    id: "2",
    title: "Luces del tablero: ¿Qué te está diciendo tu troca?",
    excerpt:
      "Guía completa sobre el significado de las luces de advertencia en tu camión. Aprende a identificar problemas antes de que se conviertan en costosas reparaciones.",
    date: "30 de diciembre, 2025",
    dateSort: "2025-12-30",
    category: "Mantenimiento",
    image: "/images/significado-luces-tablero-camion-2.jpg",
    slug: "significado-luces-tablero",
  },
  {
    id: "3",
    title: "¡Que no se caliente! Cuida el sistema de enfriamiento",
    excerpt:
      "El sistema de enfriamiento es crucial para la salud de tu motor. Aprende cómo mantenerlo en óptimas condiciones y evitar sobrecalentamientos.",
    date: "30 de diciembre, 2025",
    dateSort: "2025-12-30",
    category: "Mantenimiento",
    image: "/images/mecanico-mantenimiento-sistema-enfriamiento-camiones-diesel.jpg",
    slug: "sistema-enfriamiento",
  },
  {
    id: "4",
    title: "Inspección de carga diario: Guía del trokero",
    excerpt:
      "Conoce los puntos clave que debes revisar diariamente en tu camión para evitar multas del DOT y mantener la seguridad en carretera.",
    date: "30 de diciembre, 2025",
    dateSort: "2025-12-30",
    category: "Seguridad",
    image: "/images/mecanico-inspeccion-carga-diario-guia-trokero.jpg",
    slug: "inspeccion-carga-diaria",
  },
];

// Ordenar posts por fecha (más reciente primero)
const sortedPosts = [...blogPosts].sort((a, b) => 
  new Date(b.dateSort).getTime() - new Date(a.dateSort).getTime()
);

// Obtener categorías únicas
const categories = [...new Set(blogPosts.map(post => post.category))];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtrar posts por categoría seleccionada
  const filteredPosts = selectedCategory 
    ? sortedPosts.filter(post => post.category === selectedCategory)
    : sortedPosts;

  // El artículo destacado es el primero de los filtrados
  const featuredPost = filteredPosts[0];
  // Los demás artículos
  const otherPosts = filteredPosts.slice(1);

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
            <Link href="/resources" className="hover:text-white">Recursos</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Consejos prácticos y conocimientos de más de 24 años de experiencia en reparación de camiones.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="container">
            <Link href={`/blog/${featuredPost.slug}`}>
              <article className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/thetrucksavers-banner-3.webp';
                    }}
                  />
                </div>
                <div className="p-8 lg:py-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#368A45]/10 text-[#368A45]">
                      <Tag className="w-3 h-3" />
                      {featuredPost.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#368A45] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#368A45] font-semibold">
                    Leer artículo
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Categories Filter - Moved between featured and grid */}
      <section className="py-6 bg-white border-b">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Filtrar por:</span>
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null 
                  ? 'bg-[#368A45] text-white' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#368A45] hover:text-[#368A45]'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-[#368A45] text-white' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#368A45] hover:text-[#368A45]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedCategory ? `Artículos de ${selectedCategory}` : 'Más Artículos'}
          </h2>
          
          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#368A45] hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/thetrucksavers-banner-3.webp';
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-[#368A45]">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#368A45] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-[#368A45] font-medium text-sm">
                        Leer más
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay más artículos en esta categoría.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#368A45]">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Tienes preguntas sobre tu camión?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Nuestros expertos están listos para ayudarte. Agenda tu inspección gratuita "La Bailada".
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-white text-[#368A45] hover:bg-gray-100 w-full sm:w-auto">
                Ver Ubicaciones
              </Button>
            </Link>
            <a
              href="https://wa.me/17134555566?text=Hola,%20tengo%20una%20pregunta%20sobre%20mi%20camión"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#368A45] w-full sm:w-auto">
                Preguntar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
