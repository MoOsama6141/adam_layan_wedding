import { weddingData } from '../../data/weddingData';
import { GuestPersonalization } from '../guest/GuestPersonalization';
import { StarBackground } from '../ui/StarBackground';
import './Hero.css';

interface HeroProps {
  guestName: string | null;
}

export function Hero({ guestName }: HeroProps) {
  return (
    <header
      id="hero"
      className="hero"
      style={{ backgroundImage: `url(${weddingData.images.hero})` }}
    >
      <div className="hero__veil" />
      <StarBackground variant="local" count={48} seed={1717} />
      <div className="hero__content">
        <GuestPersonalization guestName={guestName} className="hero__greeting" />
        <h1 className="hero__names">{weddingData.couple.displayNameAr}</h1>
        <p className="hero__date">{weddingData.date.displayAr}</p>
        <a href="#intro" className="hero__cta" aria-label="متابعة الدعوة">
          <span />
        </a>
      </div>
    </header>
  );
}
