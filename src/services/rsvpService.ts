import { weddingData } from '../data/weddingData';

export type AttendanceStatus = 'attending' | 'declined';

export interface RSVPPayload {
  guestName: string;
  attendance: AttendanceStatus;
  accompanyingGuests: number;
  message?: string;
}

export interface RSVPResult {
  ok: boolean;
  mode: 'api' | 'mock' | 'whatsapp';
  message: string;
}

/**
 * Frontend RSVP service.
 * Uses a real API when `weddingData.rsvp.apiUrl` is set;
 * otherwise falls back to an explicitly identified mock.
 */
export async function submitRSVP(payload: RSVPPayload): Promise<RSVPResult> {
  const apiUrl = weddingData.rsvp.apiUrl;

  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return {
          ok: false,
          mode: 'api',
          message: 'تعذّر إرسال الرد. يرجى المحاولة مرة أخرى.',
        };
      }

      return {
        ok: true,
        mode: 'api',
        message: 'تم استلام ردّكم بنجاح. شكراً لكم!',
      };
    } catch {
      return {
        ok: false,
        mode: 'api',
        message: 'حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.',
      };
    }
  }

  // Mock path — clearly not permanent storage
  await new Promise((r) => setTimeout(r, 900));
  console.info('[RSVP Mock] Submission received (not permanently saved):', payload);

  return {
    ok: true,
    mode: 'mock',
    message:
      'تم استلام ردّكم مؤقتاً للتجربة فقط — لم يُحفظ بشكل دائم. يمكنكم أيضاً الإرسال عبر واتساب.',
  };
}

export function buildWhatsAppRSVPUrl(payload: RSVPPayload): string {
  const statusLabel =
    payload.attendance === 'attending' ? 'سأحضر إن شاء الله' : 'لن أتمكن من الحضور';

  const text = [
    'تأكيد الدعوة — آدم وليان',
    `الاسم: ${payload.guestName}`,
    `الحضور: ${statusLabel}`,
    `عدد المرافقين: ${payload.accompanyingGuests}`,
    payload.message ? `رسالة: ${payload.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const phone = weddingData.rsvp.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
