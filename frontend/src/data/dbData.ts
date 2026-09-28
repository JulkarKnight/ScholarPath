import { University, Scholarship, DocumentCheckitem, VisaInterviewQuestion } from '../types';

export const UNIVERSITIES_DATABASE: University[] = [
  {
    id: 'u-toronto',
    name: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto, Ontario',
    worldRank: 21,
    programs: ['Computer Science', 'Data Science', 'Engineering', 'Business MBA', 'Public Health', 'Biomedical Sciences'],
    tuitionFeeUSDPerYear: 38000,
    livingCostUSDPerYear: 14000,
    currency: 'CAD',
    originalTuitionText: '$58,000 CAD / year (approx $38,000 USD)',
    minCgpa: 3.5,
    ieltsMinOverall: 7.0,
    ieltsMinBand: 6.5,
    toeflMin: 93,
    greRequired: false,
    applicationDeadlineFall: 'January 15',
    applicationDeadlineSpring: 'September 15',
    visaSuccessRatePercent: 88,
    scholarshipsAvailable: ['Lester B. Pearson International Scholarship (Full)', 'U of T International Merit Award'],
    postGradWorkPermitYears: 3,
    officialWebsite: 'https://www.utoronto.ca',
    descriptionBangla: 'কানাডার সেরা বিশ্ববিদ্যালয়। কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিংয়ে বিশ্বজুড়ে শীর্ষস্থানী। মাস্টার্সে গবেষণা ফান্ডিং (TA/RA) পাওয়ার বেশ সুযোগ রয়েছে।',
    keyHighlights: ['৩ বছরের PGWP ওয়ার্ক পারমিট', 'গবেষণায় বিপুল ফান্ডিং', 'টরন্টো টেক হাবের কাছাকাছি']
  },
  {
    id: 'u-ubc',
    name: 'University of British Columbia (UBC)',
    country: 'Canada',
    city: 'Vancouver, BC',
    worldRank: 34,
    programs: ['Computer Science', 'Environmental Science', 'Business Analytics', 'Electrical Engineering', 'Civil Engineering'],
    tuitionFeeUSDPerYear: 34000,
    livingCostUSDPerYear: 15000,
    currency: 'CAD',
    originalTuitionText: '$52,000 CAD / year',
    minCgpa: 3.4,
    ieltsMinOverall: 6.5,
    ieltsMinBand: 6.0,
    toeflMin: 90,
    greRequired: false,
    applicationDeadlineFall: 'December 1',
    applicationDeadlineSpring: 'Closed',
    visaSuccessRatePercent: 89,
    scholarshipsAvailable: ['International Leader of Tomorrow Award', 'International Major Entrance Scholarship'],
    postGradWorkPermitYears: 3,
    officialWebsite: 'https://www.ubc.ca',
    descriptionBangla: 'ভ্যাঙ্কুভারে অবস্থিত অত্যন্ত মনোরম ক্যাম্পাস। STEM ও গ্রিন এনার্জি গবেষণার জন্য বিশ্বখ্যাত। বাংলাদেশিদের জন্য স্কলারশিপের ব্যবস্থা আছে।',
    keyHighlights: ['মাইল্ড ওয়েদার', 'বিপুল স্কলারশিপ বাজেট', 'PGWP সুযোগ']
  },
  {
    id: 'u-alberta',
    name: 'University of Alberta',
    country: 'Canada',
    city: 'Edmonton, Alberta',
    worldRank: 96,
    programs: ['Artificial Intelligence', 'Software Engineering', 'Petroleum Engineering', 'Data Analytics', 'Nursing'],
    tuitionFeeUSDPerYear: 23000,
    livingCostUSDPerYear: 11000,
    currency: 'CAD',
    originalTuitionText: '$35,000 CAD / year',
    minCgpa: 3.0,
    ieltsMinOverall: 6.5,
    ieltsMinBand: 6.0,
    toeflMin: 88,
    greRequired: false,
    applicationDeadlineFall: 'March 1',
    applicationDeadlineSpring: 'October 1',
    visaSuccessRatePercent: 92,
    scholarshipsAvailable: ['University of Alberta Centenary Award', 'Amii AI Research Fellowship'],
    postGradWorkPermitYears: 3,
    officialWebsite: 'https://www.ualberta.ca',
    descriptionBangla: 'এআই ও মেশিন লার্নিংয়ের জন্য বিশ্বের অন্যতম সেরা হাব (Amii)। টিউশন ফি তুলনামূলক কম এবং আলবার্টায় ট্যাক্স ও লিভিং কস্ট টরন্টোর চেয়ে অনেক কম।',
    keyHighlights: ['কম খরচে পড়ালেখা', 'AI ও সফটওয়্যারের শীর্ষ হাব', 'সহজ প্রভিন্সিয়াল নমিনেশন (PNP)']
  },
  {
    id: 'u-tum',
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    city: 'Munich, Bavaria',
    worldRank: 28,
    programs: ['Informatics / CS', 'Data Engineering', 'Robotics & AI', 'Automotive Engineering', 'Management & Tech'],
    tuitionFeeUSDPerYear: 4300,
    livingCostUSDPerYear: 12000,
    currency: 'EUR',
    originalTuitionText: '€2,000 - €3,000 / semester (TUM Non-EU fee)',
    minCgpa: 3.3,
    ieltsMinOverall: 6.5,
    ieltsMinBand: 6.0,
    toeflMin: 88,
    greRequired: false,
    applicationDeadlineFall: 'May 31',
    applicationDeadlineSpring: 'November 30',
    visaSuccessRatePercent: 94,
    scholarshipsAvailable: ['DAAD Master Studies Scholarship', 'Deutschlandstipendium'],
    postGradWorkPermitYears: 1.5,
    officialWebsite: 'https://www.tum.de',
    descriptionBangla: 'জার্মানির এক নম্বর টেকনিক্যাল ইউনিভার্সিটি। বিএমডব্লিউ, সেমেন্স ও হাইটেক ইন্ডাস্ট্রির সাথে সরাসরি সংযোগ। ডিগ্রি ইংরেজি মাধ্যমে।',
    keyHighlights: ['অত্যন্ত সাশ্রয়ী টিউটর ফি', '১৮ মাসের পোস্ট-স্টাডি ভিসা', 'জার্মানির ইউরোপীয় জব মার্কেট']
  },
  {
    id: 'u-rwth',
    name: 'RWTH Aachen University',
    country: 'Germany',
    city: 'Aachen, NRW',
    worldRank: 90,
    programs: ['Mechanical Engineering', 'Computer Engineering', 'Production Systems', 'Biomedical Tech'],
    tuitionFeeUSDPerYear: 0,
    livingCostUSDPerYear: 10500,
    currency: 'EUR',
    originalTuitionText: '0 Tuition Fee (€320/semester semester contribution only)',
    minCgpa: 3.0,
    ieltsMinOverall: 6.5,
    ieltsMinBand: 6.0,
    toeflMin: 90,
    greRequired: true,
    applicationDeadlineFall: 'March 1',
    applicationDeadlineSpring: 'September 1',
    visaSuccessRatePercent: 95,
    scholarshipsAvailable: ['DAAD Study Scholarships', 'RWTH Education Fund'],
    postGradWorkPermitYears: 1.5,
    officialWebsite: 'https://www.rwth-aachen.de',
    descriptionBangla: 'বিনামূল্যে টিউশন ফি! শুধুমাত্র ৫০০ ইউরোর মতো সেমিস্টার ফি দিতে হয়। ইঞ্জিনিয়ারিং ও সিএস গবেষণার অন্যতম প্রধান কেন্দ্র।',
    keyHighlights: ['১০০% শূন্য টিউশন ফি', 'ব্লকড অ্যাকাউন্ট সুবিধা (€11,904)', 'হাইটেক ল্যাব ও ইন্টার্নশিপ']
  },
  {
    id: 'u-manchester',
    name: 'University of Manchester',
    country: 'UK',
    city: 'Manchester',
    worldRank: 32,
    programs: ['Advanced Computer Science', 'Data Analytics', 'Biotechnology', 'Finance & Accounting'],
    tuitionFeeUSDPerYear: 32000,
    livingCostUSDPerYear: 13000,
    currency: 'GBP',
    originalTuitionText: '£27,000 / year',
    minCgpa: 3.2,
    ieltsMinOverall: 6.5,
    ieltsMinBand: 6.0,
    toeflMin: 90,
    greRequired: false,
    applicationDeadlineFall: 'July 31',
    applicationDeadlineSpring: 'Closed',
    visaSuccessRatePercent: 91,
    scholarshipsAvailable: ['Chevening Scholarship (Full)', 'GREAT Scholarship UK', 'Manchester Global Award'],
    postGradWorkPermitYears: 2,
    officialWebsite: 'https://www.manchester.ac.uk',
    descriptionBangla: 'যুক্তরাজ্যের রাসেল গ্রুপের অন্তর্ভুক্ত সম্মানজনক বিশ্ববিদ্যালয়। ১ বছরের দ্রুতগতির মাস্টার্স কোর্স এবং ২ বছরের গ্র্যাজুয়েট রুট ভিসা।',
    keyHighlights: ['১ বছরেই মাস্টার্স শেষ', '২ বছরের Graduate Route Visa', 'রাসেল গ্রুপ ইউনিভার্সিটি']
  },
  {
    id: 'u-uiuc',
    name: 'University of Illinois Urbana-Champaign (UIUC)',
    country: 'USA',
    city: 'Urbana, Illinois',
    worldRank: 35,
    programs: ['Computer Science MS', 'Electrical Engineering', 'Civil Engineering', 'Finance', 'Data Science'],
    tuitionFeeUSDPerYear: 36000,
    livingCostUSDPerYear: 13500,
    currency: 'USD',
    originalTuitionText: '$36,000 USD / year',
    minCgpa: 3.5,
    ieltsMinOverall: 7.5,
    ieltsMinBand: 7.0,
    toeflMin: 102,
    greRequired: true,
    applicationDeadlineFall: 'December 15',
    applicationDeadlineSpring: 'September 1',
    visaSuccessRatePercent: 86,
    scholarshipsAvailable: ['Graduate Teaching Assistantship (Full Waiver + Stipend)', 'Graduate Research Assistantship'],
    postGradWorkPermitYears: 3,
    officialWebsite: 'https://illinois.edu',
    descriptionBangla: 'ইউএসএ-র কম্পিউটার সায়েন্সের টপ-৫ প্রোগামের একটি। প্রায় ৮০% মাস্টার্স/পিএইচডি শিক্ষার্থী TA/RA ওয়েভার ও মাসিক বেতন পায়।',
    keyHighlights: ['১০০% টিউশন ওয়েভার সহ TA/RA ফান্ডিং', 'STEM OPT (৩ বছর যুক্তরাষ্ট্রে কাজ করার সুযোগ)', 'সিলিকন ভ্যালিতে বিশাল নেটওয়ার্ক']
  },
  {
    id: 'u-unsw',
    name: 'UNSW Sydney (University of New South Wales)',
    country: 'Australia',
    city: 'Sydney, NSW',
    worldRank: 19,
    programs: ['Information Technology', 'Cybersecurity', 'Renewable Energy Engineering', 'MBA'],
    tuitionFeeUSDPerYear: 32000,
    livingCostUSDPerYear: 16000,
    currency: 'AUD',
    originalTuitionText: '$49,000 AUD / year',
    minCgpa: 3.2,
    ieltsMinOverall: 6.5,
    ieltsMinBand: 6.0,
    toeflMin: 90,
    greRequired: false,
    applicationDeadlineFall: 'March 31',
    applicationDeadlineSpring: 'November 30',
    visaSuccessRatePercent: 87,
    scholarshipsAvailable: ['International Scientia Coursework Scholarship', 'Australia Awards Scholarship'],
    postGradWorkPermitYears: 3,
    officialWebsite: 'https://www.unsw.edu.au',
    descriptionBangla: 'অস্ট্রেলিয়ার গ্রুপ অফ এইট (Go8) সদস্য। সিডনির প্রাণকেন্দ্রে ক্যাম্পাস। প্র্যাকটিক্যাল কো-অপ ও পার্ট-টাইম জব সুবিধা অসাধারণ।',
    keyHighlights: ['Go8 বিশ্ববিদ্যালয়', 'পার্ট টাইম ২৪ ঘন্টা/সপ্তাহ কাজের সুযোগ', 'দীর্ঘমেয়াদী পোস্ট স্টাডি পারমিট']
  },
  {
    id: 'u-helsinki',
    name: 'University of Helsinki',
    country: 'Finland',
    city: 'Helsinki',
    worldRank: 115,
    programs: ['Computer Science', 'Data Science', 'Atmospheric Sciences', 'Neuroscience'],
    tuitionFeeUSDPerYear: 14000,
    livingCostUSDPerYear: 9500,
    currency: 'EUR',
    originalTuitionText: '€13,000 / year (Up to 100% Scholarship available)',
    minCgpa: 3.2,
    ieltsMinOverall: 6.5,
    ieltsMinBand: 6.0,
    toeflMin: 92,
    greRequired: false,
    applicationDeadlineFall: 'January 4',
    applicationDeadlineSpring: 'Closed',
    visaSuccessRatePercent: 96,
    scholarshipsAvailable: ['University of Helsinki Denmark & Finland Merit Scholarship (100% Tuition)'],
    postGradWorkPermitYears: 2,
    officialWebsite: 'https://www.helsinki.fi',
    descriptionBangla: 'ফিনল্যান্ডের এক নম্বর বিশ্ববিদ্যালয়। অসাধারণ ওয়ার্ক-লাইফ ব্যালেন্স, কম লিভিং কস্ট এবং শতভাগ পর্যন্ত টিউশন ওয়েভার পাওয়া যায়।',
    keyHighlights: ['১০০% স্কলারশিপ ওয়েভার সুযোগ', 'শিক্ষার্থী ফ্রেন্ডলি পিআর পলিসি', 'বিশ্বের সবচেয়ে সুখী দেশ']
  }
];

