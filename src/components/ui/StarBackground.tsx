import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './StarBackground.css';

type StarTone = 'ivory' | 'gold';
type StarMotion = 'twinkle' | 'float' | 'glow' | 'drift';

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  tone: StarTone;
  opacity: number;
  blur: number;
  motion: StarMotion;
  duration: number;
  delay: number;
  floatX: number;
  floatY: number;
  driftX2: number;
  driftY2: number;
}

interface StarBackgroundProps {
  /** `fixed` = global night sky; `local` = fill parent section (e.g. footer) */
  variant?: 'fixed' | 'local';
  count?: number;
  seed?: number;
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function createStars(count: number, seed: number): Star[] {
  const rand = mulberry32(seed);
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    const roll = rand();
    const motion: StarMotion =
      roll < 0.18 ? 'twinkle' : roll < 0.48 ? 'float' : roll < 0.82 ? 'drift' : 'glow';

    const range = motion === 'drift' ? 70 : motion === 'float' ? 42 : 18;

    stars.push({
      id: i,
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      size: 1 + Math.floor(rand() * 3),
      tone: rand() > 0.78 ? 'gold' : 'ivory',
      opacity: 0.4 + rand() * 0.45,
      blur: rand() > 0.7 ? 0.35 + rand() * 0.5 : 0,
      motion,
      duration:
        motion === 'drift'
          ? 10 + rand() * 14
          : motion === 'float'
            ? 7 + rand() * 10
            : motion === 'glow'
              ? 3.5 + rand() * 4.5
              : 2.2 + rand() * 3.5,
      delay: rand() * 8,
      floatX: (rand() - 0.5) * range,
      floatY: (rand() - 0.5) * range * 1.2,
      driftX2: (rand() - 0.5) * range * 0.9,
      driftY2: (rand() - 0.5) * range,
    });
  }

  return stars;
}

function starAnimation(star: Star, reduceMotion: boolean) {
  if (reduceMotion) {
    return {
      animate: { opacity: star.opacity, x: 0, y: 0, scale: 1 },
      transition: { duration: 0 },
    };
  }

  const base = star.opacity;
  const ease = 'easeInOut' as const;

  switch (star.motion) {
    case 'twinkle':
      return {
        animate: {
          opacity: [base * 0.3, base, base * 0.3],
          y: [0, -6, 0],
          scale: [0.88, 1.05, 0.88],
        },
        transition: {
          duration: star.duration,
          delay: star.delay,
          repeat: Infinity,
          ease,
        },
      };
    case 'float':
      return {
        animate: {
          opacity: [base * 0.55, base, base * 0.55],
          x: [0, star.floatX, 0],
          y: [0, star.floatY, 0],
        },
        transition: {
          duration: star.duration,
          delay: star.delay,
          repeat: Infinity,
          ease,
        },
      };
    case 'drift':
      return {
        animate: {
          opacity: [base * 0.5, base, base * 0.85, base * 0.65, base * 0.5],
          x: [0, star.floatX, star.driftX2, star.floatX * -0.55, 0],
          y: [0, star.floatY, star.driftY2, star.floatY * -0.45, 0],
        },
        transition: {
          duration: star.duration,
          delay: star.delay,
          repeat: Infinity,
          ease,
          times: [0, 0.25, 0.5, 0.75, 1],
        },
      };
    case 'glow':
    default:
      return {
        animate: {
          opacity: [base * 0.4, base * 1.25, base, base * 0.4],
          x: [0, star.floatX, star.floatX * 0.4, 0],
          y: [0, star.floatY, star.floatY * 0.4, 0],
          scale: [0.92, 1.12, 1, 0.92],
        },
        transition: {
          duration: star.duration,
          delay: star.delay,
          repeat: Infinity,
          ease,
          times: [0, 0.4, 0.7, 1],
        },
      };
  }
}

function StarParticle({
  star,
  reduceMotion,
}: {
  star: Star;
  reduceMotion: boolean;
}) {
  const { animate, transition } = starAnimation(star, reduceMotion);

  return (
    <motion.span
      className={`star-bg__star star-bg__star--${star.tone}`}
      style={{
        left: star.left,
        top: star.top,
        width: star.size,
        height: star.size,
        filter: star.blur ? `blur(${star.blur}px)` : undefined,
      }}
      initial={{ opacity: star.opacity * 0.5, x: 0, y: 0, scale: 1 }}
      animate={animate}
      transition={transition}
    />
  );
}

export function StarBackground({
  variant = 'fixed',
  count,
  seed = variant === 'local' ? 9091 : 20270920,
}: StarBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const resolvedCount =
    count ??
    (variant === 'local'
      ? isMobile
        ? 22
        : 36
      : isMobile
        ? 46
        : 80);
  const stars = useMemo(
    () => createStars(resolvedCount, seed),
    [resolvedCount, seed],
  );

  return (
    <div className={`star-bg star-bg--${variant}`} aria-hidden="true">
      <div className="star-bg__field">
        {stars.map((star) => (
          <StarParticle
            key={star.id}
            star={star}
            reduceMotion={!!reduceMotion}
          />
        ))}
      </div>
    </div>
  );
}
