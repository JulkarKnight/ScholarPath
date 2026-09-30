import React, { useState } from 'react';
import { FileText, Sparkles, RefreshCw, CircleCheck, Clock, Lightbulb, Copy, Check } from 'lucide-react';
import { SimplifierResponse } from '../types';
import { AiMarkdown } from './AiMarkdown';

export const WebsiteSimplifierTab: React.FC = () => {
  const [rawText, setRawText] = useState<string>(
    'Applicants must submit official sealed academic transcripts from all post-secondary institutions attended, a well-articulated statement of purpose detailing research alignment with departmental faculty, proof of English proficiency (minimum overall IELTS 7.0 with no individual band below 6.5), two academic letters of recommendation on official institutional letterhead, and evidence of sufficient liquid financial resources covering full tuition and living expenses for the first year of study.'
  );
  const [targetCountry, setTargetCountry] = useState<string>('Canada');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SimplifierResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const samplePresets = [
    {
      label: 'Complex Admission Requirements',
      text: 'Applicants must submit official sealed academic transcripts from all post-secondary institutions attended, a well-articulated statement of purpose detailing research alignment with departmental faculty, proof of English proficiency (minimum overall IELTS 7.0 with no individual band below 6.5), two academic letters of recommendation on official institutional letterhead, and evidence of sufficient liquid financial resources covering full tuition and living expenses for the first year of study.',
    },
    {
      label: 'German Blocked Account & Visa',
      text: 'International students from non-EU/EEA countries who wish to study in Germany must demonstrate adequate financial resources for their stay. From 2024 onwards, the required annual amount deposited into a German blocked account (Sperrkonto) is €11,904 (€992 per month). You must present the official confirmation certificate issued by an accredited financial service provider such as Expatrio or Fintiba at your student visa appointment.',
    },
    {
      label: 'US F-1 SEVIS & Financial Proof',
      text: 'To issue an Form I-20, the international student services office requires documented proof of liquid funds equal to or exceeding the estimated cost of attendance for one academic year ($48,500). Acceptable forms include bank statements less than 3 months old, official scholarship award letters, or approved educational loan approval certificates.',
    },
  ];

  const handleSimplify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('jwt_token');
      const res = await fetch('/api/ai/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ rawText, targetCountry }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Simplification failed');
      }

      const data: SimplifierResponse = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error simplifying content.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const fullContent = `আপনার যা লাগবে:\n${result.requiredDocuments.map(d => `${d}`).join('\n')}\n\nসহজ ব্যাখ্যা:\n${result.simplifiedBn}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header */}
      <div className="sp-card p-6 space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-[var(--color-brand)]" />
          <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em]">
            Website Simplifier
          </h2>
        </div>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          ভার্সিটি বা এম্বাসির জটিল ইংরেজি লেখা পেস্ট করুন — AI সহজ বাংলায় বুলেট করে দেবে।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleSimplify} className="lg:col-span-6 sp-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[var(--color-brand)]" />
              Paste text to simplify
            </label>
            <select
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              className="sp-input w-auto text-[12px] py-1.5 px-2.5 cursor-pointer"
            >
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="General">General</option>
            </select>
          </div>

          <textarea
            rows={8}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste university admission criteria, scholarship rules, or visa guidelines..."
            className="sp-input font-mono text-[12px] leading-relaxed resize-none"
            required
          />

          {/* Presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wider">Sample Presets</span>
            <div className="flex flex-wrap gap-2">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setRawText(preset.text)}
                  className="sp-btn sp-btn-ghost text-[11px] rounded-lg border border-[var(--color-border)] hover:border-black/[0.12]"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !rawText.trim()}
            className="sp-btn sp-btn-primary w-full py-3 text-[13px] disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>সহজ করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>বাংলায় সহজ করে বুঝিয়ে দিন</span>
              </>
            )}
          </button>
        </form>

        {/* Output */}
        <div className="lg:col-span-6 space-y-4">
          {error && (
            <div className="sp-card bg-[var(--color-danger)]/[0.04] border-[#EF4444]/[0.15] p-4 text-[var(--color-danger)] text-[13px]">
              {error}
            </div>
          )}

          {!result && !loading && (
            <div className="sp-card p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand)]/[0.06] flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-[var(--color-brand)]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">
                সহজ বাংলা আউটপুট এখানে আসবে
              </h3>
              <p className="text-[#9CA3AF] text-[12px]">
                জটিল ইংরেজি পেস্ট করে বাটন চাপলেই AI বুলেট পয়েন্ট ও ডেডলাইন আলাদা করে দেবে।
              </p>
            </div>
          )}

          {loading && (
            <div className="sp-card p-14 text-center space-y-3">
              <div className="w-8 h-8 border-[3px] border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[var(--color-brand)] font-medium text-[13px]">সহজীকরণ করা হচ্ছে...</p>
            </div>
          )}

          {result && !loading && (
            <div className="sp-card-elevated p-6 space-y-5">
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <div></div>
                <button
                  onClick={handleCopy}
                  className="sp-btn sp-btn-ghost text-[12px] border border-[var(--color-border)]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[var(--color-success)]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Required Documents */}
              <div className="bg-[var(--color-surface-secondary)] border border-black/[0.04] p-4 rounded-xl space-y-2.5">
                <h4 className="font-semibold text-[13px] text-[var(--color-brand)] flex items-center gap-2">
                  <CircleCheck className="w-4 h-4" />
                  আপনার যা যা লাগবে
                </h4>
                <ul className="space-y-1.5">
                  {result.requiredDocuments.map((doc, i) => (
                    <li key={i} className="text-[12px] text-[#374151] bg-[var(--color-surface)] p-2.5 rounded-lg border border-black/[0.04] flex items-start gap-2">
                      <CircleCheck className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simplified Explanation */}
              <div>
                <h4 className="font-semibold text-[13px] text-[var(--color-text-primary)] mb-2">সহজ বাংলা ব্যাখ্যা</h4>
                <AiMarkdown className="text-[12px] text-[var(--color-text-secondary)] bg-[var(--color-surface-secondary)] border border-black/[0.04] p-4 rounded-xl leading-relaxed">
                  {result.simplifiedBn}
                </AiMarkdown>
              </div>

              {/* Deadlines */}
              {result.importantDeadlines.length > 0 && (
                <div className="bg-[var(--color-warning)]/[0.04] border border-[#F59E0B]/[0.15] p-4 rounded-xl space-y-2">
                  <h4 className="font-semibold text-[12px] text-[var(--color-warning)] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    জরুরি ডেডলাইন
                  </h4>
                  <ul className="list-disc pl-5 text-[12px] text-[var(--color-text-secondary)] space-y-1">
                    {result.importantDeadlines.map((dl, i) => (
                      <li key={i}>{dl}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tips */}
              <div className="bg-[var(--color-brand)]/[0.03] border border-[#0066FF]/[0.1] p-4 rounded-xl space-y-2">
                <h4 className="font-semibold text-[12px] text-[var(--color-brand)] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  AI Tips
                </h4>
                <ul className="space-y-1.5 text-[12px] text-[var(--color-text-secondary)]">
                  {result.actionTipsBn.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-brand)] font-bold shrink-0">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
