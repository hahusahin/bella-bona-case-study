import { createClient } from "next-sanity";

// NEXT_PUBLIC_ vars are safe to hardcode as fallback — they're public by design.
// SANITY_API_READ_TOKEN is server-only and must be set in .env.local / Vercel env vars.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "i8ip3kk3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

// Server-side client with read token — used for SSR/ISR data fetching
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Always fresh on server; CDN is fine for public data
  token: process.env.SANITY_API_READ_TOKEN,
});

// Public client (no token) — safe to use in client components if needed
export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
