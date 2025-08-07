'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { artworks } from '@/data/artworks';

type FilterType = 'all' | 'generative' | 'photography' | 'painting';

export default function Works() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isScrollView, setIsScrollView] = useState(true);
  const [shuffledArtworks, setShuffledArtworks] = useState(artworks);

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

  const filteredArtworks = activeFilter === 'all' 
    ? shuffledArtworks 
    : shuffledArtworks.filter(artwork => artwork.category === activeFilter);

  return (
    <section id="works" className={`min-h-screen py-20 px-6 ${isScrollView ? 'flex items-center' : ''}`}>
      <div className={`max-w-7xl mx-auto ${isScrollView ? '' : 'h-full flex flex-col justify-start'}`}>
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
                className="flex items-center space-x-2 text-base"
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
        <div className={isScrollView ? 'flex gap-6 overflow-x-auto pb-4 scrollbar-hide' : 'columns-1 md:columns-2 lg:columns-3 gap-6'}>
          {filteredArtworks.map((artwork) => (
            <div key={artwork.id} className={`group ${isScrollView ? 'flex-shrink-0' : 'break-inside-avoid mb-6'}`}>
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
      </div>
    </section>
  );
}
