import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { label: 'Inspección La Bailada', href: '/servicios/inspeccion-bailada' },
    { label: 'Suspensiones', href: '/servicios/suspensiones' },
    { label: 'Alineación', href: '/servicios/alineacion' },
    { label: 'Cambio de Aceite', href: '/servicios/cambio-aceite' },
    { label: 'Reparación de Neumáticos', href: '/servicios/neumaticos' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 cursor-pointer">
              <img 
                src="/images/home_logo.png" 
                alt="The Truck Savers" 
                className="h-10 w-auto"
              />
              <span className="font-bold text-lg text-gray-900 hidden sm:inline">
                The Truck Savers
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">
              <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                Inicio
              </a>
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                Servicios
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {services.map((service) => (
                  <Link key={service.href} href={service.href}>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 first:rounded-t-lg last:rounded-b-lg">
                      {service.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/blog">
              <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                Blog
              </a>
            </Link>

            <Link href="/contacto">
              <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                Contacto
              </a>
            </Link>
          </nav>

          {/* CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/contacto">
              <a>
                <Button 
                  className="hidden sm:inline-flex bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  Contactar
                </Button>
              </a>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
            <Link href="/">
              <a 
                className="block text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
            </Link>

            {/* Mobile Services Dropdown */}
            <div>
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full text-left text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                Servicios
              </button>
              {isServicesOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {services.map((service) => (
                    <Link key={service.href} href={service.href}>
                      <a 
                        className="block text-sm text-gray-600 hover:text-green-600 transition-colors py-1"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                      >
                        {service.label}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog">
              <a 
                className="block text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
            </Link>

            <Link href="/contacto">
              <a 
                className="block text-sm font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
            </Link>

            <Link href="/contacto">
              <a onClick={() => setIsMenuOpen(false)}>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                >
                  Contactar
                </Button>
              </a>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
