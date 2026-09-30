export type Country = 'Canada' | 'USA' | 'UK' | 'Germany' | 'Australia' | 'Japan' | 'Finland' | 'Sweden';

export interface University {
  id: string;
  name: string;
  country: Country;
  city: string;
  worldRank: number;
  programs: string[];
  tuitionFeeUSDPerYear: number;
  livingCostUSDPerYear: number;
  currency: string;
  originalTuitionText: string;
  minCgpa: number;
  ieltsMinOverall: number;
  ieltsMinBand?: number;
  toeflMin?: number;
  greRequired: boolean;
  applicationDeadlineFall: string;
  applicationDeadlineSpring: string;
  visaSuccessRatePercent: number;
  scholarshipsAvailable: string[];
  postGradWorkPermitYears: number;
  officialWebsite: string;
  descriptionBangla: string;
  keyHighlights: string[];
}

export interface Scholarship {
  id: string;
  title: string;
  country: Country;
  coverage: 'Full Funding' | 'Partial Tuition' | 'Monthly Stipend' | 'Tuition Waiver';
  degreeLevels: ('Bachelors' | 'Masters' | 'PhD')[];
  minCgpa: number;
  deadline: string;
  grantAmountText: string;
  descriptionBangla: string;
  eligibilityCriteriaBangla: string[];
  officialLink: string;
}

export interface DocumentCheckitem {
  id: string;
  titleEn: string;
  titleBn: string;
  category: 'Academic' | 'Financial' | 'Language' | 'Legal & Visa' | 'Personal';
  requiredForCountries: Country[];
  isCompleted: boolean;
  explanationBn: string;
  commonMistakesBn: string;
}

export interface ApplicationReadinessRequest {
  cgpa: number;
  cgpaScale: number;
  ieltsScore: number;
  greScore?: number;
  targetCountry: Country;
  targetMajor: string;
  targetDegree: 'Bachelors' | 'Masters' | 'PhD';
  sopDraftText?: string;
  cvSummaryText?: string;
  bankSolvencyBDT?: number;
  hasWorkOrResearchExp: boolean;
}

export interface ApplicationReadinessResponse {
  overallScorePercent: number;
  categoryScores: {
    academicMatch: number;
    languageProficiency: number;
    sopQuality: number;
    financialViability: number;
  };
  readinessLevelText: string;
  strengths: string[];
  criticalGaps: string[];
  recommendedNextStepsBn: {
    priority: 'High' | 'Medium' | 'Low';
    title: string;
    description: string;
  }[];
  mentorSummaryBn: string;
}

export interface VisaInterviewQuestion {
  id: string;
  country: Country;
  questionText: string;
  category: 'Intent' | 'Finances' | 'Academic Background' | 'Ties to Home Country';
  sampleGoodAnswerEn: string;
  keyTipsBn: string;
}

export interface VisaEvaluationResponse {
  scores: {
    confidence: number;
    grammar: number;
    relevance: number;
    authenticity: number;
  };
  feedbackBn: string;
  betterAnswerEn: string;
  keyAdvicePointsBn: string[];
}

export interface SimplifierResponse {
  simplifiedBn: string;
  requiredDocuments: string[];
  importantDeadlines: string[];
  actionTipsBn: string[];
}

export interface DocumentAuditField {
  score: number;
  status: 'Strong' | 'Adequate' | 'Needs Improvement';
  strengths: string[];
  weaknesses: string[];
  actionableSuggestionsBn: string[];
  generatedFormattedDocText: string;
}

export interface DocumentAuditResponse {
  overallDocumentReadinessScore: number;
  summaryVerdictBn: string;
  documentAudits: {
    transcript: DocumentAuditField;
    cv: DocumentAuditField;
    sop: DocumentAuditField;
    languageScore: DocumentAuditField;
    recommendationLetters: DocumentAuditField;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  groundingSources?: { title: string; url: string }[];
  isFunctionResult?: boolean;
}
