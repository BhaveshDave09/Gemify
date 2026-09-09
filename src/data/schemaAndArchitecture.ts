export const POSTGRES_DDL_SCHEMA = `-- =========================================================================
-- GeM AI-Powered Integrated Bid Compliance Verification Platform
-- Production PostgreSQL DDL Schema with Immutable Cryptographic Audit Logs
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -------------------------------------------------------------------------
-- 1. USERS & RBAC ROLES (Procurement Officer, Bidder, Admin, Auditor)
-- -------------------------------------------------------------------------
CREATE TYPE user_role_enum AS ENUM (
    'PROCUREMENT_OFFICER', 
    'BIDDER', 
    'ADMIN', 
    'AUDITOR'
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'BIDDER',
    department VARCHAR(255),
    designation VARCHAR(255),
    organization_type VARCHAR(100) NOT NULL, -- 'MINISTRY', 'CPSE', 'VENDOR_MSME', 'VENDOR_NON_MSME'
    gov_employee_id VARCHAR(100),
    digital_cert_serial VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------------
-- 2. STATIC RULES & STATUTORY REQUIREMENTS (GFR 2017, MII Order, MSMED)
-- -------------------------------------------------------------------------
CREATE TYPE rule_category_enum AS ENUM (
    'STATUTORY_MANDATE',
    'FINANCIAL_ELIGIBILITY',
    'TECHNICAL_CRITERIA',
    'PREFERENCE_POLICY',
    'DEBARMENT_FILTER'
);

CREATE TABLE static_compliance_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_code VARCHAR(50) UNIQUE NOT NULL,
    category rule_category_enum NOT NULL,
    title VARCHAR(255) NOT NULL,
    statutory_act_reference TEXT NOT NULL,
    threshold_condition JSONB NOT NULL,
    is_mandatory BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    effective_from DATE NOT NULL,
    version INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------------
-- 3. TENDERS & BID ELIGIBILITY REQUIREMENTS
-- -------------------------------------------------------------------------
CREATE TYPE tender_status_enum AS ENUM (
    'DRAFT', 
    'PUBLISHED', 
    'EVALUATION_ACTIVE', 
    'TECHNICAL_EVALUATION', 
    'FINANCIAL_OPENING', 
    'AWARDED', 
    'CANCELLED'
);

CREATE TABLE tenders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bid_number VARCHAR(100) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    ministry VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    cpse_name VARCHAR(255),
    estimated_value_inr NUMERIC(15, 2) NOT NULL,
    emd_amount_inr NUMERIC(15, 2) DEFAULT 0.00,
    allow_msme_emd_exemption BOOLEAN DEFAULT TRUE,
    allow_startup_exemption BOOLEAN DEFAULT TRUE,
    min_turnover_inr NUMERIC(15, 2) DEFAULT 0.00,
    min_past_experience_years INT DEFAULT 0,
    min_local_content_percent NUMERIC(5, 2) DEFAULT 50.00,
    status tender_status_enum NOT NULL DEFAULT 'PUBLISHED',
    published_date TIMESTAMPTZ NOT NULL,
    closing_date TIMESTAMPTZ NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------------
-- 4. BIDDERS & SUBMISSIONS (Dynamic Table)
-- -------------------------------------------------------------------------
CREATE TYPE legal_entity_enum AS ENUM (
    'PRIVATE_LIMITED', 
    'PUBLIC_LIMITED', 
    'PARTNERSHIP', 
    'PROPRIETORSHIP', 
    'LLP'
);

CREATE TYPE msme_tier_enum AS ENUM ('MICRO', 'SMALL', 'MEDIUM', 'NOT_APPLICABLE');

CREATE TYPE decision_status_enum AS ENUM (
    'UNDER_EVALUATION', 
    'QUALIFIED_FOR_COMMERCIAL', 
    'CLARIFICATION_SOUGHT', 
    'DISQUALIFIED', 
    'PROVISIONALLY_APPROVED'
);

CREATE TABLE bidders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tender_id UUID NOT NULL REFERENCES tenders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    legal_name VARCHAR(255) NOT NULL,
    legal_entity_type legal_entity_enum NOT NULL,
    udyam_registration_id VARCHAR(50),
    msme_category msme_tier_enum DEFAULT 'NOT_APPLICABLE',
    gstin VARCHAR(15) NOT NULL,
    pan VARCHAR(10) NOT NULL,
    cin VARCHAR(21),
    is_startup_dpiit BOOLEAN DEFAULT FALSE,
    dpiit_recognition_number VARCHAR(50),
    is_make_in_india_class1 BOOLEAN DEFAULT TRUE,
    declared_local_content_percent NUMERIC(5, 2) NOT NULL,
    declared_annual_turnover_inr NUMERIC(15, 2),
    declared_experience_years INT,
    bid_amount_inr NUMERIC(15, 2),
    decision_status decision_status_enum DEFAULT 'UNDER_EVALUATION',
    officer_remarks TEXT,
    officer_action_by UUID REFERENCES users(id),
    officer_action_at TIMESTAMPTZ,
    submission_timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_tender_bidder_gst UNIQUE (tender_id, gstin)
);

-- -------------------------------------------------------------------------
-- 5. BID DOCUMENTS & DIGILOCKER VERIFICATION
-- -------------------------------------------------------------------------
CREATE TABLE bid_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bidder_id UUID NOT NULL REFERENCES bidders(id) ON DELETE CASCADE,
    document_category VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    storage_uri TEXT NOT NULL,
    file_sha256_hash VARCHAR(64) NOT NULL,
    is_digilocker_verified BOOLEAN DEFAULT FALSE,
    digilocker_uri TEXT,
    verification_status VARCHAR(50) DEFAULT 'PENDING',
    ai_extracted_metadata JSONB,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------------
-- 6. MULTI-PORTAL VERIFICATION RESULTS (Dynamic Microservice Integrations)
-- -------------------------------------------------------------------------
CREATE TYPE portal_name_enum AS ENUM (
    'UDYAM_MSME',
    'GSTN',
    'PAN_INCOME_TAX',
    'MCA21',
    'STARTUP_INDIA',
    'NSIC',
    'EPFO_ESIC',
    'DIGILOCKER',
    'BIS_DPIIT',
    'CPPP_BLACKLIST'
);

CREATE TABLE compliance_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bidder_id UUID NOT NULL REFERENCES bidders(id) ON DELETE CASCADE,
    portal_name portal_name_enum NOT NULL,
    status VARCHAR(50) NOT NULL, -- 'VERIFIED', 'DISCREPANCY', 'FAILED', 'PENDING'
    confidence_score NUMERIC(5, 2) NOT NULL,
    portal_reference_id VARCHAR(100),
    matched_fields_payload JSONB NOT NULL,
    discrepancy_flags TEXT[],
    raw_response_encrypted TEXT,
    queried_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------------
-- 7. AI COMPLIANCE ANALYSIS & SCORING (Vertex AI / Gemini Hybrid Engine)
-- -------------------------------------------------------------------------
CREATE TABLE compliance_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bidder_id UUID UNIQUE NOT NULL REFERENCES bidders(id) ON DELETE CASCADE,
    overall_compliance_score INT NOT NULL CHECK (overall_compliance_score BETWEEN 0 AND 100),
    risk_level VARCHAR(50) NOT NULL, -- 'LOW', 'MODERATE', 'HIGH', 'DISQUALIFIED'
    statutory_score INT NOT NULL,
    financial_score INT NOT NULL,
    technical_score INT NOT NULL,
    policy_score INT NOT NULL,
    ai_recommendation VARCHAR(100) NOT NULL,
    executive_summary TEXT NOT NULL,
    key_strengths TEXT[],
    risk_flags TEXT[],
    pending_remediations JSONB,
    evaluated_by_model VARCHAR(100) NOT NULL,
    model_confidence_percent NUMERIC(5, 2) NOT NULL,
    evaluated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------------
-- 8. IMMUTABLE AUDIT LOGS (Blockchain-Style Cryptographic Hash Chain)
-- -------------------------------------------------------------------------
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    log_sequence BIGSERIAL UNIQUE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    action_type VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    actor_id UUID REFERENCES users(id),
    actor_name VARCHAR(255) NOT NULL,
    actor_role user_role_enum NOT NULL,
    tender_id UUID REFERENCES tenders(id),
    bidder_id UUID REFERENCES bidders(id),
    action_details TEXT NOT NULL,
    previous_hash VARCHAR(64) NOT NULL,
    log_hash VARCHAR(64) NOT NULL,
    is_tamper_verified BOOLEAN DEFAULT TRUE
);

-- Immutable Trigger: Block any UPDATE or DELETE on audit_logs
CREATE OR REPLACE FUNCTION prevent_audit_log_mutation()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'CRITICAL SECURITY VIOLATION: audit_logs is an append-only immutable ledger. Updates or deletions are strictly prohibited.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_immutable_audit_logs
BEFORE UPDATE OR DELETE ON audit_logs
FOR EACH ROW EXECUTE FUNCTION prevent_audit_log_mutation();

-- Auto Hash Calculation Function for Cryptographic Linkage
CREATE OR REPLACE FUNCTION generate_audit_hash()
RETURNS TRIGGER AS $$
DECLARE
    v_prev_hash VARCHAR(64);
BEGIN
    SELECT log_hash INTO v_prev_hash 
    FROM audit_logs 
    ORDER BY log_sequence DESC 
    LIMIT 1;

    IF v_prev_hash IS NULL THEN
        NEW.previous_hash := '0000000000000000000000000000000000000000000000000000000000000000';
    ELSE
        NEW.previous_hash := v_prev_hash;
    END IF;

    NEW.log_hash := encode(digest(
        concat(NEW.timestamp, '|', NEW.action_type, '|', NEW.actor_name, '|', NEW.action_details, '|', NEW.previous_hash),
        'sha256'
    ), 'hex');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_audit_hash
BEFORE INSERT ON audit_logs
FOR EACH ROW EXECUTE FUNCTION generate_audit_hash();

-- -------------------------------------------------------------------------
-- INDEXES FOR HIGH-PERFORMANCE CPSE TENDER QUERIES
-- -------------------------------------------------------------------------
CREATE INDEX idx_bidders_tender ON bidders(tender_id);
CREATE INDEX idx_bidders_gstin ON bidders(gstin);
CREATE INDEX idx_bidders_udyam ON bidders(udyam_registration_id);
CREATE INDEX idx_compliance_checks_bidder ON compliance_checks(bidder_id);
CREATE INDEX idx_audit_logs_tender ON audit_logs(tender_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
`;

