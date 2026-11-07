# SEO setup and maintenance

All eight designs use the same SEO implementation. Exporting one design keeps this functionality, its selected images, and the SEO verification command. Fill in `src/agent.config.json`, review the visible copy and articles, and rebuild before launching.

## Owner setup

1. Set the confirmed production `siteUrl` to the HTTPS origin, for example `https://your-owned-domain.tld`. Choose the actual www or non-www version. The hosting provider must redirect other versions to it. Keep paths, query strings, and fragments out of this value.
2. Replace the sample name, brand, role, market, service areas, contact details, address, brokerage, license wording, and bio with verified public information. Titles and descriptions use these values automatically. Review generated text for natural wording and length with the owner's real name and market.
3. Write a useful `seoDescription` for the homepage. Buyer, seller, About, contact, journal, privacy, and accessibility pages have distinct descriptions in `src/lib/seo.ts`. Customize those defaults when the owner's services require it.
4. Supply the real `portraitUrl` and approved `socialLinks`. Use `src/assets/portraits/headshot.jpg` for automatic responsive WebP processing; the generated URL is used in the person schema. [Image and accessibility details](OPTIMIZATION.md). Do not supply invented credentials, testimonials, listings, transaction results, or neighborhood demographics.
5. Optionally set `socialImage` to a licensed image under `public`, such as `/images/share.jpg`, or a full HTTPS image URL. Set `socialImageAlt` to an accurate description. A landscape image around 1200 × 630 is a useful starting point. Without an override, each page uses its selected design's art. A post's own image takes precedence over the site-wide image.
6. Review or remove the sample article; approve all public prose, privacy practices, and advertising disclosures. Set `demo: false` only when ready to be indexed. Demo mode is not access control or a privacy feature.

Keep local asset paths relative to the site root (`/images/...`), not `/public/images/...`. Imported design assets and a configured Astro `base` are handled automatically. The exported site's normal base is `/`; `CATALOG_BASE` exists for builds hosted under a subdirectory and must be supplied consistently to build and verification commands.

## Included automatically

| Area             | Behavior                                                                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Metadata         | Unique page titles and descriptions; absolute canonical URLs without query strings or fragments; Open Graph and Twitter image, title, description, and alternative text           |
| Crawl discovery  | `/sitemap-index.xml` and its URL sitemap, advertised in `robots.txt` and HTML; journal RSS linked from the page head                                                              |
| Sitemap contents | Production canonical pages and published articles; excludes catalog/setup/preview routes and errors; drafts and future articles never get built                                   |
| Demo protection  | Demo/catalog builds have `noindex` and no public business schema or sitemap. Robots allows crawling so crawlers can read `noindex`                                                |
| Entities         | One connected JSON-LD graph with `RealEstateAgent`, `Person`, `WebSite`, and page entities using stable IDs                                                                       |
| Page types       | `AboutPage`, `ContactPage`, `CollectionPage`, or `WebPage`, according to the visible content                                                                                      |
| Navigation       | Visible, wrapping breadcrumbs on interior pages with matching `BreadcrumbList` schema; articles link to their author and journal                                                  |
| Articles         | `BlogPosting`, headline, description, author, publisher, canonical page, publication date, and actual editorial update date; article images only when supplied and displayed      |
| Images           | Build-time WebP conversion, responsive variants, intrinsic dimensions, lazy loading below the hero, eager photo heroes, and priority preload of the homepage image or film poster |
| Serialization    | JSON-LD escapes `<` so editorial/config text cannot terminate its script element                                                                                                  |

The business entity uses the configured brand; the person entity uses the agent's name and role. Contact information and service areas come from configuration. Brokerage appears as the person's configured employer, without inventing a brokerage URL. Reviews, ratings, opening hours, prices, geographic coordinates, and listing availability are not fabricated. Decorative stock films are not marked up as substantive video content.

Sitemaps omit `lastmod` rather than treating every build as a content update. `priority` and `changefreq` are omitted. Article modification dates come from editorial frontmatter, never the build time.

## Optional article metadata

Existing title, description, date, draft, and optional author fields still work. The default author is the configured agent, linked to the About page. Guest authors can have their own verified profile URL. Add the following only when accurate:

