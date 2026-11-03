import { cp, mkdir, readFile, writeFile, rm, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
export async function createSite(template, destination) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  if (!['coastal', 'editorial', 'modern'].includes(template))
    throw new Error('Choose coastal, editorial, or modern.');
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
    '.github',
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
  await rm(join(target, 'src/pages/preview'), { recursive: true, force: true });
  await rm(join(target, 'src/pages/designs.astro'));
  await mkdir(join(target, 'src/design'));
  for (const file of ['Home.astro', 'theme.css', 'template.json'])
    await cp(
      join(root, 'templates', template, file),
      join(target, 'src/design', file),
    );
  const homePath = join(target, 'src/design/Home.astro');
  await writeFile(
    homePath,
    (await readFile(homePath, 'utf8'))
      .replace('../../src/lib/agent', '../lib/agent')
      .replace(
        '../../src/components/Services.astro',
        '../components/Services.astro',
      ),
  );
  await writeFile(
    join(target, 'src/selected-template.ts'),
    "export { default as Home } from './design/Home.astro';\nimport './design/theme.css';\n",
  );
  const layout = join(target, 'src/layouts/Layout.astro');
  await writeFile(
    layout,
    (await readFile(layout, 'utf8')).replace(
      /<a\s+href=["']\/designs\/["'][^>]*>[\s\S]*?<\/a>/g,
      '',
    ),
  );
  const pkg = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'));
  pkg.name = 'my-real-estate-site';
  delete pkg.scripts['create-site'];
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
  await writeFile(
    join(target, 'README.md'),
    `# Your real estate website\n\nDesign: ${template}. Only this design is included.\n\nStart with [the owner guide](docs/OWNER-GUIDE.md), or give your software agent [AGENTS.md](AGENTS.md).\n\nRun npm ci, then npm run dev. Edit src/agent.config.json. Before launch, run npm run verify:launch, npm run check, and npm run build.\n`,
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
