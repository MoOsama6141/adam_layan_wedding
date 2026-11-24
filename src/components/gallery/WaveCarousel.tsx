import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { GalleryImage } from '../../data/galleryImages';
import './WaveCarousel.css';

interface WaveCarouselProps {
  images: GalleryImage[];
  onSelect: (index: number) => void;
}

const CARD_W = 168;
const CARD_H = 224;
const GAP = 18;
const STEP = CARD_W + GAP;
const WAVE_AMP = 38;
const DRAG_CLICK_THRESHOLD = 12;

export function WaveCarousel({ images, onSelect }: WaveCarouselProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportW, setViewportW] = useState(360);
  const [active, setActive] = useState(0);
  const dragOrigin = useRef(0);
  const didDrag = useRef(false);

  const x = useMotionValue(0);

  const centerOffset = (viewportW - CARD_W) / 2;
  const minX = centerOffset - Math.max(0, images.length - 1) * STEP;
  const maxX = centerOffset;

  const snapTo = useCallback(
    (index: number, velocity = 0) => {
      const clamped = Math.max(0, Math.min(images.length - 1, index));
      const target = centerOffset - clamped * STEP;
      setActive(clamped);
      animate(x, target, {
        type: 'spring',
        stiffness: reduceMotion ? 420 : 300,
        damping: reduceMotion ? 40 : 34,
        mass: 0.85,
        velocity,
        restDelta: 0.4,
      });
    },
    [centerOffset, images.length, reduceMotion, x],
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewportW(el.clientWidth || 360);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    x.set(centerOffset);
    setActive(0);
  }, [centerOffset, images, x]);

  useMotionValueEvent(x, 'change', (latest) => {
    if (!images.length) return;
    const idx = Math.round((centerOffset - latest) / STEP);
    const clamped = Math.max(0, Math.min(images.length - 1, idx));
    setActive((prev) => (prev === clamped ? prev : clamped));
  });

  const onDragStart = () => {
    dragOrigin.current = x.get();
    didDrag.current = false;
  };

  const onDrag = () => {
    if (Math.abs(x.get() - dragOrigin.current) > DRAG_CLICK_THRESHOLD) {
      didDrag.current = true;
    }
  };

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { velocity: { x: number } },
  ) => {
    const projected = x.get() + info.velocity.x * 0.2;
    const raw = Math.round((centerOffset - projected) / STEP);
    snapTo(raw, info.velocity.x);
  };

  const handleSelect = (index: number) => {
    if (didDrag.current) return;
    if (index !== active) {
      snapTo(index);
      return;
    }
    onSelect(index);
  };

  if (!images.length) return null;

  return (
    <div className="wave-carousel">
      <div ref={viewportRef} className="wave-carousel__viewport" dir="ltr">
        <motion.div
          className="wave-carousel__track"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: minX - 48, right: maxX + 48 }}
          dragElastic={0.12}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        >
          {images.map((img, i) => (
            <WaveCard
              key={img.id}
              image={img}
              index={i}
              trackX={x}
              centerOffset={centerOffset}
              reduceMotion={!!reduceMotion}
              isActive={i === active}
              onSelect={() => handleSelect(i)}
            />
          ))}
        </motion.div>
      </div>

      <div className="wave-carousel__indicator" aria-hidden="true">
        <div className="wave-carousel__progress">
          <motion.div
            className="wave-carousel__progress-fill"
            animate={{
              width: `${((active + 1) / images.length) * 100}%`,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          />
        </div>
        <span className="wave-carousel__count">
          {active + 1} / {images.length}
        </span>
      </div>

      <p className="wave-carousel__caption">{images[active]?.alt}</p>
    </div>
  );
}

interface WaveCardProps {
  image: GalleryImage;
  index: number;
  trackX: MotionValue<number>;
  centerOffset: number;
  reduceMotion: boolean;
  isActive: boolean;
  onSelect: () => void;
}

function WaveCard({
  image,
  index,
  trackX,
  centerOffset,
  reduceMotion,
  isActive,
  onSelect,
}: WaveCardProps) {
  const waveY = useTransform(trackX, (latest) => {
    const progress = (index * STEP + latest - centerOffset) / STEP;
    if (reduceMotion) return -WAVE_AMP * 0.55 * Math.exp(-progress * progress * 0.8);
    const undulation = Math.sin(progress * Math.PI * 0.5) * (WAVE_AMP * 0.42);
    const lift = -WAVE_AMP * Math.exp(-progress * progress * 0.5);
    return undulation + lift;
  });

  const rotate = useTransform(trackX, (latest) => {
    if (reduceMotion) return 0;
    const progress = (index * STEP + latest - centerOffset) / STEP;
    return progress * -7.2;
  });

  const scale = useTransform(trackX, (latest) => {
    const progress = (index * STEP + latest - centerOffset) / STEP;
    return 0.86 + 0.2 * Math.exp(-progress * progress * 0.65);
  });

  const opacity = useTransform(trackX, (latest) => {
    const progress = (index * STEP + latest - centerOffset) / STEP;
    return 0.52 + 0.48 * Math.exp(-Math.abs(progress) * 0.5);
  });

  const transform = useMotionTemplate`translate3d(0, ${waveY}px, 0) rotate(${rotate}deg) scale(${scale})`;

  return (
    <motion.button
      type="button"
      className={`wave-carousel__card wave-carousel__card--${image.orientation} ${isActive ? 'is-active' : ''} ${reduceMotion ? '' : 'wave-carousel__card--float'}`}
      style={{
        width: CARD_W,
        height: CARD_H,
        marginInlineEnd: GAP,
        transform,
        opacity,
        zIndex: isActive ? 6 : 2,
        ['--float-delay' as string]: `${(index % 6) * 0.18}s`,
        ['--float-duration' as string]: `${3.4 + (index % 4) * 0.35}s`,
      }}
      onClick={onSelect}
      aria-label={`فتح صورة: ${image.alt}`}
      aria-current={isActive ? 'true' : undefined}
    >
      <img src={image.src} alt={image.alt} draggable={false} loading="lazy" />
    </motion.button>
  );
}
