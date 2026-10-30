---
name: Dolce Look by Josy
description: White fashion storefront following the approved Carolla Ferraro reference.
colors:
  paper: "#fff"
  ink: "#242424"
  muted: "#626262"
  line: "#e8e5e1"
  soft: "#f5f1eb"
  campaign: "#e4d8c9"
  updates: "#f4e7d5"
  updates-action: "#8b6038"
typography:
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
  size-option:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    height: "32px"
---

# Design System: Dolce Look by Josy

## Overview

The current approved world is the white Carolla Ferraro e-commerce reference (https://www.carollaferraro.com.br), adapted with the original Dolce Look identity and real catalogue photography. It replaces the earlier cinematic/editorial direction. Keep Dolce Look's logo and red hearts; do not import the competitor's identity or product content.

The storefront is spacious, restrained and product-led: small navigation, generous image area, compact uppercase product information and a repeated catalogue rhythm. This document governs the public storefront; protected Admin remains operational in character.

## Colors

White paper and dark neutral ink dominate. Muted grey supports secondary information; light neutral rules divide controls. Warm campaign and updates panels supply the observed supporting tones. Existing red hearts belong to the original brand identity; they do not make the page a red theme. The legacy CSS variable `--wine` resolves to `#242424` inside `.site-shop` and is not a burgundy accent in this world.

## Typography

DM Sans carries navigation, body copy, headings and uppercase product titles. Italiana carries the brand wordmark and italic category names over photography. Header brand is 38px on desktop and 28px at mobile; category names become 34px at mobile. Navigation is 10px desktop. Product titles are 12px/1.5 desktop and 10px/1.55 mobile; prices are 13px desktop and 11px mobile. Keep names complete and wrapped rather than truncated.

## Layout

Home container: max-width 1600px, centered, desktop padding 24px. Product grid has four desktop columns with 36px row / 20px column gaps, changing to two columns at 760px with 26px / 12px gaps. Mobile home padding is 12px. Header compacts at 1150px; desktop navigation becomes a menu at 900px. Category cards expose about 3.55 desktop, 2.55 intermediate and 1.65 mobile cards to suggest horizontal continuation.

Product photo aspect ratio is 3 / 4.2. `useAlignedCards` measures the tallest real title, price and size-choice group within each grid using ResizeObserver and after fonts load. Its `--card-title-height`, `--card-price-height` and `--card-sizes-height` properties reserve consistent rows, keeping size selectors and product actions aligned without cutting names.

## Elevation & Depth

Catalogue cards are flat and borderless. Images and restrained warm panel backgrounds provide hierarchy. Category text uses the observed shadow over photography for legibility. Focus uses a 2px ink outline with 4px offset.

## Shapes

Photography and panel geometry stay rectangular. Size selectors are square with thin neutral borders; product actions are compact pills (22px radius desktop, 20px mobile). Favorite controls are circular overlays.

## Components

Navigation uses small DM Sans links and outline icons, with search, favorites and the existing responsive menu behavior. Product cards expose real image, complete uppercase name, BRL price or “Consulte o valor”, available sizes, favorite state and “Ver peça”. Selected sizes use ink fill and white type.

Category rail uses `useEditorialRail(4, .024)` with native horizontal scrolling, duplicated visual cards excluded from keyboard and screen-reader traversal, previous/next controls and explicit pause. Pointer interaction pauses autoplay for four seconds; keyboard focus, reduced motion, hidden documents and viewport observation also guard animation. Reduced motion disables transitions and smooth scrolling. Image hover zoom is subtle (1.025 product / 1.035 category).

Home composition is recorded in `.impeccable/surfaces/storefront.md`; it is page strategy rather than a reusable token. Existing collection, detail, brand, contact, favorites, inventory/admin and sharing functions remain part of product truth.

## Do's and Don'ts

- Do follow the selected competitor's visual structure using Dolce Look branding and authentic products/photos.
- Do preserve the white background, small navigation and four-to-two-column grid.
- Do align cards through measured content heights and show missing prices honestly.
- Don't revive the superseded dark cinematic/editorial world on this storefront.
- Don't invent stock, prices, delivery, returns, payment promises, reviews or company facts.
- Don't treat the observed catalogue count as a fixed product limit.

## Product magazine extension
The magazine extends the white storefront; it does not replace the home direction. Neutral paper #f8f6f1, ink #282823 and supporting text #625e55 suggest a printed fashion edition. Italiana 32–48px names accompany upright authentic photography. Desktop uses equal photo/info columns; mobile stacks them. A bounded .76s 3D leaf rotation with a shaded reverse is the focal interaction; live drag previews the neighboring sheet. Reduced motion switches sheets immediately. Controls remain usable by keyboard, with native dialog focus containment and Escape dismissal. Color chips are labeled real product data, not site palette choices.
