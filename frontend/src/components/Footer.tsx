import React from 'react';
import { ScholarPathLogo } from './ScholarPathLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ScholarPathLogo variant="icon" className="scale-[0.7] transform origin-left" />
          <span className="font-semibold text-sm text-[var(--color-text-primary)]">
            ScholarPath<span className="text-[var(--color-brand)]">AI</span>
          </span>
          <span className="text-[var(--color-text-tertiary)] text-sm ml-2">© {new Date().getFullYear()}</span>
        </div>
        
        <div className="flex gap-6 text-sm text-[var(--color-text-secondary)]">
          <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};
