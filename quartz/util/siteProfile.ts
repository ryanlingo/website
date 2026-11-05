// Facts about the site owner, used for structured data in the page head
// (quartz/components/Head.tsx) and for llms.txt (quartz/plugins/emitters/siteFiles.ts).
// Keep it in sync with content/me.md and content/links.md.

export const profile = {
  name: "Ryan Lingo",
  jobTitle: "Applied AI Research Engineer and Developer Advocate",
  summary:
    "Ryan Lingo is an applied AI research engineer and developer advocate at 99P Labs, the Ohio office of Honda Research Institute. He writes about AI, about how people and teams learn, and about how to solve open-ended problems.",
  worksFor: {
    name: "99P Labs",
    url: "https://www.99plabs.com/",
    parent: { name: "Honda Research Institute", url: "https://usa.honda-ri.com/" },
  },
  knowsAbout: [
    "Applied AI",
    "Forward deployed engineering",
    "Synthetic data",
    "Context engineering",
    "AI evaluation",
    "Philosophy of technology",
  ],
  twitter: "@RyanLingo",
  sameAs: [
    "https://www.linkedin.com/in/ryan-lingo/",
    "https://x.com/RyanLingo",
    "https://github.com/ryanlingo",
    "https://scholar.google.com/citations?user=f3aQo-YAAAAJ",
  ],
}

// The public URL of a page, matching sitemap.xml: the homepage is "/", a folder
// page such as blog/index is "blog/", and any other page is its slug.
export function pageUrl(baseUrl: string, slug: string): string {
  const path =
    slug === "index" ? "" : slug.endsWith("/index") ? slug.slice(0, -"index".length) : slug
  return `https://${baseUrl}/${path}`
}
