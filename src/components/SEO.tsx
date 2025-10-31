import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = (props) => {
  const {
    title = "Webdesign Fabrik - Premium Templates | German Code Zero",
    description = "Professionelle Webdesign Templates für alle Branchen. Responsive, SEO-optimiert und sofort einsatzbereit. Bis zu 94% Rabatt auf Premium-Designs.",
    keywords = "Webdesign, Templates, Responsive Design, SEO, German Code Zero, Webdesign Fabrik",
    image = "/og-image.jpg",
    url = "https://gcz-webdesign.de",
    type = "website",
    author = "German Code Zero",
    structuredData
  } = props;
  const fullTitle = `${title} | German Code Zero`;
  const fullUrl = `${url}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'German');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', `${url}${image}`, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'German Code Zero', true);
    updateMetaTag('og:locale', 'de_DE', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${url}${image}`);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Structured Data
    let structuredDataScript = document.querySelector('#structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('id', 'structured-data');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataScript);
    }

    const defaultStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "German Code Zero",
      "alternateName": "Webdesign Fabrik",
      "url": url,
      "logo": `${url}/logo.png`,
      "description": description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ostmarkstraße 56",
        "addressLocality": "Münster",
        "postalCode": "48145",
        "addressCountry": "DE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+49-163-2419823",
        "contactType": "customer service",
        "availableLanguage": "German"
      }
    };

    structuredDataScript.textContent = JSON.stringify(structuredData || defaultStructuredData);

    // Cleanup function
    return () => {
      // Remove dynamically added meta tags on unmount
      const dynamicMetaTags = document.querySelectorAll('meta[data-dynamic="true"]');
      dynamicMetaTags.forEach(tag => tag.remove());
    };
  }, [fullTitle, description, keywords, author, fullUrl, url, image, type, structuredData]);

  return null;
};
