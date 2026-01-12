import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNavClick?: (section: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', href: '#home' },
    { label: 'Servicios', href: '#services' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/images/home_logo.png" 
              alt="The Truck Savers" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-lg text-foreground hidden sm:inline">
              The Truck Savers
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button 
              className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground"
              size="sm"
            >
              Contactar
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
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
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Contactar
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
