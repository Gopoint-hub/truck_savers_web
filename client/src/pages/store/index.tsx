import { Link } from 'wouter';
import { ShoppingBag, MapPin, ExternalLink, ChevronRight, Globe, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';

/**
 * Store Hub Page - SEO Architecture
 * URL: /store/
 * Hub for USA, Mexico stores and LATAM interest form
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

const products = [
  { id: 'vibrasavers', name: 'Vibrasavers', description: 'Reducen vibraciones en las ruedas' },
  { id: 'salvamorenas', name: 'Salvamorenas', description: 'Protección para llantas' },
  { id: 'llantasavers', name: 'Llanta Savers', description: 'Tapones con indicador de presión' },
  { id: 'otros', name: 'Otros', description: 'Especifica el producto que te interesa' },
];

const latamCountries = [
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'DO', name: 'República Dominicana', flag: '🇩🇴' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'PA', name: 'Panamá', flag: '🇵🇦' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'OTHER', name: 'Otro país', flag: '🌎' },
];

export default function StoreHub() {
  const [showLatamForm, setShowLatamForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    country: '',
    whatsapp: '',
    email: '',
    products: [] as string[],
    otherProduct: '',
  });

  const createLead = trpc.latamLeads.create.useMutation({
    onSuccess: () => {
      setFormSubmitted(true);
    },
  });

  const handleProductChange = (productId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      products: checked 
        ? [...prev.products, productId]
        : prev.products.filter(p => p !== productId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.products.length === 0) {
      alert('Por favor selecciona al menos un producto');
      return;
    }
    createLead.mutate(formData);
  };

  const whatsappNumber = "+528115397393";
  const whatsappMessage = encodeURIComponent(
    `Hola, soy de ${formData.country || 'Latinoamérica'} y me interesan los productos de The Truck Savers. ¿Podrían darme más información?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-cover opacity-30"
          style={{ backgroundImage: "url('/images/salvamorenas-botellas.webp')", backgroundPosition: 'center 35%' }}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* USA and Mexico stores */}
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

            {/* LATAM Option */}
            <div 
              onClick={() => setShowLatamForm(!showLatamForm)}
              className="group block cursor-pointer"
            >
              <div className={`bg-white border-2 rounded-xl p-8 hover:shadow-xl transition-all h-full ${showLatamForm ? 'border-[#368A45] shadow-xl' : 'border-gray-200 hover:border-[#368A45]'}`}>
                {/* Icon */}
                <div className="flex items-center justify-between mb-6">
                  <Globe className="w-12 h-12 text-blue-500" />
                  <ChevronRight className={`w-6 h-6 text-gray-400 group-hover:text-[#368A45] transition-all ${showLatamForm ? 'rotate-90' : ''}`} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#368A45] transition-colors">
                  Resto de Latinoamérica
                </h3>
                <p className="text-gray-500 mb-4">¿Eres de otro país?</p>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  Déjanos tus datos de contacto y qué producto te interesa para ver de qué manera podríamos atenderte en el futuro.
                </p>

                {/* Message */}
                <p className="text-sm text-blue-600 font-medium">
                  🚀 Estamos trabajando fuerte por llevar nuestros productos a más países
                </p>
              </div>
            </div>
          </div>

          {/* LATAM Form */}
          {showLatamForm && (
            <div className="max-w-2xl mx-auto mt-12">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Gracias por tu interés!</h3>
                    <p className="text-gray-600 mb-6">
                      Hemos recibido tu información. Te contactaremos pronto cuando tengamos disponibilidad en tu país.
                    </p>
                    <Button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          city: '',
                          country: '',
                          whatsapp: '',
                          email: '',
                          products: [],
                          otherProduct: '',
                        });
                      }}
                      variant="outline"
                    >
                      Enviar otra solicitud
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                      Regístrate para recibir información
                    </h3>
                    <p className="text-gray-600 text-center mb-8">
                      Completa el formulario y te contactaremos cuando podamos atenderte en tu país.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Tu nombre"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">País *</label>
                          <select
                            value={formData.country}
                            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Selecciona tu país</option>
                            {latamCountries.map((country) => (
                              <option key={country.code} value={country.name}>
                                {country.flag} {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad *</label>
                          <Input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="Tu ciudad"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp *</label>
                          <Input
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                            placeholder="+57 300 123 4567"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>

                      {/* Products Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">¿Qué productos te interesan? *</label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {products.map((product) => (
                            <div
                              key={product.id}
                              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                formData.products.includes(product.id)
                                  ? 'border-[#368A45] bg-green-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => handleProductChange(product.id, !formData.products.includes(product.id))}
                            >
                              <Checkbox
                                checked={formData.products.includes(product.id)}
                                onCheckedChange={(checked) => handleProductChange(product.id, checked as boolean)}
                                className="mt-0.5"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Other Product Specification */}
                      {formData.products.includes('otros') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Especifica qué otro producto te interesa</label>
                          <Input
                            type="text"
                            value={formData.otherProduct}
                            onChange={(e) => setFormData(prev => ({ ...prev, otherProduct: e.target.value }))}
                            placeholder="Describe el producto que buscas..."
                          />
                        </div>
                      )}

                      {/* Submit Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          type="submit"
                          className="flex-1 bg-[#368A45] hover:bg-[#2d7339]"
                          disabled={createLead.isPending}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {createLead.isPending ? 'Enviando...' : 'Enviar solicitud'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                          asChild
                        >
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contactar por WhatsApp
                          </a>
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
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
