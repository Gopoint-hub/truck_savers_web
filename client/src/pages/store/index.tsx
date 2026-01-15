import { Link } from 'wouter';
import { ShoppingBag, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Store Hub Page - SEO Architecture
 * URL: /store/
 * Hub for USA and Mexico stores
 */

const stores = [
  {
    slug: 'usa',
    name: 'Tienda USA',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    description: 'Productos y accesorios para camiones disponibles en Estados Unidos. Envíos a Houston, Dallas y todo el país.',
    url: 'https://store.thetrucksavers.com',
    features: ['Envío a todo USA', 'Productos originales', 'Garantía incluida'],
  },
  {
    slug: 'mexico',
    name: 'Tienda México',
    country: 'México',
    flag: '🇲🇽',
    description: 'Productos y accesorios para camiones disponibles en México. Envíos a Monterrey y todo el país.',
    url: 'https://tiendamx.thetrucksavers.com',
    features: ['Envío a todo México', 'Productos originales', 'Garantía incluida'],
  },
];

export default function StoreHub() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/salvamorenas-botellas.webp')" }}
        />
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-[#368A45]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-[#368A45]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tienda The Truck Savers
            </h1>
            <p className="text-xl text-gray-300">
              Encuentra productos y accesorios de calidad para tu camión. 
              Selecciona tu país para ver los productos disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* Store Selector */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Selecciona tu País
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elige la tienda correspondiente a tu ubicación para ver productos y precios en tu moneda local.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {stores.map((store) => (
              <a
                key={store.slug}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-[#368A45] hover:shadow-xl transition-all h-full">
                  {/* Flag & Country */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl">{store.flag}</span>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#368A45] group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Store Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#368A45] transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-gray-500 mb-4">{store.country}</p>

                  {/* Description */}
                  <p className="text-gray-600 mb-6">
                    {store.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {store.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[#368A45] rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#368A45] font-semibold group-hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    Ir a la tienda
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Por qué comprar en The Truck Savers?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6 text-[#368A45]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Productos Originales</h3>
                <p className="text-gray-600 text-sm">
                  Solo vendemos productos de marcas reconocidas con garantía de fábrica.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[#368A45]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Envío a Todo el País</h3>
                <p className="text-gray-600 text-sm">
                  Realizamos envíos a cualquier parte de USA y México con seguimiento.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#368A45]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Compra Segura</h3>
                <p className="text-gray-600 text-sm">
                  Pagos seguros con tarjeta de crédito, débito o transferencia bancaria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-8 bg-white border-t">
        <div className="container">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-[#368A45]">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Tienda</span>
          </nav>
        </div>
      </section>
    </div>
  );
}
