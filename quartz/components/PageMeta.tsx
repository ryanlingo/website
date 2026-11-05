import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Metadata block under the page title, modeled on gwern.net: the description in
// italics, then one line with dates, status, confidence, and importance. Topic tags
// aren't shown, because the owner doesn't want hashtags on the site.

const pad = (n: number) => String(n).padStart(2, "0")
const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

function PageMeta({ fileData, displayClass }: QuartzComponentProps) {
  // The homepage, folder pages, and tag pages have no page metadata, and Quartz already
  // prints the description in folder and tag listings.
  const slug = fileData.slug ?? ""
  if (
    ["index", "new", "tags"].includes(slug) ||
    slug.endsWith("/index") ||
    slug.startsWith("tags/")
  )
    return null
  const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>
  const description = fm.description as string | undefined
  const created = fileData.dates?.created
  const modified = fileData.dates?.modified

  const fields: preact.JSX.Element[] = []
  if (created) {
    const range =
      modified && isoDate(modified) !== isoDate(created)
        ? `${isoDate(created)}–${isoDate(modified)}`
        : isoDate(created)
    fields.push(<span class="page-meta-dates">{range}</span>)
  }
  if (fm.status) fields.push(<span class="page-meta-status">{String(fm.status)}</span>)
  if (fm.confidence)
    fields.push(
      <span>
        confidence: <em>{String(fm.confidence)}</em>
      </span>,
    )
  if (fm.importance !== undefined && fm.importance !== null)
    fields.push(
      <span>
        importance: <em>{String(fm.importance)}</em>
      </span>,
    )

  return (
    <div class={classNames(displayClass, "page-meta")}>
      {description && <div class="page-meta-description">{description}</div>}
      {fields.length > 0 && (
        <div class="page-meta-fields">
          {fields.map((field, i) => (
            <>
              {i > 0 && <span class="page-meta-sep">•</span>}
              {field}
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default (() => PageMeta) satisfies QuartzComponentConstructor
