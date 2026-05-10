import type { Metadata } from "next";
import { Figtree, DM_Sans } from "next/font/google";
import "./globals.css";
import { buildOrganizationSchema } from "@/lib/seo/structured-data";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bellabona.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bella&Bona — Smart Team Lunches for Modern Offices",
    template: "%s | Bella&Bona",
  },
  description:
    "B2B workplace meal solution in Munich, Berlin & NRW. One contract, one invoice, one dashboard.",
  robots: { index: true, follow: true },
  // hreflang is set per page via generateMetadata alternates.languages
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = buildOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${figtree.variable} ${dmSans.variable} h-full`}
    >
      <head>
        {/* hreflang for DE/EN multilingual awareness — full /[locale]/ routing
            would be added in the production build with next-intl */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="de" href={`${siteUrl}/de/`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />

        {/* Organization JSON-LD — present on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
