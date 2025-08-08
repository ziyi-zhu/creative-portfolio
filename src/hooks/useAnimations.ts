import { useEffect, useRef } from 'react';
import { createIntersectionAnimation, createTitleAnimation, AnimationOptions } from '@/lib/animations';

/**
 * Hook for animating elements when they come into view
 * @param options - Animation options
 * @returns ref to attach to elements and function to register elements for animation
 */
export function useIntersectionAnimation(options?: AnimationOptions) {
  const elementsRef = useRef<HTMLElement[]>([]);
  const cleanupRef = useRef<(() => void) | null>(null);

  const registerElement = (element: HTMLElement | null) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
    }
  };

  const startAnimation = () => {
    if (elementsRef.current.length > 0) {
      // Clean up previous observer
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      
      // Create new animation
      cleanupRef.current = createIntersectionAnimation(elementsRef.current, options);
    }
  };

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return { registerElement, startAnimation };
}

/**
 * Hook for animating title text with character stagger
 * @param options - Animation options
 * @returns ref to attach to the title element
 */
export function useTitleAnimation(options?: AnimationOptions) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const isAnimatedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current && !isAnimatedRef.current) {
        // Clean up previous animation
        if (cleanupRef.current) {
          cleanupRef.current();
        }
        
        // Create new title animation
        cleanupRef.current = createTitleAnimation(titleRef.current, options);
        isAnimatedRef.current = true;
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [options]);

  // Reset animation flag when component unmounts
  useEffect(() => {
    return () => {
      isAnimatedRef.current = false;
    };
  }, []);

  return titleRef;
}
