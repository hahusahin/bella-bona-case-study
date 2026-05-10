import { defineField, defineType } from "sanity";

export const statsSectionObject = defineType({
  name: "statsSection",
  title: "Stats Section",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Stat Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value (e.g. 9/10)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      validation: (r) => r.max(4),
    }),
  ],
});
