import { AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { galleryCategories, galleryImages } from '../../data/galleryImages';
import type { GalleryCategory } from '../../data/galleryImages';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Lightbox } from './Lightbox';
import { WaveCarousel } from './WaveCarousel';
import './PhotoGallery.css';

export function PhotoGallery() {
  const [category, setCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const filtered = useMemo(
    () =>
      category === 'all'
        ? galleryImages
        : galleryImages.filter((img) => img.category === category),
    [category],
  );

  return (
    <section id="gallery" className="photo-gallery section" aria-labelledby="gallery-title">
      <div className="section__inner">
        <p className="section__eyebrow">لحظاتنا</p>
        <h2 id="gallery-title" className="section__title section__title--light">
          معرض الذكريات
        </h2>

        <div className="photo-gallery__filters" role="tablist" aria-label="تصفية المعرض">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={category === cat.id}
              className={`photo-gallery__filter ${category === cat.id ? 'is-active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isMobile ? (
          <WaveCarousel
            key={category}
            images={filtered}
            onSelect={setLightboxIndex}
          />
        ) : (
          <div className="photo-gallery__masonry" key={category}>
            {filtered.map((img, i) => (
              <button
                key={img.id}
                type="button"
                className={`photo-gallery__item photo-gallery__item--${img.orientation}`}
                onClick={() => setLightboxIndex(i)}
                aria-label={`فتح صورة: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <span className="photo-gallery__overlay">{img.alt}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            key="gallery-lightbox"
            images={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex((i) =>
                i == null ? 0 : (i - 1 + filtered.length) % filtered.length,
              )
            }
            onNext={() =>
              setLightboxIndex((i) => (i == null ? 0 : (i + 1) % filtered.length))
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
