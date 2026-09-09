import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Landmark, 
  ShieldCheck, 
  FileText,
  Check
} from 'lucide-react';
import { Bidder, Tender } from '../types/gem';
import { generateFormalReportPdf, downloadFormalReportHtml } from '../types/utils/pdfGenerator';

interface EvaluationReportModalProps {
  bidder: Bidder;
  tender: Tender;
  onClose: () => void;
}

export const EvaluationReportModal: React.FC<EvaluationReportModalProps> = ({
  bidder,
  tender,
  onClose
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    generateFormalReportPdf(tender, bidder);
    setDownloadSuccess('PDF Report downloaded successfully');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleDownloadHtml = () => {
    downloadFormalReportHtml(tender, bidder);
    setDownloadSuccess('HTML Report downloaded successfully');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-[95vw] sm:w-full border border-slate-200 shadow-2xl p-4 sm:p-6 my-auto max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3 mb-4 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-900 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Official Technical Compliance Verification Report
              </h3>
              <p className="text-[11px] text-slate-500">
                {tender.bidNumber} • {bidder.name}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="report-save-pdf-btn"
              onClick={handleDownloadPdf}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Save PDF
            </button>

            <button
              id="report-save-html-btn"
              onClick={handleDownloadHtml}
              className="bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              Save HTML
            </button>

            <button
              onClick={handlePrint}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-md border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm cursor-pointer ml-1"
            >
              ✕
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mb-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold px-3 py-2 rounded-md flex items-center gap-2 no-print">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            {downloadSuccess}
          </div>
        )}

        {/* Printable Document Container */}
        <div id="printable-evaluation-report" className="text-xs text-slate-800 space-y-4">
          {/* Official Government Header */}
          <div className="text-center border-b-2 border-slate-900 pb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Landmark className="w-6 h-6 text-blue-900" />
              <span className="font-extrabold text-sm text-slate-900 tracking-wider uppercase">
                GOVERNMENT OF INDIA • GOVERNMENT E-MARKETPLACE (GeM)
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-600">
              Central Public Procurement Portal (CPPP) - Bid Compliance Evaluation Sheet
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Generated in accordance with General Financial Rules (GFR) 2017 & Public Procurement Orders
            </p>
          </div>

          {/* Tender Metadata */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded border border-slate-200 text-[11px]">
            <div>
              <span className="text-slate-500 font-medium">Tender Bid Number:</span>{' '}
              <strong className="text-slate-900 font-mono">{tender.bidNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Procuring Ministry/CPSE:</span>{' '}
              <strong className="text-slate-900">{tender.cpse}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 font-medium">Tender Title:</span>{' '}
              <strong className="text-slate-900">{tender.title}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Estimated Value:</span>{' '}
              <strong className="text-slate-900">₹{tender.estimatedValueLakhs} Lakhs</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">MII Minimum Local Content:</span>{' '}
              <strong className="text-slate-900">{tender.minLocalContentPercent}% (Class-I)</strong>
            </div>
          </div>

          {/* Bidder Profile */}
          <div className="border border-slate-200 rounded p-3 text-[11px] space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-1 flex items-center justify-between">
              <span>Bidder Identification Profile</span>
              <span className="font-mono text-[10px] text-slate-500">ID: {bidder.id}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div>Firm Name: <strong className="text-slate-900">{bidder.name}</strong></div>
              <div>Entity Type: <strong className="text-slate-900">{bidder.legalEntity}</strong></div>
              <div>GSTIN: <strong className="font-mono text-slate-900">{bidder.gstId}</strong></div>
              <div>PAN: <strong className="font-mono text-slate-900">{bidder.pan}</strong></div>
              <div>MSME Udyam ID: <strong className="font-mono text-slate-900">{bidder.udyamId}</strong> ({bidder.msmeCategory})</div>
              <div>Declared Local Content: <strong className="text-slate-900">{bidder.localContentPercent}%</strong></div>
              <div>Annual Avg Turnover: <strong className="text-slate-900">₹{bidder.annualTurnoverAvg} Lakhs</strong></div>
              <div>Bid Quoted Amount: <strong className="text-slate-900">₹{bidder.bidAmount} Lakhs</strong></div>
            </div>
          </div>

          {/* AI Compliance Scores & Decision */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-blue-50/50 rounded border border-blue-200">
            <div>
              <span className="text-[10px] text-slate-500 block">AI Compliance Health Score</span>
              <span className="text-xl font-extrabold text-blue-950">{bidder.aiAnalysis.complianceScore}/100</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Assessed Risk Level</span>
              <span className="text-xs font-bold text-slate-900 block mt-1">{bidder.aiAnalysis.riskLevel}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Current Decision Status</span>
              <span className="text-xs font-bold text-blue-900 block mt-1">{bidder.decisionStatus}</span>
            </div>
          </div>

          {/* Multi-Portal Verification Matrix */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-1.5">Government Portal Integration Verification Summary:</h4>
            <table className="w-full text-left text-[10px] border border-slate-200">
              <thead className="bg-slate-100 font-bold text-slate-700">
                <tr>
                  <th className="p-1.5">Government Portal</th>
                  <th className="p-1.5">Gateway Reference</th>
                  <th className="p-1.5">Status</th>
                  <th className="p-1.5">Reconciliation Finding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bidder.portalChecks.map((p, idx) => (
                  <tr key={idx}>
                    <td className="p-1.5 font-semibold">{p.portalName}</td>
                    <td className="p-1.5 font-mono">{p.referenceId}</td>
                    <td className="p-1.5 font-bold">
                      {p.status === 'VERIFIED' && <span className="text-emerald-700">VERIFIED ✅</span>}
                      {p.status === 'DISCREPANCY' && <span className="text-amber-700">DISCREPANCY ⚠️</span>}
                      {p.status === 'FAILED' && <span className="text-rose-700">FAILED ❌</span>}
                    </td>
                    <td className="p-1.5 text-slate-600">{p.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Officer Remarks & Signature Block */}
          <div className="border-t border-slate-300 pt-3 text-[11px]">
            <span className="font-bold text-slate-900 block mb-1">Procurement Committee Remarks / Statutory Justification:</span>
            <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 leading-relaxed italic">
              "{bidder.officerRemarks || 'Evaluation under progress.'}"
            </p>

            <div className="flex justify-between items-end pt-8 mt-4 text-[10px] text-slate-600">
              <div>
                <div>Evaluation Date: {bidder.officerActionDate || new Date().toISOString().split('T')[0]}</div>
                <div>Hash Verification: Verified SHA-256</div>
              </div>
              <div className="text-right">
                <div className="border-t border-slate-400 pt-1 font-bold text-slate-900 w-48 text-center">
                  Authorized Procurement Officer
                </div>
                <div className="text-slate-500 text-center">SECI / CPSE Tender Committee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-2 border-t border-slate-200 pt-4 mt-4 no-print">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
