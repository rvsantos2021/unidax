# UNIDAX — V4.2

Site institucional B2B da UNIDAX, construído em Next.js + TypeScript, com design system da V3, refinamentos de produção da V4.1 e camada editorial/conversão da V4.2.

## Stack
- Next.js 15
- React 19
- TypeScript
- Next Font
- Zod
- Resend
- Sanity headless CMS opcional

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run typecheck
npm run lint
npm run build
```

## Conteúdo

Sem configuração de CMS, o site usa `lib/content.ts`.

Com Sanity:
- configure `SANITY_PROJECT_ID`
- configure `SANITY_DATASET`
- opcionalmente configure `SANITY_API_TOKEN`

O Studio independente fica em `studio/`.

## Leads

Configure:
- `RESEND_API_KEY`
- `CONTACT_TO`
- `CONTACT_FROM`
- `CRM_WEBHOOK_URL` (opcional)

O formulário captura atribuição de campanha e encaminha os dados para e-mail e, opcionalmente, CRM.

## Estrutura

```text
app/                    páginas e rotas
app/api/contact/        endpoint de conversão
components/             componentes de UI
lib/content.ts          fallback editorial local
lib/cms.ts              adapter headless CMS
studio/                 Sanity Studio independente
public/assets/          identidade e mídia
```
