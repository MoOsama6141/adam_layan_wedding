import { useEffect, useRef } from 'react';
import type { TouchEvent as ReactTouchEvent } from 'react';
import type { GalleryImage } from '../../data/galleryImages';
import './Lightbox.css';

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const image = images[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onPrev(); // RTL: right = previous visually
      if (e.key === 'ArrowLeft') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!image) return null;

  const onTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    // RTL swipe: swipe right (positive dx) → next
    if (dx > 0) onNext();
    else onPrev();
  };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="معرض الصور"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        className="lightbox__close"
        aria-label="إغلاق"
        onClick={onClose}
      >
        ×
      </button>

      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        aria-label="الصورة السابقة"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        ›
      </button>

      <figure
        className="lightbox__figure"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.src} alt={image.alt} className="lightbox__img" />
        <figcaption className="lightbox__caption">
          <span>{image.alt}</span>
          <span className="lightbox__counter">
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        aria-label="الصورة التالية"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        ‹
      </button>
    </div>
  );
}
