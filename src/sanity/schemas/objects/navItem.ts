import { defineField, defineType } from "sanity";

export const navItemObject = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "URL", type: "string", validation: (r) => r.required() }),
    defineField({ name: "isExternal", title: "Open in new tab", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
