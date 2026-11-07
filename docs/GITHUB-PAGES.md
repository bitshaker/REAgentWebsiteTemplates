# Publishing the design catalog

The public catalog is hosted at https://bitshaker.github.io/REAgentWebsiteTemplates/.

.github/workflows/pages.yml builds and deploys the catalog on main pushes or manual dispatch. GitHub Pages must use **GitHub Actions** as its source. The workflow obtains the origin and base path from actions/configure-pages, checks the project, builds all preview routes and packages each design into its own starter ZIP. It validates local links/assets and uploads the dist artifact for Pages deployment. Existing deployments remain available until a new deployment succeeds; earlier workflow artifacts/commits can be used for rollback.

For the equivalent local build:

```sh
CATALOG_SITE_URL=https://bitshaker.github.io CATALOG_BASE=/REAgentWebsiteTemplates npm run build:catalog
CATALOG_SITE_URL=https://bitshaker.github.io CATALOG_BASE=/REAgentWebsiteTemplates npm run verify:catalog
npm run preview
```

Open /REAgentWebsiteTemplates/ on the preview server. `zip` must be installed to package starter downloads (available on macOS and GitHub's Ubuntu runners). The catalog's / and /designs/ both show the collection. Each /start/DESIGN/ page links to /downloads/DESIGN.zip and supplies a tailored setup prompt. The shared sitePath helper prefixes public links; Astro handles imported media paths.

Owner exports remove this workflow, catalog-only routes/components/configuration and packaging scripts, and restore the selected design at /. They continue to build using src/agent.config.json siteUrl and root paths for their own domain. Do not enable the catalog's Pages workflow in owner repositories.

A public sample catalog retains demo labels and noindex directives. Production owner sites require reviewed identity/content and the launch checklist; demo noindex is not access control.
