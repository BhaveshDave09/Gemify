# 🇮🇳 GeM AI Compliance Copilot & Bid Verification Platform

> **Statutory Bid Compliance Verification, Multi-Persona RBAC & Electronic Evidence Platform**  
> Grounded in **GFR 2017**, **PPP-MII Order 2017**, **MSME Policy 2012**, and **Section 65B Indian Evidence Act / BSA 2023**.

---

## 📌 Executive Overview

The **GeM AI Compliance Copilot** is a specialized, government-grade full-stack platform built for the **Government e-Marketplace (GeM)** ecosystem. It automates pre-qualification evaluation, cross-portal statutory reconciliation, multi-partner Joint Venture (JV) financial aggregation, and cryptographic non-repudiation audit logging for public procurement across Central Ministries, CPSEs, and State Departments.

---

## 🏛️ Core Persona Matrix (Strict RBAC & Separation of Duties)

| Role | Target Users | Authorized Scope | Enforced Statutory Restrictions |
| :--- | :--- | :--- | :--- |
| **Procurement Officer** | CPSE Tender Committees, Ministry Evaluators | Tender Evaluation Dashboard, GFR 144(xi)/149/151 statutory checks, Consortium JV analysis, Gazetted holiday-aware 48-hr clarification scheduler, TEC Minutes generator, Qualification/Disqualification recording. | Read-only telemetry; **cannot** alter system audit ledgers or database triggers. |
| **Bidder / Vendor** | MSMEs, Startups & Large Enterprises | Pre-Submission Eligibility Simulator, PPP-MII 2017 Local Content Self-Calculator, GSTN vs. CA Turnover Reconciliation, DigiLocker Credential Vault. | **Zero access** to competitor bids, scoring dossiers, or officer evaluation remarks. |
| **Statutory Auditor** | CAG, CVC & Vigilance Directorate | Cryptographic SHA-256 Hash Chain Inspector, Chronological Non-Repudiation Audit Ledger, Section 65B Certificate Generator, Forensic CSV/PDF Exporter. | Strict **read-only audit privileges**; cannot alter tender decisions or commercial pricing. |
| **System Administrator** | GeM SPV Technical Operations Team | 10-Connector Gateway Telemetry (latency SLAs, circuit breakers, rate limits), PostgreSQL DDL Triggers, Kubernetes Microservices Monitoring. | **Zero access** to active tender evaluations or bidder qualification decision recording. |

---

## ⚖️ Statutory Grounding & Regulatory Framework

- **General Financial Rules (GFR 2017)**:
  - **Rule 144(xi)**: Mandatory screening for Land Border sharing restrictions (DoE OM F.No.6/18/2019-PPD).
  - **Rule 149**: Mandatory procurement through GeM and price reasonableness certification.
  - **Rule 151**: Central Debarment Registry (CPPP) cross-checks & Code of Integrity (Rule 175).
  - **Rule 170(i)**: 100% EMD exemptions for Udyam-registered MSEs with Bid Security Declarations.
  - **Rule 173(i)**: Prior turnover and experience relaxations for recognized DPIIT Startups.
- **Public Procurement (Preference to Make in India) Order 2017**:
  - Class-I Local Supplier ($\ge 50\%$ local content) with 20% margin of purchase preference.
  - Class-II Local Supplier ($\ge 20\%$ to $< 50\%$) & Non-Local Supplier exclusion protocols.
- **Public Procurement Policy for MSEs Order 2012**:
  - 25% annual procurement quota from MSEs (including 4% SC/ST and 3% Women-owned).
  - L1 + 15% price band matching rights.
- **ICAI Gazette Notification No. 1-CA(7)/192/2019**:
  - Real-time 18-digit **Unique Document Identification Number (UDIN)** API verification for all CA turnover and net-worth certificates.
- **Section 65B Indian Evidence Act, 1872 / Section 63 Bharatiya Sakshya Adhiniyam 2023**:
  - Cryptographic SHA-256 electronic record certification for non-repudiation in judicial or vigilance inquiries.

---

## 🚀 Key Functional Capabilities

1. **Consortium & Joint Venture (JV) Engine**:
   - Aggregates multi-partner financial turnover (e.g. Lead Member $\ge 51\%$) against tender thresholds.
   - Audits individual beneficial ownership across all partner entities under GFR 144(xi).
2. **Gazetted Holiday-Aware 48-Hour Clarification Scheduler**:
   - Calculates exact statutory deadlines while systematically skipping Central Government Gazetted Holidays (DoPT calendar) and weekends (Section 10, General Clauses Act).
3. **Automated TEC Minutes Generator**:
   - Produces formal Tender Evaluation Committee minutes aligned with Central Government CPSE templates, featuring a 4-tier DSC signature block and Section 65B hash seals.
4. **ICAI UDIN Live Gateway**:
   - Real-time verification of CA membership numbers, firm registration, date of generation, and certified turnover figures.
5. **Multi-Portal Cross-Reconciliation (10 Gateways)**:
   - Live reconciliation across **Udyam MSME**, **GSTN Council**, **MCA21**, **CBDT PAN**, **DigiLocker**, **CPPP Blacklist**, **BIS/DPIIT**, **ICAI UDIN**, **NSDL e-Governance**, and **GeM Core Services**.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas-based Section 65B Seals.
- **Backend**: Node.js, Express, Google GenAI SDK (`@google/genai` with Gemini 3.7 Flash).
- **Security & Integrity**: Class-3 DSC Simulation, Aadhaar e-Sign PIN verification, SHA-256 Cryptographic Block Ledgers, PostgreSQL Append-Only DDL Trigger definitions.
- **Port**: Configured on standard container ingress port `3000`.

---

## 📦 Setup & Local Execution

### 1. Clone & Install Dependencies
```bash
# Clone repository
git clone <repository-url>
cd gem-ai-compliance-copilot

# Install dependencies
npm install