export const SCHOLARSHIPS_DATABASE: Scholarship[] = [
  {
    id: 's-daad',
    title: 'DAAD EPOS / Master Scholarships',
    country: 'Germany',
    coverage: 'Full Funding',
    degreeLevels: ['Masters', 'PhD'],
    minCgpa: 3.0,
    deadline: 'October 31 (varies by program)',
    grantAmountText: '€934/month stipend + Full Tuition Waiver + Health Insurance + Travel Flight Ticket',
    descriptionBangla: 'জার্মান সরকারের সবচেয়ে বড় স্কলারশিপ। সম্পূর্ণ টিউশন ফ্রি, সাথে প্রতি মাসে প্রায় ৯৩৪ ইউরো স্টাইপেন্ড এবং বিনামূল্যে বিমান টিকিট।',
    eligibilityCriteriaBangla: [
      'ব্যাচেলরস ডিগ্রী সমমান সম্পন্ন',
      'কমপক্ষে ২ বছরের প্রফেশনাল কাজের অভিজ্ঞতা (EPOS এর জন্য)',
      'IELTS Score минимум 6.5',
      'ভালো একাডেমিক ট্র্যাক রেকর্ড'
    ],
    officialLink: 'https://www.daad.de'
  },
  {
    id: 's-erasmus',
    title: 'Erasmus Mundus Joint Master Degree (EMJMD)',
    country: 'Germany', // Multi-country Europe
    coverage: 'Full Funding',
    degreeLevels: ['Masters'],
    minCgpa: 3.3,
    deadline: 'January 15',
    grantAmountText: '€1,400/month stipend + Full Tuition Fees + Travel Allowance (€3,000/yr)',
    descriptionBangla: 'ইউরোপিয়ান ইউনিয়নের সবচেয়ে অভিজাত স্কলারশিপ। ইউরোপের ৩টি ভিন্ন দেশের ৩টি ইউনিভার্সিটিতে পড়ার সুযোগ পাওয়া যায়।',
    eligibilityCriteriaBangla: [
      'ব্যাচেলরস ডিগ্রী',
      'ইংরেজিতে দক্ষতা (IELTS 6.5+)',
      'স্ট্রং SOP ও ৩টি লেটার অফ রেকমেন্ডেশন',
      'যেকোনো দেশের নাগরিক আবেদন করতে পারবেন'
    ],
    officialLink: 'https://erasmus-plus.ec.europa.eu'
  },
  {
    id: 's-chevening',
    title: 'UK Chevening Scholarship',
    country: 'UK',
    coverage: 'Full Funding',
    degreeLevels: ['Masters'],
    minCgpa: 3.2,
    deadline: 'November 5',
    grantAmountText: '100% Tuition Fees + Monthly Living Allowance (£1,300+) + Economy Flight Ticket',
    descriptionBangla: 'যুক্তরাজ্য সরকারের মর্যাদাপূর্ণ স্কলারশিপ। ১ বছরের যেকোনো মাস্টার্স কোর্সের সম্পূর্ণ খরচ বহন করা হয়।',
    eligibilityCriteriaBangla: [
      'কমপক্ষে ২ বছরের কাজের অভিজ্ঞতা (২৮০০ ঘন্টা)',
      'কোর্স শেষ করে বাংলাদেশে ফেরত আসার প্রতিশ্রুতি',
      'যুক্তরাজ্যের ৩টি বিশ্ববিদ্যালয়ে অফার লেটার'
    ],
    officialLink: 'https://www.chevening.org'
  },
  {
    id: 's-vanier',
    title: 'Vanier Canada Graduate Scholarships',
    country: 'Canada',
    coverage: 'Full Funding',
    degreeLevels: ['PhD'],
    minCgpa: 3.7,
    deadline: 'November 1',
    grantAmountText: '$50,000 CAD per year for 3 years',
    descriptionBangla: 'কানাডার ডক্টরাল (PhD) পর্যায়ের সবচেয়ে বড় স্কলারশিপ। গবেষণায় উচ্চ মেধা ও লিডারশিপ যোগ্যতা থাকা প্রয়োজন।',
    eligibilityCriteriaBangla: [
      'কানাডিয়ান ইউনিভার্সিটি থেকে নমিনেশন',
      'উচ্চ CGPA (3.7+ out of 4.0)',
      'গবেষণা প্রকাশনা (Research Papers)'
    ],
    officialLink: 'https://vanier.gc.ca'
  },
  {
    id: 's-fulbright',
    title: 'Fulbright Foreign Student Program (USA)',
    country: 'USA',
    coverage: 'Full Funding',
    degreeLevels: ['Masters'],
    minCgpa: 3.3,
    deadline: 'May 31',
    grantAmountText: 'Full Tuition + Monthly Living Stipend + Health Insurance + Roundtrip Airfare',
    descriptionBangla: 'মার্কিন সরকারের ফ্ল্যাগশিপ স্কলারশিপ। বাংলাদেশি গ্র্যাজুয়েটদের জন্য প্রতি বছর ঢাকায় অবস্থিত আমেরিকান এম্বাসি সার্কুলার দেয়।',
    eligibilityCriteriaBangla: [
      'বাংলাদেশের নাগরিক',
      'ব্যাচেলরে ন্যূনতম ১৬ বছরের শিক্ষা সম্পন্ন',
      'IELTS 7.0 / TOEFL 90+',
      '২ বছরের কাজের অভিজ্ঞতা'
    ],
    officialLink: 'https://bd.usembassy.gov/education-culture/fulbright-program'
  }
];

