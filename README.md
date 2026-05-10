# Bella&Bona — Homepage Case Study

Next.js 16 · Sanity v3 · Tailwind CSS v4 · TypeScript · Vercel

---

## Live URLs

| | URL |
|---|---|
| **Website** | _add Vercel URL after deployment_ |
| **Sanity Studio (hosted)** | https://bellabona-casestudy.sanity.studio |

---

## Running locally

```bash
pnpm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=i8ip3kk3
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<viewer token — sanity.io/manage → API → Tokens>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
pnpm dev
```

Site → `http://localhost:3000`  
Local Studio → `http://localhost:3000/studio`

---

## Editing content

Open `http://localhost:3000/studio` while `pnpm dev` is running.

After schema changes, redeploy the hosted Studio:

```bash
npx sanity deploy
```

### Sanity Studio

![Studio sidebar showing Homepage — English and Homepage — Deutsch](docs/studio-sidebar.png)

![Studio tabs: SEO, Navbar, Hero, Social Proof, Features, Final CTA, Footer](docs/studio-tabs.png)

![Features section](docs/studio-features.png)

![Footer section](docs/studio-footer.png)

---

## Key decisions

### Rendering — ISR via `'use cache'` + `cacheLife('hours')`

Next.js 16 replaces route-segment `export const revalidate` with an explicit `'use cache'` directive and `cacheLife()` profiles. The homepage fetch is marked `cacheLife('hours')`, giving a 1-hour freshness window (stale-while-revalidate) without an SSR hit on every request. On-demand invalidation can be added via a Sanity webhook calling `revalidateTag('homepage')`.

### Hero image — not animated (LCP protection)

The `.reveal` entrance animation (`opacity: 0 → 1`) is intentionally absent from the Hero section. Hiding the LCP element behind `opacity: 0` until JS hydration would directly hurt both LCP and CLS. All other sections animate on scroll via a lightweight `IntersectionObserver` (`RevealObserver.tsx`) with zero library weight — pure CSS transitions only.

> The hero image uses `preload={true} fetchPriority="high" loading="eager"` instead of the old `priority` prop, which was deprecated in Next.js 16.0.

### Sanity schema design

- SEO fields (`metaTitle`, `metaDescription`, `ogImage`, `canonicalUrl`) are in a **dedicated `seo` object** — never mixed with content fields, so editors don't have to scroll past technical fields to update copy.
- Rich-text areas use **Portable Text** so editors can format without touching code.
- The Studio form uses the **`groups` API** to render as tabs per section (Navbar / Hero / Social Proof / Features / Final CTA / Footer) instead of one long scroll.

### i18n — two independent Sanity documents

The brief asks for "English only, but i18n awareness visible in code structure." The approach:

- `src/config/i18n.ts` — `locales = ['en', 'de']`, `defaultLocale = 'en'`
- `src/locales/en.ts` + `src/locales/de.ts` — same key shape, different values
- **Two Sanity singleton documents** (`homepage` for EN, `homepage-de` for DE) — each editable independently, no field-level i18n complexity
- `app/de/page.tsx` fetches the DE document (falls back to EN if not populated) so `/de` returns a real page, not a 404
- `generateMetadata` adds `hreflang` for `en`, `de`, and `x-default`

Production upgrade path: move to `app/[locale]/page.tsx` with `next-intl` middleware.

### Technical SEO (added proactively)

- **Organization + LocalBusiness JSON-LD** structured data
- **hreflang** in both `layout.tsx` and `generateMetadata`
- **Canonical URL** driven by Sanity `seo.canonicalUrl`
- **`robots.txt`** disallows `/studio/`
- **`sitemap.xml`** dynamically generated

---

## What I'd add with more time

1. **Sanity webhook → `revalidateTag('homepage')`** — published changes reflect instantly instead of waiting up to 1 hour
2. **`next-intl` middleware** for proper `/en/` and `/de/` URL routing
3. **Sanity Live Preview** so editors see unpublished changes in real time
4. **Vercel Analytics** for real Core Web Vitals against the deployed URL
