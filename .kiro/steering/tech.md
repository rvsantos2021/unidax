---
inclusion: always
---

# Tech Stack

## Core

| Layer | Technology |
|---|---|
| Framework | Next.js 15 — **App Router only**; no Pages Router |
| Language | TypeScript 5 — strict mode; no `any`, no `ts-ignore` |
| Runtime | Node.js (SSR + API routes) |
| React | 19 |
| Styles | Custom CSS only — `app/globals.css`; no CSS framework |
| Fonts | `next/font/google`: Manrope (`--font-manrope`) + Space Grotesk (`--font-space`) |

## Key Libraries

| Package | Purpose | Scope |
|---|---|---|
| `resend` | Transactional email | API route only |
| `zod` | Schema validation | API routes only — never client-side |
| `sanity` | CMS Studio | `studio/` only — never imported in `app/` |

## Architecture Rules

- **Server Components are the default.** Add `"use client"` only when browser APIs or interactivity are strictly required — not for convenience.
- **`@/` path alias** resolves to the repo root. Always use it; never use relative `../` imports across top-level directories.
- **File naming**: kebab-case filenames, PascalCase for exported component and function names.
- **Exports**: named exports everywhere in `components/` and `lib/`; default exports only in `app/` page/layout files (Next.js requirement).
- **No new dependencies** without explicit approval. Use existing libraries (`zod` for validation, not `yup`/`joi`).
- **All CSS in `app/globals.css`** using custom CSS properties. No separate CSS files, no CSS-in-JS, no utility-class libraries.
- **All user-facing strings in pt-BR.** Copy, labels, error messages, and `aria-label` values must never be in English.

## Data Layer

Three files form the data layer — use them in this order of preference:

| File | Role | Notes |
|---|---|---|
| `lib/content.ts` | Static/fallback content | Typed TS constants; always available, no external deps |
| `lib/cms.ts` | CMS adapter (server-only) | Queries Sanity via raw `fetch` + GROQ; falls back to `lib/content.ts` automatically |
| `lib/seo-content.ts` | SEO landing page data | `LandingContent` entries for `/ia/[slug]` and `/servicos/[slug]` |

**Rules:**
- Always import from `lib/cms.ts`, never from the Sanity SDK directly.
- `lib/cms.ts` is marked `server-only` — never import it from Client Components.
- The CMS layer always falls back gracefully. Never assume Sanity is configured.
- Never import from `studio/` inside `app/` or `components/`.
- Pages fetch data server-side; components receive it as props.

## Adding an SEO Landing Page

1. Add an entry to the appropriate array in `lib/seo-content.ts`.
2. Create the page file under `app/ia/[slug]/` or `app/servicos/[slug]/`.
3. Run `npm run check:routes` to verify consistency.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Site base URL |
| `NEXT_PUBLIC_GA_ID` | No | GA4 ID — analytics disabled when absent |
| `SANITY_PROJECT_ID` | No | Enables Sanity; falls back to local content if absent |
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

**Pre-deploy sequence** (run in order):

```bash
npm ci
npm run check:routes
npm run typecheck
npm run lint
npm run build
```

## Next.js Config Highlights

- Security headers on all routes: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- `X-Powered-By` disabled; `reactStrictMode: true`; `compress: true`
- Image formats: AVIF + WebP
- **LGPD**: GA4 loads only after explicit user consent stored in `localStorage` — never unconditionally
