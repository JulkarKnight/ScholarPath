import React from 'react';
import { Printer, X, Download, FileCheck, GraduationCap } from 'lucide-react';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  if (!isOpen) return null;

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto no-print">
      <div className="bg-white border border-gray-200 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-sm overflow-hidden animate-fade-in">
        {/* Modal Top Header (Hidden during print) */}
        <div className="bg-[#F4F2EE] px-6 py-4 border-b border-gray-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">{title}</h3>
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerPrint}
              className="bg-[#0A66C2] hover:bg-[#0A66C2] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable View Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F4F2EE]">
          <div className="bg-white text-slate-900 rounded-xl p-8 max-w-3xl mx-auto shadow-sm space-y-6 printable-area font-sans">
            {/* Header Stamp for Printable PDF */}
            <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-black text-lg">
                  <GraduationCap className="w-6 h-6 text-green-700" />
                  <span>SHIKKHARTHO AI (শিক্ষার্থী এআই)</span>
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Official Study Abroad Application & Guidance Report
                </p>
              </div>
              <div className="text-right text-[11px] text-gray-400 space-y-0.5">
                <p className="font-bold text-slate-800">Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                <p>Ref ID: SKH-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p>www.shikkhartho.ai</p>
              </div>
            </div>

            {/* Content Passed from parent */}
            {children}

            {/* Document Footer */}
            <div className="border-t border-slate-200 pt-4 text-center text-[10px] text-gray-400 space-y-1">
              <p className="font-semibold text-slate-700">
                ScholarPath AI — Empowering Bangladeshi Scholars Worldwide
              </p>
              <p>This report is generated for personal application reference, checklist tracking, and embassy documentation preparation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
