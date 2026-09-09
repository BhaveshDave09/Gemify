import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AIComplianceAnalysis } from '../types/gem';

interface ComplianceMeterProps {
  analysis: AIComplianceAnalysis;
  size?: 'sm' | 'md' | 'lg';
}

export const ComplianceMeter: React.FC<ComplianceMeterProps> = ({ analysis, size = 'md' }) => {
  const score = analysis.complianceScore;
  
  // Calculate SVG arc parameters (semi-circle / 220 degree arc)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * (circumference * 0.75);

  const getScoreColor = () => {
    if (score >= 90) return { stroke: '#15803d', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'High Compliance' };
    if (score >= 75) return { stroke: '#b45309', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Moderate Compliance' };
    if (score >= 60) return { stroke: '#c2410c', text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', label: 'Substantial Deficiencies' };
    return { stroke: '#b91c1c', text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', label: 'Statutory Disqualification' };
  };

  const colors = getScoreColor();

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col items-center shadow-xs" id="compliance-meter-card">
      <div className="w-full flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-800" />
          AI Compliance Health Score
        </h3>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          Confidence: {analysis.confidenceRate}%
        </span>
      </div>

      {/* Circular Arc Visual Meter */}
      <div className="relative flex items-center justify-center my-2">
        <svg className="w-44 h-44 transform -rotate-135" viewBox="0 0 160 160">
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
          />
          {/* Animated Value Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={colors.stroke}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2">
          <span className={`text-4xl font-extrabold tracking-tight ${colors.text}`}>
            {score}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            out of 100
          </span>
          <span className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
            {colors.label}
          </span>
        </div>
      </div>

      {/* 4-Pillar Score Breakdown Matrix */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
        <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500">Statutory Mandates</div>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            {analysis.statutoryScore}<span className="text-xs text-slate-400">/25</span>
          </div>
          <div className="text-[10px] text-slate-500">GFR 144 / Debarment</div>
        </div>

        <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500">Financial Capacity</div>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            {analysis.financialScore}<span className="text-xs text-slate-400">/25</span>
          </div>
          <div className="text-[10px] text-slate-500">Turnover & EMD</div>
        </div>

        <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500">Technical Credentials</div>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            {analysis.technicalScore}<span className="text-xs text-slate-400">/25</span>
          </div>
          <div className="text-[10px] text-slate-500">Past GeM Contracts</div>
        </div>

        <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500">Preference Policy</div>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            {analysis.policyScore}<span className="text-xs text-slate-400">/25</span>
          </div>
          <div className="text-[10px] text-slate-500">MII & MSME Act</div>
        </div>
      </div>
    </div>
  );
};