export const DEFAULT_DOCUMENT_CHECKLIST: DocumentCheckitem[] = [
  {
    id: 'doc-passport',
    titleEn: 'Valid International Passport',
    titleBn: 'বৈধ আন্তর্জাতিক পাসপোর্ট',
    category: 'Legal & Visa',
    requiredForCountries: ['Canada', 'USA', 'UK', 'Germany', 'Australia', 'Japan', 'Finland', 'Sweden'],
    isCompleted: false,
    explanationBn: 'মেয়াদ আবেদনের সময় থেকে কমপক্ষে ২ বছর থাকতে হবে। নাম ও বয়সের বানান এসএসসি সনদের সাথে হুবহু মিল থাকতে হবে।',
    commonMistakesBn: 'পাসপোর্টের নামের সাথে সার্টিফিকেটের নামের বানান ভুল বা স্পেস না মেলা।'
  },
  {
    id: 'doc-transcript',
    titleEn: 'Academic Transcripts & Certificates (SSC, HSC, Bachelor)',
    titleBn: 'একাডেমিক ট্রান্সক্রিপ্ট ও মূল সনদপত্র',
    category: 'Academic',
    requiredForCountries: ['Canada', 'USA', 'UK', 'Germany', 'Australia', 'Japan', 'Finland', 'Sweden'],
    isCompleted: false,
    explanationBn: 'শিক্ষা বোর্ড ও বিশ্ববিদ্যালয় থেকে সত্যয়িত (Attested) ট্রান্সক্রিপ্ট ও সার্টিফিকেট। জার্মানির জন্য শিক্ষা মন্ত্রণালয় ও পররাষ্ট্র মন্ত্রণালয় এটেস্টেড লাগে।',
    commonMistakesBn: 'ট্রান্সক্রিপ্ট অফিসিয়াল সিয়ালড এনভেলপে (Sealed Envelope) না রাখা।'
  },
  {
    id: 'doc-english',
    titleEn: 'English Proficiency Test Score (IELTS / TOEFL / Duolingo)',
    titleBn: 'ইংরেজি দক্ষতার টেস্ট স্কোররিপোর্ট',
    category: 'Language',
    requiredForCountries: ['Canada', 'USA', 'UK', 'Germany', 'Australia', 'Japan', 'Finland', 'Sweden'],
    isCompleted: false,
    explanationBn: 'আইইএলটিএস অফিশিয়াল TRF স্কোরকার্ড। সরাসরি টেস্ট সেন্টার থেকে সেন্ট্রাল পোর্টাল বা ভার্সিটি কোডে পাঠান।',
    commonMistakesBn: 'কোর্স চলাকালীন মেয়াদ (২ বছর) পার হয়ে যাওয়া।'
  },
  {
    id: 'doc-sop',
    titleEn: 'Statement of Purpose (SOP) / Cover Letter',
    titleBn: 'স্টেটমেন্ট অফ পারপাস (SOP)',
    category: 'Personal',
    requiredForCountries: ['Canada', 'USA', 'UK', 'Germany', 'Australia', 'Japan', 'Finland', 'Sweden'],
    isCompleted: false,
    explanationBn: 'কেন এই বিশ্ববিদ্যালয়, কেন এই কোর্স, ক্যারিয়ার গোল কি এবং দেশেই কেন ফিরে আসবেন তার সুনির্দিষ্ট ১-২ পৃষ্ঠার আত্মপক্ষ সমর্থন।',
    commonMistakesBn: 'ChatGPT বা ইন্টারনেটের গাদাগাদা কপি-পেস্ট করা জেনোটিক SOP জমা দেওয়া।'
  },
  {
    id: 'doc-lor',
    titleEn: 'Letters of Recommendation (LOR - 2 or 3 Professors/Employers)',
    titleBn: 'সুপারিশপত্র বা রেকমেন্ডেশন লেটার',
    category: 'Academic',
    requiredForCountries: ['Canada', 'USA', 'UK', 'Germany', 'Australia', 'Japan', 'Finland', 'Sweden'],
    isCompleted: false,
    explanationBn: 'বিশ্ববিদ্যালয়ের শিক্ষক বা কর্মক্ষেত্রের উর্ধতন কর্মকর্তার কাছ থেকে অফিশিয়াল প্যাডে লিখিত মূল্যায়নপত্র।',
    commonMistakesBn: 'প্রফেশনাল ইমেইল আইডি (@university.edu.bd) ব্যবহার না করে সাধারণ জিমেইল দেওয়া।'
  },
  {
    id: 'doc-bank',
    titleEn: 'Bank Solvency Certificate & 6-Month Statement',
    titleBn: 'ব্যাংক সলভেন্সি ও ৬ মাসের ব্যাংক স্টেটমেন্ট',
    category: 'Financial',
    requiredForCountries: ['Canada', 'USA', 'UK', 'Australia'],
    isCompleted: false,
    explanationBn: 'প্রথম বছরের টিউশন ফি ও লিভিং কস্টের সমপরিমাণ টাকা (কমপক্ষে ৩০-৪০ লাখ টাকা) স্পন্সরের অ্যাকাউন্টে ৬ মাস ধরে স্থিতিশীল থাকা।',
    commonMistakesBn: 'ভিসা আবেদনের ১ দিন আগে হঠাৎ বিশাল অংকের টাকা জমা দেওয়া (Source of Fund ব্যাখ্যা করতে না পারা)।'
  },
  {
    id: 'doc-blocked',
    titleEn: 'German Blocked Account (€11,904 Expatrio/Fintiba)',
    titleBn: 'জার্মান ব্লকড অ্যাকাউন্ট আমানত (€11,904)',
    category: 'Financial',
    requiredForCountries: ['Germany'],
    isCompleted: false,
    explanationBn: 'জার্মানির ভিসা প্রসেসের জন্য ১১,৯০৪ ইউরো এক্সেপ্যাট্রিও বা ফিনটিবা অ্যাকাউন্টে জমা দিয়ে সিকিউরিটি কনফার্মেশন স্লিপ নিতে হয়।',
    commonMistakesBn: 'অ্যাকাউন্ট খোলার সময় পাসপোর্ট নাম্বার ভুল ইনপুট দেওয়া।'
  },
  {
    id: 'doc-gic',
    titleEn: 'Canada Guaranteed Investment Certificate (GIC $20,635 CAD)',
    titleBn: 'কানাডা GIC ডিপোজিট সার্টিফিকেট ($20,635 CAD)',
    category: 'Financial',
    requiredForCountries: ['Canada'],
    isCompleted: false,
    explanationBn: 'Scotiabank বা CIBC ব্যাংক একাউন্টে ২০,৬৩৫ ক্যানাডিয়ান ডলার জমা দিয়ে GIC ফান্ড কনফার্মেশন সার্টিফিকেট জোগাড় করা।',
    commonMistakesBn: 'ভুল কারেন্সি ট্রান্সফারের কারণে ফান্ড শর্টেজ পড়া।'
  }
];

