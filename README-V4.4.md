# UNIDAX V4.4 — Validação e lançamento

Baseado na V4.3. A V4.4 adiciona versão de pacote, uma verificação estática de rotas/catálogos e um checklist de homologação e publicação.

## Comandos

```bash
npm ci
npm run check:routes
npm run typecheck
npm run lint
npm run build
```

Consulte `V4.4-VALIDACAO-E-LANCAMENTO.md` antes do deploy. O pacote não deve ser considerado pronto para produção até que build, integrações e testes manuais tenham sido executados em ambiente com dependências instaláveis.
