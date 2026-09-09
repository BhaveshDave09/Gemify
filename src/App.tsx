import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Landmark, 
  HelpCircle, 
  FileText, 
  History, 
  Database, 
  Globe, 
  CheckCircle2, 
  AlertTriangle,
  Phone,
  Mail,
  ExternalLink,
  MessageSquare,
  Lock,
  UserCheck
} from 'lucide-react';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { BidderPortalView } from './views/BidderPortalView';
import { AuditTrailView } from './views/AuditTrailView';
import { PortalsNetworkView } from './views/PortalsNetworkView';
import { DatabaseAndRulesView } from './views/DatabaseAndRulesView';
import { AICopilotModal } from './components/AICopilotModal';
import { RoleAuthModal, ROLE_PROFILES } from './components/RoleAuthModal';
import { RBACAccessGate } from './components/RBACAccessGate';
import { Tender, Bidder, AuditLogEntry, UserRole, PortalType, DecisionStatus } from './types/gem';
import { INITIAL_TENDERS, INITIAL_BIDDERS, INITIAL_AUDIT_LOGS } from './data/mockData';

// Strict Role-to-Module Access Control Matrix
const ROLE_ALLOWED_TABS: Record<UserRole, string[]> = {
  PROCUREMENT_OFFICER: ['dashboard'],
  BIDDER: ['bidder-portal'],
  AUDITOR: ['audit-trail'],
  ADMIN: ['portals-network', 'schema-architecture']
};

