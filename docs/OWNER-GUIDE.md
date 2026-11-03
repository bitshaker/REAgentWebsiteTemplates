# Your website, step by step

You can ask a software agent to handle the code. You retain ownership of your GitHub account, hosting, domain, and public content.

1. **Pick a look.** Ask your software agent to run the template catalog and show Coastal, Editorial, and Modern. Tell it which you prefer.
2. **Create a GitHub account if needed.** Go to https://github.com/signup, verify your email, and enable two-factor authentication. Keep recovery codes somewhere safe. GitHub stores your website source and change history. Complete sign-in yourself; your assistant does not need your password. A private repository keeps source private; published website content is public.
3. **Share your business facts.** Supply your public name, brokerage, license number, office mailing address, phone, email, service areas, bio, and domain. Supply images you have permission to use. Your agent updates one configuration file for reused details.
4. **Create your website repository.** Ask your agent to export only your chosen design into a new private repository in your account. It should follow docs/AGENT-SETUP.md. You do not need to fork all the designs.
5. **Choose hosting.** If you do not have Hostinger, visit https://www.hostinger.com/ and compare the current plans yourself. A static Astro website can be uploaded as files. A managed GitHub/Node build integration requires a compatible plan. Purchase and billing need your participation. Tell your agent whether you already have a domain or hosting; do not buy duplicates.
6. **Preview together.** Check your name, contact links, license, office address, mobile navigation, buyer/seller copy, and sample blog article. Approve the public text and images. Replace the starter privacy notice for your actual practices.
7. **Connect and launch.** Connect your assistant to Hostinger using its official Connector or remote MCP server, `https://mcp.hostinger.com`, and complete browser authorization. Your agent can then discover and use supported hosting, deployment, and domain tools. A local agent can also deploy with Hostinger’s CLI; manual upload remains available. You authorize account connections and domain/DNS changes. Domain changes can take time; keep access to your previous site until the new one works.
8. **Maintain by conversation.** Ask your agent to update your site, show a preview, and deploy using the documented process. All source changes should be committed so they can be undone.

Example requests:

> Set up the Editorial design for my business. Read AGENTS.md, ask for missing business information in one group, create a private repo with only that design, and prepare a preview before deploying to my confirmed Hostinger domain.

> Draft an article about preparing a home for sale. Use only verified local facts, save it as a draft, and show it to me before publication.

> Update my phone number everywhere using the shared configuration, check the mobile layout, build, and deploy to my existing website.

## What “manage content” means here

Pages, configuration, and Markdown live in your repository. Your software agent edits those files and rebuilds the site. There is no separate dashboard or CMS login. You can also edit files in GitHub, but use a branch and review the preview/build result before updating production.

An AI chat subscription does not necessarily include API credits. Automated API drafts need a separate provider key and may cost money. Writing with your existing software agent requires no API key in this project. Scheduling is optional and disabled by default.
