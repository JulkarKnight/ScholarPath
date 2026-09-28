import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { Scholarship } from '../types';

interface ScholarshipFinderTabProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

export const ScholarshipFinderTab: React.FC<ScholarshipFinderTabProps> = ({
  selectedCountry,
  setSelectedCountry,
}) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [userCgpa, setUserCgpa] = useState<number>(3.5);

  useEffect(() => {
    fetchScholarships();
  }, [selectedCountry, selectedDegree, userCgpa]);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCountry !== 'All') params.append('country', selectedCountry);
      if (selectedDegree !== 'All') params.append('degree', selectedDegree);
      if (userCgpa > 0) params.append('cgpa', userCgpa.toString());

      const res = await fetch(`/api/scholarships?${params.toString()}`);
      const data = await res.json();
      setScholarships(data.data || []);
    } catch (err) {
      console.error('Error fetching scholarships:', err);
    } finally {
      setLoading(false);
    }
  };

  const countries = ['All', 'Germany', 'UK', 'Canada', 'USA'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header Card */}
      <div className="sp-card p-6 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-[#0066FF]" />
            <h2 className="text-[18px] font-semibold text-[#111827] tracking-[-0.01em]">
              Scholarship Finder
            </h2>
          </div>
          <p className="text-[13px] text-[#6B7280]">
            ফুল ফ্রি স্কলারশিপ (DAAD, Chevening, Erasmus Mundus, Vanier, Fulbright) এর শর্তাবলী ও আবেদনের নিয়ম খুঁজুন।
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="sp-label">Country</label>
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

          <div>
            <label className="sp-label">Degree Level</label>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="sp-input cursor-pointer"
            >
              <option value="All">All Levels</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className="sp-label">Your CGPA ({userCgpa.toFixed(2)})</label>
            <div className="bg-[#F7F8FA] border border-black/[0.06] rounded-lg px-4 py-2.5 flex items-center">
              <input
                type="range"
                min="2.5"
                max="4.0"
                step="0.05"
                value={userCgpa}
                onChange={(e) => setUserCgpa(parseFloat(e.target.value))}
                className="w-full accent-[#0066FF] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#9CA3AF]">
          <div className="w-7 h-7 border-2 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <span className="text-[13px]">Finding scholarships...</span>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="sp-card p-16 text-center text-[#9CA3AF] text-[13px]">
          আপনার ফিল্টারে কোনো স্কলারশিপ পাওয়া যায়নি। ফিল্টার পরিবর্তন করে চেষ্টা করুন।
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {scholarships.map((s) => {
            const isEligibleByCgpa = userCgpa >= s.minCgpa;
            return (
              <div
                key={s.id}
                className="sp-card-elevated p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="sp-badge bg-[#0066FF]/[0.06] text-[#0066FF] border border-[#0066FF]/[0.12] text-[10px] uppercase tracking-wider">
                          {s.coverage}
                        </span>
                        <span className="sp-badge bg-[#F0F1F3] text-[#6B7280] border border-black/[0.06]">
                          {s.country}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#111827]">{s.title}</h3>
                    </div>

                    <span
                      className={`sp-badge border ${
                        isEligibleByCgpa
                          ? 'bg-[#10B981]/[0.08] text-[#10B981] border-[#10B981]/[0.2]'
                          : 'bg-[#EF4444]/[0.08] text-[#EF4444] border-[#EF4444]/[0.2]'
                      }`}
                    >
                      {isEligibleByCgpa ? 'Eligible' : 'CGPA Short'}
                    </span>
                  </div>

                  {/* Grant */}
                  <div className="bg-[#F7F8FA] p-3 rounded-xl border border-black/[0.04]">
                    <span className="text-[10px] text-[#9CA3AF] font-medium block mb-0.5">Coverage & Benefits</span>
                    <p className="font-semibold text-[#0066FF] text-[13px]">{s.grantAmountText}</p>
                  </div>

                  <p className="text-[12px] text-[#6B7280] leading-relaxed">{s.descriptionBangla}</p>

                  {/* Eligibility */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#6B7280] font-medium block">আবেদনের প্রধান শর্তাবলী:</span>
                    <ul className="space-y-1 list-disc pl-4 text-[#6B7280] text-[11px]">
                      {(s.eligibilityCriteriaBangla || []).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[12px]">
                  <span className="text-[#F59E0B] font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline: {s.deadline}
                  </span>

                  <a
                    href={s.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="sp-btn sp-btn-secondary text-[12px] py-1.5 px-3"
                  >
                    <span>Official Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
