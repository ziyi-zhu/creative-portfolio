'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { artworks } from '@/data/artworks';
import { initializeTheme, toggleTheme } from '@/lib/theme';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'generative' | 'photography' | 'painting'>('all');
  const [isScrollView, setIsScrollView] = useState(true);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredArtworks = activeFilter === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === activeFilter);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">ZIYI ZHU</h1>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('works')}
              className="hover:text-red-500 transition-colors"
            >
              WORKS
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-red-500 transition-colors"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-red-500 transition-colors"
            >
              CONTACT
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleTheme}
              className="flex items-center space-x-2 text-sm"
            >
              <span className={!isDark ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}>LIGHT</span>
              <div className="relative w-8 h-4 bg-gray-300 dark:bg-gray-600 rounded-full">
                <div className={`absolute top-0.5 w-3 h-3 bg-gray-900 dark:bg-gray-100 rounded-full transition-transform ${isDark ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
              <span className={isDark ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}>DARK</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8">
            CREATIVE PORTFOLIO
          </h1>
          <p className="text-lg md:text-xl text-red-500 tracking-wider">
            PAINTING / PHOTOGRAPHY / GENERATIVE ART
          </p>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">SELECTED WORKS</h2>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between mb-12">
            <div className="flex flex-wrap gap-8">
              <button
                onClick={() => setActiveFilter('generative')}
                className={`text-lg tracking-wide transition-colors ${
                  activeFilter === 'generative' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                GENERATIVE
              </button>
              <button
                onClick={() => setActiveFilter('photography')}
                className={`text-lg tracking-wide transition-colors ${
                  activeFilter === 'photography' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                PHOTOGRAPHY
              </button>
              <button
                onClick={() => setActiveFilter('painting')}
                className={`text-lg tracking-wide transition-colors ${
                  activeFilter === 'painting' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                PAINTING
              </button>
              <button
                onClick={() => setActiveFilter('all')}
                className={`text-lg tracking-wide transition-colors border-b-2 ${
                  activeFilter === 'all' ? 'text-gray-900 dark:text-gray-100 border-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent'
                }`}
              >
                ALL WORKS
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsScrollView(!isScrollView)}
                className="flex items-center space-x-2 text-sm"
              >
                <span className={isScrollView ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}>SCROLL</span>
                <div className="relative w-8 h-4 bg-gray-300 dark:bg-gray-600 rounded-full">
                  <div className={`absolute top-0.5 w-3 h-3 bg-gray-900 dark:bg-gray-100 rounded-full transition-transform ${isScrollView ? 'translate-x-0.5' : 'translate-x-4'}`} />
                </div>
                <span className={!isScrollView ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}>GRID</span>
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div className={isScrollView ? 'flex gap-6 overflow-x-auto pb-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
            {filteredArtworks.map((artwork) => (
              <div key={artwork.id} className={`group ${isScrollView ? 'flex-shrink-0 w-80' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={artwork.imagePath}
                    alt={artwork.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold tracking-tight">{artwork.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{artwork.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">ABOUT</h2>
          <div className="text-lg md:text-xl leading-relaxed">
            <p>
              Ziyi Zhu is a multidisciplinary artist focused on exploring
              the intersection of traditional and digital media. Through
              photography, mixed media works, and generative art using
              computer algorithms, Ziyi creates visual narratives that
              challenge conventional perspectives and push the
              boundaries of computational creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">CONTACT</h2>
          
          <div className="mb-12">
            <a 
              href="mailto:zhu.ziyi@outlook.com"
              className="text-2xl md:text-3xl hover:text-red-500 transition-colors"
            >
              zhu.ziyi@outlook.com
            </a>
          </div>

          <div className="flex space-x-8 text-lg">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              YOUTUBE
            </a>
            <a 
              href="https://unsplash.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              UNSPLASH
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto text-sm text-gray-600 dark:text-gray-400">
          © 2025 Ziyi Zhu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
