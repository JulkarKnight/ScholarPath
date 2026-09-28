import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('readiness');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [chatInitialMsg, setChatInitialMsg] = useState<string | undefined>(undefined);

  const handleNavigateToChat = (msg?: string) => {
    if (msg) setChatInitialMsg(msg);
    setActiveTab('chat');
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
      case 'chat':
        return <ChatWidget initialPrompt={chatInitialMsg} />;
      default:
        return <ReadinessScoreTab selectedCountry={selectedCountry} onNavigateToTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#111827] font-sans flex flex-col">
      <Header
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'readiness' && (
            <HeroBanner
              onStartClick={() => setActiveTab('readiness')}
              onExploreClick={() => setActiveTab('universities')}
            />
          )}

          <main className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="w-full"
              >
                {renderActiveTab()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
