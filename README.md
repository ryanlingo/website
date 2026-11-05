# ryanlingo.com

This repo is the source of [ryanlingo.com](https://ryanlingo.com), the personal website of Ryan Lingo, an applied AI research engineer and developer advocate at [99P Labs](https://www.99plabs.com/). The site holds my writing on AI, learning, and how to solve open-ended problems, along with my [research](https://ryanlingo.com/research/) and [talks](https://ryanlingo.com/speaking). It's modeled on [gwern.net](https://gwern.net/about), so pages are long pieces that I keep revising.

The site is built with [Quartz 5](https://quartz.jzhao.xyz/), which turns a folder of Markdown files into a static website. I write the pages in [Obsidian](https://obsidian.md/).

## How the repo is organized

- `content/` holds the pages, as an Obsidian vault. Each Markdown file becomes a page, and its folder becomes part of its web address, e.g. `content/blog/the-curation-problem.md` is published at `ryanlingo.com/blog/the-curation-problem`.
- `quartz.config.yaml` holds the site settings, the list of plugins, and the page layout.
- `quartz.ts` adds the site's own components and changes to plugins.
- `quartz/components/` and `quartz/plugins/emitters/` hold the site's own components, e.g. the header links, the page metadata, the RSS feed, and `robots.txt` and `llms.txt`.
- `quartz/styles/custom.scss` holds the site's styles.
- `content/logs/site-changes.md` is the [site changelog](https://ryanlingo.com/logs/site-changes).

## Running the site locally

Quartz needs Node 22 or later and npm 10.9.2 or later.

```
npm ci
npx quartz plugin install
npx quartz build --serve
```

The last command serves the site at http://localhost:8080 and rebuilds it when a file changes. `npx quartz build` writes the site to `public/` without serving it.

## Deployment

Each push to `main` runs `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages at ryanlingo.com.

## License

The writing in `content/` is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). You can copy, change, and share it for any purpose, as long as you credit Ryan Lingo and link back to the original page.

The code is based on [Quartz](https://github.com/jackyzha0/quartz) by Jacky Zhao, and it's licensed under the MIT License in [LICENSE.txt](LICENSE.txt).
