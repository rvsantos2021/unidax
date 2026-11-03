---
inclusion: always
---

# Product: UNIDAX Website

UNIDAX is a Brazilian B2B technology and AI consulting company. This repository is the institutional marketing website (v4.4.0). The primary business goal is **lead generation** via a contact form.

## Service Portfolios

- **AI services** (`/ia/[slug]`): custom AI development, strategic consulting, enterprise AI agents
- **Enterprise services** (`/servicos/[slug]`): ERP/Dynamics, custom systems, Data & Analytics, Power Platform, Outsourcing, Support

## Key Features

- SEO-optimized landing pages for each service
- Thought-leadership articles ("Insights") and client case studies ("Cases")
- Contact form: sends email via Resend, optionally forwards to a CRM webhook

## Critical Rules

- **Language**: every user-facing string — copy, labels, metadata, error messages, aria labels — must be in **Portuguese (pt-BR)**. Never use English in UI output.
- **No e-commerce, no auth, no backend database** — the site is stateless from the user's perspective.
- **LGPD compliance**: GA4 must only load after explicit user consent stored in `localStorage`. Never load analytics scripts unconditionally.
- **Content source**: data comes from typed TypeScript constants in `lib/content.ts` (always available) or from Sanity CMS (optional, queried via raw `fetch` + GROQ in `lib/cms.ts`). The CMS layer always falls back to local constants — never assume Sanity is configured.
- **Lead capture is the conversion goal**: every page should have a clear path to the contact form. Do not remove or obscure CTAs that drive to `/contato`.

## What This Site Is Not

- Not a Sanity-driven app — the main Next.js app never imports from `studio/`
- Not a SPA — it uses Next.js App Router with Server Components as the default; Client Components are the exception
- Not styled with a CSS framework — all styles live in `app/globals.css` using custom CSS properties
