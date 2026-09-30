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
import { AiMarkdown } from './AiMarkdown';

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
      const token = localStorage.getItem('jwt_token');
      const res = await fetch('/api/ai/visa-practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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
          <Video className="w-5 h-5 text-[var(--color-brand)]" />
          <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)] tracking-[-0.01em]">
            Visa Interview Practice
          </h2>
        </div>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          এম্বাসি ভিসা ইন্টারভিউয়ের প্রস্তুতি নিন — কথা বলুন বা লিখুন, AI স্কোর ও টিপস দেবে।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Mock Officer & Answer */}
        <div className="lg:col-span-6 space-y-5">
          {/* Officer Card */}
          <div className="sp-card-elevated p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isSpeakingQuestion
                      ? 'bg-[var(--color-brand)] text-white shadow-md shadow-[var(--color-brand-subtle)] ring-4 ring-[var(--color-brand-subtle)]'
                      : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)]'
                  }`}
                >
                  VO
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--color-text-primary)] text-[13px] block">Consular Visa Officer</span>
                    {isSpeakingQuestion && (
                      <span className="inline-flex items-end gap-[2px] h-3.5 px-1.5 py-0.5 rounded-full bg-[var(--color-brand-subtle)]">
                        {[0, 0.15, 0.3, 0.1, 0.25].map((delay, i) => (
                          <span
                            key={i}
                            className="w-[2.5px] bg-[var(--color-brand)] rounded-full animate-bounce"
                            style={{
                              height: i % 2 === 0 ? '10px' : '6px',
                              animationDuration: '0.55s',
                              animationDelay: `${delay}s`,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
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
                <option value="UK">UK Embassy</option>
                <option value="Australia">Australia HC</option>
              </select>
            </div>

            {/* Question */}
            <div className="bg-[var(--color-surface-secondary)] border border-black/[0.04] p-4 rounded-xl space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="sp-badge bg-[var(--color-brand)]/[0.06] text-[var(--color-brand)] border border-[#0066FF]/[0.12] text-[10px] uppercase tracking-wider">
                  Q{currentQuestionIdx + 1}
                </span>
                <button
                  onClick={handleSpeakQuestion}
                  className={`sp-btn text-[11px] px-2.5 py-1 rounded-lg border ${
                    isSpeakingQuestion
                      ? 'bg-[var(--color-brand)] text-white border-[#0066FF]'
                      : 'sp-btn-ghost border-[var(--color-border)]'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeakingQuestion ? 'Speaking...' : 'Listen'}</span>
                  {isSpeakingQuestion && (
                    <span className="inline-flex items-end gap-[2px] h-3 ml-0.5">
                      {[0, 0.12, 0.24, 0.08].map((delay, i) => (
                        <span
                          key={i}
                          className="w-[2px] bg-white rounded-full animate-bounce"
                          style={{
                            height: i % 2 === 0 ? '9px' : '5px',
                            animationDuration: '0.5s',
                            animationDelay: `${delay}s`,
                          }}
                        />
                      ))}
                    </span>
                  )}
                </button>
              </div>

              <p className="text-[14px] font-semibold text-[var(--color-text-primary)] leading-relaxed">
                "{activeQuestion.questionText}"
              </p>

              <div className="bg-[var(--color-surface)] p-2.5 rounded-lg border border-black/[0.04] text-[11px] text-[var(--color-text-secondary)] flex items-start gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--color-brand)] shrink-0 mt-0.5" />
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
              <label className="text-[13px] font-semibold text-[var(--color-text-primary)]">Your Answer (English)</label>
              <button
                type="button"
                onClick={handleToggleRecord}
                className={`sp-btn text-[11px] px-2.5 py-1 rounded-lg border ${
                  isRecording
                    ? 'bg-[var(--color-danger)] text-white border-[#EF4444]'
                    : 'sp-btn-ghost border-[var(--color-border)]'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[var(--color-brand)]" />}
                <span>{isRecording ? 'Listening...' : 'Voice'}</span>
                {isRecording && (
                  <span className="inline-flex items-end gap-[2px] h-3 ml-0.5">
                    {[0, 0.14, 0.28, 0.1].map((delay, i) => (
                      <span
                        key={i}
                        className="w-[2px] bg-white rounded-full animate-bounce"
                        style={{
                          height: i % 2 === 0 ? '9px' : '5px',
                          animationDuration: '0.45s',
                          animationDelay: `${delay}s`,
                        }}
                      />
                    ))}
                  </span>
                )}
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
            <div className="sp-card bg-[var(--color-danger)]/[0.04] border-[#EF4444]/[0.15] p-4 text-[var(--color-danger)] text-[13px]">{error}</div>
          )}

          {!evaluation && !loading && (
            <div className="sp-card p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand)]/[0.06] flex items-center justify-center mx-auto">
                <Video className="w-6 h-6 text-[var(--color-brand)]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">Evaluation Report</h3>
              <p className="text-[#9CA3AF] text-[12px]">
                প্রশ্নের উত্তর দিয়ে বাটন প্রেস করলে AI আপনার কনফিডেন্স, গ্রামার ও তথ্যের নির্ভরতা মূল্যায়ন করবে।
              </p>
            </div>
          )}

          {loading && (
            <div className="sp-card p-14 text-center space-y-3">
              <div className="w-8 h-8 border-[3px] border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[var(--color-brand)] font-medium text-[13px]">Analyzing your response...</p>
            </div>
          )}

          {evaluation && !loading && (
            <div className="sp-card-elevated p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <div></div>
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
                  <div key={s.label} className="bg-[var(--color-surface-secondary)] p-3.5 rounded-xl border border-black/[0.04]">
                    <span className="text-[11px] text-[#9CA3AF] block mb-1">{s.label}</span>
                    <span className="text-[20px] font-bold" style={{ color: scoreColor(s.value) }}>
                      {s.value}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Feedback */}
              <div className="bg-[var(--color-surface-secondary)] p-4 rounded-xl border border-black/[0.04] space-y-1.5">
                <span className="font-semibold text-[12px] text-[var(--color-brand)] block">ফিডব্যাক</span>
                <AiMarkdown className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">{evaluation.feedbackBn}</AiMarkdown>
              </div>

              {/* Better Answer */}
              <div className="bg-[var(--color-brand)]/[0.03] border border-[#0066FF]/[0.1] p-4 rounded-xl space-y-1.5">
                <span className="font-semibold text-[12px] text-[var(--color-brand)] block">Exemplary Answer</span>
                <p className="text-[12px] text-[var(--color-text-secondary)] italic leading-relaxed">"{evaluation.betterAnswerEn}"</p>
              </div>

              {/* Tips */}
              <div className="space-y-1.5">
                <span className="font-semibold text-[12px] text-[var(--color-text-primary)] block">জরুরি টিপস</span>
                <ul className="space-y-1 text-[var(--color-text-secondary)] text-[11px] list-disc pl-4">
                  {evaluation.keyAdvicePointsBn.map((tip, i) => (
                    <li key={i}><AiMarkdown className="inline">{tip}</AiMarkdown></li>
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
