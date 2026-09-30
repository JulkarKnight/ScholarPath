import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, CircleCheck, TriangleAlert, ArrowRight, RefreshCw, FileText, GraduationCap, BookOpen, Printer, Copy, Check, Clock, FileCheck, Compass, BarChart
} from 'lucide-react';
import { Country, ApplicationReadinessResponse } from '../types';
import { PrintModal } from './PrintModal';
import { AiMarkdown } from './AiMarkdown';

interface ReadinessScoreTabProps {
  selectedCountry: string;
  onNavigateToTab: (tab: string) => void;
}

export const ReadinessScoreTab: React.FC<ReadinessScoreTabProps> = ({
  selectedCountry,
  onNavigateToTab,
}) => {
  const [cgpa, setCgpa] = useState<number>(3.65);
  const [cgpaScale, setCgpaScale] = useState<number>(4.0);
  const [ieltsScore, setIeltsScore] = useState<number>(7.0);
  const [targetCountry, setTargetCountry] = useState<Country>(
    (selectedCountry !== 'All' ? selectedCountry : 'Canada') as Country
  );
  const [targetDegree, setTargetDegree] = useState<'Bachelors' | 'Masters' | 'PhD'>('Masters');
  const [targetMajor, setTargetMajor] = useState<string>('Computer Science & Engineering');
  const [sopDraftText, setSopDraftText] = useState<string>(
    'I completed my Bachelor of Science in CSE with a thesis on machine learning for medical imaging. I want to pursue my Master\'s at U of T under Prof. Smith to deepen my knowledge in distributed AI architectures.'
  );
  const [cvSummaryText, setCvSummaryText] = useState<string>(
    '1.5 years software developer experience at local IT firm. 1 conference paper published at IEEE IEEE-R10. Good experience in Python, PyTorch, C++.'
  );
  const [bankSolvencyBDT, setBankSolvencyBDT] = useState<number>(3500000);
  const [hasExp, setHasExp] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ApplicationReadinessResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleCopySummary = () => {
    if (!result) return;
    const summaryText = `ScholarPath AI Readiness Assessment Report\nTarget: ${targetDegree} in ${targetMajor} (${targetCountry})\nReadiness Score: ${result.overallScorePercent}% (${result.readinessLevelText})\n\nStrengths:\n${result.strengths.map(s => `• ${s}`).join('\n')}\n\nGaps:\n${result.criticalGaps.map(g => `• ${g}`).join('\n')}\n\nMentor Verdict:\n${result.mentorSummaryBn}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleQuickPreset = () => {
    setCgpa(3.82);
    setIeltsScore(7.5);
    setTargetCountry('Canada');
    setTargetDegree('Masters');
    setTargetMajor('Computer Science');
    setSopDraftText(
      'During my undergrad research at BUET, I developed a lightweight neural network for edge computing. My long term career goal is to return to Bangladesh as a university faculty after mastering cloud AI infrastructure at U of T.'
    );
    setCvSummaryText(
      'CGPA 3.82/4.00, Dean List awardee, 2 research publications in Springer, 2 years full-time backend engineer experience.'
    );
    setBankSolvencyBDT(4200000);
    setHasExp(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('jwt_token');
      const res = await fetch('/api/ai/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          cgpa,
          cgpaScale,
          ieltsScore,
          targetCountry,
          targetMajor,
          targetDegree,
          sopDraftText,
          cvSummaryText,
          bankSolvencyBDT,
          hasWorkOrResearchExp: hasExp,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Evaluation failed');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during evaluation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
      
      {/* 1. SaaS Dashboard Header & Metrics */}
      <div className="mb-10">
        <h1 className="text-[32px] sm:text-[40px] font-extrabold text-[var(--color-text-primary)] tracking-tight">
          {greeting}, Student.
        </h1>
        <p className="text-[var(--color-text-secondary)] text-[16px] mt-2">
          Your application journey is <span className="font-bold text-[var(--color-brand)]">68%</span> complete.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25, delay: 0 }}
            className="sp-card p-5 cursor-pointer max-w-sm"
            onClick={() => {
              const el = document.getElementById('readiness-form-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[var(--color-text-secondary)] text-[13px] font-medium uppercase tracking-wider">Readiness Score</span>
              <BarChart className="w-5 h-5 text-[var(--color-brand)] opacity-80" />
            </div>
            <div className="text-[28px] font-bold text-[var(--color-text-primary)]">{result ? `${result.overallScorePercent}%` : '--'}</div>
          </motion.div>
        </div>
      </div>

      <div id="readiness-form-section" className="flex items-center justify-between scroll-mt-6">
        <h2 className="text-[22px] font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          AI-Powered Readiness Analysis
          <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
        </h2>
        <button
          type="button"
          onClick={handleQuickPreset}
          className="text-[13px] text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] font-medium transition-colors"
        >
          Load Profile Example
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="sp-card p-6 space-y-6">
            <h3 className="text-[16px] font-semibold border-b border-[var(--color-border)] pb-3 flex items-center gap-2 text-[var(--color-text-primary)]">
              <GraduationCap className="w-4 h-4 text-[var(--color-text-secondary)]" /> Academic Profile
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="sp-label">Current CGPA</label>
                <input type="number" step="0.01" className="sp-input" value={cgpa} onChange={e => setCgpa(Number(e.target.value))} required />
              </div>
              <div>
                <label className="sp-label">Out of (Scale)</label>
                <input type="number" step="0.1" className="sp-input" value={cgpaScale} onChange={e => setCgpaScale(Number(e.target.value))} required />
              </div>
            </div>

            <div>
              <label className="sp-label">IELTS / TOEFL (Equivalent)</label>
              <input type="number" step="0.5" className="sp-input" value={ieltsScore} onChange={e => setIeltsScore(Number(e.target.value))} />
            </div>

            <h3 className="text-[16px] font-semibold border-b border-[var(--color-border)] pb-3 mt-8 flex items-center gap-2 text-[var(--color-text-primary)]">
              <BookOpen className="w-4 h-4 text-[var(--color-text-secondary)]" /> Target Program
            </h3>

            <div>
              <label className="sp-label">Target Degree</label>
              <select className="sp-input" value={targetDegree} onChange={e => setTargetDegree(e.target.value as any)}>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            
            <div>
              <label className="sp-label">Target Major / Research Area</label>
              <input type="text" className="sp-input" value={targetMajor} onChange={e => setTargetMajor(e.target.value)} required />
            </div>

            <div>
              <label className="sp-label">Preferred Country</label>
              <select className="sp-input" value={targetCountry} onChange={e => setTargetCountry(e.target.value as Country)}>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <h3 className="text-[16px] font-semibold border-b border-[var(--color-border)] pb-3 mt-8 flex items-center gap-2 text-[var(--color-text-primary)]">
              <FileText className="w-4 h-4 text-[var(--color-text-secondary)]" /> Experience & Financials
            </h3>

            <div>
              <label className="sp-label">Available Bank Solvency (in BDT)</label>
              <div className="relative">
                <span className="absolute left-3 top-[11px] text-[var(--color-text-secondary)] font-medium">৳</span>
                <input type="number" className="sp-input pl-8" value={bankSolvencyBDT} onChange={e => setBankSolvencyBDT(Number(e.target.value))} />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[var(--color-surface-secondary)] p-3 rounded-lg border border-[var(--color-border)]">
              <input type="checkbox" id="hasExp" checked={hasExp} onChange={e => setHasExp(e.target.checked)} className="w-4 h-4 text-[var(--color-brand)] rounded border-[var(--color-border)]" />
              <label htmlFor="hasExp" className="text-sm text-[var(--color-text-primary)] font-medium cursor-pointer">I have Work / Research Experience</label>
            </div>

            <button type="submit" disabled={loading} className="sp-btn sp-btn-primary w-full mt-4 h-[44px]">
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  Analyze Readiness <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="w-full space-y-6">
          {!result && !loading && !error && (
            <div className="border border-[var(--color-border)] rounded-2xl flex flex-col items-center justify-center p-12 text-center bg-[var(--color-surface)] shadow-sm">
              <div className="w-16 h-16 bg-[var(--color-brand-subtle)] rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[var(--color-brand)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Ready to evaluate your profile?</h3>
              <p className="text-[var(--color-text-secondary)] max-w-sm">Fill in your academic details on the left, and our AI mentor will predict your admission chances and provide actionable advice.</p>
            </div>
          )}

          {error && (
            <div className="bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 p-4 rounded-xl flex items-start gap-3">
              <TriangleAlert className="w-5 h-5 text-[var(--color-danger)] shrink-0 mt-0.5" />
              <p className="text-[var(--color-danger)] text-sm">{error}</p>
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="sp-card overflow-hidden">
                <div className="bg-[var(--color-brand)] p-6 sm:p-8 text-white relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-surface)]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      {/* Animated Circular Score Gauge */}
                      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                          <circle
                            cx="40"
                            cy="40"
                            r="34"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="7"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="34"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 34}
                            initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                            animate={{
                              strokeDashoffset:
                                2 * Math.PI * 34 * (1 - Math.min(100, Math.max(0, result.overallScorePercent)) / 100),
                            }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </svg>
                        <span className="absolute text-lg font-extrabold text-white">
                          {result.overallScorePercent}%
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xs uppercase tracking-widest font-semibold text-white/80 mb-1">Overall AI Prediction</h2>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-extrabold">{result.overallScorePercent}%</span>
                          <span className="text-base font-medium text-white/90">Readiness</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[var(--color-surface)]/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-center min-w-[140px]">
                      <div className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">Status</div>
                      <div className="text-xl font-bold capitalize">{result.readinessLevelText.replace('_', ' ')}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-base font-bold flex items-center gap-2 mb-4 text-[var(--color-text-primary)]">
                        <CircleCheck className="w-5 h-5 text-[var(--color-success)]" /> Core Strengths
                      </h3>
                      <ul className="space-y-3">
                        {result.strengths.map((str, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: 0.15 + idx * 0.08 }}
                            className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] mt-1.5 shrink-0" />
                            {str}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-base font-bold flex items-center gap-2 mb-4 text-[var(--color-text-primary)]">
                        <TriangleAlert className="w-5 h-5 text-[var(--color-danger)]" /> Critical Gaps
                      </h3>
                      <ul className="space-y-3">
                        {result.criticalGaps.length > 0 ? (
                          result.criticalGaps.map((gap, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.25, delay: 0.25 + idx * 0.08 }}
                              className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-danger)] mt-1.5 shrink-0" />
                              {gap}
                            </motion.li>
                          ))
                        ) : (
                          <li className="text-sm text-[var(--color-text-secondary)]">No critical gaps identified! Great profile.</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--color-border)]">
                    <h3 className="text-base font-bold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--color-brand)]" />
                      Mentor Verdict (Bangla)
                    </h3>
                    <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border)] p-5 rounded-xl">
                      <AiMarkdown className="text-[var(--color-text-primary)] leading-relaxed text-[15px]">{result.mentorSummaryBn}</AiMarkdown>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button onClick={() => setShowPrintModal(true)} className="sp-btn sp-btn-secondary h-10 px-4">
                      <Printer className="w-4 h-4" /> Print Report
                    </button>
                    <button onClick={handleCopySummary} className="sp-btn sp-btn-secondary h-10 px-4">
                      {copiedSummary ? <Check className="w-4 h-4 text-[var(--color-success)]" /> : <Copy className="w-4 h-4" />}
                      {copiedSummary ? 'Copied!' : 'Copy Summary'}
                    </button>
                    <button onClick={() => onNavigateToTab('universities')} className="sp-btn sp-btn-primary h-10 px-5 ml-auto text-sm">
                      Find Universities <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {showPrintModal && result && (
        <PrintModal
          onClose={() => setShowPrintModal(false)}
          title="ScholarPath AI - Readiness Assessment"
        >
          <div className="space-y-6">
             <div className="flex items-center justify-between border-b pb-4">
               <div>
                 <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Application Profile</h2>
                 <p className="text-[var(--color-text-secondary)]">Target: {targetDegree} in {targetMajor} ({targetCountry})</p>
               </div>
               <div className="text-right">
                 <div className="text-3xl font-extrabold text-blue-600">{result.overallScorePercent}%</div>
                 <div className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase">{result.readinessLevelText.replace('_', ' ')}</div>
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-2 border-b pb-1">Strengths</h3>
                  <ul className="list-disc pl-5 text-sm text-[var(--color-text-primary)] space-y-1">
                    {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-2 border-b pb-1">Critical Gaps</h3>
                  <ul className="list-disc pl-5 text-sm text-[var(--color-text-primary)] space-y-1">
                    {result.criticalGaps.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
             </div>
             
             <div>
               <h3 className="font-bold text-[var(--color-text-primary)] mb-2 border-b pb-1">AI Mentor Summary</h3>
               <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{result.mentorSummaryBn}</p>
             </div>
          </div>
        </PrintModal>
      )}
    </div>
  );
};
