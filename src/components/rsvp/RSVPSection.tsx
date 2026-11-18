import { useState } from 'react';
import { weddingData } from '../../data/weddingData';
import type { AttendanceStatus } from '../../services/rsvpService';
import { ShareInvitation } from '../sharing/ShareInvitation';
import { RSVPModal } from './RSVPModal';
import './RSVPSection.css';

interface RSVPSectionProps {
  guestName: string | null;
}

export function RSVPSection({ guestName }: RSVPSectionProps) {
  const [open, setOpen] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceStatus>('attending');

  const openModal = (status: AttendanceStatus) => {
    setAttendance(status);
    setOpen(true);
  };

  return (
    <section id="rsvp" className="rsvp-section section" aria-labelledby="rsvp-title">
      <div className="section__inner rsvp-section__inner">
        <h2 id="rsvp-title" className="section__title section__title--light">
          {weddingData.copy.rsvpTitle}
        </h2>
        <div className="rsvp-section__actions">
          <button
            type="button"
            className="rsvp-section__btn rsvp-section__btn--primary"
            onClick={() => openModal('attending')}
          >
            {weddingData.copy.rsvpConfirm}
          </button>
          <button
            type="button"
            className="rsvp-section__btn rsvp-section__btn--outline"
            onClick={() => openModal('declined')}
          >
            {weddingData.copy.rsvpDecline}
          </button>
        </div>
        <ShareInvitation guestName={guestName} />
      </div>

      <RSVPModal
        open={open}
        attendance={attendance}
        guestName={guestName}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
