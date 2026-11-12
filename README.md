# IRA Hospitality — website

Static marketing site for IRA Hospitality (irahospitality.co.in), built with **Astro 5**, **GSAP 3.13** (ScrollTrigger + SplitText) and **Lenis** smooth scrolling.

Project context lives in this repo: `CLAUDE.md` (working guide), `docs/HANDOFF.md` (status, decisions, open items) and `docs/source-pack/` (capture of the old site: all copy, design tokens, screenshots).

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # refreshes careers from the API, then builds to dist/
npm run preview    # serves dist/ on http://localhost:4321
```

Node 18.20+ (tested on Node 26).

## Deploy

`dist/` is a fully static site, so any static host works (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, Apache or Nginx).

- Build command: `npm run build`. Output folder: `dist`.
- Optional env var: `PUBLIC_API_BASE` (defaults to the current backend `https://ira-zkxr.onrender.com/api`). See `.env.example`.
- Serve `dist/404.html` for unknown paths (Vercel, Netlify and Cloudflare do this automatically).
- **Forms only work from an allowed origin.** The backend's CORS policy accepts `https://www.irahospitality.co.in` and rejects `localhost` and other domains. On localhost or a staging domain the forms will show their error state until that origin is added to the backend's CORS allow-list.

## Where things live

| What | Where |
|---|---|
| Brand details (phone, email, address, socials, map) | `src/data/site.ts` |
| Projects (copy, images, gallery order) | `src/data/projects.ts` |
| Services and every offering | `src/data/services.ts` |
| Founders, testimonials, client names | `src/data/people.ts` |
| Careers | `src/data/jobs.json`, refreshed from `GET {API}/jobs` on every build (`scripts/sync-jobs.mjs`; falls back to the saved copy if the API is down) |
| Blog | Loaded live in the browser from `GET {API}/blogs`; a post opens at `/blog/?slug=…` |
| Images | `src/assets/img/` (originals; Astro outputs responsive AVIF/WebP at build time) |
| Design tokens and all styles | `src/styles/global.css` |
| Motion (smooth scroll, reveals, header, menu) | `src/scripts/main.ts` |
| Feature scripts (stacked cards, work reel, testimonials, accordion, forms, map) | `src/scripts/modules/` |
| Wireframe dodecahedron (replaces Three.js) | `src/scripts/dodeca.ts` |

To add a project: put its images in `src/assets/img/`, add an entry to `projects.ts`, and rebuild.

## Forms

The forms use the same endpoints and payloads as the previous site, so the existing backend keeps working:

- Contact: `POST {API}/contacts` with JSON `{ name, email, phone, message, source }`, where `source` is `home_page` or `contact_page`.
- Careers: `POST {API}/applications` with multipart `{ jobId, fullName, email, phone, education, experience, skills, resume }`.

Validation runs in the browser, with inline accessible error messages. There is a honeypot field against spam, and a 60-second timeout because the backend can be slow to wake up.

## Accessibility and motion

- Every animation is skipped when the visitor has `prefers-reduced-motion` turned on. Content never depends on JavaScript to be visible (a 4-second safety net reveals everything if scripts fail).
- Skip link, keyboard-trappable menu, accessible tabs (testimonials) and accordion, and visible focus styles.
- The Google Map loads only when the visitor clicks "Show map", which keeps the page fast and avoids third-party cookies.

## Utility scripts

- `node scripts/prep-assets.mjs` regenerates the trimmed logos, favicons and `public/og-image.jpg` from the source logo.
- `node scripts/check-links.mjs` checks every internal link and asset in `dist/`.
