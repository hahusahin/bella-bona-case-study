import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "i8ip3kk3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityConfig = defineConfig({
  name: "bella-bona",
  title: "Bella&Bona CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Homepage — English")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
                  .title("Homepage (EN)")
                  .views([S.view.form()])
              ),
            S.listItem()
              .title("Homepage — Deutsch")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage-de")
                  .title("Homepage (DE)")
                  .views([S.view.form()])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
