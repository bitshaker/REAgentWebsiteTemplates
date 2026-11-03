# Architecture and adding designs

The catalog is an Astro 7 static app using content collections with the glob loader. Public identity lives in a JSON file consumed by components and the Node tooling. Pages are shared; a design owns Home.astro and theme.css. Static content means low hosting requirements and no public API secrets. Content authoring runs in a local agent/Node process or GitHub Actions, separately from visitor requests.

- templates/ID/template.json: machine-readable design identity, description, version, and page coverage.
- templates/ID/Home.astro: home composition. Reference shared agent config and Services; do not hardcode personal data.
- templates/ID/theme.css: design tokens and composition styles. Core shared CSS handles common pages, navigation, and responsive accessibility basics.
- src/selected-template.ts: the catalog’s default design import. Preview routes select each catalog design.
- scripts/create-site.mjs: deliberate export allowlist and import rewriting. The output has src/design/ and no catalog or alternate designs.

## Add a design

Create its folder and manifest, Home.astro, and theme.css. Supply paper, ink, muted, accent, line, and display CSS variables. Use meaningful headings, good contrast, and mobile layouts. Keep primary shared-page links absolute from the site root. Include original/licensed assets and document their terms. Update the supported IDs in create-site.mjs, preview route, export tests, and README. Add full-page browser QA and build the exported site independently. Theme changes should not require duplicating config or the blog pipeline.

The current three designs share inner page structures while changing typography and palette; home compositions differ. No package publication, remote installer, visual CMS, IDX/MLS feed, or deploy bot is implied. A future CLI package can wrap the exporter once its release/version/update contract is established. For now, clone the catalog and export a selected design using the documented command.
