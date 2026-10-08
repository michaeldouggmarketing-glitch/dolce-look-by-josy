import {useEffect,useRef,useState,type PointerEvent} from 'react';
import type {Look} from './inventory';
import './magazine.css';

function Arrow({back=false}:{back?:boolean}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={back?'M19 12H5m6-6-6 6 6 6':'M5 12h14m-6-6 6 6-6 6'}/></svg>}
function Heart(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 20 3.5 11.8A5.3 5.3 0 0 1 12 4.9a5.3 5.3 0 0 1 8.5 6.9Z"/></svg>}
export default function MagazineShelf({looks,favorites,toggle}:{looks:Look[];favorites:number[];toggle:(id:number)=>void}){
 const [page,setPage]=useState(0),[turn,setTurn]=useState<{from:number;direction:number}|null>(null),[selected,setSelected]=useState<Record<number,string>>({}),[drag,setDrag]=useState(0);
 const gesture=useRef<{x:number;y:number;axis?:'x'|'y';pointer:number}|null>(null),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined),suppress=useRef(false);
 const count=Math.ceil(looks.length/2),current=Math.min(page,Math.max(0,count-1));
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{clearTimeout(timer.current);setTurn(null);setPage(p=>Math.min(p,Math.max(0,count-1)));setSelected(s=>Object.fromEntries(Object.entries(s).filter(([id,size])=>looks.some(l=>l.id===Number(id)&&l.size?.trim()===size))));},[looks.map(l=>`${l.id}:${l.size||''}`).join('|')]);
 function go(direction:number){if(turn)return;const next=current+direction;if(next<0||next>=count)return;setDrag(0);setPage(next);if(!matchMedia('(prefers-reduced-motion: reduce)').matches){setTurn({from:current,direction});clearTimeout(timer.current);timer.current=setTimeout(()=>setTurn(null),680);}}
 function down(e:PointerEvent<HTMLDivElement>){if(turn||(e.pointerType==='mouse'&&e.button!==0)||(e.target as HTMLElement).closest('a,button,select,label,input'))return;suppress.current=false;gesture.current={x:e.clientX,y:e.clientY,pointer:e.pointerId};}
 function move(e:PointerEvent<HTMLDivElement>){const g=gesture.current;if(!g)return;const x=e.clientX-g.x,y=e.clientY-g.y;if(!g.axis&&Math.max(Math.abs(x),Math.abs(y))>12){g.axis=Math.abs(x)>Math.abs(y)*1.3?'x':'y';if(g.axis==='x')e.currentTarget.setPointerCapture(e.pointerId);}if(g.axis==='x'){suppress.current=true;setDrag(Math.max(-65,Math.min(65,x)));}}
 function up(e:PointerEvent<HTMLDivElement>){const g=gesture.current;gesture.current=null;setDrag(0);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);if(g?.axis==='x'){const delta=e.clientX-g.x;if(Math.abs(delta)>45)go(delta<0?1:-1);setTimeout(()=>{suppress.current=false},0);}}
 function spread(index:number,decorative=false){return <div className="magazine-spread">{looks.slice(index*2,index*2+2).map(l=><article className="magazine-page" key={l.id}>
 <div className="magazine-photo"><img src={l.img} alt={decorative?'':l.desc} loading="lazy" draggable="false"/>{<button className={'magazine-save '+(favorites.includes(l.id)?'is-saved':'')} aria-label={`${favorites.includes(l.id)?'Remover':'Salvar'} ${l.name}`} aria-pressed={favorites.includes(l.id)} onClick={()=>toggle(l.id)}><Heart/></button>}</div>
 <div className="magazine-piece"><h3>{decorative?l.name:<a href={`/look/${l.id}`}>{l.name}</a>}</h3><p>{l.type}</p>{<><div className="magazine-size"><span>Tamanho</span>{l.size?.trim()?<button type="button" aria-label={`Selecionar tamanho ${l.size.trim()} de ${l.name}`} aria-pressed={selected[l.id]===l.size.trim()} onClick={()=>setSelected(s=>({...s,[l.id]:l.size!.trim()}))}>{l.size.trim()}</button>:<span className="magazine-consult">Consulte a Josy</span>}</div><a className="magazine-request" href={`https://wa.me/5535998290565?text=${encodeURIComponent(`Olá, Josy! Gostei da peça ${l.name} na vitrine Dolce Look.${selected[l.id]?` Selecionei o tamanho ${selected[l.id]}.`:l.size?` Pode confirmar o tamanho ${l.size}?`:' Pode me informar o tamanho?'} Quero confirmar valor e disponibilidade.`)}`} target="_blank" rel="noreferrer">Quero essa peça <Arrow/></a></>}</div>
 <span className="magazine-folio" aria-hidden="true">{String(index*2+looks.slice(index*2,index*2+2).indexOf(l)+1).padStart(2,'0')} <span>Dolce Look</span></span>
 </article>)}{looks.slice(index*2,index*2+2).length===1&&<div className="magazine-end"><span>Dolce<br/><em>Look.</em></span>{!decorative&&<a href="/colecao">Continue seu olhar <Arrow/></a>}</div>}</div>}
 if(!looks.length)return <p className="magazine-empty">A vitrine está preparando novas escolhas.</p>;
 return <div className="magazine-shelf" role="region" aria-roledescription="revista" aria-label="Vitrine Dolce Look" onKeyDown={e=>{if((e.target as HTMLElement).matches('select,input'))return;if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}}}>
 <div className="magazine-instructions"><span>Deslize para o lado para virar a página</span><span>{looks.length} peças · {count} páginas</span></div>
 <div className="magazine-book" tabIndex={0} aria-label="Páginas da vitrine. Use as setas para navegar." onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={()=>{gesture.current=null;setDrag(0)}} onClickCapture={e=>{if(suppress.current){e.preventDefault();e.stopPropagation();suppress.current=false;}}} style={{'--page-drag':`${drag*.08}deg`} as React.CSSProperties}>
 <div className="magazine-content" inert={!!turn}>{spread(current)}</div>
 {turn&&<div className={'magazine-turn '+(turn.direction>0?'forward':'backward')} aria-hidden="true" inert><div className="magazine-front">{spread(turn.from,true)}</div><div className="magazine-back">{spread(current,true)}</div></div>}
 <div className="magazine-spine" aria-hidden="true"/>
 </div>
 <div className="magazine-navigation"><button type="button" aria-label="Página anterior da vitrine" disabled={current===0||!!turn} onClick={()=>go(-1)}><Arrow back/> Anterior</button><span role="status" aria-live="polite">Página {current+1} de {count}</span><button type="button" aria-label="Próxima página da vitrine" disabled={current===count-1||!!turn} onClick={()=>go(1)}>Próxima <Arrow/></button></div>
 </div>
}
