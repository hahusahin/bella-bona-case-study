import { defineField, defineType } from "sanity";

export const homepageDocument = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  // Groups render as tabs in the Sanity Studio form — one tab per page section.
  groups: [
    { name: "seo", title: "SEO", default: true },
    { name: "navbar", title: "Navbar" },
    { name: "hero", title: "Hero" },
    { name: "socialProof", title: "Social Proof" },
    { name: "features", title: "Features" },
    { name: "cta", title: "Final CTA" },
    { name: "footer", title: "Footer" },
  ],

  fields: [
    defineField({
      name: "seo",
      title: "SEO & Metadata",
      type: "seo",
      group: "seo",
      description: "Drives meta title, description, OG image, and canonical URL. Not shown on page.",
    }),

    defineField({
      name: "navbar",
      title: "Navigation Bar",
      type: "object",
      group: "navbar",
      fields: [
        defineField({ name: "logo", title: "Logo Image", type: "image", validation: (r) => r.required() }),
        defineField({ name: "logoText", title: "Logo Alt Text", type: "string", initialValue: "Bella&Bona" }),
        defineField({
          name: "links",
          title: "Main Nav Links",
          type: "array",
          of: [{ type: "navItem" }],
          initialValue: [
            { _type: "navItem", _key: "n1", label: "Daily Lunch", href: "#lunch", isExternal: false },
            { _type: "navItem", _key: "n2", label: "Event Catering", href: "#catering", isExternal: false },
            { _type: "navItem", _key: "n3", label: "Office Snacks", href: "#snacks", isExternal: false },
          ],
        }),
        defineField({ name: "moreLabel", title: '"More" Dropdown Label', type: "string", initialValue: "More" }),
        defineField({ name: "moreLinks", title: '"More" Dropdown Items', type: "array", of: [{ type: "navItem" }] }),
        defineField({ name: "downloadMenuLabel", title: "Download Menu Link Label", type: "string", initialValue: "Download menu" }),
        defineField({ name: "downloadMenuHref", title: "Download Menu URL", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string", initialValue: "Book free testing" }),
        defineField({ name: "ctaHref", title: "CTA Button URL", type: "string", initialValue: "#contact" }),
      ],
    }),

    defineField({ name: "hero", title: "Hero Section", type: "heroSection", group: "hero" }),
    defineField({ name: "logoBar", title: "Logo Bar / Social Proof", type: "logoBarSection", group: "socialProof" }),
    defineField({ name: "features", title: "Features / Benefits", type: "featuresSection", group: "features" }),
    defineField({ name: "finalCta", title: "Final CTA Section", type: "ctaSection", group: "cta" }),

    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "followTitle", title: "Follow Column Heading", type: "string", initialValue: "Follow us!" }),
        defineField({ name: "followDescription", title: "Follow Column Description", type: "string" }),
        defineField({ name: "email", title: "Contact Email", type: "string", initialValue: "fragen@bellabona.com" }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          of: [{ type: "socialLink" }],
          description: "Upload each platform icon (SVG or white PNG). Google, Twitter, Instagram, LinkedIn, App Store, Play Store.",
        }),
        defineField({ name: "quickLinksTitle", title: "Quick Links Column Heading", type: "string", initialValue: "Quick Links" }),
        defineField({
          name: "quickLinks",
          title: "Quick Links",
          type: "array",
          of: [{ type: "navItem" }],
          initialValue: [
            { _type: "navItem", _key: "q1", label: "Daily Lunch", href: "#lunch" },
            { _type: "navItem", _key: "q2", label: "Event Catering", href: "#catering" },
            { _type: "navItem", _key: "q3", label: "Office Snacks", href: "#snacks" },
            { _type: "navItem", _key: "q4", label: "Book a tasting", href: "#contact" },
          ],
        }),
        defineField({ name: "exploreLinksTitle", title: "Explore Column Heading", type: "string", initialValue: "Explore" }),
        defineField({
          name: "exploreLinks",
          title: "Explore Links",
          type: "array",
          of: [{ type: "navItem" }],
          initialValue: [
            { _type: "navItem", _key: "e1", label: "About us", href: "#about" },
            { _type: "navItem", _key: "e2", label: "Blog", href: "#blog" },
            { _type: "navItem", _key: "e3", label: "Careers", href: "#careers" },
          ],
        }),
        defineField({ name: "policyLinksTitle", title: "Legal & Policies Column Heading", type: "string", initialValue: "Legal & Policies" }),
        defineField({ name: "policyLinks", title: "Policy Links", type: "array", of: [{ type: "navItem" }] }),
        defineField({
          name: "wordmarkImage",
          title: "Wordmark Image",
          type: "image",
          description: "Large BELLABONA wordmark shown at the bottom of the footer.",
        }),
        defineField({ name: "copyrightText", title: "Copyright Text", type: "string", initialValue: "Bella&Bona Copyright © 2025. Mit Liebe gestaltet." }),
      ],
    }),
  ],

  preview: {
    select: { id: "_id" },
    prepare: ({ id }) => ({
      title: (id as string).includes("de") ? "Homepage (DE)" : "Homepage (EN)",
    }),
  },
});
