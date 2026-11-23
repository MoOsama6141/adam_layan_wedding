import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import { weddingData } from '../../data/weddingData';
import { buildWhatsAppRSVPUrl, submitRSVP } from '../../services/rsvpService';
import type { AttendanceStatus, RSVPPayload } from '../../services/rsvpService';
import './RSVPForm.css';

interface RSVPFormProps {
  initialAttendance: AttendanceStatus;
  defaultName?: string | null;
  onClose: () => void;
}

interface FormErrors {
  guestName?: string;
  accompanyingGuests?: string;
}

export function RSVPForm({ initialAttendance, defaultName, onClose }: RSVPFormProps) {
  const formId = useId();
  const [guestName, setGuestName] = useState(defaultName ?? '');
  const [attendance, setAttendance] = useState<AttendanceStatus>(initialAttendance);
  const [accompanyingGuests, setAccompanyingGuests] = useState(0);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string; mode?: string } | null>(null);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!guestName.trim() || guestName.trim().length < 2) {
      next.guestName = 'يرجى إدخال الاسم (حرفان على الأقل)';
    }
    if (
      Number.isNaN(accompanyingGuests) ||
      accompanyingGuests < 0 ||
      accompanyingGuests > weddingData.rsvp.maxGuests
    ) {
      next.accompanyingGuests = `عدد المرافقين بين ٠ و ${weddingData.rsvp.maxGuests}`;
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const payload: RSVPPayload = {
      guestName: guestName.trim(),
      attendance,
      accompanyingGuests: attendance === 'declined' ? 0 : accompanyingGuests,
      message: message.trim() || undefined,
    };

    setLoading(true);
    setResult(null);
    try {
      const res = await submitRSVP(payload);
      setResult({ ok: res.ok, text: res.message, mode: res.mode });
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const payload: RSVPPayload = {
      guestName: guestName.trim() || 'ضيف',
      attendance,
      accompanyingGuests: attendance === 'declined' ? 0 : accompanyingGuests,
      message: message.trim() || undefined,
    };
    window.open(buildWhatsAppRSVPUrl(payload), '_blank', 'noopener,noreferrer');
  };

  return (
    <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
      <div className="rsvp-form__field">
        <label htmlFor={`${formId}-name`}>الاسم</label>
        <input
          id={`${formId}-name`}
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.guestName)}
        />
        {errors.guestName && <p className="rsvp-form__error">{errors.guestName}</p>}
      </div>

      <fieldset className="rsvp-form__field">
        <legend>تأكيد الحضور</legend>
        <div className="rsvp-form__radios">
          <label>
            <input
              type="radio"
              name="attendance"
              checked={attendance === 'attending'}
              onChange={() => setAttendance('attending')}
            />
            سأحضر إن شاء الله
          </label>
          <label>
            <input
              type="radio"
              name="attendance"
              checked={attendance === 'declined'}
              onChange={() => setAttendance('declined')}
            />
            للأسف لن أتمكن
          </label>
        </div>
      </fieldset>

      {attendance === 'attending' && (
        <div className="rsvp-form__field">
          <label htmlFor={`${formId}-guests`}>عدد المرافقين</label>
          <input
            id={`${formId}-guests`}
            type="number"
            min={0}
            max={weddingData.rsvp.maxGuests}
            value={accompanyingGuests}
            onChange={(e) => setAccompanyingGuests(Number(e.target.value))}
            aria-invalid={Boolean(errors.accompanyingGuests)}
          />
          {errors.accompanyingGuests && (
            <p className="rsvp-form__error">{errors.accompanyingGuests}</p>
          )}
        </div>
      )}

      <div className="rsvp-form__field">
        <label htmlFor={`${formId}-message`}>رسالة للعرسان (اختياري)</label>
        <textarea
          id={`${formId}-message`}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={400}
        />
      </div>

      {result && (
        <p
          className={`rsvp-form__result ${result.ok ? 'is-success' : 'is-error'}`}
          role="status"
        >
          {result.text}
          {result.mode === 'mock' && (
            <span className="rsvp-form__mock-badge"> وضع تجريبي</span>
          )}
        </p>
      )}

      <div className="rsvp-form__actions">
        {/* <button type="submit" className="rsvp-form__submit" disabled={loading}>
          {loading ? 'جاري الإرسال...' : 'إرسال الرد'}
        </button> */}
        <button type="button" className="rsvp-form__whatsapp" disabled={loading} onClick={openWhatsApp}>
          {loading ? 'جاري الإرسال...' : 'إرسال عبر واتساب'}
        </button>
        <button type="button" className="rsvp-form__cancel" onClick={onClose}>
          إغلاق
        </button>
      </div>
    </form>
  );
}
