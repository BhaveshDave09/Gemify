import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  KeyRound, 
  Building2, 
  Landmark, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types/gem';

interface RoleAuthModalProps {
  targetRole: UserRole;
  currentRole: UserRole;
  onAuthenticate: (role: UserRole, credentials: { name: string; department: string; tokenId: string }) => void;
  onCancel: () => void;
}

interface RoleCredentialProfile {
  title: string;
  category: string;
  defaultName: string;
  defaultDept: string;
  defaultTokenId: string;
  tokenType: string;
  statutoryAuthority: string;
  authorizedModules: string[];
  restrictedModules: string[];
  defaultPin: string;
}

export const ROLE_PROFILES: Record<UserRole, RoleCredentialProfile> = {
  PROCUREMENT_OFFICER: {
    title: 'Procurement Officer (CPSE / Ministry)',
    category: 'Government Procurement Authority',
    defaultName: 'Shri Rajesh Kumar, IDAS',
    defaultDept: 'Ministry of Power / NTPC Central Evaluation Cell',
    defaultTokenId: 'NIC-GOV-DSC-88421',
    tokenType: 'NIC Gov e-Sign Class-3 DSC Token',
    statutoryAuthority: 'GFR 2017 Rule 144, 149 & 151 Designated Competent Officer',
    authorizedModules: [
      'Tender Evaluation Dashboard',
      'Clause-by-Clause Statutory Checks (GFR 144(xi), 149, 151)',
      'Qualification & Disqualification Decision Modal',
      '48-Hour Statutory Clarification Notice Generator'
    ],
    restrictedModules: [
      'System Admin Telemetry & Microservices Health',
      'Direct Modification of SHA-256 Audit Log Database'
    ],
    defaultPin: '7842'
  },
  BIDDER: {
    title: 'Bidder / Vendor (MSME & Enterprises)',
    category: 'Commercial Enterprise & Vendor',
    defaultName: 'SunPower Grid Solutions Pvt Ltd (Amit Sharma, Director)',
    defaultDept: 'Commercial Bidding Division (MSME - Small)',
    defaultTokenId: 'UDYAM-DL-08-0023419 / GSTN-07AABCS1429B1ZX',
    tokenType: 'DigiLocker Corporate ID & Udyam Digital Key',
    statutoryAuthority: 'MSME Policy 2012 (Rule 170(i)) & PPP-MII 2017 Order',
    authorizedModules: [
      'Pre-Submission Eligibility Simulator',
      'Make in India Local Content Self-Calculator (PPP-MII 2017)',
      'GSTN vs CA Turnover Alignment Tool',
      'DigiLocker Credential Vault & Document Staging',
      '48-Hour Clarification Response Terminal'
    ],
    restrictedModules: [
      'Comparative Competitor Bids & Scoring Data',
      'Officer Private Deliberation Notes',
      'Statutory Audit Ledger & System Infrastructure'
    ],
    defaultPin: '5621'
  },
  AUDITOR: {
    title: 'Statutory Auditor (Forensic SHA-256 Ledger)',
    category: 'Supreme Audit Institution / Vigilance',
    defaultName: 'Smt. Meenakshi Sundaram, IA&AS',
    defaultDept: 'Office of Comptroller & Auditor General of India (CAG)',
    defaultTokenId: 'CAG-SEC65B-AUDIT-KEY-9910',
    tokenType: 'Section 65B Indian Evidence Act Certified Forensic Key',
    statutoryAuthority: 'CAG Act 1971 & CVC Vigilance Procurement Manual',
    authorizedModules: [
      'Cryptographic Hash Chain Inspector (SHA-256)',
      'Sequential Evaluation Log Viewer & Genesis Block Verifier',
      'Forensic Section 65B Certified CSV/PDF Exporter',
      'Non-Repudiation Certificate Validator'
    ],
    restrictedModules: [
      'Recording Procurement Decisions or Qualification Overrides',
      'Modifying Bidder Submissions or Tender Criteria',
      'System Admin Infrastructure Configurations'
    ],
    defaultPin: '9901'
  },
  ADMIN: {
    title: 'System Administrator (Integrations & Rules)',
    category: 'GeM SPV Infrastructure & SecOps',
    defaultName: 'GeM Central SecOps & Database Engineering Group',
    defaultDept: 'GeM SPV Infrastructure Operations Cell, New Delhi',
    defaultTokenId: 'GEM-ROOT-FIDO2-SECKEY-1024',
    tokenType: 'Hardware FIDO2 Security Key + Multi-Factor SSO',
    statutoryAuthority: 'MeitY National Cloud & Data Security Guidelines',
    authorizedModules: [
      '10-Connector Gateway Telemetry & Latency Monitors',
      'PostgreSQL DDL Schemas & Immutable Trigger Health',
      'Kubernetes Microservices Cluster Status & Circuit Breakers',
      'Statutory Rule Engine Execution Metrics'
    ],
    restrictedModules: [
      'Tender Evaluation Scoring & Disqualification Decisions',
      'Bidder Eligibility Simulation & Commercial Submissions'
    ],
    defaultPin: '1024'
  }
};

