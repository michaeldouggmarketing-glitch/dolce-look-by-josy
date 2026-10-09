import {brandTypography} from './BrandTypography';
import {useEffect,useRef} from 'react';
import LookMedia from './LookMedia';
import type {Look} from './inventory';
import './editorial-carousel.css';

export default function EditorialCarousel({looks}:{looks:Look[]}) {
 const rail=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=rail.current;if(!el)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false,holding=false,idle=0,last=0,frame=0,position=el.scrollLeft;
  let drag:{id:number;x:number;y:number;scroll:number;active:boolean}|null=null;
  let suppressClick=false;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;},{threshold:.15});observer.observe(el);
  const defer=()=>{idle=performance.now()+1800;};
  const down=(e:PointerEvent)=>{holding=true;defer();if(e.pointerType!=='mouse')return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,scroll:el.scrollLeft,active:false};suppressClick=false;};
  const move=(e:PointerEvent)=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
   if(!drag.active&&Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx)){holding=false;drag=null;return;}
   if(!drag.active&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.3){drag.active=true;suppressClick=true;el.setPointerCapture(e.pointerId);el.classList.add('is-dragging');}
   if(drag.active){e.preventDefault();el.scrollLeft=drag.scroll-dx;}
  };
  const up=()=>{if(!holding&&!drag)return;holding=false;drag=null;el.classList.remove('is-dragging');defer();};
  const click=(e:MouseEvent)=>{if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false;}};
  const key=(e:KeyboardEvent)=>{if(e.target!==el)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();el.scrollLeft+=(e.key==='ArrowRight'?1:-1)*el.clientWidth*.65;defer();}};
  const tick=(now:number)=>{const dt=Math.min(now-last,48);last=now;
   if(visible&&!document.hidden&&!reduced.matches&&!holding&&now>idle){const first=el.querySelector<HTMLElement>('[data-copy="0"]'),repeat=el.querySelector<HTMLElement>('[data-copy="1"]');const loopWidth=first&&repeat?repeat.offsetLeft-first.offsetLeft:0;if(loopWidth>1){position+=dt*.032;if(position>=loopWidth)position-=loopWidth;el.scrollLeft=position;}}
   else position=el.scrollLeft;
   frame=requestAnimationFrame(tick);
  };frame=requestAnimationFrame(tick);
  el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);window.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('lostpointercapture',up);el.addEventListener('click',click,true);el.addEventListener('wheel',defer,{passive:true});el.addEventListener('touchmove',defer,{passive:true});el.addEventListener('keydown',key);
  return()=>{observer.disconnect();cancelAnimationFrame(frame);el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.removeEventListener('lostpointercapture',up);el.removeEventListener('click',click,true);el.removeEventListener('wheel',defer);el.removeEventListener('touchmove',defer);el.removeEventListener('keydown',key);};
 },[looks.map(l=>l.id).join(',')]);
 return <><div className="editorial-controls"><span>Arraste para explorar</span></div><div ref={rail} className="editorial-track editorial-interactive" tabIndex={0} role="region" aria-label="Looks Dolce Look — use as setas ou arraste para explorar">{[0,1].flatMap(copy=>looks.map((look,i)=><a data-copy={copy} aria-hidden={copy===1?true:undefined} tabIndex={copy===1?-1:undefined} className={'editorial-frame frame-'+i%2} key={`${copy}:${look.id}`} href={`/look/${look.id}`} draggable={false}><LookMedia look={look}/><span>{brandTypography(look.name)}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a>))}</div></>;
}
