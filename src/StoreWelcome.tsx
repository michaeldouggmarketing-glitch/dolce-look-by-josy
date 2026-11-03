import {useHeroVisibility} from './BrowseMode';
import './store-welcome.css';
export default function StoreWelcome(){const{visible}=useHeroVisibility();if(!visible)return null;return <section className="store-welcome store-welcome-day-only" aria-label="Conheça a Dolce Look"><div className="store-welcome-photo" data-enter="photo"><img src="/media/facade-day.webp" alt="Fachada da Dolce Look durante o dia" fetchPriority="high"/></div></section>}
