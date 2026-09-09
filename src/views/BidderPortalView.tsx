import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  UploadCloud, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Clock, 
  Sparkles, 
  Award,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Tender, Bidder, DecisionStatus } from '../types/gem';
import { RiskBadge, DecisionStatusBadge } from '../components/RiskBadge';

interface BidderPortalViewProps {
  tenders: Tender[];
  selectedTender: Tender;
  bidders: Bidder[];
  onSubmitNewBid: (newBid: Partial<Bidder>) => void;
  onRespondToClarification: (bidderId: string, responseNote: string) => void;
}

export const BidderPortalView: React.FC<BidderPortalViewProps> = ({
  tenders,
  selectedTender,
  bidders,
  onSubmitNewBid,
  onRespondToClarification
}) => {
  // Active Bidder Profile Simulator
  const [selectedBidderId, setSelectedBidderId] = useState<string>(bidders[0]?.id || 'BID-2026-001');
  
  // Pre-Submission Self-Audit Form State
  const [firmName, setFirmName] = useState('');
  const [gstId, setGstId] = useState('');
  const [pan, setPan] = useState('');
  const [udyamId, setUdyamId] = useState('');
  const [localContent, setLocalContent] = useState('65');
  const [turnover, setTurnover] = useState('180');
  const [isStartup, setIsStartup] = useState(false);
  const [isSelfTesting, setIsSelfTesting] = useState(false);
  const [selfTestResult, setSelfTestResult] = useState<{
    score: number;
    passed: boolean;
    findings: string[];
    recommendations: string[];
  } | null>(null);

  // Clarification reply state
  const [clarificationReply, setClarificationReply] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);

  const activeBidder = bidders.find(b => b.id === selectedBidderId) || bidders[0];

  const handleRunSelfTest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSelfTesting(true);

    setTimeout(() => {
      const localContentNum = parseFloat(localContent);
      const turnoverNum = parseFloat(turnover);
      const isMiiPass = localContentNum >= selectedTender.minLocalContentPercent;
      const isTurnoverPass = isStartup || turnoverNum >= selectedTender.minAverageTurnoverLakhs;
      const score = Math.round((isMiiPass ? 40 : 15) + (isTurnoverPass ? 35 : 10) + 20);

      const findings = [];
      if (isMiiPass) {
        findings.push(`Local Content (${localContentNum}%) complies with Class-I Local Supplier minimum (${selectedTender.minLocalContentPercent}%).`);
      } else {
        findings.push(`Local Content (${localContentNum}%) falls below tender requirement of ${selectedTender.minLocalContentPercent}%. Risk of disqualification under PPP-MII Order.`);
      }

      if (isStartup) {
        findings.push(`DPIIT Startup flag active: Eligible for turnover and prior experience relaxation under GFR 173(i).`);
      } else if (isTurnoverPass) {
        findings.push(`Annual turnover (₹${turnoverNum} L) satisfies minimum threshold (₹${selectedTender.minAverageTurnoverLakhs} L).`);
      } else {
        findings.push(`Annual turnover (₹${turnoverNum} L) is below required ₹${selectedTender.minAverageTurnoverLakhs} L.`);
      }

      setSelfTestResult({
        score,
        passed: isMiiPass && isTurnoverPass,
        findings,
        recommendations: [
          'Ensure CA certificate UDIN number is correctly stamped on the turnover sheet.',
          'Verify that DigiLocker document hashes match your local PDFs prior to final submission.',
          'Submit statutory declaration confirming compliance with GFR 144(xi) land border rules.'
        ]
      });
      setIsSelfTesting(false);
    }, 900);
  };

  const handleSendClarification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationReply.trim()) return;
    onRespondToClarification(activeBidder.id, clarificationReply);
    setReplySuccess(true);
    setClarificationReply('');
    setTimeout(() => setReplySuccess(false), 4000);
  };

  return (
    <div className="space-y-6" id="vendor-self-verification-portal">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                GeM Vendor Desk
              </span>
              <span className="text-emerald-200 text-xs font-semibold">
                Self-Service Statutory Compliance & Submission Portal
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Pre-Submission Compliance Health Check & Clarification Desk
            </h2>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Verify your statutory eligibility across GSTN, Udyam, and Make in India thresholds prior to locking tender submission
            </p>
          </div>

          {/* Quick Bidder Selector for Multi-Vendor Testing */}
          <div className="bg-white/10 p-2.5 rounded-lg border border-white/20 text-xs">
            <span className="text-emerald-200 text-[11px] block font-semibold mb-1">Simulate Vendor Account:</span>
            <select
              value={selectedBidderId}
              onChange={(e) => setSelectedBidderId(e.target.value)}
              className="w-full bg-white text-slate-900 font-bold pl-2.5 pr-8 py-1 rounded text-xs focus:outline-none cursor-pointer"
            >
              {bidders.map(b => (
                <option key={b.id} value={b.id}>{b.name} ({b.id})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Active Submission Status & Clarification Notice, Right = Pre-Submission Health Check */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Tender Status & 48-hr Clarification Response (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">My Active Bid for:</span>
                <h3 className="text-sm font-bold text-slate-900">{selectedTender.bidNumber}</h3>
                <p className="text-xs text-slate-500">{selectedTender.title}</p>
              </div>
              <DecisionStatusBadge status={activeBidder.decisionStatus} />
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 bg-slate-50 rounded-lg border border-slate-200 mb-3">
              <div>
                <span className="text-slate-500 text-[10px] block">Submitted Bid</span>
                <strong className="text-slate-900">₹{activeBidder.bidAmount} Lakhs</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">MII Local Content</span>
                <strong className="text-blue-900">{activeBidder.localContentPercent}%</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Compliance Score</span>
                <strong className="text-emerald-700">{activeBidder.aiAnalysis.complianceScore}/100</strong>
              </div>
            </div>

            {/* Clarification Notice Form if CLARIFICATION_SOUGHT */}
            {activeBidder.decisionStatus === 'CLARIFICATION_SOUGHT' ? (
              <div className="bg-amber-50/80 border border-amber-300 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span>ACTION REQUIRED: 48-Hour Official Clarification Notice</span>
                </div>

                <div className="text-xs text-amber-950 bg-white p-2.5 rounded border border-amber-200 leading-relaxed">
                  <strong className="block mb-1 text-slate-900">Tender Committee Notice:</strong>
                  "{activeBidder.officerRemarks || 'Please submit clarification and supporting OEM authorization letter within 48 hours.'}"
                </div>

                <form onSubmit={handleSendClarification} className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800">
                    Your Official Vendor Clarification Response:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={clarificationReply}
                    onChange={(e) => setClarificationReply(e.target.value)}
                    placeholder="Enter your explanation and reference uploaded supplemental documents..."
                    className="w-full bg-white border border-amber-300 rounded-md p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500">
                      Logged to blockchain immutable audit trail upon submission.
                    </span>
                    <button
                      type="submit"
                      className="bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3 h-3" />
                      Submit Response
                    </button>
                  </div>
                </form>

                {replySuccess && (
                  <div className="text-xs font-bold text-emerald-800 bg-emerald-100 p-2 rounded border border-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Response recorded and transmitted to Tender Evaluation Committee.
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-slate-800 block mb-1">Procurement Committee Status:</span>
                {activeBidder.officerRemarks ? (
                  <p className="italic text-slate-700">"{activeBidder.officerRemarks}"</p>
                ) : (
                  <p>Your technical bid is undergoing standard multi-portal cross-verification.</p>
                )}
              </div>
            )}
          </div>

          {/* Uploaded Documents Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-blue-800" />
              Verified Artifacts for {activeBidder.name}
            </h4>

            <div className="space-y-2">
              {activeBidder.documents.map(d => (
                <div key={d.id} className="p-2.5 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800">{d.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{d.fileName} ({d.fileSize})</div>
                  </div>
                  <div>
                    {d.status === 'VERIFIED' ? (
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ✅ Verified
                      </span>
                    ) : (
                      <span className="text-amber-800 font-bold text-[10px] bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                        ⚠️ Discrepancy
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pre-Submission AI Health Check Simulator (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs">
            <div className="border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">
                  Pre-Submission AI Compliance Simulator
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Test your statutory qualifications against tender criteria before formal bid submission
              </p>
            </div>

            <form onSubmit={handleRunSelfTest} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company / Firm Name:</label>
                  <input
                    type="text"
                    required
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    placeholder="e.g. Acme Solar Solutions Pvt Ltd"
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">GSTIN Number:</label>
                  <input
                    type="text"
                    required
                    value={gstId}
                    onChange={(e) => setGstId(e.target.value)}
                    placeholder="07AAAAA0000A1Z5"
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs font-mono focus:ring-1 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">PAN Card Number:</label>
                  <input
                    type="text"
                    required
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    placeholder="AAAAA0000A"
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs font-mono focus:ring-1 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">MSME Udyam ID (Optional):</label>
                  <input
                    type="text"
                    value={udyamId}
                    onChange={(e) => setUdyamId(e.target.value)}
                    placeholder="UDYAM-DL-00-0000000"
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs font-mono focus:ring-1 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Declared Local Content (%):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={localContent}
                    onChange={(e) => setLocalContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-blue-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Avg Annual Turnover (₹ Lakhs):
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={turnover}
                    onChange={(e) => setTurnover(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-blue-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Startup Flag */}
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200">
                <input
                  type="checkbox"
                  id="startup-check"
                  checked={isStartup}
                  onChange={(e) => setIsStartup(e.target.checked)}
                  className="rounded text-blue-900 focus:ring-blue-800"
                />
                <label htmlFor="startup-check" className="text-xs text-slate-700 font-medium cursor-pointer">
                  Claim DPIIT Recognized Startup Exemption (GFR Rule 173(i))
                </label>
              </div>

              {/* Submit Self-Audit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSelfTesting}
                  className="w-full bg-blue-900 hover:bg-blue-950 disabled:bg-slate-300 text-white font-bold py-2 px-4 rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Sparkles className={`w-4 h-4 ${isSelfTesting ? 'animate-spin text-amber-300' : 'text-amber-400'}`} />
                  {isSelfTesting ? 'Simulating Statutory Cross-Check...' : 'Run Pre-Submission AI Health Check'}
                </button>
              </div>
            </form>

            {/* Self-Test AI Outcome Box */}
            {selfTestResult && (
              <div className="mt-4 p-3.5 rounded-lg border bg-slate-50/90 border-slate-300 space-y-2.5 text-xs animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    {selfTestResult.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    Preliminary Eligibility Health Score:
                  </span>
                  <span className={`font-extrabold text-sm px-2 py-0.5 rounded ${
                    selfTestResult.score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {selfTestResult.score}/100
                  </span>
                </div>

                <div className="space-y-1">
                  <strong className="text-slate-800 block text-[11px]">Evaluation Findings:</strong>
                  {selfTestResult.findings.map((f, i) => (
                    <div key={i} className="text-slate-600 flex items-start gap-1.5 text-[11px]">
                      <span className="text-blue-800 font-bold">•</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-blue-50/70 rounded border border-blue-200 text-[11px] text-blue-950 space-y-1">
                  <strong className="block font-bold text-blue-900">Recommended Pre-Bid Actions:</strong>
                  {selfTestResult.recommendations.map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span>✓</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
