/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type BackgroundType = 'cosmic' | 'retro' | 'neoncity';

interface BackgroundContextType {
  activeBackground: BackgroundType;
  setActiveBackground: (bg: BackgroundType) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_active_background';

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage if available, otherwise default to cosmic
  const [activeBackground, setInternalActiveBackground] = useState<BackgroundType>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as BackgroundType) || 'cosmic';
  });

  const setActiveBackground = (bg: BackgroundType) => {
    setInternalActiveBackground(bg);
    localStorage.setItem(STORAGE_KEY, bg);
  };

  // Sync state if it's changed by another tab (optional but good practice)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setInternalActiveBackground(e.newValue as BackgroundType);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BackgroundContext.Provider value={{ activeBackground, setActiveBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};
