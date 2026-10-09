import {cloneElement,isValidElement,useEffect,useState,type ReactElement,type ReactNode} from 'react';
export function brandTypography(node:ReactNode):ReactNode{
 if(typeof node==='string')return node.split(/(\blooks?\b)/gi).map((part,i)=>/^looks?$/i.test(part)?<span className="look-lettering" aria-label={part} key={i}><span aria-hidden="true">{part[0]}<svg className="look-hearts" viewBox="0 0 64 36" aria-hidden="true"><path d="M32 18C24 7 20 2 13 2C1 2 0 17 8 25C20 37 26 28 32 18C38 8 44-1 56 11C64 19 63 34 51 34C44 34 40 29 32 18Z"/></svg>{part.slice(3)}</span></span>:part);
 if(Array.isArray(node))return node.map(brandTypography);
 if(isValidElement<{children?:ReactNode}>(node)&&node.props.children!==undefined){if(typeof node.type==='string'&&['svg','option','textarea'].includes(node.type))return node;return cloneElement(node as ReactElement<{children?:ReactNode}>,{},brandTypography(node.props.children));}
 return node;
}
export function HeroTitle(){
 const[count,setCount]=useState(0);const first='Moda feminina.',second='Exclusiva.';
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){setCount(first.length+second.length);return;}const started=performance.now();const timer=setInterval(()=>{const next=Math.min(first.length+second.length,Math.floor((performance.now()-started)/20));setCount(next);if(next===first.length+second.length)clearInterval(timer)},20);return()=>clearInterval(timer)},[]);
 return <h1 aria-label={`${first} ${second}`}><span className="line" aria-hidden="true"><span>{first.slice(0,count)}<span style={{visibility:'hidden'}}>{first.slice(count)}</span></span></span><span className="line" aria-hidden="true"><span><em>{second.slice(0,Math.max(0,count-first.length))}<span style={{visibility:'hidden'}}>{second.slice(Math.max(0,count-first.length))}</span></em></span></span></h1>;
}
