'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Don't render cursor on mobile devices
    if (window.innerWidth <= 768) {
      return () => window.removeEventListener('resize', checkMobile);
    }

    // Track mouse movement
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Handle hover states for interactive elements
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add mouse move listener
    document.addEventListener('mousemove', updateMousePosition);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .cursor-pointer, .category-nav li, .toggle-btn, .gallery-item img, [data-cursor="pointer"]'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', checkMobile);
      
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Re-initialize hover listeners when DOM changes (for dynamic content)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Re-attach listeners to newly added elements
    const attachHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], .cursor-pointer, .category-nav li, .toggle-btn, .gallery-item img, [data-cursor="pointer"]'
      );

      interactiveElements.forEach((element) => {
        // Remove existing listeners to prevent duplicates
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        
        // Add fresh listeners
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Initial attachment
    attachHoverListeners();

    // Re-attach on DOM mutations (for dynamic content)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      className={`cursor-follower ${isHovering ? 'link-hover' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
