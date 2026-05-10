/**
 * German homepage — /de
 *
 * Fetches the Sanity document where language == "de".
 * Falls back to the English document if no German document has been created yet.
 *
 * To add German content: open /studio, create a new Homepage document,
 * set Language → German (DE), then fill in all fields in German.
 *
 * Production path: replace app/page.tsx + app/de/page.tsx with
 * app/[locale]/page.tsx using next-intl middleware for automatic detection.
 */

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
  const data = (await getHomepageData("de")) ?? (await getHomepageData("en"));
  const seo = data?.seo;

  const ogImageUrl = seo?.ogImage?.asset
    ? urlFor(seo.ogImage).width(1200).height(630).fit("crop").url()
    : `${siteUrl}/og-default.png`;

  return {
    title: seo?.metaTitle ?? "Bella&Bona — Gesundes Mittagessen für moderne Büros",
    description: seo?.metaDescription,
    alternates: {
      canonical: `${siteUrl}/de/`,
      languages: {
        en: `${siteUrl}/`,
        de: `${siteUrl}/de/`,
        "x-default": `${siteUrl}/`,
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/de/`,
      title: seo?.metaTitle ?? "Bella&Bona",
      description: seo?.metaDescription,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Bella&Bona" }],
    },
  };
}

export default async function DeHomePage() {
  const data = (await getHomepageData("de")) ?? (await getHomepageData("en"));
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
      <RevealObserver />
      <Navbar data={data.navbar} />
      <main id="main-content" lang="de">
        <Hero data={data.hero} />
        <SocialProof data={data.logoBar} />
        <Features data={data.features} />
        <FinalCTA data={data.finalCta} />
      </main>
      <Footer data={data.footer} />
    </>
  );
}
