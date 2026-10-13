# V4 — Arquitetura e implementação profissional

## O que foi implementado

### Front-end
- Next.js App Router
- TypeScript strict
- Server Components por padrão
- Client Components somente para interações
- Design System V3 convertido em componentes reutilizáveis
- Header responsivo com menu mobile
- Hero com ecossistema IA
- Cards de serviços, cases e insights
- Metodologia visual
- Seções internas com Page Hero
- Animações de entrada com IntersectionObserver
- `prefers-reduced-motion`

### SEO técnico
- `metadata` por página
- canonical base via `metadataBase`
- Open Graph e Twitter metadata
- JSON-LD de Organization
- `sitemap.xml` dinâmico
- `robots.txt` dinâmico
- URLs curtas e semânticas
- `lang="pt-BR"`

### Conversão
- CTA persistente no header
- CTA contextual nas páginas
- Formulário de contato com:
  - validação server-side
  - honeypot anti-spam
  - consentimento explícito
  - resposta de sucesso/erro
  - integração preparada para Resend

### Arquitetura de conteúdo
O conteúdo inicial está em `lib/content.ts`. Isso é deliberado: o site pode entrar em produção rapidamente sem CMS, mas a camada editorial já está separada da apresentação.

A próxima troca pode ser:

`lib/content.ts` → `lib/cms.ts` → CMS headless

sem reescrever os componentes de apresentação.

## Decisões importantes

1. **IA é o eixo de posicionamento**, não a única capacidade da empresa.
2. **Tecnologia empresarial continua visível**, preservando a credibilidade construída pela UNIDAX.
3. **Cases não inventam resultados.** O detalhamento deve ser publicado somente após validação/autorização.
4. **A imagem hero atual é provisória.** Ela foi derivada do conceito visual V3 para manter a experiência funcionando; em produção deve ser substituída por ativo próprio/licenciado.
5. **O formulário não finge estar conectado.** Sem `RESEND_API_KEY`, a API retorna configuração pendente em vez de descartar o lead silenciosamente.

## Checklist antes do go-live

- [ ] Definir domínio canônico final
- [ ] Configurar DNS e HTTPS
- [ ] Configurar e-mail transacional e SPF/DKIM/DMARC
- [ ] Configurar `RESEND_API_KEY`, `CONTACT_FROM` e `CONTACT_TO`
- [ ] Substituir hero provisório
- [ ] Publicar Política de Privacidade revisada pelo jurídico
- [ ] Definir ferramenta de analytics e consentimento LGPD
- [ ] Conectar Google Search Console
- [ ] Criar favicon, OG image e ícones finais
- [ ] Publicar primeiros artigos reais
- [ ] Publicar cases autorizados
- [ ] Adicionar BreadcrumbList e Article schema nos conteúdos editoriais
- [ ] Implementar rate limiting distribuído no endpoint de contato
- [ ] Executar Lighthouse e corrigir Core Web Vitals
- [ ] Executar auditoria WCAG/axe
- [ ] Testar formulários, navegação mobile e links
- [ ] Criar pipeline CI com typecheck, lint e build
