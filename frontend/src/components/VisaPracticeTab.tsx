import React, { useState } from 'react';
import {
  Video,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import { Country, VisaInterviewQuestion, VisaEvaluationResponse } from '../types';
import { VISA_QUESTIONS_SAMPLE } from '../data/dbData';

interface VisaPracticeTabProps {
  selectedCountry: string;
}

export const VisaPracticeTab: React.FC<VisaPracticeTabProps> = ({ selectedCountry }) => {
  const [country, setCountry] = useState<Country>(
    (selectedCountry !== 'All' ? selectedCountry : 'USA') as Country
  );
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<VisaEvaluationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const questionsForCountry = VISA_QUESTIONS_SAMPLE.filter((q) => q.country === country);
  const activeQuestion: VisaInterviewQuestion =
    questionsForCountry[currentQuestionIdx % (questionsForCountry.length || 1)] || VISA_QUESTIONS_SAMPLE[0];

  const handleSpeakQuestion = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeQuestion.questionText);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeakingQuestion(true);
    utterance.onend = () => setIsSpeakingQuestion(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleRecord = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Your browser does not support Speech Recognition. You can type your response in the box below!');
      return;
    }
    if (isRecording) { setIsRecording(false); return; }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setStudentAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsRecording(false);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentAnswer.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/visa-practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, questionText: activeQuestion.questionText, studentAnswer }),
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Evaluation failed'); }
      const data: VisaEvaluationResponse = await res.json();
      setEvaluation(data);
    } catch (err: any) {
      setError(err.message || 'Failed to evaluate response.');
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (v: number) => {
    if (v >= 80) return '#10B981';
    if (v >= 60) return '#0066FF';
    if (v >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header */}
      <div className="sp-card p-6 space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <Video className="w-5 h-5 text-[#0066FF]" />
          <h2 className="text-[18px] font-semibold text-[#111827] tracking-[-0.01em]">
            Visa Interview Practice
          </h2>
        </div>
        <p className="text-[13px] text-[#6B7280]">
          এম্বাসি ভিসা ইন্টারভিউয়ের প্রস্তুতি নিন — কথা বলুন বা লিখুন, AI স্কোর ও টিপস দেবে।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Mock Officer & Answer */}
        <div className="lg:col-span-6 space-y-5">
          {/* Officer Card */}
          <div className="sp-card-elevated p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F0F1F3] flex items-center justify-center font-bold text-[#111827] text-sm">
                  VO
                </div>
                <div>
                  <span className="font-semibold text-[#111827] text-[13px] block">Consular Visa Officer</span>
                  <span className="text-[11px] text-[#9CA3AF]">Embassy Interview · {country}</span>
                </div>
              </div>
              <select
                value={country}
                onChange={(e) => { setCountry(e.target.value as Country); setCurrentQuestionIdx(0); setEvaluation(null); }}
                className="sp-input w-auto text-[12px] py-1.5 px-2.5 cursor-pointer"
              >
                <option value="USA">USA Embassy</option>
                <option value="Canada">Canada HC</option>
                <option value="Germany">German Embassy</option>
              </select>
            </div>

            {/* Question */}
            <div className="bg-[#F7F8FA] border border-black/[0.04] p-4 rounded-xl space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="sp-badge bg-[#0066FF]/[0.06] text-[#0066FF] border border-[#0066FF]/[0.12] text-[10px] uppercase tracking-wider">
                  Q{currentQuestionIdx + 1}
                </span>
                <button
                  onClick={handleSpeakQuestion}
                  className={`sp-btn text-[11px] px-2.5 py-1 rounded-lg border ${
                    isSpeakingQuestion
                      ? 'bg-[#0066FF] text-white border-[#0066FF] animate-pulse'
                      : 'sp-btn-ghost border-black/[0.06]'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeakingQuestion ? 'Speaking...' : 'Listen'}</span>
                </button>
              </div>

              <p className="text-[14px] font-semibold text-[#111827] leading-relaxed">
                "{activeQuestion.questionText}"
              </p>

              <div className="bg-white p-2.5 rounded-lg border border-black/[0.04] text-[11px] text-[#6B7280] flex items-start gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                <span><strong>টিপস:</strong> {activeQuestion.keyTipsBn}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => { setCurrentQuestionIdx((p) => p + 1); setEvaluation(null); setStudentAnswer(''); }}
                className="sp-btn sp-btn-ghost text-[12px]"
              >
                পরবর্তী প্রশ্ন →
              </button>
            </div>
          </div>

          {/* Student Answer Form */}
          <form onSubmit={handleEvaluate} className="sp-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-semibold text-[#111827]">Your Answer (English)</label>
              <button
                type="button"
                onClick={handleToggleRecord}
                className={`sp-btn text-[11px] px-2.5 py-1 rounded-lg border ${
                  isRecording
                    ? 'bg-[#EF4444] text-white border-[#EF4444] animate-pulse'
                    : 'sp-btn-ghost border-black/[0.06]'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[#0066FF]" />}
                <span>{isRecording ? 'Listening...' : 'Voice'}</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="Type your answer or use the Voice button..."
              className="sp-input resize-none text-[12px] leading-relaxed"
              required
            />

            <button
              type="submit"
              disabled={loading || !studentAnswer.trim()}
              className="sp-btn sp-btn-primary w-full py-3 text-[13px] disabled:opacity-50"
            >
              {loading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /><span>Evaluating...</span></>
              ) : (
                <><Sparkles className="w-4 h-4" /><span>মূল্যায়ন করুন</span></>
              )}
            </button>
          </form>
        </div>

        {/* Right: Evaluation Report */}
        <div className="lg:col-span-6 space-y-4">
          {error && (
            <div className="sp-card bg-[#EF4444]/[0.04] border-[#EF4444]/[0.15] p-4 text-[#EF4444] text-[13px]">{error}</div>
          )}

          {!evaluation && !loading && (
            <div className="sp-card p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/[0.06] flex items-center justify-center mx-auto">
                <Video className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#111827]">Evaluation Report</h3>
              <p className="text-[#9CA3AF] text-[12px]">
                প্রশ্নের উত্তর দিয়ে বাটন প্রেস করলে AI আপনার কনফিডেন্স, গ্রামার ও তথ্যের নির্ভরতা মূল্যায়ন করবে।
              </p>
            </div>
          )}

          {loading && (
            <div className="sp-card p-14 text-center space-y-3">
              <div className="w-8 h-8 border-[3px] border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[#0066FF] font-medium text-[13px]">Analyzing your response...</p>
            </div>
          )}

          {evaluation && !loading && (
            <div className="sp-card-elevated p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <span className="sp-badge bg-[#0066FF]/[0.06] text-[#0066FF] border border-[#0066FF]/[0.12]">
                  <Sparkles className="w-3 h-3" />
                  Report Card
                </span>
                <span className="text-[12px] text-[#9CA3AF]">{country}</span>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Confidence', value: evaluation.scores.confidence },
                  { label: 'Grammar', value: evaluation.scores.grammar },
                  { label: 'Relevance', value: evaluation.scores.relevance },
                  { label: 'Authenticity', value: evaluation.scores.authenticity },
                ].map((s) => (
                  <div key={s.label} className="bg-[#F7F8FA] p-3.5 rounded-xl border border-black/[0.04]">
                    <span className="text-[11px] text-[#9CA3AF] block mb-1">{s.label}</span>
                    <span className="text-[20px] font-bold" style={{ color: scoreColor(s.value) }}>
                      {s.value}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Feedback */}
              <div className="bg-[#F7F8FA] p-4 rounded-xl border border-black/[0.04] space-y-1.5">
                <span className="font-semibold text-[12px] text-[#0066FF] block">ফিডব্যাক</span>
                <p className="text-[12px] text-[#6B7280] leading-relaxed">{evaluation.feedbackBn}</p>
              </div>

              {/* Better Answer */}
              <div className="bg-[#0066FF]/[0.03] border border-[#0066FF]/[0.1] p-4 rounded-xl space-y-1.5">
                <span className="font-semibold text-[12px] text-[#0066FF] block">Exemplary Answer</span>
                <p className="text-[12px] text-[#6B7280] italic leading-relaxed">"{evaluation.betterAnswerEn}"</p>
              </div>

              {/* Tips */}
              <div className="space-y-1.5">
                <span className="font-semibold text-[12px] text-[#111827] block">জরুরি টিপস</span>
                <ul className="space-y-1 text-[#6B7280] text-[11px] list-disc pl-4">
                  {evaluation.keyAdvicePointsBn.map((tip, i) => (
                    <li key={i}>{tip}</li>
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
