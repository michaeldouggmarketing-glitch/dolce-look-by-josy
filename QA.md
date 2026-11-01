# Verification v3 — 2026-10-07
Build: TypeScript + Vite passed. Fullsite actual Supabase browser QA: desktop1440x1000/mobile390x844; document width equals viewport, zero JS errors. Collection9, categoryCamisas3, savedselection1 persists reload; WhatsApp selectedlookmessage correct; mobile menu opens/Escape closes; reduced-motion wardrobe panels relative.
Captures in .impeccable/review cover main routes and cinema/wardrobe/collection/editorial/contact scenes. Fresh finish reviewer matched direction fidelity and ceiling; one material keyboard focus contrast fixed, explicit focused CTA/footer captures scored resolved, disposition ship at that fix scope. Tokens and component snippets documented in DESIGN.md and design.json.
Stock integration: real Collection and product page concurrently observed9→8 and unavailableproduct, then8→9 after restoration without reload. All9pieces restoredavailable. Sale operated through SQL, not authenticated Admin UI. Anonymous attempted UPDATE affected0rows; restoredcount9. Private test-account creation blocked by automaticreview, no testaccountcreated. Ownerpasswordbootstrap/authenticatedCRUD/upload/concurrentRPC/fallback isolation remain handover checks.
Vercel production READY dpl_61hPJwqyNz624c8PiHaMwWJvmTU4. HTTP route/public bundle verification follows deployment.

## Supplied Flow video — 2026-10-07

- Build passed after integration. Source video: 2,346,196 bytes; deployed MP4: 408,488 bytes, 540 × 720, 24 fps, eight seconds, no audio; black letterbox strips removed.
- Desktop 1440 × 1000 and mobile 390 × 844: actual H.264 decoding, muted looping inline playback, pause/resume and offscreen pause passed; no horizontal overflow.
- Reduced-motion and data-saving contexts requested no MP4 and retained the original photo. Failed media retained the photo. No page errors.
- Deterministic public-feed test removed the sold look without reload and removed its video, replacing the center portrait with the next available piece. This test used a local public-feed fixture, not an authenticated Admin session.
- Separate live database transaction verified the existing owner's admin membership, sold/available stock normalization, stale-version rejection and restoration; the transaction was rolled back. Full authenticated Admin UI testing remains pending.

## Internal motion control — 2026-10-07

- Removed the visitor pause control at the owner's explicit request. Home center motion is independent of optional motion; offscreen/hidden-tab pause and accessibility/data-saving fallbacks remain.
- Extra videos disabled: desktop/mobile rendered exactly one home video; photo fallbacks and inventory removal passed with no page errors.
- Extra videos enabled in a temporary local build: supplied look-1 video played in its product details and catalogue card on intersection. No video was registered for unsupplied assets.
- Optional setting restored to false for production. There is no Admin switch, public subscription offer or billing change.

## Universe section videos — 2026-10-07

- Explicitly enabled only the two portraits in the requested “Mais que vestir” section; general optional motion remains off. White look-5 MP4 is 253,075 bytes and brown look-9 MP4 is 366,074 bytes. Both are 540 × 960 H.264, silent, faststart, preserving the supplied durations.
- Desktop and mobile verified both actual video decoders playing muted loops on intersection, pausing offscreen, no extra catalogue videos, no horizontal overflow and zero page errors. Existing photo fallback and reduced-motion/data-saving behavior reused.
- `UNIVERSE_LOOK_VIDEOS_ENABLED` is an internal section setting, currently true. Set it false along with the general flag when the owner asks to disable optional image videos; the first home portrait remains independent.


## Atelier edition — 2026-10-08

Production build passes TypeScript and Vite. Batched local desktop (1440×1000) and mobile (390×844) QA covers the homepage and institutional collection, brand, contact and product pages. No horizontal overflow or page errors. Filters (9 total / 3 shirts), favorite persistence, selection WhatsApp message, mobile menu/Escape and reduced-motion chapters pass. Three chapter photo sources remain look-1, look-7 and look-6 with isolated stacking and one visible copy per stage. A confirmation pass verifies outlined hero lettering, bounded contact section height and corrected mobile headline. Two universe videos retain muted playback and pause offscreen. UI checks use mocked public inventory; no private Admin session or owner data changed.


## Magazine shelf preview — 2026-10-08

