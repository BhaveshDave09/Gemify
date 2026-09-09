import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Send, 
  CalendarDays,
  Info,
  ChevronRight,
  Download
} from 'lucide-react';
import { Bidder, GazettedHoliday } from '../types/gem';
import { CENTRAL_GOVT_GAZETTED_HOLIDAYS_2026 } from '../data/mockData';

interface ClarificationNoticeModalProps {
  bidder: Bidder;
  onClose: () => void;
  onSendNotice: (remarks: string, customDeadline: string, officerName: string, officerDept: string) => void;
}

export const ClarificationNoticeModal: React.FC<ClarificationNoticeModalProps> = ({
  bidder,
  onClose,
  onSendNotice
}) => {
  const [officerName, setOfficerName] = useState('Shri R. K. Sharma (Sr. DGM - Procurement)');
  const [officerDept, setOfficerDept] = useState('SECI Tender Evaluation Committee');
  const [workingHours, setWorkingHours] = useState<number>(48);
  const [customSubject, setCustomSubject] = useState(
    `STATUTORY 48-HOUR CLARIFICATION NOTICE: Tender ${bidder.tenderId} - ${bidder.name}`
  );
  
  // Default clarification points based on bidder's risk factors
  const defaultIssues = bidder.aiAnalysis.pendingRemediations.length > 0
    ? bidder.aiAnalysis.pendingRemediations.map((r, i) => `${i + 1}. ${r.issue} — Required Action: ${r.requiredAction}`).join('\n')
    : `1. GSTN vs. CA Turnover Reconciliation: Discrepancy observed between declared turnover figures and GSTR-3B filings. Please furnish CA reconciliation certificate with valid ICAI UDIN.\n2. Make-in-India Domestic Value Addition: Furnish itemized Bill of Materials (BOM) detailing indigenous component breakup pursuant to PPP-MII Order 2017.`;

  const [clarificationPoints, setClarificationPoints] = useState(defaultIssues);

  // Calculated deadline state
  const [calculatedDeadline, setCalculatedDeadline] = useState<string>('');
  const [skippedHolidays, setSkippedHolidays] = useState<{ date: string; name: string }[]>([]);
  const [workingDaysCount, setWorkingDaysCount] = useState<number>(2);

  // Calculate deadline with gazetted holidays and weekends
  useEffect(() => {
    let cursor = new Date();
    let workingDaysNeeded = Math.ceil(workingHours / 24);
    let daysAdded = 0;
    const skipped: { date: string; name: string }[] = [];

    while (daysAdded < workingDaysNeeded) {
      cursor.setDate(cursor.getDate() + 1);
      const day = cursor.getDay();
      const dateStr = cursor.toISOString().split('T')[0];
      const isHoliday = CENTRAL_GOVT_GAZETTED_HOLIDAYS_2026.find(h => h.date === dateStr);

      if (day === 0 || day === 6) {
        // Weekend skipped
        continue;
      } else if (isHoliday) {
        skipped.push({ date: dateStr, name: isHoliday.name });
        continue;
      } else {
        daysAdded++;
      }
    }

    cursor.setHours(17, 0, 0, 0); // 17:00 IST close of office hours
    const deadlineString = cursor.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
    setCalculatedDeadline(deadlineString);
    setSkippedHolidays(skipped);
    setWorkingDaysCount(workingDaysNeeded);
  }, [workingHours]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullNoticeText = `[48-HR STATUTORY CLARIFICATION NOTICE]\nSubject: ${customSubject}\n\nClarification Items Required:\n${clarificationPoints}\n\nStatutory Deadline: ${calculatedDeadline} (${workingHours} Working Hours excluding Gazetted Holidays/Weekends).`;
    onSendNotice(fullNoticeText, calculatedDeadline, officerName, officerDept);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-[95vw] sm:w-full border border-slate-200 shadow-2xl p-5 my-auto max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-lg bg-amber-500 text-slate-900">
              <Clock className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  48-Hour Statutory Clarification Notice Scheduler
                </h3>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  Gazetted Calendar Integrated
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Notice issuance under GFR Rule 173(iv) & Department of Expenditure SOP for <strong className="text-slate-800">{bidder.name}</strong>
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
          
          {/* Statutory Working Hours & Gazetted Holiday Scheduler Box */}
          <div className="bg-amber-50/50 rounded-xl border border-amber-200 p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs">
                <CalendarDays className="w-4 h-4 text-amber-700" />
                <span>Statutory Timeline Calculation (DoE / GeM Norms)</span>
              </div>
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Standard: 48 Working Hours
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 rounded-lg border border-amber-100 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Notice Issuance Date:</span>
                <span className="font-bold text-slate-800 text-xs">
                  {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </span>
              </div>

              <div>
                <span className="text-[11px] text-amber-800 block font-bold">Computed Statutory Deadline:</span>
                <span className="font-extrabold text-amber-950 text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {calculatedDeadline || 'Calculating...'}
                </span>
              </div>
            </div>

            {/* Gazetted Holidays Skipped Callout */}
            <div className="bg-white/80 p-2.5 rounded border border-amber-200 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Info className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>Non-Working Days Automatically Excluded:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pl-5">
                <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200">
                  Saturdays & Sundays (Exempt)
                </span>
                {skippedHolidays.length > 0 ? (
                  skippedHolidays.map((h, idx) => (
                    <span key={idx} className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-300">
                      🏛️ {h.name} ({h.date})
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-slate-500 italic">
                    (No Gazetted Central Government Holidays fall within this 48-hr window)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Official Notice Subject Line:
            </label>
            <input
              type="text"
              required
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Specific Clarification Points Required */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Itemized Deficiencies & Remediation Requirements:
            </label>
            <textarea
              rows={4}
              required
              value={clarificationPoints}
              onChange={(e) => setClarificationPoints(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
              placeholder="List specific documents, UDIN certificates, or BOM itemizations required..."
            />
            <p className="text-[10px] text-slate-500 mt-1">
              As per GFR Rule 173(iv), clarification requests must not permit any change in the substance or price of the bid.
            </p>
          </div>

          {/* Officer Credentials & DSC Signing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <label className="block text-slate-500 text-[11px] font-semibold mb-0.5">
                Issuing Officer:
              </label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-500 text-[11px] font-semibold mb-0.5">
                Authority / Cell:
              </label>
              <input
                type="text"
                value={officerDept}
                onChange={(e) => setOfficerDept(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Immutable Notice Info */}
          <div className="text-[11px] text-slate-600 flex items-center gap-1.5 bg-blue-50/70 p-2.5 rounded border border-blue-200 text-blue-950">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
            <span>
              Issuance will notify the bidder through GeM & DigiLocker portals, starting the non-repudiation 48-hr countdown clock on the dashboard.
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
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-5 py-2 rounded-md transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Sign with DSC & Dispatch Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
