import { useState } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Design Philosophy: Industrial Modern + Minimalismo Corporativo
 * - Green primary (#22C55E) + Dark gray foreground (#1F2937)
 * - Generous spacing, clear hierarchy, functional design
 * - Responsive mobile-first approach
 */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'NUESTRA INSPECCIÓN SIEMPRE ES GRATIS',
      description: 'Ponemos a bailar tu camión sin costo alguno, escaneamos tus llantas y visualmente inspeccionamos más de 100 puntos de seguridad.',
      image: '/images/home_truck-dancing.png',
      cta: 'Solicitar Inspección'
    },
    {
      title: 'AHORRO EN DIESEL',
      description: 'Deja de desperdiciar dinero en combustible, obtén más rendimiento en el camino y empieza a ahorrar dinero.',
      image: '/images/go-green-apu-ahorro-diesel-rh7ye0bu0h7pbke5ut56uz578nuh9b2u8knt30bl68.jpg',
      cta: 'Conocer Más'
    }
  ];

  const services = [
    {
      icon: '/images/home_iconos-tts8.png',
      title: 'Inspección "La Bailada"',
      description: 'Simulador de camino para detectar problemas en suspensión, dirección y componentes críticos.'
    },
    {
      icon: '/images/home_iconos-tts4.png',
      title: 'Alineación',
      description: 'Alineación de precisión para camiones y trailers con equipos de última generación.'
    },
    {
      icon: '/images/home_iconos-tts2.png',
      title: 'Suspensión y Dirección',
      description: 'Reparación y mantenimiento de sistemas de suspensión y dirección hidráulica.'
    },
    {
      icon: '/images/home_iconos-tts9.png',
      title: 'Cambio de Aceite',
      description: 'Mantenimiento rutinario con productos de calidad para motores diésel.'
    },
    {
      icon: '/images/home_suspension-icono.png',
      title: 'Frenos',
      description: 'Taller especializado en reparación y mantenimiento de sistemas de frenos.'
    },
    {
      icon: '/images/home_direccion-icono.png',
      title: 'Dirección Hidráulica',
      description: 'Reparación de sistemas de dirección hidráulica para camiones.'
    }
  ];

  const whyUs = [
    {
      title: '21 Años de Experiencia',
      description: 'Más de dos décadas especializados en motores diésel y camiones comerciales.'
    },
    {
      title: 'Mecánicos Expertos',
      description: 'Equipo certificado con profundo conocimiento en reparación de camiones.'
    },
    {
      title: 'Estacionamiento Amplio',
      description: 'Capacidad para más de 50 vehículos con acceso rápido a nuestros servicios.'
    }
  ];

  const testimonials = [
    {
      name: 'Carlos M.',
      text: 'Excelente servicio, muy profesionales. Recomiendo ampliamente.',
      rating: 5
    },
    {
      name: 'Juan P.',
      text: 'Inspeccionaron mi camión completamente. Muy detallado y honesto.',
      rating: 5
    },
    {
      name: 'Miguel R.',
      text: 'Llevo años viniendo aquí. Nunca me han defraudado.',
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Carousel */}
        <section id="home" className="relative h-96 md:h-[500px] overflow-hidden bg-gray-900">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 py-12">
                  <div className="max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-gray-100 mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                      {slide.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
            aria-label="Slide siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir a slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Somos un Taller Mecánico de Camiones y Trailers
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En Houston, hace más de 20 años, nuestros mecánicos expertos se especializan en motores diésel de alto rendimiento: inspecciones preventivas, mantenimiento rutinario y reparación de tu camión y tráiler en un solo lugar.
              </p>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              ¿Por Qué Elegirnos?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyUs.map((item, idx) => (
                <div key={idx} className="p-8 bg-gray-50 rounded-lg border border-border hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white rounded-lg border border-border hover:shadow-lg hover:border-primary transition-all group cursor-pointer"
                >
                  <div className="mb-4">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Nuestros Clientes Siempre Regresan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="p-8 bg-gray-50 rounded-lg border border-border">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              ¿Listo para Mejorar tu Camión?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Contáctanos hoy para agendar tu inspección gratis o conocer más sobre nuestros servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Contactar Ahora
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Llamar: 713-455-5566
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Teléfono</h3>
                <a href="tel:+17134555566" className="text-primary hover:underline">
                  713-455-5566
                </a>
              </div>
              <div className="text-center">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <a href="mailto:info@thetrucksavers.com" className="text-primary hover:underline">
                  info@thetrucksavers.com
                </a>
              </div>
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Ubicación</h3>
                <p className="text-muted-foreground">
                  1362 Sheffield Blvd<br />
                  Houston, TX 77020
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