export const KUBERNETES_MICROSERVICES_MANIFEST = `# =========================================================================
# GeM AI Compliance Platform - Kubernetes Microservices Deployment
# =========================================================================
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gem-ai-compliance-api
  namespace: gem-procurement
  labels:
    app: gem-ai-compliance
    tier: api-gateway
spec:
  replicas: 4
  selector:
    matchLabels:
      app: gem-ai-compliance
  template:
    metadata:
      labels:
        app: gem-ai-compliance
    spec:
      containers:
      - name: api-service
        image: asia-docker.pkg.dev/gem-procurement-prod/services/compliance-engine:v3.7
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: cloudsql-postgres-secret
              key: connection_string
        - name: GEMINI_API_KEY
          valueFrom:
            secretKeyRef:
              name: vertex-ai-secret
              key: api_key
        resources:
          requests:
            cpu: "500m"
            memory: "1Gi"
          limits:
            cpu: "2000m"
            memory: "4Gi"
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: gem-compliance-svc
  namespace: gem-procurement
spec:
  type: ClusterIP
  selector:
    app: gem-ai-compliance
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
---
# Microservice Connectors (Async Message Broker / Job Worker)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portal-integration-worker
  namespace: gem-procurement
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portal-worker
  template:
    metadata:
      labels:
        app: portal-worker
    spec:
      containers:
      - name: worker
        image: asia-docker.pkg.dev/gem-procurement-prod/services/portal-connectors:v1.2
        env:
        - name: REDIS_URL
          value: "redis://redis-cluster.gem-procurement.svc.cluster.local:6379"
        - name: GSTN_API_GATEWAY
          value: "https://api.gstn.gov.in/taxpayerapi/v1.2"
        - name: UDYAM_API_GATEWAY
          value: "https://api.udyamregistration.gov.in/v2"
`;

export const K8S_MICROSERVICES_MANIFESTS = KUBERNETES_MICROSERVICES_MANIFEST;

