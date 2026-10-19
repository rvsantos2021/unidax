# Product: UNIDAX Website

UNIDAX is a Brazilian B2B technology and AI consulting company. This repository is the institutional marketing website (v4.4.0), whose primary goal is **lead generation** via a contact form.

## What the site does

- Presents UNIDAX's two service portfolios:
  - **AI services**: custom AI development, strategic consulting, enterprise AI agents
  - **Enterprise services**: ERP/Dynamics, custom systems, Data & Analytics, Power Platform, Outsourcing, Support
- Publishes thought-leadership articles ("Insights") and client case studies ("Cases")
- Offers SEO-optimized landing pages for each service under `/ia/[slug]` and `/servicos/[slug]`
- Captures leads through a contact form that sends email via Resend and optionally forwards to a CRM webhook

## Business context

- Brazilian market, Portuguese (pt-BR) throughout — all copy, labels, metadata, and error messages must be in Portuguese
- Content is managed either as typed TypeScript constants (local fallback) or via Sanity CMS (optional)
- LGPD-compliant analytics: GA4 loads only after explicit user consent stored in `localStorage`
- No e-commerce, no authenticated user sessions, no backend database
