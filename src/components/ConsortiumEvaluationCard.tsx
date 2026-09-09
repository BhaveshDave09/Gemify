import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  TrendingUp, 
  FileCheck, 
  Globe2,
  ExternalLink,
  Percent
} from 'lucide-react';
import { Bidder, ConsortiumPartner } from '../types/gem';

interface ConsortiumEvaluationCardProps {
  bidder: Bidder;
  onVerifyUdin?: (udin: string, memberNo: string, amount: number) => void;
}

export const ConsortiumEvaluationCard: React.FC<ConsortiumEvaluationCardProps> = ({
  bidder,
  onVerifyUdin
}) => {
  if (!bidder.isConsortium || !bidder.consortiumPartners || bidder.consortiumPartners.length === 0) {
    return null;
  }

  const partners = bidder.consortiumPartners;
  const leadPartner = partners.find(p => p.role === 'LEAD_MEMBER') || partners[0];
  const combinedTurnover = bidder.aggregatedTurnover || partners.reduce((sum, p) => sum + p.annualTurnoverAvg, 0);
  const allPartnersLandBorderOk = partners.every(p => p.landBorderCleared);
  const allDebarmentOk = partners.every(p => p.debarmentClean);

  return (
    <div className="bg-white rounded-xl border border-blue-200/80 shadow-xs overflow-hidden mb-5">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-900 to-indigo-900 px-4 py-3 text-white flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-800/80 text-amber-300">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold tracking-tight">Consortium / Joint Venture (JV) Evaluation Dossier</h4>
              <span className="bg-amber-400/20 text-amber-200 border border-amber-400/40 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {partners.length} Partner Entities
              </span>
            </div>
            <p className="text-[11px] text-blue-200">
              Evaluated under Central Public Procurement Guidelines & SECI Multi-Partner JV Directives
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-medium px-2.5 py-1 rounded-md">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Joint & Several Liability Registered
          </span>
        </div>
      </div>

      {/* Aggregated Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-blue-50/40 border-b border-blue-100 p-3.5 text-xs">
        <div className="px-2 py-1">
          <span className="text-[11px] text-slate-500 font-medium block">Lead Member Equity Share</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-base font-extrabold text-blue-950">{leadPartner.equitySharePercent}%</span>
            <span className="text-[10px] text-emerald-700 font-semibold">(Min ≥51% Required)</span>
          </div>
          <span className="text-[10px] text-slate-500 truncate block">{leadPartner.name}</span>
        </div>

        <div className="px-2 py-1">
          <span className="text-[11px] text-slate-500 font-medium block">Aggregated Annual Turnover</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-base font-extrabold text-emerald-700">₹{combinedTurnover.toFixed(1)} Lakhs</span>
            <span className="text-[10px] text-slate-500">Avg 3 Yrs</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">Surpasses ₹150L Tender Threshold</span>
        </div>

        <div className="px-2 py-1">
          <span className="text-[11px] text-slate-500 font-medium block">GFR 144(xi) Land Border Status</span>
          <div className="flex items-center gap-1 mt-1">
            {allPartnersLandBorderOk ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-emerald-800 text-xs">100% Cleared (All Partners)</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-bold text-rose-800 text-xs">Flagged: Unapproved Foreign Equity</span>
              </>
            )}
          </div>
          <span className="text-[10px] text-slate-500">All beneficial owners screened</span>
        </div>

        <div className="px-2 py-1">
          <span className="text-[11px] text-slate-500 font-medium block">CPPP Debarment & Blacklist</span>
          <div className="flex items-center gap-1 mt-1">
            {allDebarmentOk ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-emerald-800 text-xs">Zero Debarments Active</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-bold text-rose-800 text-xs">Debarment Detected</span>
              </>
            )}
          </div>
          <span className="text-[10px] text-slate-500">GFR Rule 151 compliant</span>
        </div>
      </div>

      {/* Partner by Partner Deep Breakdown */}
      <div className="p-4 space-y-3.5">
        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-blue-900" />
          Partner Entity Verification & Beneficial Ownership Ledger
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {partners.map((partner, idx) => (
            <div 
              key={partner.id}
              className={`p-3.5 rounded-lg border text-xs transition-all ${
                partner.role === 'LEAD_MEMBER' 
                  ? 'border-blue-300 bg-blue-50/30' 
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              {/* Partner Card Header */}
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-200/80 mb-2.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      partner.role === 'LEAD_MEMBER'
                        ? 'bg-blue-900 text-white'
                        : 'bg-indigo-100 text-indigo-800 font-semibold'
                    }`}>
                      {partner.role === 'LEAD_MEMBER' ? 'LEAD PARTNER' : `JV PARTNER #${idx + 1}`}
                    </span>
                    <span className="font-bold text-slate-900 text-xs truncate max-w-[190px]">
                      {partner.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    PAN: <span className="font-mono font-semibold text-slate-700">{partner.pan}</span>
                    {partner.cin && <> | CIN: <span className="font-mono text-slate-700">{partner.cin}</span></>}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-extrabold text-blue-950 block">{partner.equitySharePercent}%</span>
                  <span className="text-[10px] text-slate-500 font-medium">Equity Share</span>
                </div>
              </div>

              {/* Financial & Experience Data */}
              <div className="grid grid-cols-2 gap-2 mb-3 bg-white p-2 rounded border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-500 block">Annual Turnover:</span>
                  <span className="font-bold text-slate-800 text-xs">₹{partner.annualTurnoverAvg} Lakhs</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Past Experience:</span>
                  <span className="font-bold text-slate-800 text-xs">{partner.pastExperienceYears} Years</span>
                </div>
              </div>

              {/* Beneficial Owners GFR 144(xi) Audit */}
              <div className="mb-3">
                <span className="text-[10px] font-bold text-slate-700 block mb-1">
                  Beneficial Ownership & Land Border Check (GFR 144(xi)):
                </span>
                <div className="space-y-1">
                  {partner.beneficialOwners.map((owner, oIdx) => (
                    <div 
                      key={oIdx} 
                      className="flex items-center justify-between text-[11px] bg-white px-2 py-1 rounded border border-slate-100"
                    >
                      <div className="flex items-center gap-1 truncate">
                        <Globe2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-800 truncate">{owner.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-slate-500">({owner.nationality}, {owner.equityPercent}%)</span>
                        {owner.landBorderCompliant ? (
                          <span className="text-[10px] font-bold text-emerald-700 flex items-center">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-0.5" /> OK
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-700 flex items-center">
                            <AlertTriangle className="w-3 h-3 text-rose-600 mr-0.5" /> FAILED
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ICAI UDIN Verification Trigger */}
              {partner.udinTurnoverCert && (
                <div className="bg-slate-100/80 p-2 rounded flex items-center justify-between gap-2 border border-slate-200">
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 block">ICAI UDIN (Turnover Cert):</span>
                    <span className="font-mono text-[11px] font-bold text-blue-900">{partner.udinTurnoverCert.udin}</span>
                  </div>
                  {onVerifyUdin && (
                    <button
                      type="button"
                      onClick={() => onVerifyUdin(partner.udinTurnoverCert!.udin, partner.udinTurnoverCert!.caMembershipNo, partner.udinTurnoverCert!.verifiedAmountLakhs)}
                      className="px-2 py-1 bg-white hover:bg-blue-50 text-blue-900 border border-blue-300 rounded text-[10px] font-bold flex items-center gap-1 shadow-2xs transition-colors shrink-0 cursor-pointer"
                    >
                      <FileCheck className="w-3 h-3 text-blue-700" />
                      Verify UDIN
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
