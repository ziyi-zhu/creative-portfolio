import Toggle from './Toggle';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b px-6'
      style={{
        backgroundColor: isDark
          ? 'var(--color-dark-bg)'
          : 'var(--color-light-bg)',
        borderBottomColor: isDark
          ? 'var(--color-dark-text)'
          : 'var(--color-light-text)',
      }}
    >
      <div className='max-w-7xl mx-auto py-4 flex justify-between items-center'>
        <h1 className='text-3xl font-bold tracking-tight'>
          <a
            href='https://ziyizhu.com'
            className='transition-colors hover:opacity-80'
            onMouseEnter={e =>
              (e.currentTarget.style.color = 'var(--color-primary)')
            }
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            ZIYI ZHU
          </a>
        </h1>

        <nav className='hidden md:flex items-center space-x-8 text-xl'>
          <button
            onClick={() => scrollToSection('hero')}
            className='transition-colors hover:opacity-80'
            onMouseEnter={e =>
              (e.currentTarget.style.color = 'var(--color-primary)')
            }
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection('works')}
            className='transition-colors hover:opacity-80'
            onMouseEnter={e =>
              (e.currentTarget.style.color = 'var(--color-primary)')
            }
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            WORKS
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className='transition-colors hover:opacity-80'
            onMouseEnter={e =>
              (e.currentTarget.style.color = 'var(--color-primary)')
            }
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className='transition-colors hover:opacity-80'
            onMouseEnter={e =>
              (e.currentTarget.style.color = 'var(--color-primary)')
            }
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            CONTACT
          </button>
        </nav>

        <div className='flex items-center space-x-4'>
          <Toggle
            isOn={isDark}
            onToggle={onToggleTheme}
            leftLabel='LIGHT'
            rightLabel='DARK'
          />
        </div>
      </div>
    </header>
  );
}
