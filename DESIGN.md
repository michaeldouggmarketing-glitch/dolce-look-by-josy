---
name: Dolce Look by Josy
description: Preserved white storefront with optional ivory and olive magazine editions.
colors:
  paper: "#fff"
  ink: "#242424"
  muted: "#626262"
  line: "#e8e5e1"
  soft: "#f5f1eb"
  campaign: "#e4d8c9"
  updates: "#f4e7d5"
  updates-action: "#8b6038"
  magazine-paper: "#fbfaf6"
  magazine-ink: "#292d27"
  magazine-muted: "#65685d"
  magazine-line: "#dcded4"
  magazine-olive: "#46503e"
  magazine-workspace: "#e9e6de"
  magazine-action: "#323a2d"
  magazine-action-hover: "#505c46"
  refined-paper: "#fffefb"
  refined-workspace: "#eeede8"
  refined-olive: "#374332"
  refined-photo-ground: "#e6e3da"
typography:
  refined-cover:
    fontFamily: "Italiana, serif"
    fontSize: "clamp(46px, 5.3vw, 72px)"
    fontWeight: 400
    lineHeight: 1
  magazine-cover:
    fontFamily: "Italiana, Georgia, serif"
    fontSize: "clamp(50px, 6vw, 80px)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-.035em"
  magazine-product:
    fontFamily: "Italiana, Georgia, serif"
    fontSize: "clamp(32px, 3.5vw, 48px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-.025em"
  brand:
    fontFamily: "Italiana, Georgia, serif"
    fontSize: "38px"
    lineHeight: 0.95
    letterSpacing: "-.035em"
  category:
    fontFamily: "Italiana, Georgia, serif"
    fontSize: "clamp(30px, 3.3vw, 53px)"
    fontWeight: 400
    lineHeight: 1.1
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "23px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: ".06em"
  product-title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: ".015em"
  price:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "10px"
    letterSpacing: ".02em"
rounded:
  square: "0"
  action: "22px"
spacing:
  grid-column: "20px"
  grid-row: "36px"
  mobile-column: "12px"
  mobile-row: "26px"
components:
  button-product:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.action}"
    padding: "10px 15px"
    height: "38px"
  button-magazine:
    backgroundColor: "{colors.magazine-action}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "15px 20px"
    height: "49px"
  size-option:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    height: "32px"
---

# Design System: Dolce Look by Josy

## Overview

