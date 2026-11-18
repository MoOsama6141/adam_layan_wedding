import { weddingData } from '../../data/weddingData';
import './OurStory.css';

export function OurStory() {
  return (
    <section id="story" className="our-story section" aria-labelledby="story-title">
      <div className="section__inner">
        <h2 id="story-title" className="section__title section__title--light">
          {weddingData.copy.storyTitle}
        </h2>

        <div className="our-story__grid">
          {weddingData.story.map((moment) => (
            <article
              key={moment.id}
              className={`our-story__card our-story__card--${moment.orientation}`}
            >
              <div className="our-story__media">
                <img src={moment.image} alt={moment.title} loading="lazy" />
                <span className="our-story__number" aria-hidden="true">
                  {moment.id}
                </span>
              </div>
              <div className="our-story__meta">
                <time>{moment.date}</time>
                <h3>{moment.title}</h3>
                <p>{moment.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
