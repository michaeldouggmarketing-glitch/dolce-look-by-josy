# Product
<!-- impeccable:product-schema 1 -->
## Platform
web
## Stack
React + TypeScript. User chose React and asked for advanced visual motion while remaining lightweight. Vite build, GSAP ScrollTrigger orchestration.
## Users
Visitors browsing Dolce Look by Josy and selecting looks to discuss with Josy via WhatsApp.
## Product Purpose
Editorial fashion storefront, reconstructed from the September 30 original brief.
## Capabilities and Constraints
Nine real looks; filters, details, persistent favorites, WhatsApp selection. User-owned GitHub and Arlene Vercel. No ProductOS dependency. Prices and stock must not be invented.
## Brand Commitments
Dolce Look by Josy. Ivory, black, red from existing logo. “Cuidando do seu look com bom gosto e estilo”. Large photography, horizontal lookbook, cinematic scroll. WhatsApp 5535998290565.
## Evidence on Hand
Original uploaded nine photos, brand image, Instagram screenshot and motion specification recovered. Original code inaccessible. Original Higgsfield five-second red-shirt video not yet recovered. Exact visual equivalence cannot be verified from current evidence.

## October 7 upgrade
Owner wants a protected Admin and one exclusive unit per product. Sold pieces must leave all open storefronts within seconds, with restore, image upload and change history. Supabase dedicated project creation blocked by two-active-free-project limit; no other apps may be changed. Higgsfield Seedance generation blocked by Plus-plan requirement, no video generated. Unconfigured public catalogue is editorial and makes no live stock assertion. Admin controls stay disabled until secure backend activation.

## October 7 full-site replacement
User rejected landing-page-only storefront and confirmed: cinematic home, Collection, individual look pages, Brand, Contact, Favorites and protected Admin; browsing and contact via WhatsApp, no checkout requested. Reference motion PDF requires scroll-pinned multicamera composition, coordinated scale/rotation/masks/text/background, overlapping continuity, ambient movement, light sweep controls, mobile equivalent and reduced-motion alternative. Real brand photos only; do not fabricate institutional history, address, reviews, metrics or delivery policies.

## October 30 approved storefront direction (current)
The user selected https://www.carollaferraro.com.br as the literal storefront design reference, replacing the earlier cinematic/editorial visual direction while retaining the original Dolce Look logo and red hearts plus real products and photography. White e-commerce composition, small DM Sans navigation and uppercase product names, Italiana brand/category typography, and four desktop / two mobile product columns are current. The earlier nine-look scope and cinematic brand instructions above are historical.

The working catalogue currently contains 15 real products, but the UI must render dynamic inventory rather than assume that count. `useInventory` queries available `dolce_products`, filters out products without available sizes, and refreshes through revision events, two-second polling, visibility and local stock broadcasts. Missing prices show “Consulte o valor”. No fabricated stock, prices, product photos, delivery/return/payment policies, institutional claims or social proof.

Home includes categories, campaign, all returned Novidades, two promotion panels, Instagram links using real catalogue photos, WhatsApp updates CTA, FAQ and footer. Preserve existing collection/detail/brand/contact/favorites routes, protected Admin, stock behavior and sharing. WhatsApp remains the buying/availability conversation; no checkout or newsletter backend is implied.
