import { weddingData } from '../../data/weddingData';
import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__ornament" aria-hidden="true" />
      <p className="site-footer__names">{weddingData.couple.displayNameAr}</p>
      <p className="site-footer__date">{weddingData.date.displayAr}</p>
      <p className="site-footer__message">{weddingData.copy.footerMessage}</p>
    </footer>
  );
}
