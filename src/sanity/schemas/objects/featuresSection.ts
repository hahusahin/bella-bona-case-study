import { defineField, defineType } from "sanity";

export const featuresSectionObject = defineType({
  name: "featuresSection",
  title: "Features / Benefits Section",
  type: "object",
  fields: [
    defineField({ name: "sectionTitle", title: "Section Heading", type: "string", initialValue: "The #1 Perk That Actually Boosts Culture, Attendance, and ROI" }),

    // Three green stat cards (30-40%, 7.50€, 92%)
    defineField({
      name: "statCards",
      title: "Stat Cards (3 green cards)",
      type: "array",
      description: "The three highlighted stat cards. Shown with dark green background.",
      of: [
        {
          type: "object",
          name: "statCard",
          fields: [
            defineField({ name: "value", title: "Stat Value (e.g. 30-40%)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Stat Label (e.g. Attendance Boost)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),

    // Bullet feature list
    defineField({
      name: "featureList",
      title: "Feature Bullet List",
      type: "array",
      description: "Checkmark bullet points shown below the stat cards.",
      of: [{ type: "string" }],
    }),

    // App / phone mockup image
    defineField({
      name: "appImage",
      title: "App / Phone Mockup Image",
      type: "image",
      description: "Phone screenshot shown beside the feature list.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),

    // CTA within the features section
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string", initialValue: "Get Custom Quote" }),
    defineField({ name: "ctaHref", title: "CTA Button URL", type: "string", initialValue: "#contact" }),
  ],
});
