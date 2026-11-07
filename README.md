# REAgentWebsiteTemplates

Agent-friendly Astro websites for independent real estate professionals. Eight designs, one shared content model, and a clean export containing only your chosen design.

**Status:** working starter, with demo identity and sample content. No hosting account or live agent website is created automatically.

## Browse and start your own site

[Browse all sample sites](https://bitshaker.github.io/REAgentWebsiteTemplates/) · [Get started with your own agent](https://bitshaker.github.io/REAgentWebsiteTemplates/start/)

Choose **Use this design** for a single-design starter ZIP and a copyable software-agent setup prompt. Your agent helps with GitHub, your own private repository, Hostinger hosting and MCP connection, personalization and launch. After export, the site is independent of this catalog. [Full setup guide](docs/GET-STARTED.md) · [Catalog hosting](docs/GITHUB-PAGES.md).

## Choose a design

| Design                    | Direction                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| Forma (`forma`)           | Bold architectural photography, enormous typography, and a cinematic interior study                       |
| Neighborly (`neighborly`) | Cream and coral, neighborhood film, soft arches, and playful photographic collages                        |
| Still (`still`)           | Quiet editorial interiors, italic serif type, and a horizontal photographic gallery                       |
| Solstice (`solstice`)     | Coastal film, olive and sand, pill controls, and Mediterranean-inspired arches                            |
| Nocturne (`nocturne`)     | Obsidian and champagne, framed architectural film, and refined editorial spreads                          |
| Monogram (`monogram`)     | Oversized personal initials, sculptural type, and contrasting ink and parchment                           |
| Panorama (`panorama`)     | Panoramic interior film, ultra-thin typography, and photographic chapters driven by normal page scrolling |
| Atelier (`atelier`)       | Art-led lifestyle film, expressive serif type, and asymmetric editorial layouts                           |

These eight designs are the complete available collection. Design references and the eight selected inspirations are recorded in [the design brief](docs/DESIGN-COLLECTION.md).

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro, then visit `/designs/` for home, buyer, seller, about, journal, and contact previews. Every design includes coordinated imagery for its buyer, seller, about, and journal pages. The collection uses licensed stock photography and locally hosted stock films. See each design’s `media/CREDITS.md` where applicable and replace sample imagery with your own licensed media as desired. No fabricated listings, reviews, or sales claims are included.

## Start a lightweight site

Requires Node 24 LTS (or a supported even-numbered Node release meeting Astro’s minimum of 22.23.4), npm, and Git.

```sh
git clone https://github.com/bitshaker/REAgentWebsiteTemplates.git
cd REAgentWebsiteTemplates
npm ci
npm run create-site -- forma ../my-agent-site
cd ../my-agent-site
npm ci
npm run dev
```

Replace `forma` with any design ID from the table. The exporter copies shared functionality and exactly one design. It excludes this repository’s history, dependencies, catalog, preview routes, and unused designs. GitHub’s “Use this template” button copies the entire catalog; use the exporter for a lean agent site.

Edit **`src/agent.config.json`** for identity, brokerage, license, contact details, service areas, canonical URL, and content preferences. This is public site information, not secrets. Change the palette at the top of `src/design/theme.css`. Replace page cover art and edit its alt text in `src/design/pages.ts`. Every homepage includes an agent introduction with a headshot, bio, brokerage/license details, and a direct call link just below the hero. Put your licensed headshot under `public/images/` and set `portraitUrl` (for example, `/images/headshot.jpg`); the About page uses the same photo. Check the crop on mobile and desktop. Demo mode uses a labeled, AI-generated sample portrait when no photo is supplied. With demo mode off and no `portraitUrl`, the homepage keeps the introduction without a photo; supply the real agent’s headshot before handoff.

```sh
git init -b main
git add .
git commit -m "Create my real estate website"
gh repo create my-agent-site --private --source=. --remote=origin --push
```

New to GitHub or hosting? Start with [the owner guide](docs/OWNER-GUIDE.md). Using a software agent? Give it [AGENTS.md](AGENTS.md) and [the setup playbook](docs/AGENT-SETUP.md).

## Personalize for a real agent

Gather these public facts and assets before launch. A software agent should inspect the existing configuration first, then ask for missing information in one group:

- Public name, brand, professional role, brokerage and approved license/disclosure wording.
- Working business phone and email, public office mailing address, market, and service areas.
- A real headshot with permission to publish, a short first-person bio, and a clear explanation of how the agent helps buyers and sellers. Use only verified experience and credentials.
- The confirmed production domain, existing repository/hosting details, and whether a live site must be preserved.
- Approved page copy, licensed imagery, social links, and actual privacy practices. Credentials and account permissions stay in provider sign-in flows, not chat or public config.

Use this map in an **exported site**:

| What to change                                                                      | File or directory                                                         |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Reused business details, bio, headshot path, SEO description, editorial preferences | `src/agent.config.json`                                                   |
| Homepage composition and design-specific marketing copy                             | `src/design/Home.astro`                                                   |
| Design palette, typography and spacing                                              | `src/design/theme.css`                                                    |
| Buyer/seller/About/journal headings and cover images with alt text                  | `src/design/pages.ts` and `src/design/media/`                             |
| Homepage agent introduction and portrait rendering                                  | `src/components/HomeAgent.astro` and `src/components/AgentPortrait.astro` |
| Shared interior-page layout and copy                                                | `src/components/DesignPage.astro` and `src/lib/move-guides.ts`            |
| Navigation, footer and metadata                                                     | `src/layouts/Layout.astro`                                                |
| Privacy and accessibility statements                                                | `src/pages/privacy.astro` and `src/pages/accessibility.astro`             |
| Articles                                                                            | `src/content/blog/*.md`                                                   |

In the catalog, design files live in `templates/ID/` instead of `src/design/`. Editing configuration does not rewrite design-specific prose. Review the homepage and buyer/seller promises against the agent’s actual services; never invent testimonials, sales results, listings, or response-time guarantees. Keep each design’s visual character while making the agent and a useful reason to call easy to find.

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
# Catalog maintainers: verify all eight independent exports too.
npm run test:exports
# In the configured exported site, before launch:
npm run verify:launch
npm run check
npm run build
npm run preview
```

The catalog-only `npm test` and `npm run test:exports` commands are removed from owner exports. `verify:launch` is expected to fail on the demo configuration: it checks common identity placeholders, demo mode, and the HTTPS URL. It does not verify facts, headshots, editorial review, privacy, accessibility, or working contact destinations. Complete [the launch checklist](docs/LAUNCH-CHECKLIST.md), review `dist/` through `npm run preview`, and test phone/email links on a real device. Demo mode prevents indexing; it does not make a deployed site private.

Prefer Hostinger’s official MCP connection (`https://mcp.hostinger.com`, browser OAuth) so your software agent can discover hosting resources and perform supported setup, deployment, and maintenance. Local agents can also deploy `dist/` using the official Hostinger CLI. File Manager upload and compatible GitHub build integrations remain alternatives. The deployed site needs no Node process. [Deployment and rollback](docs/HOSTINGER.md) · [Launch checklist](docs/LAUNCH-CHECKLIST.md) · [Architecture and adding designs](docs/ARCHITECTURE.md).

Before replacing a live site, preserve its previous build and confirm the account, domain and upload destination. After deployment, verify public pages, HTTPS, contact links and the 404 response. Record the repository, hosting target, deployment and rollback steps in `docs/SITE-OPERATIONS.md` in the owner’s repository. CI produces a build artifact; it does not deploy the owner’s site.

MIT licensed. No IDX/MLS integration, hosted CMS, live property feed, email delivery, analytics, or lead database is bundled. Contact uses working phone/email links. Accounts, purchases, domain ownership, and provider authorization remain with the owner.
