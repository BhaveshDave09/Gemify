import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  Download, 
  Printer, 
  Search, 
  Filter, 
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Send,
  Scale,
  Award,
  Users,
  Briefcase,
  FileSignature,
  FileCheck,
  CalendarDays
} from 'lucide-react';
import { Tender, Bidder, PortalCheckResult, PortalType, DecisionStatus, UserRole } from '../types/gem';
import { ComplianceMeter } from '../components/ComplianceMeter';
import { RiskBadge, DecisionStatusBadge } from '../components/RiskBadge';
import { PortalGrid } from '../components/PortalGrid';
import { DocumentVerificationList } from '../components/DocumentVerificationList';
import { ClauseComplianceTable } from '../components/ClauseComplianceTable';
import { PendingRequirementsAccordion } from '../components/PendingRequirementsAccordion';
import { AIRecommendationBox } from '../components/AIRecommendationBox';
import { PortalDetailModal } from '../components/PortalDetailModal';
import { OfficerDecisionModal } from '../components/OfficerDecisionModal';
import { EvaluationReportModal } from '../components/EvaluationReportModal';
import { ConsortiumEvaluationCard } from '../components/ConsortiumEvaluationCard';
import { TECMinutesModal } from '../components/TECMinutesModal';
import { ClarificationNoticeModal } from '../components/ClarificationNoticeModal';
import { UDINValidatorModal } from '../components/UDINValidatorModal';

