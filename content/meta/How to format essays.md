---
title: How to format essays
draft: true
---

This guide explains how to write a page in Obsidian so that it looks right on ryanlingo.com. The `meta` folder is excluded from the website, so this page only appears in Obsidian.

## Set up Obsidian (once)

1. First, in Obsidian, choose "Open folder as vault" and pick the `content` folder inside the website repo, i.e. `~/Code/website/content`. Don't open the repo folder itself, because then Obsidian would also show the Quartz code.
2. Second, in Settings, under Core plugins, turn on Templates, and set its "Template folder location" to `templates`.
3. Third, in Settings, under Files and links, set "Default location for new attachments" to "Same folder as current file", and turn off "Use [[Wikilinks]]" only if you prefer Markdown links. The site handles both.
4. Fourth, in Settings, under Community plugins, install and turn on Excalidraw by Zsolt Viczián, if you want to make diagrams.

## The writing workflow

1. First, write or edit a page in Obsidian, as described in the rest of this guide.
2. Second, preview the site. In a terminal, run `npx quartz build --serve` in the `~/Code/website` folder, and open http://localhost:8080. The preview updates each time you save. When you add, rename, or delete a page, stop the preview with Ctrl+C and start it again, because otherwise the Blog and New lists and the homepage won't show the change.
3. Third, when a page is ready, set `draft: false` and update its `modified` date.
4. Fourth, publish by running `npx quartz sync` in the same folder. It saves your changes to git, pushes them to GitHub, and GitHub rebuilds ryanlingo.com within a few minutes.

## Create a page

Each page is a Markdown file in one of the section folders, and the folder decides which section the page appears in:

- `blog/` holds your writing, both long pieces you revise over time and short posts.
- `notes/` holds short ideas, some of which grow into blog posts.
- `reviews/` holds reviews of books, papers, and films.
- `research/` holds `index.md`, the list of your research papers. Add each new paper to it.
- `logs/` holds plain records, e.g. experiments and the tools you use.

The file name becomes the web address, so `blog/the curation problem.md` is published at `ryanlingo.com/blog/the-curation-problem`. Use short, lowercase file names, because changing a file name later breaks links that other people saved.

To start a page from the template, first turn on the core Templates plugin in Obsidian's settings and set its template folder to `templates`. Then create a new note and run "Templates: Insert template" from the command palette, and choose `page`.

## Fill in the properties

The block between the two `---` lines at the top of the file holds the page's properties. Obsidian shows the block as a "Properties" table, and the website shows the values under the page title.

```yaml
---
title: The Curation Problem
description: Why forecasters begin with how often similar events happened before.
created: 2026-10-19
modified: 2026-10-19
status: draft
confidence: likely
importance: 4
tags: [futures/forecasting, thinking/mental-models]
draft: false
---
```

| Property      | What to put in it                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| `title`       | The page title, written in sentence case. The site shows it in small caps.                            |
| `description` | One sentence that summarizes the page. It appears in italics under the title and in link previews.    |
| `created`     | The date you started the page, as `YYYY-MM-DD`. Don't change it later.                                |
| `modified`    | The date of the last real change. Update it when you change the argument, not when you fix a typo.   |
| `status`      | One of `notes`, `draft`, `in progress`, or `finished`.                                                |
| `confidence`  | How likely you think the main claims are, using one of: certain, highly likely, likely, possible, unlikely, remote, impossible. |
| `importance`  | A number from 0 to 10 for how much you think the topic matters.                                       |
| `tags`        | One or more topic tags from the list below. The site doesn't show tags on the page, but it uses them to build the topic pages that the homepage links to. |
| `draft`       | `true` keeps the page off the website. Set it to `false` when you want to publish.                    |

Use only these topic tags, unless you decide to add a new one:

- `intelligence`, `intelligence/ai`, `intelligence/human`
- `technology`, `technology/innovation`
- `futures`, `futures/forecasting`
- `thinking`, `thinking/mental-models`, `thinking/problem-solving`
- `philosophy`

A page tagged `thinking/mental-models` also shows up on the `thinking` tag page, so you don't need to add both.

## Write the body

Don't put a `# Title` heading in the body, because the site already shows the title from the properties. Use `##` for main sections and `###` for subsections. The site lists these headings in a numbered table of contents at the top left of the page. To hide the table of contents on a short page, add `enableToc: false` to the properties.

Separate paragraphs with a blank line. The site indents the first line of each paragraph instead of leaving a gap between paragraphs. If the page starts with a paragraph rather than a heading, the first letter becomes a large drop cap.

