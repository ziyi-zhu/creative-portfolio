'use client';

import { useTitleAnimation } from '@/hooks/useAnimations';

export default function Contact() {
  const titleRef = useTitleAnimation();

  return (
    <section id='contact' className='py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <h2
          ref={titleRef}
          className='text-5xl md:text-6xl font-bold tracking-tight mb-12'
          style={{ opacity: 1 }}
        >
          CONTACT
        </h2>

        <div className='mb-12'>
          <a
            href='mailto:zhu.ziyi@outlook.com'
            className='text-3xl md:text-4xl transition-colors'
            onMouseEnter={e =>
              (e.currentTarget.style.color = 'var(--color-primary)')
            }
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            zhu.ziyi@outlook.com
          </a>
        </div>

        <div className='flex space-x-8 text-xl mb-20'>
          <a
            href='https://www.youtube.com/@neoziyism'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors'
            onMouseEnter={e =>
              (e.currentTarget.style.color = 'var(--color-primary)')
            }
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            YOUTUBE
          </a>
          <a
            href='https://unsplash.com/@ziyizhu'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors'
            onMouseEnter={e =>
              (e.currentTarget.style.color = 'var(--color-primary)')
            }
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            UNSPLASH
          </a>
          <a
            href='https://www.linkedin.com/in/ziyizhu/'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors'
            onMouseEnter={e =>
              (e.currentTarget.style.color = 'var(--color-primary)')
            }
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </section>
  );
}
