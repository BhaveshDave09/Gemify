import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldCheck, 
  Download, 
  Eye, 
  Hash, 
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { BidDocument } from '../types/gem';

interface DocumentVerificationListProps {
  documents: BidDocument[];
}

export const DocumentVerificationList: React.FC<DocumentVerificationListProps> = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState<BidDocument | null>(null);

  const getCategoryLabel = (category: BidDocument['category']) => {
    switch (category) {
      case 'GST_CERT': return 'GST Registration Certificate';
      case 'UDYAM_CERT': return 'Udyam / MSME Certificate';
      case 'CA_TURNOVER': return 'CA Certified Turnover Statement';
      case 'MII_UNDERTAKING': return 'Make in India Local Content Declaration';
      case 'PAST_EXPERIENCE': return 'Past GeM / CPSE Supply Order';
      case 'EMD_EXEMPTION': return 'EMD Statutory Exemption Affidavit';
      case 'OEM_AUTH': return 'OEM Manufacturer Authorization';
      case 'ITR_RETURNS': return 'Income Tax Returns (3 FYs)';
      default: return category;
    }
  };

  const getStatusIcon = (status: BidDocument['status']) => {
    switch (status) {
      case 'VERIFIED':
        return <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-xs font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Verified ✅</span>;
      case 'DISCREPANCY':
        return <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded text-xs font-bold"><AlertTriangle className="w-3.5 h-3.5" /> Discrepancy ⚠️</span>;
      case 'FAILED':
        return <span className="inline-flex items-center gap-1 text-rose-800 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded text-xs font-bold"><XCircle className="w-3.5 h-3.5" /> Failed ❌</span>;
      case 'PENDING':
      default:
        return <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-xs font-bold"><Clock className="w-3.5 h-3.5" /> Pending ⏳</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs" id="document-verification-section">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-800" />
            Uploaded Bid Documents & Verifiable Credentials
          </h3>
          <p className="text-xs text-slate-500">
            DigiLocker cryptographically signed PDF artifacts and AI OCR extracted parameters
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
          {documents.length} Submitted Artifacts
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {documents.map((doc) => (
          <div key={doc.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 px-2 rounded-md transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                  <span className="text-[10px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {getCategoryLabel(doc.category)}
                  </span>
                  {doc.digiLockerVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      <ShieldCheck className="w-3 h-3 text-sky-700" />
                      DigiLocker Verified
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span>File: <code className="text-slate-700 font-mono">{doc.fileName}</code> ({doc.fileSize})</span>
                  <span>•</span>
                  <span>Uploaded: {doc.uploadedAt}</span>
                </div>

                {doc.verificationNote && (
                  <p className="text-xs text-slate-600 mt-1.5 bg-slate-50 p-1.5 rounded border border-slate-200/80">
                    💡 <strong className="text-slate-700">Verification Result:</strong> {doc.verificationNote}
                  </p>
                )}

                {/* Extracted metadata chips */}
                {doc.extractedDetails && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {Object.entries(doc.extractedDetails).map(([key, val]) => (
                      <span key={key} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200">
                        <strong>{key}:</strong> {String(val)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Status and Inspect Action */}
            <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 self-stretch sm:self-auto">
              <div>{getStatusIcon(doc.status)}</div>
              <button
                type="button"
                onClick={() => setSelectedDoc(doc)}
                className="text-xs font-semibold text-blue-800 hover:text-blue-950 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                Inspect Artifact
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-2xl p-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-blue-50 text-blue-800">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedDoc.title}</h4>
                  <p className="text-xs text-slate-500">{selectedDoc.fileName}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">Document Category:</span>
                <span className="font-semibold text-slate-800">{getCategoryLabel(selectedDoc.category)}</span>
              </div>

              <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">Verification Status:</span>
                <span>{getStatusIcon(selectedDoc.status)}</span>
              </div>

              {selectedDoc.digiLockerHash && (
                <div className="p-2.5 bg-sky-50 rounded border border-sky-200">
                  <div className="flex items-center gap-1.5 text-sky-900 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4 text-sky-700" />
                    DigiLocker Cryptographic SHA-256 Hash
                  </div>
                  <code className="text-[10px] font-mono break-all text-sky-800 bg-white p-1.5 rounded block border border-sky-200">
                    {selectedDoc.digiLockerHash}
                  </code>
                </div>
              )}

              {selectedDoc.extractedDetails && (
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-2">AI OCR Extracted Key Fields:</span>
                  <div className="space-y-1">
                    {Object.entries(selectedDoc.extractedDetails).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[11px]">
                        <span className="text-slate-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-semibold text-slate-800">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
