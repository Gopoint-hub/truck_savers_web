import { useState, useEffect } from 'react';

/**
 * Hook to detect user's country via IP geolocation.
 * Uses ip-api.com (free, no key required, up to 45 req/min).
 * Falls back to 'US' if detection fails.
 * 
 * Returns the default city slug based on country:
 * - Mexico (MX) → 'monterrey'
 * - United States (US) or other → 'houston'
 */

interface GeoData {
  country: string;       // Country code (e.g., 'MX', 'US')
  defaultCity: string;   // Default city slug ('monterrey' | 'houston' | 'dallas')
  loading: boolean;
  error: boolean;
}

const CACHE_KEY = 'tts_geo_country';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function getCachedCountry(): string | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { country, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return country;
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

function setCachedCountry(country: string) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      country,
      timestamp: Date.now(),
    }));
  } catch {
    // Ignore localStorage errors
  }
}

function getDefaultCity(country: string): string {
  switch (country) {
    case 'MX':
      return 'monterrey';
    case 'US':
      return 'houston';
    default:
      return 'houston';
  }
}

export function useGeoLocation(): GeoData {
  const [geoData, setGeoData] = useState<GeoData>(() => {
    const cached = getCachedCountry();
    if (cached) {
      return {
        country: cached,
        defaultCity: getDefaultCity(cached),
        loading: false,
        error: false,
      };
    }
    return {
      country: '',
      defaultCity: 'houston', // fallback while loading
      loading: true,
      error: false,
    };
  });

  useEffect(() => {
    // Skip if already have cached data
    if (getCachedCountry()) return;

    const controller = new AbortController();

    async function detectCountry() {
      try {
        // ip-api.com — free, no API key, returns country code
        const response = await fetch('http://ip-api.com/json/?fields=countryCode', {
          signal: controller.signal,
        });
        
        if (!response.ok) throw new Error('Geo API failed');
        
        const data = await response.json();
        const country = data.countryCode || 'US';
        
        setCachedCountry(country);
        setGeoData({
          country,
          defaultCity: getDefaultCity(country),
          loading: false,
          error: false,
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        
        // Fallback: try alternative API
        try {
          const response = await fetch('https://ipapi.co/country_code/', {
            signal: controller.signal,
          });
          
          if (!response.ok) throw new Error('Fallback API failed');
          
          const country = (await response.text()).trim() || 'US';
          
          setCachedCountry(country);
          setGeoData({
            country,
            defaultCity: getDefaultCity(country),
            loading: false,
            error: false,
          });
        } catch {
          // Final fallback: default to Houston (US)
          setCachedCountry('US');
          setGeoData({
            country: 'US',
            defaultCity: 'houston',
            loading: false,
            error: true,
          });
        }
      }
    }

    detectCountry();

    return () => controller.abort();
  }, []);

  return geoData;
}
