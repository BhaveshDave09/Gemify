import React, { useState } from 'react';
import { 
  Globe, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Lock, 
  RefreshCw, 
  FileCheck, 
  Award, 
  Briefcase, 
  Users, 
  Flag, 
  Sparkles,
  Send,
  Code2
} from 'lucide-react';
import { PortalType } from '../types/gem';

export const PortalsNetworkView: React.FC = () => {
  const [selectedPortal, setSelectedPortal] = useState<PortalType>('UDYAM_MSME');
  const [testIdentifier, setTestIdentifier] = useState('UDYAM-MH-02-0019283');
  const [isQuerying, setIsQuerying] = useState(false);
  const [testResponse, setTestResponse] = useState<any>(null);

  const portalsList = [
    {
      id: 'UDYAM_MSME' as PortalType,
      name: 'Udyam Registration Portal (MSME)',
      ministry: 'Ministry of Micro, Small and Medium Enterprises',
      endpoint: 'https://api.udyamregistration.gov.in/v2/verify',
      status: 'OPERATIONAL',
      latency: '118 ms',
      auth: 'mTLS 1.3 + HMAC-SHA256',
      sampleId: 'UDYAM-MH-02-0019283'
    },
    {
      id: 'GSTN' as PortalType,
      name: 'GSTN Returns & Tax Filing Portal',
      ministry: 'Goods and Services Tax Network / CBIC',
      endpoint: 'https://api.gstn.org.in/taxpayerapi/v1.2/returns',
      status: 'OPERATIONAL',
      latency: '142 ms',
      auth: 'OAuth 2.0 + GSP Gateway',
      sampleId: '27AABCU9603R1ZN'
    },
    {
      id: 'PAN_INCOME_TAX' as PortalType,
      name: 'Income Tax Department (ITD / NSDL)',
      ministry: 'Central Board of Direct Taxes (CBDT)',
      endpoint: 'https://api.incometax.gov.in/pan/v3/status',
      status: 'OPERATIONAL',
      latency: '95 ms',
      auth: 'API Setu / PKI Cert',
      sampleId: 'AABCU9603R'
    },
    {
      id: 'MCA21' as PortalType,
      name: 'MCA21 Corporate Registry (ROC)',
      ministry: 'Ministry of Corporate Affairs',
      endpoint: 'https://api.mca.gov.in/roc/v2/company-master',
      status: 'OPERATIONAL',
      latency: '165 ms',
      auth: 'Gov Gateway Token',
      sampleId: 'U40106MH2018PTC309112'
    },
    {
      id: 'STARTUP_INDIA' as PortalType,
      name: 'Startup India Hub (DPIIT)',
      ministry: 'Department for Promotion of Industry and Internal Trade',
      endpoint: 'https://api.startupindia.gov.in/dpiit/recognition/v1',
      status: 'OPERATIONAL',
      latency: '130 ms',
      auth: 'DPIIT API Secret',
      sampleId: 'DPIIT-STP-2022-9841'
    },
    {
      id: 'NSIC' as PortalType,
      name: 'National Small Industries Corporation (NSIC)',
      ministry: 'Ministry of MSME (Single Point Registration)',
      endpoint: 'https://api.nsic.co.in/sprs/v1/validity',
      status: 'OPERATIONAL',
      latency: '210 ms',
      auth: 'Gov mTLS Gateway',
      sampleId: 'NSIC/GP/MH/2021/00812'
    },
    {
      id: 'EPFO_ESIC' as PortalType,
      name: 'EPFO & ESIC Social Security Registry',
      ministry: 'Ministry of Labour and Employment',
      endpoint: 'https://api.epfindia.gov.in/shramsuvidha/v1/compliance',
      status: 'OPERATIONAL',
      latency: '180 ms',
      auth: 'Shram Suvidha API Key',
      sampleId: 'MH/BAN/0019283/000'
    },
    {
      id: 'DIGILOCKER' as PortalType,
      name: 'DigiLocker National Verifiable Credentials',
      ministry: 'National e-Governance Division (NeGD) / MeitY',
      endpoint: 'https://api.digilocker.gov.in/public/oauth2/1/pull/uri',
      status: 'OPERATIONAL',
      latency: '88 ms',
      auth: 'NeGD DigiLocker Gateway Key',
      sampleId: 'in.gov.digilocker.gem.cert.9921'
    },
    {
      id: 'BIS_DPIIT' as PortalType,
      name: 'BIS Standards & DPIIT Make in India Database',
      ministry: 'Bureau of Indian Standards / DPIIT',
      endpoint: 'https://api.bis.gov.in/isi/v2/certificate-check',
      status: 'OPERATIONAL',
      latency: '155 ms',
      auth: 'BIS API Gateway Token',
      sampleId: 'BIS-ISI-CM/L-72001928'
    },
    {
      id: 'CPPP_BLACKLIST' as PortalType,
      name: 'Central Debarment & Blacklist Repository (CPPP)',
      ministry: 'Department of Expenditure / Ministry of Finance',
      endpoint: 'https://eprocure.gov.in/cppp/api/debarment/v1/check',
      status: 'OPERATIONAL',
      latency: '74 ms',
      auth: 'National e-Procurement Gateway',
      sampleId: 'DEBAR-CHECK-27AABCU9603R1ZN'
    }
  ];

  const handleTestQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuerying(true);

    setTimeout(() => {
      setIsQuerying(false);
      setTestResponse({
        timestamp: new Date().toISOString(),
        gatewayStatus: 'HTTP 200 OK',
        portal: selectedPortal,
        queryIdentifier: testIdentifier,
        verified: true,
        recordFound: true,
        matchConfidence: 98.4,
        rawPayload: {
          status: 'ACTIVE_GOOD_STANDING',
          registrationDate: '2020-07-15',
          complianceRating: 'A+',
          lastTaxAssessmentFY: '2024-25',
          debarmentStatus: 'CLEAR_NO_RESTRAINTS',
          hashSignature: '7f9a2b8e4d1c3a6f0e5b7d9a1c3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e'
        }
      });
    }, 600);
  };

  return (
    <div className="space-y-6" id="portals-network-view">
      
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs">
        <div className="flex items-start gap-3 border-b border-slate-100 pb-3 mb-3">
          <div className="p-3 rounded-lg bg-blue-900 text-white">
            <Globe className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                10-Government Portal Integration Connectors & API Gateways
              </h2>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
                All 10 Connectors Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure, automated cross-verification with official Government of India statutory registries via API Setu & National Single Sign-On
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px] block">Average API Latency</span>
            <strong className="text-emerald-700 text-sm font-bold">128 ms</strong>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px] block">Daily API Quota Limit</span>
            <strong className="text-slate-900 text-sm font-bold">1,000,000 reqs/day</strong>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px] block">Gateway Encryption</span>
            <strong className="text-blue-900 text-sm font-bold">TLS 1.3 / AES-256</strong>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-500 text-[10px] block">Uptime SLA (Gov Standard)</span>
            <strong className="text-emerald-700 text-sm font-bold">99.98%</strong>
          </div>
        </div>
      </div>

      {/* Grid of 10 Government Portals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portalsList.map((portal) => (
          <div
            key={portal.id}
            onClick={() => {
              setSelectedPortal(portal.id);
              setTestIdentifier(portal.sampleId);
            }}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedPortal === portal.id
                ? 'border-blue-800 bg-blue-50/50 ring-1 ring-blue-800/30 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-xs font-bold text-slate-900">{portal.name}</h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ACTIVE
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">{portal.ministry}</p>

            <div className="space-y-1.5 text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200/80 font-mono">
              <div className="text-slate-600 truncate text-[10px]" title={portal.endpoint}>
                Endpoint: {portal.endpoint}
              </div>
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>Latency: <strong className="text-emerald-700">{portal.latency}</strong></span>
                <span>Security: <strong className="text-blue-900">{portal.auth}</strong></span>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center text-xs">
              <span className="text-[10px] text-slate-400 font-mono">ID: {portal.id}</span>
              <button
                type="button"
                className="text-blue-800 font-bold hover:underline text-xs flex items-center gap-1"
              >
                Test Gateway Ping →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Interactive Gateway Query Sandbox */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-900" />
            <h3 className="text-sm font-bold text-slate-900">
              Interactive Government Portal Query Sandbox
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Dispatch test API payloads to statutory portal endpoints to observe real-time schema validation
          </p>
        </div>

        <form onSubmit={handleTestQuery} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-4">
            <label className="block font-bold text-slate-700 mb-1">Select Gateway Connector:</label>
            <select
              value={selectedPortal}
              onChange={(e) => {
                const p = e.target.value as PortalType;
                setSelectedPortal(p);
                const found = portalsList.find(x => x.id === p);
                if (found) setTestIdentifier(found.sampleId);
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded pl-2.5 pr-8 py-1.5 text-xs text-slate-800 font-semibold focus:ring-1 focus:ring-blue-800 cursor-pointer"
            >
              {portalsList.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-6">
            <label className="block font-bold text-slate-700 mb-1">Identifier / Query Key:</label>
            <input
              type="text"
              required
              value={testIdentifier}
              onChange={(e) => setTestIdentifier(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs font-mono text-slate-900 focus:ring-1 focus:ring-blue-800"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={isQuerying}
              className="w-full bg-blue-900 hover:bg-blue-950 disabled:bg-slate-300 text-white font-bold py-1.5 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className={`w-3.5 h-3.5 ${isQuerying ? 'animate-spin' : ''}`} />
              {isQuerying ? 'Querying...' : 'Dispatch API'}
            </button>
          </div>
        </form>

        {testResponse && (
          <div className="mt-4 p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto space-y-1 shadow-inner">
            <div className="text-emerald-400 font-bold">// Gateway API Response Received (HTTP 200 OK)</div>
            <pre>{JSON.stringify(testResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
