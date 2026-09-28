import React from 'react';
import {
  BarChart3, FileCheck, Compass, FileText, ListChecks, Award, Calculator, Video, LogOut
} from 'lucide-react';
import { ScholarPathLogo } from './ScholarPathLogo';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

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

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 z-50 h-screen w-[260px] bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-[72px] flex items-center px-6 border-b border-[var(--color-border)] shrink-0 cursor-pointer" onClick={() => setActiveTab('readiness')}>
          <ScholarPathLogo variant="full" className="scale-[0.85] origin-left" />
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-none">
          <div className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-4 px-2">Main Menu</div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium transition-colors rounded-xl ${
                  isActive
                    ? 'text-[var(--color-brand)] bg-[var(--color-brand-subtle)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[var(--color-brand)]' : 'opacity-70'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-[var(--color-border)]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-colors rounded-xl"
          >
            <LogOut className="w-[18px] h-[18px] opacity-70" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
