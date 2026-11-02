# Refined magazine

Mode: Experience, with operational product choices.

## Authority and scope
Latest user direction rejects the prior complete magazine as “muito embaralhada” and asks for the stronger revised version while keeping the site available in Admin. This supersedes its prior ship review. The existing white shop and both older magazine modes remain intact; refined styling is conditional on `refined=true` and scoped to `.fm-refined`.

## Concept and strategy
A quiet fashion spread with immediate category access. Cover pairs a full upright real photo with a short brand line, browse action and category links. Persistent Todos/category tabs replace separate index/category-opening leaves. Selecting a category opens its first currently available product; subsequent turns stay in that selection. Todos exposes the full dynamic catalogue. A product spread holds the entire photo, concise real description, actual price/fallback, grouped colors/sizes, favorite and WhatsApp action. Avoid broad empty vertical gaps and visual detours between products.

Buscar retains search and links to A marca, Dúvidas and Atendimento. Ajuda is direct. Service information remains reachable without joining the product reading sequence. No autoplay; manual leaf, arrows, keyboard and horizontal gestures inherit from FullMagazine. Reduced motion inherits immediate page changes. Favorites and valid size/color choices remain shared; refined reading position is separate. Sold/removed current products fall back to cover.

## Implementation evidence
`src/FullMagazine.tsx` conditional refined branch; `src/magazine-refined.css`; `src/BrowseMode.tsx` fourth value `magazine-refined`; preview `?formato=editorial`. Parent reports preview source a3fbf8fb86e1b7e6024da18a9f532c01675f1387, successful build, applied four-value database constraint and no activation of new mode. No source or connector mutation was performed by the documenter.

## Verification limits
Source scan establishes intended structure and tokens, not rendered usability. Desktop/mobile category switching, full-photo framing, sheet overflow, sticky controls, gesture/keyboard behavior, dialog focus, reduced motion, persistence and live removal need current browser evidence. Fresh finish review is pending. Prior publication screenshots/approval do not verify this edition. Detector was previously blocked by automatic approval review; it was not retried and no detector pass is claimed.
