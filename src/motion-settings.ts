// Owner-managed configuration. There is no Admin or visitor control.
// Change this flag on the owner's request and publish the change.
export const EXTRA_LOOK_VIDEOS_ENABLED = false;
// This section was explicitly enabled by the owner; disable here on request.
export const UNIVERSE_LOOK_VIDEOS_ENABLED = false;

// Register only reviewed, optimized videos actually present in public/media.
const videos: Record<number, {image: string; video: string}> = {
  1: {image: '/media/look-1.webp', video: '/media/look-1-motion.mp4'},
  5: {image: '/media/look-5.webp', video: '/media/look-5-motion.mp4'},
  9: {image: '/media/look-9.webp', video: '/media/look-9-motion.mp4'},
};

export function motionFor(look?: {id: number; img: string}, alwaysAnimate=false) {
  if (!look || (!alwaysAnimate && !EXTRA_LOOK_VIDEOS_ENABLED)) return undefined;
  const asset = videos[look.id];
  return asset?.image === look.img ? asset.video : undefined;
}
