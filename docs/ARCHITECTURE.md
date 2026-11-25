# Arquitetura técnica V4

## Princípios
1. App Router e Server Components por padrão.
2. Client Components apenas onde existe interação: menu, reveal e formulário.
3. Conteúdo editorial separado em `lib/content.ts` para facilitar a migração para CMS.
4. SEO técnico nativo do Next.js.
5. API de contato isolada em `/api/contact` com validação server-side.
6. Nenhum resultado de case é inventado; métricas dependem de autorização.

## Próxima evolução
- CMS headless para Insights e Cases.
- CRM/webhook para leads.
- Analytics com consentimento LGPD.
- Rate limiting distribuído e proteção anti-bot mais forte.
- Testes E2E e auditoria Lighthouse.
- Imagens hero/cases definitivas e otimização de mídia.
