import { defineField, defineType } from "sanity";

export const stepsSectionObject = defineType({
  name: "stepsSection",
  title: "3-Step Process Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Step Number (e.g. 01)", type: "string" }),
            defineField({ name: "title", title: "Step Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "image", title: "Step Image", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        },
      ],
      validation: (r) => r.max(3),
    }),
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Button URL", type: "string" }),
  ],
});
