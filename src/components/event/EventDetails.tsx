import { weddingData } from '../../data/weddingData';
import { AddToCalendar } from '../calendar/AddToCalendar';
import './EventDetails.css';

export function EventDetails() {
  const details = [
    { label: 'التاريخ', value: weddingData.date.displayAr },
    { label: 'الوقت', value: `${weddingData.date.startTime}` },
    { label: 'المكان', value: weddingData.venue.nameAr },
    { label: 'المدينة', value: weddingData.venue.cityAr },
  ];

  return (
    <section id="event" className="event-details section" aria-labelledby="event-title">
      <div className="section__inner event-details__grid">
        <div className="event-details__media">
          <img src={weddingData.images.event} alt="أجواء المكان" loading="lazy" />
        </div>
        <div className="event-details__copy">
          <h2 id="event-title" className="section__title">
            {weddingData.copy.eventTitle}
          </h2>
          <ul className="event-details__list">
            {details.map((d) => (
              <li key={d.label}>
                <span className="event-details__icon" aria-hidden="true" />
                <div>
                  <strong>{d.label}</strong>
                  <p>{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            className="event-details__maps"
            href={weddingData.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {weddingData.copy.mapsLabel}
          </a>
          <AddToCalendar />
        </div>
      </div>
    </section>
  );
}
