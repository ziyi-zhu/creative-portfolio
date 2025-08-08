'use client';

import { useState, useEffect } from 'react';
import { initializeTheme, toggleTheme } from '@/lib/theme';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Works from '@/components/Works';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize theme on component mount
    const shouldBeDark = initializeTheme();
    setIsDark(shouldBeDark);
  }, []);

  useEffect(() => {
    // Apply theme changes
    toggleTheme(isDark);
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen" style={{
      backgroundColor: isDark ? 'var(--color-dark-bg)' : 'var(--color-light-bg)',
      color: isDark ? 'var(--color-dark-text)' : 'var(--color-light-text)'
    }}>
      <Header isDark={isDark} onToggleTheme={handleToggleTheme} />
      <Hero />
      <Works />
      <About />
      <Contact />
      <Footer isDark={isDark} />
    </div>
  );
}