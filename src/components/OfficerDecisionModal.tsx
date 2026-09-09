import React, { useState } from 'react';
import { 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileSignature, 
  Clock, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { Bidder, DecisionStatus } from '../types/gem';

interface OfficerDecisionModalProps {
  bidder: Bidder;
  onClose: () => void;
  onConfirmDecision: (status: DecisionStatus, remarks: string, officerName: string, officerDept: string) => void;
}

export const OfficerDecisionModal: React.FC<OfficerDecisionModalProps> = ({
  bidder,
  onClose,
  onConfirmDecision
}) => {
  const [selectedStatus, setSelectedStatus] = useState<DecisionStatus>(
    bidder.aiAnalysis.riskLevel === 'LOW' 
      ? 'QUALIFIED_FOR_COMMERCIAL' 
      : bidder.aiAnalysis.riskLevel === 'MODERATE'
      ? 'CLARIFICATION_SOUGHT'
      : 'DISQUALIFIED'
  );
  const [remarks, setRemarks] = useState(
    bidder.officerRemarks || 
    (selectedStatus === 'QUALIFIED_FOR_COMMERCIAL'
      ? 'Technical evaluation complete. All statutory, financial, and Make-in-India criteria verified compliant.'
      : selectedStatus === 'CLARIFICATION_SOUGHT'
      ? 'Clarification sought from bidder regarding GST reconciliation and component BOM within 48 hours as per GeM protocol.'
      : 'Disqualified due to failure to meet mandatory Make in India Class-I local content cutoff / active IBC proceedings.')
  );
  const [officerName, setOfficerName] = useState('Shri R. K. Sharma (Sr. DGM - Procurement)');
  const [officerDept, setOfficerDept] = useState('Tender Evaluation Committee');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmDecision(selectedStatus, remarks, officerName, officerDept);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-xl w-[95vw] sm:w-full border border-slate-200 shadow-2xl p-5 my-auto max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-lg bg-blue-900 text-white">
              <FileSignature className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Official Procurement Officer Decision
              </h3>
              <p className="text-xs text-slate-500">
                Recording final statutory evaluation for <strong className="text-slate-800">{bidder.name}</strong>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
          {/* Decision Status Options */}
          <div>
            <label className="block text-slate-700 font-bold mb-2">
              Select Official Evaluation Action:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label 
                className={`p-3 rounded-lg border-2 cursor-pointer flex flex-col justify-between transition-all ${
                  selectedStatus === 'QUALIFIED_FOR_COMMERCIAL'
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <input
                    type="radio"
                    name="decisionStatus"
                    value="QUALIFIED_FOR_COMMERCIAL"
                    checked={selectedStatus === 'QUALIFIED_FOR_COMMERCIAL'}
                    onChange={() => setSelectedStatus('QUALIFIED_FOR_COMMERCIAL')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-extrabold text-xs">Technically Qualify</span>
                <span className="text-[10px] text-slate-500 mt-1">Eligible for commercial price opening</span>
              </label>

              <label 
                className={`p-3 rounded-lg border-2 cursor-pointer flex flex-col justify-between transition-all ${
                  selectedStatus === 'CLARIFICATION_SOUGHT'
                    ? 'border-amber-600 bg-amber-50/80 text-amber-950 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <input
                    type="radio"
                    name="decisionStatus"
                    value="CLARIFICATION_SOUGHT"
                    checked={selectedStatus === 'CLARIFICATION_SOUGHT'}
                    onChange={() => setSelectedStatus('CLARIFICATION_SOUGHT')}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <span className="font-extrabold text-xs">Seek Clarification</span>
                <span className="text-[10px] text-slate-500 mt-1">48-hour GeM window for vendor</span>
              </label>

              <label 
                className={`p-3 rounded-lg border-2 cursor-pointer flex flex-col justify-between transition-all ${
                  selectedStatus === 'DISQUALIFIED'
                    ? 'border-rose-600 bg-rose-50/80 text-rose-950 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <input
                    type="radio"
                    name="decisionStatus"
                    value="DISQUALIFIED"
                    checked={selectedStatus === 'DISQUALIFIED'}
                    onChange={() => setSelectedStatus('DISQUALIFIED')}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <XCircle className="w-4 h-4 text-rose-600" />
                </div>
                <span className="font-extrabold text-xs">Disqualify Bid</span>
                <span className="text-[10px] text-slate-500 mt-1">Statutorily non-compliant / Ineligible</span>
              </label>
            </div>
          </div>

          {/* Committee Evaluation Remarks */}
          <div>
            <label htmlFor="officer-remarks-input" className="block text-slate-700 font-bold mb-1">
              Procurement Officer Official Minutes / Justification:
            </label>
            <textarea
              id="officer-remarks-input"
              rows={3}
              required
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-800 focus:outline-none"
              placeholder="Enter official clause reference and committee justification..."
            />
          </div>

          {/* Officer Details & Digital Signing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <label htmlFor="officer-name-input" className="block text-slate-500 text-[11px] font-semibold mb-0.5">
                Authorized Officer Name:
              </label>
              <input
                id="officer-name-input"
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-medium"
              />
            </div>
            <div>
              <label htmlFor="officer-dept-input" className="block text-slate-500 text-[11px] font-semibold mb-0.5">
                Committee / Department:
              </label>
              <input
                id="officer-dept-input"
                type="text"
                value={officerDept}
                onChange={(e) => setOfficerDept(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Immutable Logging Notice */}
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 bg-blue-50/60 p-2.5 rounded border border-blue-200 text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
            <span>
              This decision will be cryptographically hashed (SHA-256) and recorded on the immutable CPPP audit ledger.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold px-5 py-2 rounded-md transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Sign & Record Official Decision
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
