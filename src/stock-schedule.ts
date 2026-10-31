export const STORE_ZONE='America/Sao_Paulo';
const formatter=new Intl.DateTimeFormat('en-CA',{timeZone:STORE_ZONE,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
function wall(epoch:number){const p=Object.fromEntries(formatter.formatToParts(epoch).map(p=>[p.type,p.value]));return Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second)}
function instant(value:number){let epoch=value;for(let i=0;i<3;i++)epoch+=value-wall(epoch);return epoch}
function dayStart(value:number){const d=new Date(value);return Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())}
function openingAfter(day:number){let next=day+86400000;while(new Date(next).getUTCDay()===0)next+=86400000;return instant(next+9*3600000)}
export function stockSchedule(now:number,reviewedAt:string|null){
 const local=wall(now),day=dayStart(local),weekday=new Date(local).getUTCDay(),opening=instant(day+9*3600000),closing=instant(day+(weekday===6?13:18)*3600000),open=weekday!==0&&now>=opening&&now<closing;
 const nextOpening=weekday!==0&&now<opening?opening:openingAfter(day),reviewed=reviewedAt?Date.parse(reviewedAt):NaN;
 let due:number|null=null;
 if(Number.isFinite(reviewed)){due=!open?nextOpening:reviewed<opening?opening:reviewed+3600000;if(open&&due>=closing)due=openingAfter(day)}
 return{open,nextOpening,due,pending:open&&due!==null&&now>=due,minutes:due===null?null:Math.max(0,Math.ceil((due-now)/60000))};
}
export function reviewLabel(value:string|null,now:number){
 if(!value)return 'Aguardando a primeira conferência da equipe';
 const stamp=Date.parse(value);if(!Number.isFinite(stamp))return 'Conferência ainda não registrada';
 const today=dayStart(wall(now))===dayStart(wall(stamp)),time=new Intl.DateTimeFormat('pt-BR',{timeZone:STORE_ZONE,hour:'2-digit',minute:'2-digit'}).format(stamp),date=new Intl.DateTimeFormat('pt-BR',{timeZone:STORE_ZONE,day:'2-digit',month:'2-digit'}).format(stamp);
 return `Estoque conferido ${today?'hoje':`em ${date}`} às ${time}`;
}
export function nextLabel(epoch:number,now:number){const today=dayStart(wall(epoch))===dayStart(wall(now));return new Intl.DateTimeFormat('pt-BR',{timeZone:STORE_ZONE,...(today?{}:{weekday:'short' as const}),hour:'2-digit',minute:'2-digit'}).format(epoch)}