export const RoleAuthModal: React.FC<RoleAuthModalProps> = ({
  targetRole,
  currentRole,
  onAuthenticate,
  onCancel
}) => {
  const profile = ROLE_PROFILES[targetRole];
  const [officerName, setOfficerName] = useState(profile.defaultName);
  const [department, setDepartment] = useState(profile.defaultDept);
  const [tokenId, setTokenId] = useState(profile.defaultTokenId);
  const [pin, setPin] = useState(profile.defaultPin);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setErrorMessage('Please enter statutory authentication PIN / token code.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsVerifying(false);
      onAuthenticate(targetRole, {
        name: officerName,
        department,
        tokenId
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-xl w-[95vw] sm:w-full border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95">
        
        {/* Government Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-4.5 border-b border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-white/10 text-amber-300">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Statutory Role-Based Access Control (RBAC) Checkpoint
                </h3>
                <p className="text-[11px] text-blue-200">
                  Government e-Marketplace Security Directive & Identity Verification
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-white/70 hover:text-white text-base font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs">
          
          {/* Target Role Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                Target Persona Request:
              </span>
              <span className="bg-blue-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {profile.category}
              </span>
            </div>
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-800" />
              {profile.title}
            </h4>
            <p className="text-[11px] text-slate-600 font-medium">
              Statutory Basis: <strong className="text-slate-800">{profile.statutoryAuthority}</strong>
            </p>
          </div>

          {/* Persona Permissions vs Restrictions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-2.5">
              <span className="font-bold text-emerald-900 flex items-center gap-1 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Authorized Modules:
              </span>
              <ul className="space-y-1 text-slate-700">
                {profile.authorizedModules.map((m, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-2.5">
              <span className="font-bold text-rose-900 flex items-center gap-1 mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Enforced RBAC Restrictions:
              </span>
              <ul className="space-y-1 text-slate-700">
                {profile.restrictedModules.map((m, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Designated Identity / Official Name:
              </label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-semibold focus:ring-1 focus:ring-blue-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Department / Organization:
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Digital Token / Certificate ID:
                </label>
                <input
                  type="text"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono focus:ring-1 focus:ring-blue-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Security PIN / DSC Token Passcode:</span>
                <span className="text-[10px] text-slate-400 font-normal">Demo Code: {profile.defaultPin}</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter security PIN"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono focus:ring-1 focus:ring-blue-800"
                />
                <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-rose-50 border border-rose-300 text-rose-800 text-xs p-2 rounded-md flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Audit Trail Logging Note */}
          <div className="bg-slate-50 border border-slate-200 rounded p-2 text-[10px] text-slate-500 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>This role switch event will be cryptographically hashed and recorded into the immutable SHA-256 audit ledger.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isVerifying}
              className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-4 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              {isVerifying ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying DSC Token...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Authenticate & Switch Role</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
