import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

import {
  FileText,
  Upload,
  Sparkles,
  Printer,
  Download,
  Copy,
  Check,
  RefreshCw,
  Award,
  GraduationCap,
  BookOpen,
  UserCheck,
  TriangleAlert
} from 'lucide-react';
import { Country, DocumentAuditResponse, DocumentAuditField } from '../types';
import { PrintModal } from './PrintModal';
import { AiMarkdown } from './AiMarkdown';

interface DocumentStudioTabProps {
  selectedCountry: string;
}

export const DocumentStudioTab: React.FC<DocumentStudioTabProps> = ({ selectedCountry }) => {
  const targetCountry = (selectedCountry === 'All' ? 'Canada' : selectedCountry) as Country;
  const [targetDegree, setTargetDegree] = useState<'Bachelors' | 'Masters' | 'PhD'>('Masters');
  const [targetMajor, setTargetMajor] = useState<string>('Computer Science');

  // 5 Document Fields State
  const [transcriptInfo, setTranscriptInfo] = useState<string>('');
  const [cvInfo, setCvInfo] = useState<string>('');
  const [sopInfo, setSopInfo] = useState<string>('');
  const [languageInfo, setLanguageInfo] = useState<string>('');
  const [lorInfo, setLorInfo] = useState<string>('');

  // Multimodal File State
  const [transcriptFile, setTranscriptFile] = useState<{ mimeType: string, data: string } | null>(null);
  const [cvFile, setCvFile] = useState<{ mimeType: string, data: string } | null>(null);
  const [sopFile, setSopFile] = useState<{ mimeType: string, data: string } | null>(null);
  const [languageFile, setLanguageFile] = useState<{ mimeType: string, data: string } | null>(null);
  const [lorFile, setLorFile] = useState<{ mimeType: string, data: string } | null>(null);

  // Active tab selection for document editing/previewing
  const [activeDocTab, setActiveDocTab] = useState<'transcript' | 'cv' | 'sop' | 'language' | 'lor'>('sop');

  // Upload feedback state
  const [uploadFeedback, setUploadFeedback] = useState<{ [key: string]: string }>({});

  // Analysis state
  const [loading, setLoading] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<DocumentAuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Export / Print Modal
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [printDocType, setPrintDocType] = useState<'all' | 'transcript' | 'cv' | 'sop' | 'language' | 'lor'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // File Upload Handler (Parses text files, doc text, pdf plain text)
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: 'transcript' | 'cv' | 'sop' | 'language' | 'lor',
    setter: (val: string) => void,
    setFileState: (val: { mimeType: string, data: string } | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const b64Reader = new FileReader();
    b64Reader.onload = (event) => {
       const result = event.target?.result as string;
       if (result && result.includes(',')) {
          setFileState({ mimeType: file.type || 'application/pdf', data: result.split(',')[1] });
       }
    };
    b64Reader.readAsDataURL(file);

    if (file.type === 'application/pdf') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        setter(fullText.slice(0, 5000));
        setUploadFeedback((prev) => ({ ...prev, [fieldKey]: `Uploaded: ${file.name} (${Math.round(file.size / 1024)} KB)` }));
      } catch (err) {
        console.error('Error parsing PDF:', err);
        setUploadFeedback((prev) => ({ ...prev, [fieldKey]: `Error parsing PDF: ${file.name}` }));
      }
      return;
    }

    if (file.type.startsWith('image/')) {
       setUploadFeedback((prev) => ({ ...prev, [fieldKey]: `Uploaded: ${file.name} (${Math.round(file.size / 1024)} KB)` }));
       setter(`[Image Uploaded: ${file.name}]`);
       return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setter(content.slice(0, 5000));
        setUploadFeedback((prev) => ({ ...prev, [fieldKey]: `Uploaded: ${file.name} (${Math.round(file.size / 1024)} KB)` }));
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSamplePreset = () => {
    setTranscriptInfo(`Institution: North South University, Bangladesh\nDegree: B.Sc. in Computer Science & Engineering (2020 - 2024)\nCGPA: 3.78 out of 4.00 (Major CGPA: 3.88)\nKey Coursework: Algorithms (A), Database Systems (A), Machine Learning (A-), Operating Systems (B+)\nCompleted Credits: 130/130 | Backlogs: 0\nAwards: Dean's Honor List (2 terms)`);
    setCvInfo(`MD. ARIFUL ISLAM\nEmail: ariful.nsu@gmail.com | Phone: +880 1712-345678 | Dhaka, Bangladesh\nLinkedIn: linkedin.com/in/ariful-cse | GitHub: github.com/ariful-code\n\nOBJECTIVE:\nAspiring Data Science Researcher applying for M.Sc. in Computer Science with a focus on Applied AI & NLP.\n\nEDUCATION:\nB.Sc. in Computer Science & Engineering — North South University (CGPA 3.78/4.00, Graduated 2024)\n\nWORK EXPERIENCE:\nSoftware Engineer Intern — Brain Station 23, Dhaka (June 2023 - Nov 2023)\n- Developed REST APIs in Node.js & React for healthcare analytics dashboard handling 10,000+ daily users.\n- Optimized PostgreSQL database queries reducing endpoint response times by 35%.\n\nRESEARCH & PROJECTS:\n1. Bangla Sentiment Analysis on E-commerce Reviews using Transformer Architectures (Undergrad Thesis)\n2. AI Study Planner Web Application using React & FastAPI\n\nSKILLS & CERTIFICATIONS:\nLanguages: Python, JavaScript, TypeScript, C++\nFrameworks: PyTorch, React, Express.js, Docker\nLanguage Test: IELTS Overall 7.5 (Listening 8.0, Reading 8.0, Writing 6.5, Speaking 7.0)`);
    setSopInfo(`STATEMENT OF PURPOSE\nCandidate: Md. Ariful Islam\nProgram: Master of Science in Computer Science\n\nFrom building my first automated Bangla text classifier during my undergraduate thesis at North South University to engineering scalable web APIs at Brain Station 23, my academic trajectory has been driven by a singular ambition: leveraging artificial intelligence to solve complex real-world challenges.\n\nHaving maintained a 3.78 CGPA while researching natural language processing, I am eager to advance my research under Dr. Sarah Jenkins at the University of Toronto. Her current research on transformer model compression aligns perfectly with my thesis background.\n\nUpon completing my M.Sc., I intend to return to Bangladesh's burgeoning technology ecosystem as an AI research director, empowering local tech startups with advanced machine learning infrastructure.`);
    setLanguageInfo(`Test Type: IELTS Academic\nOverall Band Score: 7.5\nListening: 8.0 | Reading: 8.0 | Writing: 6.5 | Speaking: 7.0\nTest Date: October 14, 2025\nTRF Number: 25BD019284ISLAM7.5\nTarget Minimum Cutoff: Overall 6.5 (no band below 6.0)`);
    setLorInfo(`LETTER OF RECOMMENDATION #1:\nRecommender: Dr. Kazi Mohammad Lutfor Rahman, Professor & Department Chair, CSE, North South University\nRelationship: Academic Advisor & Thesis Supervisor for 2 years.\nKey Points: Ariful ranked in the top 3% of his graduating class. Demonstrates exceptional mathematical rigor and self-driven research discipline in NLP.\n\nLETTER OF RECOMMENDATION #2:\nRecommender: Tanvir Hossain, Senior Engineering Manager, Brain Station 23\nRelationship: Internship Manager\nKey Points: Ariful demonstrated strong teamwork, quick learning of cloud infrastructure, and proactive problem-solving.`);
  };

  const handleRunAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch('/api/ai/document-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          targetCountry,
          targetDegree,
          targetMajor,
          transcriptInfo,
          cvInfo,
          sopInfo,
          languageInfo,
          lorInfo
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to audit documents. Please check API connection.');
      }

      const data: DocumentAuditResponse = await response.json();
      setAuditResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error occurred during AI document evaluation');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadDoc = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename.replace(/\s+/g, '_')}_ScholarPath_AI.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Strong') {
      return <span className="sp-badge bg-[var(--color-success)]/[0.08] text-[var(--color-success)] border border-[#10B981]/[0.15]">Strong</span>;
    }
    if (status === 'Adequate') {
      return <span className="sp-badge bg-[var(--color-warning)]/[0.08] text-[var(--color-warning)] border border-[#F59E0B]/[0.15]">Adequate</span>;
    }
    return <span className="sp-badge bg-[var(--color-danger)]/[0.08] text-[var(--color-danger)] border border-[#EF4444]/[0.15]">Needs Fix</span>;
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#0066FF';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const tabs = [
    { id: 'transcript', label: 'Transcript', icon: GraduationCap },
    { id: 'cv', label: 'CV / Resume', icon: FileText },
    { id: 'sop', label: 'SOP', icon: BookOpen },
    { id: 'language', label: 'IELTS/TOEFL', icon: Award },
    { id: 'lor', label: 'LORs', icon: UserCheck },
  ] as const;

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Top Banner */}
      <div className="sp-card overflow-hidden relative border-0 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/[0.03] to-[#0066FF]/[0.01] pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-[var(--color-brand)]/[0.06] rounded-full blur-3xl pointer-events-none"></div>

        <div className="p-8 relative z-10 max-w-3xl space-y-3">

          <h2 className="text-[24px] sm:text-[28px] font-semibold text-[var(--color-text-primary)] tracking-[-0.02em] leading-tight">
            Analyze Application Docs & Extract Formatted PDFs
          </h2>
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            Upload your Transcript, CV, SOP, language scores, and LORs. AI evaluates against {targetCountry} standards, generates scores, and provides printable PDFs.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleLoadSamplePreset}
              className="sp-btn sp-btn-secondary text-[12px]"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[var(--color-brand)]" />
              <span>Fill Sample Data</span>
            </button>
            <span className="text-[12px] text-[#9CA3AF]">
              Target: <strong className="text-[#374151] font-medium">{targetDegree} in {targetMajor} ({targetCountry})</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Target Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sp-card p-5">
          <label className="sp-label">Target Country</label>
          <div className="sp-input bg-[var(--color-surface-secondary)] border-black/[0.04] text-[var(--color-text-primary)] font-semibold">
            {targetCountry}
          </div>
        </div>
        <div className="sp-card p-5">
          <label className="sp-label">Target Degree</label>
          <select
            value={targetDegree}
            onChange={(e) => setTargetDegree(e.target.value as any)}
            className="sp-input cursor-pointer font-semibold text-[var(--color-brand)]"
          >
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div className="sp-card p-5">
          <label className="sp-label">Target Major</label>
          <input
            type="text"
            value={targetMajor}
            onChange={(e) => setTargetMajor(e.target.value)}
            className="sp-input font-semibold text-[var(--color-text-primary)]"
            placeholder="e.g. Computer Science"
          />
        </div>
      </div>

      <div className="sp-card p-0 overflow-hidden">
        {/* Document Tabs */}
        <div className="flex border-b border-[var(--color-border)] overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDocTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDocTab(tab.id as any)}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-4 px-4 text-[13px] font-medium transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#0066FF] text-[var(--color-brand)] bg-[var(--color-brand)]/[0.02]'
                    : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Editor Area */}
        <div className="p-6 space-y-4 bg-[var(--color-surface)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                {activeDocTab === 'transcript' && <GraduationCap className="w-4 h-4 text-[var(--color-brand)]" />}
                {activeDocTab === 'cv' && <FileText className="w-4 h-4 text-[var(--color-brand)]" />}
                {activeDocTab === 'sop' && <BookOpen className="w-4 h-4 text-[var(--color-brand)]" />}
                {activeDocTab === 'language' && <Award className="w-4 h-4 text-[var(--color-brand)]" />}
                {activeDocTab === 'lor' && <UserCheck className="w-4 h-4 text-[var(--color-brand)]" />}
                <span>
                  {activeDocTab === 'transcript' && 'Academic Transcript & Records'}
                  {activeDocTab === 'cv' && 'Curriculum Vitae / Resume'}
                  {activeDocTab === 'sop' && 'Statement of Purpose'}
                  {activeDocTab === 'language' && 'IELTS / TOEFL Scorecard'}
                  {activeDocTab === 'lor' && 'Recommendation Letters'}
                </span>
              </h3>
            </div>
            <label className="sp-btn sp-btn-secondary py-1.5 px-3 text-[12px] cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PDF/Image</span>
              <input
                type="file"
                accept=".txt,.doc,.docx,.pdf,.png,.jpg,.jpeg"
                onChange={(e) => {
                  if (activeDocTab === 'transcript') handleFileUpload(e, 'transcript', setTranscriptInfo, setTranscriptFile);
                  if (activeDocTab === 'cv') handleFileUpload(e, 'cv', setCvInfo, setCvFile);
                  if (activeDocTab === 'sop') handleFileUpload(e, 'sop', setSopInfo, setSopFile);
                  if (activeDocTab === 'language') handleFileUpload(e, 'language', setLanguageInfo, setLanguageFile);
                  if (activeDocTab === 'lor') handleFileUpload(e, 'lor', setLorInfo, setLorFile);
                }}
                className="hidden"
              />
            </label>
          </div>

          {uploadFeedback[activeDocTab] && (
            <div className="text-[11px] font-medium text-[var(--color-success)] bg-[var(--color-success)]/[0.08] p-2 rounded-lg border border-[#10B981]/[0.15]">
              {uploadFeedback[activeDocTab]}
            </div>
          )}

          <textarea
            value={
              activeDocTab === 'transcript' ? transcriptInfo :
              activeDocTab === 'cv' ? cvInfo :
              activeDocTab === 'sop' ? sopInfo :
              activeDocTab === 'language' ? languageInfo : lorInfo
            }
            onChange={(e) => {
              if (activeDocTab === 'transcript') setTranscriptInfo(e.target.value);
              if (activeDocTab === 'cv') setCvInfo(e.target.value);
              if (activeDocTab === 'sop') setSopInfo(e.target.value);
              if (activeDocTab === 'language') setLanguageInfo(e.target.value);
              if (activeDocTab === 'lor') setLorInfo(e.target.value);
            }}
            placeholder={`Paste ${activeDocTab} details here...`}
            className="sp-input font-mono text-[12px] leading-relaxed h-56 resize-none"
          />

          <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-4">
            <span className="text-[12px] text-[#9CA3AF]">
              All 5 slots ready for audit
            </span>
            <button
              onClick={handleRunAudit}
              disabled={loading}
              className="sp-btn sp-btn-primary px-6 py-2.5 text-[13px] disabled:opacity-50"
            >
              {loading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /><span>Auditing...</span></>
              ) : (
                <><Sparkles className="w-4 h-4" /><span>Run Full AI Audit</span></>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="sp-card bg-[var(--color-danger)]/[0.04] border-[#EF4444]/[0.15] p-4 text-[var(--color-danger)] text-[13px] flex items-center gap-2">
          <TriangleAlert className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Results */}
      {auditResult && !loading && (
        <div className="space-y-6">
          <div className="sp-card-elevated p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left flex-1">
              <span className="sp-badge bg-[var(--color-brand)]/[0.06] text-[var(--color-brand)] border border-[#0066FF]/[0.12]">
                Evaluation Complete
              </span>
              <h3 className="text-[20px] font-semibold text-[var(--color-text-primary)]">Overall Document Readiness</h3>
              <div className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
                <AiMarkdown>{auditResult.summaryVerdictBn}</AiMarkdown>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="46" stroke="#F0F1F3" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="56" cy="56" r="46"
                    stroke={scoreColor(auditResult.overallDocumentReadinessScore)}
                    strokeWidth="8" strokeDasharray={289}
                    strokeDashoffset={289 - (289 * auditResult.overallDocumentReadinessScore) / 100}
                    strokeLinecap="round" fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[24px] font-bold text-[var(--color-text-primary)]">{auditResult.overallDocumentReadinessScore}%</span>
                </div>
              </div>

              <button
                onClick={() => { setPrintDocType('all'); setShowPrintModal(true); }}
                className="sp-btn sp-btn-secondary text-[12px] w-full"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export All PDFs</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: 'transcript', title: 'Transcript', data: auditResult.documentAudits.transcript, icon: GraduationCap },
              { key: 'cv', title: 'CV / Resume', data: auditResult.documentAudits.cv, icon: FileText },
              { key: 'sop', title: 'SOP', data: auditResult.documentAudits.sop, icon: BookOpen },
              { key: 'languageScore', title: 'IELTS / TOEFL', data: auditResult.documentAudits.languageScore, icon: Award },
              { key: 'recommendationLetters', title: 'LORs', data: auditResult.documentAudits.recommendationLetters, icon: UserCheck },
            ].map((docItem) => {
              const Icon = docItem.icon;
              const fieldData = docItem.data;
              return (
                <div key={docItem.key} className="sp-card p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#F0F1F3] flex items-center justify-center text-[var(--color-text-primary)]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold text-[var(--color-text-primary)] text-[14px]">{docItem.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(fieldData.status)}
                        <span className="text-[12px] font-bold" style={{ color: scoreColor(fieldData.score) }}>
                          {fieldData.score}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-1.5 bg-[#F0F1F3] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${fieldData.score}%`, backgroundColor: scoreColor(fieldData.score) }}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="bg-[var(--color-success)]/[0.04] border border-[#10B981]/[0.15] p-3 rounded-xl">
                        <span className="font-semibold text-[11px] text-[var(--color-success)] block mb-1">Strengths</span>
                        <ul className="list-disc pl-4 text-[11px] text-[#374151] space-y-0.5">
                          {fieldData.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                        </ul>
                      </div>
                      {fieldData.weaknesses.length > 0 && (
                        <div className="bg-[var(--color-danger)]/[0.04] border border-[#EF4444]/[0.15] p-3 rounded-xl">
                          <span className="font-semibold text-[11px] text-[var(--color-danger)] block mb-1">Weaknesses</span>
                          <ul className="list-disc pl-4 text-[11px] text-[#374151] space-y-0.5">
                            {fieldData.weaknesses.map((w, idx) => <li key={idx}>{w}</li>)}
                          </ul>
                        </div>
                      )}
                      <div className="bg-[var(--color-surface-secondary)] border border-black/[0.04] p-3 rounded-xl">
                        <span className="font-semibold text-[11px] text-[var(--color-text-primary)] block mb-1">AI Tips (Bangla)</span>
                        <ul className="space-y-1 text-[11px] text-[var(--color-text-secondary)]">
                          {fieldData.actionableSuggestionsBn.map((sug, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-[var(--color-brand)] font-bold">•</span>
                              <AiMarkdown className="text-inherit">{sug}</AiMarkdown>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyText(fieldData.generatedFormattedDocText, docItem.key)}
                      className="sp-btn sp-btn-ghost text-[11px] border border-[var(--color-border)] py-1 px-2.5"
                    >
                      {copiedKey === docItem.key ? <Check className="w-3.5 h-3.5 text-[var(--color-success)]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === docItem.key ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadDoc(docItem.title, fieldData.generatedFormattedDocText)}
                      className="sp-btn sp-btn-ghost text-[11px] border border-[var(--color-border)] py-1 px-2.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>.DOC</span>
                    </button>
                    <button
                      onClick={() => { setPrintDocType(docItem.key as any); setShowPrintModal(true); }}
                      className="sp-btn sp-btn-secondary text-[11px] py-1 px-2.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {auditResult && (
        <PrintModal
          isOpen={showPrintModal}
          onClose={() => setShowPrintModal(false)}
          title={printDocType === 'all' ? 'Document Portfolio' : `Document Preview: ${printDocType.toUpperCase()}`}
          subtitle={`${targetCountry} | ${targetDegree} in ${targetMajor}`}
        >
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[var(--color-text-tertiary)] block mb-0.5">Readiness Score</span>
                <span className="text-lg font-black text-emerald-700">{auditResult.overallDocumentReadinessScore}%</span>
              </div>
              <div className="text-right">
                <span className="text-[var(--color-text-tertiary)] block mb-0.5">Target</span>
                <span className="font-bold text-slate-800">{targetDegree} ({targetCountry})</span>
              </div>
            </div>

            {['transcript', 'cv', 'sop', 'languageScore', 'recommendationLetters']
              .filter((k) => printDocType === 'all' || printDocType === k)
              .map((keyName) => {
                const docData = (auditResult.documentAudits as any)[keyName] as DocumentAuditField;
                return (
                  <div key={keyName} className="border border-slate-200 rounded-xl p-5 space-y-4 bg-[var(--color-surface)] page-break">
                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wide">{keyName}</h4>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        Score: {docData.score}% ({docData.status})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-700 whitespace-pre-wrap font-mono leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
                      {docData.generatedFormattedDocText}
                    </div>
                  </div>
                );
              })}
          </div>
        </PrintModal>
      )}
    </div>
  );
};
