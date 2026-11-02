# Refined magazine

Mode: Experience, with operational product choices.

## Authority and scope
Latest user direction rejects the prior complete magazine as “muito embaralhada” and asks for the stronger revised version while keeping the site available in Admin. This supersedes its prior ship review. The existing white shop and both older magazine modes remain intact; refined styling is conditional on `refined=true` and scoped to `.fm-refined`.

## Concept and strategy
A quiet fashion spread with immediate category access. Cover pairs a full upright real photo with a short brand line, browse action and category links. Static Todos/category tabs within one sticky toolbar replace separate index/category-opening leaves. Selecting a category opens its first currently available product; subsequent turns stay in that selection. Todos exposes the full dynamic catalogue. A product spread holds the entire photo, concise real description, actual price/fallback, grouped colors/sizes, favorite and WhatsApp action. Avoid broad empty vertical gaps and visual detours between products.

Buscar retains search and links to A marca, Dúvidas and Atendimento. Ajuda is direct. Service information remains reachable without joining the product reading sequence. No autoplay; manual leaf, arrows, keyboard and horizontal gestures inherit from FullMagazine. Reduced motion inherits immediate page changes. Favorites and valid size/color choices remain shared; refined reading position is separate. Category selection is bookmarked in `dolce-magazine-category`; initial direct product links and history reconcile a saved category with the destination. Toolbar top is 50px desktop/48px mobile; book scroll margins are 215px/190px. Size legends reset clipped geometry and remain fully visible. Sold/removed current products fall back to cover.

## Implementation evidence
`src/FullMagazine.tsx` conditional refined branch; `src/magazine-refined.css`; `src/BrowseMode.tsx` fourth value `magazine-refined`; preview `?formato=editorial`. Handoff source a7b8a4c includes documentation and latest corrections. Parent reports successful build and all-mode database constraint migration. A rollback-only switch to magazine-refined succeeded; the global setting remains on its prior value. Documenter made no UI/source or connector writes.

## Verification limits
Lead browser evidence: Camisas moved from 1 of 2 to 2 of 2 with next disabled; saved Marrom/M choices reached the selection WhatsApp message correctly. Updated layout captures received conditional fresh review, pending desktop product and cross-category runtime evidence. Desktop product has subsequently been captured and inspected positively; runtime testing remains in progress at this documentation handoff. Final approval is not claimed. Remaining coverage includes direct cross-category/bookmark reconciliation, keyboard/touch/dialog focus, reduced motion, empty categories, live removal and authenticated Admin switching. Prior publication approval does not verify this edition. Detector was previously blocked by automatic approval review; it was not retried and no detector pass is claimed.
