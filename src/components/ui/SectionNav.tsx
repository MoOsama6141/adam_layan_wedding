import { useEffect, useState } from 'react';
import './SectionNav.css';

const SECTIONS = [
  { id: 'hero', label: 'البداية' },
  { id: 'intro', label: 'الدعوة' },
  { id: 'story', label: 'الحكاية' },
  { id: 'countdown', label: 'العدّاد' },
  { id: 'event', label: 'الموعد' },
  { id: 'gallery', label: 'الصور' },
  { id: 'rsvp', label: 'الحضور' },
];

export function SectionNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="section-nav" aria-label="تنقل الأقسام">
      <ul>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={active === s.id ? 'is-active' : ''}
              aria-label={s.label}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="section-nav__dot" />
              <span className="section-nav__label">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
