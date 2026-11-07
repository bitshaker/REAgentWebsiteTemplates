# REAgentWebsiteTemplates

Agent-friendly Astro websites for independent real estate professionals. Thirteen designs, one shared content model, and a clean export containing only your chosen design.

**Status:** working starter, with demo identity and sample content. No hosting account or live agent website is created automatically.

## Browse and start your own site

[Browse all sample sites](https://bitshaker.github.io/REAgentWebsiteTemplates/) · [Get started with your own agent](https://bitshaker.github.io/REAgentWebsiteTemplates/start/)

Choose **Use this design** for a single-design starter ZIP and a copyable software-agent setup prompt. Your agent helps with GitHub, your own private repository, Hostinger hosting and MCP connection, personalization and launch. After export, the site is independent of this catalog. [Full setup guide](docs/GET-STARTED.md) · [Catalog hosting](docs/GITHUB-PAGES.md).

## Choose a design

| Design                                        | Direction                                                                  |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| Coastal                                       | Warm ivory, sage, serif typography, arched architectural illustration      |
| Editorial                                     | Warm paper, oversized headlines, architectural journal layout              |
| Modern                                        | Deep green, bold typography, split-screen composition                      |
| The Threshold (`threshold`)                   | A front door opens into a buyer path; sellers get a separate plan          |
| The Neighborhood Atlas (`neighborhood-atlas`) | Illustrated map, interactive service-area index, cobalt and parchment      |
| Golden Hour (`golden-hour`)                   | Scroll-driven interior film, plum and honey, and an agent introduction     |
| The Open House (`open-house`)                 | Illustrated cutaway with selectable rooms, lavender and citron             |
| The Listing Studio (`listing-studio`)         | Editorial property campaign, sample floor plan, blush and moss             |
| Blueprint (`blueprint`)                       | Mint drafting grid, animated house elevation, and buyer/seller plan sheets |
| Constellation (`constellation`)               | Night-sky palette, morphing star shapes, and glass panels                  |
| Four Doors (`four-doors`)                     | Four expanding photographic entryways                                      |
| Workshop Editorial (`workshop-editorial`)     | Oversized magazine type, rotating photos, and stacked features             |
| Workshop Golden Hour (`workshop-golden-hour`) | Lake footage and four chapters from sunrise to twilight                    |

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro, then visit `/designs/` for home, buyer, seller, about, journal, and contact previews. Every design includes generated cover art for its buyer, seller, about, and journal pages. Select homepages also use original illustrations or licensed stock footage. See each design’s `media/CREDITS.md` where applicable and replace sample imagery with your own licensed media as desired. No fabricated listings, reviews, or sales claims are included.

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

Replace `coastal` with any design ID from the table. The exporter copies shared functionality and exactly one design. It excludes this repository’s history, dependencies, catalog, preview routes, and unused designs. GitHub’s “Use this template” button copies the entire catalog; use the exporter for a lean agent site.

Edit **`src/agent.config.json`** for identity, brokerage, license, contact details, service areas, canonical URL, and content preferences. This is public site information, not secrets. Change the palette at the top of `src/design/theme.css`. Replace page cover art and edit its alt text in `src/design/pages.ts`. To add your actual headshot to the homepage and About page, put it under `public/images/` and set `portraitUrl` (for example, `/images/headshot.jpg`). The generated demo portrait disappears when demo mode is off.

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
- CI checks/build artifacts and Hostinger MCP/CLI setup, deployment, and maintenance runbooks.

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

Prefer Hostinger’s official MCP connection (`https://mcp.hostinger.com`, browser OAuth) so your software agent can discover hosting resources and perform supported setup, deployment, and maintenance. Local agents can also deploy `dist/` using the official Hostinger CLI. File Manager upload and compatible GitHub build integrations remain alternatives. The deployed site needs no Node process. [Deployment and rollback](docs/HOSTINGER.md) · [Launch checklist](docs/LAUNCH-CHECKLIST.md) · [Architecture and adding designs](docs/ARCHITECTURE.md).

MIT licensed. No IDX/MLS integration, hosted CMS, live property feed, email delivery, analytics, or lead database is bundled. Contact uses working phone/email links. Accounts, purchases, domain ownership, and provider authorization remain with the owner.
