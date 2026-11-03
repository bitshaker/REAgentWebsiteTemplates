# REAgentWebsiteTemplates

Agent-friendly Astro websites for independent real estate professionals. Three designs, one shared content model, and a clean export containing only your chosen design.

**Status:** working starter, with demo identity and sample content. No hosting account or live agent website is created automatically.

## Choose a design

| Design    | Direction                                                             |
| --------- | --------------------------------------------------------------------- |
| Coastal   | Warm ivory, sage, serif typography, arched architectural illustration |
| Editorial | Warm paper, oversized headlines, architectural journal layout         |
| Modern    | Deep green, bold typography, split-screen composition                 |

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro, then visit `/designs/` for full-page previews. Illustrations are original SVG assets included under the repository license; replace them with your own licensed property photography if desired. No fabricated listings, reviews, or sales claims are included.

## Start a lightweight site

Requires Node 24 LTS (or a supported even-numbered Node release meeting Astro’s minimum of 22.23.4), npm, and Git.

```sh
git clone https://github.com/bitshaker/REAgentWebsiteTemplates.git
cd REAgentWebsiteTemplates
npm ci
npm run create-site -- coastal ../my-agent-site
cd ../my-agent-site
npm ci
npm run dev
```

Replace `coastal` with `editorial` or `modern`. The exporter copies shared functionality and exactly one design. It excludes this repository’s history, dependencies, catalog, preview routes, and unused designs. GitHub’s “Use this template” button copies the entire catalog; use the exporter for a lean agent site.

Edit **`src/agent.config.json`** for identity, brokerage, license, contact details, service areas, canonical URL, and content preferences. This is public site information, not secrets.

```sh
git init -b main
git add .
git commit -m "Create my real estate website"
gh repo create my-agent-site --private --source=. --remote=origin --push
```

New to GitHub or hosting? Start with [the owner guide](docs/OWNER-GUIDE.md). Using a software agent? Give it [AGENTS.md](AGENTS.md) and [the setup playbook](docs/AGENT-SETUP.md).

## Included

- Home, introduction, buyers, sellers, contact, blog, privacy starter, accessibility statement, and 404.
- Shared configuration, typed Markdown collections, draft/future post filtering, and RSS.
- Canonical URLs, page descriptions, Open Graph, sitemap, robots, and factual RealEstateAgent structured data after demo mode is disabled.
- Responsive layouts, semantic landmarks, keyboard focus, skip link, reduced-motion support, and self-hosted assets/system fonts.
- On-demand Node draft commands, optional AI API generation, and an opt-in weekly GitHub Actions draft artifact.
- CI checks/build artifacts and deployment documentation for Hostinger.

## Content commands

```sh
npm run content:new -- "Preparing your home for sale"
# Optional: copy .env.example to .env and set your provider key and model.
npm run content:generate -- "Questions to ask before buying a home"
# After reviewing the saved draft:
npm run content:publish -- questions-to-ask-before-buying-a-home
npm run check
npm run build
```

Your existing agent can write Markdown drafts directly without an API subscription. Generation is build tooling; no AI key goes to the browser. [Content and schedules](docs/CONTENT.md).

## Verify and deploy

```sh
npm test
npm run check
npm run build
# For configured agent sites, before first launch:
npm run verify:launch
```

Upload the **contents** of `dist/` to the domain’s Hostinger document root, or use a compatible Hostinger GitHub build integration. The deployed site needs no Node process. [Deployment and rollback](docs/HOSTINGER.md) · [Launch checklist](docs/LAUNCH-CHECKLIST.md) · [Architecture and adding designs](docs/ARCHITECTURE.md).

MIT licensed. No IDX/MLS integration, hosted CMS, live property feed, email delivery, analytics, or lead database is bundled. Contact uses working phone/email links. Accounts, purchases, domain ownership, and provider authorization remain with the owner.
