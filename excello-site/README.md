# Excello — website rebuild per 14 October 2026 master guide

A static, no-build website for Excello Developers (Mount Lavinia, Sri Lanka),
rebuilt from scratch to the specifications in
`../Excello_Website_Master_Guide_2026-10-14-compressed.pdf`.

The rebuild replaces the earlier cinematic GSAP/Lenis frame-scrubbed
single-page site. What's new:

- **DM Sans** typography with Arial/system fallbacks (no Fraunces/Archivo).
- **Light-forward palette**: `#EFF0E8` surface, `#293B32` ink,
  `#171D19` dark canvas, `#414733` olive, `#F2EBDD` cream,
  `#F5F2E9` inverse, `#7A432B` terracotta.
- **Restrained motion only**: section intros 300–450 ms with 6–10 px
  travel, revealed once via IntersectionObserver. No GSAP, no Lenis, no
  Three.js, no scroll-scrubbed frame sequences, no scroll hijack.
- **25 routes**, each a real folder with its own `index.html`
  (see the Sitemap below).
- Shared header, mobile menu and footer form injected by `js/layout.js`.
- Each page carries its own `<title>`, `<meta description>`, canonical
  URL and semantic H1.

## Run it

Any static server works:

```
cd excello-site
python3 -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080/`.

The Node server under `server/` is kept for admin, uploads and the
`/api/enquiry` endpoint; it serves the same static files via
`express.static(ROOT, { extensions: ["html"] })`, so folder-URL routing
works there too.

## Sitemap (25 active pages)

```
/
/services/
/developments/
/projects/
/team/
/process/
/insights/
/contact/

/projects/aathavan-dehiwala-apartment/
/projects/panimozhi-club-house/
/projects/sea-esta-villas-mount-lavinia/
/projects/cafe-kaapi/
/projects/bambalapitiya-residence/
/projects/rudra-wellness-retreat-kalkudah/

/insights/building-through-market-uncertainty/
/insights/small-land-house-design-sri-lanka/
/insights/construction-cost-per-square-foot-sri-lanka/
/insights/luxury-living-creating-a-high-end-look-on-a-budget/
/insights/aathavan-residential-project-launched/
/insights/design-build-vs-architect-contractor-sri-lanka/

/tools/construction-cost-calculator-sri-lanka/
/aathavan-availability/

/privacy-policy/
/cookie-policy/
/terms-and-conditions/
```

`/house4all` is deliberately NOT created — the guide marks it as
pending branding and product approval.

Route consolidations (via `.htaccess`): `/services/homes` →
`/services/#homes`, `/services/apartments` and `/services/hospitality`
→ `/developments/`, `/homev2` → `/`, `/about*` → `/team/`.

## Files

```
index.html                  Home (dark hero → light journey → cream choices →
                            light investment → dark-olive process → light projects →
                            cream insights → dark closing enquiry)
services/                   /services with Architecture, Build, Homes, Project Branding
developments/               /developments with four uses + free quick land check form
team/                       /team (About & Team)
process/                    /process (six everyday steps)
contact/                    /contact (short enquiry form)
projects/                   Index + 6 detail pages
insights/                   Index + 6 articles
tools/construction-cost-calculator-sri-lanka/   Calculator with versioned assumptions
aathavan-availability/      Unit list from data/units.json with filters + freshness
privacy-policy/, cookie-policy/, terms-and-conditions/   Holding drafts

css/style.css               All styles; tokens at the top
js/layout.js                Shared header, mobile menu, footer form
js/main.js                  Minimal IntersectionObserver reveal
data/*.json                 Projects, units, finishes, insights, services, rooms
sitemap.xml, robots.txt     Discovery
.htaccess, _headers         Cache + redirects for Apache / static hosts
server/                     Node/Express for admin + /api/enquiry (unchanged)
admin/                      Admin UI (unchanged)
```

## Content status (as of this rebuild)

* **Approved and used**: Aathavan unit register (`data/units.json`),
  project names and locations, calculator rate framework, company
  contact details.
* **Pending client content**: team portraits and bios (placeholders in
  `/team/`), project photography for Café Kaapi, Bambalapitiya and
  Rudra (currently using existing hero / band images with
  "placeholder" captions), insight article photography.
* **Legal copy**: `privacy-policy`, `cookie-policy` and
  `terms-and-conditions` are holding drafts clearly marked for owner
  and legal review before launch.

Where real content is missing, pages carry a visible notice saying so.
Nothing is invented — the guide forbids fabricated testimonials,
prices, completion claims or project geometry.

## What was removed in the rebuild

* GSAP, ScrollTrigger, SplitText, Lenis (`js/vendor/`).
* `js/theater.js`, old `js/availability.js`, old `js/calculator.js`
  (replaced inline on their new pages, which fetch from `data/`).
* Hero frame sequence (`img/hero-seq/`, 288 frames).
* Old root HTML files (`about.html`, `services.html`, etc.) — the
  folder-based routes replace them.
