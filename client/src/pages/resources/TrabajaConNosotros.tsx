import { useState } from 'react';
import { Link } from 'wouter';
import { Wrench, Shield, Heart, CheckCircle, Loader2, Send, MessageCircle, ChevronRight, Star, Users, Briefcase, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';

const CMS_API = import.meta.env.VITE_CMS_API_URL;

/**
 * Trabaja Con Nosotros - Mechanic Job Application
 * URL: /recursos/trabaja-con-nosotros
 * Target: Mechanics who want to work at The Truck Savers
 * Integrated with CMS for applicant database
 */

const experienceOptions = [
  { value: 'menos-1', label: 'Menos de 1 año' },
  { value: '1-3', label: '1 a 3 años' },
  { value: '3-5', label: '3 a 5 años' },
  { value: '5-10', label: '5 a 10 años' },
  { value: '10-15', label: '10 a 15 años' },
  { value: '15-20', label: '15 a 20 años' },
  { value: 'mas-20', label: 'Más de 20 años' },
];

const ubicaciones = [
  { value: 'houston', label: 'Houston, TX' },
  { value: 'dallas', label: 'Dallas, TX' },
  { value: 'monterrey', label: 'Monterrey, N.L.' },
  { value: 'cualquiera', label: 'Cualquier ubicación' },
];

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Inicio', url: 'https://thetrucksavers.com/' },
  { name: 'Recursos', url: 'https://thetrucksavers.com/recursos' },
  { name: 'Bolsa de Jale', url: 'https://thetrucksavers.com/recursos/bolsa-de-jale' },
  { name: 'Trabaja con Nosotros', url: 'https://thetrucksavers.com/recursos/trabaja-con-nosotros' },
]);

