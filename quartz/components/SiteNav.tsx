import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

// Row of boxed links to the main sections, modeled on the gwern.net header.
const links: [string, string][] = [
  ["Site", "about"],
  ["Me", "me"],
  ["Research", "research/"],
  ["Blog", "blog/"],
  ["Speaking", "speaking"],
  ["Links", "links"],
]

function SiteNav({ fileData, displayClass }: QuartzComponentProps) {
  const root = pathToRoot(fileData.slug!)
  return (
    <nav class={classNames(displayClass, "site-nav")} aria-label="Site sections">
      {links.map(([label, path]) => (
        <a href={`${root}/${path}`} class="internal">
          {label}
        </a>
      ))}
    </nav>
  )
}

// Builds mailto links from data attributes after the page loads, so the
// full email address never appears in the HTML that crawlers read. Usage in
// Markdown: <a class="email-link" data-user="name" data-domain="example.com">name [at] example [dot] com</a>
SiteNav.afterDOMLoaded = `
document.addEventListener("nav", () => {
  for (const a of document.querySelectorAll("a.email-link[data-user][data-domain]")) {
    const address = a.dataset.user + "@" + a.dataset.domain
    a.href = "mailto:" + address
    a.textContent = address
  }
  // Open external links in a new tab. The crawl-links plugin does this for
  // links in page content, and this covers the rest, e.g. the footer.
  for (const a of document.querySelectorAll('a[href^="http"]')) {
    if (a.hostname !== location.hostname) {
      a.target = "_blank"
      a.rel = "noopener"
    }
  }
})
`

export default (() => SiteNav) satisfies QuartzComponentConstructor