export const VISA_QUESTIONS_SAMPLE: VisaInterviewQuestion[] = [
  {
    id: 'vq-1',
    country: 'USA',
    questionText: 'Why do you want to study at this specific US university instead of studying in Bangladesh?',
    category: 'Intent',
    sampleGoodAnswerEn: 'I selected UIUC because of its specialized research in Distributed Systems and high-performance computing, led by Prof. Smith. In Bangladesh, while we have good foundational CS courses, we lack state-of-the-art labs and industry-collaborative projects in cloud infrastructure that UIUC provides.',
    keyTipsBn: 'বিশ্ববিদ্যালয়ের সুনির্দিষ্ট প্রফেসর, ল্যাব এবং কোর্স কারিকুলামের বিশেষত্ব তুলে ধরুন। সাধারণ কথা না বলে কনক্রিট তথ্য দিন।'
  },
  {
    id: 'vq-2',
    country: 'USA',
    questionText: 'Who is funding your education and what is their source of income?',
    category: 'Finances',
    sampleGoodAnswerEn: 'My education is co-funded by a 50% Research Assistantship from UIUC, and the remaining tuition and living expenses will be covered by my father. He owns a textile export business in Dhaka with an annual net income of 45 Lakh BDT, and we have $45,000 USD liquid savings in Prime Bank.',
    keyTipsBn: 'স্পন্সরের পেশা, বার্ষিক নিট আয় এবং ব্যাংকে লিকুইড ক্যাশের পরিমাণ এক বাক্যে স্পষ্ট করে বলুন।'
  },
  {
    id: 'vq-3',
    country: 'Canada',
    questionText: 'What are your career plans after completing your degree in Canada?',
    category: 'Ties to Home Country',
    sampleGoodAnswerEn: 'Upon graduation, I plan to return to Bangladesh to join top tech giants like Brain Station 23 or Enosis Solutions as a Senior Software Architect. The growing IT export industry in Bangladesh has a huge demand for engineers with North American advanced credentials.',
    keyTipsBn: 'অবশ্যই বাংলাদেশে ফিরে আসার সুনির্দিষ্ট ক্যারিয়ার পরিকল্পনা তুলে ধরবেন। ভিসা অফিসারকে নিশ্চিত করতে হবে যে আপনি পড়াশোনা শেষে ফিরে আসবেন।'
  },
  {
    id: 'vq-4',
    country: 'Germany',
    questionText: 'Why did you choose Germany and do you speak any German?',
    category: 'Intent',
    sampleGoodAnswerEn: 'Germany is world-renowned for tuition-free high quality engineering education. I am enrolled in a 100% English-taught MSc at TUM. To easily integrate into daily life, I have already completed A1 German at Goethe-Institut Dhaka and am continuing A2 studies.',
    keyTipsBn: 'প্রোগামটি ইংরেজিতে হলেও A1/A2 জার্মান ভাষার প্রাথমিক কোর্স করার কথা বললে ভিসা অফিসারের কাছে পজিটিভ ইমপ্রেশন তৈরি হয়।'
  }
];

