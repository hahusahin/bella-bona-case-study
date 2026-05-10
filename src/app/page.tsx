import type { Metadata } from "next";
import Link from "next/link";
import { getHomepageData } from "@/lib/sanity/queries";
import { buildLocalBusinessSchema } from "@/lib/seo/structured-data";
import { urlFor } from "@/lib/sanity/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Stats } from "@/components/sections/Stats";
import { Meals } from "@/components/sections/Meals";
import { Features } from "@/components/sections/Features";
import { Steps } from "@/components/sections/Steps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RevealObserver } from "@/components/ui/RevealObserver";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bellabona.com";

// generateMetadata runs at build/revalidation time — all SEO fields come from Sanity.
// params is a Promise in Next.js 15+ (breaking change from 14).
export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepageData();
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
      // hreflang — DE/EN bilingual structure, English only for this test.
      // In production: /[locale]/ routing drives this dynamically.
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
  const data = await getHomepageData();
  const localBusinessSchema = buildLocalBusinessSchema();

  // Graceful empty state while Sanity content is being set up
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
      {/* LocalBusiness JSON-LD — homepage only */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Intersection-observer for .reveal CSS entrance animations (no JS library) */}
      <RevealObserver />

      <Navbar data={data.navbar} />

      <main id="main-content">
        <Hero data={data.hero} />
        <SocialProof data={data.logoBar} />
        <Stats data={data.stats} />
        {data.meals && <Meals data={data.meals} />}
        <Features data={data.features} />
        <Steps data={data.steps} />
        {data.testimonials && <Testimonials data={data.testimonials} />}
        {data.faq && <FAQ data={data.faq} />}
        <FinalCTA data={data.finalCta} />
      </main>

      <Footer data={data.footer} />
    </>
  );
}
