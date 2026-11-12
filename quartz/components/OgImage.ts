// The layout of the link preview image that apps show when someone shares a page,
// e.g. in iMessage, Slack, or LinkedIn. It replaces the og-image plugin's default
// layout (see quartz.ts). The image is 1200 by 630 pixels, and satori draws it from
// the plain element objects below, which follow the shape of React elements.
//
// The left panel holds a large RL logo on a color that depends on the section, and
// the right side holds the section name, the page title, the description, and the
// site address.

type Style = Record<string, string | number>
type El = { type: string; props: { style?: Style; children?: unknown; [k: string]: unknown } }
const h = (type: string, style: Style, children?: unknown, extra: Record<string, unknown> = {}): El => ({
  type,
  props: { style, children, ...extra },
})

// The same paths as quartz/static/logo.svg, filled white for the colored panel.
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 64"><path fill="#ffffff" fill-rule="evenodd" d="M6 6H20L42 25L30 36L44 58H29L19 42V58H6Z M19 17L28.5 25.5L19 32.5Z"/><path fill="#ffffff" d="M57 6H70L68.5 44.5L92 38.5L95.5 52.5L56 58Z"/></svg>`
const logoUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`

const paper = "#faf7f0"
const ink = "#161616"
const gray = "#6b6b6b"

// Each section gets its own panel color, so a shared blog post and a shared research
// page look different in a message thread.
const sections: [prefix: string, label: string, color: string][] = [
  ["blog/", "Blog", "#b4432d"],
  ["research/", "Research", "#2f5d8a"],
  ["speaking", "Speaking", "#3d7a4e"],
  ["me", "About me", "#7a4e8c"],
  ["about", "About this site", "#7a4e8c"],
  ["links", "Links", "#7a4e8c"],
  ["logs/", "Logs", "#8a6d2f"],
  ["new", "What's new", "#8a6d2f"],
  ["tags/", "Topic", "#8a6d2f"],
]

function sectionFor(slug: string): { label: string; color: string } {
  for (const [prefix, label, color] of sections) {
    if (slug === prefix || slug.startsWith(prefix)) return { label, color }
  }
  return { label: "Philosophy, research, and writing", color: ink }
}

function blogDate(fileData: any): string | null {
  const created = fileData.frontmatter?.created
  if (!created) return null
  const d = new Date(created)
  if (isNaN(d.getTime())) return null
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", timeZone: "UTC" })
}

export function ogImage({ title, description, fileData }: any): El {
  const slug: string = fileData.slug ?? "index"
  const { label, color } = sectionFor(slug)
  const date = slug.startsWith("blog/") && slug !== "blog/index" ? blogDate(fileData) : null
  // Long titles get a smaller font and a shorter description, so they fit above the footer.
  // A title over 16 characters wraps onto a second line, so its description is shorter too.
  const titleSize = title.length > 40 ? 54 : title.length > 24 ? 66 : 80
  const descMax = title.length > 40 ? 100 : title.length > 16 ? 120 : 170
  const desc =
    description.length > descMax
      ? description.slice(0, descMax).replace(/[\s,;:]+\S*$/, "") + "..."
      : description

  return h(
    "div",
    { display: "flex", width: "100%", height: "100%", backgroundColor: paper, fontFamily: "Source Serif 4" },
    [
      h(
        "div",
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 380,
          height: "100%",
          backgroundColor: color,
        },
        h("img", { width: 270, height: 168 }, undefined, { src: logoUri, width: 270, height: 168 }),
      ),
      h(
        "div",
        {
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "56px 64px 52px 64px",
        },
        [
          h(
            "div",
            {
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              color,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            },
            label,
          ),
          h("div", { display: "flex", width: 72, height: 6, backgroundColor: color, marginTop: 18 }),
          h(
            "div",
            {
              display: "flex",
              marginTop: 30,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.1,
              color: ink,
            },
            title,
          ),
          h(
            "div",
            { display: "flex", marginTop: 26, fontSize: 32, lineHeight: 1.35, color: gray },
            desc,
          ),
          h("div", { display: "flex", flex: 1 }),
          h(
            "div",
            { display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 30, color: ink },
            [
              h("div", { display: "flex", fontWeight: 700, fontSize: 52 }, "ryanlingo.com"),
              h("div", { display: "flex", color: gray }, date ?? ""),
            ],
          ),
        ],
      ),
    ],
  )
}
