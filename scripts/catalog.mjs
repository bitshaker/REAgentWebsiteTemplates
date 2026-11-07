import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('../templates/', import.meta.url));

export async function designIds() {
  const entries = await readdir(directory, { withFileTypes: true });
  const manifests = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async ({ name }) => {
        const files = await readdir(join(directory, name));
        if (
          !['template.json', 'Home.astro', 'theme.css', 'pages.ts'].every(
            (file) => files.includes(file),
          )
        )
          return undefined;
        const manifest = JSON.parse(
          await readFile(join(directory, name, 'template.json'), 'utf8'),
        );
        if (manifest.id !== name)
          throw new Error(`Design ID must match its folder: ${name}`);
        return name;
      }),
  );
  return manifests.filter(Boolean).sort();
}
