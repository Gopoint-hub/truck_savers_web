import { useState } from 'react';
import { Link } from 'wouter';
import { Truck, Shield, Heart, CheckCircle, Loader2, Send, MessageCircle, ChevronRight, AlertTriangle, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';

const CMS_API = import.meta.env.VITE_CMS_API_URL;

/**
 * Bolsa de Jale - Job Board for Truck Operators
 * URL: /recursos/bolsa-de-jale
 * Target: Mexican truck operators (trokeros/traileros)
 * Integrated with CMS for operator database
 */

const estadosMexico = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];

const experienceOptions = [
  { value: 'menos-1', label: 'Menos de 1 año' },
  { value: '1-3', label: '1 a 3 años' },
  { value: '3-5', label: '3 a 5 años' },
  { value: '5-10', label: '5 a 10 años' },
  { value: '10-15', label: '10 a 15 años' },
  { value: '15-20', label: '15 a 20 años' },
  { value: 'mas-20', label: 'Más de 20 años' },
];

const licenseTypes = [
  { value: 'internacional-b1b2', label: 'Internacional con Visa B1/B2' },
  { value: 'federal', label: 'Licencia Federal Tipo E' },
  { value: 'federal-materiales', label: 'Licencia Federal (materiales peligrosos)' },
  { value: 'estatal', label: 'Licencia Estatal de Chofer' },
  { value: 'cdl-a', label: 'CDL Clase A (EE.UU.)' },
  { value: 'cdl-b', label: 'CDL Clase B (EE.UU.)' },
  { value: 'otra', label: 'Otra' },
  { value: 'en-tramite', label: 'En trámite' },
];

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Inicio', url: 'https://thetrucksavers.com/' },
  { name: 'Recursos', url: 'https://thetrucksavers.com/recursos' },
  { name: 'Bolsa de Jale', url: 'https://thetrucksavers.com/recursos/bolsa-de-jale' },
]);

