import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'app/page.tsx', 'app/ia/page.tsx', 'app/servicos/page.tsx',
  'app/cases/page.tsx', 'app/insights/page.tsx', 'app/contato/page.tsx',
  'app/privacidade/page.tsx', 'app/sitemap.ts', 'app/robots.ts',
  'app/api/contact/route.ts', 'lib/content.ts', 'lib/seo-content.ts',
];
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Arquivos/rotas obrigatórios ausentes:');
  for (const file of missing) console.error(` - ${file}`);
  process.exitCode = 1;
} else {
  console.log(`OK: ${required.length} arquivos/rotas essenciais presentes.`);
}

const content = fs.readFileSync(path.join(root, 'lib/seo-content.ts'), 'utf8');
for (const [name, expected] of [['IA', 3], ['serviços empresariais', 6]]) {
  const section = name === 'IA'
    ? content.split('export const aiLandingPages: LandingContent[] = [')[1]?.split('];')[0]
    : content.split('export const enterpriseLandingPages: LandingContent[] = [')[1]?.split('];')[0];
  const slugs = [...(section ?? '').matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (slugs.length < expected || duplicates.length) {
    console.error(`Falha no catálogo ${name}: encontrados ${slugs.length} slugs; duplicados: ${duplicates.join(', ') || 'nenhum'}`);
    process.exitCode = 1;
  } else {
    console.log(`OK: catálogo ${name} possui ${slugs.length} slugs sem duplicação.`);
  }
}
