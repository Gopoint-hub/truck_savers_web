import { useState } from 'react';
import { MapPin, Globe, Facebook, Instagram, Music, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function QRLinkTree() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Ubicaciones con coordenadas para mapas
  const locations = [
    {
      id: 'houston',
      name: 'Houston, TX',
      address: '1234 Main Street, Houston, TX 77001',
      phone: '+1 (713) 455-5566',
      coords: { lat: 29.7604, lng: -95.3698 },
    },
    {
      id: 'dallas',
      name: 'Dallas, TX',
      address: '5678 Oak Avenue, Dallas, TX 75201',
      phone: '+1 (972) 555-1234',
      coords: { lat: 32.7767, lng: -96.7970 },
    },
    {
      id: 'monterrey',
      name: 'Monterrey, NL',
      address: 'Avenida Constitución 2000, Monterrey, NL 64000',
      phone: '+52 (81) 8888-5566',
      coords: { lat: 25.6866, lng: -100.3161 },
    },
  ];

  // Redes sociales
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/thetrucksavers',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/thetrucksavers',
      color: 'bg-pink-600 hover:bg-pink-700',
    },
    {
      name: 'TikTok',
      icon: Music,
      url: 'https://tiktok.com/@thetrucksavers',
      color: 'bg-black hover:bg-gray-800',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: 'https://twitter.com/thetrucksavers',
      color: 'bg-black hover:bg-gray-800',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/thetrucksavers',
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@lostrucksavers',
      color: 'bg-red-600 hover:bg-red-700',
    },
  ];

  // Funciones para abrir mapas
  const openGoogleMaps = (location: typeof locations[0]) => {
    const query = encodeURIComponent(location.address);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  const openAppleMaps = (location: typeof locations[0]) => {
    const query = encodeURIComponent(location.address);
    window.open(
      `https://maps.apple.com/?address=${query}&ll=${location.coords.lat},${location.coords.lng}`,
      '_blank'
    );
  };

  const openWaze = (location: typeof locations[0]) => {
    window.open(
      `https://waze.com/ul?ll=${location.coords.lat},${location.coords.lng}&navigate=yes`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#368A45] to-[#2D6E39] py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <img
            src="/logo.png"
            alt="The Truck Savers"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">The Truck Savers</h1>
          <p className="text-white/80 text-sm">
            Reparación integral de camiones comerciales
          </p>
        </div>

        {/* Ubicaciones Section */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Nuestras Ubicaciones
          </h2>

          <div className="space-y-3">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <h3 className="font-bold text-gray-900 mb-2">{location.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{location.address}</p>
                <p className="text-gray-600 text-sm mb-4">{location.phone}</p>

                {/* Botones de Mapas */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => openGoogleMaps(location)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Google Maps
                  </button>
                  <button
                    onClick={() => openAppleMaps(location)}
                    className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Apple Maps
                  </button>
                  <button
                    onClick={() => openWaze(location)}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Waze
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sitio Web */}
        <div className="mb-8">
          <a
            href="https://thetrucksavers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white hover:bg-gray-100 text-[#368A45] font-bold py-4 px-4 rounded-xl text-center transition-colors shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Globe size={20} />
              Visita Nuestro Sitio Web
            </div>
          </a>
        </div>

        {/* Redes Sociales */}
        <div className="mb-8">
          <h3 className="text-white font-bold text-sm mb-3 text-center">
            Síguenos en Redes Sociales
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} text-white py-3 px-2 rounded-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg`}
                  title={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>

        {/* CTA Principal */}
        <div className="bg-white rounded-xl p-6 text-center shadow-lg mb-8">
          <h3 className="text-gray-900 font-bold text-lg mb-2">
            ¿Necesitas Ayuda?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Contacta con nuestro equipo de expertos
          </p>
          <a
            href="https://wa.me/17134555566?text=Hola%2C%20me%20gustaría%20conocer%20más%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#368A45] hover:bg-[#2D6E39] text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Contactar por WhatsApp
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-white/60 text-xs">
          <p>© 2026 The Truck Savers. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
