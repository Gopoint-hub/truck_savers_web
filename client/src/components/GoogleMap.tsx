interface GoogleMapProps {
  location: 'houston' | 'dallas' | 'monterrey';
  className?: string;
}

const mapUrls = {
  houston: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.123456789!2d-95.3698!3d29.7604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1362%20Sheffield%20Blvd%2C%20Houston%2C%20TX%2077015!5e0!3m2!1sen!2sus!4v1234567890",
  dallas: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.123456789!2d-96.7970!3d32.7767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s4739%20Lucky%20Ln%2C%20Dallas%2C%20TX%2075247!5e0!3m2!1sen!2sus!4v1234567890",
  monterrey: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.123456789!2d-100.3161!3d25.6866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLibramiento%20Noreste%20KM%2033.5%2C%20Monterrey!5e0!3m2!1sen!2smx!4v1234567890"
};

const addresses = {
  houston: {
    street: "1362 Sheffield Blvd",
    city: "Houston",
    state: "TX",
    zip: "77015",
    country: "USA",
    googleMapsUrl: "https://maps.google.com/?q=1362+Sheffield+Blvd,+Houston,+TX+77015"
  },
  dallas: {
    street: "4739 Lucky Ln",
    city: "Dallas",
    state: "TX",
    zip: "75247",
    country: "USA",
    googleMapsUrl: "https://maps.google.com/?q=4739+Lucky+Ln,+Dallas,+TX+75247"
  },
  monterrey: {
    street: "Libramiento Noreste KM 33.5, Interior 30",
    city: "Escobedo",
    state: "Nuevo León",
    zip: "66052",
    country: "México",
    googleMapsUrl: "https://maps.google.com/?q=Libramiento+Noreste+KM+33.5,+Nueva+Castilla,+Escobedo"
  }
};

export default function GoogleMap({ location, className = "" }: GoogleMapProps) {
  const address = addresses[location];
  
  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Cómo Llegar
          </h2>
          <p className="text-gray-600">
            {address.street}, {address.city}, {address.state} {address.zip}
          </p>
        </div>
        
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src={mapUrls[location]}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa de The Truck Savers ${address.city}`}
            className="w-full"
          />
        </div>
        
        <div className="mt-6 text-center">
          <a
            href={address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#368A45] hover:text-[#2D6E39] font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Abrir en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

export { addresses };
