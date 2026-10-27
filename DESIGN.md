# Dolce Look by Josy — Minimalist storefront

Updated 27 October 2026 after Josy rejected the layered cinematic layout.

## Product and direction
Experience: browse original clothing photographs, open real product details, choose a size, save favorites and consult Josy through WhatsApp. Preserve protected Admin and real inventory.

The collection leads. Quiet warm white background (#faf9f6), near-black ink (#252321), secondary text (#615c57), hairline dividers (#dedbd5). Italiana headlines at 42–72px; DM Sans body and controls. Original wordmark retains its heart motif only in the brand.

## Layout
Home: simple two-column introduction with one available product photograph, six aligned product cards, concise consultation section and footer. Mobile uses a single-column introduction and two-column product grid. 20px mobile gutters, 6vw desktop gutters. No tilted photographs, pinned scrolling, animated backgrounds, ticker, typing effects, autoplay media or overlapping editorial layers.

## States
Never use the logo as a product photograph. Missing products render no photograph; broken URLs render a neutral labeled placeholder. Database loading, failure and empty inventory have explicit states. Product availability always comes from the backend. No invented prices, stock, address, reviews or delivery claims.

## Routes
Keep Collection, Product, Favorites, Brand, Contact and Admin. Public surfaces share quiet typography, image frames and controls. Admin styles and permissions are preserved.

## Incident
On 27 October the dedicated Supabase project was INACTIVE. Restoration requested successfully. The former media component substituted /media/logo.webp whenever inventory returned no product, causing repeated logos across all photo compositions.
