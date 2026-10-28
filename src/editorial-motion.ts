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

// Native scrolling keeps every frame on one baseline, including touch swipes.
export function useEditorialRail(count:number,interval:number){
 const rail=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false),[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [position,setPosition]=useState(0),[canMove,setCanMove]=useState(false);
 const hover=useRef(false),focused=useRef(false),inView=useRef(false),lastAction=useRef(0);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(mq.matches);mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change)},[]);
 function move(direction:number){
  const el=rail.current;if(!el)return;
  lastAction.current=Date.now();
  const max=el.scrollWidth-el.clientWidth;
  const child=el.firstElementChild as HTMLElement|null;
  const gap=parseFloat(getComputedStyle(el).columnGap)||0;
  const step=child?child.getBoundingClientRect().width+gap:el.clientWidth;
  const visible=Math.max(1,Math.floor((el.clientWidth+gap)/step));
  const current=Math.round(el.scrollLeft/step);
  const next=direction>0?(el.scrollLeft>=max-3?0:Math.min(max,(current+visible)*step)):(el.scrollLeft<=3?max:Math.max(0,(current-visible)*step));
  el.scrollTo({left:next,behavior:reduced?'instant':'smooth'});
 }
 useEffect(()=>{
  const el=rail.current;if(!el)return;
  const update=()=>{setPosition(Math.round(el.scrollLeft));setCanMove(el.scrollWidth>el.clientWidth+3)};
  const observer=new IntersectionObserver(([entry])=>{inView.current=entry.isIntersecting},{threshold:.3});observer.observe(el);
  const resize=new ResizeObserver(update);resize.observe(el);update();
  el.addEventListener('scroll',update,{passive:true});
  const timer=setInterval(()=>{
   if(!paused&&!reduced&&!document.hidden&&inView.current&&!hover.current&&!focused.current&&Date.now()-lastAction.current>=interval)move(1);
  },interval);
  return()=>{observer.disconnect();resize.disconnect();clearInterval(timer);el.removeEventListener('scroll',update)};
 },[count,paused,reduced,interval]);
 return {rail,paused,reduced,position,canMove,move,toggle:()=>setPaused(p=>!p),
  hold:{onMouseEnter:()=>{hover.current=true},onMouseLeave:()=>{hover.current=false},onFocusCapture:()=>{focused.current=true},onBlurCapture:(e:React.FocusEvent<HTMLElement>)=>{if(!e.currentTarget.contains(e.relatedTarget))focused.current=false},onPointerDown:(e:React.PointerEvent<HTMLElement>)=>{if(e.pointerType==='touch'&&!(e.target as Element).closest('.ed-play-toggle'))setPaused(true)}},
  onKeyDown:(e:React.KeyboardEvent<HTMLDivElement>)=>{if(e.target===e.currentTarget&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}};
}
