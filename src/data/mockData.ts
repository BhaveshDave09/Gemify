import { Tender, Bidder, StaticComplianceRule, PortalIntegrationStatus, AuditLogEntry, GazettedHoliday, TECMember } from '../types/gem';

export const CENTRAL_GOVT_GAZETTED_HOLIDAYS_2026: GazettedHoliday[] = [
  { date: '2026-01-26', day: 'Monday', name: 'Republic Day', type: 'GAZETTED' },
  { date: '2026-03-04', day: 'Wednesday', name: 'Holi', type: 'GAZETTED' },
  { date: '2026-03-21', day: 'Saturday', name: 'Id-ul-Fitr', type: 'GAZETTED' },
  { date: '2026-04-03', day: 'Friday', name: 'Good Friday', type: 'GAZETTED' },
  { date: '2026-04-14', day: 'Tuesday', name: 'Dr. B.R. Ambedkar Jayanti', type: 'GAZETTED' },
  { date: '2026-04-21', day: 'Tuesday', name: 'Mahavir Jayanti', type: 'GAZETTED' },
  { date: '2026-05-01', day: 'Friday', name: 'Buddha Purnima', type: 'GAZETTED' },
  { date: '2026-05-28', day: 'Thursday', name: 'Id-ul-Zuha (Bakrid)', type: 'GAZETTED' },
  { date: '2026-06-26', day: 'Friday', name: 'Muharram', type: 'GAZETTED' },
  { date: '2026-08-15', day: 'Saturday', name: 'Independence Day', type: 'GAZETTED' },
  { date: '2026-08-27', day: 'Thursday', name: 'Milad-un-Nabi (Id-e-Milad)', type: 'GAZETTED' },
  { date: '2026-09-04', day: 'Friday', name: 'Janmashtami (Vaishnava)', type: 'GAZETTED' },
  { date: '2026-10-02', day: 'Friday', name: 'Mahatma Gandhi\'s Birthday', type: 'GAZETTED' },
  { date: '2026-10-20', day: 'Tuesday', name: 'Dussehra (Vijay Dashami)', type: 'GAZETTED' },
  { date: '2026-11-08', day: 'Sunday', name: 'Diwali (Deepavali)', type: 'GAZETTED' },
  { date: '2026-11-24', day: 'Tuesday', name: 'Guru Nanak\'s Birthday', type: 'GAZETTED' },
  { date: '2026-12-25', day: 'Friday', name: 'Christmas Day', type: 'GAZETTED' },
];

export const INITIAL_TEC_MEMBERS: TECMember[] = [
  {
    name: 'Dr. Anand V. Krishnan',
    designation: 'Executive Director (Procurement & Contracts)',
    department: 'SECI / Ministry of New and Renewable Energy',
    role: 'CHAIRMAN',
    digitalSignatureId: 'DSC-GOV-SECI-CHAIR-001',
    signedAt: '2026-08-30 17:30 IST'
  },
  {
    name: 'Shri R. K. Sharma',
    designation: 'Senior Deputy General Manager (Technical)',
    department: 'Solar Engineering & Grid Operations',
    role: 'MEMBER_TECHNICAL',
    digitalSignatureId: 'DSC-IND-GOV-2026-981744A',
    signedAt: '2026-08-30 17:15 IST'
  },
  {
    name: 'Smt. Meenakshi Sundaram',
    designation: 'General Manager (Finance & Accounts)',
    department: 'Finance Division, SECI',
    role: 'MEMBER_FINANCE',
    digitalSignatureId: 'DSC-GOV-FIN-GM-44910',
    signedAt: '2026-08-30 17:20 IST'
  },
  {
    name: 'Shri Vikramaditya Sen',
    designation: 'Manager (Legal & Contracts)',
    department: 'Statutory Compliance Cell',
    role: 'MEMBER_CONVENER',
    digitalSignatureId: 'DSC-GOV-LEG-CONV-882',
    signedAt: '2026-08-30 17:05 IST'
  }
];

export const INITIAL_TENDERS: Tender[] = [
  {
    id: 'TND-2026-8921',
    bidNumber: 'GEM/2026/B/4491028',
    title: 'Supply, Installation & Commissioning of Heavy-Duty Solar Inverter Units (500kW)',
    ministry: 'Ministry of New and Renewable Energy',
    department: 'Solar Energy Corporation of India (SECI)',
    cpse: 'SECI Limited (A Govt. of India Enterprise)',
    estimatedValueLakhs: 480.0,
    publishedDate: '2026-08-10',
    closingDate: '2026-09-15',
    emdRequiredLakhs: 9.6,
    emdExemptionForMSME: true,
    emdExemptionForStartups: true,
    minAverageTurnoverLakhs: 150.0,
    minPastExperienceYears: 3,
    minLocalContentPercent: 50, // Public Procurement (Preference to Make in India) Order 2017
    status: 'TECHNICAL_EVALUATION',
    totalBidsReceived: 5,
    verifiedBidsCount: 4,
    flaggedBidsCount: 1,
  },
  {
    id: 'TND-2026-9044',
    bidNumber: 'GEM/2026/B/4510091',
    title: 'Enterprise Server Infrastructure & AI-Edge Computing Hardware for Data Centers',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    department: 'National Informatics Centre (NIC)',
    cpse: 'NICSI (National Informatics Centre Services Inc.)',
    estimatedValueLakhs: 1250.0,
    publishedDate: '2026-08-15',
    closingDate: '2026-09-20',
    emdRequiredLakhs: 25.0,
    emdExemptionForMSME: true,
    emdExemptionForStartups: true,
    minAverageTurnoverLakhs: 400.0,
    minPastExperienceYears: 5,
    minLocalContentPercent: 60,
    status: 'TECHNICAL_EVALUATION',
    totalBidsReceived: 3,
    verifiedBidsCount: 2,
    flaggedBidsCount: 1,
  },
  {
    id: 'TND-2026-7782',
    bidNumber: 'GEM/2026/B/4389100',
    title: 'High-Precision CNC Milling Machinery for Defence Production Facilities',
    ministry: 'Ministry of Defence',
    department: 'Department of Defence Production',
    cpse: 'Munitions India Limited (MIL)',
    estimatedValueLakhs: 750.0,
    publishedDate: '2026-08-01',
    closingDate: '2026-09-05',
    emdRequiredLakhs: 15.0,
    emdExemptionForMSME: true,
    emdExemptionForStartups: false,
    minAverageTurnoverLakhs: 250.0,
    minPastExperienceYears: 4,
    minLocalContentPercent: 50,
    status: 'EVALUATION_ACTIVE',
    totalBidsReceived: 2,
    verifiedBidsCount: 1,
    flaggedBidsCount: 1,
  }
];

