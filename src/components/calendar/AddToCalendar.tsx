import { weddingData } from '../../data/weddingData';
import './AddToCalendar.css';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Format as UTC ICS timestamp: YYYYMMDDTHHMMSSZ */
function toICSDate(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

function getEventBounds(): { start: Date; end: Date } {
  const { iso, startTime, endTime } = weddingData.date;
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);

  // Interpret configured times in Asia/Riyadh (UTC+3) without external deps
  const start = new Date(`${iso}T${pad(sh)}:${pad(sm)}:00+03:00`);
  const end = new Date(`${iso}T${pad(eh)}:${pad(em)}:00+03:00`);
  return { start, end };
}

function buildGoogleCalendarUrl(): string {
  const { start, end } = getEventBounds();
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: weddingData.calendar.title,
    details: weddingData.calendar.description,
    location: `${weddingData.venue.nameEn}, ${weddingData.venue.addressEn}`,
    dates: `${toICSDate(start)}/${toICSDate(end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildICSContent(): string {
  const { start, end } = getEventBounds();
  const stamp = toICSDate(new Date());
  const uid = `wedding-${weddingData.date.iso}@adam-layan`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AdamLayan//Wedding//AR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${weddingData.calendar.title}`,
    `DESCRIPTION:${weddingData.calendar.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${weddingData.venue.nameAr} — ${weddingData.venue.addressAr}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

function downloadICS(): void {
  const blob = new Blob([buildICSContent()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'adam-layan-wedding.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function AddToCalendar() {
  return (
    <div className="add-to-calendar">
      <p className="add-to-calendar__label">{weddingData.copy.calendarLabel}</p>
      <div className="add-to-calendar__actions">
        <a
          className="add-to-calendar__btn add-to-calendar__btn--google"
          href={buildGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Calendar
        </a>
        <button
          type="button"
          className="add-to-calendar__btn add-to-calendar__btn--ics"
          onClick={downloadICS}
        >
          Apple / ICS
        </button>
      </div>
    </div>
  );
}
