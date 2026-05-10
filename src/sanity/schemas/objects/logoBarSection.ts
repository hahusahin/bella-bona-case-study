import { defineField, defineType } from "sanity";

export const logoBarSectionObject = defineType({
  name: "logoBarSection",
  title: "Logo Bar / Social Proof",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Loved by +200 customers" }),
    defineField({
      name: "logos",
      title: "Client Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Company Name", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: false },
              fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
            }),
            defineField({ name: "url", title: "Company URL (optional)", type: "url" }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        },
      ],
    }),
  ],
});
