import { ExternalLink, Headphones, Youtube, Music2, Users, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

/**
 * Podcasts Page - Resources Section
 * URL: /resources/podcasts
 * Canonical: https://thetrucksavers.com/resources/podcasts
 */

const podcasts = [
  {
    title: 'Reparando Trokeros',
    description: 'Entrevistas a trokeros sobre las diversas problemáticas que viven día a día. Hablamos de la persona, no de los fierros. Conoce las historias reales de quienes mueven a Estados Unidos y México.',
    icon: Users,
    image: '/images/reparando-trokeros.jpg',
    platforms: [
      {
        name: 'YouTube',
        url: 'https://www.youtube.com/playlist?list=PLCJ62d3C3v0u5UeAnxpgrtVvhDtYbp1u2',
        icon: Youtube,
        color: 'bg-red-600 hover:bg-red-700',
      },
      {
        name: 'Spotify',
        url: 'https://open.spotify.com/show/54MZRziETt1StMY7YJ4Wjp',
        icon: Music2,
        color: 'bg-green-600 hover:bg-green-700',
      },
    ],
    featured: true,
  },
  {
    title: 'Desde el Taller',
    description: 'Serie de transmisiones en vivo donde traemos invitados especiales para platicar sobre diferentes temas de la industria del transporte. Expertos, trokeros y profesionales comparten su experiencia.',
    icon: Mic,
    image: '/images/desde-el-taller.jpg',
    platforms: [
      {
        name: 'YouTube',
        url: 'https://www.youtube.com/playlist?list=PLCJ62d3C3v0uwa00Z_Q0m146fBTBOZgKf',
        icon: Youtube,
        color: 'bg-red-600 hover:bg-red-700',
      },
    ],
    featured: false,
  },
];

export default function PodcastsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Podcasts | The Truck Savers"
        description="Escucha nuestros podcasts: Reparando Trokeros y Desde el Taller. Entrevistas, historias y conversaciones sobre la industria del transporte."
        canonical="https://thetrucksavers.com/resources/podcasts"
      />

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-20">
        <div 
          className="absolute inset-0 bg-cover opacity-30"
          style={{ backgroundImage: "url('/images/fondo-preefooter-webp.webp')", backgroundPosition: 'center 35%' }}
        />
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-10 h-10 text-[#368A45]" />
              <span className="text-[#368A45] font-semibold text-lg">Podcasts</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Escucha Nuestros Podcasts
            </h1>
            <p className="text-xl text-gray-300">
              Contenido exclusivo para la comunidad de transportistas. Historias reales, 
              entrevistas y conversaciones sobre la industria del transporte.
            </p>
          </div>
        </div>
      </section>

      {/* Podcasts Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {podcasts.map((podcast) => (
              <div 
                key={podcast.title}
                className={`bg-white rounded-2xl shadow-lg border overflow-hidden ${
                  podcast.featured ? 'border-[#368A45] ring-2 ring-[#368A45]/20' : 'border-gray-200'
                }`}
              >
                {podcast.featured && (
                  <div className="bg-[#368A45] text-white text-center py-2 text-sm font-semibold">
                    Podcast Principal
                  </div>
                )}
                
                {/* Podcast Image */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={podcast.image} 
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{podcast.title}</h2>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {podcast.description}
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Escúchalo en:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {podcast.platforms.map((platform) => (
                        <a
                          key={platform.name}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button 
                            className={`${platform.color} text-white flex items-center gap-2`}
                          >
                            <platform.icon className="w-5 h-5" />
                            {platform.name}
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Quieres ser parte del podcast?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Si eres trokero y tienes una historia que contar, o eres experto en la industria 
              del transporte y quieres compartir tu conocimiento, ¡queremos escucharte!
            </p>
            <a
              href="https://wa.me/17138588708?text=Hola,%20me%20gustaría%20participar%20en%20el%20podcast"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-[#368A45] hover:bg-[#2d7339] text-white">
                Contáctanos por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* YouTube Channel CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <Youtube className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Suscríbete a Nuestro Canal de YouTube
            </h2>
            <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
              No te pierdas ningún episodio. Suscríbete a Los Truck Savers en YouTube 
              y activa las notificaciones para estar al día con todo nuestro contenido.
            </p>
            <a
              href="https://www.youtube.com/@LosTruckSavers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Youtube className="w-5 h-5 mr-2" />
                Ir al Canal
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
