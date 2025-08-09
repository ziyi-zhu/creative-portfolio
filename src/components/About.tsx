'use client';

import { useTitleAnimation } from '@/hooks/useAnimations';

export default function About() {
  const titleRef = useTitleAnimation();

  return (
    <section id='about' className='py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <h2
          ref={titleRef}
          className='text-5xl md:text-6xl font-bold tracking-tight mb-12'
          style={{ opacity: 1 }}
        >
          ABOUT
        </h2>
        <div className='max-w-3xl text-xl md:text-2xl leading-relaxed text-left'>
          <p>
            I’m a passionate explorer of the space where traditional and digital
            art meet. Whether I’m behind the camera, experimenting with mixed
            media, or writing generative algorithms, I’m always searching for
            new ways to tell visual stories. Art, for me, is about challenging
            what’s expected and discovering how technology can expand the
            boundaries of creativity.
          </p>
        </div>
      </div>
    </section>
  );
}
