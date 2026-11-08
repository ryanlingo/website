import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

// A centered newsletter signup box on blog posts, with the RL logo, a short
// description, and an email field. It stays hidden until the reader has scrolled
// through most of the post, and after the reader closes it or subscribes, it stays
// hidden for a while (see the script below). The styles are in
// quartz/styles/custom.scss.
//
// The form posts straight to the Kit form behind the newsletter landing page, so Kit
// stores the address, sends the confirmation email, and shows the thank-you page in
// a new tab.
const kitFormAction = "https://app.kit.com/forms/10157048/subscriptions"

function NewsletterPrompt({ fileData }: QuartzComponentProps) {
  const slug = fileData.slug ?? ""
  if (!slug.startsWith("blog/") || slug === "blog/index") return null
  return (
    <div class="newsletter-prompt" hidden>
      <div
        class="newsletter-prompt-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-prompt-title"
      >
        <svg class="newsletter-prompt-logo" viewBox="0 0 103 64" aria-hidden="true">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M6 6H20L42 25L30 36L44 58H29L19 42V58H6Z M19 17L28.5 25.5L19 32.5Z"
          />
          <path fill="currentColor" d="M57 6H70L68.5 44.5L92 38.5L95.5 52.5L56 58Z" />
        </svg>
        <h2 id="newsletter-prompt-title">Ryan Lingo's newsletter</h2>
        <p>
          I write about how to use AI well, how people and teams learn, and how to make good
          decisions when you don't have all the information.
        </p>
        <form action={kitFormAction} method="post" target="_blank">
          <input
            type="email"
            name="email_address"
            placeholder="Type your email..."
            aria-label="Email address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        <button type="button" class="newsletter-prompt-close">
          No thanks ›
        </button>
      </div>
    </div>
  )
}

// Show the box once the reader has scrolled 60% of the way down the page. "No
// thanks", the Escape key, or a click outside the box hides it for 30 days, and
// subscribing hides it for a year. The timestamp is kept in localStorage, which can
// be blocked, so every access is wrapped in try/catch, and the box still works
// without it.
NewsletterPrompt.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const overlay = document.querySelector(".newsletter-prompt")
  if (!overlay) return
  const key = "newsletter-prompt-hidden-until"
  let hiddenUntil = 0
  try { hiddenUntil = Number(localStorage.getItem(key)) || 0 } catch {}
  // Adding ?newsletter-prompt to a post's address shows the box right away, to test it.
  const preview = new URLSearchParams(location.search).has("newsletter-prompt")
  if (Date.now() < hiddenUntil && !preview) return
  const form = overlay.querySelector("form")
  const closeButton = overlay.querySelector(".newsletter-prompt-close")
  const hideFor = (days) => {
    overlay.classList.remove("visible")
    setTimeout(() => { overlay.hidden = true }, 300)
    document.removeEventListener("keydown", onKey)
    try { localStorage.setItem(key, String(Date.now() + days * 864e5)) } catch {}
  }
  const close = () => hideFor(30)
  const onKey = (e) => { if (e.key === "Escape") close() }
  const onOverlayClick = (e) => { if (e.target === overlay) close() }
  const onSubmit = () => setTimeout(() => hideFor(365), 0)
  const onScroll = () => {
    const seen = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight
    if (seen < 0.6 && !preview) return
    window.removeEventListener("scroll", onScroll)
    overlay.hidden = false
    requestAnimationFrame(() => overlay.classList.add("visible"))
    document.addEventListener("keydown", onKey)
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  if (preview) onScroll()
  closeButton.addEventListener("click", close)
  overlay.addEventListener("click", onOverlayClick)
  form.addEventListener("submit", onSubmit)
  window.addCleanup(() => {
    window.removeEventListener("scroll", onScroll)
    document.removeEventListener("keydown", onKey)
    closeButton.removeEventListener("click", close)
    overlay.removeEventListener("click", onOverlayClick)
    form.removeEventListener("submit", onSubmit)
  })
})
`

export default (() => NewsletterPrompt) satisfies QuartzComponentConstructor