```yaml
updated: 2026-10-15
author: 'Approved guest author'
authorUrl: 'https://author-owned-domain.tld/about/'
image:
  src: '/images/article-cover.jpg'
  alt: 'Describe the actual article image'
  width: 1200
  height: 630
```

`updated` must be on or after `date` and cannot be in the future. It is shown visibly and used in article schema/social metadata. The image appears as the article cover and social image, with its supplied alternative text. Use its actual dimensions, or omit width/height if unknown. Supply a relevant, licensed cover for each article where possible; the template does not claim an unrelated decorative scene is the article's structured image. Image sources accept root-relative paths or HTTP(S) URLs. Remote image availability and publication rights require review.

## Verify before deployment

```sh
npm run verify:launch
npm run check
npm run build
npm run verify:seo
npm run preview
```

`verify:launch` checks common identity/domain placeholders and configured social-image paths/alternative text. It deliberately fails on the demo configuration.

`npm run build` automatically runs both SEO and structural quality checks through `verify:site`. You can also run `verify:seo` separately: it reads the built HTML and XML. It checks metadata, social-image files, unique indexable titles/descriptions, one H1, connected schema references, visible breadcrumbs, article dates, local links, and exact agreement between sitemap URLs and indexable canonicals. Demo builds are checked for `noindex`, absent business schema, and absent sitemap advertising. Run it against the same base setting used for the build. The catalog CI and export matrix run it too.

These checks verify generated output, not ownership, business facts, brokerage approval, legal compliance, remote links, ranking, or Google rich-result eligibility. Inspect every design at mobile and desktop sizes after changing content or styles. On the deployed site, verify HTTP status codes (especially a real 404 response), HTTPS, redirects, crawl access, and image availability. Static preview behavior does not establish the host's redirect or error-page behavior.

After the owner has deployed the confirmed domain, verify it in Google Search Console and Bing Webmaster Tools, submit the sitemap index, and inspect representative URLs. Validate the homepage, an interior page, and a real article with Google's Rich Results Test and Schema.org Validator. Review warnings against the actual business; never fill missing fields with invented facts. Check Search Console indexing and Core Web Vitals as field data becomes available. Connect an accurate Google Business Profile where appropriate and keep public name/address/phone details consistent.

## Catalog audit and regression coverage

SEO pass: November 7, 2026. The original shared implementation already provided canonical links, a sitemap integration, basic social metadata, and one business schema object. This pass addresses these priorities across every design:

| Priority | Finding                                                                               | Shared fix                                                                                |
| -------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| High     | Demo/preview noindex directives disagreed with crawl blocks and sitemap contents      | Crawlable noindex pages; no demo/catalog sitemap; one production route policy             |
| High     | Articles were marked only as the business and lacked author/date/page relationships   | Connected entity graph with article-specific schema and visible author/update information |
| High     | JSON serialization used an ineffective `<` replacement                                | Script-safe escaping, covered by an adversarial editorial-text test                       |
| Medium   | Interior pages reused the homepage description; exported homepage had a generic title | Route-specific metadata based on the configured owner and market                          |
| Medium   | All pages shared a generic social card                                                | Selected design/page images, optional branded override, and article covers                |
| Medium   | Large JPEGs and missing image dimensions could slow pages or shift layout             | Responsive WebP output and intrinsic dimensions, with hero loading priorities             |
| Medium   | No breadcrumb markup or rendered-output SEO regression checks                         | Visible breadcrumbs and built HTML/XML/link verification                                  |

The export matrix independently installs, type-checks, builds, and verifies all eight designs in production mode. It also exercises demo mode, subdirectory hosting, custom sharing images, guest authors, article update dates/images, script-like editorial text, and draft/future exclusions. Automated checks are structural; live search results and field performance still depend on the owner's content, hosting, and ongoing work.

Implementation references reviewed for this pass: [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [crawl access for noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business), [articles](https://developers.google.com/search/docs/appearance/structured-data/article), [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [site names](https://developers.google.com/search/docs/appearance/site-names), [Schema.org RealEstateAgent](https://schema.org/RealEstateAgent), and [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/).
