import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Go Green APU: ¿Por qué te ahorra tanto diésel?",
    excerpt:
      "Descubre cómo un Go Green APU puede ayudarte a ahorrar miles de dólares en combustible cada año. Aprende sobre esta tecnología revolucionaria.",
    date: "30 de diciembre, 2025",
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
    category: "Mantenimiento",
    image: "/images/significado-luces-tablero.jpg",
    slug: "significado-luces-tablero",
  },
  {
    id: "3",
    title: "¡Que no se caliente! Cuida el sistema de enfriamiento",
    excerpt:
      "El sistema de enfriamiento es crucial para la salud de tu motor. Aprende cómo mantenerlo en óptimas condiciones y evitar sobrecalentamientos.",
    date: "30 de diciembre, 2025",
    category: "Mantenimiento",
    image: "/images/sistema-enfriamiento.jpg",
    slug: "sistema-enfriamiento",
  },
  {
    id: "4",
    title: "Inspección de carga diario: Guía del trokero",
    excerpt:
      "Conoce los puntos clave que debes revisar diariamente en tu camión para evitar multas del DOT y mantener la seguridad en carretera.",
    date: "30 de diciembre, 2025",
    category: "Seguridad",
    image: "/images/inspeccion-carga.jpg",
    slug: "inspeccion-carga",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-green-100">
            Consejos y conocimientos de nuestro taller mecánico
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <a className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                    Leer más
                    <ArrowRight size={18} />
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Ver más publicaciones
          </button>
        </div>
      </div>
    </div>
  );
}
