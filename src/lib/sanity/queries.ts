import { groq } from "next-sanity";
import { serverClient } from "./client";
import { cacheLife } from "next/cache";
import type { HomepageData } from "@/types/sanity";

const imageFragment = `{
  asset,
  alt,
  hotspot,
  crop
}`;

const navItemFragment = `{
  _key,
  label,
  href,
  isExternal
}`;

// Maps locale to the fixed Sanity document ID for that locale's homepage singleton.
// EN keeps the original "homepage" ID so existing content is preserved.
const localeDocId: Record<"en" | "de", string> = {
  en: "homepage",
  de: "homepage-de",
};

export const homepageQuery = groq`
  *[_type == "homepage" && _id == $id][0] {
    seo {
      metaTitle,
      metaDescription,
      ogImage ${imageFragment},
      slug,
      canonicalUrl
    },
    navbar {
      logo ${imageFragment},
      logoText,
      links[] ${navItemFragment},
      moreLabel,
      moreLinks[] ${navItemFragment},
      downloadMenuLabel,
      downloadMenuHref,
      ctaLabel,
      ctaHref
    },
    hero {
      headline,
      subheadline[] { ... },
      ctaLabel,
      ctaHref,
      heroImage ${imageFragment}
    },
    logoBar {
      heading,
      logos[] {
        _key,
        name,
        logo ${imageFragment},
        url
      }
    },
    features {
      sectionTitle,
      statCards[] {
        _key,
        value,
        label,
        description
      },
      featureItems[] {
        _key,
        title,
        description
      },
      appImage ${imageFragment}
    },
    finalCta {
      headline,
      description,
      ctaLabel,
      ctaHref,
      image ${imageFragment}
    },
    footer {
      followTitle,
      followDescription,
      email,
      socialLinks[] {
        _key,
        label,
        href,
        icon ${imageFragment}
      },
      quickLinksTitle,
      quickLinks[] ${navItemFragment},
      exploreLinksTitle,
      exploreLinks[] ${navItemFragment},
      policyLinksTitle,
      policyLinks[] ${navItemFragment},
      wordmarkImage ${imageFragment},
      copyrightText
    }
  }
`;

// ISR via Next.js 16 'use cache' + cacheLife: cached ~1 hour, refreshed on demand via revalidateTag('homepage')
export async function getHomepageData(locale: "en" | "de" = "en"): Promise<HomepageData | null> {
  "use cache";
  cacheLife("hours");

  return serverClient.fetch<HomepageData>(homepageQuery, { id: localeDocId[locale] }, { cache: "no-store" });
}
