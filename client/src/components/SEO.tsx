import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object;
}

const DEFAULT_TITLE = "The Truck Savers | Taller Mecánico de Camiones y Trailers";
const DEFAULT_DESCRIPTION = "Taller mecánico especializado en camiones y trailers con más de 21 años de experiencia. Servicios de alineación, suspensión, frenos, cambio de aceite y más. Ubicaciones en Houston, Dallas y Monterrey.";
const DEFAULT_KEYWORDS = "taller mecánico camiones, reparación trailers, alineación camiones, suspensión camiones, frenos camiones, cambio aceite camiones, Houston, Dallas, Monterrey";
const DEFAULT_OG_IMAGE = "https://thetrucksavers.com/og-image.jpg";
const SITE_URL = "https://thetrucksavers.com";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | The Truck Savers` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      {/* Título */}
      <title>{fullTitle}</title>

      {/* Meta tags básicos */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="The Truck Savers" />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"} />
      
      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="The Truck Savers" />
      <meta property="og:locale" content="es_MX" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Idioma */}
      <html lang="es" />

      {/* Datos estructurados */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Datos estructurados predefinidos para la organización
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The Truck Savers",
  "alternateName": "TheTruckSavers",
  "url": "https://thetrucksavers.com",
  "logo": "https://thetrucksavers.com/logo.png",
  "description": "Taller mecánico especializado en camiones y trailers con más de 21 años de experiencia en Houston, Dallas y Monterrey.",
  "foundingDate": "2004",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-713-455-5566",
      "contactType": "customer service",
      "areaServed": ["US", "MX"],
      "availableLanguage": ["Spanish", "English"]
    }
  ],
  "sameAs": [
    "https://www.facebook.com/thetrucksavers",
    "https://www.youtube.com/@thetrucksavers",
    "https://www.instagram.com/thetrucksavers",
    "https://www.tiktok.com/@thetrucksavers"
  ]
};

// Datos estructurados para negocio local - Houston
export const houstonLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "The Truck Savers - Houston",
  "image": "https://thetrucksavers.com/houston-shop.jpg",
  "description": "Taller mecánico de camiones y trailers en Houston, TX. Especialistas en alineación, suspensión, frenos y mantenimiento preventivo.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1362 Sheffield Blvd",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "postalCode": "77015",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.7604,
    "longitude": -95.3698
  },
  "telephone": "+1-713-455-5566",
  "email": "info@thetrucksavers.com",
  "url": "https://thetrucksavers.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
  "currenciesAccepted": "USD",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 29.7604,
      "longitude": -95.3698
    },
    "geoRadius": "50 mi"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Taller Mecánico",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Alineación de Camiones",
          "description": "Servicio profesional de alineación para camiones y trailers"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Reparación de Suspensión",
          "description": "Diagnóstico y reparación de sistemas de suspensión"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Servicio de Frenos",
          "description": "Inspección y reparación de sistemas de frenos"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cambio de Aceite",
          "description": "Cambio de aceite y filtros para motores diésel"
        }
      }
    ]
  }
};

// Datos estructurados para negocio local - Dallas
export const dallasLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "The Truck Savers - Dallas",
  "image": "https://thetrucksavers.com/dallas-shop.jpg",
  "description": "Taller mecánico de camiones y trailers en Dallas, TX. Especialistas en alineación, suspensión, frenos y mantenimiento preventivo.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4739 Lucky Ln",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "postalCode": "75247",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 32.7767,
    "longitude": -96.7970
  },
  "telephone": "+1-713-455-5566",
  "email": "info@thetrucksavers.com",
  "url": "https://thetrucksavers.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 32.7767,
      "longitude": -96.7970
    },
    "geoRadius": "50 mi"
  }
};

// Datos estructurados para negocio local - Monterrey
export const monterreyLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "The Truck Savers - Monterrey",
  "image": "https://thetrucksavers.com/monterrey-shop.jpg",
  "description": "Taller mecánico de camiones y trailers en Monterrey, México. Especialistas en alineación, suspensión, frenos y mantenimiento preventivo.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Isaac Garza #1620 Oriente, Centro",
    "addressLocality": "Monterrey",
    "addressRegion": "Nuevo León",
    "postalCode": "64000",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.6866,
    "longitude": -100.3161
  },
  "telephone": "+52-81-1234-5678",
  "email": "info@thetrucksavers.com",
  "url": "https://thetrucksavers.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 25.6866,
      "longitude": -100.3161
    },
    "geoRadius": "100 km"
  }
};

// Función para generar schema de servicio
export function createServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "image": service.image,
    "provider": {
      "@type": "Organization",
      "name": service.provider || "The Truck Savers",
      "url": "https://thetrucksavers.com"
    },
    "areaServed": service.areaServed || ["Houston, TX", "Dallas, TX", "Monterrey, MX"],
    "serviceType": "Auto Repair"
  };
}

// Función para generar schema de artículo de blog
export function createBlogPostSchema(post: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": post.url,
    "image": post.image,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "author": {
      "@type": "Organization",
      "name": post.author || "The Truck Savers"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Truck Savers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thetrucksavers.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    }
  };
}

// Función para generar schema de FAQ
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Función para generar breadcrumbs schema
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
