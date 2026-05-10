import { defineField, defineType } from "sanity";

export const socialLinkObject = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Platform name (used as aria-label)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon (SVG or PNG, white on transparent)",
      type: "image",
      options: { hotspot: false },
    }),
  ],
  preview: {
    select: { title: "label", media: "icon" },
  },
});
