# Payment and store editorial

Mode: Persuade.

## Authority and scope
The user supplied the Carolla payment/store reference and asked for the two arts and “6x sem juros” to fall from top to bottom. This narrow addition preserves all existing shop and magazine worlds. The installment claim is explicit user content; no additional financing conditions are asserted.

## Composition and behavior
`src/PaymentEditorial.tsx` and `src/payment-editorial.css` provide a real catalogue-photo payment banner, centered white 6x headline over olive shading, followed by an ivory visit panel with contained real product photography. Available Camisas and Vestidos are preferred, with current inventory fallbacks. These are product photographs, not evidence of a store interior. Visit copy names Dolce Look in São Sebastião do Paraíso; Como chegar opens a Maps search. Conditions go to WhatsApp; collection actions return to browsing. No exact address is invented.

Home renders the section after its editorial panels. FullMagazine renders it in the benefits chapter, accessible from the 6x control and Buscar. Desktop visit uses equal photo/copy columns; at 760px it stacks. The chapter grows to content.

Copy drops y=-48px→0 with fade over 900ms, easing cubic-bezier(.16,1,.3,1), stagger 110ms. IntersectionObserver triggers each art once at 22% visibility. Content is visible without animation initialization; reduced-motion preference bypasses the reveal. Focus-visible links/buttons use an outline. No animation is claimed runtime-verified solely from source.

## Verification and limits
Lead reports production build passed, preview 361c11d. Desktop captures: `.impeccable/review/payment-desktop.jpg` and `payment-visit-desktop.jpg`. Both mobile captures were inspected in a 390px iframe of the actual app; inner clientWidth/scrollWidth were383/383. Site-home browser check found both art modules and no horizontal overflow. Independent reviewer disposition: ship for the four captures and source. No database/Admin changes. Earlier detector request was rejected by automatic approval review; not retried and no detector pass claimed. Preview-only `public/qa-payment.html` on remote d77b0ff is a QA fixture and must not ship on main.
