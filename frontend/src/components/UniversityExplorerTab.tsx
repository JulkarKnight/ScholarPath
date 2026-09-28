import React, { useState, useEffect } from 'react';
import {
  Search,
  GraduationCap,
  Sparkles,
  Building2,
  Globe,
  ExternalLink,
  X,
  MessageSquare,
} from 'lucide-react';
import { University } from '../types';

interface UniversityExplorerTabProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  onNavigateToChat: (initialMsg?: string) => void;
}

export const UniversityExplorerTab: React.FC<UniversityExplorerTabProps> = ({
  selectedCountry,
  setSelectedCountry,
  onNavigateToChat,
}) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxTuition, setMaxTuition] = useState<number>(50000);
  const [minCgpaFilter, setMinCgpaFilter] = useState<number>(3.0);
  const [selectedUniForAi, setSelectedUniForAi] = useState<University | null>(null);

  useEffect(() => {
    fetchUniversities();
  }, [selectedCountry, searchQuery, maxTuition, minCgpaFilter]);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCountry !== 'All') params.append('country', selectedCountry);
      if (searchQuery) params.append('search', searchQuery);
      if (maxTuition < 50000) params.append('maxTuition', maxTuition.toString());
      if (minCgpaFilter > 2.0) params.append('minCgpa', minCgpaFilter.toString());

      const res = await fetch(`/api/universities?${params.toString()}`);
      const data = await res.json();
      setUniversities(data.data || []);
    } catch (err) {
      console.error('Error fetching universities:', err);
    } finally {
      setLoading(false);
    }
  };

  const countries = ['All', 'Canada', 'Germany', 'USA', 'UK', 'Australia', 'Finland', 'Sweden'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header Card */}
      <div className="sp-card p-6 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-5 h-5 text-[#0066FF]" />
            <h2 className="text-[18px] font-semibold text-[#111827] tracking-[-0.01em]">
              University Explorer
            </h2>
          </div>
          <p className="text-[13px] text-[#6B7280]">
            বিশ্বজুড়ে শীর্ষ বিশ্ববিদ্যালয়ের রিকোয়ারমেন্টস, টিউশন ফি ও স্কলারশিপ বাংলায় সহজে জানুন।
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-[11px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search university, city, or subject..."
              className="sp-input pl-10"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="sp-input cursor-pointer"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Countries' : c}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-4 bg-[#F7F8FA] border border-black/[0.06] rounded-lg px-4 py-2.5 flex items-center justify-between">
            <span className="text-[12px] text-[#6B7280] shrink-0">Max Tuition:</span>
            <input
              type="range"
              min="0"
              max="50000"
              step="2000"
              value={maxTuition}
              onChange={(e) => setMaxTuition(parseInt(e.target.value))}
              className="mx-3 accent-[#0066FF] w-20 cursor-pointer"
            />
            <span className="font-semibold text-[12px] text-[#0066FF] shrink-0">
              {maxTuition >= 50000 ? 'Any' : `$${maxTuition.toLocaleString()}`}
            </span>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-[12px] text-[#6B7280] px-1">
        <span>
          Showing <strong className="text-[#0066FF] font-semibold">{universities.length}</strong> universities
        </span>
        {selectedCountry !== 'All' && (
          <span className="sp-badge bg-[#F0F1F3] text-[#6B7280] border border-black/[0.06]">
            {selectedCountry}
          </span>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#9CA3AF]">
          <div className="w-7 h-7 border-2 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <span className="text-[13px]">Loading universities...</span>
        </div>
      ) : universities.length === 0 ? (
        <div className="sp-card p-16 text-center text-[#9CA3AF] text-[13px]">
          কোনো বিশ্ববিদ্যালয় খুঁজে পাওয়া যায়নি। ফিল্টার পরিবর্তন করে চেষ্টা করুন।
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {universities.map((uni) => (
            <div
              key={uni.id}
              className="sp-card-elevated p-5 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header */}
                <div>
                  <span className="sp-badge bg-[#0066FF]/[0.06] text-[#0066FF] border border-[#0066FF]/[0.12] text-[10px] uppercase tracking-wider">
                    Rank #{uni.worldRank}
                  </span>
                  <h3 className="text-[14px] font-semibold text-[#111827] mt-1.5 group-hover:text-[#0066FF] transition-colors duration-150">
                    {uni.name}
                  </h3>
                  <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                    <Globe className="w-3 h-3" />
                    {uni.city}, {uni.country}
                  </p>
                </div>

                {/* Bangla Description */}
                <p className="text-[12px] text-[#6B7280] bg-[#F7F8FA] p-3 rounded-xl border border-black/[0.04] leading-relaxed">
                  {uni.descriptionBangla}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F7F8FA] p-2.5 rounded-lg border border-black/[0.04]">
                    <span className="text-[10px] text-[#9CA3AF] block">Tuition</span>
                    <span className="font-semibold text-[12px] text-[#0066FF]">{uni.originalTuitionText}</span>
                  </div>
                  <div className="bg-[#F7F8FA] p-2.5 rounded-lg border border-black/[0.04]">
                    <span className="text-[10px] text-[#9CA3AF] block">Requirements</span>
                    <span className="font-semibold text-[12px] text-[#374151]">
                      IELTS {uni.ieltsMinOverall} · CGPA {uni.minCgpa}
                    </span>
                  </div>
                </div>

                {/* Meta stats */}
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#9CA3AF]">Visa Success</span>
                    <span className="font-semibold text-[#10B981]">{uni.visaSuccessRatePercent}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9CA3AF]">Work Permit</span>
                    <span className="font-semibold text-[#374151]">{uni.postGradWorkPermitYears}yr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9CA3AF]">Fall Deadline</span>
                    <span className="font-semibold text-[#F59E0B]">{uni.applicationDeadlineFall}</span>
                  </div>
                </div>

                {/* Programs */}
                <div className="flex flex-wrap gap-1.5">
                  {(uni.programs || []).slice(0, 3).map((prog, i) => (
                    <span key={i} className="text-[10px] bg-[#F0F1F3] text-[#6B7280] px-2 py-0.5 rounded-md">
                      {prog}
                    </span>
                  ))}
                  {(uni.programs || []).length > 3 && (
                    <span className="text-[10px] text-[#9CA3AF] px-1.5 py-0.5">
                      +{(uni.programs || []).length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-black/[0.04] flex items-center gap-2">
                <button
                  onClick={() => setSelectedUniForAi(uni)}
                  className="sp-btn sp-btn-primary flex-1 text-[12px] py-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Guide</span>
                </button>
                <a
                  href={uni.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="sp-btn sp-btn-secondary p-2"
                  title="Visit Official Website"
                >
                  <ExternalLink className="w-4 h-4 text-[#6B7280]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Deep-Dive Modal */}
      {selectedUniForAi && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedUniForAi(null)}>
          <div className="sp-card-elevated max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between pb-4 border-b border-black/[0.06]">
              <div>
                <span className="sp-badge bg-[#0066FF]/[0.06] text-[#0066FF] border border-[#0066FF]/[0.12] text-[10px]">
                  AI Deep-Dive
                </span>
                <h3 className="text-[18px] font-semibold text-[#111827] mt-1.5">{selectedUniForAi.name}</h3>
                <p className="text-[12px] text-[#9CA3AF]">
                  {selectedUniForAi.city}, {selectedUniForAi.country}
                </p>
              </div>
              <button
                onClick={() => setSelectedUniForAi(null)}
                className="sp-btn sp-btn-ghost p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Bangla Analysis */}
              <div className="bg-[#0066FF]/[0.04] border border-[#0066FF]/[0.1] p-4 rounded-xl">
                <h4 className="font-semibold text-[#0066FF] text-[13px] flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4" />
                  কেন এই ভার্সিটি বেছে নেবেন
                </h4>
                <p className="text-[12px] text-[#6B7280] leading-relaxed">{selectedUniForAi.descriptionBangla}</p>
              </div>

              {/* Requirements & Costs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-black/[0.04]">
                  <span className="text-[11px] text-[#6B7280] font-medium block mb-2">প্রয়োজনীয় যোগ্যতা</span>
                  <ul className="space-y-1.5 text-[12px] text-[#374151]">
                    <li>IELTS: {selectedUniForAi.ieltsMinOverall}</li>
                    <li>Min CGPA: {selectedUniForAi.minCgpa}</li>
                    <li>GRE: {selectedUniForAi.greRequired ? 'Required' : 'Not Required'}</li>
                  </ul>
                </div>
                <div className="bg-[#F7F8FA] p-4 rounded-xl border border-black/[0.04]">
                  <span className="text-[11px] text-[#6B7280] font-medium block mb-2">টিউশন ও স্কলারশিপ</span>
                  <ul className="space-y-1.5 text-[12px] text-[#374151]">
                    <li>Tuition: {selectedUniForAi.originalTuitionText}</li>
                    <li>Scholarships: {(selectedUniForAi.scholarshipsAvailable || []).join(', ') || 'N/A'}</li>
                  </ul>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-[#F7F8FA] p-4 rounded-xl border border-black/[0.04]">
                <span className="text-[11px] text-[#6B7280] font-medium block mb-2">Key Highlights</span>
                <div className="flex flex-wrap gap-2">
                  {(selectedUniForAi.keyHighlights || []).map((hl, idx) => (
                    <span
                      key={idx}
                      className="sp-badge bg-[#0066FF]/[0.06] text-[#0066FF] border border-[#0066FF]/[0.1]"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06]">
              <button
                onClick={() => {
                  const msg = `I want to know more about admission strategy and TA/RA funding for ${selectedUniForAi.name} in ${selectedUniForAi.country}. Please explain in Bangla.`;
                  setSelectedUniForAi(null);
                  onNavigateToChat(msg);
                }}
                className="sp-btn sp-btn-primary w-full py-2.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>AI Mentor Chat এ প্রশ্ন করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
