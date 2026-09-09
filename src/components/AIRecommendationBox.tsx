import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, Info, ShieldCheck, Scale } from 'lucide-react';
import { AIComplianceAnalysis } from '../types/gem';

interface AIRecommendationBoxProps {
  analysis: AIComplianceAnalysis;
  bidderName: string;
  onTriggerReAnalysis?: () => void;
  isAnalyzing?: boolean;
}

export const AIRecommendationBox: React.FC<AIRecommendationBoxProps> = ({
  analysis,
  bidderName,
  onTriggerReAnalysis,
  isAnalyzing
}) => {
  const getRecommendationStyle = () => {
    switch (analysis.recommendation) {
      case 'RECOMMENDED_FOR_TECHNICAL_QUALIFICATION':
        return {
          title: 'RECOMMENDED FOR TECHNICAL QUALIFICATION',
          badgeBg: 'bg-emerald-600 text-white',
          border: 'border-emerald-300',
          bg: 'bg-emerald-50/50',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        };
      case 'PROVISIONAL_PENDING_CLARIFICATION':
        return {
          title: 'PROVISIONAL - PENDING 48-HR CLARIFICATION',
          badgeBg: 'bg-amber-600 text-white',
          border: 'border-amber-300',
          bg: 'bg-amber-50/50',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />
        };
      case 'REJECT_NON_COMPLIANT':
      default:
        return {
          title: 'REJECT - STATUTORILY NON-COMPLIANT',
          badgeBg: 'bg-rose-600 text-white',
          border: 'border-rose-300',
          bg: 'bg-rose-50/50',
          icon: <XCircle className="w-5 h-5 text-rose-600" />
        };
    }
  };

  const style = getRecommendationStyle();

  return (
    <div 
      className={`rounded-lg border-2 p-4.5 shadow-sm transition-all ${style.border} ${style.bg}`} 
      id="ai-recommendation-highlight-box"
    >
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-900 text-amber-300 shadow-xs">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-blue-950 uppercase tracking-wider">
                GeM AI Decision-Support Recommendation
              </span>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                {analysis.evaluatedByModel}
              </span>
            </div>
            <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">
              Evaluation for: {bidderName}
            </h4>
          </div>
        </div>

        {/* Outcome Tag & Re-eval button */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-extrabold px-3 py-1 rounded-md shadow-2xs tracking-wide flex items-center gap-1.5 ${style.badgeBg}`}>
            {style.icon}
            {style.title}
          </span>

          {onTriggerReAnalysis && (
            <button
              type="button"
              onClick={onTriggerReAnalysis}
              disabled={isAnalyzing}
              className="text-xs font-semibold text-blue-800 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1 rounded-md shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin text-blue-800' : 'text-amber-500'}`} />
              {isAnalyzing ? 'Evaluating...' : 'Re-Analyze'}
            </button>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white/90 rounded-md p-3.5 border border-slate-200/90 text-xs text-slate-800 leading-relaxed shadow-2xs">
        <strong className="text-slate-900 font-bold block mb-1">Executive Compliance Reasoning:</strong>
        {analysis.executiveSummary}
      </div>

      {/* Key Strengths & Risk Flags Two-Column Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {/* Strengths */}
        <div className="bg-emerald-50/80 rounded-md p-3 border border-emerald-200/90">
          <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Verified Statutory Strengths:
          </span>
          <ul className="space-y-1.5 text-xs text-emerald-950">
            {analysis.keyStrengths.map((st, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Flags */}
        <div className="bg-rose-50/80 rounded-md p-3 border border-rose-200/90">
          <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Identified Vulnerabilities & Risks:
          </span>
          {analysis.riskFlags.length === 0 ? (
            <p className="text-xs text-emerald-800 italic">No statutory risks or discrepancies identified.</p>
          ) : (
            <ul className="space-y-1.5 text-xs text-rose-950">
              {analysis.riskFlags.map((rf, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{rf}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Statutory Disclaimer Mandate */}
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200/70 text-[11px] text-slate-500">
        <Scale className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          <strong className="text-slate-700">Statutory Notice:</strong> The AI compliance engine functions strictly as an advisory decision-support tool. Final technical qualification or disqualification authority remains vested solely in the competent Procurement Committee under GFR 2017.
        </span>
      </div>
    </div>
  );
};
