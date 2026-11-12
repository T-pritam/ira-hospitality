# IRA Hospitality — Website Source Pack

Source site: https://www.irahospitality.co.in/ (public, no login)
Captured: 12 November 2026 (Chrome, live site)
Purpose: everything a developer needs to rebuild the site from scratch without revisiting the original.

Reading notes:
- Text is copied verbatim from the rendered DOM. Original spelling, punctuation and capitalisation are kept, including mistakes. Mistakes are listed again in section 6.
- "NOT FOUND" means I looked for it and it is not on the site.
- Pixel values were measured on the live site. Where a value changes by screen width I give the 1440 px (desktop) and 390 px (mobile) values. Anything measured at the 894 px browser width is labelled.
- No form was submitted. No link that sends, buys, deletes or changes data was clicked.

---

## 1. Overview and sitemap

### 1.1 What the site is

A one-brand marketing site for IRA Hospitality, a Hyderabad hospitality consulting, branding and operations studio led by two co-founders (Suhasini and Siddharth/Siddarth). It is a single-page React app (Vite build, React Router, Tailwind CSS v4, Three.js for the wireframe shapes, react-toastify for messages, react-helmet-async for head tags). Dark and light full-width sections alternate. Content comes from two places: hard-coded copy in the app (home, about, portfolio, services, legal pages) and a REST backend for careers, blog and the contact form (see 5.6).

Site-wide behaviour that is not page specific:
- The server answers every unknown path (including missing images, `robots.txt`, `sitemap.xml`) with the app shell and HTTP 200. There is no real 404 and no sitemap.
- Hamburger menu on every width (no inline desktop nav).
- Fixed vertical label at the bottom-left of each page (page name, rotated 90°) and a fixed vertical "BACK TO TOP" button at the bottom-right.
- Thin vertical hairlines run behind sections at about 25%, 50% and 75% of the page width.

### 1.2 Sitemap

| # | Page | URL | In nav? | Notes |
|---|------|-----|---------|-------|
| 1 | Home | https://www.irahospitality.co.in/ | Menu "HOMEPAGE", footer "Home" | 8 sections, 3D shapes, testimonials slider |
| 2 | About Us | https://www.irahospitality.co.in/about | Menu "ABOUT US" only (not in footer) | Reached from home "READ MORE". Very short |
| 3 | Portfolio (Projects) | https://www.irahospitality.co.in/projects | Menu "PROJECTS", footer "Portfolio" | 9 project cards |
| 4 | Project: Baked Daily | https://www.irahospitality.co.in/projects/baked-daily | no | |
| 5 | Project: Dessert Kart | https://www.irahospitality.co.in/projects/dessert-kart | no | |
| 6 | Project: Indian Durbar / Conrad Bengaluru | https://www.irahospitality.co.in/projects/indian-durbar | no | |
| 7 | Project: Iris / Trident Pune | https://www.irahospitality.co.in/projects/iris-trident-pune | no | |
| 8 | Project: OG Green | https://www.irahospitality.co.in/projects/og-green | no | |
| 9 | Project: Say Cheese | https://www.irahospitality.co.in/projects/say-cheese | no | |
| 10 | Project: Unamas | https://www.irahospitality.co.in/projects/unamas | no | |
| 11 | Project: Feu | https://www.irahospitality.co.in/projects/feu | no | Images broken (see 6) |
| 12 | Project: Nest | https://www.irahospitality.co.in/projects/nest | no | |
| 13 | Services | https://www.irahospitality.co.in/services | Menu "SERVICES", footer "Services" | 4 services |
| 14 | Service: Consulting | https://www.irahospitality.co.in/services/consulting | no | accordion, 13 items |
| 15 | Service: Branding & Marketing | https://www.irahospitality.co.in/services/branding-marketing | no | accordion, 4 groups |
| 16 | Service: Operations & Management | https://www.irahospitality.co.in/services/hospitality-operations | no | accordion, 14 items |
| 17 | Service: Digitize | https://www.irahospitality.co.in/services/hospitality-digitize | no | accordion, 11 items |
| 18 | Contact | https://www.irahospitality.co.in/contact | Menu "CONTACT US", footer "Contact" | form + Google map |
| 19 | Blog | https://www.irahospitality.co.in/blogs | Menu "BLOG", footer "Blog" | empty ("No blog posts found") |
| 20 | Careers | https://www.irahospitality.co.in/careers | Menu "Careers" (useful links), footer | 28 job listings |
| 21–48 | Career detail (28 pages) | https://www.irahospitality.co.in/careers/{id} | no | ids listed in sections 2.9 and 2.14 |
| 49 | Career application form | https://www.irahospitality.co.in/careers/apply/{id} | via "Apply Now" | same form for every job |
| 50 | Privacy Policy | https://www.irahospitality.co.in/privacy-policy | Menu useful links, footer | |
| 51 | Terms & Conditions | https://www.irahospitality.co.in/terms-conditions | Menu useful links, footer | |

Not present on the site: publications, individual blog posts (list is empty; the app contains a `/blog/:slug` route but no post exists), client logo wall, case-study pages beyond the 9 projects.

External links found: https://www.instagram.com/ira.hospitality/ , https://www.facebook.com/profile.php?id=61972653785981 , mailto:studio@irahospitality.co.in (all in the footer and, for Instagram/Facebook/mail icons, on the contact page footer too).

### 1.3 Global elements (appear on every page)

**Top bar (nav)** — absolute, transparent, full width, horizontal padding 16 px (mobile) / 48 px (md) / 80 px (lg). Height 80 px (mobile) / 96 px (lg).
- Left: logo image, `alt="IRA"`, clickable to home. 144 px square on mobile, 184 px from md up (rounded-full class, `mix-blend-difference`). The nav logo is `/logo2.png` on the home page and `/logo1.png` on every inner page; when the menu is open the same nav logo stays visible on top of the black overlay. The footer logo is `/logo2.png` everywhere.
- Right: hamburger button (`aria-label="Toggle menu"`), 48×48 px, 32 px icon, turns orange on hover; becomes an orange "X" when open.

