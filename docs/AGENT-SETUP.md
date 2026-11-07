# Setup playbook for an assistant

## Discover before acting

Inspect the checkout, git remotes, installed Node, and authenticated GitHub user. Ask whether an existing site, domain, GitHub repo, or Hostinger plan should be reused. Do not overwrite an existing repo or document root. Batch missing questions: design, public identity/contact/license/brokerage/address, service areas, bio, domain, hosting/account status, and desired draft frequency.

## Begin from a catalog download

If the owner provides a single-design ZIP, inspect it and extract into a new directory. The ZIP is already exported; do not run create-site again or clone the catalog. Read the exported README and AGENTS.md, install dependencies and continue with configuration and the owner's private repository below. Help install Git, Node 24 LTS, npm and GitHub CLI from official instructions if absent. Owners without GitHub complete https://github.com/signup, email verification and MFA themselves, then browser authentication via gh auth login. Confirm their authenticated account before creating a new private repository. Never overwrite an existing directory or unrelated repository.

For owners without hosting, offer the Hostinger referral link https://www.hostinger.com?REFERRALCODE=7VIUJOEGV1IB (code 7VIUJOEGV1IB); disclose it as a referral, verify eligibility and current checkout/renewal terms, and never promise a discount. The owner completes purchase. Reuse existing services and verify plan support for static output before recommending purchase.

## Create the chosen site

In the catalog run npm ci, then `npm run create-site -- DESIGN ../owner-site`. Use a design ID listed in the catalog at `/designs/`. Destination must not exist. The result contains one design and shared functionality. In the new directory run npm ci, edit src/agent.config.json, and preview with npm run dev. Keep demo true until identity and content are ready. Replace sample blog content or remove it. No exporter script is included in the owner’s site.

Authenticate GitHub through `gh auth login` if needed; the owner completes browser/device authorization. Confirm `gh api user --jq .login` before creating the private repository:

```sh
git init -b main
git add .
git commit -m "Create real estate website"
gh repo create OWNER/REPO --private --source=. --remote=origin --push
```

OWNER/REPO must be selected for that owner, never hardcoded from the catalog. Do not push API keys. The public catalog and owner’s private site are distinct repositories.

## Connect Hostinger automation

Prefer the owner's existing Hostinger MCP connection. Otherwise help them connect `https://mcp.hostinger.com` through their MCP client and complete browser OAuth themselves; Hostinger Connector is another supported route. Read docs/HOSTINGER.md for operation discovery, local CLI deployment, and fallback upload. Inspect existing services before provisioning anything. Do not treat lack of a connected tool in one assistant as lack of a Hostinger API capability.

Use the available tools to discover the actual account, plan, website, domain, deployment options, and logs, then carry out authorized setup and maintenance. A remote chat client may need a local agent/CLI for file transfer. Never guess MCP operation schemas or assume private GitHub access has already been granted. Preserve target identifiers and deployment instructions for the next agent, but keep credentials and owner-specific `.hostinger/` state out of the starter and Git.

## Configure and verify

Update src/agent.config.json. All shared pages reference it. Set HTTPS siteUrl to the confirmed domain. Set demo false only when public facts, privacy notice, sample article, and advertising disclosures are reviewed. Preserve actual license/brokerage wording the owner provides. Add licensed photos in public/images/ and meaningful alt text. Replace public/images/social-card.png with a branded 1200×630 image.

Run npm run verify:launch, npm run check, npm run build. Inspect desktop/mobile and keyboard navigation; verify built canonicals, robots, sitemap, and no demo identity. Deploy through the MCP/CLI workflow or documented fallback in docs/HOSTINGER.md only for the confirmed account and domain. Signup, purchase, MFA, OAuth permission, and DNS ownership verification may require the owner. Record remaining manual steps plainly instead of claiming completion.

## Maintain

Make focused changes on a branch when practical. Preview, check, build, commit, push, and deploy under the owner’s authorization. Keep rollback artifacts and never delete unrelated hosting files. Revisit dependency updates periodically with checks and previews. Do not blindly copy catalog updates over an owner’s custom site. For new templates, follow docs/ARCHITECTURE.md. For blog tasks, follow docs/CONTENT.md.

## Independent handoff

The exported site must have its own Git history and origin in the verified owner account. Do not retain the catalog as an upstream, submodule or dependency. Record the actual repository, confirmed domain, hosting target, deployment method, maintenance commands and rollback procedure in docs/SITE-OPERATIONS.md, with no credentials. Future maintenance must work from this repository alone.