interface DashboardViewProps {
  currentRole: UserRole;
  tenders: Tender[];
  selectedTender: Tender;
  bidders: Bidder[];
  selectedBidder: Bidder | null;
  onSelectBidder: (bidder: Bidder) => void;
  onReverifyPortal: (portal: PortalType) => void;
  onTriggerDeepAI: (bidderId: string) => void;
  onRecordOfficerDecision: (status: DecisionStatus, remarks: string, officerName: string, officerDept: string, customDeadline?: string) => void;
  isAnalyzing: boolean;
  isReverifying: string | null;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentRole,
  tenders,
  selectedTender,
  bidders,
  selectedBidder,
  onSelectBidder,
  onReverifyPortal,
  onTriggerDeepAI,
  onRecordOfficerDecision,
  isAnalyzing,
  isReverifying
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'consortium' | 'portals' | 'documents' | 'clauses' | 'remediation'>('overview');
  const [selectedPortalCheck, setSelectedPortalCheck] = useState<PortalCheckResult | null>(null);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isTECMinutesOpen, setIsTECMinutesOpen] = useState(false);
  const [isClarificationNoticeOpen, setIsClarificationNoticeOpen] = useState(false);
  const [isUdinValidatorOpen, setIsUdinValidatorOpen] = useState(false);
  const [udinInitialData, setUdinInitialData] = useState<{ udin: string; memberNo: string; amount: number }>({
    udin: '26049182AAAAAA1122',
    memberNo: '049182',
    amount: 285.0
  });
  const [searchFilter, setSearchFilter] = useState('');

  const tenderBidders = bidders.filter(b => b.tenderId === selectedTender.id);
  const filteredBidders = tenderBidders.filter(b => 
    b.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.gstId.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.udyamId.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeBidder = selectedBidder || filteredBidders[0] || bidders[0];

  const handleOpenUdinValidator = (udin?: string, memberNo?: string, amount?: number) => {
    if (udin) {
      setUdinInitialData({
        udin,
        memberNo: memberNo || '049182',
        amount: amount || 285.0
      });
    }
    setIsUdinValidatorOpen(true);
  };

  return (
    <div className="space-y-6" id="procurement-officer-dashboard">
      
      {/* 1. Tender Executive Summary Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="bg-blue-900 text-white font-mono font-bold px-2 py-0.5 rounded text-xs">
                {selectedTender.bidNumber}
              </span>
              <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-xs border border-slate-200">
                {selectedTender.ministry}
              </span>
              <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-xs border border-emerald-200">
                {selectedTender.status.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {selectedTender.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Procuring Entity: <strong className="text-slate-800">{selectedTender.cpse}</strong> ({selectedTender.department})
            </p>
          </div>

          {/* Key Tender Metrics Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Est. Value</span>
              <span className="font-extrabold text-slate-900">₹{selectedTender.estimatedValueLakhs} L</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-slate-500 text-[11px] block">MII Minimum</span>
              <span className="font-extrabold text-blue-900">{selectedTender.minLocalContentPercent}% Class-I</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Min Turnover</span>
              <span className="font-extrabold text-slate-900">₹{selectedTender.minAverageTurnoverLakhs} L/yr</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <span className="text-slate-500 text-[11px] block">EMD Required</span>
              <span className="font-extrabold text-slate-900">₹{selectedTender.emdRequiredLakhs} L</span>
            </div>
          </div>
        </div>

        {/* Bids Cohort Status Bar with TEC Minutes & UDIN Gateway Triggers */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs border-t border-slate-100 mt-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-semibold text-slate-600">
              Total Bids Received: <strong className="text-slate-900">{tenderBidders.length}</strong>
            </span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {tenderBidders.filter(b => b.decisionStatus === 'QUALIFIED_FOR_COMMERCIAL').length} Qualified
            </span>
            <span className="text-amber-800 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {tenderBidders.filter(b => b.decisionStatus === 'CLARIFICATION_SOUGHT').length} Clarification
            </span>
            <span className="text-rose-700 font-semibold flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              {tenderBidders.filter(b => b.decisionStatus === 'DISQUALIFIED').length} Disqualified
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="open-udin-gateway-btn"
              onClick={() => handleOpenUdinValidator()}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5 text-blue-800" />
              ICAI UDIN Gateway
            </button>

            <button
              id="generate-tec-minutes-btn"
              onClick={() => setIsTECMinutesOpen(true)}
              className="bg-linear-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 text-white font-bold px-3.5 py-1.5 rounded-md text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileSignature className="w-3.5 h-3.5 text-amber-300" />
              Generate Official TEC Minutes
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Work Area: Bidder Cohort Selector & Deep-Dive Compliance Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Bidder Selection List & Quick Scores (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-800" />
                Submitted Bids ({tenderBidders.length})
              </h3>
              <span className="text-[11px] font-semibold text-slate-500">Select to Inspect</span>
            </div>

            {/* Search filter */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search vendor name, GSTIN, Udyam..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-800 focus:outline-none"
              />
            </div>

            {/* List of Bidders */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredBidders.map((b) => {
                const isSelected = activeBidder?.id === b.id;
                const score = b.aiAnalysis.complianceScore;

                return (
                  <div
                    key={b.id}
                    id={`bidder-list-item-${b.id}`}
                    onClick={() => onSelectBidder(b)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-800 bg-blue-50/60 shadow-xs ring-1 ring-blue-800/30'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {b.name}
                          </h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] text-slate-500">
                          {b.isConsortium ? (
                            <span className="bg-purple-100 text-purple-900 font-extrabold px-1.5 py-0.2 rounded border border-purple-300 flex items-center gap-0.5">
                              <Users className="w-2.5 h-2.5" />
                              JV ({b.consortiumPartners?.length || 2} Partners)
                            </span>
                          ) : (
                            <span className="font-mono bg-slate-100 px-1 py-0.2 rounded border border-slate-200">
                              GST: {b.gstId.slice(0, 8)}...
                            </span>
                          )}
                          {b.msmeCategory !== 'NOT_APPLICABLE' && (
                            <span className="bg-amber-50 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-200">
                              MSME {b.msmeCategory}
                            </span>
                          )}
                          {b.isStartup && (
                            <span className="bg-emerald-50 text-emerald-900 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                              Startup India
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Score Badge */}
                      <div className="text-right shrink-0">
                        <span 
                          className={`text-sm font-extrabold px-2 py-0.5 rounded-md ${
                            score >= 90 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : score >= 70 
                              ? 'bg-amber-100 text-amber-900' 
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {score}
                        </span>
                        <span className="block text-[9px] text-slate-400 font-bold mt-0.5">SCORE</span>
                      </div>
                    </div>

                    {/* Bottom Metadata & Decision Badge */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[11px]">
                      <span className="font-semibold text-slate-700">
                        Bid: ₹{b.bidAmount} L <span className="text-slate-400 font-normal">({b.localContentPercent}% MII)</span>
                      </span>
                      <DecisionStatusBadge status={b.decisionStatus} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Deep-Dive Bidder Verification Suite (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Active Bidder Header & Action Bar */}
          {activeBidder && (
            <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="bg-blue-900 text-white text-xs font-bold px-2 py-0.5 rounded font-mono">
                      {activeBidder.id}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {activeBidder.legalEntity}
                    </span>
                    {activeBidder.isConsortium && (
                      <span className="bg-purple-900 text-white text-xs font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                        <Users className="w-3 h-3 text-amber-300" />
                        Consortium / JV
                      </span>
                    )}
                    <RiskBadge riskLevel={activeBidder.aiAnalysis.riskLevel} />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {activeBidder.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Submitted on {activeBidder.submittedAt} • Quoted Bid: <strong className="text-slate-800">₹{activeBidder.bidAmount} Lakhs</strong> • {activeBidder.isConsortium ? 'Aggregated Turnover' : 'Annual Turnover'}: <strong className="text-emerald-700">₹{activeBidder.aggregatedTurnover || activeBidder.annualTurnoverAvg} Lakhs</strong> • Local Content: <strong className="text-blue-900">{activeBidder.localContentPercent}%</strong>
                  </p>
                </div>

                {/* Officer Authority Action Suite */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    id="schedule-clarification-notice-btn"
                    onClick={() => setIsClarificationNoticeOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-2 rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    48-Hr Clarification Notice
                  </button>

                  <button
                    id="officer-decision-btn"
                    onClick={() => setIsDecisionModalOpen(true)}
                    className="bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-3.5 py-2 rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Scale className="w-3.5 h-3.5 text-amber-300" />
                    Record Decision
                  </button>

                  <button
                    id="print-evaluation-report-btn"
                    onClick={() => setIsReportModalOpen(true)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-md border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Formal Report
                  </button>
                </div>
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="flex items-center space-x-1 border-b border-slate-200 mt-3 overflow-x-auto text-xs font-bold">
                <button
                  onClick={() => setActiveSubTab('overview')}
                  className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
                    activeSubTab === 'overview'
                      ? 'border-blue-900 text-blue-950 bg-blue-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Compliance Overview & AI Recommendations
                </button>

                {activeBidder.isConsortium && (
                  <button
                    onClick={() => setActiveSubTab('consortium')}
                    className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeSubTab === 'consortium'
                        ? 'border-blue-900 text-blue-950 bg-purple-50/60'
                        : 'border-transparent text-purple-900 hover:text-purple-950'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-purple-700" />
                    Consortium JV Breakdown ({activeBidder.consortiumPartners?.length || 2} Partners)
                  </button>
                )}

                <button
                  onClick={() => setActiveSubTab('portals')}
                  className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
                    activeSubTab === 'portals'
                      ? 'border-blue-900 text-blue-950 bg-blue-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Portal Cross-Checks ({activeBidder.portalChecks.length})
                </button>

                <button
                  onClick={() => setActiveSubTab('clauses')}
                  className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
                    activeSubTab === 'clauses'
                      ? 'border-blue-900 text-blue-950 bg-blue-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Statutory Clauses ({activeBidder.clauseCompliance.length})
                </button>

                <button
                  onClick={() => setActiveSubTab('documents')}
                  className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
                    activeSubTab === 'documents'
                      ? 'border-blue-900 text-blue-950 bg-blue-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  DigiLocker Artifacts ({activeBidder.documents.length})
                </button>

                <button
                  onClick={() => setActiveSubTab('remediation')}
                  className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
                    activeSubTab === 'remediation'
                      ? 'border-blue-900 text-blue-950 bg-blue-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Pending Defect Remediation ({activeBidder.aiAnalysis.pendingRemediations.length})
                </button>
              </div>

              {/* Sub-Tab Content Rendering */}
              <div className="pt-4 space-y-4">
                {activeSubTab === 'overview' && (
                  <>
                    {/* Consortium JV Inline Callout if applicable */}
                    {activeBidder.isConsortium && (
                      <ConsortiumEvaluationCard 
                        bidder={activeBidder}
                        onVerifyUdin={(udin, mNo, amt) => handleOpenUdinValidator(udin, mNo, amt)}
                      />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Visual Compliance Meter (5 cols) */}
                      <div className="md:col-span-5">
                        <ComplianceMeter analysis={activeBidder.aiAnalysis} />
                      </div>

                      {/* AI Recommendation Highlight Box (7 cols) */}
                      <div className="md:col-span-7">
                        <AIRecommendationBox
                          analysis={activeBidder.aiAnalysis}
                          bidderName={activeBidder.name}
                          onTriggerReAnalysis={() => onTriggerDeepAI(activeBidder.id)}
                          isAnalyzing={isAnalyzing}
                        />
                      </div>
                    </div>

                    {/* Quick Portal Health Banner */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-800">
                          Government Portal Gateway Status for {activeBidder.name}:
                        </span>
                        <button
                          onClick={() => setActiveSubTab('portals')}
                          className="text-blue-700 font-bold hover:underline flex items-center gap-0.5"
                        >
                          View Full Details <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeBidder.portalChecks.map(p => (
                          <span 
                            key={p.portal}
                            onClick={() => setSelectedPortalCheck(p)}
                            className={`text-[11px] font-bold px-2 py-0.5 rounded border cursor-pointer ${
                              p.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' :
                              p.status === 'DISCREPANCY' ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100' :
                              'bg-rose-50 text-rose-900 border-rose-300 hover:bg-rose-100'
                            }`}
                          >
                            {p.portalName.split(' ')[0]}: {p.status === 'VERIFIED' ? '✅' : p.status === 'DISCREPANCY' ? '⚠️' : '❌'}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pending Action Items */}
                    <PendingRequirementsAccordion
                      remediations={activeBidder.aiAnalysis.pendingRemediations}
                      onSeekClarification={() => setIsClarificationNoticeOpen(true)}
                    />
                  </>
                )}

                {activeSubTab === 'consortium' && activeBidder.isConsortium && (
                  <ConsortiumEvaluationCard 
                    bidder={activeBidder}
                    onVerifyUdin={(udin, mNo, amt) => handleOpenUdinValidator(udin, mNo, amt)}
                  />
                )}

                {activeSubTab === 'portals' && (
                  <PortalGrid
                    portalChecks={activeBidder.portalChecks}
                    onSelectPortal={(p) => setSelectedPortalCheck(p)}
                    onReverifyPortal={onReverifyPortal}
                    isReverifying={isReverifying}
                  />
                )}

                {activeSubTab === 'clauses' && (
                  <ClauseComplianceTable clauses={activeBidder.clauseCompliance} />
                )}

                {activeSubTab === 'documents' && (
                  <DocumentVerificationList documents={activeBidder.documents} />
                )}

                {activeSubTab === 'remediation' && (
                  <PendingRequirementsAccordion
                    remediations={activeBidder.aiAnalysis.pendingRemediations}
                    onSeekClarification={() => setIsClarificationNoticeOpen(true)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedPortalCheck && (
        <PortalDetailModal
          portalCheck={selectedPortalCheck}
          onClose={() => setSelectedPortalCheck(null)}
          onReverify={(p) => onReverifyPortal(p)}
          isReverifying={isReverifying === selectedPortalCheck.portal}
        />
      )}

      {isDecisionModalOpen && activeBidder && (
        <OfficerDecisionModal
          bidder={activeBidder}
          onClose={() => setIsDecisionModalOpen(false)}
          onConfirmDecision={(status, remarks, name, dept) => {
            onRecordOfficerDecision(status, remarks, name, dept);
            setIsDecisionModalOpen(false);
          }}
        />
      )}

      {isClarificationNoticeOpen && activeBidder && (
        <ClarificationNoticeModal
          bidder={activeBidder}
          onClose={() => setIsClarificationNoticeOpen(false)}
          onSendNotice={(noticeText, deadline, name, dept) => {
            onRecordOfficerDecision('CLARIFICATION_SOUGHT', noticeText, name, dept, deadline);
            setIsClarificationNoticeOpen(false);
          }}
        />
      )}

      {isTECMinutesOpen && (
        <TECMinutesModal
          tender={selectedTender}
          bidders={tenderBidders}
          onClose={() => setIsTECMinutesOpen(false)}
        />
      )}

      {isUdinValidatorOpen && (
        <UDINValidatorModal
          initialUdin={udinInitialData.udin}
          initialMemberNo={udinInitialData.memberNo}
          initialAmount={udinInitialData.amount}
          onClose={() => setIsUdinValidatorOpen(false)}
        />
      )}

      {isReportModalOpen && activeBidder && (
        <EvaluationReportModal
          bidder={activeBidder}
          tender={selectedTender}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
    </div>
  );
};
