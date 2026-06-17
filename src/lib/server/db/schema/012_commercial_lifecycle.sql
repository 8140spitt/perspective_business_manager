CREATE TABLE IF NOT EXISTS lead_record (
    lead_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    lead_reference VARCHAR(100) NOT NULL UNIQUE,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'new',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    estimated_value DECIMAL(15, 2) NULL,
    estimated_currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    expected_decision_date DATE NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_account_id) REFERENCES client_account (client_account_id),
    FOREIGN KEY (party_id) REFERENCES party (party_id),
    INDEX ix_lead_record_client_account (client_account_id)
);

CREATE TABLE IF NOT EXISTS enquiry (
    enquiry_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    enquiry_reference VARCHAR(100) NOT NULL UNIQUE,
    lead_id BIGINT UNSIGNED NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'new',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    estimated_value DECIMAL(15, 2) NULL,
    estimated_currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    expected_decision_date DATE NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES lead_record (lead_id),
    FOREIGN KEY (client_account_id) REFERENCES client_account (client_account_id),
    FOREIGN KEY (party_id) REFERENCES party (party_id),
    INDEX ix_enquiry_client_account (client_account_id)
);

CREATE TABLE IF NOT EXISTS opportunity (
    opportunity_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    opportunity_reference VARCHAR(100) NOT NULL UNIQUE,
    enquiry_id BIGINT UNSIGNED NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    property_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'new',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    estimated_value DECIMAL(15, 2) NULL,
    estimated_currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    expected_decision_date DATE NULL,
    probability_percent DECIMAL(5, 2) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (enquiry_id) REFERENCES enquiry (enquiry_id),
    FOREIGN KEY (client_account_id) REFERENCES client_account (client_account_id),
    FOREIGN KEY (party_id) REFERENCES party (party_id),
    FOREIGN KEY (property_id) REFERENCES property (property_id),
    INDEX ix_opportunity_client_account (client_account_id)
);

CREATE TABLE IF NOT EXISTS proposal (
    proposal_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    proposal_reference VARCHAR(100) NOT NULL UNIQUE,
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
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (opportunity_id) REFERENCES opportunity (opportunity_id),
    FOREIGN KEY (client_account_id) REFERENCES client_account (client_account_id),
    FOREIGN KEY (party_id) REFERENCES party (party_id),
    INDEX ix_proposal_client_account (client_account_id)
);

CREATE TABLE IF NOT EXISTS proposal_line (
    proposal_line_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    proposal_id BIGINT UNSIGNED NOT NULL,
    line_number INT UNSIGNED NOT NULL,
    description TEXT NOT NULL,
    quantity DECIMAL(15, 4) NOT NULL DEFAULT 1.0000,
    unit_price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    net_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    gross_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (proposal_id) REFERENCES proposal (proposal_id),
    UNIQUE (proposal_id, line_number)
);

CREATE TABLE IF NOT EXISTS quotation (
    quotation_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quotation_reference VARCHAR(100) NOT NULL UNIQUE,
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
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (proposal_id) REFERENCES proposal (proposal_id),
    FOREIGN KEY (opportunity_id) REFERENCES opportunity (opportunity_id),
    FOREIGN KEY (client_account_id) REFERENCES client_account (client_account_id),
    FOREIGN KEY (party_id) REFERENCES party (party_id),
    INDEX ix_quotation_client_account (client_account_id)
);

CREATE TABLE IF NOT EXISTS tender (
    tender_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tender_reference VARCHAR(100) NOT NULL UNIQUE,
    opportunity_id BIGINT UNSIGNED NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'draft',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    submission_deadline TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (opportunity_id) REFERENCES opportunity (opportunity_id),
    FOREIGN KEY (client_account_id) REFERENCES client_account (client_account_id),
    FOREIGN KEY (party_id) REFERENCES party (party_id),
    INDEX ix_tender_client_account (client_account_id)
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
    FOREIGN KEY (changed_by) REFERENCES party (party_id),
    INDEX ix_commercial_status_history_object (object_type_code, object_id),
    INDEX ix_commercial_status_history_changed_at (changed_at)
);
