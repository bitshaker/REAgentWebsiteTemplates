import { sitePath, siteOrigin } from './site';
import catalog from '../catalog.config.json';
export function agentPrompt(id?: string) {
  const download = id
    ? new URL(sitePath(`/downloads/${id}.zip`), siteOrigin).href
    : '';
  return `Help me create and host my own real estate website${id ? ` using the ${id} design` : '. First help me choose a design from the catalog'}. Work through setup, preview, and launch with me.

${id ? `Download my single-design starter from ${download} and inspect its contents before extracting into a NEW directory. It contains source code, not a ready-to-publish website. Read README.md, AGENTS.md and docs/AGENT-SETUP.md first. If the download is unavailable, use the sparse-checkout fallback in the catalog's docs/GET-STARTED.md. The ZIP is already exported. With the fallback, export exactly ${id}; never copy the whole catalog into my repository.` : `Browse ${new URL(sitePath('/'), siteOrigin).href}, ask me to choose a design, then use that design's setup page and starter download.`}

Check for Git, Node 24 LTS, npm, GitHub CLI and an authenticated GitHub account. Help me install missing tools using their official instructions. If I lack GitHub, direct me to https://github.com/signup; I will complete signup, email verification, MFA and browser sign-in. Use gh auth login, then gh api user --jq .login to verify my account. Never ask for passwords or tokens in chat.

Inspect the starter's config, then gather missing business identity, brokerage/license wording, contact details, service areas, bio, licensed images, desired repository name, existing domain/hosting and launch approval in one concise question set. Keep demo mode until my facts and copy are reviewed. Never invent credentials, testimonials, listings or market claims.

Follow docs/PERSONALIZATION.md. Update my repeated business information in src/agent.config.json. Save my approved headshot in public/images/ and set portraitUrl; verify the same photo and name on home and About at desktop and mobile sizes. Review the selected design's marketing copy and imagery with me, and check the final phone/email destinations throughout the site.

Create a NEW private repository in MY verified account from the exported site. Confirm the destination does not already exist; never overwrite an unrelated folder or repository. Initialize a new Git history and origin, commit and push only my single-design site. Do not fork or retain an upstream dependency on the catalog. All future work should happen in my repository.

Keep only the owner check/build workflow. The exported site does not need a public GitHub Pages site, catalog publishing jobs, or an active draft schedule. Enable the example in docs/examples/content-draft.yml only if I request automated drafts, following docs/CONTENT.md.

Reuse my existing hosting/domain where appropriate. If I need Hostinger, show me ${catalog.hostingerUrl} (referral code ${catalog.hostingerCode}). Explain that current pricing, renewal charges, eligible plans and referral terms must be checked at checkout; do not promise savings. I will complete purchase and billing myself. Use hosting that can serve Astro's static dist output; confirm plan capabilities before purchase.

Help me connect Hostinger's official remote MCP at https://mcp.hostinger.com through my assistant's MCP/connector settings. I complete browser OAuth. Discover supported tools, inspect my existing hosting and confirm the website/domain target before changing it. Follow docs/HOSTINGER.md. Use official CLI deployment if MCP cannot transfer local files, or explain the manual fallback. Keep secrets in ignored local environment files or my GitHub Secrets, never public config.

Preview desktop and mobile. Review content, dates, privacy/accessibility copy and licensing/brokerage requirements with me. Set siteUrl to my confirmed HTTPS domain. Run npm run verify:launch, npm run check and npm run build. Verify phone/email links. Preserve a rollback artifact before replacing any live site, deploy only under my authorization to my confirmed domain/account, and verify HTTPS, pages, assets, blog and 404 behavior.

Before handoff, record my actual repository, hosting target, deployment method, maintenance commands and rollback steps in my repository's docs/SITE-OPERATIONS.md without secrets. Future edits, posts, builds and deployments must work entirely from my repository with my own agent; the catalog is no longer required. Report any setup or verification that still needs my participation.`;
}
