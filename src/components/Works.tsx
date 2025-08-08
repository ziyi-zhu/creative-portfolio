'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { artworks } from '@/data/artworks';
import Toggle from './Toggle';

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
