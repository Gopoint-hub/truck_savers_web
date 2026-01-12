import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">The Truck Savers</h3>
            <p className="text-white/80 text-sm mb-4">
              Taller mecánico especializado en camiones diésel con 21 años de experiencia en Houston.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-primary transition-colors">Inspección Gratis</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Alineación</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Suspensión</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cambio de Aceite</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Videos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tienda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ubicaciones</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="tel:+17134555566" className="hover:text-primary transition-colors">
                  📞 713-455-5566
                </a>
              </li>
              <li>
                <a href="mailto:info@thetrucksavers.com" className="hover:text-primary transition-colors">
                  ✉️ info@thetrucksavers.com
                </a>
              </li>
              <li className="text-white/80">
                📍 1362 Sheffield Blvd<br />
                Houston, TX 77020
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>© 2026 The Truck Savers. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
              <a href="#" className="hover:text-primary transition-colors">Términos</a>
              <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-6 text-primary font-semibold">
            #LOSFIERROSNUNCAMIENTEN
          </div>
        </div>
      </div>
    </footer>
  );
}