export const GROUNDED_POLICY_KNOWLEDGE_BASE = `
OFFICIAL EMBASSY & IMMIGRATION RULES GROUNDING SHEET (FOR RAG & CHATBOT):

1. CANADA STUDY PERMIT & SDS / NON-SDS RULES:
- Minimum Living Expense GIC Deposit: $20,635 CAD (Effective 2024+).
- Off-campus work limit: 24 hours per week during academic sessions, full-time during official scheduled breaks.
- Post-Graduation Work Permit (PGWP): Eligible up to 3 years for Master's programs (even 1-year master's now eligible for 3-year PGWP).
- PAL (Provincial Attestation Letter): Required for undergraduate and college students; Master's and PhD applicants are EXEMPT from PAL.

2. GERMANY STUDENT VISA & BLOCKED ACCOUNT RULES:
- Blocked Account (Sperrkonto): Minimum €11,904 per year (€992/month).
- Tuition Fees: Public universities in most states (except Baden-Württemberg & TUM) are TUITION-FREE (€0), with semester contribution €250-€350.
- Work Rights: 140 full days or 280 half days per year.
- Post-Study Work Visa: 18 months job seeker visa after graduation.

3. USA F-1 VISA & SEVIS RULES:
- SEVIS Fee: $350 USD (I-901 fee).
- DS-160 Form filing required before scheduling visa interview at US Embassy Dhaka.
- Proof of Funds: Must show I-20 amount (Tuition + Living) for 1 full year in liquid funds (Bank Statement, Fixed Deposit, Loan).
- STEM OPT Extension: 12 months standard OPT + 24 months STEM OPT extension (Total 36 months work authorization).

4. UNITED KINGDOM (UK) STUDENT VISA RULES:
- CAS (Confirmation of Acceptance for Studies) required from university.
- Maintenance Funds: £1,334/month for London or £1,023/month outside London (for 9 months). Funds must be held in bank for 28 consecutive days.
- IHS (Immigration Health Surcharge): £776 per year of study.
- Graduate Route Visa: 2 years post-study work permit.

5. AUSTRALIA STUDENT VISA (SUBCLASS 500) RULES:
- Genuine Student (GS) Requirement replaced GTE.
- Proof of Funds: Minimum AUD $29,710 for living expenses + 1 year tuition + travel cost.
- Work Limit: 48 hours per fortnight (24 hrs/week).
`;
