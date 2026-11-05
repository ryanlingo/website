# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repo is Ryan Lingo's personal website, published at ryanlingo.com. Ryan writes in Obsidian, and Quartz 5 (https://quartz.jzhao.xyz/) turns the Markdown files into a static site. The model for the site is gwern.net (https://gwern.net/about, source at https://github.com/gwern/gwern.net). The writing is licensed under CC BY 4.0, which is linked in the site footer and on the about page.

The repo is a copy of the Quartz `v5` branch, and the Quartz repo is the `upstream` git remote. Upgrade Quartz with `npx quartz upgrade` rather than by merging upstream by hand.

## Commands

Quartz needs Node 22 or later and npm 10.9.2 or later.

- `npm ci`, then `npx quartz plugin install`, sets up a fresh clone.
- `npx quartz build --serve` serves the site at http://localhost:8080 and rebuilds when files change.
- `npx quartz build` writes the site to `public/`.
- `npx quartz sync` commits, pulls, and pushes to GitHub.
- `npx quartz plugin add github:<org>/<repo>` adds a community plugin, and it updates `quartz.config.yaml` and `quartz.lock.json`.
- `python3 scripts/import-medium.py URL --description "..." --tags intelligence/ai` imports one of the owner's Medium posts into `content/blog/`, with its images. Medium's site is behind Cloudflare, so the script reads the author RSS feed (`medium.com/feed/@ryanlingo`), which only holds the 10 most recent posts, and `--list` shows them. It leaves "TODO: describe this image" alt text to fill in.
- `npm run check` type checks the Quartz source and runs Prettier, and `npm test` runs the Quartz unit tests. Both cover Quartz itself, not the content.

A clean `npx quartz build` is the check that a content or config change works. The preview server rebuilds only changed pages, so after adding, renaming, or deleting a page, the Blog and New lists and the RSS feed go stale until the server is restarted (`rm -rf public` first, or deleted pages linger). The live site always builds from scratch. The warnings saying a file "isn't yet tracked by git" go away once the file is committed.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages on every push to `main`. The CNAME plugin writes `public/CNAME` from `baseUrl` (`ryanlingo.com`) in `quartz.config.yaml`. The upstream Quartz workflows were deleted on purpose, because they deploy the Quartz docs site.

## How the pieces fit together

- `content/` is the Obsidian vault. Open this folder (not the repo root) in Obsidian. Every Markdown file in it becomes a page, and the folder path becomes the URL path.
- `quartz.config.yaml` holds site settings under `configuration:`, the plugin list under `plugins:`, and the page layout under `layout:`. It was generated from the Obsidian template, which uses wikilinks and resolves links to the nearest file with a matching name.
- `quartz.ts` is an optional TypeScript override, used only for plugin options that need JavaScript callbacks.
- Most plugins are npm packages under `@quartz-community/`. Plugins added from GitHub, e.g. Excalidraw, are built into `.quartz/plugins/`, which is gitignored and rebuilt from `quartz.lock.json`.
- The look copies gwern.net, and the styles live in `quartz/styles/custom.scss`. Content, folder, tag, and 404 pages use the `full-width` frame, so there are no sidebars. The `@quartz-themes/core` plugin is disabled, because it overrides the site colors and fonts.
- Fonts are self-hosted in `quartz/static/fonts` and declared with `@font-face` in `custom.scss`. The `quartz-fonts` plugin options set the CSS font stacks, and `configuration.theme.typography` is ignored. Font names in those options must be quoted strings, because the plugin writes an object's `name` without quotes, and an unquoted `Source Serif 4` is invalid CSS, so the browser falls back to Times.
- The RL logo is drawn in `quartz/static/logo.svg`. `quartz/static/icon.png` is a 512 px render of the same paths on a white rounded square, and the favicon plugin builds `favicon.ico` from it. If the logo changes, update the SVG, the paths in `SiteLogo.tsx`, and `icon.png` together.
- `quartz.ts` adds four local components, `quartz/components/SiteLogo.tsx` (the RL logo linking home, in place of the disabled page-title plugin), `quartz/components/SiteNav.tsx` (the boxed section links in the header) and `quartz/components/PageMeta.tsx` (description, dates, status, confidence, and importance under the title). The `layout` export alone does nothing, because `loadQuartzConfig` bakes the YAML layout into the `PageTypeDispatcher` emitter, so `quartz.ts` replaces that emitter. `quartz/components/DatedIndex.tsx` builds the year-grouped lists on the Blog page (blog posts by `created`) and the New page (writing in blog, notes, reviews, and logs, by `modified`), modeled on gwern.net/blog/index, and Quartz's folder listing is hidden on the Blog page. The note-properties view and the content-meta plugin are turned off, because PageMeta replaces them. `quartz/plugins/emitters/siteFiles.ts` writes `robots.txt` and `llms.txt` from the pages on every build. `quartz/components/Head.tsx` is edited from upstream Quartz to add "Page | Ryan Lingo" titles, canonical links, article tags for blog posts, and JSON-LD structured data, using the owner's details in `quartz/util/siteProfile.ts`, which must stay in sync with `content/me.md` and `content/links.md`. `quartz.ts` wraps the og-image plugin so the link preview images have no tags and are PNG, because some apps don't show WebP previews. `quartz/plugins/emitters/blogFeed.ts` writes the RSS feed (`index.xml`) with blog posts only, and the content-index plugin's own feed is off, because it filled up with tag pages dated at build time. `quartz.ts` also wraps the Excalidraw plugin's page generator to drop the `excalidraw` tag it adds to drawing pages, because no tag page is built for it and the tags index would link to a missing page.
- `docs/` is the Quartz documentation, and it's not part of the site. Read it to look up plugin options.

