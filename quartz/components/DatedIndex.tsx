import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"

// Reverse-chronological list grouped by year, modeled on gwern.net/blog/index. The Blog
// page lists blog posts by the date they were written, and the New page lists all
// writing (blog, notes, reviews, and logs) by the date it last changed.

type Mode = { include: (slug: string) => boolean; date: (f: QuartzPluginData) => Date | undefined }

// Writing lives in these folders. Site pages like About, Me, and Links aren't listed.
const writingFolders = ["blog/", "notes/", "reviews/", "logs/"]
const isWriting = (slug: string) =>
  writingFolders.some((folder) => slug.startsWith(folder)) &&
  !slug.endsWith("/index") &&
  !slug.endsWith(".excalidraw")

const modes: Record<string, Mode> = {
  "blog/index": {
    include: (slug) => slug.startsWith("blog/") && slug !== "blog/index",
    date: (f) => f.dates?.created,
  },
  new: {
    include: isWriting,
    date: (f) => f.dates?.modified ?? f.dates?.created,
  },
}

// Local date parts, so a frontmatter date like 2026-10-19 keeps its day in any time zone.
const pad = (n: number) => String(n).padStart(2, "0")

function DatedIndex({ fileData, allFiles }: QuartzComponentProps) {
  const mode = modes[fileData.slug ?? ""]
  if (!mode) return null

  const entries = allFiles
    .filter((f) => f.slug && mode.include(f.slug) && mode.date(f))
    .map((f) => ({ file: f, date: mode.date(f)! }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  const years = new Map<number, typeof entries>()
  for (const entry of entries) {
    const year = entry.date.getFullYear()
    years.set(year, [...(years.get(year) ?? []), entry])
  }

  return (
    <div class="dated-index">
      {[...years.entries()].map(([year, items]) => (
        <section>
          <h2>{year}</h2>
          <ul>
            {items.map(({ file, date }) => (
              <li>
                <a href={resolveRelative(fileData.slug!, file.slug as FullSlug)} class="internal">
                  {file.frontmatter?.title}
                </a>{" "}
                <span class="dated-index-date">
                  ({pad(date.getMonth() + 1)}-{pad(date.getDate())})
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default (() => DatedIndex) satisfies QuartzComponentConstructor
