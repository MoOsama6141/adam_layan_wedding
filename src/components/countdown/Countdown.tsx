import { useEffect, useMemo, useState } from 'react';
import { weddingData } from '../../data/weddingData';
import './Countdown.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function Countdown() {
  const target = useMemo(
    () =>
      new Date(`${weddingData.date.iso}T${weddingData.date.startTime}:00+03:00`),
    [],
  );
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const id = window.setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    { label: 'يوم', value: String(time.days) },
    { label: 'ساعة', value: pad(time.hours) },
    { label: 'دقيقة', value: pad(time.minutes) },
    { label: 'ثانية', value: pad(time.seconds) },
  ];

  return (
    <section id="countdown" className="countdown section" aria-labelledby="countdown-title">
      <div className="section__inner">
        <h2 id="countdown-title" className="section__title section__title--light">
          {weddingData.copy.countdownTitle}
        </h2>
        <div className="countdown__grid" role="timer" aria-live="polite">
          {units.map((u) => (
            <div key={u.label} className="countdown__unit">
              <span className="countdown__value">{u.value}</span>
              <span className="countdown__label">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
