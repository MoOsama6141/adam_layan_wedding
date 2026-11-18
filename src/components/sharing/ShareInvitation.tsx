import { useState } from 'react';
import { weddingData } from '../../data/weddingData';
import { buildGuestUrl } from '../../hooks/useGuestName';
import './ShareInvitation.css';

interface ShareInvitationProps {
  guestName: string | null;
}

export function ShareInvitation({ guestName }: ShareInvitationProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => buildGuestUrl(guestName);
  const getShareText = () => `${weddingData.share.message}\n\n${getShareUrl()}`;

  const handleShare = async () => {
    const url = getShareUrl();
    const text = weddingData.share.message;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: weddingData.calendar.title,
          text,
          url,
        });
        return;
      } catch {
        /* user cancelled or unsupported — fall through */
      }
    }

    const wa = `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`;
    window.open(wa, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    const payload = getShareText();
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const wa = `https://wa.me/?text=${encodeURIComponent(payload)}`;
      window.open(wa, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="share-invitation">
      <button type="button" className="share-invitation__primary" onClick={handleShare}>
        {weddingData.copy.shareLabel}
      </button>
      <button type="button" className="share-invitation__copy" onClick={handleCopy}>
        {copied ? 'تم نسخ الرابط' : 'نسخ رابط الدعوة'}
      </button>
    </div>
  );
}
