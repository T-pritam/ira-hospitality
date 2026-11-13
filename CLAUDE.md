# CLAUDE.md: IRA Hospitality website

Marketing site for **IRA Hospitality**, a Hyderabad hospitality consulting, branding and operations studio. It replaces the old React site at https://www.irahospitality.co.in. This repo is self-contained: code, assets, the research capture of the old site, and project notes.

**Read before working:**
1. `docs/HANDOFF.md`: current status, every decision made and why, backend facts, open client items.
2. `docs/source-pack/source-pack.md`: the source of truth for content (verbatim copy of every page), colours, fonts and old-site behaviour. Screenshots of the old site are in `docs/source-pack/screenshots/`.

## Commands
```bash
npm install
npm run dev                      # http://localhost:4321
npm run build                    # prebuild syncs careers from the API (never fails), then builds dist/
npm run preview                  # serve dist/
node scripts/check-links.mjs     # verify every internal link/asset in dist/ (run after build)
node scripts/prep-assets.mjs     # regenerate trimmed logos, favicons, og-image from src/assets/img
```
Requires Node 18.20+. On npm 11, install scripts are blocked by default, but sharp and esbuild still work without them.

## Stack
Astro 5 (static output, `format: 'directory'`, `site: https://www.irahospitality.co.in`), GSAP 3.13 (ScrollTrigger + SplitText, free plugins in the `gsap` package), Lenis 1.3, self-hosted Inter Variable (`@fontsource-variable/inter`) plus Instrument Serif italic (`@fontsource/instrument-serif`), `@astrojs/sitemap`, and sharp for AVIF/WebP. There is no CSS framework: plain CSS with tokens.

## Layout
```
src/data/        content: site.ts (contact, nav), projects.ts, services.ts, people.ts (founders, testimonials, client names), jobs.ts + jobs.json, images.ts (glob of src/assets/img)
src/pages/       index, about, contact, blogs, blog/ (post via ?slug=), projects/[slug], services/[slug], careers/[id], careers/apply/[id], privacy-policy, terms-conditions, 404
src/components/  Header (floating glass bar + frosted mobile menu), Footer, SEO (meta, OG, JSON-LD), PageHero, CtaBand, ProjectCard, FounderCard, ContactForm, Button, Icon (inline SVG set)
src/layouts/Base.astro   head, preloader (home only, once per session), header/footer, back-to-top
src/styles/global.css    ALL styles + design tokens (:root)
src/scripts/main.ts      Lenis, header theme switching, menu, reveal system, hero ring, pointer effects, intro timeline, lazy-loads feature modules
src/scripts/threads.ts   canvas threads of light behind the home hero
src/scripts/modules/     reel (pinned horizontal work reel), voices (testimonial tabs), accordion, forms, map
docs/            handoff notes + source pack of the old site
```

