import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, FileSpreadsheet, ShieldAlert, Award } from 'lucide-react';
import { ClauseCompliance } from '../types/gem';

interface ClauseComplianceTableProps {
  clauses: ClauseCompliance[];
}

export const ClauseComplianceTable: React.FC<ClauseComplianceTableProps> = ({ clauses }) => {
  const getStatusBadge = (status: ClauseCompliance['complianceStatus']) => {
    switch (status) {
      case 'COMPLIANT':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            COMPLIANT
          </span>
        );
      case 'EXEMPTED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-300 px-2 py-0.5 rounded">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            STATUTORILY EXEMPTED
          </span>
        );
      case 'NEEDS_CLARIFICATION':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            NEEDS CLARIFICATION
          </span>
        );
      case 'NON_COMPLIANT':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            NON-COMPLIANT
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs" id="clause-compliance-table-section">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-blue-800" />
            Statutory Clause-by-Clause Evaluation Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Mandatory compliance requirements cross-mapped to General Financial Rules (GFR) 2017 & Government Orders
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3 font-bold">Clause & Statutory Act</th>
              <th className="py-2.5 px-3 font-bold">Tender Requirement</th>
              <th className="py-2.5 px-3 font-bold">Bidder Declaration / Evidence</th>
              <th className="py-2.5 px-3 font-bold">Status</th>
              <th className="py-2.5 px-3 font-bold">Officer & AI Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clauses.map((clause) => (
              <tr key={clause.clauseId} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-3 align-top">
                  <div className="font-bold text-slate-900">{clause.clauseTitle}</div>
                  <div className="text-[10px] text-blue-800 font-mono mt-0.5 bg-blue-50/80 px-1.5 py-0.5 rounded inline-block border border-blue-100">
                    {clause.statutoryReference}
                  </div>
                </td>

                <td className="py-3 px-3 align-top text-slate-700 max-w-xs leading-relaxed">
                  {clause.requirement}
                </td>

                <td className="py-3 px-3 align-top text-slate-800 max-w-xs font-medium">
                  {clause.bidderClaim}
                </td>

                <td className="py-3 px-3 align-top whitespace-nowrap">
                  {getStatusBadge(clause.complianceStatus)}
                </td>

                <td className="py-3 px-3 align-top text-slate-600 text-[11px] leading-relaxed">
                  {clause.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
