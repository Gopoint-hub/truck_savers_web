import { useState } from 'react';
import { Link } from 'wouter';
import { GraduationCap, Monitor, Users, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CMS_API = import.meta.env.VITE_CMS_API_URL;

/**
 * Cursos Page - Página intermedia para cursos
 * URL: /recursos/cursos
 */

export default function Cursos() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!nombre.trim() || !email.trim() || !phone.trim() || !ciudad.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${CMS_API}/course-waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombre.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: ciudad.trim(),
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        toast.success('¡Te has registrado exitosamente!');
      } else {
        setError(result.error || 'Ocurrió un error al registrarte. Intenta de nuevo.');
        toast.error(result.error || 'Error al registrarte');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.');
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = nombre.trim() !== '' && email.trim() !== '' && phone.trim() !== '' && ciudad.trim() !== '';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-20">
        <div 
          className="absolute inset-0 bg-cover opacity-30"
          style={{ backgroundImage: "url('/images/fondo-preefooter-webp.webp')", backgroundPosition: 'center 35%' }}
        />
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="container relative z-10">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/recursos" className="hover:text-white">Recursos</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Cursos</span>
          </nav>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#368A45] rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Cursos The Truck Savers
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl">
            Aprende la normativa del DOT, a realizar inspecciones, a alinear y diagnosticar el problema de desgaste irregular de llantas con nuestros cursos especializados.
          </p>
        </div>
      </section>

      {/* Options Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Cursos en Línea */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#368A45] transition-all overflow-hidden shadow-lg hover:shadow-xl">
              <div className="bg-gradient-to-r from-[#368A45] to-[#2D6E39] p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Cursos en Línea
                </h2>
                <p className="text-white/90">
                  Accede a nuestros cursos disponibles ahora
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Normativa del DOT</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Inspecciones de camiones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Alineación y diagnóstico de llantas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Desgaste irregular de llantas</span>
                  </li>
                </ul>
                <a 
                  href="https://cursos.thetrucksavers.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white py-6 text-lg">
                    Ir a Cursos en Línea
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Lista de Espera - Cursos Presenciales */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#368A45] transition-all overflow-hidden shadow-lg hover:shadow-xl">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Cursos Presenciales
                </h2>
                <p className="text-white/90">
                  Regístrate en la lista de espera
                </p>
              </div>
              <div className="p-6">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      ¡Registro Exitoso!
                    </h3>
                    <p className="text-gray-600">
                      Te hemos agregado a nuestra lista de espera. Te contactaremos cuando tengamos cursos presenciales disponibles en tu área.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-6">
                      ¿Prefieres aprender en persona? Regístrate en nuestra lista de espera para ser notificado cuando tengamos cursos presenciales disponibles en tu ciudad.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                          Tu nombre *
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          placeholder="Ej: Juan Pérez"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Ej: juan@email.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Número de WhatsApp *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ej: +1 713 455 5572"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                          Ciudad donde te encuentras *
                        </label>
                        <input
                          type="text"
                          id="ciudad"
                          value={ciudad}
                          onChange={(e) => setCiudad(e.target.value)}
                          placeholder="Ej: Houston, TX"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#368A45] focus:border-[#368A45] outline-none transition-all"
                          disabled={loading}
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                          {error}
                        </div>
                      )}

                      <Button 
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`w-full py-6 text-lg ${
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
                          'Registrarme en Lista de Espera'
                        )}
                      </Button>
                    </form>
                    
                    {!isFormValid && (
                      <p className="text-sm text-gray-500 text-center">
                        Completa todos los campos para continuar
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Por qué capacitarte con The Truck Savers?
            </h3>
            <p className="text-gray-600 mb-8">
              Con más de 24 años de experiencia en la industria del transporte, nuestros cursos están diseñados para brindarte conocimientos prácticos y actualizados que te ayudarán a mantener tu camión en óptimas condiciones y cumplir con las regulaciones del DOT.
            </p>
            <Link href="/recursos">
              <Button variant="outline" className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white">
                ← Volver a Recursos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
