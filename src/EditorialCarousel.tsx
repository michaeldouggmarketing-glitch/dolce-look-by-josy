import {useEffect,useRef,useState} from 'react';
import LookMedia from './LookMedia';
import type {Look} from './inventory';
import './editorial-carousel.css';

export default function EditorialCarousel({looks}:{looks:Look[]}) {
 const rail=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{
  const el=rail.current;if(!el)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false,holding=false,focused=false,hover=false,idle=0,last=0,frame=0,direction=1,position=el.scrollLeft;
  let drag:{id:number;x:number;y:number;scroll:number;active:boolean}|null=null;
  let suppressClick=false;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;},{threshold:.15});observer.observe(el);
  const defer=()=>{idle=performance.now()+4500;};
  const down=(e:PointerEvent)=>{holding=true;defer();drag={id:e.pointerId,x:e.clientX,y:e.clientY,scroll:el.scrollLeft,active:false};suppressClick=false;};
  const move=(e:PointerEvent)=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
   if(!drag.active&&Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx)){drag=null;return;}
   if(!drag.active&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.3){drag.active=true;suppressClick=true;el.setPointerCapture(e.pointerId);el.classList.add('is-dragging');}
   if(drag.active){e.preventDefault();el.scrollLeft=drag.scroll-dx;}
  };
  const up=()=>{holding=false;drag=null;el.classList.remove('is-dragging');defer();};
  const click=(e:MouseEvent)=>{if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false;}};
  const enter=()=>{hover=true;};const leave=()=>{hover=false;};
  const focus=()=>{focused=true;};const blur=()=>{focused=false;defer();};
  const key=(e:KeyboardEvent)=>{if(e.target!==el)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();el.scrollLeft+=(e.key==='ArrowRight'?1:-1)*el.clientWidth*.65;defer();}};
  const tick=(now:number)=>{const dt=Math.min(now-last,48);last=now;
   if(visible&&!document.hidden&&!reduced.matches&&!paused&&!holding&&!focused&&!hover&&now>idle){const max=el.scrollWidth-el.clientWidth;if(max>1){if(el.scrollLeft>=max-1)direction=-1;if(el.scrollLeft<=1)direction=1;position+=direction*dt*.018;el.scrollLeft=position;}}
   else position=el.scrollLeft;
   frame=requestAnimationFrame(tick);
  };frame=requestAnimationFrame(tick);
  el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('lostpointercapture',up);el.addEventListener('click',click,true);el.addEventListener('wheel',defer,{passive:true});el.addEventListener('mouseenter',enter);el.addEventListener('mouseleave',leave);el.addEventListener('focusin',focus);el.addEventListener('focusout',blur);el.addEventListener('keydown',key);
  return()=>{observer.disconnect();cancelAnimationFrame(frame);el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.removeEventListener('lostpointercapture',up);el.removeEventListener('click',click,true);el.removeEventListener('wheel',defer);el.removeEventListener('mouseenter',enter);el.removeEventListener('mouseleave',leave);el.removeEventListener('focusin',focus);el.removeEventListener('focusout',blur);el.removeEventListener('keydown',key);};
 },[paused,looks.map(l=>l.id).join(',')]);
 return <><div className="editorial-controls"><button onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?'Retomar movimento':'Pausar movimento'}</button><span>Arraste para explorar</span></div><div ref={rail} className="editorial-track editorial-interactive" tabIndex={0} role="region" aria-label="Looks Dolce Look — use as setas ou arraste para explorar" data-lenis-prevent>{looks.map((look,i)=><a className={'editorial-frame frame-'+i%2} key={look.id} href={`/look/${look.id}`} draggable={false}><LookMedia look={look}/><span>{look.name}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a>)}</div></>;
}
