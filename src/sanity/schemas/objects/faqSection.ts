import { defineField, defineType } from "sanity";

export const faqSectionObject = defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Section Heading", type: "string" }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "array",
              of: [{ type: "block" }],
              description: "Supports rich text.",
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
});
