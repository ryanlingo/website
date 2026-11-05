import { QuartzEmitterPlugin } from "../types"
import { FullSlug } from "../../util/path"
import { BuildCtx } from "../../util/ctx"
import { ProcessedContent } from "../vfile"
import { write } from "./helpers"

// RSS feed (index.xml) of blog posts only, newest first by the date each was written.
// The content-index plugin's feed lists any recently dated page, so tag pages and
// drawings, which get the build date, pushed the posts out of it.

const escape = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

async function* writeFeed(ctx: BuildCtx, content: ProcessedContent[], limit: number) {
  const base = `https://${ctx.cfg.configuration.baseUrl}`
  const posts = content
    .map(([, file]) => file.data)
    .filter(
      (d) =>
        d.slug?.startsWith("blog/") &&
        d.slug !== "blog/index" &&
        !d.slug.endsWith(".excalidraw") &&
        d.dates?.created,
    )
    .sort((a, b) => b.dates!.created.getTime() - a.dates!.created.getTime())
    .slice(0, limit)

  const items = posts
    .map((d) => {
      const link = `${base}/${d.slug}`
      const fm = (d.frontmatter ?? {}) as Record<string, unknown>
      return `    <item>
      <title>${escape(String(fm.title ?? d.slug))}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${escape(String(fm.description ?? ""))}</description>
      <pubDate>${d.dates!.created.toUTCString()}</pubDate>
    </item>`
    })
    .join("\n")

  const title = escape(ctx.cfg.configuration.pageTitle)
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${title}</title>
    <link>${base}</link>
    <description>Blog posts by ${title}</description>
${items}
  </channel>
</rss>
`
  yield write({ ctx, slug: "index" as FullSlug, ext: ".xml", content: xml })
}

export const BlogFeed: QuartzEmitterPlugin<{ limit?: number }> = (opts) => ({
  name: "BlogFeed",
  emit: (ctx, content) => writeFeed(ctx, content, opts?.limit ?? 20),
  // Rebuild the whole feed on every change in the preview server, since any new or
  // changed post can change its order.
  partialEmit: (ctx, content) => writeFeed(ctx, content, opts?.limit ?? 20),
})
