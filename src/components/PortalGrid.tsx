import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  FileCheck,
  Briefcase,
  Award,
  Users,
  Lock,
  Flag,
  Sparkles
} from 'lucide-react';
import { PortalCheckResult, PortalType } from '../types/gem';

interface PortalGridProps {
  portalChecks: PortalCheckResult[];
  onSelectPortal: (portalCheck: PortalCheckResult) => void;
  onReverifyPortal: (portal: PortalType) => void;
  isReverifying?: string | null;
}

export const PortalGrid: React.FC<PortalGridProps> = ({
  portalChecks,
  onSelectPortal,
  onReverifyPortal,
  isReverifying
}) => {
  const getPortalIcon = (portal: PortalType) => {
    switch (portal) {
      case 'UDYAM_MSME':
        return <Award className="w-5 h-5 text-amber-700" />;
      case 'GSTN':
        return <FileCheck className="w-5 h-5 text-blue-700" />;
      case 'PAN_INCOME_TAX':
        return <Lock className="w-5 h-5 text-indigo-700" />;
      case 'MCA21':
        return <Building2 className="w-5 h-5 text-purple-700" />;
      case 'STARTUP_INDIA':
        return <Sparkles className="w-5 h-5 text-emerald-700" />;
      case 'NSIC':
        return <Briefcase className="w-5 h-5 text-cyan-700" />;
      case 'EPFO_ESIC':
        return <Users className="w-5 h-5 text-teal-700" />;
      case 'DIGILOCKER':
        return <ShieldCheck className="w-5 h-5 text-sky-700" />;
      case 'BIS_DPIIT':
        return <Flag className="w-5 h-5 text-orange-700" />;
      case 'CPPP_BLACKLIST':
        return <ShieldCheck className="w-5 h-5 text-rose-700" />;
    }
  };

  const getStatusDisplay = (status: PortalCheckResult['status']) => {
    switch (status) {
      case 'VERIFIED':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
          label: 'VERIFIED ✅',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          badgeBg: 'bg-emerald-500'
        };
      case 'DISCREPANCY':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          label: 'DISCREPANCY ⚠️',
          bg: 'bg-amber-50 text-amber-900 border-amber-300',
          badgeBg: 'bg-amber-500'
        };
      case 'FAILED':
        return {
          icon: <XCircle className="w-4 h-4 text-rose-600" />,
          label: 'FAILED ❌',
          bg: 'bg-rose-50 text-rose-900 border-rose-300',
          badgeBg: 'bg-rose-500'
        };
      case 'PENDING':
      default:
        return {
          icon: <Clock className="w-4 h-4 text-slate-500" />,
          label: 'PENDING ⏳',
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          badgeBg: 'bg-slate-400'
        };
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs" id="multi-portal-grid-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-800" />
            Statutory Government Portal Cross-Checks
          </h3>
          <p className="text-xs text-slate-500">
            Real-time automated reconciliation across 10 official government repositories and API gateways
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Total Portals: <strong className="text-slate-800">{portalChecks.length}</strong></span>
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {portalChecks.filter(p => p.status === 'VERIFIED').length} Verified
          </span>
          {portalChecks.some(p => p.status === 'DISCREPANCY') && (
            <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {portalChecks.filter(p => p.status === 'DISCREPANCY').length} Discrepancy
            </span>
          )}
          {portalChecks.some(p => p.status === 'FAILED') && (
            <span className="text-rose-800 font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {portalChecks.filter(p => p.status === 'FAILED').length} Failed
            </span>
          )}
        </div>
      </div>

      {/* Grid of 10 Government Portals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {portalChecks.map((check) => {
          const statusInfo = getStatusDisplay(check.status);
          const isProcessing = isReverifying === check.portal;

          return (
            <div
              key={check.portal}
              id={`portal-card-${check.portal.toLowerCase()}`}
              className={`rounded-lg border p-3 flex flex-col justify-between transition-all hover:shadow-md cursor-pointer ${
                check.status === 'FAILED'
                  ? 'border-rose-300 bg-rose-50/30'
                  : check.status === 'DISCREPANCY'
                  ? 'border-amber-300 bg-amber-50/30'
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
              onClick={() => onSelectPortal(check)}
            >
              <div>
                {/* Header: Icon, Name & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-slate-100 border border-slate-200/80">
                      {getPortalIcon(check.portal)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                        {check.portalName}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1">
                        {check.department}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Pill & Match Confidence */}
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border flex items-center gap-1 ${statusInfo.bg}`}>
                    {statusInfo.icon}
                    {statusInfo.label}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Match: <strong className="text-slate-700">{check.confidenceScore}%</strong>
                  </span>
                </div>

                {/* Summary / Snippet */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {check.summary}
                </p>

                {/* Discrepancy Flags if any */}
                {check.flags && check.flags.length > 0 && (
                  <div className="mt-2 text-[11px] bg-rose-100/80 text-rose-900 px-2 py-1 rounded border border-rose-200 font-medium">
                    ⚠️ {check.flags[0]}
                  </div>
                )}
              </div>

              {/* Card Footer: Reference ID, Last Ping & Trigger Re-check */}
              <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-slate-100 text-[10px] text-slate-400">
                <span className="font-mono truncate max-w-[120px]" title={check.referenceId}>
                  Ref: {check.referenceId}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title="Re-query API Gateway"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReverifyPortal(check.portal);
                    }}
                    disabled={isProcessing}
                    className="p-1 text-slate-500 hover:text-blue-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isProcessing ? 'animate-spin text-blue-700' : ''}`} />
                  </button>
                  <span className="text-blue-700 font-semibold hover:underline flex items-center gap-0.5">
                    View <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
