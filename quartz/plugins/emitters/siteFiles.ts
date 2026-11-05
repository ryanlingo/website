import { QuartzEmitterPlugin } from "../types"
import { FullSlug } from "../../util/path"
import { BuildCtx } from "../../util/ctx"
import { ProcessedContent } from "../vfile"
import { write } from "./helpers"
import { profile, pageUrl } from "../../util/siteProfile"

// Writes robots.txt, which points search engines to the sitemap, and llms.txt, a
// Markdown guide to the site for AI tools (https://llmstxt.org). Both are rebuilt
// from the pages on every build, so new posts show up without editing anything.

// Pages listed under "Main pages" in llms.txt, in this order.
const mainPages = ["me", "research/index", "speaking", "about", "links"]

async function* writeSiteFiles(ctx: BuildCtx, content: ProcessedContent[]) {
  const baseUrl = ctx.cfg.configuration.baseUrl!
  const pages = content.map(([, file]) => file.data)
  const entry = (d: (typeof pages)[number]) => {
    const fm = (d.frontmatter ?? {}) as Record<string, unknown>
    const title = String(fm.title ?? d.slug)
    const description = String(fm.description ?? "").trim()
    return `- [${title}](${pageUrl(baseUrl, d.slug!)})${description ? `: ${description}` : ""}`
  }

  const posts = pages
    .filter(
      (d) =>
        d.slug?.startsWith("blog/") &&
        d.slug !== "blog/index" &&
        !d.slug.endsWith(".excalidraw") &&
        d.dates?.created,
    )
    .sort((a, b) => b.dates!.created.getTime() - a.dates!.created.getTime())
  const main = mainPages
    .map((slug) => pages.find((d) => d.slug === slug))
    .filter((d): d is (typeof pages)[number] => !!d)
  const logs = pages.filter((d) => d.slug?.startsWith("logs/") && d.slug !== "logs/index")

  const llms = `# ${profile.name}

> ${profile.summary}

The site is modeled on gwern.net, so pages are long pieces that the author keeps revising. Each page lists when it was started and last changed, how finished it is, and how confident the author is in its main claims. The writing is licensed under CC BY 4.0.

## Main pages

${main.map(entry).join("\n")}

## Blog posts

${posts.map(entry).join("\n")}

## Optional

${logs.map(entry).join("\n")}
- [RSS feed of blog posts](https://${baseUrl}/index.xml)
- [Sitemap](https://${baseUrl}/sitemap.xml)
`

  const robots = `User-agent: *
Allow: /

Sitemap: https://${baseUrl}/sitemap.xml
`

  yield write({ ctx, slug: "llms" as FullSlug, ext: ".txt", content: llms })
  yield write({ ctx, slug: "robots" as FullSlug, ext: ".txt", content: robots })
}

export const SiteFiles: QuartzEmitterPlugin = () => ({
  name: "SiteFiles",
  emit: (ctx, content) => writeSiteFiles(ctx, content),
  // Rebuild both files on every change in the preview server, since any new or
  // changed page can change llms.txt.
  partialEmit: (ctx, content) => writeSiteFiles(ctx, content),
})
