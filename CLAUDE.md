@AGENTS.md

# Bella&Bona — Project Guide

## Stack
- **Next.js 16.2.6** — App Router only. Read `node_modules/next/dist/docs/` before writing code.
- **React 19.2.4** — Server Components by default; add `'use client'` only when truly needed
- **Tailwind CSS v4** — CSS-first config in `globals.css`, no `tailwind.config.js`
- **Sanity v3** — Studio embedded at `/studio`, schemas in `src/sanity/schemas/`
- **TypeScript 5** — strict mode enabled

## Required environment variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=i8ip3kk3
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<viewer token from sanity.io/manage>
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
```

## Project structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout: Figtree font, hreflang, Organization JSON-LD
│   ├── page.tsx                # Homepage: 'use cache' + cacheLife('hours') from Sanity
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml
│   └── studio/[[...tool]]/page.tsx  # Embedded Sanity Studio
├── components/
│   ├── layout/Navbar.tsx
│   ├── layout/Footer.tsx
│   └── sections/               # One file per homepage section
├── config/
│   └── i18n.ts                 # Locale config: ['en', 'de'], defaultLocale: 'en'
├── lib/
│   ├── sanity/client.ts        # Sanity client (server-side + public)
│   ├── sanity/queries.ts       # All GROQ queries
│   ├── sanity/image.ts         # imageUrlBuilder helper
│   └── seo/structured-data.ts # Organization + LocalBusiness JSON-LD
├── locales/
│   ├── en.ts                   # English UI strings
│   └── de.ts                   # German UI strings (same keys, DE values)
├── sanity/
│   ├── schemas/                # Sanity schema definitions
│   └── sanity.config.ts        # Studio config
└── types/sanity.d.ts           # TypeScript types for Sanity data
```

## Caching strategy (Next.js 16)
`cacheComponents: true` is set in `next.config.ts`. This means:
- Pages are **uncached by default** (SSR-equivalent)
- To cache, explicitly add `'use cache'` + `cacheLife('hours')` to the fetch function
- Do NOT use `export const revalidate` — it has no effect when cacheComponents is enabled
- On-demand invalidation: `revalidateTag('homepage')` in an API route

## i18n structure
- `src/config/i18n.ts` defines `locales = ['en', 'de']`
- All UI strings are in `src/locales/en.ts` and `src/locales/de.ts` (same keys)
- In the full project, use `src/app/[locale]/` routing with next-intl
- For this test: homepage at `/` with hreflang tags pointing to both locales
- hreflang added via `generateMetadata` → `alternates.languages`

## Sanity schema conventions
- **Document types**: `homepage` (one per locale in full project)
- **Object types**: `seo`, `navItem`, `heroSection`, `logoBarSection`, `featureItem`, `featuresSection`, `statsSection`, `ctaSection`
- **SEO fields always in a separate `seo` object** — never mixed with content fields
- Use **Portable Text** (`block` array) for any rich-text content

## Adding a new homepage section
1. Create object schema in `src/sanity/schemas/objects/`
2. Add field to `homepage.ts` document schema
3. Add the field to the GROQ query in `src/lib/sanity/queries.ts`
4. Add TypeScript type in `src/types/sanity.d.ts`
5. Create component in `src/components/sections/`
6. Import and render in `src/app/page.tsx`

## Image handling
- Hero image: `<Image preload={true} fetchPriority="high" loading="eager" />` (Next.js 16: `priority` is deprecated)
- All other images: default lazy loading, explicit `width`/`height` or `fill` + `sizes`
- Sanity images: use `urlFor(source).width(x).url()` from `src/lib/sanity/image.ts`

## Commands
```bash
pnpm dev      # Start dev server at http://localhost:3000
pnpm build    # Production build
pnpm lint     # ESLint
```
