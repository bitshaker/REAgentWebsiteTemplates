# Launch checklist

- Replace every sample identity value, service area, bio, and public contact detail in src/agent.config.json. Verify license/brokerage and any locally required advertising disclosures with the owner.
- Set the real HTTPS siteUrl. Review or remove the sample blog post and replace illustrations/social card as desired with licensed assets. Do not imply an illustration is an actual property listing.
- Review privacy copy for actual hosting/email providers, retention, analytics, forms, and jurisdiction. The included page is starter text, not a completed legal policy.
- Check readable contrast, keyboard navigation, focus, skip link, headings, alt text, zoom, mobile layout, and screen-reader announcements. Automated checks do not certify accessibility.
- Verify phone/email links, page titles/descriptions, canonical URLs, Open Graph image, RSS, sitemap, 404, and robots. Demo mode deliberately disables indexing and business structured data. Set demo false only when ready.
- Run npm run verify:launch, npm run check, npm run build. Catalog developers also run npm test. Inspect built output for drafts/future posts and placeholders.
- Keep credentials out of Git, client assets, and config. No analytics/lead capture is enabled by default. Adding integrations requires updating privacy and testing the complete data flow.
- Confirm the correct hosting account/domain, HTTPS, scoped upload destination, backup/rollback, and ownership of source and assets. Document the deployment method for the next software agent.
- After deployment, verify actual public pages on mobile and desktop. Record remaining tasks without claiming verification you did not perform.
