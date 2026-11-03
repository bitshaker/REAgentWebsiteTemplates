# Setup playbook for an assistant

## Discover before acting

Inspect the checkout, git remotes, installed Node, and authenticated GitHub user. Ask whether an existing site, domain, GitHub repo, or Hostinger plan should be reused. Do not overwrite an existing repo or document root. Batch missing questions: design, public identity/contact/license/brokerage/address, service areas, bio, domain, hosting/account status, and desired draft frequency.

## Create the chosen site

In the catalog run npm ci, then `npm run create-site -- DESIGN ../owner-site`. Supported designs: coastal, editorial, modern. Destination must not exist. The result contains one design and shared functionality. In the new directory run npm ci, edit src/agent.config.json, and preview with npm run dev. Keep demo true until identity and content are ready. Replace sample blog content or remove it. No exporter script is included in the owner’s site.

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
