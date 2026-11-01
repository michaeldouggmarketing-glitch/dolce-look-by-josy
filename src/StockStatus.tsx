import {useCallback,useEffect,useRef,useState} from 'react';
import {db} from './inventory';
import {nextLabel,reviewLabel,stockSchedule} from './stock-schedule';
import './stock-status.css';
function useStockReview(){
 const[reviewedAt,setReviewedAt]=useState<string|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState(false),[now,setNow]=useState(Date.now()),[revision,setRevision]=useState(0);
 const clock=useRef<{epoch:number;tick:number}|null>(null),refresh=useCallback(()=>setRevision(r=>r+1),[]);
 useEffect(()=>{let alive=true,inFlight=false;
  async function load(){if(inFlight)return;inFlight=true;try{if(!db)throw Error('Unavailable');const{data,error}=await db.rpc('dolce_get_stock_review');if(error||!data||!Number.isFinite(Date.parse(data.server_now)))throw Error('Unavailable');if(alive){clock.current={epoch:Date.parse(data.server_now),tick:performance.now()};setNow(Date.parse(data.server_now));setReviewedAt(data.reviewed_at);setError(false);setLoading(false)}}catch{if(alive){setError(true);setLoading(false)}}finally{inFlight=false}}
  void load();const poll=setInterval(()=>{if(document.visibilityState==='visible')void load()},15000),visible=()=>{if(document.visibilityState==='visible')void load()};document.addEventListener('visibilitychange',visible);
  return()=>{alive=false;clearInterval(poll);document.removeEventListener('visibilitychange',visible)};
 },[revision]);
 useEffect(()=>{const tick=setInterval(()=>{if(clock.current)setNow(clock.current.epoch+performance.now()-clock.current.tick)},10000);return()=>clearInterval(tick)},[]);
 return{reviewedAt,loading,error,now,refresh};
}
export function StockStatus(){
 const{reviewedAt,loading,error,now}=useStockReview(),[toast,setToast]=useState(false),seen=useRef<string|null|undefined>(undefined),announced=useRef(false),schedule=stockSchedule(now,reviewedAt);
 useEffect(()=>{if(loading||error)return;const previous=seen.current;seen.current=reviewedAt;if(previous===undefined||!reviewedAt||previous===reviewedAt||announced.current||Math.abs(now-Date.parse(reviewedAt))>60000)return;
  try{if(sessionStorage.getItem('dolce-review-announced'))return;sessionStorage.setItem('dolce-review-announced','yes')}catch{}announced.current=true;setToast(true);
 },[reviewedAt,loading,error,now]);
 useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(false),6500);return()=>clearTimeout(timer)},[toast]);
 const status=loading?'Consultando a conferência do estoque…':error?'Não foi possível confirmar a última conferência':reviewLabel(reviewedAt,now);
 const detail=error?'Tente novamente em instantes.':!schedule.open?`Fora do expediente · Retorno previsto ${nextLabel(schedule.nextOpening,now)}`:schedule.pending?'Nova conferência pendente':schedule.due?`Próxima prevista ${nextLabel(schedule.due,now)}${schedule.minutes!==null&&schedule.minutes<=60?` · em ${schedule.minutes} min`:''}`:'Conferências a cada hora durante o expediente';
 return <><aside className="stock-status" aria-label="Conferência do estoque"><div className="stock-status-line"><span className="stock-status-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M20 11v9H4V4h11M8 11l4 4 9-11"/></svg></span><div><p>{status}</p><span>{loading?'Horário de Brasília':detail}</span></div><details className="stock-status-help"><summary>Como funciona</summary><div><p>A equipe confere as vendas a cada hora durante o expediente e registra a conclusão aqui. As peças vendidas saem da vitrine assim que a equipe registra a venda.</p><p>Horários habituais: seg–sex, 9h às 18h; sáb, 9h às 13h; domingo fechado. Horário de Brasília.</p><p>Entre conferências, uma peça pode vender. A disponibilidade é confirmada antes da compra.</p></div></details></div></aside>{toast&&<div className="stock-review-toast" role="status"><span>A equipe acabou de conferir o estoque.</span><button onClick={()=>setToast(false)} aria-label="Fechar aviso de conferência">Fechar</button></div>}</>;
}
export function StockReviewAdmin({blocked=false}:{blocked?:boolean}){
 const{reviewedAt,loading,error,now,refresh}=useStockReview(),[confirmed,setConfirmed]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
 async function complete(){if(!db||!confirmed||busy||blocked)return;setBusy(true);setMessage('');try{const{error}=await db.rpc('dolce_confirm_stock_review');if(error)throw error;setConfirmed(false);setMessage('Conferência registrada. O horário real já está disponível para os clientes.');refresh()}catch{setMessage('A conferência não foi registrada. Confira sua conexão e tente novamente.')}finally{setBusy(false)}}
 return <section className="admin-stock-review"><div><h2>Conferência do estoque</h2><p>Marque as peças e os tamanhos vendidos abaixo. Depois, confirme a revisão para atualizar o horário que os clientes veem.</p><strong>{loading?'Buscando a última conferência…':error?'Não foi possível consultar a última conferência.':reviewLabel(reviewedAt,now)}</strong><p className="admin-review-hours">Rotina: de hora em hora · Seg–sex 9h–18h · Sáb 9h–13h · Horário de Brasília</p></div><div><label><input type="checkbox" checked={confirmed} disabled={busy||blocked} onChange={e=>setConfirmed(e.target.checked)}/><span>Conferi as vendas e os tamanhos disponíveis.</span></label><button className="admin-button" disabled={!confirmed||busy||blocked} onClick={()=>void complete()}>{busy?'Registrando…':'Concluir conferência do estoque'}</button><p role="status">{message}</p></div></section>;
}

export function StockReviewLine(){const{reviewedAt,loading,error,now}=useStockReview(),schedule=stockSchedule(now,reviewedAt);return <div className="product-review-line"><p>{loading?'Consultando a conferência do estoque…':error?'Última conferência indisponível. Consulte a equipe.':reviewLabel(reviewedAt,now)}</p>{!loading&&!error&&schedule.pending&&<p>Nova conferência pendente.</p>}</div>}
