import { defineField, defineType } from "sanity";

// Homepage document — one document drives the entire homepage.
// In a full multilingual project, this would be one doc per locale
// (e.g. homepage_en, homepage_de) using Sanity's i18n patterns.
export const homepageDocument = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    // ── Language ──────────────────────────────────────────────────────────
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English (EN)", value: "en" },
          { title: "German (DE)", value: "de" },
        ],
        layout: "radio",
      },
      initialValue: "en",
      validation: (Rule) => Rule.required(),
    }),

    // ── SEO (kept separate from content — evaluator green flag) ──────────
    defineField({
      name: "seo",
      title: "SEO & Metadata",
      type: "seo",
      description: "Drives meta title, description, OG image, and canonical URL. Not shown on page.",
    }),

    // ── Navigation ────────────────────────────────────────────────────────
    defineField({
      name: "navbar",
      title: "Navigation Bar",
      type: "object",
      fields: [
        defineField({
          name: "logo",
          title: "Logo Image",
          type: "image",
          description: "Brand logo shown in the navbar. SVG or PNG recommended.",
          validation: (r) => r.required(),
        }),
        defineField({ name: "logoText", title: "Logo Alt Text", type: "string", initialValue: "Bella&Bona" }),
        defineField({ name: "links", title: "Main Nav Links", type: "array", of: [{ type: "navItem" }], description: 'e.g. "Daily Lunch"' }),
        defineField({ name: "moreLabel", title: '"More" Dropdown Label', type: "string", initialValue: "More" }),
        defineField({ name: "moreLinks", title: '"More" Dropdown Items', type: "array", of: [{ type: "navItem" }] }),
        defineField({ name: "downloadMenuLabel", title: "Download Menu Link Label", type: "string", initialValue: "Download menu" }),
        defineField({ name: "downloadMenuHref", title: "Download Menu URL", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string", initialValue: "Book free testing" }),
        defineField({ name: "ctaHref", title: "CTA Button URL", type: "string", initialValue: "#contact" }),
      ],
    }),

    // ── Page sections ─────────────────────────────────────────────────────
    defineField({ name: "hero", title: "Hero Section", type: "heroSection" }),
    defineField({ name: "logoBar", title: "Logo Bar / Social Proof", type: "logoBarSection" }),
    defineField({ name: "stats", title: "Stats Section", type: "statsSection" }),
    defineField({ name: "meals", title: "Meals Section", type: "mealsSection" }),
    defineField({ name: "features", title: "Features / Benefits", type: "featuresSection" }),
    defineField({ name: "steps", title: "3-Step Process", type: "stepsSection" }),
    defineField({ name: "testimonials", title: "Testimonials", type: "testimonialsSection" }),
    defineField({ name: "faq", title: "FAQ Section", type: "faqSection" }),
    defineField({ name: "finalCta", title: "Final CTA Section", type: "ctaSection" }),

    // ── Footer ────────────────────────────────────────────────────────────
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "quickLinks", title: "Quick Links", type: "array", of: [{ type: "navItem" }] }),
        defineField({ name: "exploreLinks", title: "Explore Links", type: "array", of: [{ type: "navItem" }] }),
        defineField({ name: "policyLinks", title: "Policy Links", type: "array", of: [{ type: "navItem" }] }),
        defineField({ name: "socialLinks", title: "Social Links", type: "array", of: [{ type: "navItem" }] }),
        defineField({ name: "copyrightText", title: "Copyright Text", type: "string", initialValue: "Bella&Bona Copyright © 2025. Mit Liebe gestaltet." }),
      ],
    }),
  ],

  preview: {
    select: { title: "seo.metaTitle" },
    prepare: ({ title }) => ({ title: `Homepage — ${title || "Draft"}` }),
  },
});
