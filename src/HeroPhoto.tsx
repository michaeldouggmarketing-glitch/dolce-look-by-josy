import type {Look} from './inventory';
import LookMedia from './LookMedia';
export default function HeroPhoto({look}: {look?: Look}) {
  return <div className="hero-photo"><a className="hero-photo-link" href={look ? `/look/${look.id}` : '/colecao'}><figure className="photo"><LookMedia look={look} priority alwaysAnimate key={`${look?.id}:${look?.img}`}/></figure></a></div>;
}