export const INITIAL_BIDDERS: Bidder[] = [
  {
    id: 'BID-IND-01',
    tenderId: 'TND-2026-8921',
    name: 'Bharat Electro-Solar Dynamics Pvt Ltd',
    legalEntity: 'PRIVATE_LIMITED',
    udyamId: 'UDYAM-MH-12-0094812',
    msmeCategory: 'SMALL',
    gstId: '27AABCB9123M1ZU',
    pan: 'AABCB9123M',
    cin: 'U31909MH2018PTC309811',
    isStartup: false,
    isMakeInIndiaClass1: true,
    localContentPercent: 68.5,
    submittedAt: '2026-08-28 14:32 IST',
    bidAmount: 432.5,
    annualTurnoverAvg: 285.0,
    pastExperienceYears: 6,
    decisionStatus: 'QUALIFIED_FOR_COMMERCIAL',
    officerRemarks: 'All statutory portals fully reconciled. Udyam and GST turnover matched with CA certificate. Class-I Local Content certificate certified by Cost Accountant.',
    officerActionDate: '2026-08-30',
    portalChecks: [
      {
        portal: 'UDYAM_MSME',
        portalName: 'Udyam Registration Portal',
        department: 'Ministry of Micro, Small and Medium Enterprises',
        status: 'VERIFIED',
        confidenceScore: 99.4,
        lastCheckedAt: '2026-08-28 14:35 IST',
        referenceId: 'MSME-API-99214',
        summary: 'Active Small Enterprise registration verified. NIC Code 27101 (Electric Motors/Generators/Inverters).',
        matchedFields: [
          { field: 'Firm Name', submittedValue: 'Bharat Electro-Solar Dynamics Pvt Ltd', portalValue: 'BHARAT ELECTRO-SOLAR DYNAMICS PRIVATE LIMITED', match: true },
          { field: 'MSME Category', submittedValue: 'SMALL', portalValue: 'SMALL', match: true },
          { field: 'Registration Status', submittedValue: 'ACTIVE', portalValue: 'ACTIVE (Valid)', match: true },
          { field: 'Manufacturing Unit Pin', submittedValue: '400710', portalValue: '400710 (Navi Mumbai)', match: true },
        ],
        flags: [],
      },
      {
        portal: 'GSTN',
        portalName: 'Goods & Services Tax Network (GSTN)',
        department: 'Department of Revenue / GST Council',
        status: 'VERIFIED',
        confidenceScore: 98.8,
        lastCheckedAt: '2026-08-28 14:35 IST',
        referenceId: 'GSTN-API-55209',
        summary: 'GSTIN active with regular GSTR-3B and GSTR-1 filings over the last 24 consecutive months. Zero tax defaults.',
        matchedFields: [
          { field: 'GSTIN Status', submittedValue: 'ACTIVE', portalValue: 'ACTIVE (Regular)', match: true },
          { field: 'Annual Taxable Turnover', submittedValue: '₹285.0 Lakhs', portalValue: '₹289.4 Lakhs', match: true },
          { field: 'Return Filing Compliance', submittedValue: '100% Up to July 2026', portalValue: '100% (No Late Fee Pending)', match: true },
        ],
        flags: [],
      },
      {
        portal: 'PAN_INCOME_TAX',
        portalName: 'Income Tax Department (ITD)',
        department: 'CBDT, Ministry of Finance',
        status: 'VERIFIED',
        confidenceScore: 100,
        lastCheckedAt: '2026-08-28 14:36 IST',
        referenceId: 'ITD-PAN-10928',
        summary: 'PAN Active & linked with Aadhaar/Directors. ITR-6 filed for FY 2023-24, FY 2024-25, FY 2025-26.',
        matchedFields: [
          { field: 'PAN Status', submittedValue: 'AABCB9123M (Active)', portalValue: 'OPERATIVE & LINKED', match: true },
          { field: 'ITR-V Verification', submittedValue: '3 Years Filed', portalValue: '3 Years Filed & Processed', match: true },
        ],
        flags: [],
      },
      {
        portal: 'MCA21',
        portalName: 'MCA21 Company Master Registry',
        department: 'Ministry of Corporate Affairs',
        status: 'VERIFIED',
        confidenceScore: 99.1,
        lastCheckedAt: '2026-08-28 14:36 IST',
        referenceId: 'MCA-V3-88741',
        summary: 'Active Private Limited Company in good standing. Authorized capital ₹1.00 Cr, Paid-up ₹60 Lakhs. Active DINs on board.',
        matchedFields: [
          { field: 'Company Status', submittedValue: 'Active', portalValue: 'ACTIVE', match: true },
          { field: 'Annual Return (MGT-7)', submittedValue: 'Filed for 2025', portalValue: 'FILED', match: true },
        ],
        flags: [],
      },
      {
        portal: 'DIGILOCKER',
        portalName: 'DigiLocker National Verifiable Credential',
        department: 'National e-Governance Division (NeGD)',
        status: 'VERIFIED',
        confidenceScore: 100,
        lastCheckedAt: '2026-08-28 14:36 IST',
        referenceId: 'DL-SHA256-4401',
        summary: 'DSC Class-3 digital signature verified from Certifying Authority (eMudhra). Document hashes match repository original.',
        matchedFields: [
          { field: 'Digital Signature (DSC)', submittedValue: 'Class 3 Signing & Encryption', portalValue: 'VALID & UNREVOKED', match: true },
        ],
        flags: [],
      },
      {
        portal: 'BIS_DPIIT',
        portalName: 'BIS & Make in India Local Content Registry',
        department: 'DPIIT, Ministry of Commerce & Industry',
        status: 'VERIFIED',
        confidenceScore: 96.0,
        lastCheckedAt: '2026-08-28 14:37 IST',
        referenceId: 'DPIIT-MII-8201',
        summary: 'Class-I Local Supplier status confirmed (68.5% domestic value addition). Solar Inverter Type-Test certified under IS 16221.',
        matchedFields: [
          { field: 'Local Content %', submittedValue: '68.5%', portalValue: '68.5% (Cost Auditor Certified)', match: true },
          { field: 'Supplier Classification', submittedValue: 'Class-I Local Supplier (>=50%)', portalValue: 'CLASS-I LOCAL SUPPLIER', match: true },
        ],
        flags: [],
      },
      {
        portal: 'CPPP_BLACKLIST',
        portalName: 'Central Debarment & Blacklisting Registry',
        department: 'Public Procurement Division, Department of Expenditure',
        status: 'VERIFIED',
        confidenceScore: 100,
        lastCheckedAt: '2026-08-28 14:37 IST',
        referenceId: 'CPPP-DEB-000',
        summary: 'Clearance confirmed. Entity, Directors, and Associated Entities are NOT listed on GeM/CPPP Blacklist or Debarment Database.',
        matchedFields: [
          { field: 'Debarment Status', submittedValue: 'CLEAN', portalValue: 'NO RECORDS FOUND (CLEAN)', match: true },
        ],
        flags: [],
      },
      {
        portal: 'EPFO_ESIC',
        portalName: 'EPFO & ESIC Compliance Gateway',
        department: 'Ministry of Labour and Employment',
        status: 'VERIFIED',
        confidenceScore: 97.5,
        lastCheckedAt: '2026-08-28 14:37 IST',
        referenceId: 'EPFO-MUM-7128',
        summary: 'Electronic Challan cum Return (ECR) deposited regularly for 42 registered employees.',
        matchedFields: [
          { field: 'EPFO ECR Filing', submittedValue: 'Up to Date', portalValue: 'CHALLAN CLEARED (Active)', match: true },
        ],
        flags: [],
      }
    ],
    documents: [
      {
        id: 'DOC-01',
        title: 'Udyam Registration Certificate',
        category: 'UDYAM_CERT',
        fileName: 'Udyam_MH12_0094812.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-08-28 14:30 IST',
        digiLockerVerified: true,
        digiLockerHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        status: 'VERIFIED',
        extractedDetails: { category: 'Small Enterprise', nicCode: '27101', validUpto: 'Permanent' },
        verificationNote: 'QR Code cryptographically validated against MSME National database.'
      },
      {
        id: 'DOC-02',
        title: 'Chartered Accountant Turnover Certificate with UDIN',
        category: 'CA_TURNOVER',
        fileName: 'CA_Turnover_Certificate_UDIN_26A901.pdf',
        fileSize: '2.4 MB',
        uploadedAt: '2026-08-28 14:30 IST',
        digiLockerVerified: true,
        digiLockerHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        status: 'VERIFIED',
        extractedDetails: { avgTurnoverLakhs: 285.0, udin: '26049182AAAAAA1122', caMembershipNo: '049182' },
        verificationNote: 'UDIN verified from Institute of Chartered Accountants of India (ICAI) API.'
      },
      {
        id: 'DOC-03',
        title: 'Make in India Local Content Undertaking',
        category: 'MII_UNDERTAKING',
        fileName: 'MII_Class1_Undertaking_SolarInverters.pdf',
        fileSize: '1.8 MB',
        uploadedAt: '2026-08-28 14:31 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { localContent: '68.5%', manufacturingLocation: 'MIDC Rabale, Navi Mumbai' }
      },
      {
        id: 'DOC-04',
        title: 'EMD Exemption Declaration for MSME',
        category: 'EMD_EXEMPTION',
        fileName: 'EMD_Exemption_Declaration_Sec4.pdf',
        fileSize: '850 KB',
        uploadedAt: '2026-08-28 14:31 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { claimedExemption: 'Rule 170 of GFR 2017', validMsme: true }
      }
    ],
    clauseCompliance: [
      {
        clauseId: 'CLS-01',
        clauseTitle: 'Land Border Sharing Restrictions',
        statutoryReference: 'GFR 2017 Rule 144(xi) / DoE OM No. 6/18/2019-PPD',
        requirement: 'Bidder must not be from a country sharing land border with India or must be registered with Competent Authority (DPIIT).',
        bidderClaim: 'Self-declaration submitted confirming 100% Indian ownership and incorporation. No foreign beneficial owners.',
        complianceStatus: 'COMPLIANT',
        notes: 'MCA Director records confirm all 3 directors are Indian nationals residing in Maharashtra.'
      },
      {
        clauseId: 'CLS-02',
        clauseTitle: 'Make in India Preference',
        statutoryReference: 'PPP-MII Order 2017 (Revised 2020)',
        requirement: 'Minimum 50% Local Content for Class-I Local Supplier eligibility.',
        bidderClaim: '68.5% Local Value Addition certified by Statutory Cost Auditor.',
        complianceStatus: 'COMPLIANT',
        notes: 'Compliant with margin of preference eligibility under clause 3(a).'
      },
      {
        clauseId: 'CLS-03',
        clauseTitle: 'Financial Turnover Criteria',
        statutoryReference: 'GeM GTC Clause 4.1 / SECI Tender Sec III',
        requirement: 'Average Annual Turnover of minimum ₹150 Lakhs in last 3 financial years.',
        bidderClaim: 'Average turnover of ₹285.0 Lakhs supported by CA certificate and GST returns.',
        complianceStatus: 'COMPLIANT',
        notes: 'Surpasses mandatory threshold (190% of requirement).'
      },
      {
        clauseId: 'CLS-04',
        clauseTitle: 'Earnest Money Deposit (EMD)',
        statutoryReference: 'GFR 2017 Rule 170 / MSMED Act 2006 Sec 11',
        requirement: 'EMD of ₹9.6 Lakhs or valid MSME/Startup exemption certificate.',
        bidderClaim: 'Exemption claimed under active Udyam Small Enterprise Registration.',
        complianceStatus: 'EXEMPTED',
        notes: 'Valid exemption granted pursuant to Ministry of Finance guidelines.'
      }
    ],
    aiAnalysis: {
      complianceScore: 97,
      riskLevel: 'LOW',
      statutoryScore: 25,
      financialScore: 24,
      technicalScore: 24,
      policyScore: 24,
      executiveSummary: 'Bharat Electro-Solar Dynamics demonstrates exceptional statutory and financial compliance. All portal queries across Udyam, GSTN, ITD, MCA21, and Debarment registers returned zero defects. The firm satisfies the 50% Make in India requirement (68.5%) and holds valid MSME exemption for EMD.',
      keyStrengths: [
        '100% verified cross-reconciliation between GSTN filings and CA turnover statement.',
        'High domestic content (68.5%) backed by accredited factory inspection report.',
        'No litigation or debarment history in central procurement databases.',
        'DigiLocker cryptographically signed submissions with unrevoked Class-3 DSC.'
      ],
      riskFlags: [],
      pendingRemediations: [],
      recommendation: 'RECOMMENDED_FOR_TECHNICAL_QUALIFICATION',
      confidenceRate: 98.5,
      evaluatedByModel: 'Gemini 3.7 Flash Compliance Engine',
      timestamp: '2026-08-28 14:38 IST'
    }
  },
  {
    id: 'BID-IND-02',
    tenderId: 'TND-2026-8921',
    name: 'Vortex Power & Grid Systems LLP',
    legalEntity: 'LLP',
    udyamId: 'UDYAM-DL-01-0044199',
    msmeCategory: 'MICRO',
    gstId: '07AAAFV8910K1ZZ',
    pan: 'AAAFV8910K',
    cin: 'AAP-8921',
    isStartup: true,
    dpiitCertNumber: 'DPIIT-ST-99410',
    isMakeInIndiaClass1: true,
    localContentPercent: 54.0,
    submittedAt: '2026-08-29 11:15 IST',
    bidAmount: 455.0,
    annualTurnoverAvg: 110.0, // Below 150L, but startup!
    pastExperienceYears: 2,
    decisionStatus: 'CLARIFICATION_SOUGHT',
    officerRemarks: 'Startup India DPIIT exemption applied for Turnover & Experience as per DPE OM. However, GST-3B for June 2026 shows delay notice and Make-in-India declaration lacks detailed BOM breakup.',
    officerActionDate: '2026-08-30',
    clarificationDeadline: '2026-09-03 17:00 IST',
    portalChecks: [
      {
        portal: 'UDYAM_MSME',
        portalName: 'Udyam Registration Portal',
        department: 'Ministry of MSME',
        status: 'VERIFIED',
        confidenceScore: 98.0,
        lastCheckedAt: '2026-08-29 11:20 IST',
        referenceId: 'MSME-API-11029',
        summary: 'Micro Enterprise registration valid. NIC Code 27100.',
        matchedFields: [
          { field: 'Firm Name', submittedValue: 'Vortex Power & Grid Systems LLP', portalValue: 'VORTEX POWER & GRID SYSTEMS LLP', match: true },
          { field: 'MSME Category', submittedValue: 'MICRO', portalValue: 'MICRO', match: true },
        ],
        flags: [],
      },
      {
        portal: 'STARTUP_INDIA',
        portalName: 'Startup India DPIIT Portal',
        department: 'DPIIT, Ministry of Commerce',
        status: 'VERIFIED',
        confidenceScore: 99.0,
        lastCheckedAt: '2026-08-29 11:20 IST',
        referenceId: 'DPIIT-ST-99410',
        summary: 'Recognized DPIIT Startup in Green Energy Sector. Eligible for exemption from Prior Turnover & Experience under Rule 173(i) of GFR 2017.',
        matchedFields: [
          { field: 'DPIIT Number', submittedValue: 'DPIIT-ST-99410', portalValue: 'DPIIT-ST-99410 (Active)', match: true },
          { field: 'Tax Exemption (80-IAC)', submittedValue: 'Applied', portalValue: 'Granted', match: true }
        ],
        flags: [],
      },
      {
        portal: 'GSTN',
        portalName: 'Goods & Services Tax Network',
        department: 'GSTN Council',
        status: 'DISCREPANCY',
        confidenceScore: 78.0,
        lastCheckedAt: '2026-08-29 11:21 IST',
        referenceId: 'GSTN-API-99014',
        summary: 'GSTR-3B for Q1 2026 filed with 14-day delay. Minor mismatch in declared turnover: Bidder declared ₹110 Lakhs, GST portal aggregate is ₹98.4 Lakhs.',
        matchedFields: [
          { field: 'GSTIN Status', submittedValue: 'ACTIVE', portalValue: 'ACTIVE (Late fee cleared)', match: true },
          { field: 'Turnover Alignment', submittedValue: '₹110.0 Lakhs', portalValue: '₹98.4 Lakhs', match: false },
        ],
        flags: ['Turnover mismatch of 11.8% between Bidder Self-declaration and GSTN API.'],
      },
      {
        portal: 'PAN_INCOME_TAX',
        portalName: 'Income Tax Department',
        department: 'CBDT',
        status: 'VERIFIED',
        confidenceScore: 98.0,
        lastCheckedAt: '2026-08-29 11:21 IST',
        referenceId: 'ITD-PAN-8890',
        summary: 'PAN Active and valid.',
        matchedFields: [
          { field: 'PAN Status', submittedValue: 'AAAFV8910K', portalValue: 'OPERATIVE', match: true },
        ],
        flags: [],
      },
      {
        portal: 'BIS_DPIIT',
        portalName: 'BIS & Make in India Portal',
        department: 'DPIIT',
        status: 'DISCREPANCY',
        confidenceScore: 82.0,
        lastCheckedAt: '2026-08-29 11:22 IST',
        referenceId: 'MII-DPIIT-771',
        summary: 'Class-I Local Supplier declaration submitted claiming 54.0%, but itemized Bill of Materials (BOM) does not specify indigenous content for imported IGBT inverter modules.',
        matchedFields: [
          { field: 'Local Content Claim', submittedValue: '54.0%', portalValue: '54.0% (Self Declaration Only)', match: true },
        ],
        flags: ['Itemized BOM required to corroborate 54% local content above the 50% cutoff.'],
      },
      {
        portal: 'CPPP_BLACKLIST',
        portalName: 'Central Debarment Registry',
        department: 'Department of Expenditure',
        status: 'VERIFIED',
        confidenceScore: 100,
        lastCheckedAt: '2026-08-29 11:22 IST',
        referenceId: 'CPPP-000-OK',
        summary: 'Clean debarment record. Entity not flagged on any central blacklist.',
        matchedFields: [
          { field: 'Debarment Status', submittedValue: 'CLEAN', portalValue: 'CLEAN', match: true }
        ],
        flags: []
      }
    ],
    documents: [
      {
        id: 'DOC-201',
        title: 'Startup India DPIIT Recognition Certificate',
        category: 'UDYAM_CERT',
        fileName: 'DPIIT_Recognition_VortexPower.pdf',
        fileSize: '1.5 MB',
        uploadedAt: '2026-08-29 11:10 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { dpiitId: 'DPIIT-ST-99410', validFrom: '2024-03-12' }
      },
      {
        id: 'DOC-202',
        title: 'Self-Declaration for Startup Turnover Exemption',
        category: 'CA_TURNOVER',
        fileName: 'Startup_Turnover_Exemption_Affidavit.pdf',
        fileSize: '950 KB',
        uploadedAt: '2026-08-29 11:11 IST',
        digiLockerVerified: false,
        status: 'VERIFIED',
        extractedDetails: { claimedPolicy: 'GFR 2017 Rule 173(i) & DoE OM No. F.20/2/2014-PPD' }
      },
      {
        id: 'DOC-203',
        title: 'Local Content Self-Certificate',
        category: 'MII_UNDERTAKING',
        fileName: 'MII_Self_Declaration_Vortex.pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2026-08-29 11:12 IST',
        digiLockerVerified: false,
        status: 'DISCREPANCY',
        extractedDetails: { localContentClaimed: '54.0%' },
        verificationNote: 'Missing cost breakdown sheet for domestic vs imported semiconductor stages.'
      }
    ],
    clauseCompliance: [
      {
        clauseId: 'CLS-01',
        clauseTitle: 'Land Border Sharing Restrictions',
        statutoryReference: 'GFR 2017 Rule 144(xi)',
        requirement: 'Indian entity with no restricted foreign equity.',
        bidderClaim: 'Self-declaration submitted.',
        complianceStatus: 'COMPLIANT',
        notes: 'Verified via MCA/LLP agreement.'
      },
      {
        clauseId: 'CLS-02',
        clauseTitle: 'Make in India Preference',
        statutoryReference: 'PPP-MII Order 2017',
        requirement: 'Minimum 50% local content.',
        bidderClaim: '54.0% claimed via self-declaration.',
        complianceStatus: 'NEEDS_CLARIFICATION',
        notes: 'Clarification sought for detailed bill of materials to substantiate 54% local content.'
      },
      {
        clauseId: 'CLS-03',
        clauseTitle: 'Financial Turnover Criteria',
        statutoryReference: 'GFR 2017 Rule 173(i) & DPE OM',
        requirement: '₹150 Lakhs min turnover (Exempt for DPIIT recognized Startups).',
        bidderClaim: 'Startup exemption claimed under DPIIT Certificate #DPIIT-ST-99410.',
        complianceStatus: 'EXEMPTED',
        notes: 'DPIIT verification valid. Exemption legally tenable.'
      }
    ],
    aiAnalysis: {
      complianceScore: 78,
      riskLevel: 'MODERATE',
      statutoryScore: 23,
      financialScore: 18,
      technicalScore: 19,
      policyScore: 18,
      executiveSummary: 'Vortex Power & Grid Systems is a recognized DPIIT Green Energy Startup entitled to statutory exemptions under GFR Rule 173(i). Two non-blocking discrepancies exist: (1) 11.8% variance between declared turnover and GSTN portal data, and (2) Lack of component-level BOM to substantiate the 54% local content claim. Seeking 48-hr clarification is recommended prior to commercial opening.',
      keyStrengths: [
        'Legally recognized DPIIT Startup with active tax holiday under 80-IAC.',
        'Clean debarment clearance across CPPP and GeM.',
        'Patent pending on solar grid inverter synchronization circuit.'
      ],
      riskFlags: [
        'GSTN turnover aggregate reflects ₹98.4L vs ₹110L declared.',
        'Make in India calculation borderlines the 50% threshold at 54% without third-party CA certificate.'
      ],
      pendingRemediations: [
        {
          id: 'REM-01',
          issue: 'Turnover reconciliation difference in GSTN return',
          requiredAction: 'Submit CA certified reconciliation statement for Q1-Q4 FY25-26.',
          severity: 'MAJOR',
          deadlineHours: 48,
          status: 'OPEN'
        },
        {
          id: 'REM-02',
          issue: 'Local Content detailed BOM missing',
          requiredAction: 'Provide Annexure-B with cost breakdown of indigenous components and local testing lab certificates.',
          severity: 'MAJOR',
          deadlineHours: 48,
          status: 'OPEN'
        }
      ],
      recommendation: 'PROVISIONAL_PENDING_CLARIFICATION',
      confidenceRate: 91.2,
      evaluatedByModel: 'Gemini 3.7 Flash Compliance Engine',
      timestamp: '2026-08-29 11:25 IST'
    }
  },
  {
    id: 'BID-IND-03',
    tenderId: 'TND-2026-8921',
    name: 'Zenith Global Infra Technologies Ltd',
    legalEntity: 'PUBLIC_LIMITED',
    udyamId: 'NOT_APPLICABLE',
    msmeCategory: 'NOT_APPLICABLE',
    gstId: '06AABCZ1122D1ZP',
    pan: 'AABCZ1122D',
    cin: 'L72200HR2012PLC045100',
    isStartup: false,
    isMakeInIndiaClass1: false,
    localContentPercent: 28.0, // Class-II / Non-local!
    submittedAt: '2026-08-29 16:45 IST',
    bidAmount: 490.0,
    annualTurnoverAvg: 1850.0,
    pastExperienceYears: 12,
    decisionStatus: 'DISQUALIFIED',
    officerRemarks: 'Disqualified under Clause 3(b) of PPP-MII Order 2017. Tender is restricted to Class-I Local Suppliers (min 50% local content). Bidder declared 28% local content. Additionally, MCA records indicate pending NCLT insolvency petition (IBC Sec 7).',
    officerActionDate: '2026-08-30',
    portalChecks: [
      {
        portal: 'GSTN',
        portalName: 'Goods & Services Tax Network',
        department: 'GSTN Council',
        status: 'VERIFIED',
        confidenceScore: 96.0,
        lastCheckedAt: '2026-08-29 16:50 IST',
        referenceId: 'GSTN-API-77210',
        summary: 'Active GSTIN. High volume filings.',
        matchedFields: [
          { field: 'GSTIN Status', submittedValue: 'ACTIVE', portalValue: 'ACTIVE', match: true },
          { field: 'Turnover', submittedValue: '₹1850 Lakhs', portalValue: '₹1842 Lakhs', match: true }
        ],
        flags: []
      },
      {
        portal: 'MCA21',
        portalName: 'MCA21 Company Registry',
        department: 'Ministry of Corporate Affairs',
        status: 'DISCREPANCY',
        confidenceScore: 65.0,
        lastCheckedAt: '2026-08-29 16:51 IST',
        referenceId: 'MCA-V3-99120',
        summary: 'Warning: Active filing indicates Corporate Insolvency Resolution Process (CIRP) admitted under Section 7 of Insolvency and Bankruptcy Code (IBC) 2016.',
        matchedFields: [
          { field: 'Company Status', submittedValue: 'ACTIVE', portalValue: 'ACTIVE (Under CIRP)', match: false }
        ],
        flags: ['Entity under active IBC insolvency resolution process. Solvency at high operational risk.']
      },
      {
        portal: 'BIS_DPIIT',
        portalName: 'BIS & Make in India Portal',
        department: 'DPIIT',
        status: 'FAILED',
        confidenceScore: 99.0,
        lastCheckedAt: '2026-08-29 16:51 IST',
        referenceId: 'DPIIT-MII-FAIL',
        summary: 'Local Content is 28.0%, which classifies the bidder as "Non-Local Supplier" (<20%) / "Class-II Local Supplier" (20-50%). Tender terms mandate Class-I Local Supplier (>=50%) only.',
        matchedFields: [
          { field: 'Mandatory Local Content', submittedValue: '28.0%', portalValue: 'FAILED (Required >= 50%)', match: false }
        ],
        flags: ['Breach of Tender Special Condition: Local content < 50%. Ineligible for award.']
      },
      {
        portal: 'CPPP_BLACKLIST',
        portalName: 'Central Debarment Registry',
        department: 'Department of Expenditure',
        status: 'VERIFIED',
        confidenceScore: 100,
        lastCheckedAt: '2026-08-29 16:52 IST',
        referenceId: 'CPPP-000',
        summary: 'No active debarment order found.',
        matchedFields: [
          { field: 'Debarment Status', submittedValue: 'CLEAN', portalValue: 'CLEAN', match: true }
        ],
        flags: []
      }
    ],
    documents: [
      {
        id: 'DOC-301',
        title: 'Audited Financial Statements (3 Years)',
        category: 'CA_TURNOVER',
        fileName: 'Zenith_Audited_Financials_FY25.pdf',
        fileSize: '6.8 MB',
        uploadedAt: '2026-08-29 16:40 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { avgTurnoverLakhs: 1850.0 }
      },
      {
        id: 'DOC-302',
        title: 'Make in India Declaration (Class-II / 28%)',
        category: 'MII_UNDERTAKING',
        fileName: 'MII_Class2_Undertaking.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-08-29 16:42 IST',
        digiLockerVerified: true,
        status: 'FAILED',
        extractedDetails: { localContent: '28.0%' },
        verificationNote: 'Tender is restricted strictly to Class-I suppliers.'
      }
    ],
    clauseCompliance: [
      {
        clauseId: 'CLS-01',
        clauseTitle: 'Make in India Minimum Local Content',
        statutoryReference: 'PPP-MII Order 2017 & SECI Tender Clause 2.4',
        requirement: 'Mandatory Class-I Local Supplier (>=50% local value addition).',
        bidderClaim: '28% local content declared.',
        complianceStatus: 'NON_COMPLIANT',
        notes: 'Direct failure of mandatory technical qualification clause.'
      },
      {
        clauseId: 'CLS-02',
        clauseTitle: 'Solvency & Operational Standing',
        statutoryReference: 'GFR 2017 Rule 151 / IBC 2016',
        requirement: 'Bidder must not be in liquidation or under court-directed insolvency.',
        bidderClaim: 'Submitted standard non-bankruptcy affidavit.',
        complianceStatus: 'NON_COMPLIANT',
        notes: 'MCA21 cross-check revealed admitted Section 7 IBC insolvency proceedings before NCLT Chandigarh.'
      }
    ],
    aiAnalysis: {
      complianceScore: 38,
      riskLevel: 'DISQUALIFIED',
      statutoryScore: 10,
      financialScore: 12,
      technicalScore: 10,
      policyScore: 6,
      executiveSummary: 'Zenith Global Infra Technologies fails mandatory statutory and policy qualification filters on two critical grounds: (1) Ineligibility under Public Procurement (Make in India) Order 2017 due to declared 28% local content below the 50% statutory threshold, and (2) Active CIRP proceedings under Section 7 of IBC 2016 detected via MCA21 live registry.',
      keyStrengths: [
        'High historical annual turnover (₹1850 Lakhs).',
        'Extensive past defense and power experience.'
      ],
      riskFlags: [
        'CRITICAL: Non-compliant with Make in India Class-I requirement (only 28%).',
        'CRITICAL: MCA21 flagged active insolvency proceedings (CIRP) admitted at NCLT.'
      ],
      pendingRemediations: [
        {
          id: 'REM-301',
          issue: 'Make in India Class-I threshold breach',
          requiredAction: 'Incurable defect under tender terms. Tender is restricted to Class-I.',
          severity: 'CRITICAL',
          status: 'OPEN'
        }
      ],
      recommendation: 'REJECT_NON_COMPLIANT',
      confidenceRate: 99.1,
      evaluatedByModel: 'Gemini 3.7 Flash Compliance Engine',
      timestamp: '2026-08-29 16:55 IST'
    }
  },
  {
    id: 'BID-IND-04',
    tenderId: 'TND-2026-8921',
    name: 'SuryaTejas Renewable Engineering Pvt Ltd',
    legalEntity: 'PRIVATE_LIMITED',
    udyamId: 'UDYAM-GJ-01-0081294',
    msmeCategory: 'MEDIUM',
    gstId: '24AABCS7712Q1ZR',
    pan: 'AABCS7712Q',
    cin: 'U40106GJ2016PTC090123',
    isStartup: false,
    isMakeInIndiaClass1: true,
    localContentPercent: 72.0,
    submittedAt: '2026-08-29 17:50 IST',
    bidAmount: 420.0,
    annualTurnoverAvg: 310.0,
    pastExperienceYears: 8,
    decisionStatus: 'UNDER_EVALUATION',
    portalChecks: [
      {
        portal: 'UDYAM_MSME',
        portalName: 'Udyam Registration Portal',
        department: 'Ministry of MSME',
        status: 'VERIFIED',
        confidenceScore: 99.0,
        lastCheckedAt: '2026-08-29 18:00 IST',
        referenceId: 'MSME-API-88190',
        summary: 'Medium Enterprise valid. Gujarat manufacturing unit active.',
        matchedFields: [
          { field: 'Firm Name', submittedValue: 'SuryaTejas Renewable Engineering Pvt Ltd', portalValue: 'SURYATEJAS RENEWABLE ENGINEERING PRIVATE LIMITED', match: true },
          { field: 'MSME Status', submittedValue: 'MEDIUM', portalValue: 'MEDIUM', match: true }
        ],
        flags: []
      },
      {
        portal: 'GSTN',
        portalName: 'Goods & Services Tax Network',
        department: 'Department of Revenue',
        status: 'VERIFIED',
        confidenceScore: 99.2,
        lastCheckedAt: '2026-08-29 18:00 IST',
        referenceId: 'GSTN-API-11092',
        summary: 'Active GSTIN. High compliance rating.',
        matchedFields: [
          { field: 'Status', submittedValue: 'ACTIVE', portalValue: 'ACTIVE', match: true },
          { field: 'Turnover Match', submittedValue: '₹310 Lakhs', portalValue: '₹312 Lakhs', match: true }
        ],
        flags: []
      },
      {
        portal: 'MCA21',
        portalName: 'MCA21 Registry',
        department: 'MCA',
        status: 'VERIFIED',
        confidenceScore: 100,
        lastCheckedAt: '2026-08-29 18:01 IST',
        referenceId: 'MCA-GJ-991',
        summary: 'Active company in regular compliance.',
        matchedFields: [
          { field: 'Company Status', submittedValue: 'ACTIVE', portalValue: 'ACTIVE', match: true }
        ],
        flags: []
      },
      {
        portal: 'BIS_DPIIT',
        portalName: 'BIS & Make in India',
        department: 'DPIIT',
        status: 'VERIFIED',
        confidenceScore: 98.0,
        lastCheckedAt: '2026-08-29 18:01 IST',
        referenceId: 'MII-72-GJ',
        summary: 'Class-I Local Supplier (72.0% local value addition). Full laboratory test reports attached.',
        matchedFields: [
          { field: 'Local Content', submittedValue: '72.0%', portalValue: '72.0% (Verified)', match: true }
        ],
        flags: []
      },
      {
        portal: 'CPPP_BLACKLIST',
        portalName: 'Central Debarment Registry',
        department: 'DoE',
        status: 'VERIFIED',
        confidenceScore: 100,
        lastCheckedAt: '2026-08-29 18:02 IST',
        referenceId: 'CPPP-CLEAR',
        summary: 'Entity clear of all central procurement blacklists.',
        matchedFields: [
          { field: 'Debarment', submittedValue: 'CLEAN', portalValue: 'CLEAN', match: true }
        ],
        flags: []
      }
    ],
    documents: [
      {
        id: 'DOC-401',
        title: 'Udyam Certificate',
        category: 'UDYAM_CERT',
        fileName: 'Udyam_GJ01_0081294.pdf',
        fileSize: '1.4 MB',
        uploadedAt: '2026-08-29 17:40 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { category: 'Medium Enterprise' }
      },
      {
        id: 'DOC-402',
        title: 'CA Turnover Certificate with UDIN',
        category: 'CA_TURNOVER',
        fileName: 'CA_Turnover_Cert_SuryaTejas.pdf',
        fileSize: '2.1 MB',
        uploadedAt: '2026-08-29 17:42 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { avgTurnover: '₹310 Lakhs' }
      },
      {
        id: 'DOC-403',
        title: 'Make in India Local Content Certificate',
        category: 'MII_UNDERTAKING',
        fileName: 'MII_72Percent_Auditor_Report.pdf',
        fileSize: '2.9 MB',
        uploadedAt: '2026-08-29 17:44 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { localContent: '72.0%' }
      }
    ],
    clauseCompliance: [
      {
        clauseId: 'CLS-01',
        clauseTitle: 'Land Border Restriction',
        statutoryReference: 'GFR 2017 Rule 144(xi)',
        requirement: 'Indian entity, no restricted foreign control.',
        bidderClaim: 'Compliant self-affidavit with ROC records.',
        complianceStatus: 'COMPLIANT',
        notes: 'Verified.'
      },
      {
        clauseId: 'CLS-02',
        clauseTitle: 'Make in India Local Content',
        statutoryReference: 'PPP-MII Order 2017',
        requirement: 'Min 50% local content.',
        bidderClaim: '72% local content certified.',
        complianceStatus: 'COMPLIANT',
        notes: 'Highest local content in the tender cohort.'
      }
    ],
    aiAnalysis: {
      complianceScore: 99,
      riskLevel: 'LOW',
      statutoryScore: 25,
      financialScore: 25,
      technicalScore: 25,
      policyScore: 24,
      executiveSummary: 'SuryaTejas Renewable Engineering achieves an outstanding compliance score of 99/100. Robust balance sheet, 72% verified domestic value addition, unblemished statutory record with zero discrepancies across all 8 government API gateways.',
      keyStrengths: [
        'Highest local value addition (72.0%) certified by Cost Accountant with active UDIN.',
        'Fully compliant GST & Income Tax history with zero delays.',
        'Strongest financial turnover among MSME applicants (₹310 Lakhs/yr).'
      ],
      riskFlags: [],
      pendingRemediations: [],
      recommendation: 'RECOMMENDED_FOR_TECHNICAL_QUALIFICATION',
      confidenceRate: 99.4,
      evaluatedByModel: 'Gemini 3.7 Flash Compliance Engine',
      timestamp: '2026-08-29 18:05 IST'
    }
  },
  {
    id: 'BID-IND-05',
    tenderId: 'TND-2026-8921',
    name: 'Indo-Greentech Consortium (JV)',
    legalEntity: 'CONSORTIUM_JV',
    udyamId: 'UDYAM-KA-03-0091823',
    msmeCategory: 'SMALL',
    gstId: '29AABCI9021K1ZX',
    pan: 'AABCI9021K',
    cin: 'U40108KA2019PTC120911',
    isStartup: false,
    isMakeInIndiaClass1: true,
    localContentPercent: 64.0,
    submittedAt: '2026-08-29 18:25 IST',
    bidAmount: 428.0,
    annualTurnoverAvg: 420.0, // Aggregated: 260 + 160
    pastExperienceYears: 7,
    isConsortium: true,
    consortiumLeadShare: 65,
    aggregatedTurnover: 420.0,
    consortiumLandBorderStatus: 'COMPLIANT',
    decisionStatus: 'QUALIFIED_FOR_COMMERCIAL',
    officerRemarks: 'Consortium bid verified under SECI JV guidelines. Lead member (Greentech Infra) holds 65% equity and partner (Apex Power) holds 35%. Combined average turnover of ₹420 Lakhs exceeds the ₹150 Lakhs tender threshold. Both partner entities screened 100% clean under GFR 144(xi) and CPPP debarment.',
    officerActionDate: '2026-08-30',
    consortiumPartners: [
      {
        id: 'PRT-01',
        name: 'Greentech Inverters & Infra Pvt Ltd',
        role: 'LEAD_MEMBER',
        equitySharePercent: 65,
        annualTurnoverAvg: 260.0,
        pastExperienceYears: 7,
        pan: 'AABCG8921L',
        gstId: '29AABCG8921L1ZM',
        udyamId: 'UDYAM-KA-03-0091823',
        cin: 'U40108KA2019PTC120911',
        landBorderCleared: true,
        debarmentClean: true,
        beneficialOwners: [
          { name: 'K. N. Raghavan (Managing Director)', nationality: 'Indian', equityPercent: 55, landBorderCompliant: true },
          { name: 'Pooja Raghavan (Director)', nationality: 'Indian', equityPercent: 45, landBorderCompliant: true }
        ],
        udinTurnoverCert: {
          udin: '26081942AAAAAB9911',
          caMembershipNo: '081942',
          verifiedAmountLakhs: 260.0,
          status: 'VERIFIED'
        }
      },
      {
        id: 'PRT-02',
        name: 'Apex Power Grid Solutions LLP',
        role: 'JV_PARTNER',
        equitySharePercent: 35,
        annualTurnoverAvg: 160.0,
        pastExperienceYears: 5,
        pan: 'AAAFA7719P',
        gstId: '06AAAFA7719P1ZW',
        udyamId: 'UDYAM-HR-04-0012948',
        cin: 'AAJ-7719',
        landBorderCleared: true,
        debarmentClean: true,
        beneficialOwners: [
          { name: 'Sanjeev Goel (Designated Partner)', nationality: 'Indian', equityPercent: 60, landBorderCompliant: true },
          { name: 'Ritu Goel (Partner)', nationality: 'Indian', equityPercent: 40, landBorderCompliant: true }
        ],
        udinTurnoverCert: {
          udin: '26094182AAAAAC4455',
          caMembershipNo: '094182',
          verifiedAmountLakhs: 160.0,
          status: 'VERIFIED'
        }
      }
    ],
    portalChecks: [
      {
        portal: 'UDYAM_MSME',
        portalName: 'Udyam Registration Portal',
        department: 'Ministry of MSME',
        status: 'VERIFIED',
        confidenceScore: 99.0,
        lastCheckedAt: '2026-08-29 18:30 IST',
        referenceId: 'MSME-JV-9901',
        summary: 'Lead Partner (Greentech Inverters) registered Small Enterprise verified.',
        matchedFields: [
          { field: 'Lead Member Udyam', submittedValue: 'UDYAM-KA-03-0091823', portalValue: 'ACTIVE (Verified)', match: true },
          { field: 'JV Partner Udyam', submittedValue: 'UDYAM-HR-04-0012948', portalValue: 'ACTIVE (Micro)', match: true }
        ],
        flags: []
      },
      {
        portal: 'GSTN',
        portalName: 'GSTN Multi-Entity Gateway',
        department: 'GSTN Council',
        status: 'VERIFIED',
        confidenceScore: 98.5,
        lastCheckedAt: '2026-08-29 18:30 IST',
        referenceId: 'GSTN-JV-2201',
        summary: 'Both consortium members GSTIN active with regular filings. Lead: ₹262L, Partner: ₹161L (Combined ₹423L).',
        matchedFields: [
          { field: 'Lead GSTIN (Karnataka)', submittedValue: '29AABCG8921L1ZM', portalValue: 'ACTIVE', match: true },
          { field: 'Partner GSTIN (Haryana)', submittedValue: '06AAAFA7719P1ZW', portalValue: 'ACTIVE', match: true }
        ],
        flags: []
      },
      {
        portal: 'MCA21',
        portalName: 'MCA21 Master & DIN Verification',
        department: 'MCA',
        status: 'VERIFIED',
        confidenceScore: 100,
        lastCheckedAt: '2026-08-29 18:31 IST',
        referenceId: 'MCA-JV-8812',
        summary: 'Both corporate entities active. Registered Joint Venture Agreement notarized and registered.',
        matchedFields: [
          { field: 'JV Agreement Hash', submittedValue: 'Registered Consortium Deed #SECI-JV-2026-09', portalValue: 'VERIFIED', match: true }
        ],
        flags: []
      },
      {
        portal: 'BIS_DPIIT',
        portalName: 'BIS & Make in India Registry',
        department: 'DPIIT',
        status: 'VERIFIED',
        confidenceScore: 97.0,
        lastCheckedAt: '2026-08-29 18:32 IST',
        referenceId: 'MII-JV-64',
        summary: 'Consortium achieves 64.0% combined domestic local content. Class-I Local Supplier confirmed.',
        matchedFields: [
          { field: 'Local Content %', submittedValue: '64.0%', portalValue: '64.0% (Class-I)', match: true }
        ],
        flags: []
      },
      {
        portal: 'CPPP_BLACKLIST',
        portalName: 'Central Debarment Registry',
        department: 'Department of Expenditure',
        status: 'VERIFIED',
        confidenceScore: 100,
        lastCheckedAt: '2026-08-29 18:32 IST',
        referenceId: 'CPPP-JV-CLEAN',
        summary: 'All partners and directors cleared across GeM, CPSEs, and CPPP blacklists.',
        matchedFields: [
          { field: 'Debarment Status', submittedValue: 'CLEAN', portalValue: 'CLEAN (All Partners)', match: true }
        ],
        flags: []
      }
    ],
    documents: [
      {
        id: 'DOC-501',
        title: 'Registered Joint Venture / Consortium Agreement',
        category: 'OEM_AUTH',
        fileName: 'Registered_JV_Consortium_Deed.pdf',
        fileSize: '3.8 MB',
        uploadedAt: '2026-08-29 18:20 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { leadPartner: 'Greentech Inverters (65%)', jvPartner: 'Apex Power (35%)', jointLiability: 'Joint & Several Liability Confirmed' }
      },
      {
        id: 'DOC-502',
        title: 'Consolidated CA Turnover Certificate with Dual UDINs',
        category: 'CA_TURNOVER',
        fileName: 'Consortium_Turnover_Auditor_Certificate.pdf',
        fileSize: '2.5 MB',
        uploadedAt: '2026-08-29 18:22 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { combinedTurnoverLakhs: 420.0, leadUdin: '26081942AAAAAB9911', partnerUdin: '26094182AAAAAC4455' }
      },
      {
        id: 'DOC-503',
        title: 'Consortium Make in India Local Content Declaration',
        category: 'MII_UNDERTAKING',
        fileName: 'Consortium_MII_64Percent_Declaration.pdf',
        fileSize: '1.9 MB',
        uploadedAt: '2026-08-29 18:23 IST',
        digiLockerVerified: true,
        status: 'VERIFIED',
        extractedDetails: { localContent: '64.0%' }
      }
    ],
    clauseCompliance: [
      {
        clauseId: 'CLS-01',
        clauseTitle: 'Consortium Eligibility & Equity Share',
        statutoryReference: 'SECI Tender JV Guidelines Clause 4.3 & GFR 2017 Rule 144',
        requirement: 'Lead member must hold at least 51% equity; joint & several liability across all partners.',
        bidderClaim: 'Lead member holds 65%, JV partner holds 35%. Joint liability undertaking submitted.',
        complianceStatus: 'COMPLIANT',
        notes: 'Compliant. Exceeds mandatory 51% lead partner threshold.'
      },
      {
        clauseId: 'CLS-02',
        clauseTitle: 'Land Border Sharing Restrictions (GFR 144(xi))',
        statutoryReference: 'GFR 2017 Rule 144(xi) / DoE OM No. 6/18/2019-PPD',
        requirement: 'All consortium partners and their beneficial owners must be screened for Land Border compliance.',
        bidderClaim: 'Both entities 100% Indian-owned; zero foreign beneficial owners.',
        complianceStatus: 'COMPLIANT',
        notes: 'Screened all 4 beneficial owners across both partners; 100% Indian nationals.'
      },
      {
        clauseId: 'CLS-03',
        clauseTitle: 'Aggregated Financial Turnover Criteria',
        statutoryReference: 'SECI Financial Eligibility Clause 3.2',
        requirement: 'Combined average annual turnover of minimum ₹150 Lakhs.',
        bidderClaim: 'Combined turnover of ₹420 Lakhs (Lead ₹260L + Partner ₹160L).',
        complianceStatus: 'COMPLIANT',
        notes: 'Aggregated turnover is 280% of minimum requirement.'
      },
      {
        clauseId: 'CLS-04',
        clauseTitle: 'Make in India Class-I Preference',
        statutoryReference: 'PPP-MII Order 2017',
        requirement: 'Minimum 50% local content.',
        bidderClaim: '64.0% local content certified across joint manufacturing facilities.',
        complianceStatus: 'COMPLIANT',
        notes: 'Class-I Local Supplier status confirmed.'
      }
    ],
    aiAnalysis: {
      complianceScore: 98,
      riskLevel: 'LOW',
      statutoryScore: 25,
      financialScore: 24,
      technicalScore: 25,
      policyScore: 24,
      executiveSummary: 'Indo-Greentech Consortium (JV) demonstrates rigorous compliance with multi-partner procurement directives. Lead Partner (65% share) and JV Partner (35% share) both pass GFR 144(xi) Land Border screenings. Combined annual turnover of ₹420 Lakhs is backed by dual ICAI UDIN certificates.',
      keyStrengths: [
        'Aggregated financial strength (₹420 Lakhs) comfortably clears tender turnover gate.',
        'Registered JV deed with explicit Joint and Several Liability clauses.',
        '100% Indian beneficial ownership across all partner board directors.',
        'Dual UDIN verification on ICAI portal confirms unmanipulated audit figures.'
      ],
      riskFlags: [],
      pendingRemediations: [],
      recommendation: 'RECOMMENDED_FOR_TECHNICAL_QUALIFICATION',
      confidenceRate: 98.9,
      evaluatedByModel: 'Gemini 3.7 Flash Compliance Engine',
      timestamp: '2026-08-29 18:35 IST'
    }
  }
];

