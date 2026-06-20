-- PBM v1 project-centric ERP: project container, services and assignments

CREATE TABLE IF NOT EXISTS competence (
    competence_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    competence_code VARCHAR(100) NOT NULL,
    competence_name VARCHAR(255) NOT NULL,
    competence_type_code VARCHAR(100) NULL,
    description TEXT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_competence_code (competence_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS person_competence (
    person_competence_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    person_entity_id BIGINT UNSIGNED NOT NULL,
    competence_id BIGINT UNSIGNED NOT NULL,
    valid_from DATE NULL,
    valid_to DATE NULL,
    certificate_reference VARCHAR(255) NULL,
    evidence_document_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_person_competence_person FOREIGN KEY (person_entity_id) REFERENCES person_entity (person_entity_id),
    CONSTRAINT fk_person_competence_competence FOREIGN KEY (competence_id) REFERENCES competence (competence_id),
    UNIQUE KEY uq_person_competence (person_entity_id, competence_id, valid_from)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS authority_limit (
    authority_limit_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    position_id BIGINT UNSIGNED NOT NULL,
    authority_type_code VARCHAR(100) NOT NULL,
    limit_amount DECIMAL(18,2) NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    business_function_id BIGINT UNSIGNED NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_authority_limit_position FOREIGN KEY (position_id) REFERENCES `position` (position_id),
    CONSTRAINT fk_authority_limit_function FOREIGN KEY (business_function_id) REFERENCES business_function (business_function_id),
    INDEX ix_authority_limit_position (position_id),
    INDEX ix_authority_limit_type (authority_type_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_catalogue (
    service_catalogue_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    business_function_id BIGINT UNSIGNED NULL,
    service_code VARCHAR(100) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    service_category_code VARCHAR(100) NULL,
    description TEXT NULL,
    default_unit_code VARCHAR(50) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_service_catalogue_function FOREIGN KEY (business_function_id) REFERENCES business_function (business_function_id),
    UNIQUE KEY uq_service_catalogue_code (service_code),
    INDEX ix_service_catalogue_category (service_category_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_required_competence (
    service_required_competence_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    service_catalogue_id BIGINT UNSIGNED NOT NULL,
    competence_id BIGINT UNSIGNED NOT NULL,
    is_mandatory BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_service_required_comp_service FOREIGN KEY (service_catalogue_id) REFERENCES service_catalogue (service_catalogue_id),
    CONSTRAINT fk_service_required_comp_competence FOREIGN KEY (competence_id) REFERENCES competence (competence_id),
    UNIQUE KEY uq_service_required_competence (service_catalogue_id, competence_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project (
    project_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_reference VARCHAR(100) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    project_type_code VARCHAR(100) NULL,
    project_state_code VARCHAR(100) NOT NULL DEFAULT 'enquiry',
    primary_client_business_partner_id BIGINT UNSIGNED NULL,
    enquiry_date DATE NULL,
    expected_start_date DATE NULL,
    expected_completion_date DATE NULL,
    actual_start_date DATE NULL,
    actual_completion_date DATE NULL,
    description TEXT NULL,
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_primary_client FOREIGN KEY (primary_client_business_partner_id) REFERENCES business_partner (business_partner_id),
    UNIQUE KEY uq_project_reference (project_reference),
    INDEX ix_project_state (project_state_code),
    INDEX ix_project_client (primary_client_business_partner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_status_history (
    project_status_history_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    from_state_code VARCHAR(100) NULL,
    to_state_code VARCHAR(100) NOT NULL,
    changed_by_person_id BIGINT UNSIGNED NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reason TEXT NULL,
    CONSTRAINT fk_project_status_history_project FOREIGN KEY (project_id) REFERENCES project (project_id),
    CONSTRAINT fk_project_status_history_person FOREIGN KEY (changed_by_person_id) REFERENCES person_entity (person_entity_id),
    INDEX ix_project_status_history_project (project_id),
    INDEX ix_project_status_history_changed_at (changed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_party (
    project_party_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    business_partner_id BIGINT UNSIGNED NOT NULL,
    project_role_code VARCHAR(100) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    valid_from DATE NULL,
    valid_to DATE NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_party_project FOREIGN KEY (project_id) REFERENCES project (project_id),
    CONSTRAINT fk_project_party_partner FOREIGN KEY (business_partner_id) REFERENCES business_partner (business_partner_id),
    UNIQUE KEY uq_project_party_role (project_id, business_partner_id, project_role_code),
    INDEX ix_project_party_project (project_id),
    INDEX ix_project_party_partner (business_partner_id),
    INDEX ix_project_party_role (project_role_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_contact (
    project_contact_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    business_partner_person_id BIGINT UNSIGNED NOT NULL,
    project_contact_role_code VARCHAR(100) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_contact_project FOREIGN KEY (project_id) REFERENCES project (project_id),
    CONSTRAINT fk_project_contact_bp_person FOREIGN KEY (business_partner_person_id) REFERENCES business_partner_person (business_partner_person_id),
    UNIQUE KEY uq_project_contact_role (project_id, business_partner_person_id, project_contact_role_code),
    INDEX ix_project_contact_project (project_id),
    INDEX ix_project_contact_bp_person (business_partner_person_id),
    INDEX ix_project_contact_role (project_contact_role_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_assignment (
    project_assignment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NULL,
    person_entity_id BIGINT UNSIGNED NULL,
    position_id BIGINT UNSIGNED NULL,
    project_role_code VARCHAR(100) NOT NULL,
    allocation_percent DECIMAL(9,4) NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_assignment_project FOREIGN KEY (project_id) REFERENCES project (project_id),
    CONSTRAINT fk_project_assignment_employee FOREIGN KEY (employee_id) REFERENCES employee (employee_id),
    CONSTRAINT fk_project_assignment_person FOREIGN KEY (person_entity_id) REFERENCES person_entity (person_entity_id),
    CONSTRAINT fk_project_assignment_position FOREIGN KEY (position_id) REFERENCES `position` (position_id),
    INDEX ix_project_assignment_project (project_id),
    INDEX ix_project_assignment_employee (employee_id),
    INDEX ix_project_assignment_person (person_entity_id),
    INDEX ix_project_assignment_position (position_id),
    INDEX ix_project_assignment_role (project_role_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_location (
    project_location_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    address_id BIGINT UNSIGNED NULL,
    location_name VARCHAR(255) NULL,
    location_type_code VARCHAR(100) NULL,
    description TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_location_project FOREIGN KEY (project_id) REFERENCES project (project_id),
    CONSTRAINT fk_project_location_address FOREIGN KEY (address_id) REFERENCES address (address_id),
    INDEX ix_project_location_project (project_id),
    INDEX ix_project_location_address (address_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_service (
    project_service_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    project_location_id BIGINT UNSIGNED NULL,
    service_catalogue_id BIGINT UNSIGNED NULL,
    service_description TEXT NOT NULL,
    quantity DECIMAL(18,4) NULL,
    unit_code VARCHAR(50) NULL,
    required_by_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'required',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_service_project FOREIGN KEY (project_id) REFERENCES project (project_id),
    CONSTRAINT fk_project_service_location FOREIGN KEY (project_location_id) REFERENCES project_location (project_location_id),
    CONSTRAINT fk_project_service_catalogue FOREIGN KEY (service_catalogue_id) REFERENCES service_catalogue (service_catalogue_id),
    INDEX ix_project_service_project (project_id),
    INDEX ix_project_service_location (project_location_id),
    INDEX ix_project_service_catalogue (service_catalogue_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_service_cost (
    project_service_cost_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_service_id BIGINT UNSIGNED NOT NULL,
    supplier_business_partner_id BIGINT UNSIGNED NULL,
    cost_source_code VARCHAR(100) NOT NULL,
    cost_description TEXT NULL,
    quantity DECIMAL(18,4) NULL,
    unit_code VARCHAR(50) NULL,
    unit_cost DECIMAL(18,4) NULL,
    total_cost DECIMAL(18,2) NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    status_code VARCHAR(100) NOT NULL DEFAULT 'draft',
    received_date DATE NULL,
    expiry_date DATE NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_service_cost_service FOREIGN KEY (project_service_id) REFERENCES project_service (project_service_id),
    CONSTRAINT fk_project_service_cost_supplier FOREIGN KEY (supplier_business_partner_id) REFERENCES business_partner (business_partner_id),
    INDEX ix_project_service_cost_service (project_service_id),
    INDEX ix_project_service_cost_supplier (supplier_business_partner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
