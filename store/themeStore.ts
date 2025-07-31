import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: true, // Default to dark mode as your app currently does
  
  toggleTheme: () => set((state) => {
    const newIsDarkMode = !state.isDarkMode;
    
    // Update document class immediately for dramatic visual feedback
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a'; // dark-900
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff'; // white
    }
    
    return { isDarkMode: newIsDarkMode };
  }),
  
  setTheme: (isDark: boolean) => set(() => {
    // Update document class
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
    
    return { isDarkMode: isDark };
  }),
}));