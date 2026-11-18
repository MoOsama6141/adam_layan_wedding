import { useEffect, useId, useRef } from 'react';
import type { AttendanceStatus } from '../../services/rsvpService';
import { RSVPForm } from './RSVPForm';
import './RSVPModal.css';

interface RSVPModalProps {
  open: boolean;
  attendance: AttendanceStatus;
  guestName: string | null;
  onClose: () => void;
}

export function RSVPModal({ open, attendance, guestName, onClose }: RSVPModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    const node = dialogRef.current;
    const focusable = node?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="rsvp-modal" role="presentation" onClick={onClose}>
      <div
        ref={dialogRef}
        className="rsvp-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rsvp-modal__ornament" aria-hidden="true" />
        <h2 id={titleId} className="rsvp-modal__title">
          تأكيد الدعوة
        </h2>
        <p className="rsvp-modal__subtitle">يسعدنا معرفة ردّكم</p>
        <RSVPForm
          initialAttendance={attendance}
          defaultName={guestName}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
