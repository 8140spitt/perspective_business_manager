CREATE TABLE IF NOT EXISTS lead_record (
    lead_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    lead_reference VARCHAR(100) NOT NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    lead_source_code VARCHAR(100) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'new',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    estimated_value DECIMAL(15, 2) NULL,
    estimated_currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    expected_decision_date DATE NULL,
    received_at TIMESTAMP NULL,
    qualified_at TIMESTAMP NULL,
    closed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_lead_record_client_account
        FOREIGN KEY (client_account_id)
        REFERENCES client_account (client_account_id),

    CONSTRAINT fk_lead_record_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_lead_record_reference
        UNIQUE (lead_reference)
);

CREATE TABLE IF NOT EXISTS enquiry (
    enquiry_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    enquiry_reference VARCHAR(100) NOT NULL,
    lead_id BIGINT UNSIGNED NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    enquiry_type_code VARCHAR(100) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'new',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    estimated_value DECIMAL(15, 2) NULL,
    estimated_currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    expected_decision_date DATE NULL,
    received_at TIMESTAMP NULL,
    qualified_at TIMESTAMP NULL,
    closed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_enquiry_lead_record
        FOREIGN KEY (lead_id)
        REFERENCES lead_record (lead_id),

    CONSTRAINT fk_enquiry_client_account
        FOREIGN KEY (client_account_id)
        REFERENCES client_account (client_account_id),

    CONSTRAINT fk_enquiry_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_enquiry_reference
        UNIQUE (enquiry_reference)
);

CREATE TABLE IF NOT EXISTS opportunity (
    opportunity_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    opportunity_reference VARCHAR(100) NOT NULL,
    enquiry_id BIGINT UNSIGNED NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    property_id BIGINT UNSIGNED NULL,
    opportunity_type_code VARCHAR(100) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'new',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    estimated_value DECIMAL(15, 2) NULL,
    estimated_currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    expected_decision_date DATE NULL,
    probability_percent DECIMAL(5, 2) NULL,
    qualified_at TIMESTAMP NULL,
    won_at TIMESTAMP NULL,
    lost_at TIMESTAMP NULL,
    closed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_opportunity_enquiry
        FOREIGN KEY (enquiry_id)
        REFERENCES enquiry (enquiry_id),

    CONSTRAINT fk_opportunity_client_account
        FOREIGN KEY (client_account_id)
        REFERENCES client_account (client_account_id),

    CONSTRAINT fk_opportunity_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_opportunity_property
        FOREIGN KEY (property_id)
        REFERENCES property (property_id),

    CONSTRAINT uq_opportunity_reference
        UNIQUE (opportunity_reference)
);

CREATE TABLE IF NOT EXISTS proposal (
    proposal_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    proposal_reference VARCHAR(100) NOT NULL,
    opportunity_id BIGINT UNSIGNED NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    proposal_type_code VARCHAR(100) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'draft',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    net_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    gross_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    issued_at TIMESTAMP NULL,
    accepted_at TIMESTAMP NULL,
    rejected_at TIMESTAMP NULL,
    expired_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_proposal_opportunity
        FOREIGN KEY (opportunity_id)
        REFERENCES opportunity (opportunity_id),

    CONSTRAINT fk_proposal_client_account
        FOREIGN KEY (client_account_id)
        REFERENCES client_account (client_account_id),

    CONSTRAINT fk_proposal_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_proposal_reference
        UNIQUE (proposal_reference)
);

CREATE TABLE IF NOT EXISTS proposal_line (
    proposal_line_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    proposal_id BIGINT UNSIGNED NOT NULL,
    line_number INT UNSIGNED NOT NULL,
    line_type_code VARCHAR(100) NOT NULL DEFAULT 'SERVICE',
    description TEXT NOT NULL,
    quantity DECIMAL(15, 4) NOT NULL DEFAULT 1.0000,
    unit_price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    net_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    gross_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_proposal_line_proposal
        FOREIGN KEY (proposal_id)
        REFERENCES proposal (proposal_id),

    CONSTRAINT uq_proposal_line_number
        UNIQUE (proposal_id, line_number)
);

CREATE TABLE IF NOT EXISTS quotation (
    quotation_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quotation_reference VARCHAR(100) NOT NULL,
    proposal_id BIGINT UNSIGNED NULL,
    opportunity_id BIGINT UNSIGNED NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'draft',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    net_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    gross_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    issued_at TIMESTAMP NULL,
    accepted_at TIMESTAMP NULL,
    rejected_at TIMESTAMP NULL,
    expired_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_quotation_proposal
        FOREIGN KEY (proposal_id)
        REFERENCES proposal (proposal_id),

    CONSTRAINT fk_quotation_opportunity
        FOREIGN KEY (opportunity_id)
        REFERENCES opportunity (opportunity_id),

    CONSTRAINT fk_quotation_client_account
        FOREIGN KEY (client_account_id)
        REFERENCES client_account (client_account_id),

    CONSTRAINT fk_quotation_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_quotation_reference
        UNIQUE (quotation_reference)
);

CREATE TABLE IF NOT EXISTS tender (
    tender_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tender_reference VARCHAR(100) NOT NULL,
    opportunity_id BIGINT UNSIGNED NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'draft',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    submission_deadline TIMESTAMP NULL,
    submitted_at TIMESTAMP NULL,
    won_at TIMESTAMP NULL,
    lost_at TIMESTAMP NULL,
    withdrawn_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_tender_opportunity
        FOREIGN KEY (opportunity_id)
        REFERENCES opportunity (opportunity_id),

    CONSTRAINT fk_tender_client_account
        FOREIGN KEY (client_account_id)
        REFERENCES client_account (client_account_id),

    CONSTRAINT fk_tender_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_tender_reference
        UNIQUE (tender_reference)
);

CREATE TABLE IF NOT EXISTS commercial_status_history (
    commercial_status_history_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    object_type_code VARCHAR(100) NOT NULL,
    object_id BIGINT UNSIGNED NOT NULL,
    from_status_code VARCHAR(100) NULL,
    to_status_code VARCHAR(100) NOT NULL,
    reason TEXT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    changed_by BIGINT UNSIGNED NULL,

    CONSTRAINT fk_commercial_status_history_changed_by
        FOREIGN KEY (changed_by)
        REFERENCES party (party_id),

    INDEX ix_commercial_status_history_object (object_type_code, object_id),
    INDEX ix_commercial_status_history_changed_at (changed_at)
);

CREATE INDEX ix_lead_record_client_account ON lead_record (client_account_id);
CREATE INDEX ix_enquiry_client_account ON enquiry (client_account_id);
CREATE INDEX ix_opportunity_client_account ON opportunity (client_account_id);
CREATE INDEX ix_proposal_client_account ON proposal (client_account_id);
CREATE INDEX ix_quotation_client_account ON quotation (client_account_id);
CREATE INDEX ix_tender_client_account ON tender (client_account_id);
