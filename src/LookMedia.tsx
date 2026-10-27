import {useEffect, useState} from 'react';
import type {Look} from './inventory';

export default function LookMedia({look, priority=false}: {look?: Look; priority?: boolean; alwaysAnimate?: boolean}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [look?.img]);
  if (!look) return <span className="media-placeholder" aria-hidden="true"/>;
  if (!look.img || failed) return <span className="media-placeholder media-unavailable" role="img" aria-label={`Foto indisponível: ${look.name}`}>Foto indisponível</span>;
  return <span className="look-media"><img src={look.img} alt={look.desc || look.name} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} onError={() => setFailed(true)}/></span>;
}
