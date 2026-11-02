import {useEffect,useRef} from 'react';
import type {Look} from './inventory';
import {contactLink,EditorialIcon} from './HomeEditorial';
import './payment-editorial.css';
export default function PaymentEditorial({looks,onBrowse,animate=true}:{looks:Look[];onBrowse?:()=>void;animate?:boolean}){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches||!root.current)return;const animations:Animation[]=[];const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;entry.target.querySelectorAll<HTMLElement>('[data-payment-drop]').forEach((el,i)=>{animations.push(el.animate([{transform:'translateY(-48px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:900,delay:i*110,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}))});observer.unobserve(entry.target)}},{threshold:.22});root.current.querySelectorAll('[data-payment-art]').forEach(el=>observer.observe(el));return()=>{observer.disconnect();animations.forEach(a=>a.cancel())}},[animate]);
 const campaign=looks.find(l=>l.type==='Camisas')||looks[0],visit=looks.find(l=>l.type==='Vestidos')||looks[1]||looks[0];
 return <section className="payment-editorial" ref={root} aria-label="Pagamento e loja Dolce Look">
  <div className="payment-banner" data-payment-art>{campaign&&<img src={campaign.img} alt="" loading="lazy"/>}<div className="payment-banner-shade"/><div className="payment-banner-copy"><p data-payment-drop>Parcelamento em até</p><h2 data-payment-drop>6x sem juros</h2><p data-payment-drop>Escolha suas peças e combine o pagamento com a equipe.</p><a data-payment-drop href={contactLink('Olá! Quero conhecer as condições de pagamento em até 6x sem juros da Dolce Look.')} target="_blank" rel="noreferrer">Consultar condições <EditorialIcon/></a></div></div>
  <div className="payment-visit" data-payment-art><div className="payment-visit-photo">{visit&&<img src={visit.img} alt={visit.name} loading="lazy"/>}</div><div className="payment-visit-copy"><h2 data-payment-drop>Venha nos visitar.</h2><p>Dolce Look em São Sebastião do Paraíso.</p><p>Veja as peças de perto e escolha com a ajuda da nossa equipe.</p><div className="payment-visit-links"><a href="https://www.google.com/maps/search/?api=1&query=Dolce+Look+S%C3%A3o+Sebasti%C3%A3o+do+Para%C3%ADso" target="_blank" rel="noreferrer">Como chegar <EditorialIcon/></a>{onBrowse?<button onClick={onBrowse}>Voltar à coleção <EditorialIcon/></button>:<a href="/colecao">Ver coleção <EditorialIcon/></a>}</div></div></div>
 </section>;
}
