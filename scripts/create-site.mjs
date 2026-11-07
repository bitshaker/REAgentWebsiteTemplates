import { cp, mkdir, readFile, writeFile, rm, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { designIds } from './catalog.mjs';
export async function createSite(template, destination) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const ids = await designIds();
  if (!ids.includes(template))
    throw new Error(`Choose a design: ${ids.join(', ')}.`);
  if (!destination) throw new Error('Supply a destination directory.');
  const target = resolve(destination);
  try {
    await access(target);
    throw new Error(
      'Destination already exists. Choose a new directory; nothing was overwritten.',
    );
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  await mkdir(target, { recursive: true });
  for (const file of [
    'src',
    'public',
    'docs',
    'scripts',
    'astro.config.mjs',
    'tsconfig.json',
    'package.json',
    'package-lock.json',
    '.gitignore',
    '.env.example',
    '.nvmrc',
    'AGENTS.md',
    'LICENSE',
    '.prettierrc.json',
    '.prettierignore',
  ])
    await cp(join(root, file), join(target, file), { recursive: true });
  // Owner repositories get only their own validation job. Catalog publishing
  // and any future catalog workflows must never be inherited by an export.
  await mkdir(join(target, '.github/workflows'), { recursive: true });
  await cp(
    join(root, '.github/owner-workflows/ci.yml'),
    join(target, '.github/workflows/ci.yml'),
  );
  await mkdir(join(target, 'docs/examples'), { recursive: true });
  await cp(
    join(root, '.github/workflows/content-draft.yml'),
    join(target, 'docs/examples/content-draft.yml'),
  );
  await rm(join(target, 'src/pages/preview'), { recursive: true, force: true });
  await rm(join(target, 'src/pages/designs.astro'));
  for (const file of [
    'src/pages/start',
    'src/catalog.config.json',
    'src/lib/onboarding.ts',
    'src/components/CatalogSetup.astro',
    'src/components/CatalogLinks.astro',
    'scripts/package-catalog.mjs',
    'scripts/verify-catalog.mjs',
    'docs/GET-STARTED.md',
    'docs/GITHUB-PAGES.md',
    'docs/REAL-ESTATE-DESIGN-INSPIRATION.md',
    'docs/DESIGN-COLLECTION.md',
    'docs/CALL-CONVERSION-AUDIT.md',
    'docs/design-collection-preview.jpg',
    'docs/research-real-estate-editorial.md',
    'docs/research-real-estate-luxury.md',
    'docs/research-real-estate-personal.md',
  ])
    await rm(join(target, file), { recursive: true, force: true });
  await writeFile(
    join(target, 'src/pages/index.astro'),
    `---
import Layout from '../layouts/Layout.astro';
import { Home } from '../selected-template';
---
<Layout><Home /></Layout>
`,
  );
  await cp(join(root, 'templates', template), join(target, 'src/design'), {
    recursive: true,
    filter: (source) =>
      source !== join(root, 'templates', template, 'preview.jpg'),
  });
  for (const file of ['Home.astro', 'pages.ts']) {
    const designPath = join(target, 'src/design', file);
    await writeFile(
      designPath,
      (await readFile(designPath, 'utf8')).replaceAll('../../src/', '../'),
    );
  }
  await writeFile(
    join(target, 'src/selected-template.ts'),
    "export { default as Home } from './design/Home.astro';\nexport { default as design } from './design/pages';\nexport { default as theme } from './design/theme.css?inline';\n",
  );
  const layout = join(target, 'src/layouts/Layout.astro');
  await writeFile(
    layout,
    (await readFile(layout, 'utf8'))
      .replace(
        "import CatalogLinks from '../components/CatalogLinks.astro';\n",
        '',
      )
      .replace('<CatalogLinks {previewBase} />', '')
      .replace(/<a\s+href=["']\/designs\/["'][^>]*>[\s\S]*?<\/a>/g, ''),
  );
  const pkg = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'));
  pkg.name = 'my-real-estate-site';
  delete pkg.scripts['create-site'];
  delete pkg.scripts['build:catalog'];
  delete pkg.scripts['verify:catalog'];
  delete pkg.scripts.test;
  delete pkg.scripts['test:exports'];
  await writeFile(
    join(target, 'package.json'),
    JSON.stringify(pkg, null, 2) + '\n',
  );
  const lock = JSON.parse(
    await readFile(join(target, 'package-lock.json'), 'utf8'),
  );
  lock.name = pkg.name;
  lock.packages[''].name = pkg.name;
  await writeFile(
    join(target, 'package-lock.json'),
    JSON.stringify(lock, null, 2) + '\n',
  );
  await rm(join(target, 'scripts/create-site.mjs'));
  await rm(join(target, 'scripts/catalog.mjs'));
  await writeFile(
    join(target, 'README.md'),
    `# Your real estate website\n\nDesign: ${template}. Only this design is included.\n\nStart with [the owner guide](docs/OWNER-GUIDE.md), or give your software agent [AGENTS.md](AGENTS.md). Follow [the personalization recipe](docs/PERSONALIZATION.md) to replace the headshot and update business details in one place.\n\nGitHub Actions checks and builds this site and saves a website-dist artifact. It does not publish a GitHub Pages site or deploy to hosting. Weekly draft generation is an inactive example in docs/examples/content-draft.yml; enable it only when requested, following [the content guide](docs/CONTENT.md).\n\nRun npm ci, then npm run dev. Edit src/agent.config.json. Before launch, run npm run verify:launch, npm run check, and npm run build. Builds automatically run SEO and structural quality checks. See [SEO setup](docs/SEO.md) and [accessibility/performance defaults](docs/OPTIMIZATION.md) for configuration, optimized headshots, validation, and search submission.\n`,
  );
  console.log(
    `Created ${target} with ${template} only. Next: cd into it, npm ci, npm run dev.`,
  );
  return target;
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  createSite(...process.argv.slice(2)).catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