export default function BolsaDeJale() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    email: '',
    ciudad: '',
    estado: '',
    experiencia: '',
    licencia: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación con mensajes específicos
    const camposFaltantes: string[] = [];
    if (!formData.nombre.trim()) camposFaltantes.push('Nombre completo');
    if (!formData.whatsapp.trim()) camposFaltantes.push('WhatsApp');
    if (!formData.estado) camposFaltantes.push('Estado de residencia');
    if (!formData.experiencia) camposFaltantes.push('Años de experiencia');

    if (camposFaltantes.length > 0) {
      setError(`Faltan los siguientes campos obligatorios: ${camposFaltantes.join(', ')}`);
      return;
    }

    setLoading(true);

    // Construir mensaje de WhatsApp con los datos del operador
    const expLabel = experienceOptions.find(o => o.value === formData.experiencia)?.label || formData.experiencia;
    const licLabel = formData.licencia ? (licenseTypes.find(o => o.value === formData.licencia)?.label || formData.licencia) : 'No especificada';
    const autoWhatsappMsg = [
      `*Nuevo registro - Bolsa de Jale (Operador)*`,
      `*Nombre:* ${formData.nombre.trim()}`,
      `*WhatsApp:* ${formData.whatsapp.trim()}`,
      formData.email.trim() ? `*Email:* ${formData.email.trim()}` : null,
      formData.ciudad.trim() ? `*Ciudad:* ${formData.ciudad.trim()}` : null,
      `*Estado:* ${formData.estado}`,
      `*Experiencia:* ${expLabel}`,
      `*Licencia:* ${licLabel}`,
      formData.mensaje.trim() ? `*Mensaje:* ${formData.mensaje.trim()}` : null,
    ].filter(Boolean).join('\n');

    try {
      const response = await fetch(`${CMS_API}/public/bolsa-de-jale`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nombre.trim(),
          whatsapp: formData.whatsapp.trim(),
          email: formData.email.trim() || null,
          city: formData.ciudad.trim() || null,
          state: formData.estado,
          experience: formData.experiencia,
          licenseType: formData.licencia || null,
          message: formData.mensaje.trim() || null,
          source: 'bolsa-de-jale',
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        toast.success('¡Registro exitoso! Te contactaremos pronto.');
        // Abrir WhatsApp automáticamente con los datos del operador
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(autoWhatsappMsg)}`, '_blank');
      } else {
        setError(result.error || 'Ocurrió un error al registrarte. Intenta de nuevo.');
        toast.error(result.error || 'Error al registrarte');
      }
    } catch (err) {
      // Si falla el CMS, igual enviamos por WhatsApp para no perder el lead
      setSubmitted(true);
      toast.info('Enviando tus datos por WhatsApp...');
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(autoWhatsappMsg)}`, '_blank');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.nombre.trim() !== '' && formData.whatsapp.trim() !== '' && formData.estado !== '' && formData.experiencia !== '';

  const whatsappNumber = "528342995255";
  const whatsappMessage = encodeURIComponent("Licenciada, me interesa el jale en una compa\u00f1\u00eda que s\u00ed le meta mantenimiento al mamal\u00f3n");

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Bolsa de Jale - Oportunidades para Operadores de Camión"
        description="¿Eres operador de camión, trailero o trokero? Regístrate en nuestra Bolsa de Jale. Conectamos operadores con empresas que sí cuidan sus unidades y valoran tu seguridad."
        keywords="bolsa de trabajo operadores camión, empleo traileros México, trabajo trokeros, operador quinta rueda empleo, jale camiones, empleo transporte México"
        canonical="/recursos/bolsa-de-jale"
        structuredData={breadcrumbSchema}
      />

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-cover opacity-20"
          style={{ backgroundImage: "url('/images/thetrucksavers-banner-3.webp')", backgroundPosition: 'center 35%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/95" />
        <div className="container relative z-10">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/recursos" className="hover:text-white">Recursos</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Bolsa de Jale</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-[#D8993D] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 tracking-wide">
              Héroes de la Carretera
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bolsa de Jale
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
              Mereces trabajar en una empresa que <strong className="text-white">sí le da mantenimiento a sus unidades</strong>. 
              Tu seguridad y la de tu familia no son negociables.
            </p>
            <p className="text-lg text-gray-400">
              Regístrate y te conectamos con empresas que valoran a sus operadores.
            </p>
          </div>
        </div>
      </section>

      {/* Two Options: Operators & Mechanics */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#D8993D]/10 border-2 border-[#D8993D] rounded-xl p-5 text-center">
                <div className="w-12 h-12 bg-[#D8993D]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-[#D8993D]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Héroes de la Carretera</h3>
                <p className="text-sm text-gray-600 mb-3">Operadores de camión buscando jale con empresas que sí cuidan sus unidades</p>
                <span className="inline-block bg-[#D8993D] text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Estás aquí
                </span>
              </div>
              <Link href="/recursos/trabaja-con-nosotros">
                <div className="bg-gray-50 border-2 border-gray-200 hover:border-[#368A45] rounded-xl p-5 text-center cursor-pointer transition-all hover:shadow-md group">
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-[#368A45]/10 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                    <Briefcase className="w-6 h-6 text-gray-500 group-hover:text-[#368A45] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Mecánicos</h3>
                  <p className="text-sm text-gray-600 mb-3">Quiero trabajar en The Truck Savers como mecánico</p>
                  <span className="inline-block bg-[#368A45] text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Ver vacantes →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement - Emotional Connection */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sabemos lo que vives en la carretera
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                No deberías tener que elegir entre tu sustento y tu seguridad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Unidades descuidadas
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Frenos gastados, llantas lisas, suspensión dañada. Muchos patrones ignoran el mantenimiento 
                  y tú eres quien pone el pecho en la carretera.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Inseguridad constante
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No solo el crimen organizado. La negligencia de los jefes de mantenimiento 
                  es un riesgo igual o mayor para tu vida diaria.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Mereces algo mejor
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Existen empresas que sí invierten en el mantenimiento de sus unidades 
                  y valoran la experiencia y bienestar de sus operadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Qué es la Bolsa de Jale?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#368A45]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-5 h-5 text-[#368A45]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Base de datos de operadores</h3>
                  <p className="text-gray-600 text-sm">
                    Creamos un directorio de operadores calificados para conectarlos con empresas de transporte 
                    que buscan talento y que mantienen sus unidades en condiciones óptimas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#368A45]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Briefcase className="w-5 h-5 text-[#368A45]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Oportunidades reales</h3>
                  <p className="text-gray-600 text-sm">
                    No es una bolsa de trabajo genérica. Nos enfocamos en la industria del transporte 
                    de carga y conectamos operadores con empresas que conocemos y que sí cuidan sus unidades.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#368A45]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-[#368A45]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Seguridad primero</h3>
                  <p className="text-gray-600 text-sm">
                    Con 24 años en la industria, sabemos qué empresas invierten en mantenimiento preventivo 
                    y cuáles no. Tu seguridad es nuestra prioridad.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#368A45]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Truck className="w-5 h-5 text-[#368A45]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Ofertas exclusivas para ti</h3>
                  <p className="text-gray-600 text-sm">
                    Al registrarte, también recibirás información sobre productos, servicios y promociones 
                    especiales diseñadas para operadores de camión.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-gray-50" id="registro">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Regístrate Ahora
              </h2>
              <p className="text-lg text-gray-600">
                Déjanos tus datos y te contactaremos con oportunidades de jale
              </p>
            </div>

            {submitted ? (
              <div className="bg-white rounded-2xl border-2 border-[#368A45] p-8 md:p-12 text-center shadow-lg">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¡Registro Exitoso, Compa!
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Ya estás en nuestra base de datos. Te contactaremos por WhatsApp cuando tengamos 
                  oportunidades de jale que se ajusten a tu perfil. Mientras tanto, síguenos en redes 
                  para más contenido para operadores.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#368A45] hover:bg-[#2D6E39] text-white w-full sm:w-auto">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Escríbenos por WhatsApp
                    </Button>
                  </a>
                  <Link href="/recursos">
                    <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white w-full sm:w-auto">
                      Ver más Recursos
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      placeholder="Ej: Juan Pérez López"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* WhatsApp y Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) => handleChange('whatsapp', e.target.value)}
                        placeholder="Ej: 81 1234 5678"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Correo electrónico <span className="text-gray-400">(opcional)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Ej: juan@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Ciudad y Estado */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ciudad" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Ciudad <span className="text-gray-400">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        id="ciudad"
                        value={formData.ciudad}
                        onChange={(e) => handleChange('ciudad', e.target.value)}
                        placeholder="Ej: Monterrey"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="estado" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Estado de residencia <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="estado"
                        value={formData.estado}
                        onChange={(e) => handleChange('estado', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all bg-white appearance-none"
                        disabled={loading}
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                      >
                        <option value="">Selecciona tu estado</option>
                        <optgroup label="Estados de México">
                          {estadosMexico.map((estado) => (
                            <option key={estado} value={estado}>{estado}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Otro">
                          <option value="Estados Unidos">Estados Unidos</option>
                          <option value="Otro país">Otro país</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Experiencia y Licencia */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="experiencia" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Años de experiencia <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="experiencia"
                        value={formData.experiencia}
                        onChange={(e) => handleChange('experiencia', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all bg-white appearance-none"
                        disabled={loading}
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                      >
                        <option value="">Selecciona</option>
                        {experienceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="licencia" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Tipo de licencia <span className="text-gray-400">(opcional)</span>
                      </label>
                      <select
                        id="licencia"
                        value={formData.licencia}
                        onChange={(e) => handleChange('licencia', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all bg-white appearance-none"
                        disabled={loading}
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                      >
                        <option value="">Selecciona (opcional)</option>
                        {licenseTypes.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Cuéntanos sobre ti <span className="text-gray-400">(opcional)</span>
                    </label>
                    <textarea
                      id="mensaje"
                      value={formData.mensaje}
                      onChange={(e) => handleChange('mensaje', e.target.value)}
                      placeholder="¿Qué tipo de jale buscas? ¿Qué tipo de unidades manejas? ¿Algo que quieras que sepamos?"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all resize-none"
                      disabled={loading}
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`w-full py-6 text-lg font-semibold ${
                      isFormValid && !loading
                        ? 'bg-[#368A45] hover:bg-[#2D6E39] text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Registrando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Registrarme en la Bolsa de Jale
                      </>
                    )}
                  </Button>

                  {!isFormValid && (
                    <p className="text-sm text-gray-500 text-center">
                      Los campos marcados con <span className="text-red-500">*</span> son obligatorios
                    </p>
                  )}

                  <p className="text-xs text-gray-400 text-center leading-relaxed">
                    Al registrarte, aceptas que The Truck Savers almacene tus datos para contactarte 
                    con oportunidades laborales y enviarte información relevante sobre productos y servicios 
                    para operadores de camión.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp Alternative */}
      <section className="py-12 bg-white border-t">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ¿Prefieres registrarte por WhatsApp?
            </h3>
            <p className="text-gray-600 mb-6">
              Si no quieres llenar el formulario, mándanos un mensaje directo y te registramos
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-[#368A45] hover:bg-[#2D6E39] text-white">
                <MessageCircle className="w-5 h-5 mr-2" />
                Registrarme por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial / Quote Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6 text-[#D8993D]">"</div>
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 italic">
              Un operador con una unidad bien mantenida no solo es más seguro en la carretera, 
              es más productivo, más eficiente y más feliz. Las empresas que entienden esto 
              son las que van a liderar el transporte en México.
            </blockquote>
            <p className="text-gray-400">
              — The Truck Savers, 24 años reparando la industria del transporte
            </p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button - Mobile */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
          Escríbenos por WhatsApp
        </span>
      </a>

      {/* Back to Resources */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600">
              ¿Eres mecánico? También tenemos oportunidades para ti
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/recursos/trabaja-con-nosotros">
                <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                  Mecánicos <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/recursos/blog">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:border-[#368A45] hover:text-[#368A45]">
                  Blog <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/recursos">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:border-[#368A45] hover:text-[#368A45]">
                  ← Volver a Recursos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
