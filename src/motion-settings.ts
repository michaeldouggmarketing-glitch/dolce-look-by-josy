// Owner-managed configuration. There is no Admin or visitor control.
// Change this flag on the owner's request and publish the change.
export const EXTRA_LOOK_VIDEOS_ENABLED = false;

// Register only reviewed, optimized videos actually present in public/media.
const videos: Record<number, {image: string; video: string}> = {
  1: {image: '/media/look-1.webp', video: '/media/look-1-motion.mp4'},
};

export function motionFor(look?: {id: number; img: string}, alwaysAnimate=false) {
  if (!look || (!alwaysAnimate && !EXTRA_LOOK_VIDEOS_ENABLED)) return undefined;
  const asset = videos[look.id];
  return asset?.image === look.img ? asset.video : undefined;
}
