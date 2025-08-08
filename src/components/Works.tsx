'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { artworks } from '@/data/artworks';
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const artworkRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const filteredArtworks = activeFilter === 'all' 
    ? shuffledArtworks 
    : shuffledArtworks.filter(artwork => artwork.category === activeFilter);

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

  // Arrow Component
  const ScrollArrow = ({ direction }: { direction: 'left' | 'right' }) => {
    const arrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (arrowRef.current) {
        // Initial animation setup
        gsap.set(arrowRef.current, { scale: 1 });
        
        // Create floating animation
        gsap.to(arrowRef.current, {
          x: direction === 'left' ? -8 : 8,
          duration: 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    }, [direction]);

    return (
      <div 
        ref={arrowRef}
        className="flex items-center justify-center w-8 h-8"
        style={{ color: 'var(--color-primary)' }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {direction === 'left' ? (
            <polyline points="15,18 9,12 15,6"></polyline>
          ) : (
            <polyline points="9,18 15,12 9,6"></polyline>
          )}
        </svg>
      </div>
    );
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
  }, [isScrollView, filteredArtworks]);

  // Setup animations based on view mode
  useEffect(() => {
    // Clear any existing ScrollTriggers (in case there are any from previous implementations)
    ScrollTrigger.getAll().forEach(trigger => {
      trigger.kill();
    });
    
    let observerCleanup: (() => void) | null = null;
    
    // Small delay to ensure DOM is fully updated
    const timer = setTimeout(() => {
      // Reset and initialize refs array to match current filtered artworks length
      const newRefs: (HTMLDivElement | null)[] = new Array(filteredArtworks.length).fill(null);
      artworkRefs.current.forEach((ref, index) => {
        if (index < filteredArtworks.length && ref) {
          newRefs[index] = ref;
        }
      });
      artworkRefs.current = newRefs;
      
      const artworkElements = artworkRefs.current.filter(el => el !== null);
      
      if (artworkElements.length === 0) return;
      
      // UNIFIED APPROACH: Use Intersection Observer for both scroll and grid modes
      // Set initial state - only set invisible state for elements that haven't been animated yet
      artworkElements.forEach((element) => {
        // Check if element is already animated (opacity is 1)
        const currentOpacity = gsap.getProperty(element, "opacity");
        if (currentOpacity === 0 || currentOpacity === "0") {
          gsap.set(element, { 
            opacity: 0, 
            y: isScrollView ? 20 : 30, 
            scale: 0.95 
          });
        }
      });
      
      // Create Intersection Observer to watch for individual images coming into view
      const observerOptions = {
        root: isScrollView ? galleryRef.current : null, // Horizontal scroll container for scroll mode, viewport for grid mode
        rootMargin: '0px',
        threshold: 0.1 // Trigger as soon as 10% of image is visible
      };
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            // Check if this element is already animated to avoid re-animating
            const currentOpacity = gsap.getProperty(entry.target, "opacity");
            if (currentOpacity === 0 || currentOpacity === "0") {
              // Image is visible and not yet animated, animate it
              gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
            
            // Stop observing this image once it's been processed
            imageObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      // Start observing each image that hasn't been animated yet
      artworkElements.forEach((element) => {
        if (element) {
          const currentOpacity = gsap.getProperty(element, "opacity");
          // Only observe elements that haven't been animated yet
          if (currentOpacity === 0 || currentOpacity === "0") {
            imageObserver.observe(element);
          }
        }
      });
      
      // Store cleanup function
      observerCleanup = () => {
        imageObserver.disconnect();
      };
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      // Clean up intersection observer if it exists
      if (observerCleanup) {
        observerCleanup();
      }
    };
  }, [filteredArtworks, isScrollView]);

  return (
    <section id="works" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">SELECTED WORKS</h2>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between mb-12">
          <div className="flex flex-wrap gap-8">
            <button
              onClick={() => setActiveFilter('generative')}
              className={`text-lg tracking-wide transition-colors border-b-2 ${
                activeFilter === 'generative' ? 'border-transparent' : 'border-transparent hover:opacity-70'
              }`}
              style={{
                color: activeFilter === 'generative' ? '' : 'rgba(127, 127, 127, 0.7)',
                borderBottomColor: activeFilter === 'generative' ? 'var(--color-primary)' : 'transparent'
              }}
            >
              GENERATIVE
            </button>
            <button
              onClick={() => setActiveFilter('photography')}
              className={`text-lg tracking-wide transition-colors border-b-2 ${
                activeFilter === 'photography' ? 'border-transparent' : 'border-transparent hover:opacity-70'
              }`}
              style={{
                color: activeFilter === 'photography' ? '' : 'rgba(127, 127, 127, 0.7)',
                borderBottomColor: activeFilter === 'photography' ? 'var(--color-primary)' : 'transparent'
              }}
            >
              PHOTOGRAPHY
            </button>
            <button
              onClick={() => setActiveFilter('painting')}
              className={`text-lg tracking-wide transition-colors border-b-2 ${
                activeFilter === 'painting' ? 'border-transparent' : 'border-transparent hover:opacity-70'
              }`}
              style={{
                color: activeFilter === 'painting' ? '' : 'rgba(127, 127, 127, 0.7)',
                borderBottomColor: activeFilter === 'painting' ? 'var(--color-primary)' : 'transparent'
              }}
            >
              PAINTING
            </button>
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-lg tracking-wide transition-colors border-b-2 ${
                activeFilter === 'all' ? 'border-transparent' : 'border-transparent hover:opacity-70'
              }`}
              style={{
                color: activeFilter === 'all' ? '' : 'rgba(127, 127, 127, 0.7)',
                borderBottomColor: activeFilter === 'all' ? 'var(--color-primary)' : 'transparent'
              }}
            >
              ALL WORKS
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Toggle
              isOn={!isScrollView}
              onToggle={() => setIsScrollView(!isScrollView)}
              leftLabel="SCROLL"
              rightLabel="GRID"
            />
          </div>
        </div>

        {/* Gallery */}
        <div 
          ref={galleryRef}
          className={isScrollView ? 'flex gap-6 overflow-x-auto pb-4 scrollbar-hide' : 'works-grid columns-1 md:columns-2 lg:columns-3 gap-6'}
        >
          {filteredArtworks.map((artwork, index) => (
            <div 
              key={`${artwork.id}-${activeFilter}-${isScrollView ? 'scroll' : 'grid'}`} 
              ref={el => { artworkRefs.current[index] = el; }}
              className={`group ${isScrollView ? 'flex-shrink-0' : 'break-inside-avoid mb-6'}`}
              style={{ opacity: 0, transform: 'translateY(20px) scale(0.95)' }}
            >
              <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${isScrollView ? 'h-96' : 'w-full'}`}>
                <Image
                  src={artwork.imagePath}
                  alt={artwork.title}
                  width={isScrollView ? 0 : 400}
                  height={isScrollView ? 320 : 0}
                  className={`group-hover:scale-105 transition-transform duration-500 ${isScrollView ? 'h-full w-auto object-cover' : 'w-full h-auto object-cover'}`}
                  sizes={isScrollView ? "(max-width: 768px) 80vw, 320px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold tracking-tight">{artwork.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{artwork.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        {isScrollView && (canScrollLeft || canScrollRight) && (
          <div className="flex justify-between items-center w-full mt-8">
            <div className="flex justify-start">
              {canScrollLeft ? <ScrollArrow direction="left" /> : <div className="w-8 h-8"></div>}
            </div>
            <div className="flex justify-end">
              {canScrollRight ? <ScrollArrow direction="right" /> : <div className="w-8 h-8"></div>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
