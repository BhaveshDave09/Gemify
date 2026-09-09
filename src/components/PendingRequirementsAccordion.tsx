import React, { useState } from 'react';
import { 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  CheckCircle2, 
  Send, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AIComplianceAnalysis } from '../types/gem';

interface PendingRequirementsAccordionProps {
  remediations: AIComplianceAnalysis['pendingRemediations'];
  onSeekClarification?: (issue: string) => void;
}

export const PendingRequirementsAccordion: React.FC<PendingRequirementsAccordionProps> = ({
  remediations,
  onSeekClarification
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'REM-01': true,
    'REM-02': true,
    'REM-301': true
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getSeverityBadge = (severity: 'CRITICAL' | 'MAJOR' | 'MINOR') => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-extrabold px-2 py-0.5 rounded">CRITICAL (Disqualifying)</span>;
      case 'MAJOR':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded">MAJOR (Clarification Needed)</span>;
      case 'MINOR':
      default:
        return <span className="bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-extrabold px-2 py-0.5 rounded">MINOR DEFECT</span>;
    }
  };

  if (!remediations || remediations.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs" id="pending-requirements-clean">
        <div className="flex items-center gap-3 text-emerald-800 bg-emerald-50/80 p-3 rounded-lg border border-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <h4 className="text-xs font-bold">Zero Pending Remediation Requirements</h4>
            <p className="text-[11px] text-emerald-700">
              All statutory documents, GST turnover statements, and portal cross-checks satisfy tender criteria.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs" id="pending-requirements-accordion-section">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Pending Remediation Requirements & Defect Resolution
          </h3>
          <p className="text-xs text-slate-500">
            Action items identified by the AI compliance engine requiring committee clarification or bidder rectification
          </p>
        </div>
        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
          {remediations.length} Action Items
        </span>
      </div>

      <div className="space-y-2.5">
        {remediations.map((item) => {
          const isOpen = !!openItems[item.id];

          return (
            <div
              key={item.id}
              className={`border rounded-lg transition-all overflow-hidden ${
                item.severity === 'CRITICAL'
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-amber-300 bg-amber-50/20'
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 pr-2">
                  <div className="font-mono text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.id}
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {item.issue}
                  </span>
                  {getSeverityBadge(item.severity)}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {item.deadlineHours && (
                    <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {item.deadlineHours}h GeM Window
                    </span>
                  )}
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="p-3 pt-1 border-t border-slate-200/60 bg-white text-xs space-y-3">
                  <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200">
                    <strong className="text-slate-700 block mb-1">Required Statutory Action:</strong>
                    <p className="text-slate-600 leading-relaxed">{item.requiredAction}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Rule Engine Note: Governed by GeM Incident Management & Clarification Protocol (Clause 4.8)
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSeekClarification?.(item.issue)}
                        className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        Issue 48-hr Clarification Notice
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
