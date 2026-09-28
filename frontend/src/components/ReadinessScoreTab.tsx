import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  FileText,
  GraduationCap,
  BookOpen,
  Printer,
  Copy,
  Check
} from 'lucide-react';
import { Country, ApplicationReadinessResponse } from '../types';
import { PrintModal } from './PrintModal';

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
      const res = await fetch('/api/ai/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

      const data: ApplicationReadinessResponse = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while evaluating your application.');
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#0066FF';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header */}
      <div className="sp-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="sp-badge bg-[#0066FF]/[0.06] text-[#0066FF] border border-[#0066FF]/[0.12]">
              <Sparkles className="w-3 h-3" />
              AI-Powered Analysis
            </span>
            <h2 className="text-[18px] font-semibold text-[#111827] tracking-[-0.01em]">
              Application Readiness Score
            </h2>
            <p className="text-[13px] text-[#6B7280]">
              আপনার CGPA, IELTS, SOP, CV এবং ব্যাংক স্টেটমেন্ট এনালাইসিস করে জানুন আপনার চান্স কতটুকু।
            </p>
          </div>

          <button
            onClick={handleQuickPreset}
            type="button"
            className="sp-btn sp-btn-secondary text-[12px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Sample Profile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form (5 cols) */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-5 sp-card p-6 space-y-5"
        >
          <h3 className="text-[14px] font-semibold text-[#111827] pb-3 border-b border-black/[0.06] flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#0066FF]" />
            আবেদনকারীর তথ্য ইনপুট দিন
          </h3>

          {/* Country & Degree */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="sp-label">Target Country</label>
              <select
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value as Country)}
                className="sp-input cursor-pointer"
              >
                {['Canada', 'Germany', 'USA', 'UK', 'Australia', 'Finland', 'Sweden'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="sp-label">Target Degree</label>
              <select
                value={targetDegree}
                onChange={(e) => setTargetDegree(e.target.value as any)}
                className="sp-input cursor-pointer"
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
          </div>

          {/* Major */}
          <div>
            <label className="sp-label">Target Major / Field</label>
            <input
              type="text"
              value={targetMajor}
              onChange={(e) => setTargetMajor(e.target.value)}
              placeholder="e.g. Computer Science, Data Science, MBA"
              className="sp-input"
              required
            />
          </div>

          {/* CGPA & IELTS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="sp-label">CGPA (out of 4.0)</label>
              <input
                type="number"
                step="0.01"
                min="2.0"
                max="4.0"
                value={cgpa}
                onChange={(e) => setCgpa(parseFloat(e.target.value) || 0)}
                className="sp-input"
                required
              />
            </div>
            <div>
              <label className="sp-label">IELTS Score</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="9.0"
                value={ieltsScore}
                onChange={(e) => setIeltsScore(parseFloat(e.target.value) || 0)}
                className="sp-input"
                required
              />
            </div>
          </div>

          {/* SOP */}
          <div>
            <label className="sp-label flex items-center justify-between">
              <span>SOP Draft</span>
              <span className="text-[10px] text-[#9CA3AF] font-normal">Optional</span>
            </label>
            <textarea
              rows={3}
              value={sopDraftText}
              onChange={(e) => setSopDraftText(e.target.value)}
              placeholder="Paste your SOP summary..."
              className="sp-input resize-none"
            />
          </div>

          {/* CV */}
          <div>
            <label className="sp-label">CV / Research Highlights</label>
            <textarea
              rows={2}
              value={cvSummaryText}
              onChange={(e) => setCvSummaryText(e.target.value)}
              placeholder="Work experience, projects, publications..."
              className="sp-input resize-none"
            />
          </div>

          {/* Bank & Experience */}
          <div className="space-y-3">
            <div>
              <label className="sp-label">Bank Balance (BDT)</label>
              <div className="relative">
                <input
                  type="number"
                  step="100000"
                  value={bankSolvencyBDT}
                  onChange={(e) => setBankSolvencyBDT(parseInt(e.target.value) || 0)}
                  className="sp-input pr-28"
                />
                <span className="absolute right-3 top-[11px] text-[10px] text-[#9CA3AF]">
                  ≈ ${Math.round(bankSolvencyBDT / 120).toLocaleString()} USD
                </span>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#6B7280]">
              <input
                type="checkbox"
                checked={hasExp}
                onChange={(e) => setHasExp(e.target.checked)}
                className="rounded border-black/[0.15] text-[#0066FF] focus:ring-[#0066FF] w-4 h-4"
              />
              <span>১ বছর+ প্রাসঙ্গিক জব বা গবেষণা অভিজ্ঞতা আছে</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="sp-btn sp-btn-primary w-full py-3 text-[13px] disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>রেডিনেস স্কোর ক্যালকুলেট করুন</span>
              </>
            )}
          </button>
        </form>

        {/* Results Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {error && (
            <div className="sp-card bg-[#EF4444]/[0.04] border-[#EF4444]/[0.15] p-4 text-[#EF4444] text-[13px]">
              {error}
            </div>
          )}

          {!result && !loading && (
            <div className="sp-card p-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0066FF]/[0.06] flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7 text-[#0066FF]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-[16px] font-semibold text-[#111827]">
                  আপনার Readiness Score দেখতে ফর্মটি পূরণ করুন
                </h3>
                <p className="text-[#9CA3AF] text-[13px] max-w-sm mx-auto">
                  AI আপনার স্কোর, একাডেমি ম্যাচ, ভাষা দক্ষতা, SOP স্ট্রেন্থ ও ব্যাংক সলভেন্সি রিভিউ করবে।
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="sp-card p-14 text-center space-y-4">
              <div className="w-8 h-8 border-[3px] border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[#0066FF] font-medium text-[13px]">
                প্রোফাইল মিলানো হচ্ছে...
              </p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-5">
              {/* Action Bar */}
              <div className="sp-card p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="sp-badge bg-[#10B981]/[0.08] text-[#10B981] border border-[#10B981]/[0.15]">
                    Evaluation Ready
                  </span>
                  <span className="text-[12px] text-[#9CA3AF] hidden sm:inline">
                    {targetDegree} in {targetMajor} · {targetCountry}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySummary}
                    className="sp-btn sp-btn-ghost text-[12px] border border-black/[0.06]"
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="sp-btn sp-btn-primary text-[12px] py-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Report</span>
                  </button>
                </div>
              </div>

              {/* Score Card */}
              <div className="sp-card-elevated p-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Circular Score */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center text-center pb-4 sm:pb-0 sm:pr-4 sm:border-r border-b sm:border-b-0 border-black/[0.06]">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64" cy="64" r="52"
                          stroke="#F0F1F3" strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="64" cy="64" r="52"
                          stroke={scoreColor(result.overallScorePercent)}
                          strokeWidth="8"
                          strokeDasharray={326}
                          strokeDashoffset={326 - (326 * result.overallScorePercent) / 100}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[28px] font-bold text-[#111827]">{result.overallScorePercent}%</span>
                        <span className="text-[10px] uppercase font-semibold text-[#9CA3AF] tracking-wider">Readiness</span>
                      </div>
                    </div>
                    <span className="mt-2 sp-badge bg-[#0066FF]/[0.06] text-[#0066FF] border border-[#0066FF]/[0.12]">
                      {result.readinessLevelText}
                    </span>
                  </div>

                  {/* Progress Bars */}
                  <div className="sm:col-span-7 space-y-4">
                    {[
                      { label: 'Academic Match', value: result.categoryScores.academicMatch, color: '#0066FF' },
                      { label: 'Language Proficiency', value: result.categoryScores.languageProficiency, color: '#06B6D4' },
                      { label: 'SOP & Research', value: result.categoryScores.sopQuality, color: '#8B5CF6' },
                      { label: 'Financial Viability', value: result.categoryScores.financialViability, color: '#10B981' },
                    ].map((bar) => (
                      <div key={bar.label}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-[12px] text-[#6B7280] font-medium">{bar.label}</span>
                          <span className="text-[12px] font-semibold" style={{ color: bar.color }}>{bar.value}%</span>
                        </div>
                        <div className="w-full h-[6px] bg-[#F0F1F3] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${bar.value}%`, backgroundColor: bar.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strengths & Gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="sp-card p-5 space-y-3">
                  <h4 className="font-semibold text-[13px] text-[#10B981] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {result.strengths.map((s, idx) => (
                      <li key={idx} className="text-[12px] text-[#6B7280] bg-[#F7F8FA] p-2.5 rounded-lg border border-black/[0.04]">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sp-card p-5 space-y-3">
                  <h4 className="font-semibold text-[13px] text-[#F59E0B] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Needs Improvement
                  </h4>
                  <ul className="space-y-2">
                    {result.criticalGaps.map((g, idx) => (
                      <li key={idx} className="text-[12px] text-[#6B7280] bg-[#F7F8FA] p-2.5 rounded-lg border border-black/[0.04]">
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Steps */}
              <div className="sp-card p-5 space-y-4">
                <h4 className="font-semibold text-[14px] text-[#111827] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0066FF]" />
                  Recommended Next Steps
                </h4>

                <div className="space-y-2.5">
                  {result.recommendedNextStepsBn.map((step, idx) => (
                    <div key={idx} className="bg-[#F7F8FA] p-3.5 rounded-xl border border-black/[0.04] flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#0066FF]/[0.08] text-[#0066FF] font-semibold flex items-center justify-center shrink-0 text-[11px]">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[12px] text-[#111827]">{step.title}</span>
                          <span
                            className={`sp-badge text-[9px] ${
                              step.priority === 'High'
                                ? 'bg-[#EF4444]/[0.08] text-[#EF4444] border border-[#EF4444]/[0.15]'
                                : step.priority === 'Medium'
                                ? 'bg-[#F59E0B]/[0.08] text-[#F59E0B] border border-[#F59E0B]/[0.15]'
                                : 'bg-[#0066FF]/[0.08] text-[#0066FF] border border-[#0066FF]/[0.15]'
                            }`}
                          >
                            {step.priority}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#6B7280] leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mentor Verdict */}
                <div className="bg-[#0066FF]/[0.04] border border-[#0066FF]/[0.1] p-4 rounded-xl">
                  <span className="font-semibold text-[12px] text-[#0066FF] block mb-1">
                    AI Mentor's Final Verdict:
                  </span>
                  <p className="text-[12px] text-[#6B7280] leading-relaxed italic">"{result.mentorSummaryBn}"</p>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
                  <button
                    onClick={() => onNavigateToTab('docstudio')}
                    className="sp-btn sp-btn-primary text-[12px]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Document Studio</span>
                  </button>
                  <button
                    onClick={() => onNavigateToTab('checklist')}
                    className="sp-btn sp-btn-secondary text-[12px]"
                  >
                    <span>Checklist</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Print Modal */}
      {result && (
        <PrintModal
          isOpen={showPrintModal}
          onClose={() => setShowPrintModal(false)}
          title="Application Readiness Assessment Report"
          subtitle={`Target: ${targetDegree} in ${targetMajor} (${targetCountry})`}
        >
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-700 mb-2">
                Applicant Profile Specifications
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-800">
                <div><span className="text-gray-400 block">Target Country:</span> <strong>{targetCountry}</strong></div>
                <div><span className="text-gray-400 block">Target Degree:</span> <strong>{targetDegree}</strong></div>
                <div><span className="text-gray-400 block">Target Major:</span> <strong>{targetMajor}</strong></div>
                <div><span className="text-gray-400 block">Academic Score:</span> <strong>{cgpa} / {cgpaScale} CGPA</strong></div>
                <div><span className="text-gray-400 block">Language Proficiency:</span> <strong>IELTS {ieltsScore}</strong></div>
                <div><span className="text-gray-400 block">Sponsor Fund:</span> <strong>৳{(bankSolvencyBDT/100000).toFixed(1)} Lakh BDT (~${Math.round(bankSolvencyBDT/120).toLocaleString()} USD)</strong></div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">Readiness Level</span>
                <span className="text-xl font-black text-emerald-950">{result.readinessLevelText}</span>
              </div>
              <div className="text-2xl font-black text-emerald-800 bg-white px-4 py-2 rounded-xl border border-emerald-300">
                {result.overallScorePercent}%
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Evaluation Breakdown</h4>
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <th className="p-2.5 border-r border-slate-200 font-bold">Category</th>
                    <th className="p-2.5 font-bold text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  <tr><td className="p-2.5 border-r border-slate-200">Academic Match</td><td className="p-2.5 font-bold text-right">{result.categoryScores.academicMatch}%</td></tr>
                  <tr><td className="p-2.5 border-r border-slate-200">Language Proficiency</td><td className="p-2.5 font-bold text-right">{result.categoryScores.languageProficiency}%</td></tr>
                  <tr><td className="p-2.5 border-r border-slate-200">SOP & Research Potential</td><td className="p-2.5 font-bold text-right">{result.categoryScores.sopQuality}%</td></tr>
                  <tr><td className="p-2.5 border-r border-slate-200">Financial Viability</td><td className="p-2.5 font-bold text-right">{result.categoryScores.financialViability}%</td></tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-emerald-50/50 border border-emerald-200 p-3.5 rounded-xl">
                <h5 className="font-bold text-emerald-900 mb-2">Key Strengths</h5>
                <ul className="space-y-1 list-disc pl-4 text-slate-800">
                  {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="bg-amber-50/50 border border-amber-200 p-3.5 rounded-xl">
                <h5 className="font-bold text-amber-900 mb-2">Areas for Improvement</h5>
                <ul className="space-y-1 list-disc pl-4 text-slate-800">
                  {result.criticalGaps.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Recommended Next Steps</h4>
              <div className="space-y-2 text-xs">
                {result.recommendedNextStepsBn.map((step, idx) => (
                  <div key={idx} className="border border-slate-200 p-3 rounded-lg bg-slate-50">
                    <span className="font-bold text-slate-900 block">{idx + 1}. {step.title} [{step.priority}]</span>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-950 italic leading-relaxed">
              <strong className="not-italic block font-bold text-emerald-900 mb-1">AI Mentor's Final Verdict:</strong>
              "{result.mentorSummaryBn}"
            </div>
          </div>
        </PrintModal>
      )}
    </div>
  );
};
