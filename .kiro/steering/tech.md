# Tech Stack

## Core

| Layer | Technology |
|---|---|
| Framework | Next.js ^15.5.28 — **App Router** |
| Language | TypeScript 5.9.3 (strict mode) |
| Runtime | Node.js (server-side rendering + API routes) |
| React | 19.1.0 |
| Styles | Custom CSS only — `app/globals.css`, no CSS framework or UI library |
| Fonts | Google Fonts via `next/font/google`: Manrope (`--font-manrope`) + Space Grotesk (`--font-space`) |

## Key Libraries

| Package | Purpose |
|---|---|
| `resend` 6.1.0 | Transactional email for lead/contact form |
| `zod` 4.1.12 | Server-side schema validation (API route only) |
| `sanity` (studio only) | Headless CMS — **not** used in the main app; main app hits Sanity API via raw `fetch` |

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Site base URL |
| `NEXT_PUBLIC_GA_ID` | No | GA4 measurement ID — analytics disabled if absent |
| `SANITY_PROJECT_ID` | No | Enables Sanity CMS — site works without it via local fallback |
| `SANITY_DATASET` | No | Defaults to `production` |
| `SANITY_API_VERSION` | No | Defaults to `2025-01-01` |
| `SANITY_API_TOKEN` | No | Authenticated/draft access for Sanity |
| `RESEND_API_KEY` | Yes (prod) | Contact form email delivery — returns 503 if absent |
| `CONTACT_TO` | No | Email recipient (default: `contato@unidax.com.br`) |
| `CONTACT_FROM` | No | Sender display name + address |
| `CRM_WEBHOOK_URL` | No | Optional CRM lead forwarding webhook |

## Common Commands

```bash
npm run dev          # Start local dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint on app/, components/, lib/
npm run typecheck    # tsc --noEmit (no emit, type-check only)
npm run check:routes # Validate required page files + SEO slug catalogs
```

**Recommended pre-deploy sequence:**
```bash
npm ci
npm run check:routes
npm run typecheck
npm run lint
npm run build
```

## Next.js Config highlights

- Security headers applied globally: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- `X-Powered-By` header disabled
- Image formats: AVIF + WebP
- `reactStrictMode: true`, `compress: true`

## Sanity Studio

Lives in `studio/` as a separate project with its own `package.json`. It is **not** part of the Next.js build. Run it independently. The main app does not import from `studio/`.