export const INITIAL_RULES: StaticComplianceRule[] = [
  {
    id: 'RULE-GFR-144',
    ruleCode: 'GFR-144-XI',
    category: 'STATUTORY_MANDATE',
    title: 'Land Border Sharing Restrictions',
    statute: 'General Financial Rules (GFR) 2017 Rule 144(xi) / DoE OM No. 6/18/2019-PPD',
    thresholdCondition: 'Mandatory Registration with DPIIT Competent Authority if bidder shares land border with India.',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-01-15',
  },
  {
    id: 'RULE-MII-01',
    ruleCode: 'PPP-MII-2017',
    category: 'PREFERENCE_POLICY',
    title: 'Public Procurement (Preference to Make in India) Order',
    statute: 'DPIIT Order No. P-45021/2/2017-PP (BE-II)',
    thresholdCondition: 'Class-I Local Supplier: Local Content >= 50%. Margin of purchase preference: 20%.',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-02-01',
  },
  {
    id: 'RULE-MSME-11',
    ruleCode: 'MSMED-SEC-11',
    category: 'PREFERENCE_POLICY',
    title: 'Public Procurement Policy for Micro & Small Enterprises (MSEs)',
    statute: 'MSMED Act 2006 / Ministry of MSME Notification S.O. 581(E)',
    thresholdCondition: 'Mandatory 25% procurement from MSEs + Exemption from EMD and Tender Fee.',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-01-10',
  },
  {
    id: 'RULE-STARTUP-01',
    ruleCode: 'STARTUP-GFR-173',
    category: 'FINANCIAL_ELIGIBILITY',
    title: 'Relaxation of Prior Turnover & Experience for Startups',
    statute: 'GFR 2017 Rule 173(i) & DPE OM No. DPE-GM-01/0001/2015-GM-FTS-4857',
    thresholdCondition: 'DPIIT Recognized Startups exempted from Prior Turnover and Prior Experience subject to meeting technical quality standards.',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-03-01',
  },
  {
    id: 'RULE-DEB-01',
    ruleCode: 'DEBARMENT-GFR-151',
    category: 'DEBARMENT_FILTER',
    title: 'Debarment & Blacklisting Cross-Verification Filter',
    statute: 'GFR 2017 Rule 151 / GeM Incident Management Policy',
    thresholdCondition: 'Zero-tolerance filter: Any entity debarred by GeM, CPSEs, or CPPP shall be disqualified immediately.',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-02-20',
  },
  {
    id: 'RULE-IBC-01',
    ruleCode: 'IBC-SOLVENCY',
    category: 'STATUTORY_MANDATE',
    title: 'Corporate Insolvency & Liquidation Verification',
    statute: 'Insolvency and Bankruptcy Code 2016 / Section 7/9/10 CIRP Checks',
    thresholdCondition: 'Entity must not be under active CIRP proceedings with moratorium under Section 14 of IBC.',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-04-12',
  }
];

