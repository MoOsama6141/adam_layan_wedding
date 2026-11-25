import { weddingData } from '../../data/weddingData';
import { StarBackground } from '../ui/StarBackground';
import './Footer.css';

export function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        backgroundImage: `url(${weddingData.images.footerBackground})`,
      }}
    >
      <div className="site-footer__overlay" aria-hidden="true" />
      <StarBackground variant="local" count={40} seed={4242} />
      <div className="site-footer__content">
        <div className="site-footer__ornament" aria-hidden="true" />
        <p className="site-footer__names">{weddingData.couple.displayNameAr}</p>
        <p className="site-footer__date">{weddingData.date.displayAr}</p>
        <p className="site-footer__message">{weddingData.copy.footerMessage}</p>
      </div>
    </footer>
  );
}
