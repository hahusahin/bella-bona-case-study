# Bella&Bona — Homepage Case Study

---

## Live

| | URL |
|---|---|
| **Website** | https://bella-bona-case-study.vercel.app |
| **Sanity Studio** | https://bellabona-casestudy.sanity.studio |

> The project requires Sanity credentials to run locally. Content is fetched from a private Sanity dataset — there is no way to run the site without a project API token.

---

## Sanity Studio

The CMS is structured as two independent documents — one per language — each with a tabbed form so editors don't have to scroll through unrelated fields.

![Studio sidebar showing Homepage — English and Homepage — Deutsch](docs/studio-sidebar.png)

![Studio tabs: SEO, Navbar, Hero, Social Proof, Features, Final CTA, Footer](docs/studio-tabs.png)

![Features section](docs/studio-features.png)

![Footer section](docs/studio-footer.png)

---

## Key decisions

### Rendering — page is cached and auto-refreshed every hour

The homepage is cached at the CDN level and automatically re-fetched from Sanity every hour. This means the server doesn't rebuild the page on every visitor request, keeping it fast — while still picking up any content changes within an hour.

This uses Next.js 16's `'use cache'` + `cacheLife('hours')` instead of the older `export const revalidate` pattern, which was removed in v16. A Sanity webhook can be wired to `revalidateTag('homepage')` to flush the cache instantly on every publish.

### Animations — scroll-triggered, CSS only, zero JS library

As visitors scroll down the page, each section fades in and slides up. This is implemented with a single small component (`RevealObserver.tsx`) that uses the browser's built-in `IntersectionObserver` API to watch for elements entering the viewport, then adds a `.visible` CSS class to trigger the transition. All motion is plain CSS — no animation library, no impact on page load time.

The hero section is intentionally excluded from this animation. It is the first thing visitors see (and the browser's LCP element), so it renders immediately at full opacity without waiting for any JavaScript.

> The hero image uses `preload={true} fetchPriority="high" loading="eager"` — the correct Next.js 16 pattern. The old `priority` prop was deprecated in v16.0.

### Sanity schema design

- **SEO fields in a separate object** — `metaTitle`, `metaDescription`, `ogImage`, and `canonicalUrl` live in a dedicated `seo` group so content editors never accidentally scroll past them while updating page copy.
- **Portable Text for rich text** — editors can add bold, italic, and links without touching code.
- **Tabbed Studio form** — the document uses Sanity's `groups` API to split fields into tabs per section (Navbar / Hero / Social Proof / Features / Final CTA / Footer) instead of one long page.

### i18n — two independent documents, one per language

The brief asked for "English only, but i18n awareness visible in code structure."

- `src/config/i18n.ts` defines `locales = ['en', 'de']` and `defaultLocale = 'en'`
- `src/locales/en.ts` and `src/locales/de.ts` hold UI strings with the same key shape
- Two separate Sanity documents (`homepage` for EN, `homepage-de` for DE) — each edited independently, no shared fields that could accidentally overwrite the other language
- `/de` renders the German document and falls back to English if no German content is published yet
- `generateMetadata` outputs `hreflang` tags for `en`, `de`, and `x-default`

The production upgrade path is to move to `app/[locale]/page.tsx` routing with `next-intl` middleware, which would handle locale detection, redirects, and URL structure (`/en/`, `/de/`) automatically.

### Technical SEO

Added without being asked:

- **Organization + LocalBusiness JSON-LD** structured data on every page
- **hreflang** declared in both the root layout and `generateMetadata`
- **Canonical URL** pulled from Sanity `seo.canonicalUrl`
- **`robots.txt`** that disallows `/studio/`
- **`sitemap.xml`** dynamically generated from `app/sitemap.ts`