The current approved world is the white Carolla Ferraro e-commerce reference (https://www.carollaferraro.com.br), adapted with the original Dolce Look identity and real catalogue photography. It replaces the earlier cinematic/editorial direction. Keep Dolce Look's logo and red hearts; do not import the competitor's identity or product content.

The storefront is spacious, restrained and product-led: small navigation, generous image area, compact uppercase product information and a repeated catalogue rhythm. This document governs the public storefront; protected Admin remains operational in character. The optional magazines are scoped ivory/olive variants. The latest refined edition supersedes the rejected complete-magazine composition as the active design direction for new magazine work, while preserving the shop and both older variants. The user described the complete publication as “muito embaralhada”; its earlier review approval is historical evidence.

## Colors

The refined edition overrides paper, ink and olive only under `.fm-refined`: `#fffefb`, `#292d27` and `#374332`. Workspace is `#eeede8`; contained photography rests on `#e6e3da`. Other magazine tokens inherit from `.fm-site`. These local literals are observed implementation values, not a global storefront palette replacement.

The complete magazine scopes `--fm-paper`, `--fm-ink`, `--fm-muted`, `--fm-line` and `--fm-olive` inside `.fm-site`. Its workspace is warm neutral; controls are dark olive. The original red paired hearts remain the only red accent in this variant.

White paper and dark neutral ink dominate. Muted grey supports secondary information; light neutral rules divide controls. Warm campaign and updates panels supply the observed supporting tones. Existing red hearts belong to the original brand identity; they do not make the page a red theme. The legacy CSS variable `--wine` resolves to `#242424` inside `.site-shop` and is not a burgundy accent in this world.

## Typography

DM Sans carries navigation, body copy, headings and uppercase product titles. Italiana carries the brand wordmark and italic category names over photography. Header brand is 38px on desktop and 28px at mobile; category names become 34px at mobile. Navigation is 10px desktop. Product titles are 12px/1.5 desktop and 10px/1.55 mobile; prices are 13px desktop and 11px mobile. Keep names complete and wrapped rather than truncated.

## Layout

Refined edition: reader maximum 1368px with 36px desktop side padding; cover and product spread use equal columns. Sheets use `clamp(560px, calc(100svh - 270px), 740px)` with a 560px minimum. Full authentic images use `object-fit: contain`; photo frames and text no longer alternate with contents/category interstitial sheets. Category tabs stay sticky at 48px desktop. Below 760px, toolbar sticks at 48px and tabs at 116px, reader padding is 10px, cover photo is 320px high and product photo is `clamp(280px, 43svh, 390px)`. Copy follows the image; options use two columns, then one below 370px. Desktop product copy can scroll vertically. These are source-derived rules awaiting rendered verification. Page strategy lives in `.impeccable/surfaces/refined-magazine.md`.

Complete magazine: a 1300px reader with 32px side padding contains a rectangular two-column book; desktop sheets have 660px minimum height and height `min(70vw,720px)`. Cover divides 56/44, contents 43/57, category 36/64 and product 50/50. At 760px pages stack photo above copy; at 360px controls compact further. Photos settle upright and aligned. Toolbar and bottom page navigator stay sticky; help pages grow when FAQ answers expand. Contents, all products and service chapters remain reachable independently of gestures.

Home container: max-width 1600px, centered, desktop padding 24px. Product grid has four desktop columns with 36px row / 20px column gaps, changing to two columns at 760px with 26px / 12px gaps. Mobile home padding is 12px. Header compacts at 1150px; desktop navigation becomes a menu at 900px. Category cards expose about 3.55 desktop, 2.55 intermediate and 1.65 mobile cards to suggest horizontal continuation.

Product photo aspect ratio is 3 / 4.2. `useAlignedCards` measures the tallest real title, price and size-choice group within each grid using ResizeObserver and after fonts load. Its `--card-title-height`, `--card-price-height` and `--card-sizes-height` properties reserve consistent rows, keeping size selectors and product actions aligned without cutting names.

## Elevation & Depth

The refined paper uses `0 18px 40px #33382916` desktop and `0 10px 25px #33382910` mobile. Its binding is hidden; restrained paper depth and the existing manual leaf communicate the publication.

The complete magazine uses a structural paper shadow (`0 24px 48px #282c2020`), a narrow binding gradient and a shaded reverse during manual turns. These effects belong to the publication, not shop cards. Resting photos are unrotated.

Catalogue cards are flat and borderless. Images and restrained warm panel backgrounds provide hierarchy. Category text uses the observed shadow over photography for legibility. Focus uses a 2px ink outline with 4px offset.

## Shapes

Photography and panel geometry stay rectangular. Size selectors are square with thin neutral borders; product actions are compact pills (22px radius desktop, 20px mobile). Favorite controls are circular overlays.

## Components

Refined category tabs are small DM Sans buttons with a two-pixel olive selected underline and at least 44px height. The new edition keeps rectangular olive actions (48px minimum), groups colors and sizes, and removes the duplicate page signature. Product heading is 42px desktop, 35px below 900px and 32px below 760px. The scoped leaf easing becomes `cubic-bezier(.22,.07,.12,1)`; duration remains 820ms. Do not apply this timing override to archived modes.

Complete magazine controls use rectangular dark olive actions, thin olive option borders, olive selected sizes and olive favorite states. A native dialog supplies searchable contents, saved selection and enlarged genuine photos; modal focus and Escape use native dialog behavior. Product pages show real description, price or consultation fallback, real size/color choices, save action, WhatsApp and actual review status. Selection shows saved color/size and offers a combined WhatsApp request. Choices persist across page turns and visits; validation suppresses obsolete choices at handoff.

Manual page motion lasts 820ms with `cubic-bezier(.34,.06,.18,1)`, a shaded reverse and bounded live drag preview. Horizontal pointer intent is distinguished from vertical scrolling; interactive controls do not initiate a page gesture. Arrow keys and explicit previous/next controls provide alternatives, with limits at cover and contact. Reduced motion removes the leaf and switches immediately. No page autoplay.

Navigation uses small DM Sans links and outline icons, with search, favorites and the existing responsive menu behavior. Product cards expose real image, complete uppercase name, BRL price or “Consulte o valor”, available sizes, favorite state and “Ver peça”. Selected sizes use ink fill and white type.

Category rail uses `useEditorialRail(4, .024)` with native horizontal scrolling, duplicated visual cards excluded from keyboard and screen-reader traversal, previous/next controls and explicit pause. Pointer interaction pauses autoplay for four seconds; keyboard focus, reduced motion, hidden documents and viewport observation also guard animation. Reduced motion disables transitions and smooth scrolling. Image hover zoom is subtle (1.025 product / 1.035 category).

Home composition is recorded in `.impeccable/surfaces/storefront.md`; it is page strategy rather than a reusable token. Existing collection, detail, brand, contact, favorites, inventory/admin and sharing functions remain part of product truth.

## Do's and Don'ts

- Do follow the selected competitor's visual structure using Dolce Look branding and authentic products/photos.
- Do preserve the shop white background, small navigation and four-to-two-column grid; scope ivory/olive publication styling to `.fm-site`.
- Do use authentic, upright, aligned magazine photos and reserve its red for the original paired brand hearts.
- Do align cards through measured content heights and show missing prices honestly.
- Don't revive the superseded dark cinematic/editorial world on this storefront.
- Don't invent stock, prices, delivery, returns, payment promises, reviews or company facts.
- Don't treat the observed catalogue count as a fixed product limit.

### Previous product magazine extension
The magazine extends the white storefront; it does not replace the home direction. Neutral paper #f8f6f1, ink #282823 and supporting text #625e55 suggest a printed fashion edition. Italiana 32–48px names accompany upright authentic photography. Desktop uses equal photo/info columns; mobile stacks them. A bounded .76s 3D leaf rotation with a shaded reverse is the focal interaction; live drag previews the neighboring sheet. Reduced motion switches sheets immediately. Controls remain usable by keyboard, with native dialog focus containment and Escape dismissal. Color chips are labeled real product data, not site palette choices.

### Stock information extension — October 31
A quiet sticky neutral strip precedes the header: background #f4f3ef, ink #383b32, secondary #5b6054 and muted olive icon #4d5c45. It carries factual operational information without pulsing dots or simulated live badges. Desktop uses 11/10px two-line text; mobile 10/9px. A native details disclosure explains the workflow and weekly hours. The Admin counterpart uses a plain operational panel and explicit confirmation, not a pop-up. At the user's latest direction, the public Dolce word has transparent background and dark lettering; prior burgundy-block descriptions above are superseded. Original paired hearts remain red.

### November 1 product presentation
The active shop mode uses a plain Carolla-style product fiche: left photography with thumbnail rail when present; right uppercase DM Sans21–25px title, concise description, colors, sizes, true stock review and a single dark WhatsApp CTA. Mobile stacks photos above selections. Category grids reuse the aligned four/two-column cards. The prior paper/leaf magazine is dormant by default and retained behind the Admin presentation switch. No leaf-turn animation occurs in shop mode.
