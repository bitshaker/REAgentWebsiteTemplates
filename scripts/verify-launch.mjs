import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
const agent = JSON.parse(await readFile('src/agent.config.json', 'utf8'));
const problems = [];
if (agent.demo)
  problems.push(
    'Set demo to false only after replacing the sample identity and reviewing content.',
  );
try {
  const url = new URL(agent.siteUrl);
  if (
    url.protocol !== 'https:' ||
    /(^|\.)(?:example\.(?:com|org|net)|localhost)$|\.(?:test|invalid|local)$/.test(
      url.hostname,
    ) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  )
    problems.push('Set your real HTTPS siteUrl.');
} catch {
  problems.push('Set a valid siteUrl.');
}
for (const field of [
  'name',
  'brand',
  'market',
  'email',
  'phone',
  'license',
  'brokerage',
])
  if (
    !agent[field] ||
    /example\.com|555|YOUR |Your |Alex Morgan|Morgan & Home/i.test(agent[field])
  )
    problems.push(`Replace sample ${field}.`);
for (const [key, value] of Object.entries(agent.address))
  if (!value || /Your /i.test(value)) problems.push(`Replace address.${key}.`);
if (
  !agent.serviceAreas.length ||
  agent.serviceAreas.some((a) => /Your /i.test(a))
)
  problems.push('Replace sample service areas.');
for (const link of agent.socialLinks) {
  try {
    if (!['https:', 'http:'].includes(new URL(link).protocol))
      throw new Error();
  } catch {
    problems.push('Use full HTTP(S) URLs for socialLinks.');
  }
}
if (agent.portraitUrl) {
  try {
    if (agent.portraitUrl.startsWith('src/assets/portraits/'))
      await access(agent.portraitUrl);
    else if (
      agent.portraitUrl.startsWith('/') &&
      !agent.portraitUrl.startsWith('//')
    )
      await access(join('public', agent.portraitUrl));
    else if (!['https:', 'http:'].includes(new URL(agent.portraitUrl).protocol))
      throw new Error();
  } catch {
    problems.push(
      'portraitUrl must point to an existing portrait asset/public image or full HTTP(S) image URL.',
    );
  }
}
if (agent.socialImage) {
  if (!agent.socialImageAlt?.trim())
    problems.push('Describe your socialImage in socialImageAlt.');
  try {
    if (
      agent.socialImage.startsWith('/') &&
      !agent.socialImage.startsWith('//')
    )
      await access(join('public', agent.socialImage));
    else if (!['https:', 'http:'].includes(new URL(agent.socialImage).protocol))
      throw new Error();
  } catch {
    problems.push(
      'socialImage must be an existing /public asset path or full HTTP(S) image URL.',
    );
  }
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    'Identity checks passed. Also complete docs/LAUNCH-CHECKLIST.md; automated checks cannot verify business details or legal copy.',
  );
