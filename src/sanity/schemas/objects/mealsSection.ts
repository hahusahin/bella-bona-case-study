import { defineField, defineType } from "sanity";

export const mealsSectionObject = defineType({
  name: "mealsSection",
  title: "Meals Section",
  type: "object",
  fields: [
    defineField({ name: "sectionTitle", title: "Section Title", type: "string", initialValue: "30+ Meal Options Every Week. Made Fresh Daily. For Every Diet." }),
    defineField({ name: "downloadLabel", title: "Download Button Label", type: "string", initialValue: "Download the menu" }),
    defineField({ name: "downloadHref", title: "Download Button URL", type: "string" }),
    defineField({
      name: "meals",
      title: "Featured Meals",
      type: "array",
      description: "Add 6–8 meals to showcase. Displayed in a scrollable row.",
      of: [
        {
          type: "object",
          name: "mealItem",
          fields: [
            defineField({ name: "name", title: "Meal Name", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "image",
              title: "Meal Photo",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
            }),
            defineField({ name: "tag", title: "Diet Tag (e.g. Seasonal Special, Vegan)", type: "string" }),
            defineField({ name: "rating", title: "Rating (e.g. 4.9)", type: "string" }),
            defineField({ name: "reviewCount", title: "Review Count (e.g. 171 reviews)", type: "string" }),
          ],
          preview: { select: { title: "name", media: "image" } },
        },
      ],
    }),
  ],
});
