import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

// Type definitions for GSAP properties
interface GSAPProperties {
  opacity?: number;
  y?: number;
  scale?: number;
  filter?: string;
  duration?: number;
  ease?: string;
}

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
  useTextScramble?: boolean;
  scrambleOptions?: {
    chars?: string;
    revealDelay?: number;
    speed?: number;
  };
}

export const defaultAnimationOptions: AnimationOptions = {
  threshold: 0.2,
  rootMargin: '-10% 0px -10% 0px',
  duration: 0.8,
  ease: 'power2.out',
  initialY: 30,
  initialScale: 0.95,
  useTextScramble: false,
};

export const titleAnimationOptions: AnimationOptions = {
  threshold: 0.0,
  rootMargin: '-10% 0px -10% 0px',
  duration: 2,
  ease: 'power2.out',
  useTextScramble: true,
  scrambleOptions: {
    chars: 'upperCase',
    revealDelay: 0,
    speed: 0.5,
  },
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
    useTextScramble = false,
    scrambleOptions = { chars: 'upperCase', revealDelay: 0, speed: 1 },
  } = options;

  // Set initial states for elements that haven't been animated
  elements.forEach(element => {
    const isAnimated = element.getAttribute('data-animated') === 'true';
    if (!isAnimated) {
      const initialProps: GSAPProperties = {
        opacity: useTextScramble ? 1 : 0,
        y: initialY,
        scale: initialScale,
      };

      gsap.set(element, initialProps);

      // For text scramble, store original text and clear element
      if (useTextScramble) {
        const originalText = element.textContent || '';
        element.setAttribute('data-original-text', originalText);
        element.textContent = '-'; // Start empty for scramble effect

        gsap.set(element, initialProps);
      }
    }
  });

  const observerOptions = {
    root: null,
    rootMargin,
    threshold,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
        const element = entry.target as HTMLElement;
        const isAnimated = element.getAttribute('data-animated') === 'true';

        if (!isAnimated) {
          // Mark as animated to prevent re-animation
          element.setAttribute('data-animated', 'true');

          if (useTextScramble) {
            // Use TextScramble animation
            const originalText =
              element.getAttribute('data-original-text') || '';

            // Create timeline for combined animations
            const tl = gsap.timeline();

            // Animate position and scale
            tl.to(element, {
              duration: 0.5,
              ease,
              y: 0,
              scale: 1,
            })
              // Then animate text scramble
              .to(
                element,
                {
                  duration,
                  scrambleText: {
                    text: originalText,
                    chars: scrambleOptions.chars,
                    revealDelay: scrambleOptions.revealDelay,
                    speed: scrambleOptions.speed,
                  },
                },
                '-=0.2'
              );
          } else {
            // Standard animation
            const animationProps: GSAPProperties = {
              opacity: 1,
              y: 0,
              scale: 1,
              duration,
              ease,
            };

            gsap.to(element, animationProps);
          }
        }

        // Stop observing this element once it's been processed
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Start observing all elements
  elements.forEach(element => {
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
 * Creates an intersection observer that animates title text with TextScramble
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
    duration = 2,
    ease = 'power2.out',
    scrambleOptions = { chars: 'upperCase', revealDelay: 0, speed: 0.5 },
  } = options;

  // Check if already animated to prevent re-animation
  if (element.getAttribute('data-animated') === 'true') {
    return () => {}; // Return empty cleanup if already animated
  }

  // Store original text and start empty for scramble effect
  const originalText = element.textContent || '';
  element.setAttribute('data-original-text', originalText);
  element.textContent = '-'; // Start empty

  // Set initial opacity
  gsap.set(element, { opacity: 1 });

  const observerOptions = {
    root: null,
    rootMargin,
    threshold,
  };

  let isCleanedUp = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (
        entry.isIntersecting &&
        entry.intersectionRatio >= threshold &&
        !isCleanedUp
      ) {
        const isAnimated = element.getAttribute('data-animated') === 'true';

        if (!isAnimated) {
          // Mark as animated to prevent re-animation
          element.setAttribute('data-animated', 'true');

          // Animate with TextScramble
          gsap.to(element, {
            duration,
            ease,
            scrambleText: {
              text: originalText,
              chars: scrambleOptions.chars,
              revealDelay: scrambleOptions.revealDelay,
              speed: scrambleOptions.speed,
            },
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
  };
}
