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

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  ogImage?: SanityImage;
  slug?: { current: string };
  canonicalUrl?: string;
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage?: SanityImage;
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

export interface StatItem {
  _key: string;
  value: string;
  label: string;
}

export interface StatsSection {
  items: StatItem[];
}

export interface MealItem {
  _key: string;
  name: string;
  image?: SanityImage;
  tag?: string;
  rating?: string;
  reviewCount?: string;
}

export interface MealsSection {
  sectionTitle?: string;
  downloadLabel?: string;
  downloadHref?: string;
  meals?: MealItem[];
}

export interface StatCard {
  _key: string;
  value: string;
  label: string;
  description?: string;
}

export interface FeaturesSection {
  sectionTitle?: string;
  statCards?: StatCard[];
  featureList?: string[];
  appImage?: SanityImage;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface StepItem {
  _key: string;
  number: string;
  title: string;
  description: string;
  image?: SanityImage;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface StepsSection {
  heading: string;
  steps: StepItem[];
  ctaLabel: string;
  ctaHref: string;
}

export interface TestimonialItem {
  _key: string;
  quote: string;
  author: string;
  company?: string;
  avatar?: SanityImage;
}

export interface TestimonialsSection {
  heading: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  _key: string;
  question: string;
  answer: PortableTextBlock[];
}

export interface FaqSection {
  heading: string;
  items: FaqItem[];
}

export interface CtaSection {
  headline: string;
  subheadline?: string;
  contactPersonImage?: SanityImage;
  contactPersonName?: string;
  contactPersonTitle?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FooterData {
  quickLinks: NavItem[];
  exploreLinks: NavItem[];
  policyLinks: NavItem[];
  socialLinks: NavItem[];
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
  stats: StatsSection;
  meals?: MealsSection;
  features: FeaturesSection;
  steps: StepsSection;
  testimonials?: TestimonialsSection;
  faq?: FaqSection;
  finalCta: CtaSection;
  footer: FooterData;
}
