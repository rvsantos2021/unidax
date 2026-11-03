---
inclusion: always
---

# Tech Stack

## Core

| Layer | Technology |
|---|---|
| Framework | Next.js ^15.5.28 — **App Router only** |
| Language | TypeScript 5.9.3 — strict mode enabled |
| Runtime | Node.js (SSR + API routes) |
| React | 19.1.0 |
| Styles | Custom CSS only — `app/globals.css`; no CSS framework or UI library |
| Fonts | `next/font/google`: Manrope (`--font-manrope`) + Space Grotesk (`--font-space`) |

## Key Libraries

| Package | Version | Purpose |
|---|---|---|
| `resend` | 6.1.0 | Transactional email — contact/lead form only |
| `zod` | 4.1.12 | Schema validation — API routes only, not client-side |
| `sanity` | studio only | CMS SDK — lives in `studio/`, never imported in the main app |

## Architecture Rules

- **Server Components are the default.** Use Client Components (`"use client"`) only when browser APIs or interactivity are strictly required.
- **Path alias `@/`** resolves to the repo root. Use it everywhere — never use relative `../` imports across directories.
- **File naming**: kebab-case for files, PascalCase for exported component/function names.
- **Exports**: named exports in `components/` and `lib/`; default exports only in `app/` page files (Next.js requirement).
- **No CSS framework.** All styles go in `app/globals.css` using custom CSS properties. Do not introduce Tailwind, Bootstrap, or any utility-class library.
- **No new dependencies** without explicit user approval. Match the existing library choices (e.g., use `zod` for validation, not `yup` or `joi`).

## Content & Data Layer

- **`lib/content.ts`** — all static/fallback content as typed TypeScript constants. Always available; never depends on external services.
- **`lib/cms.ts`** — server-only CMS adapter. Queries Sanity via raw `fetch` + GROQ; falls back to `lib/content.ts` when Sanity is unconfigured or returns empty. Always import from `lib/cms.ts`, not from Sanity SDK directly.
- **`lib/seo-content.ts`** — `LandingContent` data for SEO landing pages (`/ia/[slug]` and `/servicos/[slug]`).
- The CMS layer **always** falls back gracefully. Never assume Sanity is configured.
- `studio/` is a separate project. **Never import from `studio/` in `app/` or `components/`.**

## Adding SEO Landing Pages

1. Add an entry to the appropriate array in `lib/seo-content.ts`.
2. Create the page file under `app/ia/[slug]/` or `app/servicos/[slug]/`.
3. Run `npm run check:routes` to verify consistency.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Site base URL |
| `NEXT_PUBLIC_GA_ID` | No | GA4 ID — analytics disabled when absent |
| `SANITY_PROJECT_ID` | No | Enables Sanity CMS; falls back to local content if absent |
| `SANITY_DATASET` | No | Defaults to `production` |
| `SANITY_API_VERSION` | No | Defaults to `2025-01-01` |
| `SANITY_API_TOKEN` | No | Authenticated/draft Sanity access |
| `RESEND_API_KEY` | Yes (prod) | Email delivery — API route returns 503 if absent |
| `CONTACT_TO` | No | Email recipient (default: `contato@unidax.com.br`) |
| `CONTACT_FROM` | No | Sender display name + address |
| `CRM_WEBHOOK_URL` | No | Optional CRM lead forwarding |

## Common Commands

```bash
npm run dev          # Local dev server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint — app/, components/, lib/
npm run typecheck    # tsc --noEmit
npm run check:routes # Validate page files + SEO slug catalogs
```

**Pre-deploy sequence:**
```bash
npm ci
npm run check:routes
npm run typecheck
npm run lint
npm run build
```

## Next.js Config

- Security headers on all routes: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- `X-Powered-By` disabled
- Image formats: AVIF + WebP
- `reactStrictMode: true`, `compress: true`
