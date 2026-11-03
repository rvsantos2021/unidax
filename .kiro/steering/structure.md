---
inclusion: always
---

# Project Structure

## Directory Overview

```
app/              Next.js App Router — pages and API routes
components/       Shared UI components
lib/              Data layer and content utilities
studio/           Independent Sanity Studio (separate package.json — never import from app/)
public/           Static assets (images, favicon)
scripts/          Build/validation utilities
.kiro/            Kiro IDE configuration
```

## `app/` — Pages & Routes

| Path | Description |
|---|---|
| `layout.tsx` | Root layout: fonts, global metadata, JSON-LD org schema, SiteHeader, Footer, Analytics |
| `page.tsx` | Homepage — async Server Component, fetches cases + insights in parallel |
| `globals.css` | All site CSS — custom properties, component classes, animations. No CSS framework. |
| `robots.ts` / `sitemap.ts` | SEO metadata generation |
| `opengraph-image.tsx` | Dynamic OG image |
| `error.tsx` / `not-found.tsx` | Error boundary and 404 |
| `api/contact/route.ts` | POST — lead capture: Zod validation, Resend email, optional CRM webhook |
| `cases/` | Cases index + `[slug]` detail |
| `contato/` | Contact page |
| `empresa/` | About page |
| `ia/` | AI services index + `[slug]` SEO landing pages |
| `insights/` | Insights index + `[slug]` article pages |
| `obrigado/` | Post-form thank-you page |
| `privacidade/` | Privacy policy |
| `servicos/` | Enterprise services index + `[slug]` SEO landing pages |

## `components/`

| File | Type | Description |
|---|---|---|
| `site-header.tsx` | Client | Sticky nav, scroll-aware, mobile toggle, keyboard Escape |
| `contact-form.tsx` | Client | Form with UTM/attribution capture, honeypot field, `generate_lead` dataLayer push |
| `analytics.tsx` | Client | LGPD consent banner + GA4 script injection |
| `reveal.tsx` | Client | IntersectionObserver scroll-reveal (respects `prefers-reduced-motion`) |
| `footer.tsx` | Server | Site footer |
| `page-hero.tsx` | Server | Reusable hero section |
| `icons.tsx` | Server | Inline SVG icon components |
| `seo/json-ld.tsx` | Server | JSON-LD structured data component |
| `seo/landing-page.tsx` | Server | Shared layout for SEO landing pages |

**Default to Server Components.** Use `"use client"` only when browser APIs or interactivity are strictly required.

## `lib/`

| File | Description |
|---|---|
| `content.ts` | Static/fallback content as typed TypeScript constants (`site`, `stats`, `aiServices`, `cases`, `insights`, etc.). Types `Case` and `Insight` are defined here. Always available — no external dependency. |
| `cms.ts` | CMS adapter — queries Sanity via raw `fetch` + GROQ; falls back to `content.ts` if Sanity is unconfigured or returns empty. Marked `server-only`. Never call from Client Components. |
| `seo-content.ts` | `LandingContent` data for all SEO landing pages: 3 AI service pages + 6 enterprise service pages. Consumed by `/ia/[slug]` and `/servicos/[slug]`. |

## `studio/`

Independent Sanity Studio. **Never import from `studio/` inside `app/` or `components/`.** It is excluded from `tsconfig.json` compilation — keep it that way. Schema defines two document types: `insight` and `caseStudy`.

## `scripts/`

`check-routes.mjs` — pre-deploy integrity check: verifies required page files exist and slug catalogs in `seo-content.ts` are consistent. **Run before every deploy.**

## Key Conventions

- **Path alias**: `@/` resolves to the repo root — always use it (e.g., `@/lib/content`, `@/components/icons`). Never use relative `../` imports across top-level directories.
- **File naming**: kebab-case for files, PascalCase for component and function names.
- **Exports**: named exports in `components/` and `lib/`; default exports only for Next.js page files.
- **Adding a new SEO landing page**: add an entry to the appropriate array in `lib/seo-content.ts`, create the page file, then run `npm run check:routes` to verify consistency.
- **All CSS lives in `app/globals.css`**: do not create separate CSS files or introduce CSS-in-JS or utility class libraries.
- **Data flow**: pages fetch via `lib/cms.ts` (server-side); `lib/cms.ts` falls back to `lib/content.ts`. Never fetch Sanity directly from a component.
