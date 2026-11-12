# Project handoff notes

Status and history of the rebuild, so work can continue on any machine or in a Claude cloud session.

## Brief (from the agency)
Rebuild irahospitality.co.in from scratch. The agency told the client the new site would be "4 to 5 times more beautiful", more UI/UX friendly and more responsive.
- **Keep:** the identity (colours, logo, brand feel) and the meaning of all content.
- **Elevate:** layout, type scale, spacing, imagery and motion.
- **Rules:** one idea per screen, premium and calm. Founders and client proof are highlights.
- **Required:** GSAP + ScrollTrigger + smooth scroll, reduced-motion support, mobile first, Lighthouse in the high 90s, accessibility, SEO, and working forms.
- **Content rules:** wording may be tightened, but names, titles, clients, quotes and contact details stay accurate. Never invent facts, clients, testimonials, numbers or awards.

## Status (12 Nov 2026)
- Complete and pushed to `main`. 80 static pages.
- Verified: 0 broken internal links (`node scripts/check-links.mjs`) and no console errors on any page type. Tested at 1280, 820 and 390 px with no horizontal overflow.
- Lighthouse on the production build:
  - Home, desktop: 100 / 100 / 100 / 100.
  - Mobile: performance 96–99, best practices and SEO 100 on every page tested. Accessibility is 100 everywhere except About, which scored 96 only because the audit sampled the scroll-scrubbed word reveal mid-animation.
- Forms were tested with a mocked `fetch` (validation, loading, success, error, multipart payload). No real submissions were sent to the client's backend.

## Decisions made (and why)
| Decision | Reason |
|---|---|
| Founder name is **"Siddarth"** | Confirmed by the user. The old site mixed "Siddharth" and "Siddarth". The image file is still `founder-siddharth.jpg` (file name only). |
| Only 2 testimonials (Oshin Mitra / Trident Hyderabad, Yash Huria / Iris Indore) | The other 3 on the old site were lorem ipsum with stock photos. Quotes are kept verbatim, with a verbatim pull-quote on top. |
| Client marquee = names from the portfolio and testimonials only | No logo wall existed. Hilton was left out (it only appeared in a fake testimonial). |
| Removed the empty "Popular Publications" block from home | The blog API returns 0 posts. |
| Feu shows an "imagery coming soon" panel | Its images 404 on the old server. |
| Logo kept as the original PNG (trimmed) | A potrace vectorisation was tried and rejected because it broke the thin hairline of the "R" and the HOSPITALITY lettering. |
| Careers "experience" section is required | Mirrors the old site's code, which the backend may expect. Open question for the client: freshers roles. |
| Both emails kept where they were | studio@ for contact and footer, info@ for Privacy and Terms (as on the old site). |
| Wireframe dodecahedron is drawn on a 2D canvas | Keeps the brand motif without the weight of Three.js. |
| Desktop gets an inline nav plus a "Let's talk" CTA; mobile keeps the full-screen menu | Clearer navigation. The menu keeps the old overlay's content (useful links, contact info). |
| Vertical page label (bottom-left) and "Back to top" (bottom-right) | Kept from the old site as a signature, shown on 1280 px and up only. |
| No invented copy | Section intros are either the client's own lines or neutral UI text. |

## Backend facts (found in the old site's JS bundle)
- API base: `https://ira-zkxr.onrender.com/api` (Render; can cold-start slowly, so forms use a 60 s timeout and a "server waking up" note).
- `POST /contacts`: JSON `{ name, email, phone, message, source }`, where `source` is `home_page` or `contact_page`.
- `POST /applications`: multipart `{ jobId, fullName, email, phone, education (JSON), experience (JSON), skills (JSON), resume (file, ≤ 5 MB, pdf/doc/docx) }`.
- `GET /jobs`: array of `{ _id, title, location, type, description, requirements[], isActive, postedAt }`. Synced into `src/data/jobs.json` on every build.
- `GET /blogs?page&limit&search&tag` returns `{ blogs: [], totalPages, total }`. Posts use `{ title, slug, image, description (plain text), createdAt, views }`. `GET /blogs/:slug?incrementView=true` returns one post.
- **CORS:** allows `https://www.irahospitality.co.in` and rejects localhost and other origins. Forms and the blog therefore show their error or empty states locally. That is expected, not a bug.

## Open items for the client (none block launch)
1. A vector or high-resolution logo.
2. Higher-resolution project photography (current originals are about 800 px wide).
3. Feu project images.
4. Real quotes for the other testimonials, if they exist.
5. Whether "experience" should be optional on job applications.
6. Optional: PIN code, opening hours and a LinkedIn page, for richer local SEO.
7. Add any staging domain to the backend's CORS allow-list if previews need working forms.

## How things were verified (repeatable)
- `npm run build && node scripts/check-links.mjs`
- `npx astro preview`, then `npx lighthouse@12.6.0 http://localhost:4321/ --preset=desktop` (and without `--preset` for mobile)
- Responsive checks: load the pages in same-origin iframes at 390 px and 820 px. The Chrome window in the original session could not be resized below about 1280 px.
