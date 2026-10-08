import {useEffect,useState} from 'react';
import {createClient} from '@supabase/supabase-js';
import {editorialLooks} from './catalog';
export const GARMENT_SIZES=['P','M','G','GG'] as const;
export type GarmentSize=typeof GARMENT_SIZES[number];
export type SizeStock=Record<GarmentSize,boolean>;
export const allSizeStock=(available=true):SizeStock=>({P:available,M:available,G:available,GG:available});
export const availableSizes=(look:Look)=>GARMENT_SIZES.filter(size=>look.size_stock?.[size]??(!look.size||look.size===size));
export const validChosenSize=(look:Look,size?:string)=>size&&availableSizes(look).includes(size as GarmentSize)?size:undefined;
export function notifyInventory(){const channel=new BroadcastChannel('dolce-stock');channel.postMessage('changed');channel.close();}
export type Look=typeof editorialLooks[number] & {version?:number;status?:string;price?:number|null;size?:string|null;size_stock?:SizeStock;sold_at?:string|null};
const env=(import.meta as unknown as {env:Record<string,string>}).env;
export const db=env.VITE_SUPABASE_URL&&env.VITE_SUPABASE_PUBLISHABLE_KEY?createClient(env.VITE_SUPABASE_URL,env.VITE_SUPABASE_PUBLISHABLE_KEY):null;
export function useInventory(){const[looks,setLooks]=useState<Look[]>([]),[error,setError]=useState(false),[loading,setLoading]=useState(!!db);useEffect(()=>{if(!db){setError(true);return;}let alive=true,sequence=0;async function refresh(){const serial=++sequence;const {data,error}=await db!.from('dolce_products').select('*').eq('status','available').order('id');if(!alive||serial!==sequence)return;setError(!!error);setLoading(false);setLooks(error?[]:(data||[]).filter(l=>availableSizes(l).length>0));}void refresh();const channel=db.channel('dolce-inventory').on('postgres_changes',{event:'*',schema:'public',table:'dolce_inventory_revision'},()=>void refresh()).subscribe();const poll=setInterval(()=>void refresh(),2000);const visible=()=>{if(document.visibilityState==='visible')void refresh()};document.addEventListener('visibilitychange',visible);const updates=new BroadcastChannel('dolce-stock');updates.onmessage=()=>void refresh();return()=>{alive=false;updates.close();clearInterval(poll);document.removeEventListener('visibilitychange',visible);void db!.removeChannel(channel)}},[]);return{looks,error,loading,configured:!!db}}
