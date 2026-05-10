import { homepageDocument } from "./documents/homepage";
import { seoObject } from "./objects/seo";
import { navItemObject } from "./objects/navItem";
import { heroSectionObject } from "./objects/heroSection";
import { logoBarSectionObject } from "./objects/logoBarSection";
import { statsSectionObject } from "./objects/statsSection";
import { mealsSectionObject } from "./objects/mealsSection";
import { featuresSectionObject } from "./objects/featuresSection";
import { stepsSectionObject } from "./objects/stepsSection";
import { testimonialsSectionObject } from "./objects/testimonialsSection";
import { faqSectionObject } from "./objects/faqSection";
import { ctaSectionObject } from "./objects/ctaSection";

export const schemaTypes = [
  // Documents
  homepageDocument,
  // Objects (reusable)
  seoObject,
  navItemObject,
  heroSectionObject,
  logoBarSectionObject,
  statsSectionObject,
  mealsSectionObject,
  featuresSectionObject,
  stepsSectionObject,
  testimonialsSectionObject,
  faqSectionObject,
  ctaSectionObject,
];
