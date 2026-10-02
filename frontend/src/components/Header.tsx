import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Moon, Sun, User, Menu, BarChart3, FileCheck, Compass, FileText, ListChecks, Award, Calculator, Video, LogOut } from 'lucide-react';
import { ScholarPathLogo } from './ScholarPathLogo';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const tabs = [
    { id: 'readiness', label: 'Dashboard', icon: BarChart3 },
    { id: 'docstudio', label: 'Documents', icon: FileCheck },
    { id: 'universities', label: 'Universities', icon: Compass },
    { id: 'simplifier', label: 'Simplifier', icon: FileText },
    { id: 'checklist', label: 'Timeline', icon: ListChecks },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'visa', label: 'Visa Prep', icon: Video },
  ];

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/');
  };

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

      <div className="hidden lg:flex items-center h-full cursor-pointer pr-8 border-r border-[var(--color-border)] mr-6" onClick={() => setActiveTab('readiness')}>
        <ScholarPathLogo variant="full" className="scale-[0.85] origin-left" />
      </div>

      <div className="hidden lg:flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none h-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-3 h-[42px] text-[13px] font-medium transition-colors rounded-lg cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-subtle)] font-semibold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
              }`}
            >
              <Icon className={`w-[16px] h-[16px] transition-transform duration-200 ${isActive ? 'text-[var(--color-brand)]' : 'opacity-70'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 lg:hidden"></div>

      <div className="flex items-center gap-3 shrink-0">

        
        <button
          onClick={toggleTheme}
          aria-label="Toggle Day/Night Theme"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="w-9 h-9 rounded-full bg-[var(--color-surface-secondary)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center justify-center transition-colors border border-[var(--color-border)] cursor-pointer overflow-hidden relative"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex items-center justify-center"
              >
                <Sun className="w-4 h-4 text-amber-400" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex items-center justify-center"
              >
                <Moon className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          aria-label="User Profile"
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border border-[var(--color-border)] ${activeTab === 'profile' ? 'bg-[var(--color-brand)] text-white' : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'}`}
        >
          <User className="w-4 h-4" />
        </button>

        <button 
          onClick={handleLogout}
          aria-label="Sign Out"
          title="Sign Out"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
