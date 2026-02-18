import { Link } from 'wouter';
import { Truck, Shield, ChevronRight, Heart, Users, Wrench, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * QR Landing Page - Campaña de referidos de operadores
 * URL: /qr
 * 
 * Esta página es una landing de campaña que se puede modificar con el tiempo.
 * Campaña actual: Referidos de operadores → Bolsa de Jale
 */

export default function QRLinkTree() {
  const WHATSAPP_NUMBER = '528342995255';
  const WHATSAPP_MESSAGE = encodeURIComponent(
    'Licenciada, tengo un compa que anda buscando jale en una compañía que sí le meta mantenimiento al mamalón. ¿Le puede ayudar?'
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-[#1a3a22]">
      
      {/* Hero - Impacto inmediato */}
      <section className="relative px-4 pt-10 pb-8">
        <div className="max-w-lg mx-auto text-center">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/images/logo-truck-savers-webp.webp" 
              alt="The Truck Savers" 
              className="h-16 mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-[#368A45]/20 text-[#5BBB6A] font-semibold px-4 py-2 rounded-full text-sm mb-6">
            <Heart className="w-4 h-4" />
            Campaña de Referidos
          </span>

          {/* Headline principal */}
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            ¿Conoces a alguien que ande <span className="text-[#5BBB6A]">batallando</span> con su camión?
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-2">
            Si tienes un compa que está cansado de andar en un camión descuidado, con frenos que no responden, llantas lisas y suspensión que ya no aguanta...
          </p>

          <p className="text-xl text-white font-semibold mt-4">
            Podemos ayudarlo.
          </p>
        </div>
      </section>

      {/* Problema - Empatía */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              Sabemos lo que vive en la carretera
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-lg">✕</span>
                </div>
                <p className="text-gray-300">
                  El patrón <strong className="text-white">no le quiere meter</strong> al camión y lo manda así a la carretera
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-lg">✕</span>
                </div>
                <p className="text-gray-300">
                  Anda en <strong className="text-white">condiciones inseguras</strong>, batallando con frenos, dirección o llantas
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-lg">✕</span>
                </div>
                <p className="text-gray-300">
                  El jefe de mantenimiento <strong className="text-white">no hace su trabajo</strong> y el operador paga las consecuencias
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-lg">✕</span>
                </div>
                <p className="text-gray-300">
                  Quiere <strong className="text-white">cambiarse de compañía</strong> pero no sabe a dónde ir
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solución */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-[#368A45]/20 to-[#2D6E39]/20 backdrop-blur-sm rounded-2xl border border-[#368A45]/30 p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#368A45] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Nosotros le ayudamos
              </h2>
              <p className="text-gray-300">
                En The Truck Savers reparamos camiones para muchas compañías que <strong className="text-[#5BBB6A]">sí le meten mantenimiento a sus unidades</strong>
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#5BBB6A] flex-shrink-0 mt-0.5" />
                <p className="text-gray-200 text-sm">
                  Compañías que <strong className="text-white">les dan buen mantenimiento</strong> a sus camiones
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#5BBB6A] flex-shrink-0 mt-0.5" />
                <p className="text-gray-200 text-sm">
                  Unidades <strong className="text-white">bien alineadas</strong>, con frenos en buen estado y llantas nuevas
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#5BBB6A] flex-shrink-0 mt-0.5" />
                <p className="text-gray-200 text-sm">
                  Camiones <strong className="text-white">certificados</strong> para andar seguros y cómodos en la carretera
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#5BBB6A] flex-shrink-0 mt-0.5" />
                <p className="text-gray-200 text-sm">
                  Podemos <strong className="text-white">colocarlo en una compañía</strong> que sí cuide sus unidades y a sus operadores
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Principal - Bolsa de Jale */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#368A45]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-7 h-7 text-[#368A45]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Mándalo a la Bolsa de Jale
              </h2>
              <p className="text-gray-600">
                Que deje sus datos y nosotros lo conectamos con compañías que <strong>sí le meten al mamalón</strong>
              </p>
            </div>

            {/* Botón principal - Ir a Bolsa de Jale */}
            <Link href="/recursos/bolsa-de-jale">
              <button className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white font-bold py-5 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 mb-4">
                <Truck className="w-6 h-6" />
                Ir a la Bolsa de Jale
                <ChevronRight className="w-6 h-6" />
              </button>
            </Link>

            <p className="text-center text-gray-500 text-sm mb-6">
              Registro rápido — Solo necesita nombre, WhatsApp y experiencia
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm font-medium">o si prefieres</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Botón WhatsApp - Referir por mensaje */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-4 px-6 rounded-xl text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Referir por WhatsApp
            </a>
            <p className="text-center text-gray-400 text-xs mt-3">
              Escríbenos y nosotros le damos seguimiento a tu compa
            </p>
          </div>
        </div>
      </section>

      {/* Compartir la página */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
            <Users className="w-10 h-10 text-[#5BBB6A] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">
              Comparte esta página
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Si conoces a más compas que andan batallando, pásales este enlace. Entre todos nos cuidamos en la carretera.
            </p>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Bolsa de Jale - The Truck Savers',
                    text: '¿Andas buscando jale en una compañía que sí le meta mantenimiento al camión? Checa esto:',
                    url: 'https://thetrucksavers.com/jale',
                  });
                } else {
                  navigator.clipboard.writeText('https://thetrucksavers.com/jale');
                  alert('¡Enlace copiado! Compártelo con tus compas.');
                }
              }}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowRight className="w-5 h-5" />
              Compartir enlace
            </button>
          </div>
        </div>
      </section>

      {/* Qué es Truck Savers - Contexto rápido */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white mb-2">
              ¿Quiénes somos?
            </h3>
            <p className="text-gray-400 text-sm">
              The Truck Savers es un taller especializado en reparación y mantenimiento de camiones con más de 24 años de experiencia. Tenemos talleres en <strong className="text-gray-300">Houston, Dallas y Monterrey</strong>.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <Wrench className="w-6 h-6 text-[#5BBB6A] mx-auto mb-2" />
              <p className="text-white text-xs font-semibold">Mantenimiento Certificado</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <Shield className="w-6 h-6 text-[#5BBB6A] mx-auto mb-2" />
              <p className="text-white text-xs font-semibold">Seguridad en Carretera</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <Truck className="w-6 h-6 text-[#5BBB6A] mx-auto mb-2" />
              <p className="text-white text-xs font-semibold">+24 Años de Experiencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer mínimo */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto text-center">
          <a 
            href="https://thetrucksavers.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#5BBB6A] hover:text-white text-sm font-medium transition-colors"
          >
            thetrucksavers.com
          </a>
          <p className="text-white/40 text-xs mt-2">
            © 2026 The Truck Savers. Todos los derechos reservados.
          </p>
        </div>
      </section>
    </div>
  );
}