## Design direction (v2, do not drift back)
The old site is the source for **content and page flow only**. Its look (black canvas, wireframe dodecahedrons, hairlines, vertical rail label, circular "scroll down" badge, uppercase tracked labels, orange pill with a black disc) was deliberately dropped at the agency's request. Do not reintroduce it.
- **It must not look templated.** Avoid the generic patterns: a centred hero with a pill badge, twin buttons and gradient blobs; glossy gradient buttons with glows; sparkle icons; every section head centred; oversized radii. Prefer editorial, asymmetric layouts and real, specific details (project names, the studio's coordinates).
- **Canvas:** clear, light and slightly warm. Paper `#faf8f4`, white, soft `#f3f0ea`, ink `#1c1b19`. Dark is used as rounded "tiles" on the light page: the home hero and the work reel on the home page, at most one elsewhere.
- **Glass:** frosted surfaces (`.glass`, `.glass-dark`, the floating header bar, `.form-card`) sit over soft warm light (`.aurora` with three `<i>` blobs). Keep backdrop-filter use to a handful of elements per screen.
- **Accents:** primary buttons are flat orange `#ff6900` with dark text (no gradients or glows) and invert on hover; orange is also used for small highlights (the hand-drawn stroke, links, progress line), `--orange-text` `#c2410c` when orange is used as text on light, logo gold `#beaa8f`. All tokens are in `global.css` `:root`.
- **Type:** two voices. Inter (weight 560, tight tracking) for the emphasised words; the `.light` words, eyebrows, numerals and pull quotes answer in Instrument Serif italic (`--serif`). Sentence case, no uppercase labels.
- **Shape:** moderate radii (`--radius-lg` tops out at 1.5rem), pill buttons, generous space. Section heads (`.section-head`) are left-aligned and split: heading left, supporting text right.
- **Home hero:** a dark rounded tile filling the first screen. Behind the text, `threads.ts` draws slow threads of gold light on a canvas. Masthead line with a rule, a staggered two-line headline with a hand-drawn orange stroke under the last word (`.mark`), lede and buttons to the right, then the **ring**: 14 captioned, linked project cards set around a cylinder and seen from inside, so the work wraps the full width at any screen size. It turns slowly, can be dragged, and speeds up with scroll (`initHero` in `main.ts`).
- **Header glass:** champagne-tinted on light sections and amber smoked glass on dark ones, so it never reads as a plain white bar.
- One idea per screen, calm motion.

## Content rules (strict)
- Keep the meaning of the client's content. Tightening wording is fine, but never invent facts, clients, testimonials, numbers, awards or dates.
- Founder names: **Suhasini** and **Siddarth** (this spelling is confirmed; do not "correct" it to Siddharth). Both are "Co-Founder & Director".
- Testimonials are client quotes; keep them verbatim. Only 2 real ones exist (see HANDOFF).
- Contact: +91 9966556007 · studio@irahospitality.co.in (policy pages use info@irahospitality.co.in) · Ira Hospitality, 15 Golf Pride Homes, Yapral, Hyderabad.
- If an asset or fact is missing, use a clean placeholder and note it in `docs/HANDOFF.md`. Do not fabricate.

## How the motion system works
- The inline script in `Base.astro` adds `html.motion` only if the visitor has not set `prefers-reduced-motion`. All hidden "before" states are scoped under `.motion`, so without JS or with reduced motion everything is visible. A 4-second safety net adds `.reveal-all`.
- Data attributes drive the motion:
  - `data-split` (headline words rise and come into focus on scroll); `data-split="intro"` (part of the page-load timeline)
  - `data-intro` (fades in with the intro)
  - `data-reveal` (rise + blur-in, batched)
  - `data-clip` (frame grows into place, scrubbed by scroll)
  - `data-parallax` (image drift inside its frame; give the img the `parallax-img` class)
  - `data-words` (word opacity scrubbed by scroll)
  - `data-aurora` (background light drifts with scroll), `data-bento` (children rise in a stagger), `data-glow` (pointer-following highlight), `data-count` (number counts up), `data-drift`
  - `data-hero` + `data-ring` (home hero: the rotating ring of work; rotate it with the `rotate` property, not a CSS variable, to keep per-frame cost low), `data-threads` (hero canvas)
  - `data-pin` around a `data-words` statement (the statement pins mid-screen while it lights up; put a `.orb` inside for the glow)
  - `data-chars` (large display line, letters rise out of a mask), `data-tilt` (tile leans towards the pointer), `data-cursor="View"` (pointer bubble with that label), `data-marquee` (rows drift and speed up with scroll velocity; each `.marquee__track` holds 4 copies and a `data-dir`)
- Pinned scenes shift everything below them. After creating triggers, `main.ts` and `reel.ts` call `ScrollTrigger.sort()` then `refresh()`; keep that when adding a pin.
- The header bar is "liquid glass": a gradient rim (`::before`), a highlight that travels with scroll and pointer (`--sheen`), and it condenses once scrolled. It must reappear the moment the page scrolls up (see `onScroll` in `main.ts`); keep its transform transition short.
- Keep the first paint fast: the intro waits at most 350 ms for fonts, the preloader runs about a second, and all links prefetch on hover (`prefetchAll`).
- `data-zoom` (gallery image settles into its frame), `data-hero-fade` (inner-page hero eases back on scroll).
- Internal links fade the page out before navigating (`html.is-leaving`); the header nav pill and scroll progress line are driven from `main.ts`.
- Do not put a CSS `transition` on `transform` for anything GSAP animates (it makes scrubbing lag).
- `data-theme-section="dark|light"` on each section tells the fixed header which colour to use.
- SplitText must keep `aria: 'none'` (otherwise it adds `aria-label` to `<p>`/`<h*>`, which fails Lighthouse).
- Lenis lives at `window.__lenis`. Use `lenis.scrollTo(..., { immediate: true })` when scripting scroll in tests.

## Forms and API
The forms post to the existing backend (`PUBLIC_API_BASE`, default `https://ira-zkxr.onrender.com/api`); payloads are documented in HANDOFF. The backend's CORS policy only allows the production domain, so **forms and the blog fail on localhost by design**. Test with a mocked `window.fetch`; never submit real data to the client's backend.

## Images
Originals are in `src/assets/img/` (54 files from the old site, the highest resolution that exists). Use `<Picture>` from `astro:assets` with `formats={['avif','webp']}` and sensible `widths`/`sizes`. To add a project image: drop the file in `src/assets/img/`, then reference its file name in `src/data/projects.ts` (`gallery` items take `span: 'full' | 'half'`; half-width runs render as masonry).

## Quality bar (keep it)
- Lighthouse in the high 90s on mobile and 100 on desktop, with accessibility and SEO at 100 (the only accepted accessibility flag is the `data-words` statement sampled mid-animation).
- `check-links` reports 0 broken. No console errors. No horizontal overflow at 390 px.
- After visual changes, check the home page at desktop and at a 390 px width.

## Deploy
Any static host: build `npm run build`, output `dist`. `vercel.json` (Vercel) and `public/_headers` (Netlify/Cloudflare) set caching and security headers. The repo is **public**: never commit secrets (`.env` is gitignored).

## Git
Remote: https://github.com/T-pritam/ira-hospitality (`main`). End commit messages with:
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
