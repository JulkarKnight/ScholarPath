import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RefreshCw,
  Printer,
  CheckCircle2
} from 'lucide-react';
import { Country, DocumentCheckitem } from '../types';
import { DEFAULT_DOCUMENT_CHECKLIST } from '../data/dbData';
import { PrintModal } from './PrintModal';

interface TimelineChecklistTabProps {
  selectedCountry: string;
}

export const TimelineChecklistTab: React.FC<TimelineChecklistTabProps> = ({ selectedCountry }) => {
  const [checklist, setChecklist] = useState<DocumentCheckitem[]>(DEFAULT_DOCUMENT_CHECKLIST);
  const [expandedDocId, setExpandedDocId] = useState<string | null>('doc-sop');

  // Timeline states
  const [targetIntake, setTargetIntake] = useState<string>('Fall 2026');
  const [timelineCountry, setTimelineCountry] = useState<Country>(
    (selectedCountry !== 'All' ? selectedCountry : 'Canada') as Country
  );
  const [timelineLoading, setTimelineLoading] = useState<boolean>(false);
  const [generatedTimeline, setGeneratedTimeline] = useState<any[] | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );
  };

  const completedCount = checklist.filter((item) => item.isCompleted).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const handleGenerateTimeline = async () => {
    setTimelineLoading(true);
    try {
      const res = await fetch('/api/ai/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: timelineCountry, targetIntake }),
      });
      const data = await res.json();
      setGeneratedTimeline(data.timeline || []);
    } catch (err) {
      console.error('Error generating timeline:', err);
    } finally {
      setTimelineLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* SECTION 1: TIMELINE GENERATOR */}
      <div className="sp-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-[#0066FF]" />
              <h2 className="text-[18px] font-semibold text-[#111827] tracking-[-0.01em]">
                Timeline Generator
              </h2>
            </div>
            <p className="text-[13px] text-[#6B7280]">
              আপনার টার্গেট সেমিস্টার অনুযায়ী মাসভিত্তিক অ্যাকশন প্ল্যান তৈরি করুন।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={timelineCountry}
              onChange={(e) => setTimelineCountry(e.target.value as Country)}
              className="sp-input w-auto text-[12px] py-1.5 px-3 cursor-pointer"
            >
              {['Canada', 'Germany', 'USA', 'UK', 'Australia', 'Finland', 'Sweden'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={targetIntake}
              onChange={(e) => setTargetIntake(e.target.value)}
              className="sp-input w-auto text-[12px] py-1.5 px-3 cursor-pointer"
            >
              <option value="Fall 2026">Fall 2026</option>
              <option value="Spring 2027">Spring 2027</option>
              <option value="Fall 2027">Fall 2027</option>
            </select>
            <button
              onClick={handleGenerateTimeline}
              disabled={timelineLoading}
              className="sp-btn sp-btn-primary py-1.5 px-3 text-[12px]"
            >
              {timelineLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>রোডম্যাপ তৈরি করুন</span>
            </button>
          </div>
        </div>

        {/* Timeline Visualization */}
        {generatedTimeline ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {generatedTimeline.map((phase: any, idx: number) => (
              <div key={idx} className="bg-[#F7F8FA] border border-black/[0.04] rounded-xl p-4 space-y-2 relative">
                <div className="w-6 h-6 rounded-full bg-[#0066FF]/[0.08] text-[#0066FF] font-semibold flex items-center justify-center text-[11px]">
                  {idx + 1}
                </div>
                <h4 className="font-semibold text-[#111827] text-[13px]">{phase.phaseName}</h4>
                <span className="text-[10px] text-[#0066FF] font-medium bg-[#0066FF]/[0.06] border border-[#0066FF]/[0.12] px-2 py-0.5 rounded-md inline-block">
                  {phase.monthsRange}
                </span>
                <ul className="space-y-1.5 text-[11px] text-[#6B7280] pt-1">
                  {phase.tasksBn.map((task: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#0066FF] font-bold">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-3 min-w-[700px]">
              {[
                { step: '1', name: 'IELTS Prep', time: '12 Months Before' },
                { step: '2', name: 'SOP & Shortlisting', time: '9 Months Before' },
                { step: '3', name: 'University App', time: '6 Months Before' },
                { step: '4', name: 'Offer & Funds', time: '4 Months Before' },
                { step: '5', name: 'Visa & Flight', time: '2 Months Before' },
              ].map((s, idx) => (
                <div key={idx} className="flex-1 bg-[#F7F8FA] border border-black/[0.04] rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#0066FF]/[0.08] text-[#0066FF] font-semibold text-[10px] flex items-center justify-center">
                      {s.step}
                    </span>
                    <span className="text-[10px] text-[#9CA3AF] font-medium">{s.time}</span>
                  </div>
                  <p className="font-semibold text-[#111827] text-[12px]">{s.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: DOCUMENT CHECKLIST */}
      <div className="sp-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <CheckSquare className="w-5 h-5 text-[#0066FF]" />
              <h2 className="text-[18px] font-semibold text-[#111827] tracking-[-0.01em]">
                Document Readiness
              </h2>
            </div>
            <p className="text-[13px] text-[#6B7280]">
              প্রয়োজনীয় কাগজপত্র ট্র্যাকিং ও সাধারণ ভুলের গাইড।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => setShowPrintModal(true)}
              className="sp-btn sp-btn-secondary py-1.5 px-3 text-[12px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>

            <div className="bg-[#F7F8FA] border border-black/[0.04] rounded-xl p-3 flex items-center gap-3 min-w-[180px]">
              <div className="text-right">
                <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider block mb-0.5">Progress</span>
                <span className="text-[14px] font-bold text-[#0066FF]">{completedCount} / {checklist.length}</span>
              </div>
              <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0066FF] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {checklist.map((item) => {
            const isExpanded = expandedDocId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-[#F7F8FA] border rounded-xl transition-all duration-300 ${
                  item.isCompleted ? 'border-[#10B981]/[0.3] bg-[#10B981]/[0.02]' : 'border-black/[0.06]'
                }`}
              >
                <div className="p-4 flex items-center justify-between gap-3 cursor-pointer" onClick={() => setExpandedDocId(isExpanded ? null : item.id)}>
                  <div className="flex items-center gap-3.5">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={(e) => { e.stopPropagation(); toggleCheck(item.id); }}
                      className="w-4 h-4 rounded border-black/[0.15] text-[#10B981] focus:ring-[#10B981] cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-semibold text-[13px] ${item.isCompleted ? 'text-[#9CA3AF] line-through' : 'text-[#111827]'}`}>
                          {item.titleBn}
                        </span>
                        <span className="text-[9px] bg-white border border-black/[0.06] text-[#6B7280] px-1.5 py-0.5 rounded uppercase tracking-wider font-medium">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#9CA3AF]">{item.titleEn}</span>
                    </div>
                  </div>
                  <button className="text-[#9CA3AF] hover:text-[#111827] transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-black/[0.04] space-y-3">
                    <div className="bg-white p-3.5 rounded-xl border border-black/[0.04] space-y-1.5">
                      <span className="font-semibold text-[12px] text-[#0066FF] block">কীভাবে প্রস্তুত করবেন</span>
                      <p className="text-[12px] text-[#6B7280] leading-relaxed">{item.explanationBn}</p>
                    </div>
                    <div className="bg-[#F59E0B]/[0.04] border border-[#F59E0B]/[0.15] p-3.5 rounded-xl space-y-1.5">
                      <span className="font-semibold text-[12px] text-[#F59E0B] flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        সাধারণ ভুলসমূহ
                      </span>
                      <p className="text-[12px] text-[#6B7280] leading-relaxed">{item.commonMistakesBn}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <PrintModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        title="Checklist & Timeline Report"
        subtitle={`Target: ${timelineCountry} | ${targetIntake}`}
      >
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-gray-400 font-medium">Target:</div>
              <div className="text-sm font-bold text-slate-900">{timelineCountry} — {targetIntake}</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Readiness</span>
              <span className="text-xl font-black text-emerald-600">{completedCount}/{checklist.length} ({progressPercent}%)</span>
            </div>
          </div>

          {generatedTimeline && generatedTimeline.length > 0 && (
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Timeline Roadmap</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {generatedTimeline.map((phase: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>Phase {idx + 1}: {phase.phaseName}</span>
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded">{phase.monthsRange}</span>
                    </div>
                    <ul className="list-disc pl-4 text-slate-700 space-y-0.5">
                      {phase.tasksBn.map((t: string, i: number) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Document Checklist</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                    <th className="p-2.5 border-r border-slate-200 w-16 text-center">Status</th>
                    <th className="p-2.5 border-r border-slate-200">Document</th>
                    <th className="p-2.5">Guide</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {checklist.map((item) => (
                    <tr key={item.id} className={item.isCompleted ? 'bg-emerald-50/40' : ''}>
                      <td className="p-2.5 border-r border-slate-200 text-center font-bold">
                        {item.isCompleted ? <span className="text-emerald-600 font-black">Ready</span> : <span className="text-gray-400">Pending</span>}
                      </td>
                      <td className="p-2.5 border-r border-slate-200">
                        <div className="font-bold text-slate-900">{item.titleBn}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{item.titleEn}</div>
                      </td>
                      <td className="p-2.5 space-y-1.5">
                        <p>{item.explanationBn}</p>
                        <p className="text-amber-700 text-[10px] bg-amber-50 p-1.5 rounded border border-amber-200">
                          <strong>Warning:</strong> {item.commonMistakesBn}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PrintModal>
    </div>
  );
};
