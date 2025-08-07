'use client';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-6">
      <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">ZIYI ZHU</h1>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('hero')}
            className="hover:text-red-500 transition-colors"
          >
            HOME
          </button>
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
            onClick={onToggleTheme}
            className="flex items-center space-x-2 text-base"
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
  );
}
