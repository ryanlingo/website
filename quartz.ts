import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes"
import SiteLogo from "./quartz/components/SiteLogo"
import SiteNav from "./quartz/components/SiteNav"
import PageMeta from "./quartz/components/PageMeta"
import DatedIndex from "./quartz/components/DatedIndex"
import { BlogFeed } from "./quartz/plugins/emitters/blogFeed"
import { SiteFiles } from "./quartz/plugins/emitters/siteFiles"
import { CustomOgImages } from "@quartz-community/og-image"
import { ogImage } from "./quartz/components/OgImage"
import sharp from "sharp"
import fs from "node:fs/promises"

const config = await loadQuartzConfig()

// Put the RL logo and the gwern.net style section links at the start of the header,
// and the metadata block in beforeBody, after the breadcrumbs and the article title.
const loaded = await loadQuartzLayout()
const siteLogo = SiteLogo()
const siteNav = SiteNav()
const pageMeta = PageMeta()
const datedIndex = DatedIndex()
const customize = <T extends { header?: unknown[]; beforeBody?: unknown[]; afterBody?: unknown[] }>(
  layout: T,
): T => {
  const header = [siteLogo, siteNav, ...(layout.header ?? [])]
  const beforeBody = [...(layout.beforeBody ?? [])]
  beforeBody.splice(2, 0, pageMeta)
  // The dated list on the Blog and New pages goes right after the page text.
  const afterBody = [datedIndex, ...(layout.afterBody ?? [])]
  return { ...layout, header, beforeBody, afterBody }
}
export const layout = {
  defaults: customize(loaded.defaults),
  byPageType: Object.fromEntries(
    Object.entries(loaded.byPageType).map(([pageType, l]) => [pageType, customize(l)]),
  ),
}

// loadQuartzConfig builds the page emitter from the YAML layout, so replace it with
// one that uses the customized layout above.
config.plugins.emitters = config.plugins.emitters.map((emitter) =>
  emitter.name === "PageTypeDispatcher" ? PageTypeDispatcher(layout) : emitter,
)

// The RSS feed lists blog posts only (see quartz/plugins/emitters/blogFeed.ts).
config.plugins.emitters.push(BlogFeed({ limit: 20 }))

// robots.txt and llms.txt (see quartz/plugins/emitters/siteFiles.ts).
config.plugins.emitters.push(SiteFiles())

// The og-image plugin draws each page's link preview image. Change it in three ways:
// 1. Draw the images without tags, because the site never shows hashtags.
// 2. Save them as PNG instead of WebP, because some apps, e.g. LinkedIn, don't show
//    WebP previews reliably.
// 3. Drop its <meta> tags, because Head.tsx writes the preview tags for the PNG.
// It also draws the images with the site's own layout in quartz/components/OgImage.ts.
type Emitter = (typeof config.plugins.emitters)[number]
const withoutTags = <T extends { data: { frontmatter?: Record<string, unknown> } }>(file: T): T =>
  ({ ...file, data: { ...file.data, frontmatter: { ...file.data.frontmatter, tags: [] } } }) as T
async function* asPng(paths: AsyncIterable<string>) {
  for await (const webp of paths) {
    const png = webp.replace(/\.webp$/, ".png")
    await sharp(webp).png().toFile(png)
    await fs.rm(webp)
    yield png
  }
}
config.plugins.emitters = config.plugins.emitters.map((emitter): Emitter => {
  if (emitter.name !== "CustomOgImages") return emitter
  emitter = CustomOgImages({ imageStructure: ogImage as any }) as Emitter
  return {
    ...emitter,
    externalResources: undefined,
    emit: (ctx, content, resources) =>
      asPng(
        emitter.emit(
          ctx,
          content.map(([tree, file]) => [tree, withoutTags(file)]),
          resources,
        ) as AsyncIterable<string>,
      ) as ReturnType<Emitter["emit"]>,
    partialEmit: emitter.partialEmit
      ? (ctx, content, resources, changes) =>
          asPng(
            emitter.partialEmit!(
              ctx,
              content,
              resources,
              changes.map((c) => (c.file ? { ...c, file: withoutTags(c.file) } : c)),
            ) as AsyncIterable<string>,
          ) as ReturnType<NonNullable<Emitter["partialEmit"]>>
      : undefined,
  }
})

// The Excalidraw plugin tags every drawing page "excalidraw", but no tag page is built
// for it, so the tags index would link to a missing page. Drop that tag.
for (const pageType of config.plugins.pageTypes ?? []) {
  if (pageType.name !== "ExcalidrawPage" || !pageType.generate) continue
  const generate = pageType.generate
  pageType.generate = (...args: Parameters<typeof generate>) => {
    const pages = generate(...args)
    for (const page of pages) delete page.data?.frontmatter?.tags
    return pages
  }
}

export default config
