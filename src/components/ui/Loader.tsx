import { useCallback, useEffect, useRef, useState } from 'react';
import { weddingData } from '../../data/weddingData';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Loader.css';

interface LoaderProps {
  onDone: () => void;
}

export function Loader({ onDone }: LoaderProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [leaving, setLeaving] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setLeaving(true);
    window.setTimeout(() => onDone(), reduced ? 200 : 700);
  }, [onDone, reduced]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(finish, 400);
      return () => window.clearTimeout(t);
    }

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => finish());
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true });
    }

    const failSafe = window.setTimeout(finish, 45000);

    return () => {
      window.clearTimeout(failSafe);
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, [finish, reduced]);

  return (
    <div
      className={`site-loader ${leaving ? 'is-leaving' : ''}`}
      aria-hidden={leaving}
      role="presentation"
    >
      {!reduced && (
        <video
          ref={videoRef}
          className="site-loader__video"
          src={weddingData.images.introVideo}
          muted
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          onEnded={finish}
          onError={finish}
        />
      )}
      {reduced && (
        <p className="site-loader__msg">{weddingData.copy.loadingMessage}</p>
      )}
    </div>
  );
}
