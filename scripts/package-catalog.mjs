import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createSite } from './create-site.mjs';
import { designIds } from './catalog.mjs';
const exec = promisify(execFile);
const output = resolve('dist/downloads');
await mkdir(output, { recursive: true });
const temp = await mkdtemp(join(tmpdir(), 'reagent-downloads-'));
try {
  for (const id of await designIds()) {
    const working = join(temp, id);
    await mkdir(working);
    await createSite(id, join(working, 'my-agent-site'));
    const archive = join(output, `${id}.zip`);
    await rm(archive, { force: true });
    await exec('zip', ['-qr', archive, 'my-agent-site'], { cwd: working });
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
