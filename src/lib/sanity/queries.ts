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

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
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
      subheadline,
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
    stats {
      items[] {
        _key,
        value,
        label
      }
    },
    meals {
      sectionTitle,
      downloadLabel,
      downloadHref,
      meals[] {
        _key,
        name,
        image ${imageFragment},
        tag,
        rating,
        reviewCount
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
      featureList,
      appImage ${imageFragment},
      ctaLabel,
      ctaHref
    },
    steps {
      heading,
      steps[] {
        _key,
        number,
        title,
        description,
        image ${imageFragment}
      },
      ctaLabel,
      ctaHref
    },
    testimonials {
      heading,
      items[] {
        _key,
        quote,
        author,
        company,
        avatar ${imageFragment}
      }
    },
    faq {
      heading,
      items[] {
        _key,
        question,
        answer[] { ... }
      }
    },
    finalCta {
      headline,
      subheadline,
      contactPersonImage ${imageFragment},
      contactPersonName,
      contactPersonTitle,
      ctaLabel,
      ctaHref,
      backgroundImage ${imageFragment}
    },
    footer {
      quickLinks[] ${navItemFragment},
      exploreLinks[] ${navItemFragment},
      policyLinks[] ${navItemFragment},
      socialLinks[] ${navItemFragment},
      copyrightText
    }
  }
`;

// Cached fetch function — uses Next.js 16 'use cache' + cacheLife('hours')
// This is the ISR equivalent: content is cached for ~1 hour, then refreshed.
export async function getHomepageData(): Promise<HomepageData | null> {
  "use cache";
  cacheLife("hours");

  return serverClient.fetch<HomepageData>(homepageQuery, {}, { cache: "no-store" });
}
