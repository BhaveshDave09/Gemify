import React from 'react';
import { 
  ShieldAlert, 
  Lock, 
  UserCheck, 
  ArrowRight, 
  Landmark, 
  FileWarning, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { UserRole } from '../types/gem';
import { ROLE_PROFILES } from './RoleAuthModal';

interface RBACAccessGateProps {
  currentRole: UserRole;
  requiredRole: UserRole | UserRole[];
  moduleName: string;
  onInitiateRoleSwitch: (role: UserRole) => void;
  onReturnToAllowedModule: () => void;
}

export const RBACAccessGate: React.FC<RBACAccessGateProps> = ({
  currentRole,
  requiredRole,
  moduleName,
  onInitiateRoleSwitch,
  onReturnToAllowedModule
}) => {
  const targetRole = Array.isArray(requiredRole) ? requiredRole[0] : requiredRole;
  const currentProfile = ROLE_PROFILES[currentRole];
  const targetProfile = ROLE_PROFILES[targetRole];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 max-w-3xl mx-auto shadow-xs my-8 animate-in fade-in zoom-in-95" id="rbac-access-restriction-gate">
      
      {/* Alert Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase">
            403 Statutory Access Restriction
          </span>
          <h2 className="text-lg font-extrabold text-slate-900 mt-1">
            Module Access Restricted under Role-Based Access Control (RBAC)
          </h2>
          <p className="text-xs text-slate-500">
            Government e-Marketplace (GeM) & CPPP Information Security Directive
          </p>
        </div>
      </div>

      {/* Restriction Details Box */}
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 mb-6 space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div>
            <span className="text-slate-500 text-[11px] block">Attempted Module:</span>
            <strong className="text-slate-900 text-sm">{moduleName}</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Current Authenticated Role:</span>
            <span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded text-xs inline-block">
              {currentProfile.title}
            </span>
          </div>
        </div>

        <div>
          <span className="font-bold text-slate-700 block mb-1">Authorized Personas for this Module:</span>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-xs">
              {targetProfile.title}
            </span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded p-2.5 text-amber-900 text-[11px] flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block">Statutory Separation of Duties:</strong>
            Pursuant to General Financial Rules (GFR) 2017 and CVC Public Procurement Guidelines, commercial bidders, statutory auditors, system administrators, and evaluation officers must operate with strict role isolation to ensure fairness, non-repudiation, and audit integrity.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          onClick={onReturnToAllowedModule}
          className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Return to Authorized Workspace</span>
        </button>

        <button
          onClick={() => onInitiateRoleSwitch(targetRole)}
          className="w-full sm:w-auto bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2 rounded-md flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <UserCheck className="w-3.5 h-3.5 text-amber-300" />
          <span>Authenticate as {targetProfile.title.split(' ')[0]}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
