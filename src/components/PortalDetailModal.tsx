import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink,
  Code2,
  Lock
} from 'lucide-react';
import { PortalCheckResult, PortalType } from '../types/gem';

interface PortalDetailModalProps {
  portalCheck: PortalCheckResult | null;
  onClose: () => void;
  onReverify: (portal: PortalType) => void;
  isReverifying?: boolean;
}

export const PortalDetailModal: React.FC<PortalDetailModalProps> = ({
  portalCheck,
  onClose,
  onReverify,
  isReverifying
}) => {
  if (!portalCheck) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-[95vw] sm:w-full border border-slate-200 shadow-2xl p-4 sm:p-5 my-auto max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{portalCheck.portalName}</h3>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                  {portalCheck.portal}
                </span>
              </div>
              <p className="text-xs text-slate-500">{portalCheck.department}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4 text-xs">
          {/* Status & Confidence Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[11px]">Reconciliation Status</span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                {portalCheck.status === 'VERIFIED' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {portalCheck.status === 'DISCREPANCY' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                {portalCheck.status === 'FAILED' && <XCircle className="w-4 h-4 text-rose-600" />}
                {portalCheck.status}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Confidence Match Rate</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                {portalCheck.confidenceScore}% (High Accuracy)
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px]">Last API Gateway Query</span>
              <span className="text-xs font-semibold text-slate-700 mt-0.5 block">
                {portalCheck.lastCheckedAt}
              </span>
            </div>
          </div>

          {/* Verification Summary */}
          <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200">
            <span className="text-blue-950 font-bold block mb-1">API Response Summary:</span>
            <p className="text-blue-900 leading-relaxed">{portalCheck.summary}</p>
          </div>

          {/* Field Match Comparison Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 mb-2">Field-by-Field Cross-Reconciliation Matrix:</h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[10px] uppercase">
                    <th className="py-2 px-3 font-bold">Field Name</th>
                    <th className="py-2 px-3 font-bold">Submitted Bid Value</th>
                    <th className="py-2 px-3 font-bold">Gov Portal Official Record</th>
                    <th className="py-2 px-3 font-bold text-center">Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {portalCheck.matchedFields.map((f, i) => (
                    <tr key={i} className="hover:bg-slate-50/80">
                      <td className="py-2 px-3 font-semibold text-slate-700">{f.field}</td>
                      <td className="py-2 px-3 text-slate-800">{f.submittedValue}</td>
                      <td className="py-2 px-3 text-slate-900 font-medium">{f.portalValue}</td>
                      <td className="py-2 px-3 text-center">
                        {f.match ? (
                          <span className="text-emerald-700 font-bold">✅ MATCH</span>
                        ) : (
                          <span className="text-rose-700 font-bold">❌ MISMATCH</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security & Audit Reference */}
          <div className="flex items-center justify-between p-2.5 bg-slate-100 rounded text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5 font-mono">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Gateway Ref: {portalCheck.referenceId}
            </span>
            <span className="text-slate-500">Secured via National API Setu / mTLS</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <button
            onClick={() => onReverify(portalCheck.portal)}
            disabled={isReverifying}
            className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReverifying ? 'animate-spin' : ''}`} />
            {isReverifying ? 'Re-Querying Gateway...' : 'Re-Query Portal API'}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
