import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface NavItem {
  _key: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLink {
  _key: string;
  label: string;
  href: string;
  icon?: SanityImage;
}

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  ogImage?: SanityImage;
  slug?: { current: string };
  canonicalUrl?: string;
}

export interface HeroSection {
  headline: string;
  subheadline?: PortableTextBlock[];
  ctaLabel: string;
  ctaHref: string;
  heroImage?: SanityImage;
}

export interface LogoItem {
  _key: string;
  name: string;
  logo: SanityImage;
  url?: string;
}

export interface LogoBarSection {
  heading: string;
  logos: LogoItem[];
}

export interface StatCard {
  _key: string;
  value: string;
  label: string;
  description?: string;
}

export interface FeatureItem {
  _key: string;
  title: string;
  description?: string;
}

export interface FeaturesSection {
  sectionTitle?: string;
  statCards?: StatCard[];
  featureItems?: FeatureItem[];
  appImage?: SanityImage;
}

export interface CtaSection {
  headline: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  image?: SanityImage;
}

export interface FooterData {
  followTitle?: string;
  followDescription?: string;
  email?: string;
  socialLinks?: SocialLink[];
  quickLinksTitle?: string;
  quickLinks: NavItem[];
  exploreLinksTitle?: string;
  exploreLinks: NavItem[];
  policyLinksTitle?: string;
  policyLinks: NavItem[];
  wordmarkImage?: SanityImage;
  copyrightText: string;
}

export interface NavbarData {
  logo: SanityImage;
  logoText: string;
  links: NavItem[];
  moreLabel?: string;
  moreLinks?: NavItem[];
  downloadMenuLabel?: string;
  downloadMenuHref?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomepageData {
  seo: SeoData;
  navbar: NavbarData;
  hero: HeroSection;
  logoBar: LogoBarSection;
  features: FeaturesSection;
  finalCta: CtaSection;
  footer: FooterData;
}
