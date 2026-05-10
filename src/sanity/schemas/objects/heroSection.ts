import { defineField, defineType } from "sanity";

export const heroSectionObject = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Offer Daily Lunch To Build Culture & Cut Costs",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "array",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [] }],
      description: "Rich text — supports bold/italic for emphasis.",
    }),
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string", initialValue: "Bestellung starten" }),
    defineField({ name: "ctaHref", title: "CTA Button URL", type: "string", initialValue: "#contact" }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Main hero photo (food/team). Displayed in the right panel on desktop.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (r) => r.required() })],
    }),
  ],
  preview: {
    select: { title: "headline", media: "heroImage" },
  },
});
