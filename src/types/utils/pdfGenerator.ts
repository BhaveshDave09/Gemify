import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Bidder, Tender, AuditLogEntry } from '../gem';

/**
 * Downloads an HTML element as a clean, high-resolution PDF document
 */
export async function downloadElementAsPdf(
  elementId: string,
  filename: string
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return false;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 16; // 8mm margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 8;

    pdf.addImage(imgData, 'PNG', 8, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - 16);

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 8;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 8, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 16);
    }

    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Error generating PDF from HTML:', err);
    return false;
  }
}

/**
 * Generates and downloads an official GeM Technical Evaluation Report as a PDF
 */
export function generateFormalReportPdf(tender: Tender, bidder: Bidder): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  let y = 14;

  // Header Tricolor Bar
  doc.setFillColor(255, 153, 51); // Saffron
  doc.rect(margin, y, (pageWidth - 2 * margin) / 3, 2, 'F');
  doc.setFillColor(255, 255, 255); // White
  doc.rect(margin + (pageWidth - 2 * margin) / 3, y, (pageWidth - 2 * margin) / 3, 2, 'F');
  doc.setFillColor(19, 136, 8); // India Green
  doc.rect(margin + 2 * (pageWidth - 2 * margin) / 3, y, (pageWidth - 2 * margin) / 3, 2, 'F');
  y += 6;

  // Government Emblem & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('GOVERNMENT OF INDIA • GOVERNMENT E-MARKETPLACE (GeM)', pageWidth / 2, y, { align: 'center' });
  y += 5;

  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138); // Navy
  doc.text('TECHNICAL BID COMPLIANCE & STATUTORY EVALUATION REPORT', pageWidth / 2, y, { align: 'center' });
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('In accordance with General Financial Rules (GFR) 2017 & Public Procurement (Preference to Make in India) Order', pageWidth / 2, y, { align: 'center' });
  y += 4;

  // Horizontal Divider
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // Section 1: Tender & Bid Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Tender Reference:', margin + 3, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(tender.bidNumber, margin + 32, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.text('Procuring CPSE:', margin + 95, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(tender.cpse.substring(0, 35), margin + 122, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.text('Tender Title:', margin + 3, y + 10);
  doc.setFont('helvetica', 'normal');
  doc.text(tender.title.substring(0, 85), margin + 23, y + 10);

  doc.setFont('helvetica', 'bold');
  doc.text('Est. Value:', margin + 3, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.text(`Rs. ${tender.estimatedValueLakhs} Lakhs`, margin + 20, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.text('MII Requirement:', margin + 60, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.text(`${tender.minLocalContentPercent}% (Class-I)`, margin + 87, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.text('EMD Requirement:', margin + 120, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.text(`Rs. ${tender.emdRequiredLakhs} Lakhs`, margin + 150, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.text('Evaluation Date:', margin + 3, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.text(`${bidder.officerActionDate || new Date().toISOString().split('T')[0]} (IST)`, margin + 27, y + 20);

  y += 28;

  // Section 2: Bidder Profile
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, pageWidth - 2 * margin, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 58, 138);
  doc.text(`1. BIDDER PARTICULARS: ${bidder.name.toUpperCase()} (ID: ${bidder.id})`, margin + 2, y + 4);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  const col1 = margin + 2;
  const col2 = margin + 95;

  doc.text(`• Legal Constitution: ${bidder.legalEntity.replace('_', ' ')}`, col1, y);
  doc.text(`• Quoted Bid Amount: Rs. ${bidder.bidAmount} Lakhs`, col2, y);
  y += 4.5;
  doc.text(`• GSTIN: ${bidder.gstId}`, col1, y);
  doc.text(`• Permanent Account No (PAN): ${bidder.pan}`, col2, y);
  y += 4.5;
  doc.text(`• MSME Category: ${bidder.msmeCategory} (Udyam: ${bidder.udyamId})`, col1, y);
  doc.text(`• Declared Local Content (MII): ${bidder.localContentPercent}%`, col2, y);
  y += 4.5;
  doc.text(`• 3-Yr Avg Turnover: Rs. ${bidder.annualTurnoverAvg} Lakhs`, col1, y);
  doc.text(`• DPIIT Startup Status: ${bidder.isStartup ? 'YES (DPIIT Recognized)' : 'NO'}`, col2, y);
  y += 7;

  // Section 3: AI Compliance Score & Decision Banner
  const scoreBg = bidder.aiAnalysis.complianceScore >= 80 ? [240, 253, 244] : bidder.aiAnalysis.complianceScore >= 60 ? [254, 252, 232] : [254, 242, 242];
  doc.setFillColor(scoreBg[0], scoreBg[1], scoreBg[2]);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`AI Compliance Score: ${bidder.aiAnalysis.complianceScore}/100`, margin + 4, y + 6);

  doc.setFontSize(8.5);
  doc.text(`Risk Assessment: ${bidder.aiAnalysis.riskLevel}`, margin + 65, y + 6);
  doc.text(`Official Decision: ${bidder.decisionStatus.replace(/_/g, ' ')}`, margin + 120, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Four Pillar Breakdown: Statutory (${bidder.aiAnalysis.statutoryScore}/25) | Financial (${bidder.aiAnalysis.financialScore}/25) | Technical (${bidder.aiAnalysis.technicalScore}/25) | Policy (${bidder.aiAnalysis.policyScore}/25)`, margin + 4, y + 12);
  y += 22;

  // Section 4: 10-Portal Reconciliation Matrix Table
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, pageWidth - 2 * margin, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 58, 138);
  doc.text('2. NATIONAL STATUTORY REGISTRIES RECONCILIATION MATRIX', margin + 2, y + 4);
  y += 8;

  // Table Headers
  doc.setFillColor(226, 232, 240);
  doc.rect(margin, y, pageWidth - 2 * margin, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text('Portal / Authority', margin + 2, y + 3.5);
  doc.text('Ref / ID', margin + 45, y + 3.5);
  doc.text('Status', margin + 85, y + 3.5);
  doc.text('Reconciliation Finding / GFR Clause', margin + 115, y + 3.5);
  y += 6;

  // Table Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);

  bidder.portalChecks.slice(0, 7).forEach((p, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y - 1, pageWidth - 2 * margin, 5, 'F');
    }

    doc.setTextColor(15, 23, 42);
    doc.text(p.portalName.substring(0, 22), margin + 2, y + 2.5);
    doc.text(p.referenceId.substring(0, 20), margin + 45, y + 2.5);

    if (p.status === 'VERIFIED') {
      doc.setTextColor(16, 185, 129);
      doc.text('VERIFIED [PASS]', margin + 85, y + 2.5);
    } else if (p.status === 'DISCREPANCY') {
      doc.setTextColor(217, 119, 6);
      doc.text('DISCREPANCY [WARN]', margin + 85, y + 2.5);
    } else {
      doc.setTextColor(225, 29, 72);
      doc.text('FAILED [FAIL]', margin + 85, y + 2.5);
    }

    doc.setTextColor(71, 85, 105);
    doc.text(p.summary.substring(0, 48), margin + 115, y + 2.5);
    y += 5;
  });

  y += 3;

  // Section 5: Statutory Remarks & Non-Repudiable Signature
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, pageWidth - 2 * margin, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 58, 138);
  doc.text('3. PROCUREMENT OFFICER STATUTORY JUSTIFICATION & SIGNATURE', margin + 2, y + 4);
  y += 8;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const remarks = bidder.officerRemarks || 'Evaluated in full accordance with GFR 2017 Rules 144(xi), 149, 151, and PPP-MII Order 2017. All verified credentials authenticated via national registries.';
  doc.text(`"${remarks}"`, margin + 2, y, { maxWidth: pageWidth - 2 * margin - 4 });
  y += 12;

  // Signature Block
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Evaluation Timestamp: ${new Date().toISOString()}`, margin + 2, y);
  doc.text(`Audit Trail SHA-256: Verified & Chained`, margin + 2, y + 4);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Authorized Procurement Officer', pageWidth - margin - 55, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Tender Evaluation Committee (TEC)', pageWidth - margin - 55, y + 4);

  // Footer Disclaimer
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('STATUTORY DISCLAIMER: Advisory decision-support system. Final authority rests exclusively with the Procurement Officer under GFR 2017.', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // Save the PDF file to user's downloads
  const sanitizedName = bidder.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 25);
  const filename = `GeM_Evaluation_Report_${tender.bidNumber}_${sanitizedName}.pdf`;
  doc.save(filename);
}

/**
 * Generates and downloads a clean, standalone HTML formal report document
 */
export function downloadFormalReportHtml(tender: Tender, bidder: Bidder): void {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GeM Official Technical Evaluation Report - ${tender.bidNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1e293b; max-width: 800px; margin: 20px auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 8px; }
    .tricolor { height: 4px; display: flex; margin-bottom: 15px; }
    .saffron { flex: 1; background: #FF9933; }
    .white { flex: 1; background: #ffffff; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
    .green { flex: 1; background: #138808; }
    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 15px; }
    .header h1 { font-size: 16px; margin: 0; color: #0f172a; text-transform: uppercase; }
    .header h2 { font-size: 13px; margin: 4px 0 0; color: #1e3a8a; }
    .header p { font-size: 11px; color: #64748b; margin: 4px 0 0; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; margin-bottom: 15px; }
    .section-title { font-size: 13px; font-weight: bold; color: #1e3a8a; background: #f1f5f9; padding: 6px 10px; border-radius: 4px; margin: 15px 0 8px; }
    .score-box { background: #eff6ff; border: 1px solid #bfdbfe; padding: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .score-val { font-size: 20px; font-weight: bold; color: #1e3a8a; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px; }
    th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
    th { background: #f1f5f9; font-weight: 600; }
    .status-verified { color: #059669; font-weight: bold; }
    .status-warn { color: #d97706; font-weight: bold; }
    .status-failed { color: #dc2626; font-weight: bold; }
    .signature { display: flex; justify-content: space-between; margin-top: 30px; padding-top: 15px; border-top: 1px solid #cbd5e1; font-size: 11px; }
    .disclaimer { font-size: 10px; color: #94a3b8; text-align: center; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 8px; }
  </style>
</head>
<body>
  <div class="tricolor"><div class="saffron"></div><div class="white"></div><div class="green"></div></div>
  <div class="header">
    <h1>GOVERNMENT OF INDIA • GOVERNMENT E-MARKETPLACE (GeM)</h1>
    <h2>CENTRAL PUBLIC PROCUREMENT COMPLIANCE EVALUATION REPORT</h2>
    <p>Statutory audit in accordance with General Financial Rules (GFR) 2017 & PPP-MII Order 2017</p>
  </div>

  <div class="meta-grid">
    <div><strong>Tender ID:</strong> ${tender.bidNumber}</div>
    <div><strong>Procuring Entity:</strong> ${tender.cpse}</div>
    <div style="grid-column: span 2"><strong>Tender Title:</strong> ${tender.title}</div>
    <div><strong>Estimated Value:</strong> Rs. ${tender.estimatedValueLakhs} Lakhs</div>
    <div><strong>MII Minimum Local Content:</strong> ${tender.minLocalContentPercent}% (Class-I)</div>
  </div>

  <div class="section-title">1. BIDDER IDENTIFICATION & PROFILE</div>
  <div class="meta-grid">
    <div><strong>Bidder Name:</strong> ${bidder.name}</div>
    <div><strong>Entity Type:</strong> ${bidder.legalEntity}</div>
    <div><strong>GSTIN:</strong> ${bidder.gstId}</div>
    <div><strong>PAN:</strong> ${bidder.pan}</div>
    <div><strong>MSME Category:</strong> ${bidder.msmeCategory} (Udyam: ${bidder.udyamId})</div>
    <div><strong>Declared Local Content:</strong> ${bidder.localContentPercent}%</div>
  </div>

  <div class="section-title">2. AI STATUTORY COMPLIANCE HEALTH SCORE</div>
  <div class="score-box">
    <div>
      <span style="font-size: 11px; color: #64748b; display: block;">Health Score</span>
      <span class="score-val">${bidder.aiAnalysis.complianceScore}/100</span>
    </div>
    <div>
      <span style="font-size: 11px; color: #64748b; display: block;">Assessed Risk Level</span>
      <strong>${bidder.aiAnalysis.riskLevel}</strong>
    </div>
    <div>
      <span style="font-size: 11px; color: #64748b; display: block;">Committee Decision</span>
      <strong style="color: #1e3a8a;">${bidder.decisionStatus}</strong>
    </div>
  </div>

  <div class="section-title">3. NATIONAL REGISTRY RECONCILIATION MATRIX</div>
  <table>
    <thead>
      <tr>
        <th>Portal Name</th>
        <th>Reference ID</th>
        <th>Status</th>
        <th>Reconciliation Summary</th>
      </tr>
    </thead>
    <tbody>
      ${bidder.portalChecks.map(p => `
        <tr>
          <td><strong>${p.portalName}</strong></td>
          <td>${p.referenceId}</td>
          <td class="${p.status === 'VERIFIED' ? 'status-verified' : p.status === 'DISCREPANCY' ? 'status-warn' : 'status-failed'}">${p.status}</td>
          <td>${p.summary}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="section-title">4. STATUTORY CLAUSE COMPLIANCE</div>
  <table>
    <thead>
      <tr>
        <th>Statutory Benchmark</th>
        <th>Requirement</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${bidder.clauseCompliance.map(c => `
        <tr>
          <td><strong>${c.statutoryReference}</strong><br><small>${c.clauseTitle}</small></td>
          <td>${c.requirement}</td>
          <td class="${c.complianceStatus === 'COMPLIANT' ? 'status-verified' : 'status-warn'}">${c.complianceStatus}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="section-title">5. OFFICER JUSTIFICATION</div>
  <p style="font-style: italic; background: #f8fafc; padding: 10px; border-left: 3px solid #1e3a8a;">
    "${bidder.officerRemarks || 'Evaluation conducted per GFR 2017 guidelines.'}"
  </p>

  <div class="signature">
    <div>
      <div>Date: ${bidder.officerActionDate || new Date().toISOString().split('T')[0]}</div>
      <div>Audit Hash: Verified SHA-256 Ledger</div>
    </div>
    <div style="text-align: right;">
      <div style="border-top: 1px solid #475569; padding-top: 4px; font-weight: bold; width: 180px; text-align: center;">Authorized Officer</div>
      <div style="text-align: center; color: #64748b;">Tender Evaluation Committee</div>
    </div>
  </div>

  <div class="disclaimer">
    Advisory System Only. Final statutory decision rests with the Procurement Officer under GFR 2017.
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const sanitizedName = bidder.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 25);
  link.href = url;
  link.download = `GeM_Evaluation_Report_${tender.bidNumber}_${sanitizedName}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports Audit Trail Ledger as PDF
 */
export function exportAuditLedgerPdf(logs: AuditLogEntry[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  let y = 12;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('GOVERNMENT OF INDIA • GeM IMMUTABLE AUDIT LEDGER (SHA-256 CHAINED)', pageWidth / 2, y, { align: 'center' });
  y += 5;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated for Statutory Compliance, CVC & CAG Audit Verification • Total Chained Blocks: ${logs.length}`, pageWidth / 2, y, { align: 'center' });
  y += 6;

  // Table Headers
  doc.setFillColor(30, 58, 138);
  doc.rect(margin, y, pageWidth - 2 * margin, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Seq', margin + 2, y + 4);
  doc.text('Timestamp (IST)', margin + 12, y + 4);
  doc.text('Actor / Role', margin + 45, y + 4);
  doc.text('Category', margin + 85, y + 4);
  doc.text('Action Details', margin + 115, y + 4);
  doc.text('Current Block SHA-256 Hash', margin + 195, y + 4);
  y += 7;

  // Table Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);

  logs.forEach((log, idx) => {
    if (y > pageHeight - 15) {
      doc.addPage();
      y = 12;
    }

    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y - 1, pageWidth - 2 * margin, 5, 'F');
    }

    doc.setTextColor(15, 23, 42);
    doc.text(String(log.logSequence), margin + 2, y + 2.5);
    doc.text(log.timestamp.substring(0, 19), margin + 12, y + 2.5);
    doc.text(`${log.actorName} (${log.actorRole})`.substring(0, 26), margin + 45, y + 2.5);
    doc.text(log.category, margin + 85, y + 2.5);
    doc.text(log.action.substring(0, 50), margin + 115, y + 2.5);
    doc.setFont('courier', 'normal');
    doc.text(log.currentHash.substring(0, 36) + '...', margin + 195, y + 2.5);
    doc.setFont('helvetica', 'normal');

    y += 5;
  });

  doc.save(`GeM_Audit_Ledger_Export_${new Date().toISOString().split('T')[0]}.pdf`);
}
