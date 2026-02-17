import { useState } from 'react';
import { Link } from 'wouter';
import { GraduationCap, Monitor, Users, ChevronRight, CheckCircle, Loader2, Shield, AlertTriangle, Award, BookOpen, Clock, DollarSign, Globe, FileCheck, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';

const CMS_API = import.meta.env.VITE_CMS_API_URL;

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Inicio', url: 'https://thetrucksavers.com/' },
  { name: 'Recursos', url: 'https://thetrucksavers.com/recursos' },
  { name: 'Cursos', url: 'https://thetrucksavers.com/recursos/cursos' },
]);

/**
 * Cursos Page - Página de cursos con detalle del curso DOT
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
      <SEO
        title="Cursos de Inspección DOT y Mecánica de Camiones | The Truck Savers"
        description="Aprende la normativa del DOT, inspecciones CVSA, alineación y diagnóstico de llantas. Cursos en línea con certificado. 24 años de experiencia en la industria del transporte."
        canonical="https://thetrucksavers.com/recursos/cursos"
        structuredData={breadcrumbSchema}
      />

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

      {/* Curso DOT Destacado */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#368A45]/10 text-[#368A45] font-semibold px-4 py-2 rounded-full text-sm mb-4">
              CURSO DISPONIBLE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Inspección DOT
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              La <strong>Commercial Vehicle Safety Alliance (CVSA)</strong> establece los lineamientos para la Inspección de Nivel I del DOT, también conocida como "Inspección Norteamericana en carretera", aplicada en <strong>Estados Unidos, Canadá y México</strong>.
            </p>
          </div>

          {/* Tarjeta principal del curso */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Info del curso */}
              <div className="lg:col-span-3 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-[#368A45]" />
                  <span className="text-sm font-semibold text-[#368A45] uppercase tracking-wide">Curso en Línea</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¿Qué aprenderás?
                </h3>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Reconocer los <strong>niveles de inspección</strong> establecidos por la CVSA</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Identificar los <strong>componentes críticos de seguridad</strong> de un vehículo de carga y pasaje</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Aplicar correctamente los criterios de <strong>fuera de servicio (OOS)</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Preparar tanto al <strong>vehículo</strong> como al <strong>conductor</strong> para una inspección DOT</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Comprender la importancia del <strong>cumplimiento normativo</strong> para reducir riesgos, sanciones y accidentes</span>
                  </li>
                </ul>

                <p className="text-gray-600 text-sm leading-relaxed">
                  La inspección DOT no solo es un requisito legal: es una herramienta clave para <strong>prevenir fallas mecánicas, mejorar la seguridad vial y proteger vidas</strong>. Al finalizar este curso, tendrás las bases para realizar o supervisar inspecciones de manera más eficaz.
                </p>
              </div>

              {/* Sidebar de precio y CTA */}
              <div className="lg:col-span-2 bg-gray-900 text-white p-8 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className="text-gray-400 line-through text-lg">$332.00 USD</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-bold text-white">$199</span>
                      <span className="text-gray-400">.00 USD</span>
                    </div>
                    <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mt-2">
                      40% DESCUENTO
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-[#368A45]" />
                      <span className="text-gray-300 text-sm">100% en línea</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#368A45]" />
                      <span className="text-gray-300 text-sm">1 hora de contenido</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[#368A45]" />
                      <span className="text-gray-300 text-sm">Acceso de por vida</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-[#368A45]" />
                      <span className="text-gray-300 text-sm">Certificado digital incluido</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-[#368A45]" />
                      <span className="text-gray-300 text-sm">Materiales descargables</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-[#368A45]" />
                      <span className="text-gray-300 text-sm">Actualizaciones sin costo</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href="https://cursos.thetrucksavers.com/basico/inspeccion-dot/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white py-6 text-lg font-bold">
                      Inscribirme al Curso
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                  <p className="text-center text-gray-500 text-xs">
                    Tarjetas, Google Pay, Apple Pay y PayPal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan de Estudios */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Plan de Estudios
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Contenido diseñado con base en las mejores prácticas de la industria y los lineamientos de la CVSA y el DOT
            </p>

            <div className="space-y-4">
              {/* Módulo 1 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#368A45] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Introducción a la Inspección DOT</h3>
                    <p className="text-gray-600">
                      Conocer a detalle los niveles de inspección establecidos por la CVSA y su aplicación en carretera. Explicación de los lineamientos internacionales y criterios de fuera de servicio (OOS).
                    </p>
                  </div>
                </div>
              </div>

              {/* Módulo 2 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#368A45] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Procedimiento de Inspección</h3>
                    <p className="text-gray-600">
                      Preparar tanto al vehículo como al conductor para una inspección DOT. Acceso a procedimientos técnicos estandarizados con SaverTips exclusivos: recomendaciones, advertencias y buenas prácticas de seguridad.
                    </p>
                  </div>
                </div>
              </div>

              {/* Módulo 3 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#368A45] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Demuestra tu Conocimiento</h3>
                    <p className="text-gray-600">
                      Identificar y aplicar correctamente los criterios de fuera de servicio (OOS) en los componentes críticos de seguridad de un vehículo de carga y pasaje. Obtén tu certificado Truck Savers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Importancia del cumplimiento DOT */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              ¿Por qué es importante el cumplimiento DOT – CVSA?
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              La inspección DOT no debe verse como un obstáculo, sino como una herramienta para operar de forma más segura, profesional y competitiva.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#368A45]/50 transition-colors">
                <Shield className="w-10 h-10 text-[#368A45] mb-4" />
                <h3 className="text-lg font-bold mb-2">Seguridad Vial</h3>
                <p className="text-gray-400 text-sm">
                  Menos accidentes y fallas mecánicas en carretera. Protege vidas.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#368A45]/50 transition-colors">
                <FileCheck className="w-10 h-10 text-[#368A45] mb-4" />
                <h3 className="text-lg font-bold mb-2">Cumplimiento Normativo</h3>
                <p className="text-gray-400 text-sm">
                  Evita sanciones, multas y detenciones innecesarias en la carretera.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#368A45]/50 transition-colors">
                <Award className="w-10 h-10 text-[#368A45] mb-4" />
                <h3 className="text-lg font-bold mb-2">Confianza Operativa</h3>
                <p className="text-gray-400 text-sm">
                  Garantiza que la flota se mantenga dentro de los estándares de calidad y seguridad internacional.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#368A45]/50 transition-colors">
                <AlertTriangle className="w-10 h-10 text-[#368A45] mb-4" />
                <h3 className="text-lg font-bold mb-2">Prevención</h3>
                <p className="text-gray-400 text-sm">
                  Detecta problemas antes de que se conviertan en fallas mayores o accidentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Para quién va dirigido? */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Para quién va dirigido?
            </h2>
            <p className="text-gray-600 mb-10">
              No se requiere experiencia previa en mecánica para inscribirse
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                <Wrench className="w-12 h-12 text-[#368A45] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mecánicos</h3>
                <p className="text-gray-600 text-sm">
                  Profesionales que buscan dominar los estándares de inspección DOT y CVSA
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                <GraduationCap className="w-12 h-12 text-[#368A45] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aprendices de Mecánico</h3>
                <p className="text-gray-600 text-sm">
                  Nuevos colaboradores que se incorporan a la industria del transporte
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA intermedio */}
      <section className="py-12 bg-[#368A45]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Inscríbete hoy al Curso de Inspección DOT
            </h2>
            <p className="text-white/90 mb-6">
              Acceso de por vida, certificado digital y actualizaciones constantes por solo <strong>$199 USD</strong>
            </p>
            <a 
              href="https://cursos.thetrucksavers.com/basico/inspeccion-dot/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-[#368A45] hover:bg-gray-100 py-6 px-10 text-lg font-bold">
                Ir al Curso de Inspección DOT
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Más cursos + Lista de espera */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Más Cursos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estamos preparando más cursos especializados. Explora lo que tenemos disponible y regístrate para los presenciales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Todos los Cursos en Línea */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#368A45] transition-all overflow-hidden shadow-lg hover:shadow-xl">
              <div className="bg-gradient-to-r from-[#368A45] to-[#2D6E39] p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Cursos en Línea
                </h3>
                <p className="text-white/90">
                  Accede a todos nuestros cursos disponibles
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#368A45] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Inspección DOT</strong> — Disponible ahora</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">Alineación y diagnóstico de llantas — Próximamente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">Desgaste irregular de llantas — Próximamente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">Más cursos en desarrollo...</span>
                  </li>
                </ul>
                <a 
                  href="https://cursos.thetrucksavers.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white py-6 text-lg">
                    Ver Todos los Cursos
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
                <h3 className="text-2xl font-bold text-white mb-2">
                  Cursos Presenciales
                </h3>
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

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Preguntas Frecuentes
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: '¿Cómo se imparte el curso?',
                  a: '100% online con material multimedia. Puedes acceder desde cualquier dispositivo con conexión a internet.',
                },
                {
                  q: '¿Es necesario tener experiencia previa en mecánica?',
                  a: 'No, este curso está diseñado tanto para mecánicos experimentados como para aprendices que se incorporan como colaboradores.',
                },
                {
                  q: '¿Qué duración tiene el curso?',
                  a: 'La duración del curso de Inspección DOT es de una hora y tienes acceso de por vida.',
                },
                {
                  q: '¿Entregan certificado al completar el curso?',
                  a: 'Sí, al completar exitosamente el curso recibirás un certificado digital que acredita tu participación y conocimientos adquiridos.',
                },
                {
                  q: '¿Puedo descargar los materiales del curso?',
                  a: 'Sí, todos los materiales como guías y ejemplos prácticos están disponibles para descarga y los puedes usar como referencia.',
                },
                {
                  q: '¿Qué requisitos técnicos necesito?',
                  a: 'Solo necesitas una computadora o dispositivo móvil con acceso a internet. Recomendamos tener programas para abrir documentos PDF y videos.',
                },
                {
                  q: '¿Qué métodos de pago aceptan?',
                  a: 'Todas las tarjetas débito o crédito, Google Pay, Apple Pay y PayPal.',
                },
                {
                  q: '¿Cómo me puedo inscribir al curso?',
                  a: 'Añade el curso a tu carrito en cursos.thetrucksavers.com y sigue los pasos para recibir tu usuario y contraseña y convertirte en alumno de Truck Savers.',
                },
              ].map((faq, i) => (
                <details key={i} className="bg-white rounded-xl border border-gray-200 group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 hover:text-[#368A45] transition-colors">
                    <span>{faq.q}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-gray-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12">
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
