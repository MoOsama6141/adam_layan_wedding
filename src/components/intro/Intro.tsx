import { weddingData } from '../../data/weddingData';
import './Intro.css';

export function Intro() {
  return (
    <section id="intro" className="intro section" aria-labelledby="intro-title">
      <div className="section__inner intro__grid">
        <div className="intro__copy">
          <div className="intro__ornament" aria-hidden="true" />
          <h2 id="intro-title" className="section__title intro__title">
            {weddingData.copy.introTitle}
          </h2>
          <p className="intro__body">{weddingData.copy.introBody}</p>
          <p className="intro__signature">{weddingData.couple.displayNameAr}</p>
        </div>
        <div className="intro__media">
          <img src={weddingData.images.intro} alt="زهور وشموع" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
