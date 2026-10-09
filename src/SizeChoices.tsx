import {brandTypography} from './BrandTypography';
import {GARMENT_SIZES,type GarmentSize} from './inventory';
// Only sizes available in the shared inventory can be selected.
export const PREVIEW_GARMENT_SIZES=GARMENT_SIZES;
export function SizeChoices({name,value,onChange,options=GARMENT_SIZES}:{name:string;value?:string;onChange:(size:string)=>void;options?:readonly GarmentSize[]}){return <fieldset className="size-choices"><legend>Tamanho</legend><div>{options.map(size=><button key={size} type="button" aria-label={`Selecionar tamanho ${size} de ${name}`} aria-pressed={value===size} onClick={()=>onChange(size)}>{size}</button>)}</div></fieldset>}
export function HighlightedTitle({text}:{text:string}){const space=text.indexOf(' ');return space<0?<span className="title-mark">{brandTypography(text)}</span>:<><span className="title-mark">{brandTypography(text.slice(0,space))}</span>{brandTypography(text.slice(space))}</>}
