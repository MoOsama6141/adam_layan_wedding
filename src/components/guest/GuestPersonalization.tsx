import { weddingData } from '../../data/weddingData';
import './GuestPersonalization.css';

interface GuestPersonalizationProps {
  guestName: string | null;
  className?: string;
}

/**
 * Renders personalized greeting text for the hero.
 * Logic for reading/sanitizing the guest lives in `useGuestName`.
 */
export function GuestPersonalization({ guestName, className = '' }: GuestPersonalizationProps) {
  if (guestName) {
    return (
      <p className={`guest-greeting guest-greeting--personal ${className}`}>
        <span className="guest-greeting__line">{weddingData.copy.guestGreetingPrefix}</span>
        <span className="guest-greeting__name">{guestName}</span>
      </p>
    );
  }

  return (
    <p className={`guest-greeting ${className}`}>{weddingData.copy.heroTagline}</p>
  );
}
