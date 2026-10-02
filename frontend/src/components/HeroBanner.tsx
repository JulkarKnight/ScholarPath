import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, CircleCheck, Zap, Sparkles } from 'lucide-react';

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

      <div className="flex flex-col items-start relative z-10 space-y-5">
          <h1 className="text-[28px] sm:text-[34px] font-bold text-[var(--color-text-primary)] leading-[1.2] tracking-[-0.02em]">
            Your complete toolkit for
            <span className="text-[var(--color-brand)]"> higher education abroad</span>
          </h1>

          <p className="text-[var(--color-text-secondary)] text-[15px] leading-relaxed max-w-lg">
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
    </motion.div>
  );
};
