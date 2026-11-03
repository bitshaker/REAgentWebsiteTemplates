# Blog content and schedules

Posts are Markdown files in src/content/blog/. Frontmatter requires title, description, date, and draft. Author is optional and defaults to the configured agent name. Slugs come from filenames. Use lowercase words separated by hyphens. Drafts and future-dated posts are excluded from routes, RSS, and the sitemap. A date becoming current does not update a static site: rebuild and deploy to publish it.

## Without an API key

Use `npm run content:new -- "Article topic"`. Ask your software agent to write the Markdown body using your approved source material. Keep draft: true until reviewed. The generated scaffold is not a finished article.

## Optional API generation

Copy .env.example to .env, then set AI_API_KEY and AI_MODEL for a model/provider you have chosen. The default API base is https://api.openai.com/v1/. An alternative HTTPS endpoint must implement the OpenAI-compatible chat completions contract, including JSON response mode and max_completion_tokens. Provider compatibility is not universal; test yours before enabling unattended runs. API billing is separate from chat subscriptions. Never put keys in src/agent.config.json or any PUBLIC_ variable.

Run `npm run content:generate -- "Your topic"`. The Node script sends topic, market, and tone to the configured provider, validates the response, and writes an unpublished draft. It has a request timeout and refuses to overwrite an existing slug. There is no web research step: generated market numbers, legal claims, source links, and local facts must be independently checked. No paid generation is exercised by the test suite.

## Review and publish

Read the full article; verify sources and dates; remove unsupported or discriminatory claims; check advice with appropriate qualified professionals when needed. Inspect links and any markup. Use inclusive descriptions of property features and objective amenities. Do not infer who should live in a neighborhood. Do not fabricate testimonials, listings, or guaranteed outcomes.

After review, run `npm run content:publish -- your-topic-slug`, then npm run check and npm run build. Commit and deploy through the existing hosting workflow. Publish changes draft: true to false; it does not deploy. Remove sample educational content or explicitly approve and adapt it before launch.

## Optional weekly drafts

The included content-draft workflow runs each Tuesday at 16:00 UTC (8 a.m. Pacific standard time / 9 a.m. Pacific daylight time). It does not call an API on scheduled runs unless content.scheduleEnabled is true in the configuration. GitHub schedules use UTC, may be delayed, and require Actions to be enabled; availability/minutes depend on the owner’s GitHub plan and repo settings.

To opt in, set the repository secret AI_API_KEY, repository variable AI_MODEL, optional variable AI_BASE_URL, and content.scheduleEnabled: true. Customize content.scheduledTopic and voice in the config. Manual workflow runs accept a topic and intentionally run even when the weekly schedule is disabled. Disable all generation by disabling the workflow in Actions.

Each enabled run uploads a content-drafts artifact retained for 30 days, containing Markdown drafts (and any existing posts). Download the artifact, copy the new draft into the repository, review it, and publish explicitly. It does not commit to the repo, open a PR, or update hosting. Default read-only repository permissions keep this usable without special PR bot permissions. Your software agent can perform the review/import steps under your instructions. For unattended publishing, design and authorize a separate reviewed policy rather than changing the draft default silently.

Provider contract verified from [the official Chat Completions reference](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create). Only mocked API requests are used in automated tests.
