import { Link } from 'wouter';
import { Calendar, Clock, ArrowLeft, Share2, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Blog Article Template - Reusable component for individual blog posts
 * Design: Industrial Moderno with Pantone colors
 */

interface RelatedArticle {
  slug: string;
  title: string;
  image: string;
}

interface BlogArticleProps {
  title: string;
  subtitle: string;
  heroImage: string;
  category: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
  relatedArticles?: RelatedArticle[];
}

export default function BlogArticleTemplate({
  title,
  subtitle,
  heroImage,
  category,
  date,
  readTime,
  content,
  relatedArticles = [],
}: BlogArticleProps) {
  const whatsappNumber = "17134555566";
  const whatsappMessage = encodeURIComponent(`Hola, leí el artículo "${title}" y me gustaría más información.`);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Link copiado al portapapeles!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url('${heroImage}')`, backgroundPosition: 'center 35%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60" />
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/resources" className="hover:text-white">Recursos</Link>
            <span className="mx-2">/</span>
            <Link href="/resources/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{title.substring(0, 30)}...</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-[#368A45] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              {category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} de lectura</span>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <div className="blog-content">
                {content}
              </div>

              {/* CTA Box */}
              <div className="mt-12 bg-[#368A45] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  ¿Necesitas ayuda con tu camión?
                </h3>
                <p className="text-white/90 mb-6">
                  Nuestro equipo de expertos está listo para ayudarte. Agenda una inspección gratuita "La Bailada" y descubre el estado real de tu camión.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-white text-[#368A45] hover:bg-gray-100 w-full sm:w-auto">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contactar por WhatsApp
                    </Button>
                  </a>
                  <Link href="/houston">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#368A45] w-full sm:w-auto">
                      Ver Ubicaciones
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Back to Blog */}
              <div className="mt-8">
                <Link href="/resources/blog">
                  <Button variant="ghost" className="text-gray-600 hover:text-[#368A45]">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Blog
                  </Button>
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Quick Contact */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">¿Tienes preguntas?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Nuestros expertos están disponibles para ayudarte con cualquier duda sobre tu camión.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-[#368A45] hover:bg-[#2D6E39]">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Artículos Relacionados</h4>
                    <div className="space-y-4">
                      {relatedArticles.map((article) => (
                        <Link key={article.slug} href={`/blog/${article.slug}`}>
                          <div className="group flex gap-3 cursor-pointer">
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-20 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h5 className="text-sm font-medium text-gray-900 group-hover:text-[#368A45] transition-colors line-clamp-2">
                                {article.title}
                              </h5>
                              <span className="text-xs text-[#368A45] flex items-center mt-1">
                                Leer más <ChevronRight className="w-3 h-3 ml-1" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services CTA */}
                <div className="bg-gray-900 rounded-xl p-6 text-white">
                  <h4 className="font-bold mb-2">Inspección Gratis</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Agenda tu inspección "La Bailada" y conoce el estado real de tu camión.
                  </p>
                  <Link href="/servicios/inspeccion-bailada">
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-gray-900">
                      Más Información
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
