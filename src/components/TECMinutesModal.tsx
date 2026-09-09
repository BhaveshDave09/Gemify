import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  Users, 
  Building2, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  FileSignature
} from 'lucide-react';
import { Tender, Bidder, TECMinutesDossier } from '../types/gem';

interface TECMinutesModalProps {
  tender: Tender;
  bidders: Bidder[];
  onClose: () => void;
}

export const TECMinutesModal: React.FC<TECMinutesModalProps> = ({
  tender,
  bidders,
  onClose
}) => {
  const [dossier, setDossier] = useState<TECMinutesDossier | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/tenders/${tender.id}/tec-minutes`)
      .then(res => res.json())
      .then(data => {
        setDossier(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load TEC minutes:", err);
        setLoading(false);
      });
  }, [tender.id]);

  const handleCopyText = () => {
    if (!dossier) return;
    const textContent = `
MINUTES OF THE TENDER EVALUATION COMMITTEE (TECHNICAL STAGE)
TENDER REFERENCE: ${dossier.bidNumber}
PROJECT / SCOPE: ${dossier.tenderTitle}
DATE OF MEETING: ${dossier.meetingDate}
VENUE: ${dossier.meetingLocation}

===================================================================
1. COMMITTEE CONSTITUTION:
${dossier.committeeMembers.map(m => `- ${m.name}, ${m.designation} (${m.role}) [DSC: ${m.digitalSignatureId}]`).join('\n')}

===================================================================
2. STATUTORY EVALUATION BASELINE:
- GFR 2017 Rule 144(xi): ${dossier.statutoryFindings.gfr144xiSummary}
- PPP-MII Order 2017: ${dossier.statutoryFindings.makeInIndiaSummary}
- MSME Policy 2012: ${dossier.statutoryFindings.msmeSummary}
- Consortium / JV Framework: ${dossier.statutoryFindings.consortiumSummary}

===================================================================
3. BIDDER-BY-BIDDER COMPARATIVE EVALUATION:
${dossier.bidderEvaluations.map((b, i) => `
[${i + 1}] BIDDER: ${b.bidderName} ${b.isConsortium ? '(CONSORTIUM JV)' : ''}
    - Status: ${b.statutoryStatus}
    - Combined Annual Turnover: ₹${b.combinedTurnoverLakhs} Lakhs
    - Local Content: ${b.localContentPercent}%
    - Committee Remarks: ${b.committeeJustification}
`).join('\n')}

===================================================================
4. FINAL RECOMMENDATIONS:
${dossier.finalRecommendations}

Cryptographic Electronic Record Hash (Section 65B Indian Evidence Act):
SHA-256: ${dossier.section65BHash}
    `;
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-xl max-w-4xl w-[95vw] sm:w-full border border-slate-200 shadow-2xl p-6 my-auto max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 print:border-none print:shadow-none print:max-w-none print:max-h-none">
        
        {/* Header with Actions */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-lg bg-blue-900 text-white">
              <FileSignature className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Official Tender Evaluation Committee (TEC) Minutes Dossier
              </h3>
              <p className="text-xs text-slate-500">
                Formatted as per Central Public Procurement Manual & CPSE Governance Standards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              Print / Save PDF
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 ml-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        {loading || !dossier ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            Synthesizing official committee evaluation minutes...
          </div>
        ) : (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed font-sans">
            
            {/* Government Emblem & Formal Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <div className="inline-block p-1 bg-amber-50 rounded-full border border-amber-200 mb-1">
                <span className="text-lg">🏛️</span>
              </div>
              <h1 className="text-base font-extrabold uppercase tracking-wide text-slate-950">
                {tender.cpse}
              </h1>
              <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {tender.department} | {tender.ministry}
              </h2>
              <div className="mt-2 inline-block bg-slate-100 px-4 py-1 rounded text-xs font-bold text-slate-900 border border-slate-300">
                MINUTES OF THE TENDER EVALUATION COMMITTEE (TECHNICAL BID STAGE)
              </div>
            </div>

            {/* Meta Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 font-semibold block">GeM Tender Reference:</span>
                <span className="font-mono font-bold text-slate-900">{dossier.bidNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Tender Subject / Scope:</span>
                <span className="font-bold text-slate-900">{dossier.tenderTitle}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Meeting Date & Venue:</span>
                <span className="font-medium text-slate-800">{dossier.meetingDate} | {dossier.meetingLocation}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Bids Evaluated:</span>
                <span className="font-bold text-slate-900">
                  {dossier.evaluatedBiddersCount} Total ({dossier.qualifiedCount} Qualified, {dossier.clarificationCount} Clarification, {dossier.disqualifiedCount} Disqualified)
                </span>
              </div>
            </div>

            {/* Part 1: Committee Members */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                <Users className="w-3.5 h-3.5 text-blue-900" />
                1. Constitution of Tender Evaluation Committee (TEC)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dossier.committeeMembers.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-white border border-slate-200 text-xs flex items-start justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{m.name}</span>
                      <span className="text-[11px] text-slate-500">{m.designation}</span>
                      <span className="text-[10px] text-slate-400 block">{m.department}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                      {m.role.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: Statutory Findings */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
                2. Statutory Pre-Qualification Findings & Rules Grounding
              </h4>
              <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                <div>
                  <strong className="text-slate-900">GFR 2017 Rule 144(xi) (Land Border Sharing):</strong>
                  <p className="text-slate-700 mt-0.5">{dossier.statutoryFindings.gfr144xiSummary}</p>
                </div>
                <div>
                  <strong className="text-slate-900">Public Procurement (Make in India) Order 2017:</strong>
                  <p className="text-slate-700 mt-0.5">{dossier.statutoryFindings.makeInIndiaSummary}</p>
                </div>
                <div>
                  <strong className="text-slate-900">Consortium / Joint Venture (JV) Multi-Partner Norms:</strong>
                  <p className="text-slate-700 mt-0.5">{dossier.statutoryFindings.consortiumSummary}</p>
                </div>
              </div>
            </div>

            {/* Part 3: Comparative Evaluation Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                <Award className="w-3.5 h-3.5 text-blue-900" />
                3. Bidder-by-Bidder Technical Evaluation Matrix
              </h4>
              <div className="overflow-x-auto rounded border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2">Bidder Entity</th>
                      <th className="p-2">Structure</th>
                      <th className="p-2">Turnover</th>
                      <th className="p-2">MII %</th>
                      <th className="p-2">Decision</th>
                      <th className="p-2">Committee Justification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {dossier.bidderEvaluations.map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2 font-bold text-slate-900">{b.bidderName}</td>
                        <td className="p-2">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${b.isConsortium ? 'bg-purple-100 text-purple-900' : 'bg-slate-100 text-slate-700'}`}>
                            {b.isConsortium ? `JV (${b.partnerCount} Ptrs)` : 'Sole Bidder'}
                          </span>
                        </td>
                        <td className="p-2 font-mono">₹{b.combinedTurnoverLakhs}L</td>
                        <td className="p-2 font-mono font-semibold">{b.localContentPercent}%</td>
                        <td className="p-2">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                            b.statutoryStatus === 'QUALIFIED' ? 'bg-emerald-100 text-emerald-900' :
                            b.statutoryStatus === 'DISQUALIFIED' ? 'bg-rose-100 text-rose-900' :
                            'bg-amber-100 text-amber-900'
                          }`}>
                            {b.statutoryStatus}
                          </span>
                        </td>
                        <td className="p-2 text-[11px] text-slate-600 max-w-xs">{b.committeeJustification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Part 4: Final Recommendations */}
            <div className="bg-emerald-50/70 p-3.5 rounded-lg border border-emerald-200">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                4. Final Committee Recommendation & Commercial Opening Order
              </h4>
              <p className="text-emerald-900 text-xs">{dossier.finalRecommendations}</p>
            </div>

            {/* Section 65B Electronic Evidence & Signatures */}
            <div className="border-t border-slate-200 pt-4 mt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded border border-slate-200 text-[11px]">
                <div>
                  <span className="font-bold text-slate-800 block">Section 65B Evidence Act Hash Seal (SHA-256):</span>
                  <span className="font-mono text-[10px] text-slate-600 break-all">{dossier.section65BHash}</span>
                </div>
                <span className="bg-blue-900 text-white text-[10px] font-bold px-2.5 py-1 rounded">
                  Digitally e-Signed & Tamper Evident
                </span>
              </div>

              {/* Committee Signatures Block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 text-center text-xs">
                {dossier.committeeMembers.map((m, idx) => (
                  <div key={idx} className="border-t border-slate-400 pt-2">
                    <span className="font-bold text-slate-900 block text-xs">{m.name}</span>
                    <span className="text-[10px] text-slate-500 block">{m.role.replace('_', ' ')}</span>
                    <span className="text-[9px] text-emerald-700 font-mono mt-0.5 block">Signed (Class-3 DSC)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
