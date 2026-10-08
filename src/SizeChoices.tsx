// Requested preview options. No inventory records are changed by this selector.
export const PREVIEW_GARMENT_SIZES=['P','M','G','GG'] as const;
export function SizeChoices({name,value,onChange}:{name:string;value?:string;onChange:(size:string)=>void}){return <fieldset className="size-choices"><legend>Tamanho</legend><div>{PREVIEW_GARMENT_SIZES.map(size=><button key={size} type="button" aria-label={`Selecionar tamanho ${size} de ${name}`} aria-pressed={value===size} onClick={()=>onChange(size)}>{size}</button>)}</div></fieldset>}
export function HighlightedTitle({text}:{text:string}){const space=text.indexOf(' ');return space<0?<span className="title-mark">{text}</span>:<><span className="title-mark">{text.slice(0,space)}</span>{text.slice(space)}</>}
