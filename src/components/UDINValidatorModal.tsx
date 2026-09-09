import React, { useState } from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Building2, 
  ExternalLink,
  Calendar,
  IndianRupee,
  Lock
} from 'lucide-react';
import { UDINVerificationResult } from '../types/gem';

interface UDINValidatorModalProps {
  initialUdin?: string;
  initialMemberNo?: string;
  initialAmount?: number;
  onClose: () => void;
}

export const UDINValidatorModal: React.FC<UDINValidatorModalProps> = ({
  initialUdin = '26049182AAAAAA1122',
  initialMemberNo = '049182',
  initialAmount = 285.0,
  onClose
}) => {
  const [udin, setUdin] = useState(initialUdin);
  const [memberNo, setMemberNo] = useState(initialMemberNo);
  const [amount, setAmount] = useState<number>(initialAmount);
  const [result, setResult] = useState<UDINVerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/portals/verify-udin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          udin,
          caMembershipNo: memberNo,
          expectedAmount: amount
        })
      });
      const data: UDINVerificationResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to ICAI verification gateway');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-xl w-[95vw] sm:w-full border border-slate-200 shadow-2xl p-5 my-auto max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-900 text-white">
              <FileCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900">
                  ICAI UDIN Live Verification Gateway
                </h3>
                <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded">
                  Gazette Mandated
                </span>
              </div>
              <p className="text-xs text-slate-500">
                18-Digit Unique Document Identification Number verification against ICAI Central Registry
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

        {/* Input Form */}
        <form onSubmit={handleVerify} className="py-4 space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              18-Digit ICAI UDIN String:
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={18}
                value={udin}
                onChange={(e) => setUdin(e.target.value.toUpperCase())}
                placeholder="e.g. 26049182AAAAAA1122"
                className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 font-mono text-sm font-bold text-slate-900 tracking-wider focus:ring-2 focus:ring-blue-800 focus:outline-none uppercase"
              />
              <span className="absolute right-3 top-2.5 text-[11px] font-mono text-slate-400">
                {udin.length}/18
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Format: 2 Digits (Year) + 6 Digits (CA Membership No) + 10 Alphanumeric Security Code
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-semibold mb-0.5 text-[11px]">
                Certifying CA Membership No:
              </label>
              <input
                type="text"
                value={memberNo}
                onChange={(e) => setMemberNo(e.target.value)}
                placeholder="e.g. 049182"
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-mono text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-0.5 text-[11px]">
                Certified Amount (₹ in Lakhs):
              </label>
              <input
                type="number"
                step="0.1"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="285.0"
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-mono text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            {loading ? (
              <span>Querying ICAI Central Registry...</span>
            ) : (
              <>
                <Search className="w-3.5 h-3.5 text-amber-300" />
                <span>Verify UDIN on ICAI Live Portal</span>
              </>
            )}
          </button>
        </form>

        {/* Verification Result Dossier */}
        {result && (
          <div className={`p-4 rounded-xl border mt-2 text-xs animate-in fade-in ${
            result.status === 'ACTIVE_VERIFIED'
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
              : result.status === 'REVOKED'
              ? 'bg-rose-50/70 border-rose-300 text-rose-950'
              : 'bg-amber-50/70 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-center justify-between pb-2.5 border-b border-emerald-200/80 mb-3">
              <div className="flex items-center gap-2">
                {result.status === 'ACTIVE_VERIFIED' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-extrabold text-sm">
                    {result.status === 'ACTIVE_VERIFIED' ? 'ICAI UDIN Valid & Active' : 'UDIN Verification Failed'}
                  </h4>
                  <span className="text-[10px] text-slate-500">
                    Institute of Chartered Accountants of India (ICAI) Status
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md ${
                result.status === 'ACTIVE_VERIFIED' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}>
                {result.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] bg-white p-3 rounded-lg border border-emerald-100 mb-3">
              <div>
                <span className="text-slate-500 block">Practicing Chartered Accountant:</span>
                <span className="font-bold text-slate-900 text-xs">{result.caName}</span>
                <span className="text-[10px] text-slate-500 block font-mono">M.No: {result.caMembershipNo} | {result.firmRegistrationNo}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Certified Turnover / Figures:</span>
                <span className="font-extrabold text-emerald-700 text-xs">₹{result.financialFigureCertified} Lakhs</span>
                <span className="text-[10px] text-slate-500 block">Generated on: {result.dateOfGeneration}</span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-slate-500 block">Document Certificate Category:</span>
                <span className="font-medium text-slate-800">{result.documentType}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono break-all bg-emerald-100/60 p-2 rounded">
              <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>SHA-256 Hash: {result.tamperProofHash}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