export const INITIAL_PORTAL_STATUSES: PortalIntegrationStatus[] = [
  {
    portal: 'UDYAM_MSME',
    name: 'Udyam / MSME Registration API',
    endpoint: 'https://api.udyamregistration.gov.in/v2/verify',
    status: 'ONLINE',
    lastPingMs: 142,
    uptimePercent: 99.94,
    dailyQueriesCount: 8420,
    securityProtocol: 'OAuth 2.0 + mTLS Gov Gateway'
  },
  {
    portal: 'GSTN',
    name: 'GSTN Taxpayer Verification Gateway',
    endpoint: 'https://api.gstn.gov.in/taxpayerapi/v1.2/returns',
    status: 'ONLINE',
    lastPingMs: 185,
    uptimePercent: 99.88,
    dailyQueriesCount: 19450,
    securityProtocol: 'GSP Secure Channel (RSA-2048)'
  },
  {
    portal: 'PAN_INCOME_TAX',
    name: 'Income Tax Department PAN & ITR Verification',
    endpoint: 'https://eportal.incometax.gov.in/api/v3/pan-status',
    status: 'ONLINE',
    lastPingMs: 210,
    uptimePercent: 99.75,
    dailyQueriesCount: 14200,
    securityProtocol: 'CBDT Integrated Webhook Gateway'
  },
  {
    portal: 'MCA21',
    name: 'MCA21 V3 Company & LLP Master Data',
    endpoint: 'https://mca.gov.in/mcafoportal/api/v3/company-master',
    status: 'ONLINE',
    lastPingMs: 315,
    uptimePercent: 99.10,
    dailyQueriesCount: 11200,
    securityProtocol: 'NIC API Setu'
  },
  {
    portal: 'STARTUP_INDIA',
    name: 'Startup India DPIIT Recognition Service',
    endpoint: 'https://api.startupindia.gov.in/v1/recognition/verify',
    status: 'ONLINE',
    lastPingMs: 165,
    uptimePercent: 99.91,
    dailyQueriesCount: 3890,
    securityProtocol: 'DPIIT Token-Based API'
  },
  {
    portal: 'NSIC',
    name: 'NSIC Single Point Registration Gateway',
    endpoint: 'https://nsic.co.in/api/v1/sprs/verify',
    status: 'ONLINE',
    lastPingMs: 240,
    uptimePercent: 98.90,
    dailyQueriesCount: 2140,
    securityProtocol: 'SSL/TLS 1.3'
  },
  {
    portal: 'EPFO_ESIC',
    name: 'EPFO / ESIC Electronic Challan Gateway',
    endpoint: 'https://unifiedportal-emp.epfindia.gov.in/api/ecr-verify',
    status: 'ONLINE',
    lastPingMs: 275,
    uptimePercent: 99.20,
    dailyQueriesCount: 7800,
    securityProtocol: 'Shram Suvidha Single Sign-On'
  },
  {
    portal: 'DIGILOCKER',
    name: 'DigiLocker Verifiable Credential Node',
    endpoint: 'https://api.digitallocker.gov.in/public/oauth2/1/verify-uri',
    status: 'ONLINE',
    lastPingMs: 120,
    uptimePercent: 99.98,
    dailyQueriesCount: 28900,
    securityProtocol: 'e-KYC / SHA-256 HMAC Signatures'
  },
  {
    portal: 'BIS_DPIIT',
    name: 'BIS Standards & DPIIT Make in India Registry',
    endpoint: 'https://www.services.bis.gov.in/api/v2/qco-verify',
    status: 'ONLINE',
    lastPingMs: 195,
    uptimePercent: 99.50,
    dailyQueriesCount: 6540,
    securityProtocol: 'BIS Cert Gateway'
  },
  {
    portal: 'CPPP_BLACKLIST',
    name: 'CPPP & GeM Central Debarment Database',
    endpoint: 'https://eprocure.gov.in/api/v1/debarred-entities',
    status: 'ONLINE',
    lastPingMs: 95,
    uptimePercent: 100.0,
    dailyQueriesCount: 45200,
    securityProtocol: 'NIC Central High-Security Vault'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'LOG-88910',
    logSequence: 104,
    timestamp: '2026-08-30 15:10:22 IST',
    action: 'OFFICER_DECISION_RECORDED',
    category: 'DECISION',
    actorRole: 'PROCUREMENT_OFFICER',
    actorName: 'Shri R. K. Sharma (Sr. DGM - Procurement)',
    actorDepartment: 'SECI Procurement Committee',
    tenderId: 'TND-2026-8921',
    bidderId: 'BID-IND-01',
    entityId: 'BID-IND-01 (Bharat Electro-Solar)',
    details: 'Bidder Bharat Electro-Solar Dynamics marked QUALIFIED for commercial bid opening after 100% portal reconciliation.',
    hash: 'a789ef23cb014892cfa78921bdf9812401824128941029412491aebcdf019241',
    currentHash: 'a789ef23cb014892cfa78921bdf9812401824128941029412491aebcdf019241',
    previousHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    verified: true
  },
  {
    id: 'LOG-88909',
    logSequence: 103,
    timestamp: '2026-08-30 14:45:10 IST',
    action: 'CLARIFICATION_NOTICE_ISSUED',
    category: 'CLARIFICATION',
    actorRole: 'PROCUREMENT_OFFICER',
    actorName: 'Shri R. K. Sharma (Sr. DGM - Procurement)',
    actorDepartment: 'SECI Procurement Committee',
    tenderId: 'TND-2026-8921',
    bidderId: 'BID-IND-02',
    entityId: 'BID-IND-02 (Vortex Power Systems)',
    details: 'Issued 48-hr GeM clarification notice to Vortex Power for GST reconciliation and component BOM substantiation.',
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    currentHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    previousHash: '8b73a219ef84a1029cfa90124810294102941029412094102941029410294102',
    verified: true
  },
  {
    id: 'LOG-88908',
    logSequence: 102,
    timestamp: '2026-08-30 11:20:04 IST',
    action: 'AI_HYBRID_VERIFICATION_COMPLETE',
    category: 'AI_VERIFICATION',
    actorRole: 'SYSTEM_AI',
    actorName: 'GeM AI Compliance Engine (v3.7)',
    tenderId: 'TND-2026-8921',
    bidderId: 'BID-IND-03',
    entityId: 'BID-IND-03 (Solarium Infratech)',
    details: 'AI flagged non-compliance with Make in India Class-I criteria (28% < 50%) and detected active NCLT IBC CIRP filing on MCA21.',
    hash: '8b73a219ef84a1029cfa90124810294102941029412094102941029410294102',
    currentHash: '8b73a219ef84a1029cfa90124810294102941029412094102941029410294102',
    previousHash: '3f09182390124810294810294810294810294810294810294810294810294810',
    verified: true
  },
  {
    id: 'LOG-88907',
    logSequence: 101,
    timestamp: '2026-08-29 18:02:11 IST',
    action: 'MULTI_PORTAL_SYNC_EXECUTED',
    category: 'PORTAL_RECONCILIATION',
    actorRole: 'ADMIN',
    actorName: 'GeM API Gateway Dispatcher',
    tenderId: 'TND-2026-8921',
    bidderId: 'BID-IND-04',
    entityId: 'BID-IND-04 (SunGreen Power)',
    details: 'Queried 8 government databases (Udyam, GSTN, PAN, MCA21, DigiLocker, BIS, CPPP Debarment, EPFO). 8/8 successful matches.',
    hash: '3f09182390124810294810294810294810294810294810294810294810294810',
    currentHash: '3f09182390124810294810294810294810294810294810294810294810294810',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    verified: true
  }
];

