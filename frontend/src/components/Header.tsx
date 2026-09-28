import React from 'react';
import {
  GraduationCap,
  Globe,
  BarChart3,
  FileCheck,
  Compass,
  FileText,
  ListChecks,
  Award,
  Calculator,
  Video,
  MessageSquare,
} from 'lucide-react';

interface HeaderProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
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
  { id: 'chat', label: 'AI Mentor', icon: MessageSquare },
];

export const Header: React.FC<HeaderProps> = ({
  selectedCountry,
  setSelectedCountry,
  activeTab,
  setActiveTab,
}) => {
  const countries = ['All', 'Canada', 'Germany', 'USA', 'UK', 'Australia', 'Finland', 'Sweden'];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      {/* Top Tier: Brand + Controls */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-[56px]">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('readiness')}>
          <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white shadow-sm">
            <GraduationCap className="w-[18px] h-[18px]" />
          </div>
          <span className="font-semibold text-[15px] text-[#111827] tracking-[-0.01em]">
            ScholarPath<span className="text-[#0066FF] ml-0.5">AI</span>
          </span>
        </div>

        {/* Country Filter */}
        <div className="flex items-center gap-2 bg-[#F7F8FA] hover:bg-[#F0F1F3] border border-black/[0.06] rounded-lg px-3 py-[7px] transition-all duration-150 cursor-pointer">
          <Globe className="w-[14px] h-[14px] text-[#6B7280]" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-transparent text-[#374151] text-[13px] font-medium focus:outline-none cursor-pointer appearance-none pr-1"
          >
            {countries.map((c) => (
              <option key={c} value={c} className="bg-white text-[#111827]">
                {c === 'All' ? 'All Regions' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom Tier: Navigation tabs */}
      <nav className="flex items-center gap-0.5 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-all duration-150 cursor-pointer rounded-md ${
                isActive
                  ? 'text-[#0066FF]'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA]'
              }`}
            >
              <Icon className="w-[15px] h-[15px]" />
              <span>{tab.label}</span>
              {/* Active indicator — pill underline */}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0066FF] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
