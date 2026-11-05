import { i18n } from "../i18n"
import { FullSlug, getFileExtension, joinSegments, pathToRoot } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref, googleFontSubsetHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"
import { profile, pageUrl } from "../util/siteProfile"

export default (() => {
  const Head: QuartzComponent = ({
    cfg,
    fileData,
    externalResources,
    ctx,
  }: QuartzComponentProps) => {
    const titleSuffix = cfg.pageTitleSuffix ?? ""
    const title =
      (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + titleSuffix
    // The browser tab and search results show "Page | Ryan Lingo", except on the
    // homepage, whose title is already the site name. Link previews use the plain title.
    const isHome = fileData.slug === "index"
    const documentTitle = isHome || title === cfg.pageTitle ? title : `${title} | ${cfg.pageTitle}`
    // Tag pages have no description of their own, so describe them by their topic.
    const isTagPage = !!fileData.slug?.startsWith("tags/")
    const description =
      fileData.frontmatter?.socialDescription ??
      fileData.frontmatter?.description ??
      (isTagPage
        ? `Writing by ${cfg.pageTitle} on ${fileData.frontmatter?.title ?? "this topic"}.`
        : unescapeHTML(
            fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description,
          ))

    const { css, js, additionalHead } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/icon.png")

    // Url of current page
    const socialUrl =
      fileData.slug === "404"
        ? url.toString()
        : pageUrl(cfg.baseUrl ?? "example.com", fileData.slug!)

    // quartz.ts makes the og-image plugin write a PNG for each Markdown page. Pages
    // without one, e.g. tag pages, use the homepage's image instead of Quartz's logo.
    const usesCustomOgImage = ctx.cfg.plugins.emitters.some((e) => e.name === "CustomOgImages")
    const base = `https://${cfg.baseUrl}`
    const ogImage =
      usesCustomOgImage && fileData.filePath
        ? `${base}/${fileData.slug}-og-image.png`
        : `${base}/index-og-image.png`

    // Blog posts are articles, with an author and dates. Everything else is a web page.
    const isPost =
      !!fileData.slug?.startsWith("blog/") &&
      fileData.slug !== "blog/index" &&
      !fileData.slug.endsWith(".excalidraw")
    const created = fileData.dates?.created
    const modified = fileData.dates?.modified
    const person = {
      "@type": "Person",
      "@id": `${base}/#person`,
      name: profile.name,
      url: `${base}/me`,
      jobTitle: profile.jobTitle,
      description: profile.summary,
      worksFor: {
        "@type": "Organization",
        name: profile.worksFor.name,
        url: profile.worksFor.url,
        parentOrganization: {
          "@type": "Organization",
          name: profile.worksFor.parent.name,
          url: profile.worksFor.parent.url,
        },
      },
      knowsAbout: profile.knowsAbout,
      sameAs: profile.sameAs,
    }
    const website = {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: `${base}/`,
      name: cfg.pageTitle,
      description: isHome ? description : profile.summary,
      inLanguage: cfg.locale,
      author: { "@id": person["@id"] },
      publisher: { "@id": person["@id"] },
    }
    const page = isPost
      ? {
          "@type": "BlogPosting",
          "@id": `${socialUrl}#article`,
          headline: title,
          description,
          url: socialUrl,
          mainEntityOfPage: socialUrl,
          image: ogImage,
          datePublished: created?.toISOString(),
          dateModified: modified?.toISOString(),
          author: { "@id": person["@id"], name: profile.name },
          publisher: { "@id": person["@id"] },
          isPartOf: { "@id": website["@id"] },
          keywords: fileData.frontmatter?.tags,
          inLanguage: cfg.locale,
        }
      : {
          "@type": fileData.slug === "me" ? "ProfilePage" : "WebPage",
          "@id": `${socialUrl}#webpage`,
          name: title,
          description,
          url: socialUrl,
          image: ogImage,
          isPartOf: { "@id": website["@id"] },
          author: { "@id": person["@id"] },
          ...(fileData.slug === "me" ? { mainEntity: { "@id": person["@id"] } } : {}),
          inLanguage: cfg.locale,
        }
    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [person, website, page],
    })
      // Keep "</script>" in page text from ending the script element early.
      .replace(/</g, "\\u003c")

    const coreStylesheet = css[0]?.content
    const coreScript = js.find(
      (r) => r.loadTime === "beforeDOMReady" && r.contentType === "external",
    )

    return (
      <head>
        <title>{documentTitle}</title>
        <meta charSet="utf-8" />
        {coreStylesheet && <link rel="preload" href={coreStylesheet} as="style" />}
        {coreScript && coreScript.contentType === "external" && (
          <link rel="preload" href={coreScript.src} as="script" />
        )}
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
            {cfg.theme.typography.title && (
              <link rel="stylesheet" href={googleFontSubsetHref(cfg.theme, cfg.pageTitle)} />
            )}
          </>
        )}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:site_name" content={cfg.pageTitle} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content={isPost ? "article" : "website"} />
        <meta property="og:locale" content={cfg.locale.replace("-", "_")} />
        <meta name="author" content={profile.name} />
        {isPost && (
          <>
            <meta property="article:author" content={`${base}/me`} />
            {created && <meta property="article:published_time" content={created.toISOString()} />}
            {modified && <meta property="article:modified_time" content={modified.toISOString()} />}
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={profile.twitter} />
        <meta name="twitter:creator" content={profile.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:alt" content={description} />

        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta
          property="og:image:type"
          content={`image/${(getFileExtension(ogImage) ?? ".png").replace(".", "")}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={description} />

        {cfg.baseUrl && (
          <>
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}

        {cfg.baseUrl && fileData.slug !== "404" && <link rel="canonical" href={socialUrl} />}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${cfg.pageTitle} blog`}
          href={`${base}/index.xml`}
        />
        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        <meta name="generator" content="Quartz" />

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
