# Personalize an agent's website

Start in the owner's exported repository. Read AGENTS.md and docs/AGENT-SETUP.md, then inspect src/agent.config.json. The owner can give their software agent this request:

> Personalize this website for me. Read the existing configuration first, ask for my missing public business information and approved images in one group, and update the site. Use my headshot on the home and About pages. Check every contact link and show me desktop and mobile previews before launch.

Keep demo enabled during preparation. Existing configuration and the owner's confirmed facts take precedence over examples. Fictional examples are useful for tests only; never treat them as real business details.

## One place for business information

Edit src/agent.config.json rather than repeating the same details in page files.

| Owner information                                      | Configuration fields        | Where it appears                                                            |
| ------------------------------------------------------ | --------------------------- | --------------------------------------------------------------------------- |
| Public name, brand, role, and tagline                  | name, brand, role, tagline  | Navigation, introductions, About, footer, contact invitations, and metadata |
| Market and service areas                               | market, serviceAreas        | Home, About, buyer/seller invitations, and metadata                         |
| Phone and email                                        | phone, email                | Header, home calls to action, contact page, footer, and mobile call bar     |
| Approved brokerage, license, and public office address | brokerage, license, address | Introductions, About, contact information, and footer                       |
| First-person introduction and headshot                 | bio, portraitUrl            | Home introduction and About                                                 |
| Approved profile links                                 | socialLinks                 | Footer and business metadata                                                |
| Confirmed production origin and search description     | siteUrl, seoDescription     | Canonical URLs, metadata, RSS, sitemap, and robots                          |
| Editorial preferences                                  | content                     | Draft tools and optional scheduling; scheduling defaults off                |

Use arrays for serviceAreas and socialLinks, retain the address object, and preserve valid JSON. Leave optional social links empty until the owner supplies real destinations. Do not place passwords, API keys, or account tokens here.

## Replace the headshot

1. Obtain an owner-approved photo with publication rights. Keep a copy of the original outside the published assets.
2. Save the licensed original JPEG, PNG, WebP, or AVIF to src/assets/portraits/, for example src/assets/portraits/headshot.jpg. The build creates responsive WebP versions without upscaling. A vertical 4:5 image around 720 × 900 pixels is a useful starting point. Keep the whole head visible with some space around it.
3. Set `"portraitUrl": "src/assets/portraits/headshot.jpg"` in src/agent.config.json. Use the exact filename and case; this path includes src/assets/portraits/. A local file avoids depending on another service to keep the photo available.
4. Rebuild. The home introduction and About page automatically use the same configured image and the configured name as its alt text. No edit to either page is needed.
5. Inspect both pages at desktop and mobile sizes. Check that the face is visible, the image loads, and the crop suits the photo. If needed, recrop the source photo or adjust object-position in src/components/AgentPortrait.astro, then check both locations again.

Existing /images/ paths under public/ and remote image URLs remain supported as direct assets. See [the optimization guide](OPTIMIZATION.md) for this alternative.

With demo enabled and portraitUrl empty, a labeled AI-generated sample portrait appears. With demo disabled and portraitUrl empty, no portrait appears. A sample portrait is not the owner's headshot.

## Review the rest of the site

Configuration updates repeated business information; it does not rewrite every piece of marketing copy. Review src/design/Home.astro, src/design/pages.ts, shared buyer/seller guidance, and the sample article for the owner's actual services and voice. Forma derives its large surname wordmark from name; Monogram derives its initials from name. Check both when using a long or multi-part name.

Page cover images and their alt text live in src/design/pages.ts and src/design/media/. The headshot setting does not replace these. Review media/CREDITS.md and retain required attribution. Replace public/images/social-card.png with the owner's approved 1200 × 630 sharing image. If the exported configuration also has socialImage and socialImageAlt, follow docs/SEO.md for those optional settings.

Review privacy and accessibility copy against actual practices. Remove or review the sample article; new articles remain drafts until reviewed. Do not invent experience, testimonials, listings, credentials, brokerage affiliations, market statistics, or legal claims to fill gaps.

## Verify the handoff

- Run npm run check and npm run build. Open npm run preview and inspect home, About, buyers, sellers, contact, journal, privacy, accessibility, and 404.
- Search the built HTML for the previous person's name, old phone/email, and sample business placeholders. Check the displayed phone and every tel: and mailto: destination; changing the visible text alone is insufficient.
- Confirm the headshot URL returns an image on both home and About, and check mobile navigation, visible focus, skip link, and call bar. Test phone/email handoff on a real device before launch.
- Inspect page titles, descriptions, canonical URLs, social image, sitemap, RSS, and robots. Run npm run verify:seo if that command exists in this exported version.
- Run npm run verify:launch only after real identity, domain, and content review. It should fail for a fictional demo. Passing automated checks does not verify the owner's facts or complete editorial, legal, privacy, or accessibility review.
- Record the repository, photo provenance, preview/check results, missing owner information, and deployment/rollback instructions in docs/SITE-OPERATIONS.md. Confirm the GitHub repository remains private. Deploy only within the owner's existing authorization to their confirmed account and domain.
