CREATE TABLE IF NOT EXISTS client_account (
    client_account_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_id BIGINT UNSIGNED NOT NULL,
    client_reference VARCHAR(100) NOT NULL,
    client_type_code VARCHAR(100) NOT NULL DEFAULT 'STANDARD',
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    onboarding_status_code VARCHAR(100) NOT NULL DEFAULT 'NEW',
    source_code VARCHAR(100) NULL,
    opened_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_client_account_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_client_account_reference
        UNIQUE (client_reference),

    CONSTRAINT uq_client_account_party
        UNIQUE (party_id)
);

CREATE TABLE IF NOT EXISTS instruction (
    instruction_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    instruction_reference VARCHAR(100) NOT NULL,
    client_account_id BIGINT UNSIGNED NOT NULL,
    instruction_type_code VARCHAR(100) NOT NULL,
    service_line_code VARCHAR(100) NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    priority_code VARCHAR(100) NOT NULL DEFAULT 'NORMAL',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    received_at TIMESTAMP NULL,
    accepted_at TIMESTAMP NULL,
    target_issue_date DATE NULL,
    closed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_instruction_client_account
        FOREIGN KEY (client_account_id)
        REFERENCES client_account (client_account_id),

    CONSTRAINT uq_instruction_reference
        UNIQUE (instruction_reference)
);

CREATE TABLE IF NOT EXISTS instruction_party_role (
    instruction_party_role_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    instruction_id BIGINT UNSIGNED NOT NULL,
    party_id BIGINT UNSIGNED NOT NULL,
    role_code VARCHAR(100) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    date_from DATE NULL,
    date_to DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_instruction_party_role_instruction
        FOREIGN KEY (instruction_id)
        REFERENCES instruction (instruction_id),

    CONSTRAINT fk_instruction_party_role_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_instruction_party_role
        UNIQUE (instruction_id, party_id, role_code, date_from)
);

CREATE TABLE IF NOT EXISTS instruction_property (
    instruction_property_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    instruction_id BIGINT UNSIGNED NOT NULL,
    property_id BIGINT UNSIGNED NOT NULL,
    relationship_type_code VARCHAR(100) NOT NULL DEFAULT 'SUBJECT_PROPERTY',
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_instruction_property_instruction
        FOREIGN KEY (instruction_id)
        REFERENCES instruction (instruction_id),

    CONSTRAINT fk_instruction_property_property
        FOREIGN KEY (property_id)
        REFERENCES property (property_id),

    CONSTRAINT uq_instruction_property_role
        UNIQUE (instruction_id, property_id, relationship_type_code)
);

CREATE TABLE IF NOT EXISTS project (
    project_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_reference VARCHAR(100) NOT NULL,
    project_type_code VARCHAR(100) NOT NULL DEFAULT 'DELIVERY',
    status_code VARCHAR(100) NOT NULL DEFAULT 'NEW',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    start_date DATE NULL,
    target_completion_date DATE NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_project_reference
        UNIQUE (project_reference)
);

CREATE TABLE IF NOT EXISTS project_instruction (
    project_instruction_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    instruction_id BIGINT UNSIGNED NOT NULL,
    relationship_type_code VARCHAR(100) NOT NULL DEFAULT 'DELIVERS',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_instruction_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id),

    CONSTRAINT fk_project_instruction_instruction
        FOREIGN KEY (instruction_id)
        REFERENCES instruction (instruction_id),

    CONSTRAINT uq_project_instruction
        UNIQUE (project_id, instruction_id, relationship_type_code)
);

CREATE TABLE IF NOT EXISTS deliverable (
    deliverable_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    instruction_id BIGINT UNSIGNED NULL,
    deliverable_reference VARCHAR(100) NOT NULL,
    deliverable_type_code VARCHAR(100) NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'PLANNED',
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    due_date DATE NULL,
    issued_at TIMESTAMP NULL,
    accepted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_deliverable_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id),

    CONSTRAINT fk_deliverable_instruction
        FOREIGN KEY (instruction_id)
        REFERENCES instruction (instruction_id),

    CONSTRAINT uq_deliverable_reference
        UNIQUE (deliverable_reference)
);

CREATE TABLE IF NOT EXISTS fee_agreement (
    fee_agreement_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    instruction_id BIGINT UNSIGNED NOT NULL,
    fee_reference VARCHAR(100) NOT NULL,
    fee_type_code VARCHAR(100) NOT NULL DEFAULT 'FIXED_FEE',
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    net_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    gross_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    agreed_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_fee_agreement_instruction
        FOREIGN KEY (instruction_id)
        REFERENCES instruction (instruction_id),

    CONSTRAINT uq_fee_agreement_reference
        UNIQUE (fee_reference)
);

CREATE TABLE IF NOT EXISTS sales_invoice (
    sales_invoice_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_account_id BIGINT UNSIGNED NOT NULL,
    instruction_id BIGINT UNSIGNED NULL,
    project_id BIGINT UNSIGNED NULL,
    invoice_reference VARCHAR(100) NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    net_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    gross_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    invoice_date DATE NULL,
    due_date DATE NULL,
    issued_at TIMESTAMP NULL,
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_sales_invoice_client_account
        FOREIGN KEY (client_account_id)
        REFERENCES client_account (client_account_id),

    CONSTRAINT fk_sales_invoice_instruction
        FOREIGN KEY (instruction_id)
        REFERENCES instruction (instruction_id),

    CONSTRAINT fk_sales_invoice_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id),

    CONSTRAINT uq_sales_invoice_reference
        UNIQUE (invoice_reference)
);
