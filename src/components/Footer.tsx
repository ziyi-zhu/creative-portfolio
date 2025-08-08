import Arrow from './Arrow';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      className='py-8 px-6 border-t'
      style={{
        borderTopColor: isDark
          ? 'var(--color-dark-text)'
          : 'var(--color-light-text)',
      }}
    >
      <div className='max-w-7xl mx-auto text-xl'>
        © 2025 Ziyi Zhu. All rights reserved.
      </div>

      {/* Scroll to top arrow */}
      <div className='flex justify-center mt-8'>
        <Arrow
          direction='up'
          size={48}
          onClick={scrollToTop}
          className='text-current'
        />
      </div>
    </footer>
  );
}
