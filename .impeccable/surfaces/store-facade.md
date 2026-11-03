# Store facade and category extension

Mode: Persuade.

## Authority and scope
The user supplied Dolce Look Instagram screenshots and asked for two authentic facade photographs on the home/hero, removal of the Atendimento photograph and the crossed-out choosing steps, and Calças and Shorts categories. Preserve the established white storefront and optional ivory/olive publication variants governed by `DESIGN.md`; this surface does not introduce a new global system or sidecar.

## Composition and behavior
`src/StoreWelcome.tsx` introduces the home with aligned copy and one large facade photograph. Daytime is the initial view; “Durante o dia” and “Ao anoitecer” buttons switch the two genuine photographs manually, with pressed state and descriptive alternative text. The collection link remains the primary action. The composition uses the incumbent neutral palette. The rendered shop headline and supporting copy use DM Sans because the existing `.site-shop` heading rule overrides the local hero font declaration; publication headings retain Italiana. Desktop uses unequal copy/photo columns within the existing 1600px container; below 760px the photo appears above the copy. The short photo reveal is disabled for reduced motion; controls retain visible focus and at least 44px height. This is a local composition, not a universal hero rule.

`src/PaymentEditorial.tsx` uses the nighttime facade in the visit panel, replacing the earlier product-photo stand-in. The existing installment banner and user-authorized 6x statement remain. The visit image is contained so the authentic storefront remains legible. Copy names São Sebastião do Paraíso and the existing Maps search rather than asserting an exact street address.

`src/FullMagazine.tsx` uses the daytime facade on both publication covers and the nighttime facade on the brand page. Facade photographs are contained and upright. Atendimento is text-led without the model image in the shop and publication. The “Escolher é simples / Explore / Salve / Converse” steps are removed; practical FAQ, hours and team contact remain. Existing product navigation, favorites, real size/color choices and WhatsApp handoff remain in place.

## Categories and source integrity
`src/categories.ts` is the shared six-category source, including Calças and Shorts, with real screenshot crops for their category photography. Screenshots were cropped only; `public/media/facade-and-categories-provenance.json` records their source and output dimensions. Do not present screenshot crops as proof of current price, size or stock. The facade photos are genuine supplied store photographs, not generated architecture or a competitor store.

Five photographed category records were inserted as drafts only (three Calças, two Shorts) after extending the category constraint. Staff review and actual stock entry precede publication. No price, size availability or extra physical unit was claimed. Existing twelve available and three sold records, protected Admin authorization, all browse versions, inventory synchronization and recorded stock review were preserved.

## Verification and limits
The production build and thirteen stock checks passed. Desktop hero, contact and magazine views plus their actual 390px iframe views were inspected and read legibly; all three iframes reported html clientWidth/scrollWidth of 383/383. The day/night control changed the rendered image, while contact-photo and removed service-step counts were zero. A fresh independent finish reviewer returned SHIP with no material fixes. The screenshots bound source quality and crop resolution, so avoid enlargement that implies unavailable image detail. No exact address or additional commercial terms are established by this extension.
