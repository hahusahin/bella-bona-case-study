import { defineField, defineType } from "sanity";

export const seoObject = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Shown in browser tab and search results. 50–60 characters ideal.",
      initialValue: "Offer Daily Lunch To Build Culture & Cut Costs | Bella&Bona",
      validation: (r) => r.max(60).warning("Keep under 60 characters for best results"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Search engine snippet. 140–160 characters ideal.",
      initialValue: "B2B workplace meal solution in Munich, Berlin & NRW. One contract, one invoice, one dashboard.",
      validation: (r) => r.max(160).warning("Keep under 160 characters"),
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description: "Used when the page is shared on social media. 1200×630px recommended.",
      options: { hotspot: true },
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "The page URL path. Leave empty to use the default.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Override the canonical URL if needed (e.g. for syndicated content).",
    }),
  ],
  preview: {
    select: { title: "metaTitle" },
    prepare: ({ title }) => ({ title: title || "SEO (no title set)" }),
  },
});