export default function TrabajaConNosotros() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    email: '',
    ubicacion: '',
    experiencia: '',
    porQueQuieres: '',
    porQueDeberias: '',
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

    const camposFaltantes: string[] = [];
    if (!formData.nombre.trim()) camposFaltantes.push('Nombre completo');
    if (!formData.whatsapp.trim()) camposFaltantes.push('WhatsApp');
    if (!formData.ubicacion) camposFaltantes.push('Ubicación donde quieres trabajar');
    if (!formData.experiencia) camposFaltantes.push('Años de experiencia');
    if (!formData.porQueQuieres.trim()) camposFaltantes.push('¿Por qué quieres trabajar con nosotros?');
    if (!formData.porQueDeberias.trim()) camposFaltantes.push('¿Por qué deberías trabajar con nosotros?');

    if (camposFaltantes.length > 0) {
      setError(`Faltan los siguientes campos obligatorios: ${camposFaltantes.join(', ')}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${CMS_API}/mechanics/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nombre.trim(),
          whatsapp: formData.whatsapp.trim(),
          email: formData.email.trim() || null,
          preferredLocation: formData.ubicacion,
          experience: formData.experiencia,
          whyWantToWork: formData.porQueQuieres.trim(),
          whyShouldWeHire: formData.porQueDeberias.trim(),
          source: 'trabaja-con-nosotros',
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        toast.success('¡Solicitud enviada! Te contactaremos pronto.');
      } else {
        setError(result.error || 'Ocurrió un error al enviar tu solicitud. Intenta de nuevo.');
        toast.error(result.error || 'Error al enviar solicitud');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.');
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.nombre.trim() !== '' && formData.whatsapp.trim() !== '' && formData.ubicacion !== '' && formData.experiencia !== '' && formData.porQueQuieres.trim() !== '' && formData.porQueDeberias.trim() !== '';

  const whatsappNumber = "528342995255";
  const whatsappName = formData.nombre.trim() || '[tu nombre]';
  const whatsappMessage = encodeURIComponent(`Licenciada, mi nombre es ${whatsappName} y quiero trabajar en Truck Savers!`);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Trabaja con Nosotros - Mecánicos | The Truck Savers"
        description="¿Eres mecánico de camiones y quieres trabajar en The Truck Savers? Únete a nuestro equipo en Houston, Dallas o Monterrey. Buscamos talento apasionado por el mantenimiento de camiones."
        keywords="empleo mecánico camiones, trabajo taller camiones, mecánico diesel empleo, The Truck Savers empleo, vacantes mecánico Houston, vacantes mecánico Monterrey"
        canonical="/recursos/trabaja-con-nosotros"
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
            <Link href="/recursos/bolsa-de-jale" className="hover:text-white">Bolsa de Jale</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Trabaja con Nosotros</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-[#368A45] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 tracking-wide">
              Para Mecánicos
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Quiero Trabajar con Ustedes
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
              En The Truck Savers buscamos <strong className="text-white">mecánicos apasionados</strong> que quieran 
              ser parte de un equipo que hace la diferencia en la industria del transporte.
            </p>
            <p className="text-lg text-gray-400">
              Si te apasiona la mecánica de camiones, este es tu lugar.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué trabajar en The Truck Savers?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                No somos un taller cualquiera. Somos una familia de profesionales con 24 años de experiencia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Herramienta de primera
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Trabajamos con equipo y herramienta de calidad. Aquí no improvisas, 
                  aquí trabajas con lo que necesitas para hacer bien tu jale.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Equipo profesional
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Trabajarás con mecánicos experimentados de los que puedes aprender y crecer. 
                  Aquí valoramos el conocimiento y la experiencia.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Crecimiento real
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Estamos creciendo en Houston, Dallas y Monterrey. 
                  Hay oportunidades reales de crecimiento para quien demuestre compromiso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nuestras Ubicaciones
              </h2>
              <p className="text-lg text-gray-600">
                Tenemos talleres en tres ciudades y seguimos creciendo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="w-6 h-6 text-[#368A45]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Houston, TX</h3>
                <p className="text-sm text-gray-500">Estados Unidos</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="w-6 h-6 text-[#368A45]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Dallas, TX</h3>
                <p className="text-sm text-gray-500">Estados Unidos</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 bg-[#368A45]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="w-6 h-6 text-[#368A45]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Monterrey, N.L.</h3>
                <p className="text-sm text-gray-500">México</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#368A45]" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ¡Solicitud Recibida!
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  Gracias por tu interés en trabajar con nosotros.
                </p>
                <p className="text-gray-500 mb-8">
                  Revisaremos tu solicitud y te contactaremos por WhatsApp pronto.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Licenciada, mi nombre es ${formData.nombre.trim()} y quiero trabajar en Truck Savers!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#1DA851] text-white">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Escribir por WhatsApp
                    </Button>
                  </a>
                  <Link href="/recursos/bolsa-de-jale">
                    <Button size="lg" variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                      ← Volver a Bolsa de Jale
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Envía tu Solicitud
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Cuéntanos sobre ti y por qué quieres ser parte del equipo
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
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
                      placeholder="Ej: Carlos Hernández López"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* WhatsApp */}
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

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Correo electrónico <span className="text-gray-400">(opcional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Ej: carlos@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* Ubicación preferida */}
                  <div>
                    <label htmlFor="ubicacion" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      ¿En cuál ubicación quieres trabajar? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="ubicacion"
                      value={formData.ubicacion}
                      onChange={(e) => handleChange('ubicacion', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all bg-white"
                      disabled={loading}
                    >
                      <option value="">Selecciona una ubicación</option>
                      {ubicaciones.map((ub) => (
                        <option key={ub.value} value={ub.value}>{ub.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Experiencia */}
                  <div>
                    <label htmlFor="experiencia" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Años de experiencia como mecánico <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="experiencia"
                      value={formData.experiencia}
                      onChange={(e) => handleChange('experiencia', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all bg-white"
                      disabled={loading}
                    >
                      <option value="">Selecciona</option>
                      {experienceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* ¿Por qué quieres trabajar con nosotros? */}
                  <div>
                    <label htmlFor="porQueQuieres" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      ¿Por qué quieres trabajar con nosotros? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="porQueQuieres"
                      value={formData.porQueQuieres}
                      onChange={(e) => handleChange('porQueQuieres', e.target.value)}
                      placeholder="Cuéntanos qué te motiva a querer ser parte de The Truck Savers..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all resize-none"
                      disabled={loading}
                    />
                  </div>

                  {/* ¿Por qué deberías trabajar con nosotros? */}
                  <div>
                    <label htmlFor="porQueDeberias" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      ¿Por qué deberías trabajar con nosotros? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="porQueDeberias"
                      value={formData.porQueDeberias}
                      onChange={(e) => handleChange('porQueDeberias', e.target.value)}
                      placeholder="¿Qué habilidades, experiencia o actitud te hacen un buen candidato para nuestro equipo?"
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
                        Enviando solicitud...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar mi Solicitud
                      </>
                    )}
                  </Button>

                  {!isFormValid && (
                    <p className="text-sm text-gray-500 text-center">
                      Los campos marcados con <span className="text-red-500">*</span> son obligatorios
                    </p>
                  )}

                  <p className="text-xs text-gray-400 text-center leading-relaxed">
                    Al enviar tu solicitud, aceptas que The Truck Savers almacene tus datos para 
                    evaluar tu candidatura y contactarte sobre oportunidades de empleo.
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
              ¿Prefieres escribirnos directo?
            </h3>
            <p className="text-gray-600 mb-6">
              Mándanos un WhatsApp y platícanos sobre ti
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-[#368A45] hover:bg-[#2D6E39] text-white">
                <MessageCircle className="w-5 h-5 mr-2" />
                Escribir por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6 text-[#368A45]">"</div>
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 italic">
              Un buen mecánico no solo repara camiones, salva vidas. Cada tornillo bien apretado, 
              cada freno bien ajustado, es un operador que llega seguro a casa con su familia.
            </blockquote>
            <p className="text-gray-400">
              — The Truck Savers, 24 años reparando la industria del transporte
            </p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
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
              ¿Eres operador de camión? También tenemos oportunidades para ti
            </p>
            <div className="flex gap-4">
              <Link href="/recursos/bolsa-de-jale">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:border-[#D8993D] hover:text-[#D8993D]">
                  Héroes de la Carretera <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/recursos">
                <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
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
