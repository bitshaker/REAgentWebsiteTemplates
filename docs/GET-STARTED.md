# From a sample to your own site

Browse [the live collection](https://bitshaker.github.io/REAgentWebsiteTemplates/), open a design and choose **Use this design**. The setup page includes a single-design source ZIP and a copyable agent prompt with its exact download URL. The upcoming Grok bot link is not required: use your own software agent today.

## Account and hosting setup

1. Reuse existing accounts, hosting and domains. If needed, create a [GitHub account](https://github.com/signup), verify your email and enable two-factor authentication. Complete signup, purchases, MFA, CAPTCHA and browser authorization yourself. Never send passwords or authentication tokens to your agent in chat.
2. Give your agent the prompt and source ZIP. It checks for Git, Node 24 LTS, npm and GitHub CLI, and helps install missing tools using official instructions. Authenticate with `gh auth login`; it verifies the owner with `gh api user --jq .login`.
3. Your agent extracts the starter into a new directory, reads its README, AGENTS.md and docs/AGENT-SETUP.md, and gathers your public business facts, repository name, chosen domain and hosting information. It initializes a new repository with just your site and creates a **private** repository in your verified account. It never overwrites an existing directory or repository or forks the entire catalog.
4. If you need hosting, use [the Hostinger referral link](https://www.hostinger.com?REFERRALCODE=7VIUJOEGV1IB), code **7VIUJOEGV1IB**. This is a referral link; verify current offer eligibility, final price and renewal charges at checkout. No specific discount is promised. The agent checks static Astro hosting support and any managed GitHub integration entitlement before you purchase. You complete billing yourself.
5. In your assistant's MCP/connector settings, add the official remote URL `https://mcp.hostinger.com` and complete browser OAuth. Hostinger's guided Connector is another option. The agent discovers supported tools and inspects existing hosting before selecting your confirmed website/domain. See the exported site's docs/HOSTINGER.md for deployment, CLI fallback and rollback.
6. Review your personalized site with the agent, including desktop/mobile previews, public business facts, privacy copy, contact links and brokerage/licensing wording. It runs launch verification, checks and build, then deploys under your authorization and verifies the actual public result.
7. Your agent records your repository, domain, hosting target, deployment method and rollback procedure in docs/SITE-OPERATIONS.md in **your** repository, without secrets. All future edits, draft articles, builds and deployments happen there. The catalog is no longer required.

The starter includes source code, sample content, documentation and one design. It does not include accounts, hosting, a production domain, reviewed legal copy or email delivery. Keep demo mode on until the public facts and content are reviewed.

## Agent fallback: fetch only the selected design

Prefer the design ZIP; it needs no catalog clone or catalog dependencies. If it is unavailable, use a temporary sparse checkout. Substitute the actual design ID and a NEW destination; `forma` is only an example. Check for existing directories before running.

```sh
git clone --depth 1 --filter=blob:none --sparse https://github.com/bitshaker/REAgentWebsiteTemplates.git catalog-bootstrap
cd catalog-bootstrap
git sparse-checkout set src public docs scripts .github templates/forma
npm ci
npm run create-site -- forma ../my-agent-site
cd ../my-agent-site
npm ci
npm run dev
```

The sparse checkout fetches shared starter code and the selected design instead of all designs. The exporter excludes catalog pages, downloads tooling, Pages publication workflow, Git history, node_modules and unused designs. The destination must not exist. Use the new directory for all remaining steps; the temporary bootstrap can be discarded after verifying the exported site.

In the exported site, after confirming the authenticated account and chosen new repository name:

```sh
git init -b main
git add .
git commit -m "Create my real estate website"
# Replace OWNER/REPO with the verified owner and their chosen NEW repository.
gh repo create OWNER/REPO --private --source=. --remote=origin --push
```

The new origin belongs to the owner. Do not add the catalog as an upstream, Git submodule, runtime dependency or required update service. Shared functionality and guides are copied into the site. Optional future catalog changes must be deliberately reviewed and ported.

## Catalog maintainer settings

Edit src/catalog.config.json to update the referral link/code or set grokBotUrl when the bot is ready. An empty Grok URL displays “Coming soon” without a dead link. These catalog settings are excluded from owner exports. No bot provisioning or ongoing bot service is bundled.

Account and connection instructions checked against [GitHub account documentation](https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github) and [Hostinger MCP documentation](https://www.hostinger.com/support/11079316-hostinger-api-mcp-server/) on November 7, 2026. Actual provider permissions, pricing and capabilities must be checked in the owner's account.
