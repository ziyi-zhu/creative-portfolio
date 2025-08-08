'use client';

import {
  useTitleAnimation,
  useIntersectionAnimation,
} from '@/hooks/useAnimations';

// Define animation options outside component to prevent re-creation
const TITLE_ANIMATION_OPTIONS = {
  threshold: 0.2,
  rootMargin: '-10% 0px -10% 0px',
};

const SUBTITLE_ANIMATION_OPTIONS = {
  threshold: 0.2,
  rootMargin: '-10% 0px -10% 0px',
  duration: 1.5,
  ease: 'power2.out' as const,
  initialY: 0,
  initialScale: 1,
  useBlur: true,
  initialBlur: 10,
};

export default function Hero() {
  const headlineRef = useTitleAnimation(TITLE_ANIMATION_OPTIONS);
  const { registerElement, startAnimation } = useIntersectionAnimation(
    SUBTITLE_ANIMATION_OPTIONS
  );

  // Register subtitle for animation
  const subtitleRef = (el: HTMLParagraphElement | null) => {
    if (el) {
      registerElement(el);
      startAnimation();
    }
  };

  return (
    <section
      id='hero'
      className='min-h-screen flex flex-col justify-center items-center px-6 pt-20'
    >
      <div className='text-center max-w-7xl'>
        <h1
          ref={headlineRef}
          className='headline text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8'
          style={{ opacity: 0 }}
          data-animated='false'
        >
          CREATIVE PORTFOLIO
        </h1>
        <p
          ref={subtitleRef}
          className='subtitle text-xl md:text-2xl tracking-wider'
          style={{ color: 'var(--color-primary)', opacity: 0 }}
        >
          PAINTING / PHOTOGRAPHY / GENERATIVE ART
        </p>
      </div>
    </section>
  );
}
