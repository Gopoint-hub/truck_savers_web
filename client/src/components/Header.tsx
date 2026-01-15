import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Header Component - SEO Local Architecture
 * - No global contact link (contact is per city)
 * - Locations dropdown for city selection
 * - Resources link for blog/podcasts
 * - Fixed dropdown behavior for Safari compatibility
 */

const cities = [
  { slug: 'houston', name: 'Houston, TX' },
  { slug: 'dallas', name: 'Dallas, TX' },
  { slug: 'monterrey', name: 'Monterrey, N.L.' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect current city from URL
  const currentCity = cities.find(city => location.startsWith(`/${city.slug}`));

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsLocationsOpen(false);
    setIsMenuOpen(false);
  }, [location]);

  const handleLocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLocationsOpen(!isLocationsOpen);
  };

  const handleCityClick = () => {
    setIsLocationsOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                src="/images/home_logo.png" 
                alt="The Truck Savers" 
                className="h-10 md:h-12"
                onError={(e) => {
                  // Fallback si la imagen no carga
                  (e.target as HTMLImageElement).src = '/images/thetrucksavers-icons-1.webp';
                }}
              />
              <span className="font-bold text-gray-900 text-lg hidden sm:block">
                The Truck Savers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/">
              <span className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                location === '/' ? 'text-[#368A45] bg-[#368A45]/10' : 'text-gray-700 hover:text-[#368A45] hover:bg-gray-50'
              }`}>
                Inicio
              </span>
            </Link>

            {/* Locations Dropdown - Click based for Safari compatibility */}
            <div 
              className="relative"
              ref={dropdownRef}
            >
              <button 
                onClick={handleLocationClick}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentCity ? 'text-[#368A45] bg-[#368A45]/10' : 'text-gray-700 hover:text-[#368A45] hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Ubicaciones
                <ChevronDown className={`w-4 h-4 transition-transform ${isLocationsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLocationsOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {cities.map((city) => (
                    <Link key={city.slug} href={`/${city.slug}`}>
                      <div 
                        onClick={handleCityClick}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          location.startsWith(`/${city.slug}`) ? 'bg-[#368A45]/5 text-[#368A45]' : 'text-gray-700'
                        }`}
                      >
                        <span className="font-medium">{city.name}</span>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                    <Link href="/">
                      <span 
                        onClick={handleCityClick}
                        className="text-sm text-[#368A45] hover:underline cursor-pointer"
                      >
                        Ver todas las ubicaciones →
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/resources">
              <span className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                location.startsWith('/resources') ? 'text-[#368A45] bg-[#368A45]/10' : 'text-gray-700 hover:text-[#368A45] hover:bg-gray-50'
              }`}>
                Recursos
              </span>
            </Link>

            <Link href="/store">
              <span className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                location.startsWith('/store') ? 'text-[#368A45] bg-[#368A45]/10' : 'text-gray-700 hover:text-[#368A45] hover:bg-gray-50'
              }`}>
                Tienda
              </span>
            </Link>
          </nav>

          {/* CTA Button - Shows current city contact or Houston */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href={currentCity ? `/${currentCity.slug}/contact` : '/houston/contact'}>
              <Button className="bg-[#368A45] hover:bg-[#2D6E39] text-white">
                {currentCity ? `Contactar ${currentCity.name.split(',')[0]}` : 'Contactar'}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-1">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <span className={`block px-4 py-3 rounded-lg font-medium ${
                  location === '/' ? 'text-[#368A45] bg-[#368A45]/10' : 'text-gray-700'
                }`}>
                  Inicio
                </span>
              </Link>

              {/* Mobile Locations */}
              <div className="px-4 py-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Ubicaciones
                </p>
                {cities.map((city) => (
                  <Link key={city.slug} href={`/${city.slug}`} onClick={() => setIsMenuOpen(false)}>
                    <span className={`block px-4 py-2 rounded-lg ${
                      location.startsWith(`/${city.slug}`) ? 'text-[#368A45] bg-[#368A45]/10' : 'text-gray-700'
                    }`}>
                      {city.name}
                    </span>
                  </Link>
                ))}
              </div>

              <Link href="/resources" onClick={() => setIsMenuOpen(false)}>
                <span className={`block px-4 py-3 rounded-lg font-medium ${
                  location.startsWith('/resources') ? 'text-[#368A45] bg-[#368A45]/10' : 'text-gray-700'
                }`}>
                  Recursos
                </span>
              </Link>

              <Link href="/store" onClick={() => setIsMenuOpen(false)}>
                <span className={`block px-4 py-3 rounded-lg font-medium ${
                  location.startsWith('/store') ? 'text-[#368A45] bg-[#368A45]/10' : 'text-gray-700'
                }`}>
                  Tienda
                </span>
              </Link>

              {/* Mobile Contact CTA */}
              <div className="px-4 pt-4 mt-2 border-t border-gray-200">
                <Link href={currentCity ? `/${currentCity.slug}/contact` : '/houston/contact'} onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white">
                    {currentCity ? `Contactar ${currentCity.name.split(',')[0]}` : 'Contactar Houston'}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
