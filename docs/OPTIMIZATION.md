# Accessibility and performance

Every exported design includes the same navigation, media controls, image helpers, SEO graph, fonts, and verification commands as the catalog. The owner repository builds independently; it does not load assets or configuration from the catalog.

## Included defaults

- Self-hosted WOFF2 fonts with `font-display: swap`. Conversion preserves the original glyph repertoire and font licenses. The font files are 73% smaller than the original TTF versions.
- Build-time WebP and responsive variants for design photography; explicit dimensions; priority loading for photo heroes and film posters; asynchronous decoding for other images. Interior image sizes reflect the column breakpoint.
- No film URL is attached at initial HTML load. Decorative films play only while visible and the page is active. Reduced-motion, Save-Data, and reported slow connections suppress autoplay; the visitor can explicitly choose Play. Pause persists when scrolling away and back. Posters remain usable without JavaScript or if playback fails. Below-the-fold posters use native lazy loading where supported.
- Native semantic navigation, one main landmark, a focusable skip-link destination, visible focus styles, named scrollable gallery regions, wrapping breadcrumbs, and current-page links in desktop and mobile navigation.
- The native mobile disclosure works without JavaScript. With JavaScript, Escape closes it and returns focus to the toggle; moving focus or clicking outside closes it.
- Reduced-motion CSS removes decorative transitions and scroll motion. Changing the preference cancels reveal animations and stops background films. Reading-progress updates are grouped into animation frames, avoiding a full-page measurement on every scroll event.

These defaults support accessibility and fast delivery; they are not a WCAG certification or a promise about field Core Web Vitals.

## Owner headshots

For automatic optimization, put the licensed original at `src/assets/portraits/headshot.jpg` and set `portraitUrl` in the agent config to `src/assets/portraits/headshot.jpg`. Use the actual filename and case. JPG, JPEG, PNG, WebP, and AVIF are supported. Builds produce portrait variants up to 720 pixels wide without upscaling, reserve actual image dimensions, and use the generated URL in the agent's JSON-LD. Keep the source in the repository and check the crop on mobile and desktop.

Existing `/images/headshot.jpg` paths under `public/` and full HTTP(S) image URLs remain supported. Those are served directly: resize/compress them yourself, or move the original into `src/assets/portraits/` for automatic processing. Remote availability and publication rights require owner review. The sample portrait is optimized too and never appears when demo mode is off.

Article covers and social-image overrides using public/remote URLs are also direct assets. Prepare appropriately sized, compressed files with accurate alternative text. Design art imported from `src/design/media/` uses automatic image processing.

## Checks included in a new repository

```sh
npm ci
npm run check
npm run build
```

`build` runs Astro and then `verify:site`, which runs `verify:seo` and `verify:quality` against the generated files. These checks, helpers, and assets are included in owner exports and run through the exported GitHub Actions build. You can rerun `npm run verify:site` separately after a build. For a subdirectory build, use the same `CATALOG_BASE` for subsequent standalone checks.

SEO checks cover metadata, canonicals, local links/assets, connected JSON-LD, article dates, and exact agreement between indexable pages and sitemap contents. Quality checks cover main/skip landmarks, language, unique IDs, image alt/dimensions/responsive candidates, hero loading, decorative-video defaults, explicit button types, tab order attributes, WOFF2 delivery, and accidentally serialized image objects. It reports built font and script bytes.

The catalog export matrix initializes a repository, stages and commits each exported design, clones it into a new directory, installs from the lockfile, and type-checks/builds that clone. It exercises public-image paths, native optimized portraits, production SEO, a subdirectory base, articles, and draft filtering. Starter tests assert that scripts, helpers, fonts/licenses, styles, and owner guides survive staging. Downloadable ZIPs use this same exporter.

`verify:launch` remains separate because demo starters intentionally contain placeholders. Run it after replacing the identity, choosing the real domain, and reviewing the content. See [SEO setup](SEO.md) and [the launch checklist](LAUNCH-CHECKLIST.md).

## Manual review after personalization

Test the skip link and complete navigation using only the keyboard. Check Escape behavior, focus visibility, mobile-menu links, gallery controls, and film Play/Pause. Ensure fixed call bars do not hide focused controls or anchor destinations. Check narrow widths and increased zoom with long names, addresses, titles, and non-ASCII names.

Review alternative text and link names for the owner's actual content. Decorative images should keep empty alt text. Review text/background contrast in every relevant state, particularly on changing photography and film frames. Automated checks do not establish contrast over images, assistive-technology compatibility, or a completed accessibility audit.

After deployment, use Lighthouse/PageSpeed Insights and real-device checks on the actual host to inspect caching/compression, LCP, layout shifts, responsiveness, and mobile data use. Hosting cache headers, redirects, TLS, and 404 status handling need verification on the owner's account. Preserve the deployment rollback artifact.

References reviewed November 7, 2026: [Astro image processing](https://docs.astro.build/en/guides/images/), [web.dev video loading](https://web.dev/articles/lazy-loading-video), [reduced-motion preferences](https://web.dev/articles/prefers-reduced-motion), and [WAI disclosure navigation guidance](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).