export const STATIC_GFR_RULES: StaticComplianceRule[] = [
  {
    id: 'RULE-GFR-144-XI',
    ruleCode: 'GFR-2017-R144(xi)',
    category: 'STATUTORY_MANDATE',
    title: 'Restrictions on Public Procurement from Countries sharing Land Border with India',
    description: 'Any bidder from a country sharing a land border with India will be eligible to bid only if registered with DPIIT Competent Authority and verified for National Security clearances under Department of Expenditure OM F.No.6/18/2019-PPD.',
    statute: 'General Financial Rules 2017 / Order (Public Procurement No. 1)',
    thresholdCondition: 'Mandatory declaration + DPIIT Land Border Registration if foreign beneficial ownership >= 10%',
    logicExpression: 'isBeneficialOwnerFromLandBorderCountry == false OR (hasDPIITLandBorderReg == true AND securityClearanceValid == true)',
    severity: 'DISQUALIFYING',
    authority: 'Ministry of Finance, Dept of Expenditure',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-01-15'
  },
  {
    id: 'RULE-PPP-MII-2017',
    ruleCode: 'PPP-MII-ORDER-2017',
    category: 'PREFERENCE_POLICY',
    title: 'Public Procurement (Preference to Make in India) Order 2017',
    description: 'Class-I Local Supplier (>=50% local content) receives purchase preference (margin 20%). Only Class-I and Class-II local suppliers eligible for tenders < ₹200 Crores (Global Tender Enquiry banned under Rule 161(iv)).',
    statute: 'DPIIT Order No. P-45021/2/2017-PP (BE-II)',
    thresholdCondition: 'Local Content >= 50% for Class-I; >= 20% & < 50% for Class-II. Class-I gets L1 matching preference within 20% margin.',
    logicExpression: 'tenderValue < 20000.00 => localContentPercent >= 20.0 (Class-I or Class-II mandatory)',
    severity: 'DISQUALIFYING',
    authority: 'DPIIT, Ministry of Commerce & Industry',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-02-01'
  },
  {
    id: 'RULE-MSME-PPP-2012',
    ruleCode: 'MSME-POLICY-2012',
    category: 'PREFERENCE_POLICY',
    title: 'Public Procurement Policy for Micro and Small Enterprises (MSEs) Order 2012',
    description: 'Mandatory 25% annual procurement target from MSEs (including 4% SC/ST and 3% Women entrepreneurs). MSEs quoting within L1+15% price band allowed to supply 25% requirement by matching L1 price. Full exemption from EMD & tender document fees.',
    statute: 'Section 11, Micro, Small and Medium Enterprises Development Act, 2006',
    thresholdCondition: 'Valid Udyam Registration Certificate in relevant NIC code; Exemption from EMD (Rule 170).',
    logicExpression: 'isMSMERegistered == true => (emdExemptionGranted == true AND feeExemptionGranted == true AND priceBandPreferencePercent == 15.0)',
    severity: 'MAJOR',
    authority: 'Ministry of MSME',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-01-10'
  },
  {
    id: 'RULE-STARTUP-DPIIT',
    ruleCode: 'GFR-2017-R173(i)',
    category: 'FINANCIAL_ELIGIBILITY',
    title: 'Relaxation of Prior Turnover and Prior Experience for DPIIT Recognized Startups',
    description: 'Procuring entities may relax condition of prior turnover and prior experience for all Startups (recognized by DPIIT) subject to meeting quality and technical specifications under Rule 173(i) of GFR 2017.',
    statute: 'GFR 2017 Rule 173(i) & DPIIT Notification',
    thresholdCondition: 'Valid Startup India DPIIT recognition certificate; relaxed turnover & past supply criteria.',
    logicExpression: 'isDPIITStartup == true => (relaxTurnoverCriteria == true AND relaxPriorExperience == true)',
    severity: 'MAJOR',
    authority: 'DPIIT / Dept of Expenditure',
    isMandatory: false,
    active: true,
    lastUpdated: '2026-02-14'
  },
  {
    id: 'RULE-EMD-BG-170',
    ruleCode: 'GFR-2017-R170',
    category: 'FINANCIAL_ELIGIBILITY',
    title: 'Bid Security / Earnest Money Deposit (EMD) Rules & Verification',
    description: 'EMD ordinarily ranges between 2% to 5% of estimated tender value. Exemption granted to Micro & Small Enterprises, Startups, and Central PSUs upon submission of valid statutory declarations / Bid Security Declarations.',
    statute: 'GFR 2017 Rule 170 / Dept of Expenditure Guidelines',
    thresholdCondition: 'Bank Guarantee / Insurance Surety Bond / Online e-PBG or statutory exemption proof.',
    logicExpression: 'hasValidEMD == true OR (isMSME == true AND udyamVerified == true) OR isDPIITStartup == true',
    severity: 'DISQUALIFYING',
    authority: 'Ministry of Finance',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-01-20'
  },
  {
    id: 'RULE-DEBARMENT-151',
    ruleCode: 'GFR-2017-R151',
    category: 'DEBARMENT_FILTER',
    title: 'Debarment from Bidding (Blacklisting & Disqualification Filters)',
    description: 'A bidder shall be debarred if convicted of an offence under the Prevention of Corruption Act, 1988 or Indian Penal Code, or for breach of integrity pact / failure to execute contract under Rule 151(i) & (ii).',
    statute: 'GFR 2017 Rule 151 / CVC Guidelines',
    thresholdCondition: 'Clean CPPP, GeM & Central Debarment Portal record; No active NCLT IBC CIRP liquidation order.',
    logicExpression: 'isDebarredOnCPPP == false AND isBlacklistedOnGeM == false AND activeIBCInsolvency == false',
    severity: 'DISQUALIFYING',
    authority: 'Central Vigilance Commission (CVC) & GeM SPV',
    isMandatory: true,
    active: true,
    lastUpdated: '2026-03-01'
  }
];

