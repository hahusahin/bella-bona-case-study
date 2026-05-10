// JSON-LD structured data builders
// Organization schema is added to every page via root layout.tsx
// LocalBusiness schema is added to the homepage.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bellabona.com";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bella&Bona",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://www.linkedin.com/company/bellabona",
      "https://www.instagram.com/bellabona",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "fragen@bellabona.com",
      contactType: "customer support",
      availableLanguage: ["German", "English"],
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Bella&Bona",
    description:
      "B2B workplace meal solution. Team lunches and office food programs in Munich, Berlin, and NRW.",
    url: siteUrl,
    email: "fragen@bellabona.com",
    areaServed: ["Munich", "Berlin", "NRW"],
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
    },
  };
}
