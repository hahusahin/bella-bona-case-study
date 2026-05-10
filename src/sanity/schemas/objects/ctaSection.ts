import { defineField, defineType } from "sanity";

export const ctaSectionObject = defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Already a Bella&Bona customer?",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue: "Access the Support Center to manage orders, check your balance, or resolve questions about your account.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Button Label",
      type: "string",
      initialValue: "Go to Support Center",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "Button URL",
      type: "string",
      initialValue: "#support",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Section Image",
      type: "image",
      description: "Food or product photo shown on the right side.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  preview: {
    select: { title: "headline" },
  },
});
