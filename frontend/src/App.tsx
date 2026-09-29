import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { ReadinessScoreTab } from './components/ReadinessScoreTab';
import { DocumentStudioTab } from './components/DocumentStudioTab';
import { UniversityExplorerTab } from './components/UniversityExplorerTab';
import { WebsiteSimplifierTab } from './components/WebsiteSimplifierTab';
import { ScholarshipFinderTab } from './components/ScholarshipFinderTab';
import { TimelineChecklistTab } from './components/TimelineChecklistTab';
import { CostCalculatorTab } from './components/CostCalculatorTab';
import { VisaPracticeTab } from './components/VisaPracticeTab';
import { ChatWidget } from './components/ChatWidget';
import { UserProfileTab } from './components/UserProfileTab';
import { ChatbotLogo } from './components/ChatbotLogo';

const VALID_TABS = new Set([
  'readiness',
  'docstudio',
  'universities',
  'simplifier',
  'checklist',
  'scholarships',
  'calculator',
  'visa',
  'profile',
]);

export default function App() {
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tab && VALID_TABS.has(tab) ? tab : 'readiness';

  const setActiveTab = (newTab: string) => {
    if (newTab === 'chat') {
      setIsChatOpen(true);
      return;
    }
    navigate(`/app/${newTab}`);
  };

  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [chatInitialMsg, setChatInitialMsg] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, { replace: true });
      return;
    }
    if (tab && !VALID_TABS.has(tab)) {
      navigate('/app/readiness', { replace: true });
      return;
    }
    fetch('/api/profile').then((res) => {
      if (!res.ok) {
        localStorage.removeItem('jwt_token');
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, { replace: true });
      }
    }).catch(() => {});
  }, [navigate, location.pathname, tab]);

  const handleNavigateToChat = (msg?: string) => {
    if (msg) setChatInitialMsg(msg);
    setIsChatOpen(true);
  };

  const handleScrollToForm = () => {
    const el = document.getElementById('readiness-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'readiness':
        return <ReadinessScoreTab selectedCountry={selectedCountry} onNavigateToTab={setActiveTab} />;
      case 'docstudio':
        return <DocumentStudioTab selectedCountry={selectedCountry} />;
      case 'universities':
        return <UniversityExplorerTab selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} onNavigateToChat={handleNavigateToChat} />;
      case 'simplifier':
        return <WebsiteSimplifierTab />;
      case 'checklist':
        return <TimelineChecklistTab selectedCountry={selectedCountry} />;
      case 'scholarships':
        return <ScholarshipFinderTab selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />;
      case 'calculator':
        return <CostCalculatorTab />;
      case 'visa':
        return <VisaPracticeTab selectedCountry={selectedCountry} />;
      case 'profile':
        return <UserProfileTab />;
      default:
        return <ReadinessScoreTab selectedCountry={selectedCountry} onNavigateToTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] font-sans overflow-hidden relative">
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {activeTab === 'readiness' && (
              <HeroBanner
                onStartClick={handleScrollToForm}
                onExploreClick={() => setActiveTab('universities')}
              />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="w-full min-h-[500px]"
              >
                {renderActiveTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Floating AI Mentor Capsule Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsChatOpen(true)}
          className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 h-16 max-w-[64px] hover:max-w-[230px] rounded-full bg-gradient-to-r from-[#3B8BFF] to-[#1259E0] text-white shadow-xl shadow-blue-500/25 flex items-center p-1.5 hover:pr-5 border-[3px] border-[var(--color-surface)] transition-all duration-300 ease-out overflow-hidden cursor-pointer"
          title="Open AI Mentor"
        >
          <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center shrink-0">
            <ChatbotLogo size={46} />
          </div>
          <div className="flex flex-col items-start overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 ml-0 group-hover:ml-2.5 transition-all duration-300 ease-out">
            <span className="text-[14px] font-bold leading-tight tracking-tight text-white">
              AI Mentor
            </span>
            <span className="text-[11px] font-medium text-white/80 leading-tight">
              Ask me anything
            </span>
          </div>
        </motion.button>
      )}

      {/* Floating Chat Popover */}
      <AnimatePresence>
        <ChatWidget 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          initialPrompt={chatInitialMsg} 
        />
      </AnimatePresence>
    </div>
  );
}
