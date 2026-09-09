import React, { useState } from 'react';
import { 
  Database, 
  Server, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  Code2, 
  ShieldCheck, 
  Scale, 
  Copy, 
  Check 
} from 'lucide-react';
import { POSTGRES_DDL_SCHEMA, K8S_MICROSERVICES_MANIFESTS } from '../data/schemaAndArchitecture';
import { STATIC_GFR_RULES } from '../data/mockData';

export const DatabaseAndRulesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'postgres' | 'k8s'>('rules');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6" id="database-rules-architecture-view">
      
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-lg bg-purple-900 text-white">
              <Database className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Statutory Procurement Rules, PostgreSQL DDL & Cloud Architecture
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                General Financial Rules (GFR) 2017 rule engine, immutable PostgreSQL schema with cryptographic triggers, and production Kubernetes manifests
              </p>
            </div>
          </div>

          {/* Navigation Pill Buttons */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'rules' ? 'bg-white text-purple-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              GFR 2017 Rules ({STATIC_GFR_RULES.length})
            </button>
            <button
              onClick={() => setActiveTab('postgres')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'postgres' ? 'bg-white text-purple-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PostgreSQL DDL & Triggers
            </button>
            <button
              onClick={() => setActiveTab('k8s')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'k8s' ? 'bg-white text-purple-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kubernetes Microservices Spec
            </button>
          </div>
        </div>
      </div>

      {/* 1. GFR 2017 Rules View */}
      {activeTab === 'rules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STATIC_GFR_RULES.map((rule) => (
            <div key={rule.ruleCode} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2.5">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                    {rule.ruleCode}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-1">
                    {rule.title}
                  </h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  rule.severity === 'DISQUALIFYING' 
                    ? 'bg-rose-100 text-rose-800' 
                    : rule.severity === 'MAJOR'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {rule.severity}
                </span>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200/80">
                <strong className="block text-slate-900 mb-0.5">Statutory Provision:</strong>
                {rule.description}
              </div>

              <div className="text-[11px] text-blue-950 bg-blue-50/60 p-2 rounded border border-blue-200">
                <strong className="block text-blue-900">Rule Logic Expression:</strong>
                <code className="text-[10px] font-mono">{rule.logicExpression}</code>
              </div>

              <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
                <span>Authority: <strong>{rule.authority}</strong></span>
                <span>Category: <strong>{rule.category}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. PostgreSQL DDL Schema */}
      {activeTab === 'postgres' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-700" />
                PostgreSQL Enterprise DDL (Users, Tenders, Bidders, Cryptographic Audit Ledger)
              </h3>
              <p className="text-[11px] text-slate-500">
                Enforces blockchain-style append-only constraints and automatic SHA-256 hash generation
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(POSTGRES_DDL_SCHEMA, 'postgres')}
              className="text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedSection === 'postgres' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSection === 'postgres' ? 'Copied DDL' : 'Copy SQL Schema'}
            </button>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs overflow-x-auto max-h-[500px]">
            <pre>{POSTGRES_DDL_SCHEMA}</pre>
          </div>
        </div>
      )}

      {/* 3. Kubernetes Microservices Manifests */}
      {activeTab === 'k8s' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-700" />
                Kubernetes Microservices Architecture & Ingress Manifests
              </h3>
              <p className="text-[11px] text-slate-500">
                Deployment, ClusterIP Services, HPA auto-scaling, and TLS Ingress routing
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(K8S_MICROSERVICES_MANIFESTS, 'k8s')}
              className="text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedSection === 'k8s' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSection === 'k8s' ? 'Copied Manifests' : 'Copy K8s YAML'}
            </button>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs overflow-x-auto max-h-[500px]">
            <pre>{K8S_MICROSERVICES_MANIFESTS}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
