import { createImageUrlBuilder } from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "i8ip3kk3",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