Isolated branch preview/vitrine-revista. Production main stays at 21d2d820d656e68f17e5e0060a7740ce09d04079. Only the homepage showcase changes to a two-piece spread with CSS 3D page turn; collection and other site sections remain unchanged. All currently available pieces are paginated. Size selection uses the single actual dolce_products.size value; unknown size has a consultation fallback. No database mutation or fabricated production size. Local Playwright desktop/mobile tests exercise actual CDP touch input horizontally and vertically, keyboard arrows, next/previous limits, favorites and size inclusion in WhatsApp. Reduced motion skips 3D. Test size M exists only in the mocked QA fixture. New client photos and actual sizes have not been supplied yet.


## Preview update — filled titles and P–GG

User explicitly requested all products offer P, M, G and GG provisionally. Shared SizeChoices now appears in magazine spreads, normal collection cards and product detail. Selected size is included in each WhatsApp request. Options exist only in the preview UI; no database size or stock was mutated. Filled Italiana returns with wine highlights behind selected title words matching the supplied reference. Desktop/mobile tests pass horizontal/vertical native touch, page limits, keyboard, favorites, size requests in all three surfaces, reduced motion, no overflow and console-error checks. Production main remains untouched.

## Category magazine — 2026-10-30
TypeScript/Vite build and whitespace checks passed. Browser preview: Camisas opens native dialog without navigation and contains four live shirts; choose Um toque de verde, Verde and M and the WhatsApp link includes the real product, size, color and share URL. Forward button and horizontal pointer drag advance sheets; live inventory remains intact. Desktop has no document overflow. Mobile390 full capture verifies upright real photo, readable description/color/size/action and thumbnail strip. Only brand occurrences of Josy remain in public copy, including metadata after the final correction. Admin colors added to the existing protected editor; no authenticated session available to exercise its form submission. Database migration and actual colors update were verified by returned rows; existing RLS remains enabled and size-stock semantics unchanged. Detector: advisory palette extensions only, zero non-advisory findings.

## Hourly staff review — October 31
- TypeScript/Vite build passes. Dedicated schedule test covers 13 weekday/Saturday/Sunday/opening/closing/overdue/timezone/initial-null cases. Run `node tests/stock-schedule.test.mjs`.
- Remote migration manual_stock_review_timestamp creates separate RLS-protected review record; initial reviewed_at remains null. Public cannot update or execute confirmation; authorized Admin RPC succeeds in a rollback-only transaction. A forged year-2000 timestamp was replaced by server time, also rolled back. Unauthenticated confirmation was rejected. No test review was published.
- Advisor results: no new-table RLS issue; existing dolce_is_admin SECURITY DEFINER helper is intentional, and leaked-password protection warning predates this change. No auth protection changed. References: https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable and https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection .
- Automated external design-detector invocation blocked by approval review; use local build, schedule checks and visual review. Do not claim a detector pass for this change.

Preview UI review: desktop and 390px mobile captures pass the narrow operational extension. Browser verified initial waiting state, 15 available products, no horizontal overflow, transparent/dark Dolce in header and footer, explanatory disclosure, sticky strip top=0 after scrolling. Independent finish reviewer: ship, no material fixes. Authenticated Admin browser flow remains unverified; authorized RPC and server timestamp enforcement were tested in rollback-only transactions. Documentation assessment found no material inaccuracies.

## November 1 simple product and reversible browse mode
Reference reviewed: https://www.carollaferraro.com.br/camisa-maisa-over-off-0082750048 (gallery left, title/options/action right), adapted with short real description and WhatsApp rather than unsupported checkout/shipping claims. Build and whitespace checks pass. Browser preview tested actual remaining shirts (2 observed; stock not hardcoded), select M on Elegância natural, open /look/8?tamanho=M, choose Marrom: WhatsApp href includes correct product/size/color. Actual team review timestamp rendered both at top and beside the purchase action. Desktop and390mobile captures verify photo/info alignment. Current products have no extra photos; no dummy views seeded. Multi-image UI/code supports real Admin uploads but authenticated upload UI was not exercised.

Remote settings switched to magazine for a live preview test: old category magazine and native browsing dialog opened. Restored shop afterward. Anonymous cannot update settings and RLS is enabled. Exact source backup branch backup/revista-antes-ficha-simples-2026-11-01 points to3031694. Admin mode buttons persist one field, no deployment needed; public refresh at most10s plus visibility/BroadcastChannel. Inventory and review code/records preserved. Existing design detector was not rerun after earlier auto-review rejection of its external request; local build/source/visual checks used.
