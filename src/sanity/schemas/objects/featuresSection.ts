import { defineField, defineType } from "sanity";

export const featuresSectionObject = defineType({
  name: "featuresSection",
  title: "Features / Benefits Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Section Heading",
      type: "string",
      initialValue: "The #1 Perk That Actually Boosts Culture, Attendance, and ROI",
    }),

    defineField({
      name: "statCards",
      title: "Stat Cards",
      type: "array",
      description: "Three highlighted stat cards with dark green background.",
      initialValue: [
        { _type: "statCard", _key: "stat1", value: "30-40%", label: "Attendance Boost", description: "Because nobody can say no to great food" },
        { _type: "statCard", _key: "stat2", value: "7,50 €", label: "Tax-free per meal", description: "Only pay for what's used" },
        { _type: "statCard", _key: "stat3", value: "92%", label: "Users use it daily", description: "Finally, a benefit everyone loves" },
      ],
      of: [
        {
          type: "object",
          name: "statCard",
          fields: [
            defineField({ name: "value", title: "Stat Value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Stat Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),

    defineField({
      name: "featureItems",
      title: "Feature Items",
      type: "array",
      description: "Each item shows a bold title and a description below it.",
      initialValue: [
        { _type: "featureItem", _key: "fi1", title: "30+ Daily Options for All Diets", description: "Halal, vegan, gluten-free — no one's left out." },
        { _type: "featureItem", _key: "fi2", title: "Employees Order by App. Zero Admin For You.", description: "No vouchers, no chasing, simply one invoice." },
        { _type: "featureItem", _key: "fi3", title: "100% Reusable Packaging. Zero Waste.", description: "Support ESG targets without extra effort." },
      ],
      of: [
        {
          type: "object",
          name: "featureItem",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),

    defineField({
      name: "appImage",
      title: "App / Phone Mockup Image",
      type: "image",
      description: "Phone screenshot shown on the left, beside the feature list.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
});
