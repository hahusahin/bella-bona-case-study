import type { Metadata } from "next";
import Link from "next/link";
import { getHomepageData } from "@/lib/sanity/queries";
import { buildLocalBusinessSchema } from "@/lib/seo/structured-data";
import { urlFor } from "@/lib/sanity/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Features } from "@/components/sections/Features";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RevealObserver } from "@/components/ui/RevealObserver";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bellabona.com";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepageData("en");
  const seo = data?.seo;

  const ogImageUrl = seo?.ogImage?.asset
    ? urlFor(seo.ogImage).width(1200).height(630).fit("crop").url()
    : `${siteUrl}/og-default.png`;

  const canonicalUrl = seo?.canonicalUrl ?? `${siteUrl}/`;

  return {
    title: seo?.metaTitle ?? "Bella&Bona — Smart Team Lunches for Modern Offices",
    description:
      seo?.metaDescription ??
      "B2B workplace meal solution in Munich, Berlin & NRW. One contract, one invoice, one dashboard.",
    alternates: {
      canonical: canonicalUrl,
      // hreflang — bilingual DE/EN structure. In production: /[locale]/ routing via next-intl drives this dynamically.
      languages: {
        en: `${siteUrl}/`,
        de: `${siteUrl}/de/`,
        "x-default": `${siteUrl}/`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: seo?.metaTitle ?? "Bella&Bona",
      description: seo?.metaDescription,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Bella&Bona" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle ?? "Bella&Bona",
      description: seo?.metaDescription,
      images: [ogImageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function HomePage() {
  const data = await getHomepageData("en");
  const localBusinessSchema = buildLocalBusinessSchema();

  if (!data) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-green-900">
        <p className="text-white text-lg">
          Setting up content… Open{" "}
          <Link href="/studio" className="underline text-lime-200">
            /studio
          </Link>{" "}
          to add your homepage data.
        </p>
      </main>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Lightweight IntersectionObserver — adds .visible to .reveal elements for CSS entrance animations */}
      <RevealObserver />

      <Navbar data={data.navbar} />

      <main id="main-content">
        <Hero data={data.hero} />
        <SocialProof data={data.logoBar} />
        <Features data={data.features} />
        <FinalCTA data={data.finalCta} />
      </main>

      <Footer data={data.footer} />
    </>
  );
}