Write emphasis as `*italics*` and `**bold**`. The site uses italics for emphasis and titles of works, as gwern.net does, so use bold sparingly.

## Link to other pages

Link to another page on the site with a wikilink, e.g. `[[the-curation-problem]]`. To show different text, write `[[the-curation-problem|curation]]`, and to link to a section, write `[[the-curation-problem#The problem is old]]`. Obsidian suggests file names as you type, so you rarely need to type the whole name.

Link to other websites with a normal Markdown link, e.g. `[gwern.net](https://gwern.net/about)`.

When a reader hovers over a link to another page on the site, the site shows a preview of that page. Each page also lists the pages that link to it at the bottom, under "Backlinks".

## Add footnotes

Put a footnote marker right after the punctuation where you want the number to appear, and write the note itself at the bottom of the file:

```markdown
Good forecasters look up the base rate first.[^tetlock]

[^tetlock]: Philip Tetlock and Dan Gardner, *Superforecasting* (2015).
```

For a bibliography, put the entries under a `## References` heading at the end of the page, one entry per paragraph. The site formats them with a hanging indent.

The label after `^` can be a number or a word, and the site numbers the notes in order either way. Words like `[^tetlock]` are easier to keep track of when you move text around. The site collects the notes in a "Footnotes" section at the end of the page, with a link back to each marker.

## Add quotes, lists, and tables

Start each line of a quote with `>`. Put the source on its own line at the end of the quote:

```markdown
> The prevailing tendency to underweight or ignore distributional information is perhaps the major error of intuitive prediction.
>
> Kahneman and Tversky, 1979
```

Write numbered lists with `1.` and bulleted lists with `-`. Write tables with pipes and a row of dashes under the header, as in the properties table above. Obsidian's "Insert table" command creates the layout for you.

For a highlighted note or warning, use an Obsidian callout:

```markdown
> [!note] Update, 2027
> The forecast in this section resolved as false.
```

For math, write `$x^2$` inside a sentence, or put `$$ ... $$` on its own lines for a displayed equation.

## Add images and drawings

Put images in the same folder as the page, or in an `images` subfolder, and embed them with `![[chart.png]]`. To set the width, write `![[chart.png|600]]`. Set Obsidian's "Default location for new attachments" to "Same folder as current file", so that pasted images land in the right place.

For diagrams, use the Obsidian Excalidraw community plugin by Zsolt Viczián:

1. First, install the plugin from Obsidian's Community plugins settings.
2. Second, create a drawing with the "Excalidraw: Create new drawing" command, and save it in the same folder as the page. The plugin saves files ending in `.excalidraw.md`.
3. Third, embed the drawing in the page with `![[name of drawing.excalidraw]]`.

The site shows an embedded drawing as a still image in a frame, and readers can't zoom or drag it. Each drawing also gets its own full page at the drawing's file name, e.g. `ryanlingo.com/blog/name-of-drawing.excalidraw`.

## Import a post from Medium

To bring one of your Medium posts onto the site, run this in `~/Code/website`, with the post's address, a one-sentence description, and its topic tags:

```
python3 scripts/import-medium.py https://medium.com/99p-labs/... --description "One sentence." --tags intelligence/ai
```

The script saves the post in `blog/` with its images, dated the day it was published on Medium, and adds a line at the end that links to the original. It leaves out the 99P Labs subscribe paragraph. Afterward, replace each "TODO: describe this image" with a short description of the image, and add the post to the homepage lists. Run `python3 scripts/import-medium.py --list` to see which posts it can import, because Medium's feed only holds your 10 most recent posts.

## Keep pages private

A page with `draft: true` stays off the website. Files in the `private` folder also stay off the website, and they're also excluded from git, so they only exist on your computer.

## Preview and publish

To see your changes, run `npx quartz build --serve` in the repo folder and open http://localhost:8080. The preview updates each time you save a file.

When you publish a page, also add it to the homepage (`index.md`). Put it at the top of the "Newest" list, and under its topic heading. Don't use `*italics*` inside a link's display text, because the site shows the asterisks.

The "New" page and the "Blog" page build their lists automatically. "New" lists your writing by its `modified` date, and "Blog" lists your writing by its `created` date. So keep `modified` up to date when you change a page.

To publish, run `npx quartz sync`. It commits your changes and pushes them to GitHub, and GitHub then rebuilds ryanlingo.com within a few minutes.
