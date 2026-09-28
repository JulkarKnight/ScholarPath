import React, { useState } from 'react';
import { Calculator, DollarSign, PieChart, Sparkles, TrendingUp } from 'lucide-react';
import { Country } from '../types';

export const CostCalculatorTab: React.FC = () => {
  const [country, setCountry] = useState<Country>('Canada');
  const [tuitionPerYear, setTuitionPerYear] = useState<number>(28000);
  const [livingPerYear, setLivingPerYear] = useState<number>(12000);
  const [visaAndFlight, setVisaAndFlight] = useState<number>(2500);
  const [durationYears, setDurationYears] = useState<number>(2);

  const [familySavingsUSD, setFamilySavingsUSD] = useState<number>(25000);
  const [scholarshipFundingUSD, setScholarshipFundingUSD] = useState<number>(10000);
  const [estimatedPartTimeEarningsUSD, setEstimatedPartTimeEarningsUSD] = useState<number>(8000);

  const totalTuitionCost = tuitionPerYear * durationYears;
  const totalLivingCost = livingPerYear * durationYears;
  const totalExpenseUSD = totalTuitionCost + totalLivingCost + visaAndFlight;

  const totalFundingUSD = familySavingsUSD + scholarshipFundingUSD + estimatedPartTimeEarningsUSD;
  const netFinancialGap = totalFundingUSD - totalExpenseUSD;

  const totalExpenseBDT = Math.round(totalExpenseUSD * 120);

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Header */}
      <div className="sp-card p-6 space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="w-5 h-5 text-[#0066FF]" />
          <h2 className="text-[18px] font-semibold text-[#111827] tracking-[-0.01em]">
            Cost & Funding Calculator
          </h2>
        </div>
        <p className="text-[13px] text-[#6B7280]">
          টিউশন ফি, লিভিং কস্ট, ফ্লাইট ও ভিসার মোট খরচ হিসাব করে ফান্ডিং গ্যাপ জানুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Form */}
        <div className="lg:col-span-6 sp-card p-6 space-y-5">
          <h3 className="text-[14px] font-semibold text-[#111827] pb-3 border-b border-black/[0.06] flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#0066FF]" />
            বাজেট নির্ধারণ করুন
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="sp-label">Target Country</label>
              <select
                value={country}
                onChange={(e) => {
                  const c = e.target.value as Country;
                  setCountry(c);
                  if (c === 'Germany') { setTuitionPerYear(2500); setLivingPerYear(11000); }
                  else if (c === 'USA') { setTuitionPerYear(35000); setLivingPerYear(14000); }
                  else if (c === 'Canada') { setTuitionPerYear(28000); setLivingPerYear(12000); }
                }}
                className="sp-input cursor-pointer"
              >
                {['Canada', 'Germany', 'USA', 'UK', 'Australia', 'Finland', 'Sweden'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="sp-label">Duration (Years)</label>
              <input
                type="number" min="1" max="4"
                value={durationYears}
                onChange={(e) => setDurationYears(parseInt(e.target.value) || 1)}
                className="sp-input"
              />
            </div>
          </div>

          {/* Expenses */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Expenses</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="sp-label">Annual Tuition (USD)</label>
                <input type="number" step="1000" value={tuitionPerYear} onChange={(e) => setTuitionPerYear(parseInt(e.target.value) || 0)} className="sp-input" />
              </div>
              <div>
                <label className="sp-label">Annual Living (USD)</label>
                <input type="number" step="1000" value={livingPerYear} onChange={(e) => setLivingPerYear(parseInt(e.target.value) || 0)} className="sp-input" />
              </div>
            </div>
            <div>
              <label className="sp-label">Visa, Insurance & Flight (USD)</label>
              <input type="number" step="500" value={visaAndFlight} onChange={(e) => setVisaAndFlight(parseInt(e.target.value) || 0)} className="sp-input" />
            </div>
          </div>

          {/* Funding Sources */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Funding Sources</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="sp-label">Family (USD)</label>
                <input type="number" step="1000" value={familySavingsUSD} onChange={(e) => setFamilySavingsUSD(parseInt(e.target.value) || 0)} className="sp-input" />
              </div>
              <div>
                <label className="sp-label">Scholarship (USD)</label>
                <input type="number" step="1000" value={scholarshipFundingUSD} onChange={(e) => setScholarshipFundingUSD(parseInt(e.target.value) || 0)} className="sp-input" />
              </div>
              <div>
                <label className="sp-label">Part-Time (USD)</label>
                <input type="number" step="1000" value={estimatedPartTimeEarningsUSD} onChange={(e) => setEstimatedPartTimeEarningsUSD(parseInt(e.target.value) || 0)} className="sp-input" />
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-6 space-y-5">
          <div className="sp-card-elevated p-6 space-y-5">
            <h3 className="text-[14px] font-semibold text-[#111827] flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#0066FF]" />
              Financial Analysis
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F7F8FA] p-4 rounded-xl border border-black/[0.04]">
                <span className="text-[11px] text-[#9CA3AF] block mb-1">Total Expense ({durationYears}yr)</span>
                <span className="font-bold text-[#111827] text-[18px]">${totalExpenseUSD.toLocaleString()}</span>
                <span className="text-[10px] text-[#9CA3AF] block">≈ ৳{totalExpenseBDT.toLocaleString()}</span>
              </div>
              <div className="bg-[#F7F8FA] p-4 rounded-xl border border-black/[0.04]">
                <span className="text-[11px] text-[#9CA3AF] block mb-1">Total Funding</span>
                <span className="font-bold text-[#0066FF] text-[18px]">${totalFundingUSD.toLocaleString()}</span>
                <span className="text-[10px] text-[#9CA3AF] block">≈ ৳{Math.round(totalFundingUSD * 120).toLocaleString()}</span>
              </div>
            </div>

            {/* Verdict */}
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 ${
                netFinancialGap >= 0
                  ? 'bg-[#10B981]/[0.04] border-[#10B981]/[0.15]'
                  : 'bg-[#EF4444]/[0.04] border-[#EF4444]/[0.15]'
              }`}
            >
              <TrendingUp className={`w-5 h-5 shrink-0 ${netFinancialGap >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`} />
              <div>
                <span className={`font-semibold text-[13px] block ${netFinancialGap >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {netFinancialGap >= 0 ? 'Surplus Fund' : 'Financial Deficit'}
                </span>
                <p className="text-[12px] text-[#6B7280]">
                  {netFinancialGap >= 0
                    ? `আপনার কাছে $${netFinancialGap.toLocaleString()} USD উদ্ধৃত্ত রয়েছে।`
                    : `$${Math.abs(netFinancialGap).toLocaleString()} USD (৳${Math.abs(Math.round(netFinancialGap * 120)).toLocaleString()}) ঘাটতি পূরণ করতে হবে।`}
                </p>
              </div>
            </div>

            {/* AI Advice */}
            <div className="bg-[#0066FF]/[0.03] p-4 rounded-xl border border-[#0066FF]/[0.1] space-y-2">
              <h4 className="font-semibold text-[12px] text-[#0066FF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Mentor Advice
              </h4>
              <ul className="space-y-1.5 text-[#6B7280] text-[11px] list-disc pl-4">
                <li><strong>TA/RA Funding:</strong> প্রফেসরদের ইমেইল পাঠিয়ে Teaching Assistantship এর চেষ্টা করুন।</li>
                <li><strong>Part-Time:</strong> {country}-তে সপ্তাহে ২০-২৪ ঘন্টা কাজের অনুমতি রয়েছে।</li>
                <li><strong>Education Loan:</strong> বাণিজ্যিক ব্যাংক থেকে স্টুডেন্ট লোন নিতে পারেন।</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
