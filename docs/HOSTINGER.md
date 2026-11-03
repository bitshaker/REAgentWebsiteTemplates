# Deploy to Hostinger

Verified against official documentation on November 3, 2026. UI labels, plan names, and entitlements can change; confirm in the owner’s account before purchase or connection.

## Preferred: software agent with Hostinger MCP

Connect an MCP-capable assistant to Hostinger's remote server, `https://mcp.hostinger.com`, using the client's remote MCP settings and browser OAuth authorization. Hostinger Connector is another official setup option. The owner completes sign-in and grants access; credentials do not belong in this repository. For a local server, Hostinger also provides `@hostinger/mcp`; follow its current official configuration and supply `API_TOKEN` through the environment rather than committing it.

Hostinger documents tools for website deployment, deployment history/build logs, domains/DNS, and hosting services. Available operations and eligibility still depend on the connected account. Discover the actual tools before deciding an operation is unavailable. The support guide describes `search`, `execute`, and `multi-execute`; discover their current schemas instead of hardcoding operation names. Use `search` to find the relevant operations, inspect their inputs, then execute supported steps under the owner's authorization. Batch only independent operations.

For this starter, use the following runbook:

1. Read existing hosting resources and identify the intended website, domain, and plan. Reuse them where appropriate. Record the target identifiers without credentials.
2. Build and verify the selected exported site locally. Keep the previous deployment available for rollback.
3. Discover the connected tools for static deployment or the existing GitHub build integration. Deploy only this owner's built site or private source repository. If the MCP client cannot transfer local files, use the CLI path below; do not assume a browser-hosted assistant can read a local dist directory.
4. Inspect existing DNS and the provider's required changes before applying the minimal authorized changes. Preserve unrelated email records.
5. Follow returned deployment identifiers to completion, inspect errors/logs, and verify the public pages and HTTPS. Record the actual deployment method for maintenance and rollback.

The intended workflow is agent-driven provisioning, deployment, and maintenance after connection. Account creation, purchases, MFA, and new provider permissions still require owner participation where applicable. Do not infer authorization for purchases or unrelated resource changes from access to the tools.

## CLI alternative for local agents

Hostinger's official CLI can deploy static output directly. Install it using the current [CLI instructions](https://docs.hostinger.com/api-reference/cli), then authenticate through the browser:

```sh
hostinger auth login
hostinger auth status
hostinger hosting websites list
```

After building, substitute the confirmed domain below and inspect the deployment plan:

```sh
hostinger up ./dist --domain YOUR_CONFIRMED_DOMAIN --dry-run --format json
```

Once the target and replacement are authorized and rollback is prepared:

```sh
hostinger up ./dist --domain YOUR_CONFIRMED_DOMAIN --yes --format json
```

Deployments replace the website's files. Inspect the plan before using `--yes`; it does not establish owner authorization. Check the installed CLI's help and returned result rather than guessing flags. Its local `.hostinger/` link state is ignored by Git and must not be copied between owners.

For unattended CI, Hostinger documents `HOSTINGER_API_TOKEN` authentication and an explicit `--domain`; OAuth sessions and ignored local link state are workstation-specific. Store a token in the owner's CI secrets if they choose this approach. No unattended Hostinger deployment job is bundled here.

## File Manager fallback

Use this when MCP/CLI access is unavailable or the owner prefers a manual upload. Static hosting requires no persistent Node server.

1. In the exported, configured site run npm ci, npm run verify:launch, npm run check, and npm run build with Node 24.
2. Keep a dated backup of the current document root or download the previous deployment artifact. On an existing website, establish a rollback before replacement.
3. In Hostinger hPanel, select the confirmed domain and open its File Manager. Identify that domain’s actual document root (commonly public_html; addon domains may differ).
4. Upload the **contents** of dist/, not the dist directory itself. An index.html should sit at the document root. A ZIP may be uploaded and extracted there. Do not upload source, .env, .git, or node_modules. Do not delete unrelated mail/configuration files.
5. Confirm HTTPS and the domain configuration. Check home, /buyers/, /sellers/, /about/, /contact/, /blog/, a post, /robots.txt, /sitemap-index.xml, and /rss.xml. Check a nonexistent URL; configure the domain’s 404 handling to use 404.html if it is not already doing so.
6. Rebuild and upload after each change. Remove stale files belonging to earlier deployments when necessary, with a backup and a scoped inventory; simply uploading cannot remove a deleted old post.

The CI workflow also stores a website-dist artifact downloadable from GitHub Actions. It contains the built site. Verify which commit produced an artifact before uploading.

## Managed GitHub build integration

Hostinger offers Astro support in its managed application workflow on compatible plans. Check current entitlements and actual UI in the owner’s account. Where available, authorize the Hostinger GitHub integration for the specific owner repository, including private-repository access. A public-repository URL import is not a substitute for granting private-repo access. Configure the root directory as the exported site root, Node 24, install `npm ci`, build `npm run build`, and static output `dist`. This project has no SSR adapter and requires no application start command.

If the integration cannot access a private repo or does not support the expected static-output workflow, use MCP/CLI static deployment where available, or the File Manager fallback; do not make an owner’s repo public just to deploy it. Hostinger API/MCP support enables agent-driven hosting operations; this repository supplies the runbook rather than an authenticated integration or an unattended deployment job.

## Domain and rollback

Set src/agent.config.json siteUrl to the exact production HTTPS origin before building. Follow Hostinger’s domain-specific DNS instructions; do not guess nameservers or disrupt existing email records. Keep old artifacts and reverse a failed deployment by restoring the previous build. A Git revert plus a fresh build/deploy is also valid. Deleting a Git commit alone does not roll back hosting.

Documentation verification is not a live account/deployment test. No Hostinger account was connected while preparing this guide.

Sources: [Hostinger API MCP server](https://www.hostinger.com/support/11079316-hostinger-api-mcp-server/), [Connector capabilities](https://docs.hostinger.com/hostinger-connector/overview), [Hostinger CLI](https://docs.hostinger.com/api-reference/cli), [CLI scripting and deployment](https://docs.hostinger.com/api-reference/cli-scripting), [API authentication](https://docs.hostinger.com/api-reference/overview), [Astro’s Hostinger deployment guide](https://docs.astro.build/en/guides/deploy/hostinger/) and [Hostinger’s managed Node/application guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).
