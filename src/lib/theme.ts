export const initializeTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    document.documentElement.classList.toggle('dark', shouldBeDark);
    
    return shouldBeDark;
  }
  return false;
};

export const toggleTheme = (isDark: boolean) => {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
};
