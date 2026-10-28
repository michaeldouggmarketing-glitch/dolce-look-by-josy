import {useEffect, useLayoutEffect, useRef, useState, type RefObject} from 'react';

// Measure actual copy, rather than truncating names or assuming two lines.
export function useAlignedCards(root:RefObject<HTMLElement|null>,signature:string){
 useLayoutEffect(()=>{
  const groups=[...root.current?.querySelectorAll<HTMLElement>('.product-grid,.ed-product-rail')||[]];
  let frame=0,disposed=false;
  function measure(){
   for(const group of groups){
    const max=(selector:string)=>Math.ceil(Math.max(0,...[...group.querySelectorAll<HTMLElement>(selector)].map(el=>el.getBoundingClientRect().height)));
    const values={'--card-title-height':max('.product-info h3'),'--card-price-height':max('.product-price-value'),'--card-sizes-height':max('.size-choices>div')};
    for(const [key,value] of Object.entries(values))group.style.setProperty(key,`${value}px`);
   }
  }
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)};
  const observer=new ResizeObserver(schedule);
  for(const group of groups){observer.observe(group);group.querySelectorAll('.product-info h3,.product-price-value,.size-choices>div').forEach(el=>observer.observe(el))}
  measure();document.fonts.ready.then(()=>{if(!disposed)schedule()});
  return()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame)};
 },[root,signature]);
}

// Aqualax motion.js reference: continuous rAF drift, modulo wrap and native touch priority.
export function useEditorialRail(count:number,speed:number){
 const rail=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false),[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [canMove,setCanMove]=useState(false);
 const controls=useRef({focused:false,touching:false,visible:false});
 const resumeAt=useRef(0);
 const step=useRef<(direction:number)=>void>(()=>{});
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(mq.matches);mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change)},[]);
 useEffect(()=>{
  const el=rail.current;if(!el)return;
  let frame=0,last=0,carry=0,wheelFrame=0,resumeTimer=0,wheeling=false,stride=0,length=0;
  // Repeated React cards keep live inventory, favorites and size actions functional.
  // Screen readers and Tab encounter only the original set.
  const reconcileCopies=()=>[...el.children].forEach((child,index)=>{
   if(index<count){
    child.removeAttribute('aria-hidden');
    if(child instanceof HTMLAnchorElement)child.removeAttribute('tabindex');
    child.querySelectorAll<HTMLElement>('a,button,input,[tabindex]').forEach(node=>node.removeAttribute('tabindex'));
    return;
   }
   child.setAttribute('aria-hidden','true');
   if(child instanceof HTMLAnchorElement)child.tabIndex=-1;
   child.querySelectorAll<HTMLElement>('a,button,input,[tabindex]').forEach(node=>node.tabIndex=-1);
  });
  reconcileCopies();
  const mutations=new MutationObserver(reconcileCopies);mutations.observe(el,{childList:true,subtree:true});
  const allowed=()=>controls.current.visible&&!controls.current.focused&&!controls.current.touching&&!wheeling&&!paused&&!reduced&&!document.hidden&&Date.now()>=resumeAt.current&&length>0;
  const stop=()=>{cancelAnimationFrame(frame);frame=0;last=0};
  const start=()=>{if(allowed()&&!frame)frame=requestAnimationFrame(tick)};
  function cooldown(){
   resumeAt.current=Date.now()+4000;stop();window.clearTimeout(resumeTimer);
   resumeTimer=window.setTimeout(start,4000);
  }
  const remaining=resumeAt.current-Date.now();
  if(remaining>0)resumeTimer=window.setTimeout(start,remaining);
  function tick(time:number){
   frame=0;if(!allowed()){last=0;return}
   const delta=last?Math.min(time-last,50):16;last=time;carry+=delta*speed;
   const px=Math.floor(carry);carry-=px;
   if(px)el!.scrollLeft=(el!.scrollLeft+px)%length;
   frame=requestAnimationFrame(tick);
  }
  const update=()=>{
   const first=el.children[0] as HTMLElement|undefined,repeat=el.children[count] as HTMLElement|undefined;
   stride=first?first.getBoundingClientRect().width+(parseFloat(getComputedStyle(el).columnGap)||0):0;
   length=count>1&&repeat&&first?repeat.offsetLeft-first.offsetLeft:0;
   setCanMove(count>1&&el.scrollWidth>el.clientWidth+3);
   if(length&&el.scrollLeft>=length)el.scrollLeft%=length;
   start();
  };
  step.current=direction=>{
   if(!length||!stride)return;
   cooldown();el.scrollLeft=(el.scrollLeft+direction*stride+length)%length;carry=0;
  };
  const scroll=()=>{if(length&&el.scrollLeft>=length)el.scrollLeft%=length};
  const down=()=>{controls.current.touching=true;controls.current.focused=false;cooldown()};
  const release=()=>{if(!controls.current.touching)return;controls.current.touching=false;cooldown()};
  const wheel=()=>{wheeling=true;stop();cancelAnimationFrame(wheelFrame);wheelFrame=requestAnimationFrame(()=>{wheeling=false;start()})};
  const focus=(event:FocusEvent)=>{controls.current.focused=!controls.current.touching&&(event.target as Element).matches(':focus-visible');if(controls.current.focused)stop()};
  const blur=(event:FocusEvent)=>{if(!el.contains(event.relatedTarget as Node|null)){controls.current.focused=false;start()}};
  const visibility=()=>document.hidden?stop():start();
  const observer=new IntersectionObserver(([entry])=>{controls.current.visible=entry.isIntersecting;entry.isIntersecting?start():stop()},{threshold:0,rootMargin:'120px'});observer.observe(el);
  const resize=new ResizeObserver(update);resize.observe(el);update();
  el.addEventListener('scroll',scroll,{passive:true});el.addEventListener('pointerdown',down,{passive:true});
  el.addEventListener('wheel',wheel,{passive:true});el.addEventListener('focusin',focus);el.addEventListener('focusout',blur);
  window.addEventListener('pointerup',release,{passive:true});window.addEventListener('pointercancel',release,{passive:true});document.addEventListener('visibilitychange',visibility);
  return()=>{stop();window.clearTimeout(resumeTimer);cancelAnimationFrame(wheelFrame);observer.disconnect();resize.disconnect();mutations.disconnect();step.current=()=>{};el.removeEventListener('scroll',scroll);el.removeEventListener('pointerdown',down);el.removeEventListener('wheel',wheel);el.removeEventListener('focusin',focus);el.removeEventListener('focusout',blur);window.removeEventListener('pointerup',release);window.removeEventListener('pointercancel',release);document.removeEventListener('visibilitychange',visibility)};
 },[count,paused,reduced,speed]);
 return {rail,paused,reduced,canMove,move:(direction:number)=>step.current(direction),toggle:()=>setPaused(p=>!p),
  onKeyDown:(e:React.KeyboardEvent<HTMLDivElement>)=>{if(e.target===e.currentTarget&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();step.current(e.key==='ArrowRight'?1:-1)}}};
}
