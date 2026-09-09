import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Database, 
  UserCheck, 
  Clock, 
  Globe, 
  Search, 
  HelpCircle,
  TrendingUp,
  Landmark,
  Layers,
  History,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { UserRole, Tender } from '../types/gem';
import { ROLE_PROFILES } from './RoleAuthModal';

interface HeaderProps {
  currentRole: UserRole;
  onInitiateRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  tenders: Tender[];
  selectedTenderId: string;
  onTenderSelect: (tenderId: string) => void;
  onOpenCopilot: () => void;
  fontSize: 'compact' | 'normal' | 'large' | 'larger';
  onChangeFontSize: (size: 'compact' | 'normal' | 'large' | 'larger') => void;
  authenticatedIdentity: { name: string; department: string; tokenId: string };
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onInitiateRoleChange,
  activeTab,
  onTabChange,
  tenders,
  selectedTenderId,
  onTenderSelect,
  onOpenCopilot,
  fontSize,
  onChangeFontSize,
  authenticatedIdentity
}) => {
  const [time, setTime] = useState<string>('');
  const [isLanguageHindi, setIsLanguageHindi] = useState(false);

  const roleProfile = ROLE_PROFILES[currentRole];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const ALL_TABS = [
    {
      id: 'dashboard',
      label: 'Tender Evaluation & Statutory Checks',
      icon: ShieldCheck,
      color: 'text-blue-700',
      allowedRoles: ['PROCUREMENT_OFFICER']
    },
    {
      id: 'bidder-portal',
      label: 'Pre-Submission Eligibility Simulator',
      icon: TrendingUp,
      color: 'text-emerald-700',
      allowedRoles: ['BIDDER']
    },
    {
      id: 'audit-trail',
      label: 'Immutable Audit Trail (SHA-256)',
      icon: History,
      color: 'text-amber-700',
      allowedRoles: ['AUDITOR']
    },
    {
      id: 'portals-network',
      label: '10-Connector Gateway Telemetry',
      icon: Globe,
      color: 'text-indigo-700',
      allowedRoles: ['ADMIN']
    },
    {
      id: 'schema-architecture',
      label: 'Database Schema & Statutory Rules',
      icon: Database,
      color: 'text-purple-700',
      allowedRoles: ['ADMIN']
    }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs" id="gem-portal-header">
      {/* Top National Ribbon / Tricolor Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] via-50% to-[#138808] border-b border-slate-100" />

      {/* Top Metadata Bar (Gov of India Accessibility & Role Switcher) */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-1 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-blue-900" />
              {isLanguageHindi ? 'भारत सरकार | गवर्नमेंट ई-मार्केटप्लेस (GeM)' : 'Government of India | Government e-Marketplace (GeM)'}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 hidden sm:inline">CPPP Integrated Compliance Portal v3.7</span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Live IST Clock */}
            <div className="hidden md:flex items-center gap-1 text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{time} IST</span>
            </div>

            {/* Accessibility Font Sizer */}
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
              <span className="text-slate-400 mr-0.5 text-[10px] font-semibold uppercase">Font:</span>
              <button 
                id="font-btn-compact"
                onClick={() => onChangeFontSize('compact')}
                title="Compact font (A-)"
                className={`px-1.5 py-0.5 rounded text-xs font-semibold cursor-pointer transition-colors ${fontSize === 'compact' ? 'bg-blue-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                A-
              </button>
              <button 
                id="font-btn-normal"
                onClick={() => onChangeFontSize('normal')}
                title="Normal font (A)"
                className={`px-1.5 py-0.5 rounded text-xs font-semibold cursor-pointer transition-colors ${fontSize === 'normal' ? 'bg-blue-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                A
              </button>
              <button 
                id="font-btn-large"
                onClick={() => onChangeFontSize('large')}
                title="Large font (A+)"
                className={`px-1.5 py-0.5 rounded text-xs font-semibold cursor-pointer transition-colors ${fontSize === 'large' ? 'bg-blue-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                A+
              </button>
              <button 
                id="font-btn-larger"
                onClick={() => onChangeFontSize('larger')}
                title="Extra large font (A++)"
                className={`px-1.5 py-0.5 rounded text-xs font-semibold cursor-pointer transition-colors ${fontSize === 'larger' ? 'bg-blue-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                A++
              </button>
            </div>

            {/* Language Toggle */}
            <button 
              id="lang-toggle-btn"
              onClick={() => setIsLanguageHindi(!isLanguageHindi)}
              className="flex items-center gap-1 text-slate-700 hover:text-blue-800 font-medium px-2 py-0.5 bg-white rounded border border-slate-200 cursor-pointer"
            >
              <Globe className="w-3 h-3 text-slate-500" />
              <span>{isLanguageHindi ? 'English' : 'हिंदी'}</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-blue-50/80 border border-blue-200 rounded-md p-0.5" id="role-selector-pill">
              <span className="text-[11px] font-semibold text-blue-900 px-2 flex items-center gap-1 shrink-0">
                <UserCheck className="w-3 h-3 text-blue-700" /> Persona:
              </span>
              <select
                id="active-role-select"
                value={currentRole}
                onChange={(e) => onInitiateRoleChange(e.target.value as UserRole)}
                className="bg-white text-blue-950 text-xs font-semibold py-0.5 pl-2 pr-7 rounded border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
              >
                <option value="PROCUREMENT_OFFICER">Procurement Officer (CPSE / Ministry)</option>
                <option value="BIDDER">Bidder / Vendor (MSME & Enterprises)</option>
                <option value="AUDITOR">Statutory Auditor (Forensic SHA-256 Ledger)</option>
                <option value="ADMIN">System Administrator (Integrations & Rules)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Identity Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-white shadow-xs border border-blue-800 shrink-0">
              <Building2 className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-blue-800 text-white font-extrabold px-2 py-0.5 rounded text-xs tracking-wider">
                  GeM
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  RBAC Active
                </span>
                <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {roleProfile.category}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                Gemify Bid Compliance Verification Platform
              </h1>
              <p className="text-xs text-slate-500">
                Statutory Authority: {roleProfile.statutoryAuthority}
              </p>
            </div>
          </div>

          {/* User Identity & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Authenticated Identity Pill */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-bold text-slate-900 truncate max-w-[190px] sm:max-w-[230px]">
                  {authenticatedIdentity.name}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 truncate max-w-[230px]">
                {authenticatedIdentity.department}
              </p>
            </div>

            {/* Tender Dropdown Selector */}
            <div className="flex flex-col">
              <label htmlFor="header-tender-select" className="text-[11px] font-semibold text-slate-500 mb-0.5">
                Active Tender Under Review:
              </label>
              <select
                id="header-tender-select"
                value={selectedTenderId}
                onChange={(e) => onTenderSelect(e.target.value)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-medium rounded-md py-1.5 pl-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-800 max-w-xs truncate shadow-2xs cursor-pointer"
              >
                {tenders.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.bidNumber} - {t.title.slice(0, 40)}...
                  </option>
                ))}
              </select>
            </div>

            {/* GeM AI Copilot Trigger Button */}
            <button
              id="header-copilot-btn"
              onClick={onOpenCopilot}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 text-white text-xs font-bold px-3.5 py-2 rounded-md shadow-xs transition-all cursor-pointer border border-amber-400/50"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>GeM AI Copilot</span>
            </button>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <nav className="flex items-center space-x-1 border-t border-slate-200 mt-3 pt-2 overflow-x-auto text-xs font-semibold" aria-label="Main Navigation">
          {ALL_TABS.map((tab) => {
            const Icon = tab.icon;
            const isAuthorized = tab.allowedRoles.includes(currentRole);
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-t-md transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-blue-800 text-blue-900 bg-blue-50/80 font-bold'
                    : isAuthorized
                    ? 'border-transparent text-slate-700 hover:text-blue-900 hover:bg-slate-100'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50 opacity-70'
                }`}
                title={isAuthorized ? tab.label : `Restricted to ${tab.allowedRoles.join(', ')}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? tab.color : isAuthorized ? 'text-slate-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {!isAuthorized && (
                  <Lock className="w-3 h-3 text-slate-400 ml-1" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