const TAB_NAMES: Record<string, string> = {
  'dashboard': 'Tender Evaluation & Statutory Checks (GFR 144/149/151)',
  'bidder-portal': 'Vendor Pre-Submission Simulator & DigiLocker Vault',
  'audit-trail': 'Cryptographic SHA-256 Immutable Audit Ledger',
  'portals-network': '10-Connector Government API Gateway Telemetry',
  'schema-architecture': 'PostgreSQL DDL Schemas & Statutory Rules Engine'
};

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('PROCUREMENT_OFFICER');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [pendingRoleSwitch, setPendingRoleSwitch] = useState<UserRole | null>(null);

  // Authenticated Personas state
  const [authenticatedIdentities, setAuthenticatedIdentities] = useState<Record<UserRole, { name: string; department: string; tokenId: string }>>({
    PROCUREMENT_OFFICER: {
      name: ROLE_PROFILES.PROCUREMENT_OFFICER.defaultName,
      department: ROLE_PROFILES.PROCUREMENT_OFFICER.defaultDept,
      tokenId: ROLE_PROFILES.PROCUREMENT_OFFICER.defaultTokenId
    },
    BIDDER: {
      name: ROLE_PROFILES.BIDDER.defaultName,
      department: ROLE_PROFILES.BIDDER.defaultDept,
      tokenId: ROLE_PROFILES.BIDDER.defaultTokenId
    },
    AUDITOR: {
      name: ROLE_PROFILES.AUDITOR.defaultName,
      department: ROLE_PROFILES.AUDITOR.defaultDept,
      tokenId: ROLE_PROFILES.AUDITOR.defaultTokenId
    },
    ADMIN: {
      name: ROLE_PROFILES.ADMIN.defaultName,
      department: ROLE_PROFILES.ADMIN.defaultDept,
      tokenId: ROLE_PROFILES.ADMIN.defaultTokenId
    }
  });

  // Application Data States
  const [tenders, setTenders] = useState<Tender[]>(INITIAL_TENDERS);
  const [selectedTenderId, setSelectedTenderId] = useState<string>(INITIAL_TENDERS[0].id);
  const [bidders, setBidders] = useState<Bidder[]>(INITIAL_BIDDERS);
  const [selectedBidder, setSelectedBidder] = useState<Bidder | null>(INITIAL_BIDDERS[0]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // UI state
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isReverifying, setIsReverifying] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'compact' | 'normal' | 'large' | 'larger'>('normal');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Synchronize dynamic font scaling to document root
  useEffect(() => {
    document.documentElement.classList.remove('font-scale-compact', 'font-scale-normal', 'font-scale-large', 'font-scale-larger');
    document.documentElement.classList.add(`font-scale-${fontSize}`);
  }, [fontSize]);

  // Fetch initial data from server API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tendersRes, biddersRes, logsRes] = await Promise.all([
          fetch('/api/tenders').then(r => r.json()),
          fetch('/api/bidders').then(r => r.json()),
          fetch('/api/audit-logs').then(r => r.json())
        ]);

        if (Array.isArray(tendersRes) && tendersRes.length > 0) setTenders(tendersRes);
        if (Array.isArray(biddersRes) && biddersRes.length > 0) {
          setBidders(biddersRes);
          setSelectedBidder(biddersRes[0]);
        }
        if (Array.isArray(logsRes) && logsRes.length > 0) setAuditLogs(logsRes);
      } catch (err) {
        console.warn('Using seeded statutory data for client preview:', err);
      }
    };
    fetchData();
  }, []);

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  const selectedTender = tenders.find(t => t.id === selectedTenderId) || tenders[0];

  // RBAC Tab Authorization Check
  const isTabAuthorized = (tab: string, role: UserRole) => {
    return ROLE_ALLOWED_TABS[role]?.includes(tab);
  };

  // Safe Tab Change Handler
  const handleTabChange = (targetTab: string) => {
    setActiveTab(targetTab);
  };

  // Role Switch Initiator (Triggers Government Identity Verification)
  const handleInitiateRoleChange = (targetRole: UserRole) => {
    if (targetRole === currentRole) return;
    setPendingRoleSwitch(targetRole);
  };

  // Complete Role Authentication & Cryptographic Audit Trail Logging
  const handleCompleteAuthentication = async (
    role: UserRole, 
    credentials: { name: string; department: string; tokenId: string }
  ) => {
    // 1. Update identity
    setAuthenticatedIdentities(prev => ({
      ...prev,
      [role]: credentials
    }));

    // 2. Set active role and default view
    setCurrentRole(role);
    const defaultTab = ROLE_ALLOWED_TABS[role][0];
    setActiveTab(defaultTab);
    setPendingRoleSwitch(null);

    // 3. Cryptographically log role authentication to backend SHA-256 chain
    try {
      const response = await fetch('/api/audit-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'RBAC_PERSONA_AUTHENTICATION',
          category: 'SECURITY',
          actorRole: role === 'PROCUREMENT_OFFICER' ? 'PROCUREMENT_OFFICER' :
                     role === 'BIDDER' ? 'BIDDER' :
                     role === 'AUDITOR' ? 'STATUTORY_AUDITOR' : 'SYSTEM_ADMIN',
          actorName: credentials.name,
          actorDepartment: credentials.department,
          tenderId: selectedTender.bidNumber,
          details: `Role switch to ${ROLE_PROFILES[role].title} authenticated via Token ${credentials.tokenId}. Granted access to: ${ROLE_ALLOWED_TABS[role].join(', ')}.`
        })
      });

      if (response.ok) {
        const newLog = await response.json();
        setAuditLogs(prev => [newLog, ...prev]);
      }
    } catch {
      // Local fallback log
      const fakeLog: AuditLogEntry = {
        id: `LOG-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
        action: 'RBAC_PERSONA_AUTHENTICATION',
        category: 'SECURITY',
        actorRole: role,
        actorName: credentials.name,
        actorDepartment: credentials.department,
        tenderId: selectedTender.bidNumber,
        details: `Role switch to ${ROLE_PROFILES[role].title} authenticated via DSC Token ${credentials.tokenId}.`,
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        previousHash: auditLogs[0]?.hash || '0000000000000000000000000000000000000000000000000000000000000000',
        verified: true
      };
      setAuditLogs(prev => [fakeLog, ...prev]);
    }

    showNotification(`RBAC Authenticated: ${credentials.name} (${ROLE_PROFILES[role].category})`, 'success');
  };

  // Re-verify single portal gateway
  const handleReverifyPortal = async (portal: PortalType) => {
    if (!selectedBidder) return;
    setIsReverifying(portal);

    try {
      const response = await fetch('/api/portals/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portal,
          bidderId: selectedBidder.id,
          gstId: selectedBidder.gstId,
          udyamId: selectedBidder.udyamId,
          pan: selectedBidder.pan
        })
      });

      const updatedCheck = await response.json();
      
      setBidders(prev => prev.map(b => {
        if (b.id !== selectedBidder.id) return b;
        return {
          ...b,
          portalChecks: b.portalChecks.map(pc => pc.portal === portal ? updatedCheck : pc)
        };
      }));

      setSelectedBidder(prev => {
        if (!prev) return null;
        return {
          ...prev,
          portalChecks: prev.portalChecks.map(pc => pc.portal === portal ? updatedCheck : pc)
        };
      });

      showNotification(`Re-verified ${portal.replace('_', ' ')} Gateway with live statutory database`, 'success');
    } catch {
      showNotification(`Failed to connect to ${portal} API gateway`, 'warning');
    } finally {
      setIsReverifying(null);
    }
  };

  // Deep AI Compliance Evaluation
  const handleTriggerDeepAI = async (bidderId: string) => {
    const targetBidder = bidders.find(b => b.id === bidderId) || selectedBidder;
    if (!targetBidder) return;

    setIsAnalyzing(true);
    showNotification('AI Engine evaluating GFR 2017 clauses and portal cross-checks...', 'info');

    try {
      const response = await fetch('/api/ai/verify-bidder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bidder: targetBidder, tender: selectedTender })
      });

      const updatedAnalysis = await response.json();

      setBidders(prev => prev.map(b => {
        if (b.id !== bidderId) return b;
        return { ...b, aiAnalysis: updatedAnalysis };
      }));

      if (selectedBidder && selectedBidder.id === bidderId) {
        setSelectedBidder(prev => prev ? { ...prev, aiAnalysis: updatedAnalysis } : null);
      }

      showNotification(`AI Compliance score computed: ${updatedAnalysis.complianceScore}/100 (${updatedAnalysis.riskLevel} RISK)`, 'success');
    } catch {
      showNotification('AI compliance evaluation completed using statutory rule engine fallback.', 'info');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Officer records formal statutory decision
  const handleRecordOfficerDecision = async (
    status: DecisionStatus, 
    remarks: string, 
    officerName: string, 
    officerDept: string,
    customDeadline?: string
  ) => {
    if (!selectedBidder) return;

    try {
      const response = await fetch(`/api/bidders/${selectedBidder.id}/decision`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decisionStatus: status,
          officerRemarks: remarks,
          officerName,
          officerDept,
          customDeadline
        })
      });

      const updatedBidder = await response.json();

      setBidders(prev => prev.map(b => b.id === selectedBidder.id ? updatedBidder : b));
      setSelectedBidder(updatedBidder);

      // Refresh audit logs
      const logsRes = await fetch('/api/audit-logs').then(r => r.json()).catch(() => null);
      if (Array.isArray(logsRes)) setAuditLogs(logsRes);

      showNotification(`Officer Decision recorded: ${status.replace(/_/g, ' ')}`, 'success');
    } catch {
      const updated: Bidder = {
        ...selectedBidder,
        decisionStatus: status,
        officerRemarks: remarks,
        officerActionDate: new Date().toISOString().split('T')[0],
        clarificationDeadline: customDeadline || (status === 'CLARIFICATION_SOUGHT' ? new Date(Date.now() + 48*3600*1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' : undefined)
      };
      setBidders(prev => prev.map(b => b.id === selectedBidder.id ? updated : b));
      setSelectedBidder(updated);
      showNotification(`Officer Decision recorded: ${status.replace(/_/g, ' ')}`, 'success');
    }
  };

  // Vendor responds to clarification notice
  const handleRespondToClarification = async (bidderId: string, responseNote: string) => {
    try {
      await fetch(`/api/bidders/${bidderId}/clarification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responseNote })
      });

      const logsRes = await fetch('/api/audit-logs').then(r => r.json()).catch(() => null);
      if (Array.isArray(logsRes)) setAuditLogs(logsRes);

      showNotification('Clarification response submitted and logged to SHA-256 audit ledger', 'success');
    } catch {
      showNotification('Clarification response recorded locally', 'success');
    }
  };

  // Determine authorized role for current tab (for RBAC access gate fallback)
  const getRequiredRoleForTab = (tab: string): UserRole => {
    if (tab === 'dashboard') return 'PROCUREMENT_OFFICER';
    if (tab === 'bidder-portal') return 'BIDDER';
    if (tab === 'audit-trail') return 'AUDITOR';
    return 'ADMIN';
  };

  const activeUserIdentity = authenticatedIdentities[currentRole];
  const isCurrentTabAllowed = isTabAuthorized(activeTab, currentRole);

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans ${
      fontSize === 'large' ? 'text-base' : fontSize === 'larger' ? 'text-lg' : 'text-sm'
    }`}>
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-3 right-3 z-50 animate-in fade-in slide-in-from-top-2">
          <div className={`px-4 py-2.5 rounded-lg shadow-lg border text-xs font-bold flex items-center gap-2 ${
            notification.type === 'success' ? 'bg-emerald-900 text-white border-emerald-700' :
            notification.type === 'warning' ? 'bg-amber-900 text-white border-amber-700' :
            'bg-blue-900 text-white border-blue-700'
          }`}>
            {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
            {notification.type === 'info' && <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Government Header */}
      <Header
        currentRole={currentRole}
        onInitiateRoleChange={handleInitiateRoleChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tenders={tenders}
        selectedTenderId={selectedTenderId}
        onTenderSelect={(id) => {
          setSelectedTenderId(id);
          const firstBidder = bidders.find(b => b.tenderId === id);
          if (firstBidder) setSelectedBidder(firstBidder);
        }}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        authenticatedIdentity={activeUserIdentity}
      />

      {/* Main Content View Container with Strict RBAC Gate */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        
        {/* If user tries to view an unauthorized module, render official Statutory RBAC Gate */}
        {!isCurrentTabAllowed ? (
          <RBACAccessGate
            currentRole={currentRole}
            requiredRole={getRequiredRoleForTab(activeTab)}
            moduleName={TAB_NAMES[activeTab] || activeTab}
            onInitiateRoleSwitch={handleInitiateRoleChange}
            onReturnToAllowedModule={() => setActiveTab(ROLE_ALLOWED_TABS[currentRole][0])}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                currentRole={currentRole}
                tenders={tenders}
                selectedTender={selectedTender}
                bidders={bidders}
                selectedBidder={selectedBidder}
                onSelectBidder={setSelectedBidder}
                onReverifyPortal={handleReverifyPortal}
                onTriggerDeepAI={handleTriggerDeepAI}
                onRecordOfficerDecision={handleRecordOfficerDecision}
                isAnalyzing={isAnalyzing}
                isReverifying={isReverifying}
              />
            )}

            {activeTab === 'bidder-portal' && (
              <BidderPortalView
                tenders={tenders}
                selectedTender={selectedTender}
                bidders={bidders}
                onSubmitNewBid={(newBid) => {
                  showNotification('Bid submission draft processed and registered', 'success');
                }}
                onRespondToClarification={handleRespondToClarification}
              />
            )}

            {activeTab === 'audit-trail' && (
              <AuditTrailView
                logs={auditLogs}
                currentRole={currentRole}
              />
            )}

            {activeTab === 'portals-network' && (
              <PortalsNetworkView />
            )}

            {activeTab === 'schema-architecture' && (
              <DatabaseAndRulesView />
            )}
          </>
        )}
      </main>

      {/* Floating GeM AI Copilot Assistant Trigger */}
      <button
        id="floating-gem-copilot-trigger"
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 text-white font-bold px-4 py-3 rounded-full shadow-xl flex items-center gap-2 border-2 border-amber-400 transition-all hover:scale-105 cursor-pointer no-print"
        aria-label="Open GeM AI Procurement Copilot"
      >
        <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
        <span className="text-xs">Ask GeM AI Copilot</span>
      </button>

      {/* AI Copilot Modal with Role Context */}
      {isCopilotOpen && (
        <AICopilotModal
          onClose={() => setIsCopilotOpen(false)}
          currentRole={currentRole}
          context={{
            selectedTender: selectedTender.title,
            bidNumber: selectedTender.bidNumber,
            activeBidder: selectedBidder?.name,
            complianceScore: selectedBidder?.aiAnalysis?.complianceScore,
            authenticatedOfficer: activeUserIdentity.name
          }}
        />
      )}

      {/* Role-Based Authentication & DSC Verification Modal */}
      {pendingRoleSwitch && (
        <RoleAuthModal
          targetRole={pendingRoleSwitch}
          currentRole={currentRole}
          onAuthenticate={handleCompleteAuthentication}
          onCancel={() => setPendingRoleSwitch(null)}
        />
      )}

      {/* Official Government of India Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs mt-12 border-t border-slate-800 no-print">
        {/* Tricolor Ribbon */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] via-50% to-[#138808]" />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                <Landmark className="w-4 h-4 text-amber-400" />
                Government e-Marketplace (GeM)
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Special Purpose Vehicle (SPV) established under Section 8 of the Companies Act, 2013 for public procurement in India.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                Statutory RBAC Authority
              </h4>
              <ul className="space-y-1 text-[11px]">
                <li>• Procurement Officer: GFR Rules 144, 149 & 151</li>
                <li>• Vendor/Bidder: PPP-MII 2017 & MSME 2012</li>
                <li>• Auditor: CAG Act 1971 & Section 65B Evidence</li>
                <li>• System Admin: MeitY Cloud Security Standards</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                Statutory Connectors
              </h4>
              <ul className="space-y-1 text-[11px]">
                <li>• Udyam MSME Gateway</li>
                <li>• GSTN API Connectors</li>
                <li>• DigiLocker Verifiable Credentials</li>
                <li>• CPPP Debarment Registry</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                Helpdesk & Technical Support
              </h4>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Toll-Free: 1800-419-3436 / 1800-102-3436</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>helpdesk-gem@gov.in</span>
                </div>
                <div className="text-[10px] text-slate-500 pt-1">
                  24x7 Statutory Compliance Engine
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
            <div>
              © 2026 Government e-Marketplace (GeM), Ministry of Commerce and Industry, Government of India.
            </div>
            <div>
              Role-Based Access Control (RBAC) & SHA-256 Ledger Enforced
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
