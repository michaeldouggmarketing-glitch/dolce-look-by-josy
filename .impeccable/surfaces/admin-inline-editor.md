# Admin inline product editor

Mode: Operate.

## Authority and scope
The user wants configuration to stay inside the piece being edited, advancing sideways through its fields before continuing vertically down the collection. The previous page-top edit form was rejected because it opened outside the visible product. This is a scoped operational Admin extension. Preserve root `DESIGN.md` and `.impeccable/design.json`, the public storefront and optional publication designs.

## Composition and navigation
`src/AdminCollection.tsx` replaces only the selected row's contents through `renderEditor`. `src/Admin.tsx` passes existing form state and save/upload callbacks into `src/AdminProductEditor.tsx`. New registration remains above the collection under Cadastrar peça. Opening an editor scrolls its own form into the nearest visible position rather than moving an existing-piece form to the page top.

The header identifies the piece through its real thumbnail/name, stage count and Fechar edição. Five labeled stages are Peça, Fotos, Cores, Tamanhos and Revisar. The footer repeats progress with Voltar and a named next-stage action. Only Revisar exposes Salvar peça. Back navigation is available through completed stage buttons. Advancing validates required name/description, primary photo, optional nonnegative price and at least one available size when publishing. Next and Save have distinct React keys; Save is an explicit button click, keeping arrival at review separate from persistence.

A short directional slide communicates movement within the piece. Horizontal gestures starting outside form controls and the sampling canvas advance or return; vertical touch scrolling remains available. Stage headings receive focus without scrolling after navigation. Reduced motion disables stage animation and smooth initial scrolling. There is no timed progression or automatic save.

## Local visual treatment
The operational form uses white surfaces, dark olive primary actions, outlined secondary actions, restrained borders and compact DM Sans text. The piece container is gently rounded; this does not change public-storefront shape rules. Primary/footer controls are at least 48px high and the close action at least 44px. Focus-visible has an outlined treatment; busy state disables controls.

Desktop fields use two columns, the color palette four columns and size options four columns. At 760px and below, fields become one column, color/size options two columns, the header stacks and custom-color entry stacks above its action. The stage strip scrolls within the editor. Primary and review photographs are contained; header/gallery thumbnails use compact crops.

## Fields and persistence
Peça retains actual name, a shared category, description and optional price. Fotos retains primary upload and up to twelve additional real photographs through existing callbacks. Cores offers eighteen named basic swatches: Preto, Branco, Off-white, Bege, Caramelo, Marrom, Cinza, Azul, Azul-marinho, Verde, Verde-oliva, Vermelho, Rosa, Vinho, Lilás, Roxo, Amarelo and Laranja. Selected states include text and `aria-pressed`, not color alone. Custom names allow 40 characters; duplicate names are compared without case, commas become spaces and the sixteen-choice limit is enforced. Selected chips remove their color explicitly.

Tamanhos retains actual size stock and draft/available/hidden publication states, preserving sold when already present. Revisar summarizes fields before explicit save. Comma-delimited color names use the incumbent array save path. Existing optimistic-version handling, authorization and shared stock mutations remain authoritative. Closing does not save product fields; photo upload buttons retain existing upload behavior.

## Optional photo color helper
`src/PhotoColorHelper.tsx` opens on request. Usar foto desta peça loads the existing primary photo; a camera/file alternative accepts JPG, PNG or WebP up to 8 MB. A canvas bounded to 1000px samples up to a 7×7-pixel patch where the user touches, excluding transparent pixels. `src/color-suggestion.ts` compares the sampled average against eighteen reference swatches in Lab space, returning the nearest name and two alternatives. This is local palette matching, not remote AI analysis or calibrated physical-color measurement.

Instructions request natural light, no filter and plain fabric away from shadows/glare. Results are explicitly approximate and require Usar [cor] confirmation. Analysis does not add a photo to the gallery or automatically add a color. Locally selected image object URLs are revoked when replaced/unmounted. Keyboard Enter or Space samples the image center; manual naming remains available. Sampling waits for image readiness; load/CORS/read failures direct staff to choose a photo from their device. No physical-color certainty percentage or 100% guarantee is claimed.

## Verification and limits
The implementation lead reports a passing production build, eighteen exact palette-reference checks plus black/white/normalization checks and nine stock-filter checks. Isolated browser QA verified inline desktop editing/custom colors and one mobile inline editor. The actual 390px iframe reported html clientWidth/scrollWidth of 383/383. Existing-image analysis worked with keyboard-center and pointer sampling, returning an approximate suggestion plus alternatives; no suggestion was added before Usar confirmation.

Final fixture QA confirmed the editor replaced the correct row, all eighteen palette options were present, and adding custom Areia dourada preserved selected Bege. Publishing without an available size was blocked. Selecting P permitted review with its heading and Save action visible while one editor remained open. Only a separate Save click closed the editor and changed the mock record, confirming the corrected distinct Next/Save keys and explicit Save action. Desktop/mobile/source finish review found no blocking issues. Final captures in `.impeccable/review/` are `wizard-desktop-final.jpg`, `wizard-mobile-final.jpg`, `wizard-colors-desktop-final.jpg`, `wizard-colors-mobile-final.jpg` and `wizard-review-final.jpg`.

An existing beige product photograph returned Marrom when sampled in a dark patch, illustrating why photo suggestions remain approximate and require manual confirmation. The file-picker run timed out and was not retried; native camera/file upload end-to-end behavior remains unverified. No real record mutation, authenticated backend end-to-end verification or physical color accuracy is established by these checks.
