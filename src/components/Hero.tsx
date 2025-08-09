'use client';

import { useTitleAnimation } from '@/hooks/useAnimations';

// Define animation options outside component to prevent re-creation
const TITLE_ANIMATION_OPTIONS = {
  threshold: 0.0,
  rootMargin: '-10% 0px -10% 0px',
  duration: 3,
  ease: 'power2.out' as const,
  stagger: {
    amount: 1.2,
    from: 'random',
  },
  useTextScramble: true,
  scrambleOptions: {
    chars: 'upperCase',
    revealDelay: 0,
    speed: 0.5,
  },
};

const SUBTITLE_ANIMATION_OPTIONS = {
  threshold: 0.0,
  rootMargin: '-10% 0px -10% 0px',
  duration: 5,
  ease: 'power2.out' as const,
  initialY: 0,
  initialScale: 1,
  useTextScramble: true,
  scrambleOptions: {
    chars: 'upperCase',
    revealDelay: 0,
    speed: 0.5,
  },
};

export default function Hero() {
  const headlineRef = useTitleAnimation(TITLE_ANIMATION_OPTIONS);
  const subtitleRef = useTitleAnimation(SUBTITLE_ANIMATION_OPTIONS);

  return (
    <section id='hero' className='min-h-screen px-6 pt-20 flex items-center'>
      <div className='max-w-7xl mx-auto w-full overflow-hidden'>
        <h1
          ref={headlineRef}
          className='headline text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8'
          style={{ opacity: 1 }}
        >
          CREATIVE PORTFOLIO
        </h1>
        <p
          ref={subtitleRef}
          className='subtitle text-xl md:text-2xl lg:text-3xl tracking-wider'
          style={{ color: 'var(--color-primary)', opacity: 1 }}
        >
          PAINTING / PHOTOGRAPHY / GENERATIVE ART
        </p>
      </div>
    </section>
  );
}
