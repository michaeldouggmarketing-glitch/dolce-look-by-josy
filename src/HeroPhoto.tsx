import {useEffect, useRef, useState} from 'react';
import type {Look} from './inventory';

export default function HeroPhoto({look}: {look?: Look}) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const hasMotion = look?.id === 1 && look.img === '/media/look-1.webp';

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
    const shouldPlay = hasMotion && allowed && visible && !paused && !failed;
    if (!shouldPlay) {
      element?.pause();
      return;
    }
    if (!started) {
      setStarted(true);
      return;
    }
    element?.play().catch(() => setFailed(true));
  }, [hasMotion, allowed, visible, paused, failed, started]);

  useEffect(() => {
    const element = video.current;
    return () => element?.pause();
  }, []);

  return <div className="hero-photo" ref={frame}>
    <a className="hero-photo-link" href={look ? `/look/${look.id}` : '/colecao'}>
      <figure className="photo">
        <img src={look?.img || '/media/logo.webp'} alt={look?.desc || 'Dolce Look by Josy'} loading="eager" fetchPriority="high"/>
        {hasMotion && allowed && !failed && <video
          className={ready ? 'hero-video is-ready' : 'hero-video'}
          ref={video} src={started ? '/media/look-1-motion.mp4' : undefined}
          poster={look.img} preload="none" muted loop playsInline
          aria-hidden="true" tabIndex={-1}
          onPlaying={() => setReady(true)} onError={() => setFailed(true)}
        />}
      </figure>
    </a>
    {hasMotion && allowed && started && !failed && <button
      className="hero-video-toggle" type="button" aria-pressed={paused}
      aria-label={paused ? 'Reproduzir vídeo do look' : 'Pausar vídeo do look'}
      onClick={() => setPaused(value => !value)}>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M8 5v14l11-7Z"/> : <path d="M7 5h3v14H7zm7 0h3v14h-3z"/>}
      </svg>
    </button>}
  </div>;
}
