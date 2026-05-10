import { defineField, defineType } from "sanity";

export const testimonialsSectionObject = defineType({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "items",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", validation: (r) => r.required() }),
            defineField({ name: "author", title: "Author Name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "company", title: "Company", type: "string" }),
            defineField({ name: "avatar", title: "Avatar", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "author", subtitle: "company" } },
        },
      ],
    }),
  ],
});
