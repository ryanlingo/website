import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

// RL logo in the top left of the header, linking to the homepage. The paths match
// quartz/static/logo.svg, and currentColor makes the logo follow light and dark mode.
function SiteLogo({ fileData, displayClass }: QuartzComponentProps) {
  return (
    <a
      href={`${pathToRoot(fileData.slug!)}/`}
      class={classNames(displayClass, "site-logo")}
      aria-label="Ryan Lingo, home"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 64" aria-hidden="true">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M6 6H20L42 25L30 36L44 58H29L19 42V58H6Z M19 17L28.5 25.5L19 32.5Z"
        />
        <path fill="currentColor" d="M57 6H70L68.5 44.5L92 38.5L95.5 52.5L56 58Z" />
      </svg>
    </a>
  )
}

export default (() => SiteLogo) satisfies QuartzComponentConstructor
