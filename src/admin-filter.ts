import type {Look} from './inventory';
export type StockFilters={tab:string;category:string;size:string;query:string};
export const normalizeStockSearch=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();
export function filterStock(rows:Look[],filters:StockFilters){const q=normalizeStockSearch(filters.query);return rows.filter(l=>{
 if(filters.tab!=='all'&&l.status!==filters.tab)return false;
 if(filters.category!=='Todas'&&l.type!==filters.category)return false;
 if(q&&!normalizeStockSearch(`${l.name} ${l.type} ${l.id}`).includes(q))return false;
 if(filters.size==='Todos')return true;
 const size=filters.size as keyof NonNullable<Look['size_stock']>;
 const available=l.size_stock?.[size]??(!l.size||l.size===size);
 return l.status==='sold'?!available:available;
})}
