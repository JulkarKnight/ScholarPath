import React, { useState, useEffect } from 'react';
import { Globe, Moon, Sun, User, Menu } from 'lucide-react';

interface HeaderProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCountry,
  setSelectedCountry,
  activeTab,
  setActiveTab,
  onMenuClick
}) => {
  const countries = ['All', 'Canada', 'Germany', 'USA', 'UK', 'Australia', 'Finland', 'Sweden'];
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
    window.dispatchEvent(new Event('themechange'));
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-surface)]/85 backdrop-blur-md border-b border-[var(--color-border)] h-[72px] flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
      <div className="flex items-center gap-4 lg:hidden">
        <button onClick={onMenuClick} className="p-2 -ml-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 transition-all hidden sm:flex">
          <Globe className="w-4 h-4 text-[var(--color-text-secondary)]" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-transparent text-[var(--color-text-primary)] text-[13px] font-medium focus:outline-none cursor-pointer appearance-none pr-1"
          >
            {countries.map((c) => (
              <option key={c} value={c} className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">
                {c === 'All' ? 'All Regions' : c}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="w-9 h-9 rounded-full bg-[var(--color-surface-secondary)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] flex items-center justify-center transition-colors border border-[var(--color-border)]"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          aria-label="User Profile"
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border border-[var(--color-border)] ${activeTab === 'profile' ? 'bg-[var(--color-brand)] text-white' : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'}`}
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
