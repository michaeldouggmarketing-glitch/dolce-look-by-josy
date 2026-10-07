# Dolce Look by Josy
Full institutional fashion site with real one-piece inventory: Início, Coleção, individual look, A marca, Atendimento, Favorites and Admin. React19 + TypeScript + Vite, GSAP ScrollTrigger + Lenis, self-hosted Italiana/DM Sans, real user-supplied WebP photography. No ProductOS dependency.

## Run
`npm ci`, `npm run dev`, `npm run build`. Fill the two PUBLIC variables from `.env.example` using dedicated Supabase project credentials. Never include server credentials in browser code.

## Production
https://dolce-look-by-josy.vercel.app/
https://dolce-look-by-josy.vercel.app/admin
Authorized Vercel project Arlene / dolce-look-by-josy, deployment dpl_61hPJwqyNz624c8PiHaMwWJvmTU4. Public variables configured on Vercel. Supabase project bfzfkrpcozeuzcmwbsxc in connected Josy organization, Free tier.

## Inventory
See backend/ACTIVATION.md. Nine original photographed pieces published after owner confirmation. One available unit per piece, sale removes from every public stock-driven photo/card/favorite. Protected owner membership, audit history, optimistic version check, Realtime plus five-second polling. Admin includes product create/edit, image upload, sale and restoration. First owner must define password via private one-use setup link. No setup token or private password belongs in source.

## Motion
Three-layer pinned home, pinned wardrobe changes with masks, word lighting, parallax, horizontal editorial on desktop/native swipe on mobile, closing panel reveal. Native touch scrolling, short scrub, reduced-motion normal-flow fallback. Ambient animation pauses out of view or hidden tab. Pages have native URL paths and Vercel rewrites.

## Assets and remaining handover
Original 9 fashion photos and logo. Prices/sizes not invented. WhatsApp5535998290565, IGdolce_lookk. Favorites local.
Higgsfield movie generation is blocked by Plus plan requirement; no generated video is included. GitHub source repository: https://github.com/michaeldouggmarketing-glitch/dolce-look-by-josy. Existing Vercel project is preserved during Git integration. Authenticated Admin workflow must be completed with owner before client handover.

## Opening video

The supplied eight-second red-look video is served as a 540 × 720 H.264 MP4, 408,488 bytes, without audio or the source black bars. Only the central opening portrait loads it, on intersection. Playback stops offscreen, in hidden tabs. Reduced motion, data saving, blocked autoplay and media errors retain the original photograph. The existing inventory feed controls which piece appears; media is matched to its original product ID and image. Other supplied photographs remain still pending approved videos.

## Owner-controlled optional motion

`src/motion-settings.ts` contains `EXTRA_LOOK_VIDEOS_ENABLED`, currently false. This controls all optional look videos across photo sections, catalogue cards, editorial images and product detail pages. The center home portrait uses `alwaysAnimate` independently of the optional setting and has no pause button. There is no switch in the Admin or public site and no subscription price or upsell copy in the product. To activate on the owner's chat request, register approved optimized video assets, change the flag to true and publish. To deactivate, set it to false and publish. A still photograph remains wherever a reviewed video has not yet been supplied. Reduced motion and data-saving remain supported.
