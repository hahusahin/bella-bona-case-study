"use client";

// Studio uses browser APIs (window, document) — must never be prerendered.
// In Next.js 16 with cacheComponents: true, dynamic import ensures this.
import dynamic from "next/dynamic";
import { sanityConfig } from "@/sanity/sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false }
);

// Embedded Sanity Studio at /studio — client component only, never indexed.
// Disallowed in robots.txt.
export default function StudioPage() {
  return <NextStudio config={sanityConfig} />;
}
