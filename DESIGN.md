---
name: Dolce Look by Josy
description: Cinematic fashion storefront with real exclusive pieces.
colors:
  paper: "#f3eee6"
  ink: "#251e1a"
  wine: "#842133"
  muted: "#716358"
  line: "#d1c3b5"
  soft: "#e7dbcd"
  dark: "#241b19"
  cinema-ground: "#e8ded1"
  chapter-earth: "#30251f"
  chapter-paper: "#ded0c0"
  rose-emphasis: "#e7b5ae"
  earth-emphasis: "#d6b19b"
  dark-emphasis: "#d4aa9a"
  light-hover: "#e0cfbc"
  field-white: "#fff"
typography:
  display:
    fontFamily: "Italiana, Georgia, serif"
    fontSize: "clamp(74px, 7.4vw, 112px)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-.03em"
  headline:
    fontFamily: "Italiana, Georgia, serif"
    fontSize: "clamp(46px, 5.2vw, 80px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-.03em"
  product-title:
    fontFamily: "Italiana, serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.14
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    lineHeight: 1.85
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
  admin-title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  square: "0"
  circle: "50%"
spacing:
  page: "6vw"
  editorial: "9vw"
  grid-column: "28px"
  grid-row: "65px"
  mobile-column: "16px"
  mobile-row: "35px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "18px 23px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.wine}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "18px 23px"
    height: "56px"
  button-light-hover:
    backgroundColor: "{colors.light-hover}"
  favorite:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "42px"
  favorite-saved:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.paper}"
  admin-field:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "13px"
    height: "44px"
---

# Design System: Dolce Look by Josy

## Overview

**Creative North Star: "Dolce in motion"**

Dolce in motion uses warm ivory paper, deep wine, near-black type and the original fashion photographs. Large Italiana headlines, overlapping portrait frames and authored scroll choreography make the collection feel personal and editorial. The approved full-site world replaces the earlier landing-page composition.

The public experience pairs expressive imagery with clear routes, selection and direct WhatsApp consultation. The protected Admin uses plain DM Sans, compact product rows and straightforward form states. Inventory governs every photographic surface; the confirmed nine available pieces are a point-in-time state, never a permanent visual promise.

**Key Characteristics:**
- Three offset real portraits anchor the cinematic home.
- Wine, earth and ivory chapters reveal through upward masks.
- Square photographic frames and restrained circular utilities.
- Serif public storytelling; sans-serif operational controls.

## Colors

Warm paper and near-black form the reading surfaces; wine creates distinct cinematic chapters and interactive emphasis. CSS custom properties in `src/style.css` are normative: paper, ink, wine, muted, line, soft and dark. The remaining frontmatter colors capture implemented chapter, emphasis and field values.

**The Contrast Rule.** Use rose or earth emphasis inside wine and dark chapters, and paper focus outlines on chapter 0, chapter 1, contact scene, editorial, brand diptych and footer. Elsewhere the outline is wine, 2px with 5px offset.

## Typography

Italiana with Georgia/serif fallback gives public headlines their spacious character. DM Sans/sans-serif carries body text, navigation, labels and the Admin. Hero display uses the frontmatter clamp; wardrobe headlines use `clamp(64px,6.5vw,100px)` at 1.02. Generic h1 is `clamp(64px,6.8vw,100px)` at 1.02. Body copy is 14px/1.85, generally bounded to 290–420px. Product names are 30px/1.14. Labels use 8–12px, with uppercase category labels and tabular selection/chapter counts.

**The Two Voices Rule.** Use Italiana for public editorial hierarchy and product names; use DM Sans for Admin headings, fields and controls.

## Layout

The 90px desktop header sits above a viewport cinema, minimum 700px and maximum 1050px. Headline starts at 6vw; the center portrait is 27vw wide, 75% high, rotated 3°, with smaller portraits rotated −8° and 8°. Standard collection gutters are 6vw; narrative layouts use 9vw. Product grids have three columns with 65px row and 28px column gaps, and a 75px offset on card 1.

At 1100px navigation tightens and catalogue controls stack. At 760px the header becomes 78px, navigation becomes a full-screen dialog, hero portraits remain layered beneath the headline, and grids become two columns with 35px/16px gaps and alternating 35px offsets. Brand/contact/detail layouts flow vertically. Detail content is sticky at 45px only on desktop. Mobile editorial uses native horizontal scrolling, 76vw frames and scroll snapping. The desktop editorial pin starts at 900px in JavaScript.

