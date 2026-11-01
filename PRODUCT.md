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

## October 30 magazine browsing update
Category and product clicks open a native-dialog magazine without reloading the home. Direct collection URLs also render the magazine, preserving search, category filtering and direct product/share routes. One product occupies each photographic sheet: desktop photo and information side by side, mobile photo above information. Manual swipe, arrow keys, photo-edge controls, next/previous and thumbnails browse real available stock; no timed page turn interrupts reading. Existing category autoplay keeps its four-second interaction cooldown.

Colors are actual store-managed `dolce_products.colors` text arrays, added by remote migration `product_color_choices`, bounded at 16. Existing photographed colors were recorded from the real descriptions; no additional variants or per-color stock were invented. Admin uses comma-separated names. The chosen color and valid size accompany WhatsApp. Stock remains size-based; the team confirms color availability. Customer-facing service copy names the team, retaining Josy only in brand identity. Logo uses a dedicated static `brand-dolce` span, outside title-effect selectors.

## October 31 stock review workflow (current)
The team checks physical sales hourly during the supplied regular hours: Monday–Friday 09:00–18:00, Saturday 09:00–13:00, Sunday closed, America/Sao_Paulo. This human review is separate from existing two-second stock synchronization. Sold items leave the storefront when marked; no artificial hourly delay. Admin adds an explicit checkbox and conclusion button. A new singleton dolce_stock_review stores only the actual reviewed_at; it begins null. Only authorized staff may update it, with a trigger forcing server time and a SECURITY INVOKER RPC. Public RPC supplies server time plus the last actual review.

The sticky public strip shows the true last review, next hourly expectation during normal hours, overdue status or next opening. No synthetic timestamp advances on a timer. Errors suppress verified claims. A discreet toast can appear once per browser-tab session, only following an actual recent changed review, never on initial load. Last-review language does not guarantee availability between physical sales. Logo change requested: Dolce has no burgundy background or animated red overlay; paired red hearts remain.

## November 1 simple product flow and fallback mode (current)
User rejected leaf-turn product browsing and selected the Carolla category-list → product-page model. Home remains unchanged. The default shop mode navigates to category grids and individual product pages with upright photos, short actual description, real color/size choices, actual stock-review timestamp and WhatsApp handoff. The retained magazine remains a separate optional mode. Staff can select Loja or Revista in Admin; dolce_store_settings.browse_mode is public-readable and admin-writable under existing authorization, refreshed within10seconds/visibility/BroadcastChannel. Exact previous deployment source is saved in backup/revista-antes-ficha-simples-2026-11-01 at3031694.

Product photos uses the existing img as primary plus optional photos text array (up to12 additional). Admin preserves the main-photo control and adds multi-upload/removal for real photos of the same piece. No extra product views have been fabricated: existing products currently have one primary photo. Swipe/thumbnail/arrow gallery controls show only for multiple real images. Size stock and manual review behavior are unchanged.
