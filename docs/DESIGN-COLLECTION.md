# The new design collection

The owner selected these eight references on November 7, 2026. The current gallery replaces the previous lineup with eight original compositions inspired by those directions. These eight are the only available designs; retired template source, previews, and downloads have been removed.

| New design | Reference                                                            | Art direction and behavior                                                                                                                                                                |
| ---------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Forma      | [Fantastic Frank](https://www.fantasticfrank.com/en/)                | Bold architectural opening, configured surname at monumental scale, asymmetric image spreads, interior film, and a selectable journal image study.                                        |
| Neighborly | [Living Room Realty](https://www.livingroomre.com/)                  | Cream and coral, neighborhood film inside an arch, warm typography, circular photographic collage, and playful service paths.                                                             |
| Still      | [Aucoot](https://aucoot.com/)                                        | Quiet interior photography, oversized italic serif, numbered gallery with arrows and live scene counter, and a film interlude.                                                            |
| Solstice   | [Puente Romano Real Estate](https://www.puenteromanorealestate.com/) | Sunset coastal film, olive and sand, delicate pill controls, arched imagery, and a horizontal editorial gallery.                                                                          |
| Nocturne   | [Aaron Kirman](https://aaronkirman.com/)                             | Dark framed architectural film, champagne typography, fine rules, asymmetric photographic spreads, and a scene selector.                                                                  |
| Monogram   | [Forster Jones International](https://forsterjonesintl.com/)         | Oversized configured initials over a seven-second intimate interior film with natural lateral camera movement, sculptural serif, ink and parchment, and selectable architectural studies. |
| Panorama   | [Tim Smith](https://timsmithrealestategroup.com/)                    | Ultra-thin sans-serif over panoramic interior film, with a pinned photographic gallery that moves sideways as the page scrolls.                                                           |
| Atelier    | [Adrian William](https://adrianwilliam.com.au/)                      | Art-filled lifestyle film, expressive serif, angular full-width imagery, and asymmetric journal compositions.                                                                             |

Each design owns its homepage, theme, and buyer/seller/about/journal image directions. Contact and articles inherit the same design. The eight templates contain no copied reference-site photographs, films, logos, text, or business claims. Agent identity remains in `src/agent.config.json`.

## Assets

All new photographic assets are Pexels stock; seven documented free stock film sources are used across the collection. Assets are stored locally in each template's `media/` folder and copied into a single-design export. Photographs illustrate a visual direction; they are not listings or representations of the configured service area.

- [Modern House Interior — Abdullah / 4K](https://www.pexels.com/video/modern-house-interior-5744424/)
- [California coast aerial](https://www.pexels.com/video/aerial-views-on-the-california-coast-19145623/)
- [Modern house interior — ArtHouse Studio](https://www.pexels.com/video/an-interior-design-of-a-modern-house-5098244/)
- [Suburban sidewalk walk — RDNE Stock project](https://www.pexels.com/video/a-family-walking-on-the-sidewalk-7516716/)
- [Showcase of House — Abdullah / 4K](https://www.pexels.com/video/showcase-of-house-10959786/)
- [A Modern Living Room — Max Vakhtbovych](https://www.pexels.com/video/a-modern-living-room-7533210/)
- [Video of a Living Room — Max Vakhtbovych](https://www.pexels.com/video/video-of-a-living-room-7749208/)

See each template's `media/CREDITS.md` for exact photo IDs, source links and transformations, and the [Pexels License](https://www.pexels.com/license/) for its terms. Shared DM Sans, Cormorant Garamond and Manrope fonts are self-hosted; their SIL Open Font License notices accompany the files in `src/assets/fonts/`.

## Motion and controls

Film loads when it enters the viewport, plays muted inline, and pauses offscreen. Every film has a working play/pause control and a still poster. Reduced-motion preferences prevent automatic playback and suppress reveal/parallax animation; explicit play remains available. Reveals progressively enhance content that remains readable without JavaScript. Mobile navigation uses an accessible native disclosure. Still and Solstice galleries support touch and keyboard scrolling as well as arrow buttons. Panorama maps normal vertical scrolling to a pinned horizontal gallery without arrows or a visible scrollbar; keyboard navigation follows the chapters, and reduced-motion or short-viewport layouts present the full collection as a static grid.

## Review

Design is the priority for this iteration. No owner identity, production domain, launch status or SEO strategy was changed. The work stays in the local catalog for review. Run `npm run dev`, then open `/designs/`. The selected source exports with `npm run create-site -- ID NEW_DIRECTORY`; a normal catalog package build generates the starter downloads.
