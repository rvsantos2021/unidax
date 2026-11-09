---
inclusion: always
---

# Product: UNIDAX Website

UNIDAX is a Brazilian B2B technology and AI consulting company. This repository is the institutional marketing website (v4.4.0). The primary business goal is **lead generation** — every page must have a clear path to the contact form at `/contato`.

## Service Portfolios

| Area | Route | Services |
|---|---|---|
| AI | `/ia/[slug]` | Custom AI development, strategic consulting, enterprise AI agents |
| Enterprise | `/servicos/[slug]` | ERP/Dynamics, custom systems, Data & Analytics, Power Platform, Outsourcing, Support |

## Content Features

- SEO-optimized landing pages per service (`lib/seo-content.ts`)
- Thought-leadership articles: "Insights" (`/insights/[slug]`)
- Client success stories: "Cases" (`/cases/[slug]`)
- Contact form: Resend email delivery + optional CRM webhook forwarding

## Non-Negotiable Rules

### Language
All user-facing text — copy, labels, placeholders, error messages, `aria-label`, `alt` text, metadata — **must be in Portuguese (pt-BR)**. Never output English in the UI.

### Lead Capture
Do not remove or obscure CTAs that drive to `/contato`. Every page must offer a conversion path.

### LGPD / Analytics
GA4 loads **only after explicit user consent** stored in `localStorage`. Never inject analytics scripts unconditionally. This is handled in `components/analytics.tsx` — do not bypass it.

### Content / Data Layer
- `lib/content.ts` — typed TypeScript constants; always available, no external dependency.
- `lib/cms.ts` — Sanity adapter (server-only); **always falls back to `lib/content.ts`** when Sanity is unconfigured or returns empty.
- Pages fetch via `lib/cms.ts`. Never query Sanity directly from a component, and never assume Sanity is configured.

### Scope Constraints
- **No e-commerce, no authentication, no backend database.** The site is stateless from the user's perspective.
- **No imports from `studio/`** inside `app/` or `components/`. The Sanity Studio is an independent project.
- **No CSS framework.** All styles live in `app/globals.css` using custom CSS properties.
- **Server Components are the default.** Add `"use client"` only when browser APIs or interactivity are strictly required.
