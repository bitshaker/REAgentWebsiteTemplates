import { readFile } from 'node:fs/promises';
const agent = JSON.parse(await readFile('src/agent.config.json', 'utf8'));
const problems = [];
if (agent.demo)
  problems.push(
    'Set demo to false only after replacing the sample identity and reviewing content.',
  );
try {
  const url = new URL(agent.siteUrl);
  if (url.protocol !== 'https:' || url.hostname === 'example.com')
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
if (agent.serviceAreas.some((a) => /Your /i.test(a)))
  problems.push('Replace sample service areas.');
if (problems.length) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    'Identity checks passed. Also complete docs/LAUNCH-CHECKLIST.md; automated checks cannot verify business details or legal copy.',
  );
