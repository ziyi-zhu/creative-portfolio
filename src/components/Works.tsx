'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

import { artworks } from '@/data/artworks';
import {
  useIntersectionAnimation,
  useTitleAnimation,
} from '@/hooks/useAnimations';

import Arrow from './Arrow';
import Cross from './Cross';
import Toggle from './Toggle';

gsap.registerPlugin(ScrollTrigger);

type FilterType = 'all' | 'generative' | 'photography' | 'painting';

export default function Works() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isScrollView, setIsScrollView] = useState(true); // Always start with scroll view for SSR consistency
  const [shuffledArtworks, setShuffledArtworks] = useState(artworks);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<{
    src: string;
    alt: string;
    title: string;
    description: string;
  } | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const artworkRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation hooks
  const titleRef = useTitleAnimation();
  const { registerElement, startAnimation } = useIntersectionAnimation({
    initialY: isScrollView ? 20 : 30,
    initialScale: 0.95,
  });

  // Shuffle function using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle artworks on component mount
  useEffect(() => {
    setShuffledArtworks(shuffleArray(artworks));
  }, []);

  // Handle client-side mounting and initial mobile detection
  useEffect(() => {
    setIsMounted(true);

    // Set initial view mode based on screen size after mounting
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsScrollView(false); // Switch to grid mode on mobile
    }

    // Detect initial dark mode
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Handle responsive view mode changes (only after mounted)
  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      // Only auto-switch if user hasn't manually toggled on current screen size
      if (isMobile && isScrollView) {
        setIsScrollView(false); // Switch to grid mode on mobile
      } else if (!isMobile && !isScrollView) {
        // Optional: Switch back to scroll mode on desktop
        // Comment this out if you want to preserve user's choice
        setIsScrollView(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isScrollView, isMounted]);

  const filteredArtworks =
    activeFilter === 'all'
      ? shuffledArtworks
      : shuffledArtworks.filter(artwork => artwork.category === activeFilter);

  // Fullscreen handlers
  const openFullscreen = (artwork: (typeof artworks)[0]) => {
    setFullscreenImage({
      src: artwork.imagePath,
      alt: artwork.title,
      title: artwork.title,
      description: artwork.description,
    });
  };

  // GSAP entrance animation effect
  useEffect(() => {
    if (fullscreenImage) {
      const overlay = document.querySelector('.fullscreen-overlay');
      const image = overlay?.querySelector('.fullscreen-image-container');
      const caption = overlay?.querySelector('.fullscreen-caption');

      if (overlay && image && caption) {
        // Set initial states immediately
        gsap.set(overlay, { opacity: 0 });
        gsap.set(image, { opacity: 0, scale: 0.8 });
        gsap.set(caption, { opacity: 0, y: 20 });

        // Create entrance timeline
        const tl = gsap.timeline();

        tl.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
          .to(
            image,
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            },
            '-=0.1'
          )
          .to(
            caption,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.2'
          );
      }
    }
  }, [fullscreenImage]);

  const closeFullscreen = () => {
    const overlay = document.querySelector('.fullscreen-overlay');
    const image = overlay?.querySelector('.fullscreen-image-container');
    const caption = overlay?.querySelector('.fullscreen-caption');

    if (overlay && image && caption) {
      // GSAP exit animations
      const tl = gsap.timeline({
        onComplete: () => {
          setFullscreenImage(null);
          document.body.style.overflow = '';
        },
      });

      tl.to(caption, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: 'power2.in',
      })
        .to(
          image,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
          },
          '-=0.1'
        )
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          },
          '-=0.2'
        );
    } else {
      setFullscreenImage(null);
      document.body.style.overflow = '';
    }
  };

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenImage) {
        closeFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage]);

  // Check scroll capabilities
  const checkScrollCapabilities = useCallback(() => {
    if (!galleryRef.current || !isScrollView) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const container = galleryRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding
  }, [isScrollView]);

  // Scroll handlers for gallery arrows
  const scrollLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  // Monitor scroll changes and check capabilities
  useEffect(() => {
    if (!galleryRef.current || !isScrollView) return;

    const container = galleryRef.current;

    // Initial check
    const initialCheck = () => {
      setTimeout(checkScrollCapabilities, 100); // Delay to ensure content is loaded
    };

    // Check on scroll
    const handleScroll = () => {
      checkScrollCapabilities();
    };

    // Check on resize
    const handleResize = () => {
      checkScrollCapabilities();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial check after component mounts
    initialCheck();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isScrollView, filteredArtworks, checkScrollCapabilities]);

  // Setup animations based on view mode using the new animation hooks
  useEffect(() => {
    // Clear any existing ScrollTriggers (in case there are any from previous implementations)
    ScrollTrigger.getAll().forEach(trigger => {
      trigger.kill();
    });

    // Small delay to ensure DOM is fully updated
    const timer = setTimeout(() => {
      // Reset and initialize refs array to match current filtered artworks length
      const newRefs: (HTMLDivElement | null)[] = new Array(
        filteredArtworks.length
      ).fill(null);
      artworkRefs.current.forEach((ref, index) => {
        if (index < filteredArtworks.length && ref) {
          newRefs[index] = ref;
        }
      });
      artworkRefs.current = newRefs;

      const artworkElements = artworkRefs.current.filter(
        el => el !== null
      ) as HTMLElement[];

      if (artworkElements.length === 0) return;

      // Register elements with the animation hook and start animation
      artworkElements.forEach(element => registerElement(element));
      startAnimation();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [filteredArtworks, isScrollView, registerElement, startAnimation]);

  return (
    <section id='works' className='py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <h2
          ref={titleRef}
          className='text-4xl md:text-5xl font-bold tracking-tight mb-12'
          style={{ opacity: 0 }}
        >
          SELECTED WORKS
        </h2>

        {/* Filter Tabs */}
        <div className='flex flex-wrap items-center justify-between mb-12'>
          <div className='flex flex-wrap gap-8 text-xl'>
            <button
              onClick={() => setActiveFilter('generative')}
              className={`tracking-wide transition-colors border-b-2 ${
                activeFilter === 'generative'
                  ? 'border-transparent'
                  : 'border-transparent hover:opacity-70'
              }`}
              style={{
                color:
                  activeFilter === 'generative'
                    ? ''
                    : 'var(--color-text-muted)',
                borderBottomColor:
                  activeFilter === 'generative'
                    ? 'var(--color-primary)'
                    : 'transparent',
              }}
            >
              GENERATIVE
            </button>
            <button
              onClick={() => setActiveFilter('photography')}
              className={`tracking-wide transition-colors border-b-2 ${
                activeFilter === 'photography'
                  ? 'border-transparent'
                  : 'border-transparent hover:opacity-70'
              }`}
              style={{
                color:
                  activeFilter === 'photography'
                    ? ''
                    : 'var(--color-text-muted)',
                borderBottomColor:
                  activeFilter === 'photography'
                    ? 'var(--color-primary)'
                    : 'transparent',
              }}
            >
              PHOTOGRAPHY
            </button>
            <button
              onClick={() => setActiveFilter('painting')}
              className={`tracking-wide transition-colors border-b-2 ${
                activeFilter === 'painting'
                  ? 'border-transparent'
                  : 'border-transparent hover:opacity-70'
              }`}
              style={{
                color:
                  activeFilter === 'painting' ? '' : 'var(--color-text-muted)',
                borderBottomColor:
                  activeFilter === 'painting'
                    ? 'var(--color-primary)'
                    : 'transparent',
              }}
            >
              PAINTING
            </button>
            <button
              onClick={() => setActiveFilter('all')}
              className={`tracking-wide transition-colors border-b-2 ${
                activeFilter === 'all'
                  ? 'border-transparent'
                  : 'border-transparent hover:opacity-70'
              }`}
              style={{
                color: activeFilter === 'all' ? '' : 'var(--color-text-muted)',
                borderBottomColor:
                  activeFilter === 'all'
                    ? 'var(--color-primary)'
                    : 'transparent',
              }}
            >
              ALL WORKS
            </button>
          </div>

          <div className='flex items-center space-x-4 hidden md:flex'>
            <Toggle
              isOn={!isScrollView}
              onToggle={() => setIsScrollView(!isScrollView)}
              leftLabel='SCROLL'
              rightLabel='GRID'
            />
          </div>
        </div>

        {/* Gallery */}
        <div
          ref={galleryRef}
          className={
            isScrollView
              ? 'flex gap-6 overflow-x-auto pb-4 scrollbar-hide'
              : 'works-grid columns-1 md:columns-2 lg:columns-3 gap-6'
          }
        >
          {filteredArtworks.map((artwork, index) => (
            <div
              key={`${artwork.id}-${activeFilter}-${isScrollView ? 'scroll' : 'grid'}`}
              ref={el => {
                artworkRefs.current[index] = el;
              }}
              className={`group ${isScrollView ? 'flex-shrink-0' : 'break-inside-avoid mb-6'}`}
              data-animated='false'
              style={{
                opacity: 0,
                transform: `translateY(${isScrollView ? '20px' : '30px'}) scale(0.95)`,
              }}
            >
              <div
                className={`relative overflow-hidden cursor-pointer ${isScrollView ? 'h-96' : 'w-full'}`}
                style={{
                  backgroundColor: isDarkMode
                    ? 'var(--color-dark-bg)'
                    : 'var(--color-light-bg)',
                }}
                onClick={() => openFullscreen(artwork)}
              >
                <Image
                  src={artwork.imagePath}
                  alt={artwork.title}
                  width={0}
                  height={0}
                  className={`group-hover:scale-105 transition-transform duration-500 ${isScrollView ? 'h-full w-auto object-cover' : 'w-full h-auto object-cover'}`}
                  sizes={
                    isScrollView
                      ? '(max-width: 768px) 80vw, 320px'
                      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  }
                />
              </div>
              <div className='mt-4'>
                <h3 className='text-xl font-bold tracking-tight'>
                  {artwork.title}
                </h3>
                <p
                  className='text-lg mt-1'
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {artwork.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        {isScrollView && (canScrollLeft || canScrollRight) && (
          <div className='flex justify-between items-center w-full mt-8'>
            <div className='flex justify-start'>
              {canScrollLeft ? (
                <Arrow direction='left' size={48} onClick={scrollLeft} />
              ) : (
                <div className='w-12 h-12'></div>
              )}
            </div>
            <div className='flex justify-end'>
              {canScrollRight ? (
                <Arrow direction='right' size={48} onClick={scrollRight} />
              ) : (
                <div className='w-12 h-12'></div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Image Overlay */}
      {fullscreenImage && (
        <div
          className='fullscreen-overlay fixed inset-0 z-[10000] flex flex-col justify-center items-center p-8'
          onClick={e => {
            // Only close if clicking directly on the overlay background (like reference)
            if (e.target === e.currentTarget) {
              closeFullscreen();
            }
          }}
          style={{
            backgroundColor: isDarkMode
              ? 'var(--color-overlay-dark)'
              : 'var(--color-overlay-light)',
            opacity: 0,
          }}
        >
          {/* Close Button */}
          <div className='absolute top-5 right-5 z-[10001]'>
            <Cross
              size={48}
              onClick={closeFullscreen}
              className='text-current'
            />
          </div>

          {/* Fullscreen Image */}
          <div
            className='fullscreen-image-container'
            style={{
              opacity: 0,
              transform: 'scale(0.8)',
            }}
          >
            <Image
              src={fullscreenImage.src}
              alt={fullscreenImage.alt}
              width={1200}
              height={800}
              className='max-w-[90vw] max-h-[75vh] object-contain mb-4'
            />
          </div>

          {/* Caption */}
          <div
            className='fullscreen-caption relative w-full max-w-3xl text-center'
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
            }}
          >
            <h3
              className='text-2xl font-bold mb-2'
              style={{
                color: isDarkMode
                  ? 'var(--color-dark-text)'
                  : 'var(--color-light-text)',
              }}
            >
              {fullscreenImage.title}
            </h3>
            <p
              className='text-xl opacity-70'
              style={{
                color: isDarkMode
                  ? 'var(--color-dark-text)'
                  : 'var(--color-light-text)',
              }}
            >
              {fullscreenImage.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
