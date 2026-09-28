import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, CheckCircle2, Zap, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onStartClick: () => void;
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onStartClick, onExploreClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="sp-card-elevated p-8 sm:p-10 mb-8 overflow-hidden relative"
    >
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#0066FF]/[0.04] via-transparent to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[#10B981]/[0.03] via-transparent to-transparent rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2">
            <span className="sp-badge bg-[#0066FF]/[0.08] text-[#0066FF] border border-[#0066FF]/[0.12]">
              <Sparkles className="w-3 h-3" />
              AI-Powered Platform
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[34px] font-bold text-[#111827] leading-[1.2] tracking-[-0.02em]">
            Your complete toolkit for
            <span className="text-[#0066FF]"> higher education abroad</span>
          </h1>

          <p className="text-[#6B7280] text-[15px] leading-relaxed max-w-lg">
            Analyze academic readiness, explore universities, simplify policies with AI, and generate application documents — all in one workspace.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={onStartClick}
              className="sp-btn sp-btn-primary"
            >
              <span>Analyze Readiness</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreClick}
              className="sp-btn sp-btn-secondary"
            >
              Explore Universities
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 hidden lg:block">
          <div className="bg-[#F7F8FA] border border-black/[0.06] rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-black/[0.06]">
              <div className="w-8 h-8 rounded-lg bg-[#0066FF]/[0.08] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
              </div>
              <span className="font-semibold text-[#111827] text-sm">System Status</span>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Document Audit', status: 'Operational', icon: CheckCircle2, color: '#10B981' },
                { label: 'Knowledge Base', status: 'Updated', icon: CheckCircle2, color: '#10B981' },
                { label: 'University Data', status: 'Live', icon: Zap, color: '#0066FF' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[13px] text-[#6B7280]">{item.label}</span>
                  <span className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: item.color }}>
                    <item.icon className="w-3.5 h-3.5" />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
