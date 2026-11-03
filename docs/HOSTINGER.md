# Deploy to Hostinger

Verified against official documentation on November 3, 2026. UI labels, plan names, and entitlements can change; confirm in the owner’s account before purchase or connection.

## Simple static upload

This is the baseline and works without a persistent Node server on the host.

1. In the exported, configured site run npm ci, npm run verify:launch, npm run check, and npm run build with Node 24.
2. Keep a dated backup of the current document root or download the previous deployment artifact. On an existing website, establish a rollback before replacement.
3. In Hostinger hPanel, select the confirmed domain and open its File Manager. Identify that domain’s actual document root (commonly public_html; addon domains may differ).
4. Upload the **contents** of dist/, not the dist directory itself. An index.html should sit at the document root. A ZIP may be uploaded and extracted there. Do not upload source, .env, .git, or node_modules. Do not delete unrelated mail/configuration files.
5. Confirm HTTPS and the domain configuration. Check home, /buyers/, /sellers/, /about/, /contact/, /blog/, a post, /robots.txt, /sitemap-index.xml, and /rss.xml. Check a nonexistent URL; configure the domain’s 404 handling to use 404.html if it is not already doing so.
6. Rebuild and upload after each change. Remove stale files belonging to earlier deployments when necessary, with a backup and a scoped inventory; simply uploading cannot remove a deleted old post.

The CI workflow also stores a website-dist artifact downloadable from GitHub Actions. It contains the built site. Verify which commit produced an artifact before uploading.

## Managed GitHub build integration

Hostinger offers Astro support in its managed application workflow on compatible plans. Check current entitlements and actual UI in the owner’s account. Where available, authorize the Hostinger GitHub integration for the specific owner repository, including private-repository access. A public-repository URL import is not a substitute for granting private-repo access. Configure the root directory as the exported site root, Node 24, install `npm ci`, build `npm run build`, and static output `dist`. This project has no SSR adapter and requires no application start command.

If the integration cannot access a private repo or does not support the expected static-output workflow, use the static-upload path; do not make an owner’s repo public just to deploy it. This repository does not include a Hostinger API/SFTP deployment job or claim that credentials, domain purchase, or DNS setup are automatic.

## Domain and rollback

Set src/agent.config.json siteUrl to the exact production HTTPS origin before building. Follow Hostinger’s domain-specific DNS instructions; do not guess nameservers or disrupt existing email records. Keep old artifacts and reverse a failed deployment by restoring the previous build. A Git revert plus a fresh build/deploy is also valid. Deleting a Git commit alone does not roll back hosting.

Sources: [Astro’s Hostinger deployment guide](https://docs.astro.build/en/guides/deploy/hostinger/) and [Hostinger’s managed Node/application guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).
