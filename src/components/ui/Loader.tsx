import { useEffect, useState } from 'react';
import { weddingData } from '../../data/weddingData';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Loader.css';

interface LoaderProps {
  onDone: () => void;
}

export function Loader({ onDone }: LoaderProps) {
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const showMs = reduced ? 400 : 1600;
    const fadeMs = reduced ? 200 : 700;

    const leaveTimer = window.setTimeout(() => setLeaving(true), showMs);
    const doneTimer = window.setTimeout(() => onDone(), showMs + fadeMs);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone, reduced]);

  return (
    <div className={`site-loader ${leaving ? 'is-leaving' : ''}`} aria-hidden={leaving}>
      <p className="site-loader__names">{weddingData.couple.displayNameAr}</p>
      <div className="site-loader__line" />
      <p className="site-loader__msg">{weddingData.copy.loadingMessage}</p>
    </div>
  );
}
