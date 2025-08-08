'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headlineRef.current || !subtitleRef.current) return;

    // Wait for fonts to load
    document.fonts.ready.then(() => {
      const headline = headlineRef.current!;
      const subtitle = subtitleRef.current!;
      
      // Set initial opacity
      gsap.set([headline, subtitle], { opacity: 1 });
      
      // Split the headline text into characters
      const headlineSplit = new SplitText(headline, {
        type: "chars, words",
        charsClass: "char"
      });
      
      const headlineChars = headlineSplit.chars;
      
      // Create timeline for sequential animations
      const tl = gsap.timeline();
      
      // Animate headline characters with different effects for each
      tl.from(headlineChars, {
        duration: 2,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: "0% 50% -50",
        ease: "back.out(1.7)",
        stagger: {
          amount: 1.5,
          from: "random"
        }
      })
      // Simple fade in for subtitle
      .from(subtitle, {
        duration: 1,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.5"); // Start 0.5s before headline animation ends
      
      // Cleanup function
      return () => {
        headlineSplit.revert();
        tl.kill();
      };
    });
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
      <div className="text-center max-w-7xl">
        <h1 
          ref={headlineRef}
          className="headline text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tight mb-8"
          style={{ opacity: 0 }}
        >
          CREATIVE PORTFOLIO
        </h1>
        <p 
          ref={subtitleRef}
          className="subtitle text-xl md:text-2xl tracking-wider" 
          style={{color: 'var(--color-primary)', opacity: 0}}
        >
          PAINTING / PHOTOGRAPHY / GENERATIVE ART
        </p>
      </div>
    </section>
  );
}
