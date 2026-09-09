export type UserRole = 'PROCUREMENT_OFFICER' | 'BIDDER' | 'ADMIN' | 'AUDITOR';

export type PortalType = 
  | 'UDYAM_MSME'
  | 'GSTN'
  | 'PAN_INCOME_TAX'
  | 'MCA21'
  | 'STARTUP_INDIA'
  | 'NSIC'
  | 'EPFO_ESIC'
  | 'DIGILOCKER'
  | 'BIS_DPIIT'
  | 'CPPP_BLACKLIST';

export type VerificationStatus = 'VERIFIED' | 'DISCREPANCY' | 'FAILED' | 'PENDING';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'DISQUALIFIED';

export type DecisionStatus = 
  | 'UNDER_EVALUATION'
  | 'QUALIFIED_FOR_COMMERCIAL'
  | 'CLARIFICATION_SOUGHT'
  | 'DISQUALIFIED'
  | 'PROVISIONALLY_APPROVED';

export interface PortalCheckResult {
  portal: PortalType;
  portalName: string;
  department: string;
  status: VerificationStatus;
  confidenceScore: number;
  lastCheckedAt: string;
  referenceId: string;
  summary: string;
  matchedFields: {
    field: string;
    submittedValue: string;
    portalValue: string;
    match: boolean;
  }[];
  flags: string[];
  rawPayload?: Record<string, any>;
}

export interface BidDocument {
  id: string;
  title: string;
  category: 'GST_CERT' | 'UDYAM_CERT' | 'CA_TURNOVER' | 'MII_UNDERTAKING' | 'PAST_EXPERIENCE' | 'EMD_EXEMPTION' | 'OEM_AUTH' | 'ITR_RETURNS';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  digiLockerVerified: boolean;
  digiLockerHash?: string;
  status: VerificationStatus;
  extractedDetails?: Record<string, string | number | boolean>;
  verificationNote?: string;
}

export interface ClauseCompliance {
  clauseId: string;
  clauseTitle: string;
  statutoryReference: string; // e.g. "GFR 2017 Rule 144(xi)"
  requirement: string;
  bidderClaim: string;
  complianceStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'EXEMPTED' | 'NEEDS_CLARIFICATION';
  notes: string;
}

export interface AIComplianceAnalysis {
  complianceScore: number; // 0 to 100
  riskLevel: RiskLevel;
  statutoryScore: number; // /25
  financialScore: number; // /25
  technicalScore: number; // /25
  policyScore: number; // /25
  executiveSummary: string;
  keyStrengths: string[];
  riskFlags: string[];
  pendingRemediations: {
    id: string;
    issue: string;
    requiredAction: string;
    severity: 'CRITICAL' | 'MAJOR' | 'MINOR';
    deadlineHours?: number;
    status: 'OPEN' | 'RESOLVED' | 'WAIVED';
  }[];
  recommendation: 'RECOMMENDED_FOR_TECHNICAL_QUALIFICATION' | 'PROVISIONAL_PENDING_CLARIFICATION' | 'REJECT_NON_COMPLIANT';
  confidenceRate: number;
  evaluatedByModel: string;
  timestamp: string;
}

export interface ConsortiumPartner {
  id: string;
  name: string;
  role: 'LEAD_MEMBER' | 'JV_PARTNER' | 'TECHNOLOGY_PARTNER';
  equitySharePercent: number; // e.g. 60%
  annualTurnoverAvg: number; // in ₹ Lakhs
  pastExperienceYears: number;
  pan: string;
  gstId?: string;
  udyamId?: string;
  cin?: string;
  landBorderCleared: boolean;
  beneficialOwners: {
    name: string;
    nationality: string;
    equityPercent: number;
    landBorderCompliant: boolean;
    pepStatus?: boolean; // Politically Exposed Person
  }[];
  debarmentClean: boolean;
  udinTurnoverCert?: {
    udin: string;
    caMembershipNo: string;
    verifiedAmountLakhs: number;
    status: 'VERIFIED' | 'INVALID' | 'UNVERIFIED';
  };
}

export interface GazettedHoliday {
  date: string; // YYYY-MM-DD
  day: string;
  name: string;
  type: 'GAZETTED' | 'RESTRICTED';
}

export interface UDINVerificationResult {
  udin: string;
  caName: string;
  caMembershipNo: string;
  firmRegistrationNo: string;
  dateOfGeneration: string;
  documentType: string;
  financialFigureCertified: number; // in ₹ Lakhs
  status: 'ACTIVE_VERIFIED' | 'REVOKED' | 'EXPIRED' | 'INVALID_FORMAT';
  tamperProofHash: string;
  icaiPortalMatch: boolean;
}

export interface TECMember {
  name: string;
  designation: string;
  department: string;
  role: 'CHAIRMAN' | 'MEMBER_TECHNICAL' | 'MEMBER_FINANCE' | 'MEMBER_CONVENER' | 'EXTERNAL_EXPERT';
  digitalSignatureId: string;
  signedAt?: string;
}

