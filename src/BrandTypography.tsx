import {cloneElement,isValidElement,useEffect,useState,type ReactElement,type ReactNode} from 'react';
export function brandTypography(node:ReactNode):ReactNode{
 if(typeof node==='string')return node.split(/(\blooks?\b)/gi).map((part,i)=>/^looks?$/i.test(part)?<span className="look-lettering" aria-label={part} key={i}><span aria-hidden="true">{part[0]}<svg className="look-hearts" viewBox="0 0 64 36" aria-hidden="true"><path d="M16 31C12 27 2 20 2 11C2 2 11 0 16 7C21 0 30 2 30 11C30 20 20 27 16 31Z"/><path d="M48 5C52 9 62 16 62 25C62 34 53 36 48 29C43 36 34 34 34 25C34 16 44 9 48 5Z"/></svg>{part.slice(3)}</span></span>:part);
 if(Array.isArray(node))return node.map(brandTypography);
 if(isValidElement<{children?:ReactNode}>(node)&&node.props.children!==undefined){if(typeof node.type==='string'&&['svg','option','textarea'].includes(node.type))return node;return cloneElement(node as ReactElement<{children?:ReactNode}>,{},brandTypography(node.props.children));}
 return node;
}
export function HeroTitle(){
 const[count,setCount]=useState(0);const first='Moda feminina.',second='Exclusiva.';
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){setCount(first.length+second.length);return;}const started=performance.now();const timer=setInterval(()=>{const next=Math.min(first.length+second.length,Math.floor((performance.now()-started)/20));setCount(next);if(next===first.length+second.length)clearInterval(timer)},20);return()=>clearInterval(timer)},[]);
 return <h1 aria-label={`${first} ${second}`}><span className="line" aria-hidden="true"><span>{first.slice(0,count)}<span style={{visibility:'hidden'}}>{first.slice(count)}</span></span></span><span className="line" aria-hidden="true"><span><em>{second.slice(0,Math.max(0,count-first.length))}<span style={{visibility:'hidden'}}>{second.slice(Math.max(0,count-first.length))}</span></em></span></span></h1>;
}
