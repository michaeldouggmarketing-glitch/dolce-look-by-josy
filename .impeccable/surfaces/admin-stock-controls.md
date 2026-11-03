# Admin stock controls

Mode: Operate.

## Authority and scope
The user reported that the sold action looked like status text and requested obvious buttons plus category filtering to find pieces such as Vestidos, Calças and Shorts quickly. This is a local operational extension of the protected Admin. `DESIGN.md` remains the visual authority for the storefront and optional publications; no global visual system or sidecar is replaced. Other Admin controls retain their incumbent styling.

## Retrieval and composition
`src/AdminCollection.tsx` renders the collection using the existing rows and callbacks. Four status buttons—Na vitrine, Vendidos, Rascunhos and Todas—show counts from the supplied rows and expose their selected state through `aria-pressed`. Counts describe the status groups before category, size or search filtering. Todas also permits hidden pieces to be found.

Below the status group, labeled search, type and size fields combine rather than replace one another. Type uses the shared six-category source: Camisas, Blusas, Conjuntos, Vestidos, Calças and Shorts. `src/admin-filter.ts` normalizes accents and case for name/category/reference search. Size filtering follows recorded size availability; within Vendidos it matches unavailable sizes. The result count is a polite live status. Limpar filtros clears search, category and size while retaining the selected status. An empty selection explains how to find another piece.

At desktop, the three fields share one row. At 760px and below, search spans the row, type and size sit below it, and status buttons form two columns. Each piece retains authentic photography, name, category, reference and a separate status label. Mobile places stock controls and actions across the full card width; action buttons stack to preserve their complete labels.

## Action hierarchy and states
Published pieces expose a separate availability label and an explicit action for each size. Available sizes use filled dark olive “Marcar P como vendido” style buttons; unavailable sizes use outlined “Restaurar tamanho P” buttons. Size actions are at least 48px high, with visible borders, hover and pressed feedback and a clear focus outline. Their explicit verb and filled/outlined treatment distinguish actions from status text.

Editar peça is a filled dark action. The broader “Marcar todos como vendidos” action is secondary and outlined, separate from the per-size controls; “Restaurar todos os tamanhos” retains a filled olive action. These labels reflect existing callback behavior rather than a new stock service. Busy state disables mutation/edit controls. Draft and hidden pieces have no direct stock mutation buttons: “Conferir e publicar” opens the existing editor so staff can check actual details and sizes before publishing.

## Product truth and verification limits
Authentication, existing RPCs, server inventory and mutation callbacks remain the authority. This extension adds no database writes or invented stock, size, price or photo data. A sold action still uses the existing stock workflow and synchronization.

The production build and nine filter checks passed. Isolated browser QA exercised the exact component with nonpersistent fixtures and callbacks. Combined Calças + P filters returned one fixture; changing its P size to unavailable through the mock action removed it from that result, and reset worked. Rascunhos showed one fixture with zero size actions. A mobile mock click changed the size action to “Restaurar tamanho P”. No real stock mutation or authenticated end-to-end result is established by these checks.

Final captures `admin-controls-desktop-final.jpg`, `admin-controls-mobile-final.jpg` and `admin-controls-mobile-actions-final.jpg` were inspected. The actual 390px iframe reported html clientWidth/scrollWidth of 383/383. A fresh finish reviewer returned SHIP with no material fixes.