**Menu overlay** — full-screen fixed black layer (`z-40`), fades in over 500 ms, scrollable. Contents, in order:
1. Large uppercase bold items (they are `<button>`s, not links): HOMEPAGE, PROJECTS, SERVICES, ABOUT US, BLOG, CONTACT US. Current page is orange (#ff6900); the others are light grey/white.
2. Heading "USEFUL LINKS:" then links: Careers (/careers), Privacy Policy (/privacy-policy), Terms & Conditions (/terms-conditions).
3. Heading "CONTACT INFO" then: "Ira Hospitality, 15 Golf Pride Homes, Yapral, Hyderabad" and "+91 9966556007".

**Fixed side labels** — bottom-left: current section/page name rotated 90° (e.g. "HOMEPAGE", "PROJECTS", "SERVICES", "CONTACT", "BLOG", "ABOUT US"). Bottom-right: round black (or white on dark) up-arrow button above vertical text "BACK TO TOP".

**Page header pattern (inner pages)** — breadcrumb in small caps grey ("HOMEPAGE / ABOUT"), a big two-line headline mixing bold and light weights, a small round "scroll" CTA with label, and a wireframe dodecahedron (Three.js canvas) drifting at the right.

**Pre-footer CTA band (About, Portfolio, Services)** — light grey background (#f9fafb): small grey intro sentence aligned right, two-line headline (bold + light), orange pill button "CONTACT US" → /contact.

**Footer** (black, 1px top border #101828, 80 px vertical padding), left to right:
- Logo (`/logo2.png`, 128 px).
- Link column: Home (/), Portfolio (/projects), Services (/services), Contact (/contact), Blog (/blogs). Current page orange. On the home page "Home" is orange.
- Small grey column: Privacy Policy, Terms and conditions, Careers.
- Icon row: Instagram, Facebook, email (mailto:studio@irahospitality.co.in). Icons have no accessible text.
- Text: "© Copyright 2026 - IRA. All Rights Reserved."
- Heading "Address" then "Ira Hospitality, / 15 Golf Pride Homes, / Yapral, Hyderabad"
- Heading "Contact" then "+91 9966556007"

Footer link list is identical on all pages. On mobile it stacks vertically: logo, links, small links, icons, copyright, Address, Contact.

---

## 2. Page-by-page content

Section positions on the home page were measured at an 894 px wide window and are approximate (y from page top).

### 2.1 Home — https://www.irahospitality.co.in/
Title: "IRA Hospitality - Premium Hotel & Restaurant Management Services". Page height 7,756 px at 1440 wide, about 11,181 px at 390 wide.

**Section 1 — Hero (y 0, full viewport, black background)**
- Three.js wireframe dodecahedrons in white/grey lines, drifting vertically (several canvases, one huge behind the headline, others at the corners).
- H1: "Designed for the Guest, / Built for the Brand." — "Designed" and "Built" are bold (700), the rest light (300). White.
- Paragraph (grey #99a1af, light 300): "We position hospitality brands for impact - through storytelling, strategy, and soul. Every element, from identity to experience, curated to inspire loyalty and elevate perception."
- Button 1 (orange pill, black text, round black arrow disc): "WHAT WE DO" → /services
- Button 2 (text link, white, orange arrow): "LET'S BUILD YOUR BRAND" → /contact
- Bottom-right: round orange (#ff9800 ring, black centre, orange down-arrow) "scroll down" button surrounded by rotating circular text "SCROLL DOWN • SCROLL DOWN •" (20 s linear spin).
- Bottom-left vertical label: "HOMEPAGE".

**Section 2 — Discover Our Studio (id `discover-studio`, y ≈ 543, white)**
- H2: "Discover / Our Studio" ("Discover", "Our" bold; "Studio" light).
- Paragraph 1: "At Ira Hospitality, we specialize in curating extraordinary hospitality experiences, delivering bespoke solutions that transform hotels, restaurants, and lifestyle spaces into guest-centric destinations."
- Paragraph 2: "With a team of industry leaders, we bring design innovation, marketing strategy, and operational excellence to every project - ensuring world-class standards in hospitality management, concept development, and brand positioning."
- Row with a small round profile photo (Unsplash stock image, alt "Profile", with a small orange pause-button badge on it; I did not test what the button does) and a two-line caption: "Passionately Creating Design Wonders: / Unleashing Boundless Creativity" ("Passionately Creating" and "Unleashing" bold black, "Design Wonders:" and "Boundless Creativity" light grey).
- Large portrait image on the right: `/ira-about.jpg`, alt "Design Studio Team" (shows a green "Indian Durbar" menu, coaster, gold cutlery on marble). Displayed 672×326 at 894 px wide.

**Section 3 — Services strip (y ≈ 1,595, black)**
- Small grey right-aligned intro: "Helping hotels and restaurants speak with clarity, creativity, and purpose."
- Headline with a small rounded-pill photo inline (Unsplash "Team" photo, alt "Team", displayed 256×96): "Where Hospitality / Finds Its Voice." ("Where", "Finds Its" bold; "Hospitality", "Voice." light grey).
- Orange pill button: "WHAT WE DO" → /services
- Four columns (1 px dark grey dividers), each with title, description and an orange round arrow button. Whole column links to its service page:
  1. "Consulting" — "Expert guidance for Hotels, BnB's, Restaurants, Bars & Cloud Kitchens, covering everything from concept creation to brand launch with operational efficiency." → /services/consulting
  2. "Marketing & Branding" — "We craft distinctive hospitality brands, from positioning and storytelling to design and digital strategy - creating experiences that inspire guests and drive business growth." → /services/branding-marketing
  3. "Operations & Management" — "We optimise operational workflows, support talent acquisition, enhance service delivery, and implement training programs that improve guest experience and overall profitability." → /services/hospitality-operations
  4. "Digitize" — "We create digital ecosystems, from websites and apps to loyalty platforms - that enhance operations, elevate guest engagement, and support targeted marketing." → /services/hospitality-digitize
- At 1440 px the description text is in the markup but only the title and arrow are visible in the screenshot at rest; I did not test hover, so a hover reveal is likely but unconfirmed. On mobile the descriptions are always visible and stacked.

**Section 4 — Meet Our Team (y ≈ 3,220, white)**
- H2: "Meet / Our Team" (bold black).
- Subheading grey: "Shaping the Future of Hospitality"
- Bold lead: "A Three-Dimensional Approach to Excellence" then light grey: " — Merging Expertise in Operations, Marketing Strategy & Design, for Unparalleled Hospitality Branding"
- Paragraph: "Ira Hospitality is led by Suhasini and Siddharth, whose combined experience bridges brand thinking, culinary insight, and commercial execution across hospitality."
- Paragraph (Suhasini): "With over 14 years in global hospitality brands including Marriott International, ITC Hotels, and Hyatt, Suhasini has worked at the heart of central brand and marketing teams shaping some of the industry's most recognised brand platforms. Her expertise spans brand strategy, public relations, digital and loyalty marketing, and she is known for her ability to bring structure and clarity to complex, multi stakeholder environments. At Ira, she anchors brand narrative, positioning, and long term strategy."
- Paragraph (Siddharth): "Siddharth brings a practitioner's perspective shaped by years on the ground. A former chef and restaurateur, his understanding of food, service, and operations is complemented by deep experience in brand building and guest-centric design."
- Orange pill button: "READ MORE" → opens /about (client-side route; this is a button, not an `<a>`).
- Text: "Headquartered in **Hyderabad, India**" / "Operating **Globally**" (places bold, rest light grey).
- Small caps label: "THE FOUNDERS OF OUR AGENCY"
- Two portrait photos, stepped (second is lower), each 320×427 at 894 px wide:
  - `/assets/suhasini.jpeg`, alt "Suhasini". Caption: "Suhasini" / "CO FOUNDER - DIRECTOR"
  - `/assets/siddharth.jpg`, alt "Siddarth". Caption: "Siddarth" / "CO FOUNDER - DIRECTOR"
- Note the spelling: body text says "Siddharth", caption and alt say "Siddarth".

**Section 5 — Client Voice (testimonials, y ≈ 4,973, background #f9fafb)**
- Small grey right-aligned intro: "Customer reviews are a valuable source of information for both businesses and consumers."
- H2: "Client Voice ! Hear What / They Say!" ("Client Voice !" bold black; "Hear What They Say!" light grey).
- Slider: row of 5 circular avatar buttons (the active one is larger with an orange ring), then an orange quote mark icon, name (bold), role (small caps grey), quote text (grey, centred), previous/next round grey arrow buttons. Switched by clicking an avatar or arrows. All five captured:
  1. **Oshin Mitra** — "TRIDENT HOTEL, HYDERABAD" — avatar `/assets/trident.jpeg` (Trident logo). Quote: "It was a pleasure collaborating with Suhasini and her team at Ira Hospitality for the Diwali exclusive gifting at Trident Hyderabad. Their vision and expertise in packaging played a key role in shaping the final outcome. From curating the overall concept to finalizing packaging formats, colour schemes, and design details- Ira Hospitality brought a distinct aesthetic and cohesive visual language to the hampers. Their contribution extended to beautifully styled photography, capturing the essence of the hampers with precision and elegance. Thank you, Suhasini, for your creative partnership and unwavering support. Your thoughtful approach truly elevated our Diwali gifting experience."
  2. **Yash Huria** — "IRIS, INDORE" — avatar `/assets/iris.jpg` (Iris logo). Quote: "We had the pleasure of collaborating with Sue and her team for the creative menu design and layout of our restaurant, Iris Indore. From the outset, they made the entire process seamless—and most impressively, delivered ahead of schedule. After a detailed brief about our space and target audience, they crafted a menu that beautifully balanced visual aesthetics with consumer psychology. One of the standout elements was the creation of unique character illustrations for our signature cocktails—an imaginative touch that truly set us apart from competitors. The final design exceeded our expectations, and we're now working on additional projects with their team. While our initial engagement was purely for menu design, Sue went above and beyond, generously offering her insights on marketing, promotions, and overall brand positioning. Her passion for the industry shines through in every interaction, and that alone is a compelling reason to work with her and her team."
  3. **Aman Grover** — "HILTON HOTEL & RESORTS, HYDERABAD" — avatar Unsplash stock photo. Quote is placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  4. **Prashant Kulkarni** — "DIRECTOR F&B HILTON INDIA, SOUTH ASIA F&B CONFERENCE 2025" — Unsplash stock avatar. Quote: same lorem ipsum text as above.
  5. **Digvijay Singh** — "GENERAL MANAGER, THE CONRAD BENGALURU" — Unsplash stock avatar. Quote: same lorem ipsum text as above.
- Avatar order left to right: Oshin, Yash, Aman, Prashant, Digvijay. The first fresh load I did showed Prashant's (lorem ipsum) quote; a later fresh load showed Oshin's, so the slider probably auto-advances (interval not measured).

**Section 6 — Popular Publications (y ≈ 6,102, white)**
- H2: "Popular Publications:" (bold black). Link "VIEW ALL" with round arrow → /blogs.
- Body: "No blog posts available" (grey, centred). This is the empty state; the app renders cards linking to `/blog/{slug}` when the API returns posts.

**Section 7 — Let's Start Something New (y ≈ 6,645, black)**
- H2: "Let's Start / Something New." ("Let's Start" bold white, "Something New." light grey)
- Paragraph: "Ready to take your brand to the next level? We're here to help you shape the future of hospitality."
- Label "CONTACT": "studio@irahospitality.co.in" and "+91 9966556007" (both white, larger).
- Label "VISIT US": "Ira Hospitality, / 15 Golf Pride Homes, / Yapral, Hyderabad"
- Contact form card (very dark navy: #101828 at roughly 30% opacity over black, rounded corners, about 32 px padding):
  - "NAME *" input, placeholder "Your Name"
  - "PHONE NUMBER *" input, placeholder "+91 9966556007"
  - "EMAIL *" input, placeholder "hello@example.com"
  - "MESSAGE *" textarea, placeholder "Tell us about your project..."
  - Orange pill submit button with black round arrow: "SEND MESSAGE"
  - Underline-only inputs, small uppercase grey labels.
  - Validation messages (toasts, from the code): "Name is required", "Please enter a valid email address", "Message is required", "Phone number is required", "Phone number must be 10 digits". Success: "Message sent successfully! We'll get back to you soon." Failure: "Failed to send message. Please try again." Field is sent with `source: "home_page"`.

**Section 8 — Footer** — see 1.3.

### 2.2 About Us — https://www.irahospitality.co.in/about
Title: "About Us - IRA Hospitality". Height 3,653 px (1440) / 3,721 px (390).

1. Header (white): breadcrumb "HOMEPAGE / ABOUT"; H1 "Meet / Our Creative Team" ("Meet" bold, "Our Creative" light, "Team" bold); small round CTA "OUR TEAM" with orange down-arrow (scrolls to the next section). Dodecahedron at right. Bottom-left vertical label "ABOUT US".
2. Body (white, left-aligned text, max-width about 50% of page):
   - H2: "About Us"
   - Bold line: "Welcome to Ira Hospitality - Redefining Hospitality Excellence"
   - "At Ira Hospitality, we specialize in curating extraordinary hospitality experiences, delivering bespoke solutions that transform hotels, restaurants, and lifestyle spaces into profitable, guest-centric destinations." (the words "curating extraordinary hospitality experiences", "bespoke solutions", "hotels, restaurants, and lifestyle spaces" are bold in the render)
   - "With a team of industry leaders, we bring innovation, strategy, and operational excellence to every project—ensuring world-class standards in hospitality management, concept development, and brand positioning." (bold: "innovation, strategy, and operational excellence", "hospitality management, concept development, and brand positioning")
   - H3: "Why Choose Us?"
   - "Industry Expertise - A seasoned team with decades of experience in global hospitality."
   - "Innovative Approach - Data-driven strategies to enhance guest satisfaction and ROI."
   - "Customized Solutions- Every project is tailored to meet unique market needs and brand visions."
   - Bold line: "Let's Build Something Remarkable!"
   - "Whether you're launching a new hotel, revamping a restaurant, or seeking strategic growth, we are your trusted hospitality partners."
3. CTA band (#f9fafb): small grey "Looking to make your mark? We'll help you turn your project into a success story." / H2 "Ready to bring your ideas to life? / We're here to help" / orange pill "CONTACT US" → /contact
4. Footer.
- Images: none other than logos. There is no team grid or founder bios here despite the "Meet Our Creative Team" headline and "OUR TEAM" button.

### 2.3 Portfolio — https://www.irahospitality.co.in/projects
Title: "Our Portfolio - IRA Hospitality". Height 8,131 px (1440) / 9,647 px (390).

1. Header: breadcrumb "HOMEPAGE / PORTFOLIO"; H1 "Designing a / Better World Today" ("Designing a", "Better" bold, "World Today" light); round CTA "OUR WORKS". Vertical label "PROJECTS".
2. Grid: two columns on desktop, the right column offset downward (masonry stagger); one column on mobile. Each card is a link (whole card) with: image 3:4 portrait (360×480 at 894 px), category label (tiny orange uppercase), project name (bold), tag line (small grey with "|" separators). Card order and text (verbatim). On screen each card shows category, name and tag line. Each card's markup also contains the project's full description paragraph (same text as on its detail page, section 2.4); it is not visible in my screenshots, so it is probably hidden until hover, which I did not test.

| Card | Category | Name | Tag line | Card image | Link |
|---|---|---|---|---|---|
| 1 | BRAND IDENTITY | Baked Daily | Brand Identity \| Content Systems \| Delivery Platform Integration | /assets/Baked_daily/Thumbnail_11zon.jpg | /projects/baked-daily |
| 2 | BRAND IDENTITY | Dessert Kart | Brand Identity \| Content Systems \| Delivery Platform Integration | /assets/DessertKart/1.jpg | /projects/dessert-kart |
| 3 | HOSPITALITY BRANDING | Indian Durbar \| Conrad Bengaluru | Brand Narrative, Cuisine Conceptualisation, Guest Experience and Communication Design | /assets/Durbar/1.jpg | /projects/indian-durbar |
| 4 | DIGITAL BRAND STORYTELLING | Iris \| Trident Pune | Menu Design \| Beverage Storytelling \| Design & Technology Integration | /assets/Iris/1.jpg | /projects/iris-trident-pune |
| 5 | DIGITAL BRAND STRATEGY | OG Green | Brand Identity \| Digital Strategy \| Aggregator Setup & Optimisation | /assets/OGSalads/1.jpg | /projects/og-green |
| 6 | BRAND IDENTITY | Say Cheese | Brand Identity \| Visual Positioning \| Delivery-First Brand Strategy | /assets/SayCheese/Pi7_image_tool(1).jpg | /projects/say-cheese |
| 7 | BRANDED COLLATERALS | Unamas | Brand Refresh \| Stall Design \| High-Footfall Visual Strategy | /assets/Unamas/thumbnail.jpg | /projects/unamas |
| 8 | OPERATIONS & BRANDING | Feu | F&B Operations Consulting \| Brand & Service Alignment \| Marketing Strategy | none — grey box with text "Image unavailable" | /projects/feu |
| 9 | HOSPITALITY BRANDING | Nest | Brand Identity \| Environmental Design \| Kids Experience Design | /assets/nest/wall.jpg | /projects/nest |

3. CTA band: "Looking to make your mark? We'll help you turn / your project into a success story." / H2 "Ready to bring your ideas to life? / We're here to help" / "CONTACT US" → /contact
4. Footer.

### 2.4 Project pages (all nine share one template)
Template (top to bottom): link "← BACK TO PROJECTS" (small caps grey, → /projects); category label (orange tiny caps); H1 project name (large bold, centred); tag line (bold dark grey, centred); description paragraph (grey, centred, max about 640 px); optional line "Location: {value}" (label bold, value grey); image area on a light grey background with the project images in a mixed grid; pre-footer none; footer. Images lazy-load. Page title format: "{Project} - IRA Hospitality".

**Baked Daily** — /projects/baked-daily — title "Baked Daily - IRA Hospitality"
- Category: BRAND IDENTITY
- H1: Baked Daily
- Tag line: Brand Identity | Content Systems | Delivery Platform Integration
- Description: "Craft as a Consistent Experience. This project translated artisanal values into a structured digital brand language. The focus remained on consistency, trust, and recognisability across online delivery platforms. It reinforces how storytelling and systemised branding work together in scalable formats."
- Images (1): `/assets/Baked_daily/1_11zon.jpg` (alt "Baked Daily", 1269×2256, displayed 792×1408 at 894 wide). Card thumbnail is a different file, `Thumbnail_11zon.jpg`.

**Dessert Kart** — /projects/dessert-kart — title "Dessert Kart - IRA Hospitality"
- Category: BRAND IDENTITY
- H1: Dessert Kart
- Tag line: Brand Identity | Content Systems | Delivery Platform Integration
- Description: identical to Baked Daily: "Craft as a Consistent Experience. This project translated artisanal values into a structured digital brand language. The focus remained on consistency, trust, and recognisability across online delivery platforms. It reinforces how storytelling and systemised branding work together in scalable formats."
- Images (7, all 800×1000): one large hero image (DessertKart/3.jpg), a 4-up row of squares (4, 8, 10, 5) and two wide tiles (6, 9). Alt text is "Baked Daily", "Baked Daily - 1" … "Baked Daily - 6" (copy-paste error).

**Indian Durbar | Conrad Bengaluru** — /projects/indian-durbar — title "Indian Durbar | Conrad Bengaluru - IRA Hospitality"
- Category: HOSPITALITY BRANDING
- H1: Indian Durbar | Conrad Bengaluru
- Tag line: Brand Narrative, Cuisine Conceptualisation, Guest Experience and Communication Design
- Description: "Teen Punjab, Ek Mez. This project began not with visuals, but with memory. At its heart was a simple yet powerful idea: bringing together the culinary and cultural nuances of Malwa, Majha, and Doaba into one cohesive dining experience. Located within a five star hospitality setting, the approach was guided by restraint. Rather than leaning into overt colour and spectacle, the brand drew from the warmth, craft, and lived in elegance of Punjab's three regions, allowing heritage to unfold in a layered and contemporary manner. Cuisine, storytelling, and design were developed in parallel, ensuring that what arrived on the plate echoed the emotion of the space. To introduce lightness and spirit into the experience, Mr. Peg Singh was conceived as a playful guide through the beverage narrative, adding character and familiarity while remaining aligned with the restaurant's refined tone. The outcome is a brand experience rooted in emotion and memory, where cultural depth and modern luxury meet at the same table."
- Location line: "Location: Conrad Bengaluru"
- Images (11): Durbar/2.jpg, 1.jpg, 16.jpg, 14.jpg, 15.jpg, 9.jpg, 7.jpg, 12.jpg, 8.jpg, 10.jpg, 13.jpg in that on-page order. Alt text "Indian Durbar - {n}".

**Iris | Trident Pune** — /projects/iris-trident-pune — title "Iris | Trident Pune - IRA Hospitality"
- Category: DIGITAL BRAND STORYTELLING
- H1: Iris | Trident Pune
- Tag line: Menu Design | Beverage Storytelling | Design & Technology Integration
- Description: "Clarity Through Visual Communication. This intervention focused on enhancing beverage communication through thoughtful menu design and AI-generated visual representations. The approach balanced aesthetic refinement with functional clarity, modernising how the bar offering is experienced. It demonstrates how design systems can simplify choice while reinforcing brand positioning."
- Location line: "Location: Trident Pune"
- Images (3 on page): Iris/2.jpg, Iris/4.jpg, Iris/3.jpg. Card thumbnail Iris/1.jpg. Alt "Iris | Trident Pune - {n}".

**OG Green** — /projects/og-green — title "OG Green - IRA Hospitality"
- Category: DIGITAL BRAND STRATEGY
- H1: OG Green
- Tag line: Brand Identity | Digital Strategy | Aggregator Setup & Optimisation
- Description: "Building for Online Discovery. This project focused on developing a digital-first brand system optimised for food delivery platforms. Identity, content, and platform structure were aligned to support discoverability, consistency, and online performance. The work highlights how digital environments demand precision-led branding."
- Images (6, displayed 792×446, source 800×1000, so they are cropped): OGSalads/1.jpg, 3.jpg, 4.jpg, 5.jpg, 8.jpg, 9.jpg. Alt "OG Green - {n}".

**Say Cheese** — /projects/say-cheese — title "Say Cheese - IRA Hospitality"
- Category: BRAND IDENTITY
- H1: Say Cheese
- Tag line: Brand Identity | Visual Positioning | Delivery-First Brand Strategy
- Description: "Designed for Recall at Speed. This engagement focused on developing a bold brand identity tailored for high-competition delivery platforms. Visual clarity and positioning were central to improving discovery and repeat behaviour. The project demonstrates how strong identity drives performance in digital-first categories."
- Images (2): SayCheese/Pi7_image_tool(1).jpg, SayCheese/Pi7_image_tool.jpg (note the parentheses in the file name). Alt "Say Cheese - 1", "Say Cheese - 2".

**Unamas** — /projects/unamas — title "Unamas - IRA Hospitality"
- Category: BRANDED COLLATERALS
- H1: Unamas
- Tag line: Brand Refresh | Stall Design | High-Footfall Visual Strategy
- Description: "Clarity in Competitive Physical Spaces. This project focused on refreshing identity and stall design to improve visibility and decision-making in a high-traffic mall environment. The intervention prioritised legibility, recall, and spatial efficiency. It illustrates how design can directly impact on-ground performance."
- Images (7): Unamas/para-text.jpg (alt "Unamas Para Text"), hash-code.jpg ("Unamas Hash Code"), 17.jpg ("Unamas 17"), 16.jpg ("Unamas 16"), 2.jpg ("Unamas 2"), bottom-1.jpg (alt "Unamas 3"), bottom-2.jpg (alt "Unamas Bottom 1"). Card thumbnail Unamas/thumbnail.jpg.

**Feu** — /projects/feu — title "Feu - IRA Hospitality"
- Category: OPERATIONS & BRANDING
- H1: Feu
- Tag line: F&B Operations Consulting | Brand & Service Alignment | Marketing Strategy
- Description: "Where Brand Meets Daily Performance. This engagement focused on aligning brand communication with on-ground operations and service delivery. By integrating marketing strategy with operational workflows, the brand experience was strengthened both online and within the restaurant environment. The approach highlights the role of operational clarity in sustaining brand consistency and guest trust."
- Images (3 referenced, alt "Feu - 1/2/3"): /assets/Feu/1.jpg, 2.jpg, 3.jpg. **All three are missing on the server** (the URL returns the app's HTML, so the browser shows broken images; natural size 0×0). The portfolio card shows "Image unavailable" for the same reason.

**Nest** — /projects/nest — title "Nest - IRA Hospitality"
- Category: HOSPITALITY BRANDING
- H1: Nest
- Tag line: Brand Identity | Environmental Design | Kids Experience Design
- Description: "Creating Playful Spaces for Young Minds. This project focused on developing a comprehensive brand identity and environmental design system for a children's play and learning space. The approach balanced vibrant visual storytelling with functional design elements, creating an engaging environment that resonates with both children and parents. From passport-style activity guides to immersive wall graphics, every touchpoint was designed to spark curiosity and imagination."
- Images (6): nest/passport.jpg ("Nest Passport"), passport-flat.jpg ("Nest Passport Flat"), mat-flat.jpg ("Nest Mat Flat"), wall-sticker.jpg ("Nest Wall Sticker"), mat.jpg ("Nest Mat"), wall.jpg ("Nest Wall").

### 2.5 Services — https://www.irahospitality.co.in/services
Title: "Our Services - IRA Hospitality". Height 5,239 px (1440) / 4,993 px (390). Black background throughout the body.

1. Header (black): breadcrumb "HOMEPAGE / SERVICES"; H1 "This is what / we do best" ("This is", "we do" bold; "what", "best" light); round CTA "OUR SERVICES" with down-arrow. Dodecahedron at right. Vertical label "SERVICES".
2. Service list. Left side: a tall vertical column of thin-line circle/half-circle shapes (decorative, repeating pattern, grey outlines). Right side: four stacked service blocks. Each block = H3 (white, bold), paragraph (grey), a short list of 1–3 topic titles (tiny caps grey, each with a thin divider), orange "READ MORE" with a small round arrow. All "READ MORE" links go to the matching service page.
   - **Consulting** — "We partner with hospitality brands to provide strategic guidance, operational insight, and performance-driven solutions. From concept to execution, our consulting services are designed to create scalable models, elevate guest experiences, and drive long-term profitability across every touchpoint." Topics: FEASIBILITY STUDY & MARKET RESEARCH / CONCEPT DEVELOPMENT & BRAND POSITIONING / BUSINESS PLAN DEVELOPMENT & FINANCIAL MODELLING. → /services/consulting
   - **Branding & Marketing** — "Crafting presence with purpose. For hospitality brands, marketing isn't just about being seen - it's about being remembered. At Ira Hospitality, we build thoughtful, guest-focused strategies that amplify your brand's essence across every channel. From concept to campaign, every move we make is rooted in your story, shaped by insight, and designed to drive emotional and commercial impact." (apostrophes in the source are curly ’) Topics: BRANDING & IDENTITY DESIGN / DIGITAL MARKETING & TRANSFORMATION / CONCEPT & CONTENT CURATION & STRATEGY. → /services/branding-marketing
   - **Operations & Management** — "We offer end-to-end management solutions focused on operational efficiency, asset performance, and sustainable growth. From overseeing daily operations to implementing industry-standard SOPs, our approach ensures optimized cost structures, and enhanced guest satisfaction. Whether managing independent properties or global hospitality brands, we drive operational excellence with a clear focus on profitability and long-term value creation." Topic: OUR OPERATIONAL EXPERTISE. → /services/hospitality-operations
   - **Digitize** — "We help brands embrace the digital shift - transforming traditional operations into smart, data-driven ecosystems. From guest engagement to operational automation, our digital solutions are designed to drive efficiency, enhance visibility, and create seamless customer experiences across every touchpoint." Topic: OUR DIGITAL SOLUTIONS. → /services/hospitality-digitize
3. CTA band (#f9fafb): small grey "Looking to make your mark? We'll help you turn / your project into a success story." / H2 "Let's make an impact / together. Ready when you are" ("Let's make an impact together. Ready" bold, "when you are" light) / "CONTACT US" → /contact.
4. Footer.
- No images other than logos.

### 2.6 Service detail template (four pages)
Top to bottom: breadcrumb "HOMEPAGE / SERVICES / {SERVICE NAME}" (the last crumb is darker); H1 in two lines (first word bold, second light; for example "Branding / &Marketing"); wireframe dodecahedron behind the H1; left column: H2 "Your Approach / and Work Specifics" ("Your Approach" bold, "and Work Specifics" light) + the service intro paragraph (same as the services page) + link "VIEW WORKS" (→ /projects, small round arrow); right column: accordion; below: H2 "Other services" with link "VIEW ALL" (→ /services) and three small bordered cards (title, two-line clipped description, "READ MORE" link) for the other three services; footer. No pre-footer CTA band here. Titles use the pattern "{Service} - IRA Hospitality".
Accordion behaviour: rows are tiny uppercase bold titles with a round "+" button (orange filled circle with "–" when open). The first row is open on load. Panels animate (max-height 0 → 800 px, opacity, 500 ms). Only one-by-one open state was observed; I did not test whether opening one closes the others.

**Consulting** — /services/consulting — title "Consulting - IRA Hospitality". H1 "Consulting". Intro: "We partner with hospitality brands to provide strategic guidance, operational insight, and performance-driven solutions. From concept to execution, our consulting services are designed to create scalable models, elevate guest experiences, and drive long-term profitability across every touchpoint." Accordion (13 rows; each panel is one sentence):
1. FEASIBILITY STUDY & MARKET RESEARCH — "In-depth analysis of market trends, competition, and financial viability."
2. CONCEPT DEVELOPMENT & BRAND POSITIONING — "Crafting unique concepts and positioning strategies to stand out."
3. BUSINESS PLAN DEVELOPMENT & FINANCIAL MODELLING — "Robust financial planning and business roadmaps for success."
4. PRE-OPENING PLANNING & LAUNCH STRATEGY — "Comprehensive planning for a successful launch."
5. MENU ENGINEERING & F&B STRATEGY — "Optimizing menus for profitability and guest satisfaction."
6. COST CONTROL & PROFITABILITY CONSULTING — "Strategies to manage costs and maximize profits."
7. REVENUE MANAGEMENT & PRICING STRATEGY — "Dynamic pricing models to optimize revenue."
8. STAFF STRUCTURING, HR PLANNING, RECRUITMENT & TRAINING — "Building and training high-performing teams."
9. VENDOR & SUPPLY CHAIN CONSULTING — "Optimizing procurement and supply chain processes."
10. GUEST JOURNEY MAPPING & EXPERIENCE DESIGN — "Designing seamless and memorable guest experiences."
11. SALES & MARKETING STRATEGY CONSULTING — "Driving growth through targeted sales and marketing efforts."
12. COMPETITIVE BENCHMARKING & INDUSTRY INSIGHTS — "Staying ahead with competitive analysis and insights."
13. CRISIS MANAGEMENT & TURNAROUND STRATEGY — "Navigating challenges and revitalizing performance."
Other services cards: Branding & Marketing, Operations & Management, Digitize (descriptions as in 2.5).

**Branding & Marketing** — /services/branding-marketing — title "Branding & Marketing - IRA Hospitality". H1 (two lines): "Branding / &Marketing" (no space between "&" and "Marketing" in the source). Intro: "Crafting presence with purpose. For hospitality brands, marketing isn’t just about being seen - it’s about being remembered. At Ira Hospitality, we build thoughtful, guest-focused strategies that amplify your brand’s essence across every channel. From concept to campaign, every move we make is rooted in your story, shaped by insight, and designed to drive emotional and commercial impact." Accordion (4 rows):
1. BRANDING & IDENTITY DESIGN (open by default) — "We don’t just design brands - we shape experiences. Every element we create, from your logo to your marketing collateral, is thoughtfully crafted to echo your brand’s soul and aesthetic. Our purpose-driven approach ensures every touchpoint feels intentional, cohesive, and unforgettable - helping your brand not just stand out, but deeply connect." Bullets: Logo Designing; Stationery Designing; Marketing Collaterals; Signage Solutions; Digital Assets; Guest Communications; Promotional Materials; Brand Guidelines; Merchandising Support; Digital Interfaces; Brand Identity Kit.
2. DIGITAL MARKETING & TRANSFORMATION — "We don’t just market brands — we shape their digital presence with intention and impact. By fusing creative storytelling with smart strategy, we craft digital journeys that captivate, convert, and cultivate lasting brand love. Powered by data, driven by design — we help brands stay visible, relevant, and unforgettable in an ever-evolving digital world." Bullets: Website Creation & Development; SEO Optimisation; Meta Ads; Google Ads; Social Media Management.
3. CONCEPT & CONTENT CURATION & STRATEGY — "We craft content with purpose — stories that don’t just fill spaces, but spark emotion, build trust, and leave a lasting impression. From words to visuals, every piece is designed to echo your brand’s voice and vision — creating a cohesive narrative that connects, engages, and inspires across every digital touchpoint." Bullets: Lifestyle Photoshoot; Video Production; Brand Films; F&B Shoots; Blog Writing; Social Media Creatives; Influencer Marketing.
4. NARRATIVE & NOISE — "We believe every brand has a story worth telling — and telling it to the right people makes all the difference. With deep industry relationships and an eye for what sparks conversation, we craft narratives that get noticed. From powerful press features to strategic placements, we help your brand earn visibility, build credibility, and stay top-of-mind where it matters most." Bullets: Media & Influencer Outreach; Press Releases; Event PR.
Other services cards: Consulting, Operations & Management, Digitize.

**Operations & Management** — /services/hospitality-operations — title "Operations & Management - IRA Hospitality". H1 (two lines): "Operations / &Management". Intro: "We offer end-to-end management solutions focused on operational efficiency, asset performance, and sustainable growth. From overseeing daily operations to implementing industry-standard SOPs, our approach ensures optimized cost structures, and enhanced guest satisfaction. Whether managing independent properties or global hospitality brands, we drive operational excellence with a clear focus on profitability and long-term value creation." Accordion (1 row): OUR OPERATIONAL EXPERTISE, bullets:
- Strategic Planning & Operational Setup
- Standard Operating Procedures (SOP) Development & Implementation
- Revenue Management & Dynamic Pricing Strategies
- Food & Beverage (F&B) Concept Development & Management
- Front Office & Guest Experience Management
- Housekeeping & Facility Management
- Human Resource Planning & Staff Training
- Vendor & Procurement Management
- Cost Control & Profit Optimization
- Budgeting, Forecasting & Financial Reporting
- Brand Compliance & Quality Audits
- Sales, Marketing & Distribution Strategy
- Asset Management & Owner Representation
- Operational Excellence Audits & Performance Reviews

**Digitize** — /services/hospitality-digitize — title "Digitize - IRA Hospitality". H1 "Digitize". Intro: "We help brands embrace the digital shift - transforming traditional operations into smart, data-driven ecosystems. From guest engagement to operational automation, our digital solutions are designed to drive efficiency, enhance visibility, and create seamless customer experiences across every touchpoint." Accordion (1 row): OUR DIGITAL SOLUTIONS, bullets:
- Digital Transformation Strategy & Consulting
- Website Design & Development (UX/UI focused)
- Online Reputation Management & Review Strategy
- CRM Implementation & Guest Data Management
- Digital Loyalty Programs & Guest Retention Solutions
- Digital Menu & Contactless Solutions (QR Based Tech)
- Online Booking Engine Integration
- Digital Payment & Wallet Solutions
- Data Analytics & Reporting Dashboards
- Brand Storytelling through Digital Platforms
- Technology Partner Sourcing & Implementation

### 2.7 Contact — https://www.irahospitality.co.in/contact
Title: "Contact Us - IRA Hospitality". Height 3,588 px (1440) / 3,383 px (390).

1. Header (white): breadcrumb "HOMEPAGE / CONTACT"; H1 "Let's Start / Something Great" ("Let's Start", "Great" bold; "Something" light); round CTA "SEND MESSAGE" (scrolls to the form, `id="contact-form"`). Dodecahedron at right. Vertical label "CONTACT".
2. Map: full-width Google Maps embed iframe, 500 px tall, `title="Ira Hospitality Location"`. Embed URL: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.8956537!2d78.5574!3d17.5449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMyJzQxLjYiTiA3OMKwMzMnMjYuNiJF!5e0!3m2!1sen!2sin!4v1234567890` (point 17°32'41.6"N 78°33'26.6"E, i.e. Yapral). The `4v1234567890` timestamp is a placeholder-looking value.
3. Form section (dark #101828, text white): H2 "Let's Talk" ("Let's" bold, "Talk" light), centred. Form (underline-only fields on a 2-column grid on desktop, 1 column on mobile; all required):
   - text input, name `name`, placeholder "WHAT'S YOUR NAME"
   - email input, name `email`, placeholder "YOUR EMAIL"
   - tel input, name `phone`, placeholder "YOUR MOBILE NUMBER"
   - textarea, name `message`, placeholder "TELL US ABOUT OUR PROJECT" (sic, "OUR" not "YOUR")
   - Note under the form (tiny grey): "* We promise not to disclose your personal information to third parties."
   - Orange pill submit button: "SEND MESSAGE"
   - Validation in code (sequential, toast on first failure): "Name is required", "Email is required", "Mobile number is required", "Message is required". Success toast: "Message sent successfully! We'll get back to you soon." Failure toast: "Failed to send message. Please try again." Payload includes `source: "contact_page"`. There are no `<label>` elements; placeholders are the only labels and are very low contrast on the dark background.
4. Footer. The page body does not show the address, phone or email except in the footer.

### 2.8 Blog — https://www.irahospitality.co.in/blogs
Title: "Insights & Stories - IRA Hospitality Blog". Height 2,786 px (1440).

1. Header (white): breadcrumb "HOMEPAGE / BLOG"; H1 "Insights & / Stories from / Hospitality" ("Insights &", "Hospitality" bold; "Stories from" light); round CTA "EXPLORE ARTICLES". Vertical label "BLOG".
2. Toolbar: search input with magnifier icon, placeholder "Search articles..."; select showing "All Categories".
3. Empty state text: "No blog posts found"
4. Footer.
- Pagination and individual post layout: NOT FOUND (no posts exist). Posts load from the API `GET /blogs?page=&limit=&tag=&search=` and link to `/blog/{slug}`.

### 2.9 Careers list — https://www.irahospitality.co.in/careers
Title: "Careers - IRA Hospitality". Height 4,824 px (1440) / 8,362 px (390). White/light page; blue buttons (this page and the job pages use a different, more generic UI style than the rest of the site: Tailwind blue-600 buttons, white rounded cards with soft shadow).

- H1: "Join Our Team" (centred). Sub: "Find your next career opportunity with us".
- Filter bar (3 controls in a white card): select "All Job Roles" (briefcase icon), text input placeholder "Location" (pin icon), select "All Job Types" (clock icon). Option lists not captured.
- 28 job cards, each: title (bold), line "{pin} Hyderabad  {briefcase} Full-time  {clock} Posted {date}", blue button "View Details" → /careers/{id}. Dates are M/D/YYYY (e.g. 11/4/2026 = 4 November 2026).

| # | Job title | Location | Type | Posted | id (URL suffix) |
|---|---|---|---|---|---|
| 1 | Marketing Manager | Hyderabad | Full-time | 11/4/2026 | 6aeb51cb26745e0e27b0e07a |
| 2 | Performance Marketer | Hyderabad | Full-time | 2/20/2026 | 699821c485dd2b21c1f3229f |
| 3 | WhatsApp Automation Expert | Hyderabad | Full-time | 2/20/2026 | 6998214d85dd2b21c1f32299 |
| 4 | LinkedIn Growth Expert | Hyderabad | Full-time | 2/20/2026 | 699820dd85dd2b21c1f32293 |
| 5 | YouTube Automation Expert | Hyderabad | Full-time | 2/20/2026 | 6998204085dd2b21c1f3228d |
| 6 | Social Media Manager | Hyderabad | Full-time | 2/20/2026 | 69981c4a85dd2b21c1f32263 |
| 7 | Video Editor | Hyderabad | Full-time | 2/20/2026 | 69981bec85dd2b21c1f32258 |
| 8 | Graphic Designer | Hyderabad | Full-time | 2/20/2026 | 69981b4a85dd2b21c1f3223f |
| 9 | Creative Director | Hyderabad | Full-time | 2/20/2026 | 69981b0685dd2b21c1f32232 |
| 10 | Front Office Head | Hyderabad | Full-time | 1/29/2026 | 697b5578812df18515d9f460 |
| 11 | Steward / Stewardess | Hyderabad | Full-time | 1/29/2026 | 697b552b812df18515d9f45a |
| 12 | Server / Waiter / Waitress | Hyderabad | Full-time | 1/29/2026 | 697b54c3812df18515d9f44e |
| 13 | Captain | Hyderabad | Full-time | 1/29/2026 | 697b5463812df18515d9f448 |
| 14 | Junior Barista | Hyderabad | Full-time | 1/29/2026 | 697b5429812df18515d9f442 |
| 15 | Senior Barista | Hyderabad | Full-time | 1/29/2026 | 697b5376812df18515d9f43c |
| 16 | Bartender | Hyderabad | Full-time | 1/29/2026 | 697b533a812df18515d9f436 |
| 17 | Property Manager | Hyderabad | Full-time | 1/29/2026 | 697b52ae812df18515d9f424 |
| 18 | Food & Beverage (F&B) Manager | Hyderabad | Full-time | 1/28/2026 | 697a26c70b696f73fb1d814c |
| 19 | Pastry Chef | Hyderabad | Full-time | 1/28/2026 | 697a24db0b696f73fb1d8146 |
| 20 | Commis III | Hyderabad | Full-time | 1/28/2026 | 697a24040b696f73fb1d8140 |
| 21 | Commis II | Hyderabad | Full-time | 1/28/2026 | 697a23970b696f73fb1d813a |
| 22 | Commis I | Hyderabad | Full-time | 1/28/2026 | 697a22fa0b696f73fb1d8134 |
| 23 | Sous Chef | Hyderabad | Full-time | 1/28/2026 | 697a1ff90b696f73fb1d80e8 |
| 24 | Demi Chef De Partie (DCDP) | Hyderabad | Full-time | 1/28/2026 | 697a1f620b696f73fb1d80e2 |
| 25 | Chef De Partie (CDP) | Hyderabad | Full-time | 1/28/2026 | 697a1d3f0b696f73fb1d80bc |
| 26 | Senior Finance Manager | Hyderabad | Full-time | 1/28/2026 | 697a1b700b696f73fb1d807b |
| 27 | HR Manager (Hospitality) | Hyderabad | Full-time | 1/28/2026 | 697a1a1a0b696f73fb1d8075 |
| 28 | Photographer/ Videographer | Hyderabad | Full-time | 1/28/2026 | 697a16de0b696f73fb1d8042 |

### 2.10 Career detail template
Layout: "← Back to Careers" link (→ /careers); white card containing H1 job title, meta row (pin Hyderabad, briefcase Full-time, clock "Posted {date}"), blue "Apply Now" button (→ /careers/apply/{id}), H3 "Job Description", then description text (paragraphs; some jobs use plain lines), H3 "Requirements", then a bulleted list ("•"). Page `<title>` stays the default home title (not updated per job).

### 2.11 Career application form — https://www.irahospitality.co.in/careers/apply/{id}
H1 "Apply for {job title}". Sub: "Please fill out the form below to submit your application." Sections:
- **Personal Information**: Full Name (text, required), Email (email, required), Phone (tel, required).
- **Education** (link-button "+ Add More" adds another row): Degree (placeholder "e.g. B.Tech", required), Specialization (placeholder "e.g. Computer Science", required), Institution (placeholder "e.g. University Name", required).
- **Experience** ("+ Add More"): Role (placeholder "e.g. Senior Developer", optional), Company (placeholder "e.g. Tech Corp", optional), Start Date (month picker, optional), End Date (month picker, optional).
- **Skills**: text input placeholder "Type a skill and press Enter or Add" with button "Add".
- **Resume**: dashed drop area with upload icon, text "Click to upload resume (PDF/DOCX, Max 5MB)"; file input accepts `.pdf,.doc,.docx`; not required.
- Buttons: "Cancel" (text) and blue "Submit Application".
- Success/error messages: NOT FOUND (not submitted).

### 2.12 Privacy Policy — https://www.irahospitality.co.in/privacy-policy
Title stays the default home title. Breadcrumb "HOMEPAGE / PRIVACY POLICY". Light page, headings bold black, body grey, email link orange.

#### H1: Privacy Policy
At Ira Hospitality, we believe that great experiences begin with trust—and that extends beyond the brands we build. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our website or get in touch with us.

We respect your privacy, and we're committed to treating your data with care.

#### 1. Information We Collect
When you visit our website, we may collect the following types of information:
* Personal Information you voluntarily provide: Name, Email address, Phone number
* Company name, Any other details you share via our contact or inquiry forms

#### 2. How We Use Your Information
We collect and use your information to:
* Respond to project inquiries or service requests
* Understand how users interact with our website
* Improve our site's content, flow, and experience
* Send occasional updates (only with your consent)
* Maintain internal records and ensure smooth communication

#### 3. Cookies & Tracking
Our site may use cookies to improve user experience and track usage patterns. You can adjust your browser settings to decline cookies at any time.

#### 4. Third-Party Tools
We may use third-party tools like Google Analytics to better understand our audience. These platforms may collect certain information in accordance with their own privacy policies.

#### 5. Data Security
We take reasonable technical and organizational precautions to prevent the loss, misuse, or alteration of your personal data. While no digital platform is 100% secure, we aim to implement best practices to keep your information safe.

#### 6. Policy Updates
This Privacy Policy may be revised from time to time. The latest version will always be available on this page, and the date of the last update will be clearly listed.

#### 7. Contact Us
Have questions or concerns?
We'd love to hear from you, write to us at info@irahospitality.co.in

(In the page, "Personal Information" is bold in the first list item and the email address is an orange link. No last-updated date is shown.)

### 2.13 Terms & Conditions — https://www.irahospitality.co.in/terms-conditions
Title stays the default home title. Breadcrumb "HOMEPAGE / TERMS & CONDITIONS".

#### H1: Terms & Conditions
Welcome to Ira Hospitality. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.

#### 1. Acceptance of Terms
By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.

#### 2. Use of Website
You agree to use our website for lawful purposes only. You may not:
* Use the site in any way that violates applicable laws or regulations
* Attempt to gain unauthorized access to any part of the website
* Transmit any harmful or malicious code
* Engage in any activity that disrupts or interferes with the website's functionality

#### 3. Intellectual Property
All content on this website, including text, graphics, logos, images, and software, is the property of Ira Hospitality or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.

#### 4. Services & Inquiries
Information about our services is provided for general informational purposes. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice. Any inquiries or project requests submitted through our website do not constitute a binding agreement until formally accepted by Ira Hospitality.

#### 5. Limitation of Liability
Ira Hospitality will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or inability to use it. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.

#### 6. External Links
Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of use of these external sites. Accessing them is at your own risk.

#### 7. Privacy
Your use of this website is also governed by our Privacy Policy. Please review it to understand how we collect and use your information.

#### 8. Changes to Terms
We reserve the right to update or modify these Terms & Conditions at any time. Changes will be posted on this page with the updated date. Continued use of the website after changes constitutes acceptance of the revised terms.

#### 9. Governing Law
These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in Hyderabad, India.

#### 10. Contact Us
If you have any questions about these Terms & Conditions, please contact us:
Email: info@irahospitality.co.in

(In the page, "Privacy Policy" inside section 7 is an orange link and the email is an orange link. No updated date is shown.)

### 2.14 Career detail pages — full text of all 28 jobs
Every job page has the same structure: H1 title, meta row, "Job Description", "Requirements". In the source, the Requirements bullets sometimes include qualification lines too (they are in the same list). Text below is verbatim; line breaks inside a description are kept. A leading "- " that the site shows before each requirement is not repeated.

#### Job 1 — Marketing Manager · Hyderabad · Full-time · Posted 11/4/2026 · /careers/6aeb51cb26745e0e27b0e07a
Job Description:
> We are looking for a creative and result-driven Social Media Marketing Manager with 2–3 years of experience to manage social media platforms, develop engaging content strategies, execute digital marketing campaigns, and strengthen brand presence across multiple platforms.

Requirements:
* Develop and implement social media strategies aligned with business goals.
* Manage Instagram, Facebook, LinkedIn, and other social media platforms.
* Plan and maintain monthly content calendars.
* Coordinate with graphic designers, video editors, and content creators.
* Create engaging captions, posts, Reels, Stories, and campaign content.
* Monitor social media performance, engagement, reach, and audience growth.
* Manage Meta Ads campaigns to generate leads, traffic, and brand awareness.
* Analyse campaign performance and prepare monthly reports.
* Identify social media trends, competitor activities, and new growth opportunities.
* Ensure consistent brand communication and online reputation management.
* Work closely with the marketing team to execute promotional campaigns.

#### Job 2 — Performance Marketer · Hyderabad · Full-time · Posted 2/20/2026 · /careers/699821c485dd2b21c1f3229f
Job Description:
> Experience: 3–5 Years
> Location: Hyderabad (Full-Time)
>
> Role Objective:
> Generate measurable ROI for clients via paid media campaigns.
>
> Deliverables:
> Weekly performance dashboards
> Scaling strategy reports
> CPL & ROAS optimization plans
>
> KPIs:
> Cost per lead reduction
> ROAS
> Revenue attributed to ads
> Client retention
>
> Salary Bandwidth:
> ₹3,00,000 – ₹4,50,000 per annum

Requirements:
* Plan & execute Meta, Google, LinkedIn ad campaigns
* Budget allocation and optimization
* Funnel creation and landing page coordination
* Retargeting & lookalike audience strategy
* Performance reporting

#### Job 3 — WhatsApp Automation Expert · Hyderabad · Full-time · Posted 2/20/2026 · /careers/6998214d85dd2b21c1f32299
Job Description:
> Experience: 2 Years
> Location: Hyderabad (Full-Time)
>
> Role Objective:
> Build high-converting WhatsApp funnels for client campaigns and retargeting.
>
> Deliverables:
> Automation flow architecture
> Conversion tracking dashboards
> Monthly broadcast plan
>
> KPIs:
> Conversion rate
> Response rate
> Lead-to-sale ratio
>
> Salary Bandwidth:
> ₹2,80,000 – ₹3,00,000 per annum

Requirements:
* Setup WhatsApp Business API campaigns
* Design automation workflows (Lead → Nurture → Conversion)
* CRM integration
* Broadcast management
* Performance tracking and optimization

#### Job 4 — LinkedIn Growth Expert · Hyderabad · Full-time · Posted 2/20/2026 · /careers/699820dd85dd2b21c1f32293
Job Description:
> Experience: 3–5 Years
> Location: Hyderabad (Full-Time)
>
> Role Objective:
> Position Ira Hospitality and its leadership as hospitality thought leaders
>
> KPIs:
> Profile impressions growth
> Connection acceptance rate
> Lead generation numbers
> Engagement per post
> Conversion from inbound leads
>
> Salary Bandwidth:
> ₹3,00,000 – ₹4,00,000 per annum

Requirements:
* Build personal branding strategy for founders/CEOs
* Create high-performing LinkedIn posts and newsletters
* Optimize profile positioning
* Run LinkedIn organic growth campaigns
* Generate inbound business leads
* Content planning & ghostwriting
* LinkedIn newsletter management
* Outreach and lead funnel development
* Analytics tracking & growth optimization

#### Job 5 — YouTube Automation Expert · Hyderabad · Full-time · Posted 2/20/2026 · /careers/6998204085dd2b21c1f3228d
Job Description:
> Experience: 2–3 Years
> Location: Hyderabad (Full-Time)
>
> Role Objective:
>
> Systemize YouTube growth using automation tools, keyword optimization, thumbnails, SEO, and analytics-driven publishing.
>
> Deliverables:
> Channel growth dashboard
> SEO content plan
> A/B testing results
> SEO-optimized publishing sheet
> Monthly analytics dashboard
> Automation SOPs
>
> KPIs:
> Subscriber growth
> Watch hours increase
> Monetization growth
> Revenue growth
>
> Tools:
> TubeBuddy, VidIQ, Google Analytics, YouTube Studio
>
> Salary Bandwidth:
> ₹3,00,000 – ₹4,00,000 per annum

Requirements:
* Keyword research & competitor analysis
* SEO optimization of titles, descriptions, thumbnails and tag optimization
* Publishing workflow automation
* CTR and watch time optimization through thumbnails
* A/B testing titles and packaging
* Build content publishing workflows
* Monetization optimization (AdSense, brand integration, affiliate)

#### Job 6 — Social Media Manager · Hyderabad · Full-time · Posted 2/20/2026 · /careers/69981c4a85dd2b21c1f32263
Job Description:
> Experience: 2–3 Years
> Location: Hyderabad (Full-Time)
>
> Role Objective:
> Manage brand presence, engagement, and growth across internal & client social platforms.
>
> Deliverables:
> Monthly content plan per client
> Weekly analytics reports
> Monthly growth plan
> Community engagement strategy blueprint
>
> KPIs:
> Follower growth
> Engagement rate
> Lead generation from organic efforts
> Lead generation from social
> Increase in profile visits, follows, likes, shares etc
>
> Salary Bandwidth:
> ₹3,60,000 – ₹4,00,000 per annum

Requirements:
* Create monthly content calendars for brands and align with growth goals
* Write captions and campaign copy
* Manage publishing and engagement
* Analyze performance and optimize content strategy
* Coordinate with design and performance teams
* Publish and optimize posts daily
* Write captions and hooks with conversion intent
* Community management and engagement building

#### Job 7 — Video Editor · Hyderabad · Full-time · Posted 2/20/2026 · /careers/69981bec85dd2b21c1f32258
Job Description:
> Experience: 3–5 Years
> Location: Hyderabad (Full-Time)
>
> Role Objective:
>
> Produce performance-driven video assets for ads, social media, brand films, and campaign promotions.
>
> KPIs:
> Video ad performance (CTR, CPC reduction)
> Watch time improvement
> Creative output speed
> Audience retention percentage
> Shorts/Reels completion rate
>
> Tools:
> Premiere Pro / Final Cut Pro, After Effects, DaVinci Resolve preferred. Ai tools for video creation., CGI Video creation
>
> Salary Bandwidth:
> ₹4,00,000 – ₹6,00,000 per annum

Requirements:
* Edit reels, ads, explainer videos, testimonials
* Create performance Ad variations
* Add motion graphics and subtitles
* Optimize for retention and platform algorithms
* Collaborate with the performance team for ad creatives
* Edit long-form (30–60 mins)
* Create short-form cuts (30–90 seconds)
* Add motion graphics, SFX, subtitles, transitions, and hooks
* Optimize videos for retention and watch time
* Coordinate with the Creative Director for storytelling structure

#### Job 8 — Graphic Designer · Hyderabad · Full-time · Posted 2/20/2026 · /careers/69981b4a85dd2b21c1f3223f
Job Description:
> Experience: 3–5 Years
> Location: Hyderabad (Full-Time)
> Reports To: Creative Director
>
> Role Objective:
>
> Translate brand strategy into high-performing visual assets optimized for digital distribution. Execute high-quality visual assets aligned with brand strategy and campaign objectives.
>
> KPIs:
> Thumbnail CTR improvement
> Social engagement rate on designed posts
> Design turnaround time
> Campaign brand kits
> Design templates for scale
>
> Tools:
> Photoshop, Illustrator, InDesign, Figma, Canva (advanced), After Effects (basic preferred), AI tools for image generation, video creation etc CorelDraw etc
>
> Salary Bandwidth:
> ₹3,20,000 – ₹4,50,000 per annum

Requirements:
* Design thumbnails, carousels, banners, pitch decks, show covers,social creatives, ads, brochures and brand assets
* Create platform-specific creatives (YouTube, LinkedIn, Instagram, WhatsApp)
* Develop templates for recurring content formats
* Assist Creative Director in visual consistency
* Design event and on-ground branding materials
* Create logo systems and visual identities
* Prepare files for print and digital publishing
* Adapt campaign creatives across formats
* Support performance marketing with ad creatives

#### Job 9 — Creative Director · Hyderabad · Full-time · Posted 2/20/2026 · /careers/69981b0685dd2b21c1f32232
Job Description:
> Experience: 3–5 Years
> Location: Hyderabad (Full-Time)
> Reports To: Founder / Strategy Head
>
> Role Objective:
>
> Lead creative strategy across branding, advertising campaigns, digital content, and client brand identity systems.
>
> Deliverables:
>
> Campaign concept decks.
> Brand guideline documents.
> Integrated campaign rollouts.
>
> KPIs:
>
> Client retention rate.
> Campaign performance metrics.
> Creative turnaround efficiency.
> Award submissions / industry recognition (if applicable).
>
> Salary Bandwidth (Hyderabad):
> ₹3,00,000 – ₹5,00,000 per annum

Requirements:
* Own creative direction across multiple client accounts.
* Develop brand positioning, visual systems, and campaign concepts.
* Lead ideation for 360° campaigns (digital, print, outdoor, social).
* Direct designers, editors, copywriters.
* Present concepts to clients confidently.
* Approve all major creative deliverables before release.

#### Job 10 — Front Office Head · Hyderabad · Full-time · Posted 1/29/2026 · /careers/697b5578812df18515d9f460
Job Description:
> Job Title: Front Office Head
>
> Department: Front Office / Guest Services
> Reports To: General Manager / Operations Manager
> Job Purpose: Manage all front office functions to ensure exceptional guest service, high team performance, and seamless departmental coordination.
>
> Key Responsibilities:
> Operations: Supervise daily reception, reservations, concierge, and guest relations.
> Service Standards: Ensure efficient check-in/out and compliance with brand SOPs.
> Leadership: Lead, train, schedule, and evaluate front office personnel.
> Guest Relations: Manage VIP arrivals and resolve escalated complaints/service recovery.
> Revenue & Reporting: Monitor occupancy and reservation systems to optimize revenue; analyze performance reports.
> Coordination: Collaborate with Housekeeping, F&B, and Maintenance for flawless service.
> Compliance: Enforce safety, security, and legal regulations.

Requirements:
* Education: Degree or Diploma in Hotel Management or Hospitality.
* Experience: Minimum 3 years in front office operations.
* Technical: Proficient in PMS (Property Management Systems) and MS Office.
* Skills: Strong leadership, problem-solving, and interpersonal communication.
* Flexibility: Ability to work shifts, weekends, and holidays.

#### Job 11 — Steward / Stewardess · Hyderabad · Full-time · Posted 1/29/2026 · /careers/697b552b812df18515d9f45a
Job Description:
> Job Title: Steward / Stewardess
> Reports To: Captain / Restaurant Manager
> Job Purpose: Support the service team in delivering efficient F&B service while maintaining high standards of cleanliness and organization.
>
> Job Requirements:
> 1. Service Support: Assist in food/beverage delivery and replenish table accompaniments.
> 2. Mise-en-place: Set up tables with correct cutlery, crockery, and glassware.
> 3. Table Maintenance: Clear tables promptly and keep the dining area pristine.
> 4. Collaboration: Support Captains and Servers to ensure smooth floor operations.
> 5. Compliance: Follow all hygiene, sanitation, and safety protocols.
> 6. Shift Duties: Complete assigned opening, closing, and side tasks.

Requirements:
* Experience: Minimum 2 years in hospitality preferred (Freshers considered).
* Education: Certificate/Diploma in Hotel Management or F&B Service.
* Skills: Basic knowledge of service etiquette and strong interpersonal skills.
* Flexibility: Ability to work shifts, weekends, and holidays.

#### Job 12 — Server / Waiter / Waitress · Hyderabad · Full-time · Posted 1/29/2026 · /careers/697b54c3812df18515d9f44e
Job Description:
> Job Title: Server / Waiter / Waitress
> Department: Food & Beverage Service
> Reports To: Captain / Restaurant Manager / F&B Manager
>
> Job Purpose: Deliver prompt, professional, and courteous F&B service to ensure an exceptional guest dining experience that aligns with brand standards.

Requirements:
* Guest Service: Welcome guests, present menus, and assist with seating.
* Order Management: Take accurate orders and enter them into the POS system.
* Service Delivery: Serve food and beverages timely and professionally.
* Station Maintenance: Ensure table setup, cleanliness, and presentation standards are met.
* Communication: Address guest requests and complaints with courtesy; coordinate with kitchen/bar teams.
* Compliance: Strictly adhere to hygiene, safety, and service SOPs.
* Financials: Manage billing procedures and process payments accurately.
* Operational Support: Perform opening, closing, and side duties as assigned.
* Education: Certificate/Diploma in Hotel Management or F&B Service preferred.
* Experience: Minimum 2 years in restaurant/hotel service (Freshers may be considered).
* Skills: Basic understanding of customer service standards and POS operations.
* Communication: Strong interpersonal skills.
* Flexibility: Ability to work shifts, weekends, and holidays.

#### Job 13 — Captain · Hyderabad · Full-time · Posted 1/29/2026 · /careers/697b5463812df18515d9f448
Job Description:
> Job Title: Captain
> Department: Food & Beverage Service / Operations
> Reports To: Restaurant Manager / F&B Manager
> Job Purpose: Oversee floor operations during shifts to ensure exceptional guest service and seamless coordination between the service staff, kitchen, and management.

Requirements:
* Floor Supervision: Coordinate daily service operations and manage guest seating.
* Team Leadership: Delegate tasks to stewards, conduct pre-shift briefings, and assist in staff training.
* Order Management: Take and track F&B orders accurately to ensure prompt delivery.
* Service Standards: Maintain strict compliance with service, hygiene, and safety protocols.
* Guest Relations: Professionally handle complaints and feedback to ensure effective service recovery.
* Coordination: Liaise with the kitchen and bar teams to maintain a smooth service flow.
* Reporting: Assist with opening/closing duties and maintain operational records.
* Education: Diploma or Degree in Hotel Management or Hospitality.
* Experience: Minimum 2 years in F&B service; supervisory experience preferred.
* Skills: Strong leadership, interpersonal communication, and deep knowledge of restaurant procedures.
* Flexibility: Willingness to work shifts, weekends, and holidays.

#### Job 14 — Junior Barista · Hyderabad · Full-time · Posted 1/29/2026 · /careers/697b5429812df18515d9f442
Job Description:
> Job Title: Junior Barista
> Reports To: Senior Barista / Café Manager
> Job Purpose: Assist in beverage preparation and service while maintaining café cleanliness and providing friendly guest interactions.

Requirements:
* Preparation: Prepare coffee and beverages according to standard recipes.
* Mise-en-place: Stock the coffee station and prepare ingredients for service.
* Cleanliness: Maintain a sanitized workstation, equipment, and service area.
* Service: Engage customers professionally and process billing via POS.
* Compliance: Adhere to all safety, hygiene, and storage (FIFO) protocols.
* Support: Assist senior staff with inventory and general café duties.
* Experience: 0–1 year in a café (Freshers welcome).
* Skills: Basic coffee knowledge and an eagerness to learn brewing techniques.
* Attributes: Strong communication and ability to work flexible shifts.

#### Job 15 — Senior Barista · Hyderabad · Full-time · Posted 1/29/2026 · /careers/697b5376812df18515d9f43c
Job Description:
> Job Title: Senior Barista
> Reports To: Café / Outlet / F&B Manager
> Job Purpose: Oversee coffee operations, ensure beverage quality, and mentor junior staff to maintain high service standards.

Requirements:
* Quality Control: Prepare specialty coffee and teas, ensuring consistency in flavor and latte art.
* Supervision: Oversee daily barista operations, including shift scheduling and opening/closing.
* Training: Mentor and guide Junior Baristas on techniques and service standards.
* Management: Lead inventory ordering, stock rotation, and waste reduction.
* Service: Handle customer complaints and ensure effective service recovery.
* Compliance: Maintain equipment hygiene and enforce food safety (HACCP/FSSAI).
* Experience: 1–2+ years as a Barista with specialty coffee expertise.
* Skills: Proficient in milk texturing, brewing techniques, and POS operations.
* Education: Barista or F&B certification preferred.

#### Job 16 — Bartender · Hyderabad · Full-time · Posted 1/29/2026 · /careers/697b533a812df18515d9f436
Job Description:
> Job Title: Bartender
> Department: Food & Beverage / Bar Operations
> Reports To: Bar Manager / F&B Manager
> Job Purpose: Prepare and serve beverages efficiently while providing excellent guest service and ensuring compliance with safety and licensing regulations.

Requirements:
* Beverage Service: Mix and serve alcoholic and non-alcoholic drinks according to standard recipes.
* Guest Experience: Provide prompt, professional service and offer drink suggestions to enhance revenue.
* Maintenance: Maintain a clean, organized, and hygienic bar area and equipment.
* Compliance: Enforce legal drinking age requirements and follow responsible service of alcohol (RSA) practices.
* Inventory: Monitor stock levels, assist with inventory counts, and minimize wastage.
* Transactions: Accurately handle cash/card payments and follow POS procedures.
* Problem Solving: Resolve guest inquiries and complaints courteously.
* Collaboration: Coordinate with service staff to ensure a seamless workflow.
* Education: Diploma/Certificate in Bartending or Hotel Management (preferred).
* Experience: Minimum 3 years of experience in bar operations.
* Technical Knowledge: Strong understanding of spirits, cocktails, wines, and bar tools.
* Skills: Excellent interpersonal skills and familiarity with licensing regulations.
* Flexibility: Willingness to work evenings, weekends, and holidays.

#### Job 17 — Property Manager · Hyderabad · Full-time · Posted 1/29/2026 · /careers/697b52ae812df18515d9f424
Job Description:
> Job Title: Property Manager
> Department: Property Management / Administration
> Reports To: General Manager / Owner / Asset Manager
> Job Purpose: Supervise daily property operations to ensure effective maintenance, high tenant satisfaction, legal compliance, and optimal financial performance.

Requirements:
* Operations Oversight: Manage daily residential or commercial property functions and facilities.
* Maintenance & Upkeep: Ensure regular repairs, facilities maintenance, and upkeep of common areas.
* Vendor Management: Negotiate contracts and supervise vendors, contractors, and service providers.
* Tenant Relations: Coordinate leasing, rent collection, renewals, and resolve grievances.
* Financial Management: Track budgets, manage operating expenses, and enhance revenue streams.
* Compliance & Safety: Ensure the asset adheres to all statutory, safety, and regulatory laws.
* Inspections: Conduct regular property walkthroughs and implement preventive maintenance plans.
* Record Keeping: Maintain accurate logs for leases, service contracts, and occupancy data.
* Inter-departmental Coordination: Collaborate with internal and external teams for seamless service.
* Education: Bachelor’s degree in Property Management, Real Estate, or Business Administration.
* Experience: 6+ years in property/facility management or real estate operations.
* Technical Knowledge: Understanding of building systems, maintenance practices, and regulations.
* Skills: Strong negotiation, organization, and financial budgeting capabilities.
* Software: Proficient in MS Office and property management software.

#### Job 18 — Food & Beverage (F&B) Manager · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a26c70b696f73fb1d814c
Job Description:
> Oversee all F&B operations to ensure high-quality service, guest satisfaction, cost efficiency, and profitability while upholding brand standards.

Requirements:
* Operations Oversight: Manage daily F&B activities across restaurants, banquets, and bars.
* Strategy & SOPs: Develop and implement F&B strategies and Standard Operating Procedures.
* Guest Relations: Ensure premium service and manage guest feedback and service recovery.
* Menu & Quality: Partner with the Executive Chef on menu planning and quality control.
* Financial Management: Oversee budgeting, inventory, purchasing, and waste reduction.
* Team Management: Lead recruitment, training, scheduling, and performance evaluations.
* Compliance: Ensure strict adherence to food safety, hygiene, and licensing laws.
* Performance Analysis: Monitor sales reports, forecasts, and KPIs to drive revenue.
* Collaboration: Coordinate with other departments for events and promotions.
* Qualifications & Requirements
* Education: Degree/Diploma in Hotel or Hospitality Management.
* Experience: 4+ years in F&B operations, with 3–4 years in a managerial role.
* Expertise: Strong knowledge of service standards, beverages, and cost management.
* Skills: Proven leadership, financial acumen (budgeting/reporting), and communication.
* Knowledge: Familiarity with food safety standards and local licensing regulations.

#### Job 19 — Pastry Chef · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a24db0b696f73fb1d8146
Job Description:
> Department: Pastry / Bakery
> Plan, prepare, and present high-quality pastries, desserts, and baked goods while ensuring consistency, creativity, food safety, and efficiency.

Requirements:
* Prepare, bake, and present a diverse range of pastries, cakes, breads, and confections.
* Ensure uniformity in quality, flavor, portioning, and aesthetic presentation.
* Develop new recipes and seasonal dessert menus in collaboration with senior chefs.
* Uphold strict hygiene, sanitation, and food safety standards (HACCP/FSSAI).
* Manage production schedules, mise-en-place, and inventory for the pastry section.
* Control food costs and reduce wastage through proper storage and portioning.
* Supervise, train, and mentor junior pastry staff and Commis Chefs.
* Coordinate with the kitchen team to meet service and special event requirements.
* Ensure proper operation and maintenance of specialized pastry equipment.
* Education: Diploma/Degree in Pastry Arts, Bakery, or Culinary Arts.
* Experience: Minimum 4 years in a professional kitchen or high-end bakery.
* Technical Skills: Expert knowledge of baking techniques and dessert plating.
* Compliance: Strong understanding of food safety, hygiene, and kitchen SOPs.
* Attributes: Ability to meet deadlines in a fast-paced environment with strong leadership and communication skills.

#### Job 20 — Commis III · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a24040b696f73fb1d8140
Job Description:
> To aid in fundamental food preparation and kitchen operations under senior supervision while learning culinary techniques and upholding hygiene standards.
> - Assist with basic prep tasks: washing, peeling, and chopping vegetables.
> - Aid senior chefs in mise-en-place and general food preparation.
> - Maintain cleanliness of kitchen work areas, equipment, and utensils.
> - Adhere to hygiene, sanitation, and food safety standards (HACCP/FSSAI).
> - Support the team during service hours as instructed by senior personnel.
> - Ensure proper handling and storage of all raw materials.
> - Execute basic duties including cleaning, organizing, and stocking.
> - Dispose of waste according to kitchen and safety regulations.
> - Follow all instructions and kitchen procedures strictly.
> - Facilitate the smooth flow of daily kitchen operations.

Requirements:
* Experience: Freshers or individuals with up to 1 year of kitchen experience.
* Education: Basic understanding of kitchen operations (formal training preferred).
* Skills: Knowledge of hygiene protocols and basic safety.
* Attributes: Eagerness to learn and thrive in a fast-paced environment.

#### Job 21 — Commis II · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a23970b696f73fb1d813a
Job Description:
> Department: Asian, Continental, North Indian, South Indian
> Support the CDP and Commis I in food preparation while ensuring quality, consistency, and compliance with kitchen standards.
>
> -Assist with fundamental preparation: chopping, marinating, and portioning.
> -Prepare mise-en-place for the designated section prior to service.
> -Follow standard recipes and instructions from senior chefs accurately.
> -Maintain cleanliness of the work area, utensils, and equipment.
> -Comply with food safety and sanitation standards (HACCP/FSSAI).
> -Manage proper food storage, labeling, and FIFO practices.
> -Provide active support during service hours for smooth operations.
> -Minimize wastage and handle raw materials responsibly.
> -Execute additional kitchen duties as assigned by senior staff.

Requirements:
* Education: Certificate or Diploma in Culinary Arts / Hotel Management preferred.
* Experience: 0–2 years in a professional kitchen.
* Skills: Basic understanding of kitchen operations and cooking techniques.
* Attributes: Eager to learn and capable of working in a fast-paced environment.

#### Job 22 — Commis I · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a22fa0b696f73fb1d8134
Job Description:
> To manage designated kitchen tasks autonomously, ensure food quality and hygiene standards, and support senior chefs in maintaining seamless kitchen operations.

Requirements:
* Prepare and cook food items according to standard recipes under supervision.
* Manage a designated kitchen section efficiently during service hours.
* Complete all mise-en-place before service begins.
* Uphold high standards of food quality, taste, and presentation.
* Adhere to food safety and sanitation regulations (HACCP/FSSAI).
* Ensure correct storage, labeling, and FIFO (First In, First Out) practices.
* Assist senior chefs during peak periods and special events.
* Maintain cleanliness of the work area, equipment, and utensils.
* Minimize wastage and manage ingredients responsibly.
* Provide guidance and training to junior kitchen staff as needed.
* Education: Diploma or Certificate in Culinary Arts / Hotel Management preferred.
* Experience: 2–4 years in a professional kitchen.
* Skills: Proficient in basic cooking techniques and kitchen operations.
* Knowledge: Strong understanding of food safety and hygiene standards.

#### Job 23 — Sous Chef · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a1ff90b696f73fb1d80e8
Job Description:
> Department: Asian, Continental, North Indian, South Indian
> Overview: Support the Executive Chef in managing operations, food quality, cost control, and team leadership to ensure seamless service.

Requirements:
* Operations & Quality: Lead daily service and manage the kitchen in the Head Chef’s absence. Supervise food prep and conduct tastings to ensure consistent quality.
* Menu & Innovation: Assist in menu planning, recipe costing, and seasonal promotions.
* Team Leadership: Manage scheduling and train junior staff on culinary standards.
* Hygiene & Safety: Enforce HACCP/FSSAI standards and oversee kitchen sanitation.
* Cost & Inventory: Control food costs, minimize waste, and manage stock rotation (FIFO).
* Communication & Maintenance: Coordinate with service staff and resolve guest feedback. Oversee equipment maintenance and report repair needs.
* Education: Diploma/Degree in Culinary Arts or Hotel Management.
* Experience: 5–8 years in professional kitchens.
* Previous experience as a CDP or supervisor.

#### Job 24 — Demi Chef De Partie (DCDP) · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a1f620b696f73fb1d80e2
Job Description:
> Overview: The Demi Chef De Partie assists the Chef De Partie in overseeing a designated kitchen section by aiding in food preparation, upholding quality and hygiene standards, and ensuring the efficient operation of daily kitchen activities.

Requirements:
* Aid in the preparation, cooking, and presentation of dishes according to standard recipes.
* Ensure that mise-en-place is ready in advance for seamless service.
* Maintain uniformity in taste, portion sizes, and presentation.
* Assist the Chef De Partie in the daily functions of the assigned section.
* Ensure the workstation is properly set up and dismantled.
* Adhere to instructions during service to uphold speed and precision.
* Comply with food safety, hygiene, and sanitation regulations (HACCP/FSSAI).
* Ensure proper storage, labeling, and FIFO (First In, First Out) practices are followed.
* Keep the work area, equipment, and utensils clean and organized.
* Guarantee the prompt fulfillment of designated responsibilities
* Diploma or certification in Culinary Arts / Hotel Management (preferred)
* 1–3 years of experience in a professional kitchen environment
* Experience in the relevant section is beneficial

#### Job 25 — Chef De Partie (CDP) · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a1d3f0b696f73fb1d80bc
Job Description:
> Department: Asian, Continental, North Indian, South Indian
>
> Overview: Oversee a specific kitchen section to ensure high standards of food quality, hygiene, and timely service while supporting overall kitchen operations.

Requirements:
* Prepare and present dishes according to standardized recipes and quality benchmarks.
* Ensure consistency in taste, texture, and presentation.
* Manage mise-en-place for the assigned section.
* Take full responsibility for a specific section (Asian, Continental, etc.).
* Coordinate workflow for seamless service during peak hours.
* Maintain section organization and cleanliness.
* Ensure all output meets company standards for quality and presentation.
* Monitor portion control, freshness, and minimize wastage.
* Address guest feedback regarding food quality.
* Comply with food safety regulations (HACCP, FSSAI).
* Ensure proper food storage, labeling, and rotation (FIFO).
* Maintain a clean and safe work environment.
* Supervise and mentor Commis Chefs and kitchen assistants.
* Train junior staff on recipes, techniques, and discipline.
* Promote teamwork and a positive work culture.
* Assist with stock management, requisitions, and waste reduction.
* Report inventory shortages or equipment malfunctions promptly.
* Support cost control and efficient raw material usage.
* Collaborate across sections for smooth operations.
* Maintain clear communication with senior chefs.
* Assist in menu planning and special events.
* Diploma or certification in Culinary Arts or Hotel Management preferred.
* 5 years of professional kitchen experience.
* Prior experience managing a kitchen section is advantageous.

#### Job 26 — Senior Finance Manager · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a1b700b696f73fb1d807b
Job Description:
> Location: Hyderabad (In-Office)
> Experience: 6–8 Years
> Employment Type: Full-Time, Permanent
>
> Role Overview:
> The Senior Finance Manager serves as the strategic lead for financial operations. This position requires a high-level expert capable of overseeing internal financial health while providing specialized financial consultancy to a diverse portfolio of hospitality clients. The role involves navigating the complexities of high-volume transactional data and managing P&L structures across multiple outlets and hospitality entities.

Requirements:
* Strategic Financial Oversight: Drive the financial planning process, including annual budgeting, long-term forecasting, and resource allocation.
* Hospitality Operations Analysis: Manage departmental P&L, focusing on
* industry-specific metrics such as RevPAR, ADR, and COGS (Cost of Goods Sold) for Food & Beverage.
* Multi-Unit Reporting: Supervise financial reporting for multiple outlets, ensuring consistency in accounting practices and data integrity across various hospitality units.
* Compliance & Taxation: Ensure full adherence to statutory requirements, including GST, TDS, and corporate tax regulations.
* Audit Management: Lead internal and external audit processes, ensuring all financial controls are robust, transparent, and compliant with industry standards.
* Business Consultancy: Act as a financial advisor to hospitality partners, identifying areas for cost optimization, revenue leakage prevention, and improved profitability.
* Education: Chartered Accountant (CA), ICWA, or an MBA in Finance from a recognized institution.
* Experience: 6–8 years of progressive finance experience, with a mandatory background in the Hospitality Industry.
* Global Standards: Prior experience working with an International Hospitality Chain is an advantage but not a requirement.
* Technical Proficiency: Advanced knowledge of hospitality ERPs (e.g., Opera, IDS Next, SAP, or Oracle) and expert-level financial modeling skills in Excel.
* Industry Frameworks: Deep understanding of the Uniform System of Accounts for the Lodging Industry (USALI).
* Competitive compensation package aligned with industry standards for senior management.
* Opportunity to operate at a strategic level within a high-growth hospitality environment.

(The source splits the "focusing on / industry-specific metrics" sentence into two bullets.)

#### Job 27 — HR Manager (Hospitality) · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a1a1a0b696f73fb1d8075
Job Description:
> Location: Hyderabad (In-Office)
> Experience: 3–5 Years
> Employment Type: Full-Time, Permanent
> Role Overview:
> The HR Manager will be responsible for overseeing the end-to-end human resources functionwith a specific focus on the hospitality sector. This role requires a professional who understands the unique challenges of the industry, including high-volume recruitment, shift management, and maintaining high service standards through employee engagement. The ideal candidate will bridge the gap between operational needs and people management.

Requirements:
* Talent Acquisition: Manage the full recruitment lifecycle for diverse roles, from frontline service staff and culinary teams to mid-level management.
* Onboarding & Training: Develop and execute comprehensive orientation programs that align new hires with the hospitality brand's service culture and SOPs.
* Employee Relations: Act as the primary point of contact for employee grievances, ensuring a healthy work environment and high retention rates in a fast-paced setting.
* Performance Management: Implement appraisal systems and KRA (Key Result Area) tracking tailored to hospitality excellence and guest satisfaction metrics.
* Compliance & Payroll: Ensure full compliance with local labor laws, managing payroll processing, attendance tracking (including shift rotations), and statutory benefits.
* Culture Building: Design and lead engagement initiatives to boost morale and foster a "guest-first" mindset across all departments.
* Required Qualifications & Skills
* Experience: 3–5 years of core HR experience, with at least 2 years specifically within the Hospitality Industry (Hotels, Restaurants, or Facility Management).
* Education: MBA in HR, MHRM, or an equivalent degree from a recognized institution.
* Industry Knowledge: Deep understanding of the hospitality labor market, seasonal hiring trends, and statutory compliance (PF, ESI, Labor Acts).
* Soft Skills: Exceptional communication skills, emotional intelligence, and the ability to handle high-pressure situations with a calm demeanor.
* Tech Savvy: Proficiency in HRMS platforms and payroll software.
* Key Competencies: Strong networking skills to source talent across different hospitality niches.
* Ability to design training modules focused on soft skills and service etiquette.
* Proactive approach to attrition management and workforce planning.

#### Job 28 — Photographer/ Videographer · Hyderabad · Full-time · Posted 1/28/2026 · /careers/697a16de0b696f73fb1d8042
Job Description:
> As a Full-Time Photographer, you will operate in a fast-paced environment, capturing high-quality visuals for premium hospitality brands. You are responsible for the entire creative lifecycle—from staging and lighting to post-production and asset optimization.

Requirements:
* Specializations: Expertise in Food & Beverage, Lifestyle, Architectural, and Interior photography/ videography.
* Editing: High proficiency in Adobe Creative Suite (Lightroom/Photoshop) for retouching and color grading.
* Standards: Implementation of Web Security and SEO best practices for digital assets.
* Performance: Experience with state management of files to ensure speed and performance optimization.
* Portfolio: Must provide a portfolio (e.g., GitHub/Digital Gallery/Behance) highlighting professional projects in the required niches.
* Visual Architect: Well-versed in scene composition and studio setup from scratch.
* Availability: Must be able to work full-time from the Hyderabad office.

## 3. Asset inventory

How to read this table:
- Every row is a file served from the site's own domain. Each file exists at one resolution only (no srcset, no @2x variants, no responsive crops), so the URL listed is also the highest-resolution version. Natural size was read from the loaded image; file size was read from the HTTP response.
- "Assigned file name" is the name the file has inside the images zip (`images/` folder). The original server path is the end of the URL.
- Displayed size = size on screen in a browser window 894 px wide (the only width I could measure live). On desktop 1440 px and mobile 390 px the image boxes are larger or smaller; see the responsive notes in section 2 and the screenshots.
- “What it shows” is a short description from a thumbnail contact sheet; the images are branding work, so details such as small text are not transcribed.
- The server answers every unknown path with the HTML app shell (HTTP 200), so a missing file does not show a 404. Sections 3.2 to 3.4 list external images, files the site references that do not exist, and other files.

### 3.1 Images on the site's domain (54 files, 4,141,625 bytes in total)

| # | Assigned file name | Full URL (highest resolution available) | Alt text | Displayed / natural size (px) | Type (file size) | Page and section | What it shows |
|---|---|---|---|---|---|---|---|
| 1 | `logo-ira-1.png` | https://www.irahospitality.co.in/logo1.png | IRA | 184×184 (nav, md+); 144×144 mobile / 447×559 | PNG (28,100 B) | Nav logo on every inner page (all pages except Home) | IRA monogram logo, grey wordmark/mark on transparent background (shown on a dark tile in my contact sheet); nav logo, round, mix-blend-difference |
| 2 | `logo-ira-2.png` | https://www.irahospitality.co.in/logo2.png | IRA | 184×184 (nav on Home); 128×128 (footer, every page) / 447×559 | PNG (34,810 B) | Home nav; footer logo on every page | IRA logo in gold with a small line of text beneath it; transparent PNG |
| 3 | `about-studio-team.jpg` | https://www.irahospitality.co.in/ira-about.jpg | Design Studio Team | 672×292 at 894 px wide / 1024×1280 | JPEG (136,212 B) | Home, section 2 “Discover Our Studio”, right column | Dark green hardcover menu with gold cutlery and a coaster on a marble surface (Indian Durbar menu) |
| 4 | `founder-suhasini.jpeg` | https://www.irahospitality.co.in/assets/suhasini.jpeg | Suhasini | 320×427 at 894 px / 853×1280 | JPEG (71,368 B) | Home, section 4 “Meet Our Team” | Portrait of a woman in dark clothing, arms crossed, light background (Suhasini, co-founder) |
| 5 | `founder-siddharth.jpg` | https://www.irahospitality.co.in/assets/siddharth.jpg | Siddarth | 320×427 at 894 px / 800×1000 | JPEG (58,629 B) | Home, section 4 “Meet Our Team” | Portrait of a bearded man seated against a gold/black chequered backdrop (Siddharth, co-founder) |
| 6 | `testimonial-oshin-mitra-trident.jpeg` | https://www.irahospitality.co.in/assets/trident.jpeg | Oshin Mitra | 96×96 (active), 64×64 (inactive) / 1280×1280 | JPEG (39,676 B) | Home, testimonials slider, avatar 1 | Trident Hyderabad logo (red and black on white) |
| 7 | `testimonial-yash-huria-iris.jpg` | https://www.irahospitality.co.in/assets/iris.jpg | Yash Huria | 64×64 at 894 px (96×96 when active) / 727×720 | JPEG (79,305 B) | Home, testimonials slider, avatar 2 | Iris logo (green line emblem on white) |
| 8 | `baked-daily-thumbnail.jpg` | https://www.irahospitality.co.in/assets/Baked_daily/Thumbnail_11zon.jpg | Baked Daily (card alt = project title) | 360×480 at 894 px (card, 3:4, object-cover) / 2676×3345 | JPEG (93,170 B) | Portfolio /projects, card 1 | Baked Daily logo, cream background |
| 9 | `baked-daily-1.jpg` | https://www.irahospitality.co.in/assets/Baked_daily/1_11zon.jpg | Baked Daily | 792×1408 at 894 px / 1269×2256 | JPEG (143,367 B) | /projects/baked-daily, image area | Tall branding board/collage: logo and food photography |
| 10 | `dessert-kart-1.jpg` | https://www.irahospitality.co.in/assets/DessertKart/1.jpg | Dessert Kart (card alt = project title) | 360×480 at 894 px (card) / 800×1000 | JPEG (20,839 B) | Portfolio /projects, card 2 | Dessert Kart gold wordmark on pale teal vertical stripes |
| 11 | `dessert-kart-3.jpg` | https://www.irahospitality.co.in/assets/DessertKart/3.jpg | Baked Daily (copy-paste error) | 234×292 at 894 px / 800×1000 | JPEG (57,997 B) | /projects/dessert-kart, hero image | Tall pale-teal poster with the Dessert Kart wordmark and a dessert photo |
| 12 | `dessert-kart-4.jpg` | https://www.irahospitality.co.in/assets/DessertKart/4.jpg | Baked Daily - 1 | 186×186 at 894 px / 800×1000 | JPEG (28,352 B) | /projects/dessert-kart, 4-up row | Stacked pastel ice-cream/dessert cups with the brand name |
| 13 | `dessert-kart-5.jpg` | https://www.irahospitality.co.in/assets/DessertKart/5.jpg | Baked Daily - 4 | 186×186 at 894 px / 800×1000 | JPEG (73,241 B) | /projects/dessert-kart, 4-up row | Woman holding a branded dessert package against a white background |
| 14 | `dessert-kart-6.jpg` | https://www.irahospitality.co.in/assets/DessertKart/6.jpg | Baked Daily - 5 | 388×388 at 894 px / 800×1000 | JPEG (87,406 B) | /projects/dessert-kart, wide tile | Tiramisu-style dessert with coffee beans and brand text |
| 15 | `dessert-kart-8.jpg` | https://www.irahospitality.co.in/assets/DessertKart/8.jpg | Baked Daily - 2 | 186×186 at 894 px / 800×1000 | JPEG (43,760 B) | /projects/dessert-kart, 4-up row | Dessert cup topped with mango, with brand copy |
| 16 | `dessert-kart-9.jpg` | https://www.irahospitality.co.in/assets/DessertKart/9.jpg | Baked Daily - 6 | 388×388 at 894 px / 800×1000 | JPEG (77,150 B) | /projects/dessert-kart, wide tile | Pink dessert slice with a strawberry, on a yellow background with copy |
| 17 | `dessert-kart-10.jpg` | https://www.irahospitality.co.in/assets/DessertKart/10.jpg | Baked Daily - 3 | 186×186 at 894 px / 800×1000 | JPEG (106,492 B) | /projects/dessert-kart, 4-up row | Dessert Kart outdoor kiosk/stall with a poster, in a mall-like setting |
| 18 | `indian-durbar-1.jpg` | https://www.irahospitality.co.in/assets/Durbar/1.jpg | Indian Durbar - 1 | 337×600 at 894 px / 800×1423 | JPEG (146,953 B) | /projects/indian-durbar; also Portfolio card 3 thumbnail (360×480) | Tall green/gold patterned brand visual |
| 19 | `indian-durbar-2.jpg` | https://www.irahospitality.co.in/assets/Durbar/2.jpg | Indian Durbar - 2 | 216×384 at 894 px / 800×449 | JPEG (47,316 B) | /projects/indian-durbar, first image | Material board: wood, leather and fabric swatches in green and brown tones |
| 20 | `indian-durbar-7.jpg` | https://www.irahospitality.co.in/assets/Durbar/7.jpg | Indian Durbar - 7 | 547×393 at 894 px / 1200×674 | JPEG (84,493 B) | /projects/indian-durbar | Wide image of men in dark and green uniforms/outfits |
| 21 | `indian-durbar-8.jpg` | https://www.irahospitality.co.in/assets/Durbar/8.jpg | Indian Durbar - 8 | 248×441 at 894 px / 800×1423 | JPEG (111,968 B) | /projects/indian-durbar | Table setting with menu and cutlery on a brown/white layout |
| 22 | `indian-durbar-9.jpg` | https://www.irahospitality.co.in/assets/Durbar/9.jpg | Indian Durbar - 9 | 221×393 at 894 px / 800×1423 | JPEG (101,870 B) | /projects/indian-durbar | Green menu and card collateral on a dark green background |
| 23 | `indian-durbar-10.jpg` | https://www.irahospitality.co.in/assets/Durbar/10.jpg | Indian Durbar - 10 | 248×441 at 894 px / 800×1423 | JPEG (170,964 B) | /projects/indian-durbar | Dark green leaf-patterned scene with a menu |
| 24 | `indian-durbar-12.jpg` | https://www.irahospitality.co.in/assets/Durbar/12.jpg | Indian Durbar - 12 | 248×441 at 894 px / 800×1000 | JPEG (78,353 B) | /projects/indian-durbar | Dark moody food and menu photograph, green and amber tones |
| 25 | `indian-durbar-13.jpg` | https://www.irahospitality.co.in/assets/Durbar/13.jpg | Indian Durbar - 13 | 792×445 at 894 px / 800×449 | JPEG (65,982 B) | /projects/indian-durbar, last wide image | Set of illustrated game-tile style cards and a green booklet on a light background |
| 26 | `indian-durbar-14.jpg` | https://www.irahospitality.co.in/assets/Durbar/14.jpg | Indian Durbar - 14 | 248×310 at 894 px / 800×1000 | JPEG (72,584 B) | /projects/indian-durbar | “Indian Durbar” brass/wood signage on a wall |
| 27 | `indian-durbar-15.jpg` | https://www.irahospitality.co.in/assets/Durbar/15.jpg | Indian Durbar - 15 | 248×310 at 894 px / 800×1000 | JPEG (88,349 B) | /projects/indian-durbar | Gold-toned graphic panels (partly visible in my contact sheet) |
| 28 | `indian-durbar-16.jpg` | https://www.irahospitality.co.in/assets/Durbar/16.jpg | Indian Durbar - 16 | 248×310 at 894 px / 800×1000 | JPEG (58,733 B) | /projects/indian-durbar | Hands holding a green menu with a gold emblem |
| 29 | `iris-trident-pune-1.jpg` | https://www.irahospitality.co.in/assets/Iris/1.jpg | Iris | Trident Pune (card alt = project title) | 360×480 at 894 px (card) / 800×1000 | JPEG (45,583 B) | Portfolio /projects, card 4 | Iris green emblem logo on a dark green background |
| 30 | `iris-trident-pune-2.jpg` | https://www.irahospitality.co.in/assets/Iris/2.jpg | Iris | Trident Pune - 2 | 448×560 at 894 px / 800×1000 | JPEG (89,003 B) | /projects/iris-trident-pune | Menu pages with colourful food illustrations on cream |
| 31 | `iris-trident-pune-3.jpg` | https://www.irahospitality.co.in/assets/Iris/3.jpg | Iris | Trident Pune - 3 | 792×495 at 894 px / 800×500 | JPEG (46,745 B) | /projects/iris-trident-pune | Hand holding a red cocktail beside an open menu |
| 32 | `iris-trident-pune-4.jpg` | https://www.irahospitality.co.in/assets/Iris/4.jpg | Iris | Trident Pune - 4 | 792×1188 at 894 px / 1024×1536 | JPEG (97,620 B) | /projects/iris-trident-pune | Tall dark collage of menu pages and food/drink photography |
| 33 | `og-green-1.jpg` | https://www.irahospitality.co.in/assets/OGSalads/1.jpg | OG Green - 1 (also card alt “OG Green”) | 792×446 at 894 px (cropped); 360×480 as card / 800×1000 | JPEG (73,632 B) | /projects/og-green; Portfolio card 5 thumbnail | OG Green dark-green emblem on a leafy dark background |
| 34 | `og-green-3.jpg` | https://www.irahospitality.co.in/assets/OGSalads/3.jpg | OG Green - 3 | 792×446 at 894 px (cropped) / 800×1000 | JPEG (92,267 B) | /projects/og-green | Brand collage of green cards, leaf icons and packaging |
| 35 | `og-green-4.jpg` | https://www.irahospitality.co.in/assets/OGSalads/4.jpg | OG Green - 4 | 792×446 at 894 px (cropped) / 800×1000 | JPEG (60,718 B) | /projects/og-green | Brand palette board reading “Natural. Bold. Fresh.” with green swatches |
| 36 | `og-green-5.jpg` | https://www.irahospitality.co.in/assets/OGSalads/5.jpg | OG Green - 5 | 792×446 at 894 px (cropped) / 800×1000 | JPEG (88,256 B) | /projects/og-green | Bowl of salad being held, with a leaf-icon paper wrap |
| 37 | `og-green-8.jpg` | https://www.irahospitality.co.in/assets/OGSalads/8.jpg | OG Green - 8 | 792×446 at 894 px (cropped) / 800×1000 | JPEG (45,998 B) | /projects/og-green | Pale yellow brand sheet with leaf icons and brand text |
| 38 | `og-green-9.jpg` | https://www.irahospitality.co.in/assets/OGSalads/9.jpg | OG Green - 9 | 792×446 at 894 px (cropped) / 800×1000 | JPEG (44,022 B) | /projects/og-green | Hand holding a dark green box with a leaf mark |
| 39 | `say-cheese-pi7-image-tool-1.jpg` | https://www.irahospitality.co.in/assets/SayCheese/Pi7_image_tool%281%29.jpg | Say Cheese - 1 (also card alt “Say Cheese”) | 792×446 at 894 px (cropped); 360×480 as card / 800×1000 | JPEG (43,389 B) | /projects/say-cheese; Portfolio card 6 thumbnail | Hands kneading yellow dough over a colourful pattern strip |
| 40 | `say-cheese-pi7-image-tool.jpg` | https://www.irahospitality.co.in/assets/SayCheese/Pi7_image_tool.jpg | Say Cheese - 2 | 792×446 at 894 px (cropped) / 800×1000 | JPEG (62,516 B) | /projects/say-cheese | Green leaves background with red, yellow and orange brand stickers |
| 41 | `unamas-thumbnail.jpg` | https://www.irahospitality.co.in/assets/Unamas/thumbnail.jpg | Unamas (card alt = project title) | 360×480 at 894 px (card) / 1181×1476 | JPEG (54,269 B) | Portfolio /projects, card 7 | Yellow poster with a sombrero chef character and “UNAMAS!” wordmark |
| 42 | `unamas-para-text.jpg` | https://www.irahospitality.co.in/assets/Unamas/para-text.jpg | Unamas Para Text | 384×480 at 894 px / 1603×2004 | JPEG (103,185 B) | /projects/unamas | Green typography specimen sheet with the “UNAMAS!” logo |
| 43 | `unamas-hash-code.jpg` | https://www.irahospitality.co.in/assets/Unamas/hash-code.jpg | Unamas Hash Code | 384×480 at 894 px / 1603×2004 | JPEG (99,819 B) | /projects/unamas | Green pattern sheet with the logo and small illustrations |
| 44 | `unamas-16.jpg` | https://www.irahospitality.co.in/assets/Unamas/16.jpg | Unamas 16 | 248×310 at 894 px / 1603×2004 | JPEG (83,812 B) | /projects/unamas | Yellow poster reading “Made your way” with the sombrero chef |
| 45 | `unamas-17.jpg` | https://www.irahospitality.co.in/assets/Unamas/17.jpg | Unamas 17 | 248×310 at 894 px / 1603×2004 | JPEG (93,160 B) | /projects/unamas | Red poster reading “Juicy. Spicy. Yours.” |
| 46 | `unamas-2.jpg` | https://www.irahospitality.co.in/assets/Unamas/2.jpg | Unamas 2 | 248×310 at 894 px / 1603×2004 | JPEG (74,310 B) | /projects/unamas | Yellow poster reading “Wrap it. Stack it. Sauce it like you mean it.” |
| 47 | `unamas-bottom-1.jpg` | https://www.irahospitality.co.in/assets/Unamas/bottom-1.jpg | Unamas 3 | 384×256 at 894 px / 983×655 | JPEG (45,852 B) | /projects/unamas, bottom row | Yellow strip of repeated sombrero-chef characters |
| 48 | `unamas-bottom-2.jpg` | https://www.irahospitality.co.in/assets/Unamas/bottom-2.jpg | Unamas Bottom 1 | 384×256 at 894 px / 983×655 | JPEG (38,797 B) | /projects/unamas, bottom row | Yellow strip of repeated sombrero-chef characters (variant) |
| 49 | `nest-passport.jpg` | https://www.irahospitality.co.in/assets/nest/passport.jpg | Nest Passport | 528×792 at 894 px / 1024×1536 | JPEG (47,479 B) | /projects/nest, first image | Hand holding a blue activity passport booklet |
| 50 | `nest-passport-flat.jpg` | https://www.irahospitality.co.in/assets/nest/passport-flat.jpg | Nest Passport Flat | 384×288 at 894 px / 1536×1024 | JPEG (138,017 B) | /projects/nest | Flat-lay of blue passport booklet pages and stationery on a desk |
| 51 | `nest-mat-flat.jpg` | https://www.irahospitality.co.in/assets/nest/mat-flat.jpg | Nest Mat Flat | 384×288 at 894 px / 1536×1024 | JPEG (127,574 B) | /projects/nest | Flat-lay of a colourful illustrated activity mat |
| 52 | `nest-wall-sticker.jpg` | https://www.irahospitality.co.in/assets/nest/wall-sticker.jpg | Nest Wall Sticker | 384×288 at 894 px / 1536×1024 | JPEG (76,115 B) | /projects/nest | Window wall stickers with colourful illustrations |
| 53 | `nest-mat.jpg` | https://www.irahospitality.co.in/assets/nest/mat.jpg | Nest Mat | 384×288 at 894 px / 1536×1024 | JPEG (87,815 B) | /projects/nest | Child at a table using the activity mat |
| 54 | `nest-wall.jpg` | https://www.irahospitality.co.in/assets/nest/wall.jpg | Nest Wall | 792×528 at 894 px; 360×480 as card / 1536×1024 | JPEG (74,233 B) | /projects/nest, last image; Portfolio card 9 thumbnail | Wall with a “Nest” sign in a bright play space |

Notes on the rows above:
- Rows 1 and 2 have the same pixel size (447×559). They are fitted into a square, round box with `mix-blend-difference`, so the colours invert over the background.
- The original file numbers skip (for example Durbar 1, 2, 7, 8, 9, 10, 12, 13, 14, 15, 16). The skipped numbers are not used by the site; I did not probe whether they exist on the server.
- Rows 8, 10, 18, 29, 33, 39, 41, 54 are the portfolio card thumbnails (they are also used on the project pages in some cases). The card renders `<img alt="{project title}" loading="lazy" decoding="async">` at 3:4 with `object-cover` and zooms to 110% on hover (700 ms).
- The Say Cheese file name contains parentheses: the real path is `/assets/SayCheese/Pi7_image_tool(1).jpg`; in a URL write them as `%28` and `%29`.
- Alt text copy errors are kept verbatim: the Dessert Kart page uses “Baked Daily”, “Baked Daily - 1” to “Baked Daily - 6”; the Unamas bottom images are “Unamas 3” and “Unamas Bottom 1”; the second founder photo has alt “Siddarth” (the site elsewhere writes “Siddharth”).

### 3.2 External images (not on the site's domain, not downloaded)

The user's rule was to work only on the site's own domain, so these were listed but not downloaded. They are stock photographs loaded from Unsplash with `ixlib=rb-4.0.3&auto=format&fit=crop&q=80`; the two photos at the top also carry `ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`.

| # | Suggested file name | Full URL as used on the site | Alt text | Displayed / natural size | Page and section | What it shows |
|---|---|---|---|---|---|---|
| E1 | `stock-profile-avatar.jpg` | https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80 | Profile | 60×60 / 100×150 | Home, section 2 (round avatar with orange pause badge) | Stock photograph (not described in detail) |
| E2 | `stock-team-pill.jpg` | https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80 | Team | 256×96 / 500×334 | Home, section 3 (inline rounded-pill photo in the headline) | Stock photograph (not described in detail) |
| E3 | `stock-avatar-aman-grover.jpg` | https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80 | Aman Grover | 64×64 / 200×300 | Home, testimonial avatar 3 | Stock photograph (Unsplash); alt text is the client name, the photo is not of that person |
| E4 | `stock-avatar-prashant-kulkarni.jpg` | https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80 | Prashant Kulkarni | 64×64 / 200×252 | Home, testimonial avatar 4 | Stock photograph (Unsplash); alt text is the client name, the photo is not of that person |
| E5 | `stock-avatar-digvijay-singh.jpg` | https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80 | Digvijay Singh | 64×64 / 200×300 | Home, testimonial avatar 5 | Stock photograph (Unsplash); alt text is the client name, the photo is not of that person |
| E6 | `stock-blog-fallback.jpg` | https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80 | the post title (`alt={post.title}`) | NOT MEASURED (no post exists) | Code only: fallback cover for blog cards on /blogs (w=800) and, at w=1200, on /blog/{slug} | NOT FOUND on screen (blog list is empty); appears only in the app code |

I did not download these images and did not describe them beyond “stock photograph”. They are generic Unsplash stock images used as placeholders; E3 to E5 sit next to placeholder lorem-ipsum quotes (see section 2.1).

### 3.3 Files the site references that do not exist (served as HTML, not images)

I requested each path; each returned HTTP 200 with `content-type: text/html` and the same 5,568-byte app shell, so the browser shows a broken image or no icon.

| # | Path | Referenced by | Result |
|---|---|---|---|
| M1 | /favicon.ico | `<link rel="icon" type="image/x-icon">` in index.html | NOT FOUND (HTML returned) |
| M2 | /favicon-32x32.png | `<link rel="icon" sizes="32x32">` | NOT FOUND (HTML returned) |
| M3 | /favicon-16x16.png | `<link rel="icon" sizes="16x16">` | NOT FOUND (HTML returned) |
| M4 | /apple-touch-icon.png | `<link rel="apple-touch-icon" sizes="180x180">` | NOT FOUND (HTML returned) |
| M5 | /android-chrome-192x192.png | /site.webmanifest icons | NOT FOUND (HTML returned) |
| M6 | /android-chrome-512x512.png | /site.webmanifest icons | NOT FOUND (HTML returned) |
| M7 | /og-image.jpg (on the host irahospitality.vercel.app) | `og:image` and `twitter:image` | NOT FOUND on the site's own domain (HTML returned); the host named in the tag is a different domain and was not requested |
| M8 | /logo.png (on irahospitality.vercel.app) | JSON-LD `logo` | NOT FOUND on the site's own domain (HTML returned); the real logos are /logo1.png and /logo2.png |
| M9 | /assets/Feu/1.jpg | /projects/feu (alt “Feu - 1”) | HTML returned; natural size 0×0; broken image |
| M10 | /assets/Feu/2.jpg | /projects/feu (alt “Feu - 2”) | HTML returned; broken image |
| M11 | /assets/Feu/3.jpg | /projects/feu (alt “Feu - 3”) | HTML returned; broken image |

The Feu card on /projects shows the text “Image unavailable” because the thumbnail fails to load (the card has an `onError` fallback).

### 3.4 Other non-image files

| File | Type | Size | Notes |
|---|---|---|---|
| /site.webmanifest | application/manifest+json | 600 B | Exists. Contents are in section 5. |
| /assets/index-CNwi16yz.css | CSS | 70,923 chars | Tailwind v4 build plus a few custom rules. |
| /assets/index-3eNvc8A8.js | JS | 33,299 chars | Entry bundle; the pages are lazy-loaded chunks (Home, ProjectsPage, ServicesPage, ContactPage, and so on). |
| Google Fonts: Inter | CSS import | – | `https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap` |
| Font Awesome 6.0.0 | CSS (cdnjs) | – | `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css` linked in index.html |

## 4. Design system

Sources: the site's compiled stylesheet `/assets/index-CNwi16yz.css` (Tailwind CSS v4 build plus a few custom rules), the class names in the rendered DOM, and computed styles read in the browser. Pixel values marked “at 894 px” were measured in the only browser width I had; larger or smaller values come from the Tailwind responsive classes and the screenshots. Hex values for the Tailwind colours were converted from the stylesheet's `oklch()` values with the browser's own colour conversion.

### 4.1 Stack and build facts a developer needs

- Tailwind CSS v4 (CSS variables `--color-*`, `--text-*`, `--spacing: .25rem`, default breakpoints sm 640, md 768, lg 1024, xl 1280, 2xl 1536 px).
- Global custom CSS (copied from the stylesheet, so it can be reused as is):

```css
@import "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap";
* { box-sizing: border-box }
body { color: #fff; background-color: #000; font-family: Inter, sans-serif; overflow-x: hidden }
html { scroll-behavior: smooth }
::-webkit-scrollbar { width: 6px }
::-webkit-scrollbar-track { background: #111 }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px }
::-webkit-scrollbar-thumb:hover { background: #555 }
@keyframes fadeInUp { 0% { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
.animate-fade-in-up { animation: .8s ease-out forwards fadeInUp }
@keyframes spin-slow { 0% { transform: rotate(0) } to { transform: rotate(360deg) } }
.animate-spin-slow { animation: 20s linear infinite spin-slow }
@keyframes pulse-fast { 0%, to { opacity: 1 } 50% { opacity: .5 } }
.animate-pulse-fast { animation: .8s cubic-bezier(.4,0,.6,1) infinite pulse-fast }
@keyframes float-vertical { 0%, to { transform: translateY(0) } 50% { transform: translateY(-40px) } }
.animate-float-vertical { animation: 8s ease-in-out infinite float-vertical }
.gradient-text { -webkit-text-fill-color: transparent; background: linear-gradient(135deg, #fff, #ccc); -webkit-background-clip: text; background-clip: text }
.homepage-text { mix-blend-mode: difference; color: #fff; z-index: 100; position: relative }
section { transition: background-color .3s }
@media (min-width: 1024px) { .hero-content-padding { padding-left: 10% !important } }
.subtitle-alignment { text-align: center !important }
@media (min-width: 1024px) { .subtitle-alignment { text-align: left !important } }
```

- The base font stack in the theme is the system sans stack; Inter is applied only through the `body` rule above. No other web font is used. Icons come from Font Awesome 6.0.0 (cdnjs) and from inline SVG icons (arrows, pause, quote mark).
- Utility classes seen in the DOM are standard Tailwind (for example `text-5xl md:text-7xl lg:text-8xl`, `py-20 lg:py-32`, `rounded-full`, `tracking-wider`).

### 4.2 Colour palette

Brand: black, white and one orange. Light and dark sections alternate down every page.

| Token / hex | Tailwind name | Where it is used (observed) |
|---|---|---|
| #000000 | black | Page background (`body`), dark sections (hero, services strip, testimonials, footer, services pages), menu overlay, text on orange buttons, the round arrow discs inside orange buttons |
| #ffffff | white | Light sections (studio intro, team, portfolio, careers), text on black, careers cards |
| #ff6900 | orange-500 | The brand accent: primary buttons, current page in the menu and footer, arrow icons, quote mark, category labels, active avatar ring, input focus underline, link colour in Privacy/Terms |
| #ff8904 | orange-400 | Hover colour for orange buttons and menu items |
| #ff9800 | (literal hex) | Ring of the round “scroll down” button in the home hero |
| #f54a00 | orange-600 | In the theme stylesheet; usage not confirmed on a rendered page |
| #f9fafb | gray-50 | Pre-footer CTA band; careers page background |
| #f3f4f6 | gray-100 | Card and placeholder backgrounds on the portfolio; borders on careers cards |
| #e5e7eb | gray-200 | Image-area background on project pages; thin dividers |
| #d1d5dc | gray-300 | Light text on black; the grid hairlines at 25, 50 and 75% (opacity 30%) on light pages |
| #99a1af | gray-400 | Paragraph text on black (light 300 weight), thin borders on the portfolio, secondary labels |
| #6a7282 | gray-500 | Secondary text on white and footer links on black |
| #4a5565 | gray-600 | Body text on white (careers, policies) |
| #364153 | gray-700 | Underline of form fields and their placeholder text on the dark contact section |
| #1e2939 | gray-800 | Dividers on black (services strip columns) |
| #101828 | gray-900 | Contact form section background, footer top border, headings on careers pages |
| #111111 / #333333 / #555555 | (literals) | Browser scrollbar track / thumb / thumb hover |
| #155dfc | blue-600 | Careers pages only: the “Apply” and “Submit Application” buttons and similar. The hover state is probably blue-700 #1447e6 (present in the theme) |
| #ff6467 / #fb2c36 / #e7000b / #c10007 / #9f0712 / #82181a | red-400 to red-900 | In the theme stylesheet (probably error text and status badges); exact usage not confirmed |
| #00c950 / #00a63e / #016630 / #dbfce7 | green-500, 600, 800, 100 | In the theme stylesheet (probably success states and badges); exact usage not confirmed |
| #2b7fff / #bedbff / #dbeafe / #eff6ff / #1447e6 / #193cb8 / #1c398e | blue-500, 200, 100, 50, 700, 800, 900 | In the theme stylesheet (careers page tints); exact usage not confirmed |
| #4f39f6 / #312c85 / #9810fa / #f3e8ff / #fef9c2 / #894b00 / #fff7ed / #ffedd4 / #ca3500 / #7e2a0c | indigo, purple, yellow, orange tints | In the theme stylesheet; usage not confirmed |
| #1e40af | (manifest only) | `theme_color` in /site.webmanifest; not used anywhere in the UI and clashes with the brand |
| `mix-blend-difference` | – | Nav logo and hamburger, so they stay visible over both black and white sections |

Colour frequency measured on the rendered pages (count of elements): Home: orange #ff6900 backgrounds 13, black 11, #e5e7eb 8; text white 27, #6a7282 27, black 17. Portfolio: #f3f4f6 and #e5e7eb backgrounds 9 each; text #6a7282 20, black 15, orange 11. Contact: white 3, black 2; text white 13, #6a7282 12. Careers: white 33 and blue #155dfc 28 backgrounds; text #4a5565 86, #101828 63.

### 4.3 Typography

Font: Inter (Google Fonts, weights 100 to 900, `display=swap`) with `sans-serif` fallback. The page uses three weights in practice: light 300, regular 400, bold 700 (plus 500 for some small labels).

Signature pattern: headlines mix bold black/white words with light grey words in one line (“Designed for the Guest, Built for the Brand.” has “Designed” and “Built” in 700, the rest in 300). Section 2 of this document marks which words are bold or light for each headline.

Tailwind size scale used (rem, line-height): xs .75 (1.333), sm .875 (1.43), base 1 (1.5), lg 1.125 (1.556), xl 1.25 (1.4), 2xl 1.5 (1.333), 3xl 1.875 (1.2), 4xl 2.25 (1.11), 5xl 3 (1), 6xl 3.75 (1), 7xl 4.5 (1), 8xl 6 (1). Tracking: tight -.025em, wide .025em, wider .05em, widest .1em. Leading: tight 1.25, relaxed 1.625.

Measured text styles at 894 px:

| Role | Size / weight / line-height | Other |
|---|---|---|
| Hero H1 | 72 px (7xl) / 700 and 300 / 72 px | white; `text-5xl md:text-7xl lg:text-8xl` classes, so about 96 px from lg (the 1440 px value was not re-measured here) |
| Section H2 | 48 to 60 px (5xl–6xl) / 700 and 300 / 48–60 px | tracking -1.2 px (tracking-tight) on large headlines |
| Menu items | 48 px (md) / 700 / 48 px | tracking-tight; 30 px mobile, 60 px lg; active orange |
| Sub-headline | 24 px / 500 / 32 px; 20 px / 500 / 28 px | |
| Body paragraph | 16 px / 400 / 26 px (relaxed) | grey on white, #99a1af light 300 on black |
| Small body | 14 px / 400 / 22.75 px (relaxed) or 20 px | footer text, captions |
| Button text | 14 px / 700 / 20 px | uppercase, letter-spacing 0.7 px (wider) |
| Eyebrow / breadcrumb / labels | 12 to 14 px / 700 / 16–20 px | uppercase, letter-spacing 1.2–1.4 px (widest) |
| Form input | 18 px (lg) / 400 | placeholders uppercase |

### 4.4 Buttons and interactive elements

| Element | Look | Behaviour |
|---|---|---|
| Primary pill (“WHAT WE DO”, “CONTACT US”, and similar) | `inline-flex items-center gap-2 bg-orange-500 text-black font-bold px-6 md:px-9 py-3 md:py-4 rounded-full text-xs md:text-sm uppercase tracking-wider shadow-lg`. 213×64 px at 894 px. Contains a round arrow disc: 24 px (32 px md), black background, orange arrow | `transition-all duration-300`; hover: background #ff8904, moves up 2 px (`-translate-y-0.5`), shadow-xl |
| Form / action pill (“READ MORE”, “SEND MESSAGE”) | `bg-orange-500 text-black px-8 py-4 rounded-full font-bold flex items-center gap-4 uppercase tracking-wider text-sm`, arrow disc 32 px black with orange arrow. Submit is full width on mobile (`w-full md:w-auto justify-center`) | hover `bg-orange-400` (`transition-colors`); disabled: opacity 50% and a not-allowed cursor |
| Text link button (“LET'S BUILD YOUR BRAND”) | White bold uppercase text with an orange arrow | Link to /contact |
| Round “scroll” CTA (page headers) | Small circle with label and orange down-arrow | Scrolls to the next section |
| Round arrow buttons (services columns, project cards) | Orange round arrow | Whole column or card is the link |
| Testimonial avatars and arrows | 64 px avatars (96 px when active, orange ring), grey round previous/next arrows | Click to change the slide; the slide also appears to auto-advance (interval not measured) |
| Hamburger | 48×48 px, white icon with `mix-blend-difference` | Hover: icon turns orange (150 ms); opens the full-screen menu; turns into an orange “X” |
| Menu items | Large bold uppercase `<button>`s | Hover: orange-400 (`transition-colors`); current page orange-500 |
| Footer links | #6a7282 | Hover: white |
| Back to top | Round black (white on dark sections) up-arrow with vertical text “BACK TO TOP” (bottom-right, fixed) | Scrolls to the top (inferred from the label) |
| Form fields | Transparent background, 1 px bottom border in #364153, padding 16 px vertically, white 18 px text, placeholder #364153 | Focus: border turns orange-500, no outline (`transition-colors`); textarea `resize-none` |
| Careers buttons | Blue #155dfc, white text, rounded (standard Tailwind), white cards with a soft shadow | A different, more generic style than the rest of the site |
| Toasts | react-toastify default styling | Messages listed with each form in section 2 |

### 4.5 Layout and spacing

- Container: `container mx-auto`, with horizontal padding 16 px (mobile), 48 px (md) and 80 px (lg) in the nav.
- Sections are `relative min-h-screen`, `py-20 lg:py-32`, alternating `bg-black text-white`, `bg-white text-black` and `bg-gray-50`.
- Nav: absolute, transparent, `z-100`, 80 px high on mobile and 96 px on lg. Menu overlay `z-40`. A fixed side label sits at the bottom left and the “back to top” button at the bottom right.
- Decorative structure: thin vertical hairlines at 25%, 50% and 75% of the width and a grid of 192 px horizontal lines (`background-size: 100% 192px`) on light pages; wireframe circles (192 px, with half-circle shapes) drift on the `float-vertical` animation at 20% opacity behind the portfolio list.
- Images: project cards 3:4 with `object-cover`; project pages use mixed grids (see section 2.4).
- Radii: `rounded-full` for buttons, avatars and logo; `rounded-md` to `rounded-3xl` tokens (.375 to 1.5 rem) exist in the stylesheet for cards on the careers pages.

### 4.6 Animation and motion

| Name | Definition | Where |
|---|---|---|
| Three.js wireframes | Several `<canvas>` elements (white/grey dodecahedron lines) drifting and rotating | Hero and page headers |
| fadeInUp | 0.8 s ease-out, from opacity 0 and 30 px lower | Defined in the stylesheet; I did not confirm which elements use it |
| spin-slow | 20 s linear infinite rotation | Circular “SCROLL DOWN • SCROLL DOWN •” text in the hero |
| float-vertical | 8 s ease-in-out infinite, moves up 40 px and back | Decorative circles behind the portfolio list |
| pulse-fast | 0.8 s, opacity 1 to 0.5 | Defined in the stylesheet; I did not confirm which elements use it |
| spin | 1 s linear infinite | Loading spinner on cards (`border-t-orange-500`) |
| Image hover | `group-hover:scale-110`, 700 ms | Portfolio card images |
| Menu fade | 500 ms opacity | Full-screen menu overlay |
| Smooth scroll | `html { scroll-behavior: smooth }` | Anchor and “scroll” buttons |
| Section background | `transition: background-color .3s` | All sections |
| Default transitions | 150 ms with `cubic-bezier(.4,0,.2,1)` | Colour changes on hover |

Hover reveals that I did not test: the descriptions in the home services strip, the paragraph text inside portfolio cards, and what the pause badge on the home avatar does.

### 4.7 Navigation and mobile menu

- There is no horizontal desktop menu. On every screen size the nav shows only the logo (left) and a hamburger button (right, `aria-label="Toggle menu"`).
- Opening the hamburger shows a full-screen black overlay (fades in over 500 ms, scrollable, `z-40`) with: the six large page buttons (HOMEPAGE, PROJECTS, SERVICES, ABOUT US, BLOG, CONTACT US), a “USEFUL LINKS:” list (Careers, Privacy Policy, Terms & Conditions) and “CONTACT INFO” with the address and phone number. The nav logo and an orange “X” stay on top. The exact wording is in section 1.3.
- The menu items are `<button>`s that navigate with the router, not `<a>` links, so they are not crawlable and cannot be opened in a new tab.
- Mobile (390 px) uses the same menu; logo 144 px, headline sizes drop one Tailwind step, columns stack (Tailwind classes such as `text-5xl md:text-7xl` step the headlines down), the home services descriptions are always visible, and the footer stacks into one column.

### 4.8 Mood and look in one paragraph

A confident, editorial, black-and-white studio look with a single hot orange accent. Huge light-and-bold headlines, generous white space, thin hairlines, drifting wireframe geometry, big rounded orange pills with a black arrow disc, and full-bleed dark and light sections that alternate. Photography is shown only as project boards and menus inside soft grey frames. Careers pages break the pattern: plain white cards and blue buttons.

## 5. Contact and SEO details

### 5.1 Contact details (as shown on the site)

| Item | Value | Where it appears |
|---|---|---|
| Business name | IRA Hospitality (also “Ira Hospitality”, “IRA”) | Titles, footer, copyright “© Copyright 2026 - IRA. All Rights Reserved.” |
| Address | Ira Hospitality, 15 Golf Pride Homes, Yapral, Hyderabad | Footer (every page), menu overlay, home section 7 “VISIT US”. No PIN code and no state are shown (NOT FOUND) |
| Phone | +91 9966556007 | Footer, menu overlay, home section 7 |
| Email (main) | studio@irahospitality.co.in | Footer mail icon (`mailto:`), home section 7 |
| Email (policies) | info@irahospitality.co.in | Privacy Policy section 7 and Terms & Conditions section 10 only |
| Instagram | https://www.instagram.com/ira.hospitality/ | Footer icon |
| Facebook | https://www.facebook.com/profile.php?id=61972653785981 | Footer icon |
| LinkedIn, X/Twitter, YouTube, WhatsApp | NOT FOUND on the site (a LinkedIn URL appears only in the JSON-LD, see 5.2) | – |
| Opening hours | NOT FOUND | – |
| Map | Google Maps embed on /contact, 500 px high, iframe title “Ira Hospitality Location”; point 17°32'41.6"N 78°33'26.6"E (Yapral). Full embed URL is in section 2.7 | /contact |
| Registered company name, GST/CIN number | NOT FOUND | – |

### 5.2 Head tags: global (static `index.html`)

Language: `<html lang="en">`; charset UTF-8; viewport `width=device-width, initial-scale=1.0`. Meta language tag: `language: English`.

| Tag | Value |
|---|---|
| `<title>` | IRA Hospitality - Premium Hotel & Restaurant Management Services |
| meta title | IRA Hospitality - Premium Hotel & Restaurant Management Services |
| meta description | Leading hospitality management company offering premium hotel operations, restaurant management, and exceptional guest experiences. Transform your hospitality business with IRA Hospitality. |
| meta keywords | hospitality management, hotel management, restaurant management, guest services, hospitality consulting, hotel operations, food service management |
| meta author | IRA Hospitality |
| meta robots | index, follow |
| og:type | website |
| og:url | https://irahospitality.vercel.app/ |
| og:title | IRA Hospitality - Premium Hotel & Restaurant Management Services |
| og:description | Leading hospitality management company offering premium hotel operations, restaurant management, and exceptional guest experiences. |
| og:image | https://irahospitality.vercel.app/og-image.jpg |
| og:site_name | IRA Hospitality |
| twitter:card | summary_large_image |
| twitter:url, twitter:title, twitter:description, twitter:image | same values as the Open Graph tags above (image is https://irahospitality.vercel.app/og-image.jpg) |
| Favicons | `<link rel="icon" type="image/x-icon" href="/favicon.ico">`, `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`, `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`, `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`. None of these files exist (section 3.3) |
| Manifest | `<link rel="manifest" href="/site.webmanifest">` (file exists, see below) |
| Canonical | https://irahospitality.vercel.app/ |
| Preconnect / dns-prefetch | https://cdnjs.cloudflare.com and https://res.cloudinary.com (nothing on the site uses Cloudinary that I could find) |
| Stylesheets | Font Awesome 6.0.0 (cdnjs); the app CSS; Inter through the CSS `@import` |
| JSON-LD | `@type: Organization`, name “IRA Hospitality”, url https://irahospitality.vercel.app, logo https://irahospitality.vercel.app/logo.png, the same description as the meta description, address only `addressCountry: IN`, contactPoint `customer service` with url https://irahospitality.vercel.app/contact, `sameAs`: https://www.linkedin.com/company/ira-hospitality, https://www.facebook.com/irahospitality, https://www.instagram.com/irahospitality |
| Odd tag | A `<link rel="preload" href="data:application/octet-stream;base64,…">` whose payload is the base64 text of the app's `main.jsx` source (starts `import { StrictMode } from 'react'`). It looks like a build leftover |

`/site.webmanifest` (600 bytes, served correctly):

```json
{
  "name": "IRA Hospitality",
  "short_name": "IRA Hospitality",
  "description": "Premium Hotel & Restaurant Management Services",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1e40af",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "categories": ["business", "hospitality", "travel"],
  "lang": "en",
  "dir": "ltr"
}
```

### 5.3 Head tags: per page (react-helmet-async at run time)

| Page | `<title>` | Other tags |
|---|---|---|
| Home / | IRA Hospitality - Premium Hotel & Restaurant Management Services | Global tags only |
| /about | About Us - IRA Hospitality | Global tags only (description, OG and canonical stay the home values) — checked |
| /projects | Our Portfolio - IRA Hospitality | Global tags only — checked |
| /projects/{slug} | {Project} - IRA Hospitality (for example “Nest - IRA Hospitality”) | A second set is added: `description` = the project's description text, `og:url`, `twitter:url` and a second `canonical` = https://irahospitality.vercel.app/projects/{slug}. The global tags are still present, so the page has two descriptions and two canonicals — checked on /projects/nest |
| /services | Our Services - IRA Hospitality | Not checked tag by tag |
| /services/{slug} | {Service} - IRA Hospitality (for example “Consulting - IRA Hospitality”) | Second set: `description` = the service intro text; canonical https://irahospitality.vercel.app/services/{slug}; duplicates as above — checked on /services/consulting |
| /contact | Contact Us - IRA Hospitality | Not checked tag by tag |
| /blogs | Insights & Stories - IRA Hospitality Blog | Second set: description “Read our latest insights, stories, and thought leadership on hospitality management, trends, and guest experiences.”, og:title “Insights & Stories - IRA Hospitality Blog”, canonical https://irahospitality.vercel.app/blogs — checked |
| /careers | Careers - IRA Hospitality | Not checked tag by tag |
| /careers/{id} | Default home title (not set per job) | A second set is added with canonical https://irahospitality.vercel.app/careers/{id} — checked on one job |
| /privacy-policy, /terms-conditions | Default home title | Not checked tag by tag |

Every URL in these tags uses the host `irahospitality.vercel.app`, not the live domain `www.irahospitality.co.in`.

Crawl files: `/robots.txt` and `/sitemap.xml` return the HTML app shell (HTTP 200), so neither exists (NOT FOUND). Headings: each page has one H1 (title text in section 2). Structured data other than the one Organization block: NOT FOUND.

### 5.4 Forms, fields and validation

No form was submitted. Messages below come from the page code and the page's markup.

| Form | Fields (order) | Required | Validation and messages | Submit and endpoint |
|---|---|---|---|---|
| Home, section 7 | NAME * (“Your Name”), PHONE NUMBER * (“+91 9966556007”), EMAIL * (“hello@example.com”), MESSAGE * (“Tell us about your project...”) | All four | Toasts: “Name is required”, “Please enter a valid email address”, “Message is required”, “Phone number is required”, “Phone number must be 10 digits” | Button “SEND MESSAGE”; POST /contacts on the API with `source: "home_page"`. Success toast: “Message sent successfully! We'll get back to you soon.” Failure toast: “Failed to send message. Please try again.” |
| Contact page | `name` (“WHAT'S YOUR NAME”), `email` (“YOUR EMAIL”), `phone` (“YOUR MOBILE NUMBER”), `message` (“TELL US ABOUT OUR PROJECT”) | All four | Checked in this order, one toast at a time: “Name is required”, “Email is required”, “Mobile number is required”, “Message is required”. No format check in the code | Button “SEND MESSAGE”; POST /contacts with `source: "contact_page"`; same success and failure toasts |
| Career application (/careers/apply/{id}) | Full Name, Email, Phone; Education rows (Degree, Specialization, Institution; “+ Add More”); Experience rows (Role, Company, Start Date, End Date; month pickers); Skills (type and press Enter or “Add”); Resume (.pdf, .doc, .docx; text says max 5 MB) | Name, email, phone, education fields | Browser `required` attributes; messages shown by the browser, not captured. Experience and resume are optional | Buttons “Cancel” and “Submit Application”. Endpoint and success text: NOT FOUND (not submitted, not inspected) |
| Careers filters (/careers) | Select “All Job Roles”, text “Location”, select “All Job Types” | None | Option lists: NOT FOUND (not captured) | Filters the 28 cards |
| Blog search (/blogs) | Search input “Search articles...”; select “All Categories” | None | – | Calls GET /blogs with page, limit, tag and search |

API: the pages call https://ira-zkxr.onrender.com/api (a different domain, so I did not query it): POST /contacts, GET /blogs, GET /blogs/:slug; the careers list and job pages also load after a network call (that endpoint was not inspected). The page code shows these routes only; request and response shapes beyond the fields above are NOT FOUND.

## 6. Observed issues and gaps

Content and spelling
1. Founder name is spelled two ways: the body text says “Siddharth”; the photo caption and alt text say “Siddarth”.
2. Contact page placeholder reads “TELL US ABOUT OUR PROJECT” (should probably be “YOUR”).
3. Three of the five testimonials (Aman Grover, Prashant Kulkarni, Digvijay Singh) contain the standard “Lorem ipsum dolor sit amet…” text and use stock Unsplash portraits. They show real-looking names and job titles.
4. The Dessert Kart page description is identical to the Baked Daily description, and its image alt texts say “Baked Daily”, “Baked Daily - 1” to “Baked Daily - 6”.
5. The Unamas images have uneven alt text (“Unamas 3” for bottom-1, “Unamas Bottom 1” for bottom-2).
6. Two different email addresses: studio@irahospitality.co.in (footer, home) and info@irahospitality.co.in (Privacy Policy and Terms).
7. Social links disagree: the footer links to Instagram `ira.hospitality` and a Facebook profile id; the JSON-LD lists `irahospitality` handles and a LinkedIn page that the site never links to.
8. The home form placeholder shows the company's real phone number, and the sample email is `hello@example.com`.
9. Careers texts: Job 27 has a missing space (“function” + “with”); Job 26 splits one sentence into two bullets; Job 1 uses “Analyse” while others use “Analyze”; Job 28 (Photographer) asks for “Web Security and SEO best practices”, “state management of files” and a GitHub portfolio, which look copied from a developer ad; Many of Jobs 12 to 25 mix duties and qualifications in one list; some jobs show a salary band and others do not; dates are shown as M/D/YYYY. Wording such as “Salary Bandwidth” and “Ai tools” is kept as on the site.
10. The About page headline says “Meet Our Creative Team” and has an “OUR TEAM” button, but the page has no team section or founder bios; they are on the home page.

Links, routes and files
11. Two home links are broken: “Marketing & Branding” links to /services/brandi and “Operations & Management” links to /services/h. Both show “Service not found”. The real pages are /services/branding-marketing and /services/hospitality-operations.
12. The Feu project page and card use three images that do not exist (/assets/Feu/1.jpg to 3.jpg).
13. None of the favicon, apple-touch, android-chrome, og-image.jpg or logo.png files exist, although the head, the manifest and the JSON-LD reference them.
14. The server answers every unknown path with HTTP 200 and the app shell (soft 404). An unknown path shows no visible text, keeps the default title and has no “not found” message.
15. `/robots.txt` and `/sitemap.xml` do not exist.
16. Menu items and the “READ MORE” control are `<button>`s, not links, so they cannot be opened in a new tab and give crawlers nothing to follow.
17. The blog list is empty (“No blog posts found”), and the home “Popular Publications” block shows “No blog posts available”.

SEO and technical
18. All canonical, og:url, og:image and JSON-LD URLs point at `irahospitality.vercel.app`, not at the live domain.
19. Only the title changes on About, Portfolio, Services, Contact, Careers lists, Privacy and Terms; description, OG and canonical stay on the home values. Project, service, blog and job pages add a second description and canonical next to the global ones (duplicates).
20. Job pages, Privacy and Terms keep the default home title.
21. The manifest's `theme_color` (#1e40af) does not match the site's colours.
22. index.html contains a stray preload link whose payload is the base64 source of `main.jsx`.
23. The careers pages use a blue, generic UI that differs from the rest of the site.
24. Accessibility: the footer icons have no text; the contact form has no `<label>` elements (placeholders only).
25. The two forms validate differently: the home form checks the email format and a 10-digit phone number; the contact form only checks that fields are filled. Field order also differs.
26. The careers and blog data come from a separate API host (`ira-zkxr.onrender.com`); the pages show content only after that service answers.

Gaps in this source pack
27. The sandbox could not reach the site (network policy), so images were downloaded through the user's Chrome into a separate zip (`ira-hospitality-source-pack-images-final.zip`, 54 images plus a manifest). The folder `images/` in this pack holds only a pointer file (`README.txt`). Merge the two by unzipping the images zip next to this pack.
28. Eight stock photos on Unsplash are listed in section 3.2 but not downloaded (they are on another domain).
29. Screenshots: desktop is 1440 px wide, mobile 390 px wide, taken in scroll slices of each page (27 desktop files and 19 mobile files). The pages that repeat one template (the nine projects, four services, 28 job pages, the two legal pages) have a screenshot for a representative page only, plus the full text in section 2.
30. Hover, focus and click states were not tested (home services descriptions, portfolio card paragraph, pause badge, accordion animation timings, slider auto-advance interval).
31. Colour usage for the red, green, indigo, purple and some blue tokens could not be confirmed on a rendered page.
32. The Google Fonts weight list is now confirmed (100 to 900), but the weights actually used on pages are only 300, 400, 500 and 700.

## 7. Not found list

| Item | Status |
|---|---|
| Favicon files (favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png) | NOT FOUND (the server returns HTML) |
| Manifest icons (android-chrome-192x192.png, android-chrome-512x512.png) | NOT FOUND |
| Open Graph image (og-image.jpg) and JSON-LD logo (logo.png) | NOT FOUND |
| Feu project images (/assets/Feu/1.jpg, 2.jpg, 3.jpg) | NOT FOUND |
| robots.txt and sitemap.xml | NOT FOUND |
| A “not found” (404) page | NOT FOUND (unknown paths render no visible text) |
| Individual blog posts, blog post layout, pagination, blog categories list | NOT FOUND (the list is empty) |
| Team page, founder bios on /about, client logo wall, publications | NOT FOUND |
| Careers filter option lists (roles and job types) | NOT FOUND (not captured) |
| Career application: success and error messages, API endpoint for applications | NOT FOUND (form not submitted) |
| Per-page meta tags on /services, /contact, /careers, /privacy-policy, /terms-conditions | NOT FOUND (not checked tag by tag; titles are in 5.3) |
| Hover content of the home services strip and portfolio cards, pause-badge behaviour, slider interval | NOT FOUND (not tested) |
| Opening hours, PIN code, company registration or GST number, LinkedIn/YouTube/WhatsApp links | NOT FOUND |
| Privacy Policy and Terms “last updated” dates | NOT FOUND |
| Alt text or caption for the nine card thumbnails beyond the project title | NOT FOUND (alt is the project title) |
| Downloaded copies of the 8 Unsplash stock images | NOT DOWNLOADED (other domain) |
