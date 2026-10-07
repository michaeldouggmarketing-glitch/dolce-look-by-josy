import {useEffect, useRef, useState} from 'react';
import type {Look} from './inventory';
import {motionFor} from './motion-settings';

export default function LookMedia({look, priority=false, alwaysAnimate=false}: {look?: Look; priority?: boolean; alwaysAnimate?: boolean}) {
  const frame = useRef<HTMLSpanElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const motion = motionFor(look, alwaysAnimate);
  const hasMotion = !!motion;

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: EventTarget & {saveData?: boolean};
    }).connection;
    const update = () => setAllowed(!preference.matches && !connection?.saveData);
    update();
    preference.addEventListener('change', update);
    connection?.addEventListener('change', update);
    return () => {
      preference.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const element = frame.current;
    if (!element || !hasMotion || !allowed || failed) return;
    let inView = false;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, {threshold: 0.05});
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [hasMotion, allowed, failed]);

  useEffect(() => {
    const element = video.current;
    const shouldPlay = hasMotion && allowed && visible && !failed;
    if (!shouldPlay) {
      element?.pause();
      return;
    }
    if (!started) {
      setStarted(true);
      return;
    }
    element?.play().catch(() => setFailed(true));
  }, [hasMotion, allowed, visible, failed, started]);

  useEffect(() => {
    const element = video.current;
    return () => element?.pause();
  }, []);

  return <span className="look-media" ref={frame}>
    <img src={look?.img || '/media/logo.webp'} alt={look?.desc || 'Dolce Look by Josy'} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}/>
    {hasMotion && allowed && !failed && <video
      className={ready ? 'look-video is-ready' : 'look-video'}
      ref={video} src={started ? motion : undefined}
      poster={look?.img} preload="none" muted loop playsInline
      aria-hidden="true" tabIndex={-1}
      onPlaying={() => setReady(true)} onError={() => setFailed(true)}
    />}
  </span>;
}
