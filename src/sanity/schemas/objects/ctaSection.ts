import { defineField, defineType } from "sanity";

export const ctaSectionObject = defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subheadline", title: "Subheadline (optional)", type: "text", rows: 2 }),
    defineField({
      name: "contactPersonImage",
      title: "Contact Person Photo",
      type: "image",
      description: "Photo shown in the left green card.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "contactPersonName", title: "Contact Person Name", type: "string" }),
    defineField({ name: "contactPersonTitle", title: "Contact Person Job Title", type: "string" }),
    defineField({ name: "ctaLabel", title: "Button Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ctaHref", title: "Button URL", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "headline" },
  },
});
