# Bella&Bona — Homepage Case Study

---

## Live

| | URL |
|---|---|
| **Website** | https://bella-bona-case-study.vercel.app |
| **Sanity Studio** | https://bellabona-casestudy.sanity.studio |

> Sanity Studio link requires my Sanity credentials to run locally — content is fetched from a private dataset, so there's no way to run it without my API token.

---

## Key decisions

### Rendering strategy

I didn't want the server to hit Sanity on every page request — that would be slow. But I also didn't want a fully static page that never picks up content changes. The middle ground is ISR (Incremental Static Regeneration): the page is built once, cached, after 1 hour, the cache refreshes in the background. Visitors never wait for a rebuild, and content changes are live within the hour.

In previous Next.js versions you'd do this by writing `export const revalidate = 3600` at the top of a page file. Next.js 16 removed that approach and replaced it with explicitly marking the data-fetching function with `'use cache'` and `cacheLife('hours')`. 

### React Server Components

I kept almost every component as "server component" which Next.js renders a component by default. The only components that run in the browser are the ones that need it: the Navbar (mobile menu state, active locale detection) and the scroll animation observer. Everything else is zero client-side JavaScript, which keeps the bundle small and the page visible before any scripts run.

### Animations

Sections below the fold fade in and slide up as you scroll. No animation library — pure CSS transitions, so there's no impact on page load time.

The hero section is left out of this intentionally. It's the first thing visitors see and the browser's LCP element, so it renders immediately at full opacity. Hiding it behind an animation would hurt the LCP score.

### Content management — Sanity setup and Studio placement

Sanity offers a few options for where the editing interface lives: a standalone Studio deployed to a separate URL (`yourproject.sanity.studio`), a fully self-hosted setup, or embedded directly inside the Next.js app. I went with embedded — the Studio runs at `/studio` within the same codebase, so there's one repo and one deployment to manage.

The downside is that Studio code ships with the production build. I handled that by blocking `/studio` in production with middleware, so it's not accessible from the live site. I also deployed a separate hosted Studio that enables editing content from sanity.io website.

### Internationalization (i18n)

The brief asked for English-only with visible i18n structure. I set up locale config, added hreflang tags, and built a `/de` route that fetches from a separate German Sanity document.

For the CMS I chose two completely separate documents — one for EN, one for DE — rather than mixing both languages into shared fields. Whoever manages German content works in their own document with no risk of overwriting English. The downside is that shared assets like logos get duplicated. The logical next step would be `next-intl` for proper URL-based routing (`/en/`, `/de/`) with automatic browser language detection.

### Technical SEO

Added:

- **Organization + LocalBusiness JSON-LD** structured data
- **hreflang** for `en`, `de`, and `x-default`
- **Canonical URL** configurable from Sanity
- **robots.txt** blocking `/studio/`
- **sitemap.xml** dynamically generated

---

## What I'd do differently

**Instant cache clearing on publish.** Currently a content change in Sanity takes up to an hour to appear on the site. That's fine for most things, but for time-sensitive updates it's not ideal. A Sanity webhook which revalidates the page on every publish would reflect the content update instantly.

**Proper i18n with next-intl.** The content is translated through Sanity, but UI strings like aria-labels and button text are still hardcoded in English. I'd add `next-intl` to handle those, plus automatic browser language detection and proper `/en/` and `/de/` URL prefixes.

**Finish the full design.** The Figma has more detail than what I implemented. I focused on getting the architecture right, but given more time I'd finish all the design sections. 

**Fill in the German content.** The DE Sanity document and the `/de` route both work, but the fields are still empty as I didn't want to spend much time on it.

---

## Sanity Studio

The CMS has two independent documents — one per language — each with a tabbed form split by page section.

Some snapshots from Sanity Studio (as you do not have access to it):

<img width="1905" height="729" alt="image" src="https://github.com/user-attachments/assets/b2b376df-af8a-4064-9644-fd7928f5fff2" />
<img width="1905" height="788" alt="image" src="https://github.com/user-attachments/assets/ec02c641-7ac0-4171-b3cd-3eca0f3aff6e" />
<img width="1904" height="772" alt="image" src="https://github.com/user-attachments/assets/411a70f8-df7a-4154-a329-86a30b6f3c7f" />
<img width="1906" height="804" alt="image" src="https://github.com/user-attachments/assets/c0ede7e7-e32c-4bf0-846b-4b60e7bed203" />