import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck,
  UserCheck,
  Lock,
  Scale
} from 'lucide-react';
import { UserRole } from '../types/gem';
import { ROLE_PROFILES } from './RoleAuthModal';

interface AICopilotModalProps {
  onClose: () => void;
  context?: Record<string, any>;
  currentRole?: UserRole;
}

const ROLE_QUESTIONS: Record<UserRole, string[]> = {
  PROCUREMENT_OFFICER: [
    "What are the mandatory rules for Land Border sharing under GFR 144(xi)?",
    "Draft a 48-hour clarification notice for GSTN vs CA turnover variance",
    "How is Class-I Local Supplier status evaluated under PPP-MII 2017?",
    "What is the CPPP debarment check protocol under GFR Rule 151?"
  ],
  BIDDER: [
    "How do I calculate Class-I Local Content % (≥50%) for my bid under PPP-MII 2017?",
    "How to claim 100% EMD exemption as a registered MSME under Rule 170(i)?",
    "What Startup relaxations apply under GFR Rule 173(i) for prior turnover?",
    "How to rectify GSTN vs CA turnover discrepancy before submitting?"
  ],
  AUDITOR: [
    "Explain how the SHA-256 genesis hash chain guarantees non-repudiation",
    "What are the Section 65B Indian Evidence Act certification requirements?",
    "How to verify chronological sequencing in tender qualification decisions?",
    "How do I export the forensic audit ledger for CAG/CVC vigilance review?"
  ],
  ADMIN: [
    "What are the latency and error thresholds for the 10 government API gateways?",
    "How do PostgreSQL immutable triggers prevent audit record tampering?",
    "How does the Kubernetes circuit breaker handle GSTN / MCA21 API downtime?",
    "What is the statutory rules engine cache policy for DPIIT MII updates?"
  ]
};

export const AICopilotModal: React.FC<AICopilotModalProps> = ({ 
  onClose, 
  context, 
  currentRole = 'PROCUREMENT_OFFICER' 
}) => {
  const profile = ROLE_PROFILES[currentRole];
  const predefinedQuestions = ROLE_QUESTIONS[currentRole] || ROLE_QUESTIONS.PROCUREMENT_OFFICER;

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; timestamp: string }>>([
    {
      sender: 'assistant',
      text: `Namaste! I am your **GeM AI Compliance Copilot**, operating under statutory RBAC for **${profile.title}**.

### **Authorized Statutory Advisory Scope:**
${profile.authorizedModules.map(m => `- **${m}**`).join('\n')}

**Statutory Basis:** ${profile.statutoryAuthority}

I will provide direct, natural, and clause-grounded statutory guidance tailored exclusively to your active role. How may I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSend, 
          context: { 
            ...context, 
            userRole: profile.title,
            roleKey: currentRole,
            statutoryAuthority: profile.statutoryAuthority
          } 
        })
      });

      const data = await response.json();
      const botMsg = {
        sender: 'assistant' as const,
        text: data.reply || "Under GFR 2017 and GeM guidelines, compliance must be verified against statutory databases before commercial award.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant' as const,
          text: `Under GFR 2017 and ${profile.statutoryAuthority}, all statutory procedures, portal cross-checks, and audit trail validations must adhere strictly to official procurement regulations.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl max-w-2xl w-[95vw] sm:w-full border border-slate-200 shadow-2xl flex flex-col h-[85vh] max-h-[640px] animate-in fade-in zoom-in-95 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-blue-800 flex items-center justify-between bg-gradient-to-r from-blue-900 via-blue-950 to-indigo-950 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/10 text-amber-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">GeM AI Compliance Copilot</h3>
                <span className="text-[10px] bg-amber-400 text-blue-950 font-extrabold px-1.5 py-0.2 rounded flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  {currentRole.replace('_', ' ')}
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                {profile.category} • Statutory GFR 2017 Engine
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white text-lg font-bold p-1 cursor-pointer"
            aria-label="Close Copilot"
          >
            ✕
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex gap-2.5 max-w-[90%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  m.sender === 'user' ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-900 border border-blue-200'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-blue-800" />}
              </div>

              <div 
                className={`p-3.5 rounded-xl text-xs leading-relaxed shadow-2xs ${
                  m.sender === 'user' 
                    ? 'bg-blue-900 text-white rounded-tr-xs' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                <div className={`text-[9px] mt-1.5 ${m.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 max-w-[88%] mr-auto">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-900">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 bg-white rounded-xl text-xs border border-slate-200 text-slate-500 italic">
                Analyzing statutory clauses under {profile.statutoryAuthority}...
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar Tailored to Active Role */}
        <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex gap-2 text-[11px] shrink-0">
          <span className="text-slate-500 font-semibold self-center whitespace-nowrap">Suggested:</span>
          {predefinedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-300 rounded-full px-2.5 py-1 whitespace-nowrap text-[11px] font-medium transition-colors shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
          className="p-3 bg-white border-t border-slate-200 flex gap-2 rounded-b-xl shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask as ${profile.title.split(' ')[0]} (e.g., GFR rules, local content, audit validation)...`}
            className="flex-1 bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-blue-900 hover:bg-blue-950 disabled:bg-slate-300 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