Home, `/colecao`, `/look/:id`, `/a-marca`, `/atendimento`, `/favoritos` and `/admin` have distinct implemented surfaces. Route and scene captures live in `.impeccable/review/`, including desktop/mobile main, hero-scroll, wardrobe, collection, editorial, contact, brand and product captures, `admin.png`, `focus-contact.png` and `focus-footer.png`. They document the v3 fidelity ceiling; extend this implemented world rather than the stale v2 design.

## Elevation & Depth

Tonal chapters, overlap, rotation and crop create most depth. Hero portraits use `0 18px 46px #241b1920`; the universe detail uses `0 18px 44px #251e1a24`; the floating WhatsApp utility uses `0 8px 25px #251e1a25`. Ambient arcs have translucent concentric rings, not card elevation. Product cards remain unboxed.

## Shapes

Actions, forms, cards and portraits have square corners. Only save and floating WhatsApp controls, plus decorative arcs, are circular. Product images use 3:4 frames; composition preserves real garment detail. Masks are rectangular insets, with the wardrobe unveiling upwards.

## Components

Primary actions use ink/paper, 18px 23px padding, 56px minimum height and wine hover fill. A diagonal light sweep travels on hover over .55s. Light actions invert paper/ink and hover to light-hover. Underlined links animate their arrow 3px diagonally. Navigation reveals a 1px wine underline over .25s. Favorites are 42px circles (36px mobile), becoming wine/paper with filled heart when saved. Product photos scale to 1.055 over .8s; desktop discovery strips reveal on hover or focus within.

Catalogue categories use a wine active underline; search and sort have bottom borders. Admin fields use white fill, a 1px line border, 13px padding and 44px minimum height; textarea minimum is 100px. Admin product rows show photo, status and explicit edit/sale/restore controls behind authorization. Owner Michael administers the real Supabase one-unit inventory; visual state reflects backend availability and never implies checkout.

Motion is authored in GSAP ScrollTrigger with Lenis wheel duration .75 and native touch. Hero scrub .3 coordinates center enlargement, peeling side portraits, headline recession, new line and progress. Wardrobe scrub .25 couples upward panel masks with image scale/rotation and incoming text. Photo parallax, word lighting, desktop editorial travel and closing panel unframing support the chapter rhythm. Ticker (42s), arcs (14s) and scroll cue (2.5s) are bounded ambient motion. IntersectionObserver starts/stops ticker/arcs offscreen, and document visibility pauses them. Reduced motion removes animation/transitions and pins, makes wardrobe panels flow vertically, and keeps word text visible.

## Do's and Don'ts

### Do:
- **Do** preserve the original photographs, recognizable garments and anatomy.
- **Do** derive every product image, detail and selection count from current available inventory.
- **Do** retain the coordinated scale, rotation, masks and text changes in pinned scenes.
- **Do** use paper focus outlines on wine and dark surfaces.
- **Do** pause ambient loops offscreen and when the document is hidden; honor reduced motion.
- **Do** keep Admin headings and controls in DM Sans.

### Don't:
- **Don't** fabricate prices, history, testimonials, addresses or delivery policies.
- **Don't** freeze the nine-piece count into static marketing copy.
- **Don't** substitute generated video for the real still photographs.
- **Don't** reduce the approved full-site world to a landing page or generic repeated fades.
- **Don't** use wine focus outlines against wine or dark chapters.


## Atelier edition — 8 October 2026

The storefront pairs filled Italiana display lettering with outlined emphasis, wine and ivory alternating with chocolate editorial stages, framed original photographs, and bounded warm spotlights. Large reading copy stays filled DM Sans. Every institutional page has authored entrances: masked title rises, lateral editorial introductions, and photographic crop reveals. Background light and selected luminous lettering pause offscreen and when the tab is hidden; reduced motion preserves legible static content. The three wardrobe scroll chapters and their synchronized upward image/color transitions are preserved exactly. All changes are public storefront scope; the operational Admin keeps its existing presentation.

Rollback: GitHub branch `backup/antes-premium-2026-10-08`, commit `72302c0a75e817946261dc7e588e76be84ab4488`.
