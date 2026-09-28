import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
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
import { ScholarPathLogo } from './components/ScholarPathLogo';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('readiness');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [chatInitialMsg, setChatInitialMsg] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleNavigateToChat = (msg?: string) => {
    if (msg) setChatInitialMsg(msg);
    setIsChatOpen(true);
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
                onStartClick={() => setActiveTab('readiness')}
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

      {/* Floating AI Mentor Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-16 h-16 rounded-full bg-[var(--color-brand)] text-white shadow-xl shadow-[var(--color-brand-subtle)] flex flex-col items-center justify-center border-4 border-[var(--color-surface)] group overflow-hidden"
          title="Open AI Mentor"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <ScholarPathLogo variant="icon" className="scale-[0.8] mb-0.5" />
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
