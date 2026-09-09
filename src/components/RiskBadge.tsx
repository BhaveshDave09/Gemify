import React from 'react';
import { ShieldCheck, AlertTriangle, XCircle, Clock, CheckCircle } from 'lucide-react';
import { RiskLevel, DecisionStatus } from '../types/gem';

interface RiskBadgeProps {
  riskLevel: RiskLevel;
  size?: 'sm' | 'md';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ riskLevel, size = 'md' }) => {
  switch (riskLevel) {
    case 'LOW':
      return (
        <span className={`inline-flex items-center gap-1.5 font-bold rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200 ${size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          LOW RISK (Statutorily Compliant)
        </span>
      );
    case 'MODERATE':
      return (
        <span className={`inline-flex items-center gap-1.5 font-bold rounded-full border bg-amber-50 text-amber-800 border-amber-300 ${size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}>
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          MODERATE RISK (Clarification Required)
        </span>
      );
    case 'HIGH':
      return (
        <span className={`inline-flex items-center gap-1.5 font-bold rounded-full border bg-orange-50 text-orange-800 border-orange-300 ${size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}>
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
          HIGH RISK (Critical Defects)
        </span>
      );
    case 'DISQUALIFIED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-bold rounded-full border bg-rose-50 text-rose-800 border-rose-300 ${size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}>
          <span className="w-2 h-2 rounded-full bg-rose-600" />
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          DISQUALIFIED (Non-Compliant)
        </span>
      );
  }
};

export const DecisionStatusBadge: React.FC<{ status: DecisionStatus }> = ({ status }) => {
  switch (status) {
    case 'QUALIFIED_FOR_COMMERCIAL':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2.5 py-1 rounded-md">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
          Qualified for Commercial Opening
        </span>
      );
    case 'CLARIFICATION_SOUGHT':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100/80 border border-amber-300 px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          48-Hr Clarification Notice Issued
        </span>
      );
    case 'DISQUALIFIED':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-900 bg-rose-100/80 border border-rose-300 px-2.5 py-1 rounded-md">
          <XCircle className="w-3.5 h-3.5 text-rose-700" />
          Technically Disqualified
        </span>
      );
    case 'UNDER_EVALUATION':
    default:
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 bg-blue-100/80 border border-blue-300 px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-blue-700" />
          Under Technical Evaluation
        </span>
      );
  }
};
