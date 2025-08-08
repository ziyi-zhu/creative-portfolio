interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  return (
    <footer 
      className="py-8 px-6 border-t"
      style={{
        borderTopColor: isDark ? 'rgba(247, 247, 247, 0.2)' : 'rgba(24, 24, 24, 0.2)'
      }}
    >
      <div className="max-w-7xl mx-auto text-base text-gray-600 dark:text-gray-400">
        © 2025 Ziyi Zhu. All rights reserved.
      </div>
    </footer>
  );
}