export interface TECMinutesDossier {
  tenderId: string;
  bidNumber: string;
  tenderTitle: string;
  meetingDate: string;
  meetingLocation: string;
  committeeMembers: TECMember[];
  evaluatedBiddersCount: number;
  qualifiedCount: number;
  clarificationCount: number;
  disqualifiedCount: number;
  statutoryFindings: {
    gfr144xiSummary: string;
    makeInIndiaSummary: string;
    msmeSummary: string;
    consortiumSummary: string;
  };
  bidderEvaluations: {
    bidderId: string;
    bidderName: string;
    isConsortium: boolean;
    partnerCount: number;
    combinedTurnoverLakhs: number;
    localContentPercent: number;
    statutoryStatus: 'QUALIFIED' | 'DISQUALIFIED' | 'CLARIFICATION_PENDING';
    committeeJustification: string;
    clauseFindings: string[];
  }[];
  finalRecommendations: string;
  section65BHash: string;
}

export interface Bidder {
  id: string;
  tenderId: string;
  name: string;
  legalEntity: 'PRIVATE_LIMITED' | 'PUBLIC_LIMITED' | 'PARTNERSHIP' | 'PROPRIETORSHIP' | 'LLP' | 'CONSORTIUM_JV';
  udyamId: string;
  msmeCategory: 'MICRO' | 'SMALL' | 'MEDIUM' | 'NOT_APPLICABLE';
  gstId: string;
  pan: string;
  cin: string;
  isStartup: boolean;
  dpiitCertNumber?: string;
  isMakeInIndiaClass1: boolean;
  localContentPercent: number;
  submittedAt: string;
  bidAmount: number; // ₹ in Lakhs
  annualTurnoverAvg: number; // ₹ in Lakhs
  pastExperienceYears: number;
  // Consortium / JV Specific Fields
  isConsortium?: boolean;
  consortiumPartners?: ConsortiumPartner[];
  aggregatedTurnover?: number;
  consortiumLeadShare?: number;
  consortiumLandBorderStatus?: 'COMPLIANT' | 'NON_COMPLIANT' | 'UNDER_REVIEW';
  portalChecks: PortalCheckResult[];
  documents: BidDocument[];
  clauseCompliance: ClauseCompliance[];
  aiAnalysis: AIComplianceAnalysis;
  decisionStatus: DecisionStatus;
  decisionNotes?: string;
  officerRemarks?: string;
  officerActionDate?: string;
  clarificationDeadline?: string;
  clarificationNoticeIssuedAt?: string;
  clarificationWorkingHours?: number;
  clarificationSkippedHolidays?: string[];
}

export interface Tender {
  id: string;
  bidNumber: string; // e.g. "GEM/2026/B/892104"
  title: string;
  ministry: string;
  department: string;
  cpse: string;
  estimatedValueLakhs: number;
  closingDate: string;
  publishedDate: string;
  emdRequiredLakhs: number;
  emdExemptionForMSME: boolean;
  emdExemptionForStartups: boolean;
  minAverageTurnoverLakhs: number;
  minPastExperienceYears: number;
  minLocalContentPercent: number; // e.g. 50% for Class I
  status: 'EVALUATION_ACTIVE' | 'TECHNICAL_EVALUATION' | 'FINANCIAL_OPENING' | 'AWARDED';
  totalBidsReceived: number;
  verifiedBidsCount: number;
  flaggedBidsCount: number;
}

export interface AuditLogEntry {
  id: string;
  logSequence?: number;
  timestamp: string;
  action: string;
  category: 'PORTAL_QUERY' | 'AI_EVALUATION' | 'OFFICER_DECISION' | 'BIDDER_SUBMISSION' | 'RULE_MODIFICATION' | 'SYSTEM_EVENT' | 'DECISION' | 'PORTAL_RECONCILIATION' | 'AI_VERIFICATION' | 'BID_SUBMISSION' | 'CLARIFICATION' | 'SECURITY';
  actorRole: UserRole | 'SYSTEM_AI';
  actorName: string;
  actorDepartment?: string;
  tenderId?: string;
  bidderId?: string;
  entityId?: string;
  details: string;
  hash: string;
  currentHash?: string;
  previousHash: string;
  verified: boolean;
}

export interface StaticComplianceRule {
  id?: string;
  ruleCode: string;
  category: string;
  title: string;
  description?: string;
  statute?: string;
  statutoryReference?: string;
  thresholdCondition?: string;
  logicExpression?: string;
  severity?: 'DISQUALIFYING' | 'MAJOR' | 'MINOR';
  authority?: string;
  isMandatory?: boolean;
  active?: boolean;
  lastUpdated?: string;
}

export interface PortalIntegrationStatus {
  portal: PortalType;
  name: string;
  endpoint: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  lastPingMs: number;
  uptimePercent: number;
  dailyQueriesCount: number;
  securityProtocol: string;
}
