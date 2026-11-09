---
inclusion: always
---

# Project Structure

## Directory Overview

```
app/              Next.js App Router — pages and API routes
components/       Shared UI components
lib/              Data layer and content utilities
studio/           Independent Sanity Studio (separate package.json)
public/           Static assets (images, favicon)
scripts/          Build/validation utilities
.kiro/            Kiro IDE configuration
```

## `app/` — Pages & Routes

| Path | Description |
|---|---|
| `layout.tsx` | Root layout: fonts, global metadata, JSON-LD org schema, `SiteHeader`, `Footer`, `Analytics` |
| `page.tsx` | Homepage — async Server Component, fetches cases + insights in parallel |
| `globals.css` | **All** site CSS — custom properties, component classes, animations |
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
| `contact-form.tsx` | Client | UTM/attribution capture, honeypot field, `generate_lead` dataLayer push |
| `analytics.tsx` | Client | LGPD consent banner + GA4 script injection |
| `reveal.tsx` | Client | IntersectionObserver scroll-reveal (respects `prefers-reduced-motion`) |
| `footer.tsx` | Server | Site footer |
| `page-hero.tsx` | Server | Reusable hero section |
| `icons.tsx` | Server | Inline SVG icon components |
| `seo/json-ld.tsx` | Server | JSON-LD structured data |
| `seo/landing-page.tsx` | Server | Shared layout for SEO landing pages |
| `cta-section.tsx` | Server | Reusable CTA block driving users to `/contato` |
| `section-head.tsx` | Server | Section heading component |
| `stats-block.tsx` | Server | Key metrics/stats display |
| `dark-panel.tsx` | Server | Dark-background content panel |
| `insight-content.tsx` | Server | Article body renderer for insights |

**Server Components are the default.** Add `"use client"` only when the component needs browser APIs (DOM, `window`, event listeners) or React state/effects. Prefer passing data as props from a Server Component parent over fetching inside a Client Component.

## `lib/`

| File | Description |
|---|---|
| `content.ts` | Static/fallback content as typed TypeScript constants (`site`, `stats`, `aiServices`, `cases`, `insights`, etc.). Defines `Case` and `Insight` types. Always available — no external dependency. |
| `cms.ts` | Server-only CMS adapter. Queries Sanity via raw `fetch` + GROQ; falls back to `content.ts` when Sanity is unconfigured or returns empty. **Never import from Client Components.** |
| `seo-content.ts` | `LandingContent` data for SEO landing pages: 3 AI service slugs + 6 enterprise service slugs. Consumed by `/ia/[slug]` and `/servicos/[slug]`. |
| `metadata.ts` | Shared helpers for generating Next.js `Metadata` objects. |

## `studio/`

Sanity Studio — a **separate project** with its own `package.json`. Never import anything from `studio/` inside `app/`, `components/`, or `lib/`. It is excluded from `tsconfig.json` compilation. Schema defines two document types: `insight` and `caseStudy`.

## `scripts/`

`check-routes.mjs` — pre-deploy integrity check. Verifies required page files exist and that slug catalogs in `seo-content.ts` match the filesystem. Run via `npm run check:routes` before every deploy.

---

## Key Conventions

### Imports & Paths
- Always use the `@/` path alias (resolves to repo root): e.g. `@/lib/content`, `@/components/icons`.
- Never use relative `../` imports across top-level directories.

### File & Export Naming
- Files: `kebab-case` (e.g. `contact-form.tsx`).
- Components and functions: `PascalCase` / `camelCase`.
- Named exports in `components/` and `lib/`; default exports only in `app/` page/layout files (Next.js requirement).

### Styles
- All CSS lives in `app/globals.css` using custom CSS properties.
- Never create separate `.css` files, CSS modules, or CSS-in-JS. No utility-class libraries (Tailwind, etc.).

### Data Flow
- Pages fetch data server-side via `lib/cms.ts` only.
- `lib/cms.ts` falls back to `lib/content.ts` automatically — never assume Sanity is configured.
- Never query Sanity directly from a component or Client Component.

### Adding a New SEO Landing Page
1. Add an entry to the appropriate array in `lib/seo-content.ts`.
2. Create the page file under `app/ia/[slug]/` or `app/servicos/[slug]/`.
3. Run `npm run check:routes` to verify consistency.

### Content Language
Every user-facing string — copy, labels, metadata, error messages, aria labels — must be in **Portuguese (pt-BR)**.