## Content model

The site follows the gwern.net approach. Pages are long essays that the author revises over years, rather than dated blog posts that are written once. Pages link to each other heavily, and Quartz shows link previews on hover.

Folders describe what kind of page something is, and tags describe the topic. A page can have many topic tags but lives in only one folder. Each folder has an `index.md` that holds the folder page's title and description.

- `blog/` holds all of the owner's writing. The owner treats essays and blog posts as the same thing, so there is no separate essays section, and posts can be long and revised over time.
- `notes/` holds short notes, stubs, and ideas that may grow into blog posts.
- `reviews/` holds reviews of books, papers, films, and similar works.
- `research/` holds `index.md`, which lists the owner's research papers (arXiv preprints, also on Google Scholar) grouped by subject, with a short summary of each. It's in the header nav as "Research", and it replaced an earlier syllabi section.
- `logs/` holds records without much judgment, e.g. experiments and the tools the owner uses. `logs/site-changes.md` is the site changelog. Whenever you make a change readers can see, e.g. a new or rewritten page, a new section, or a design change, add a bullet under today's date (newest date first) and update the page's `modified` date. Skip typo fixes and small wording edits.
- `templates/` holds the Obsidian page template, and Quartz doesn't publish it.
- `meta/` holds "How to format essays.md", the writing guide for the owner. Quartz doesn't publish it, so keep it in sync when page features change.
- `private/` is excluded from both the site and git.
- The top level holds `index.md` and the pages linked from the header: `about.md` (Site), `me.md` (Me), `research/` (Research), `blog/` (Blog), `speaking.md` (Speaking), and `links.md` (Links). It also holds `new.md`, which isn't in the header but is linked from the homepage and the About page.

The homepage (`content/index.md`) copies gwern.net/index. It has intro paragraphs, then `## ` sections (Newest, Popular, and one per topic) holding wikilink lists, which `custom.scss` lays out in two columns on the homepage only. The lists are edited by hand, so add new pages to them. Wikilink aliases don't render Markdown, so don't put `*italics*` inside them.

Readers contact the owner through the Contact section of `me.md` and through the anonymous Google Form (https://forms.gle/pyYwuRPNt15ssXCa6). Every "anonymous feedback" link, including the footer link, points straight to the form. Email goes to ryanlingo@gmail.com, which pages show with the `email-link` markup from `SiteNav.tsx` so crawlers can't read the address, and anonymous feedback goes through a Google Form with email collection turned off, because GitHub Pages can't receive form submissions.

Excalidraw drawings (`.excalidraw.md` or `.excalidraw` files) are published as their own full-page interactive drawings, and `![[name.excalidraw]]` embeds one in a page.

The owner doesn't want hashtags on the site, so tags are never displayed. PageMeta doesn't show them, `custom.scss` removes the "#" Quartz puts before tag links and hides tags in folder listings, and the topic pages are reached from the homepage headings. Topic tags are nested, so a page tagged `thinking/mental-models` also shows up on the `thinking` tag page. Use only these tags unless the owner adds a new one:

- `intelligence`, `intelligence/ai`, `intelligence/human`
- `technology`, `technology/innovation`
- `futures`, `futures/forecasting` (superforecasting goes here)
- `thinking`, `thinking/mental-models`, `thinking/problem-solving`
- `philosophy`

Write all page copy in first person, including the `description`, which PageMeta shows under the title. Third person belongs only in machine-facing text, i.e. `siteProfile.ts`, the JSON-LD, and `llms.txt`.

Each page should have frontmatter that copies the gwern.net page metadata, as in `content/templates/page.md`. PageMeta shows these fields under the title. The CreatedModifiedDate plugin reads `created` and `modified` from frontmatter first, so `modified` reflects real revisions and not commits that only fix typos. Pages with `draft: true` aren't published.

```yaml
---
title: Page title
description: One sentence summary, used in link previews and search results.
created: 2026-10-19
modified: 2026-10-19      # last meaningful revision, not the file's mtime
status: notes             # notes | draft | in progress | finished
confidence: likely        # Kesselman words: certain, highly likely, likely, possible, unlikely, remote, impossible
importance: 5             # 0 to 10
tags: [thinking/mental-models]
draft: false
---
```
