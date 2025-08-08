import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  duration?: number;
  ease?: string;
  stagger?: {
    amount: number;
    from: string;
  };
  initialY?: number;
  initialScale?: number;
  useBlur?: boolean;
  initialBlur?: number;
}

export const defaultAnimationOptions: AnimationOptions = {
  threshold: 0.2,
  rootMargin: '-10% 0px -10% 0px',
  duration: 0.8,
  ease: 'power2.out',
  initialY: 30,
  initialScale: 0.95,
  useBlur: false,
  initialBlur: 0
};

export const titleAnimationOptions: AnimationOptions = {
  threshold: 0.2,
  rootMargin: '-10% 0px -10% 0px',
  duration: 1.5,
  ease: 'power2.out',
  stagger: {
    amount: 1.2,
    from: 'random'
  },
  useBlur: true,
  initialBlur: 10
};

/**
 * Creates an intersection observer that animates elements when they become visible
 * @param elements - Array of HTML elements to observe
 * @param options - Animation options
 * @returns Cleanup function to disconnect the observer
 */
export function createIntersectionAnimation(
  elements: HTMLElement[],
  options: AnimationOptions = defaultAnimationOptions
): () => void {
  const {
    threshold = 0.2,
    rootMargin = '-10% 0px -10% 0px',
    duration = 0.8,
    ease = 'power2.out',
    initialY = 30,
    initialScale = 0.95,
    useBlur = false,
    initialBlur = 10
  } = options;

  // Set initial states for elements that haven't been animated
  elements.forEach((element) => {
    const isAnimated = element.getAttribute('data-animated') === 'true';
    if (!isAnimated) {
      const initialProps: any = {
        opacity: 0,
        y: initialY,
        scale: initialScale
      };
      
      if (useBlur) {
        initialProps.filter = `blur(${initialBlur}px)`;
      }
      
      gsap.set(element, initialProps);
    }
  });

  const observerOptions = {
    root: null,
    rootMargin,
    threshold
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
        const element = entry.target as HTMLElement;
        const isAnimated = element.getAttribute('data-animated') === 'true';

        if (!isAnimated) {
          // Mark as animated to prevent re-animation
          element.setAttribute('data-animated', 'true');

          // Animate the element
          const animationProps: any = {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            ease
          };
          
          if (useBlur) {
            animationProps.filter = 'blur(0px)';
          }
          
          gsap.to(element, animationProps);
        }

        // Stop observing this element once it's been processed
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Start observing all elements
  elements.forEach((element) => {
    if (element) {
      observer.observe(element);
    }
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
}

/**
 * Creates an intersection observer that animates title text with character stagger
 * @param element - The title element to animate
 * @param options - Animation options
 * @returns Cleanup function
 */
export function createTitleAnimation(
  element: HTMLElement,
  options: AnimationOptions = titleAnimationOptions
): () => void {
  const {
    threshold = 0.2,
    rootMargin = '-10% 0px -10% 0px',
    duration = 1.5,
    ease = 'power2.out',
    stagger = { amount: 1.2, from: 'random' }
  } = options;

  // Check if already animated to prevent re-animation
  if (element.getAttribute('data-animated') === 'true') {
    return () => {}; // Return empty cleanup if already animated
  }

  // Set initial opacity
  gsap.set(element, { opacity: 1 });

  // Split the text into characters
  const splitText = new SplitText(element, {
    type: 'chars, words',
    charsClass: 'char'
  });

  const chars = splitText.chars;

  // Set initial state for characters with blur
  gsap.set(chars, { filter: 'blur(10px)', opacity: 0 });

  const observerOptions = {
    root: null,
    rootMargin,
    threshold
  };

  let isCleanedUp = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= threshold && !isCleanedUp) {
        const isAnimated = element.getAttribute('data-animated') === 'true';

        if (!isAnimated) {
          // Mark as animated to prevent re-animation
          element.setAttribute('data-animated', 'true');

          // Animate characters with stagger - blur in effect
          gsap.to(chars, {
            duration,
            opacity: 1,
            filter: 'blur(0px)',
            ease,
            stagger: {
              amount: stagger.amount,
              from: stagger.from as any
            }
          });
        }

        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Start observing
  observer.observe(element);

  // Return cleanup function
  return () => {
    isCleanedUp = true;
    observer.disconnect();
    if (!element.getAttribute('data-animated')) {
      splitText.revert();
    }
  };
}
