import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, FileCheck, MessageSquare } from 'lucide-react';
import { Footer } from './Footer';
import { ScholarPathLogo } from './ScholarPathLogo';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-brand-subtle)]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[var(--color-surface)]/85 dark:bg-[#0B1F3A]/85 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <ScholarPathLogo variant="full" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (document.documentElement.classList.contains('dark')) {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                }
                window.dispatchEvent(new Event('themechange'));
              }}
              className="w-9 h-9 rounded-full bg-[var(--color-surface-secondary)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] flex items-center justify-center transition-colors border border-[var(--color-border)]"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <Link to="/login" className="text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="sp-btn sp-btn-primary">
              <span>Start Your Journey</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Expanded Hero Section */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-start"
            >
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-wider uppercase text-[var(--color-brand)] bg-[var(--color-brand-subtle)] px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Study Abroad Platform
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[48px] sm:text-[64px] font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-[-0.02em]"
            >
              Your path to <span className="text-[var(--color-brand)]">higher education abroad.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[var(--color-text-secondary)] text-[18px] leading-relaxed max-w-xl"
            >
              Assess your readiness, discover universities, prepare your documents, and navigate your application journey with AI.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-2"
            >
              <Link to="/register" className="sp-btn sp-btn-primary h-12 px-8 shadow-lg shadow-[var(--color-brand-subtle)]">
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/register" className="sp-btn sp-btn-secondary h-12 px-8">
                <span>Explore Universities</span>
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:flex items-center justify-center relative h-[500px]">
            {/* Soft background glows */}
            <div className="absolute inset-0 bg-[var(--color-brand-subtle)] blur-[120px] rounded-full opacity-60" />
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[var(--color-accent)] blur-[120px] rounded-full opacity-20" />
            
            {/* Abstract orbital rings */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] border border-[var(--color-border)] rounded-full border-dashed opacity-50" 
            />
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[280px] h-[280px] border border-[var(--color-brand-muted)] rounded-full opacity-20" 
            />
            
            {/* Central Logo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="bg-[var(--color-surface)] p-10 rounded-[32px] shadow-2xl border border-[var(--color-border)] relative">
                <div className="scale-[2.5] m-8">
                  <ScholarPathLogo variant="icon" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sp-card-elevated p-8">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] flex items-center justify-center mb-6">
              <Compass className="w-6 h-6 text-[var(--color-brand)]" />
            </div>
            <h3 className="text-xl font-bold mb-3">University Explorer</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">Discover top universities across the globe, filtered strictly by your desired intake, requirements, and budget constraints.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="sp-card-elevated p-8">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] flex items-center justify-center mb-6">
              <FileCheck className="w-6 h-6 text-[var(--color-brand)]" />
            </div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              Document Studio 
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">Let AI audit your Statement of Purpose and resume. Get instant feedback on grammar, impact, and readiness.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="sp-card-elevated p-8">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-subtle)] flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-[var(--color-brand)]" />
            </div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              Visa Mock Interviews
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">Practice with our interactive AI Visa Officer. Receive live transcripts, confidence scores, and instant feedback.</p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
