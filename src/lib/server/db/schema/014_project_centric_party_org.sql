-- PBM v1 project-centric ERP: party, organisation and HR core

CREATE TABLE IF NOT EXISTS business_entity (
    business_entity_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    legal_name VARCHAR(255) NOT NULL,
    trading_name VARCHAR(255) NULL,
    company_number VARCHAR(100) NULL,
    vat_number VARCHAR(100) NULL,
    tax_reference VARCHAR(100) NULL,
    industry_code VARCHAR(100) NULL,
    website VARCHAR(255) NULL,
    notes TEXT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_business_entity_company_number (company_number),
    INDEX ix_business_entity_legal_name (legal_name),
    INDEX ix_business_entity_trading_name (trading_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS person_entity (
    person_entity_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NOT NULL,
    known_as VARCHAR(100) NULL,
    date_of_birth DATE NULL,
    notes TEXT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX ix_person_entity_name (last_name, first_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS business_partner (
    business_partner_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    partner_type_code VARCHAR(50) NOT NULL,
    business_entity_id BIGINT UNSIGNED NULL,
    person_entity_id BIGINT UNSIGNED NULL,
    partner_name VARCHAR(255) NOT NULL,
    partner_reference VARCHAR(100) NULL,
    status_code VARCHAR(50) NOT NULL DEFAULT 'active',
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_business_partner_business FOREIGN KEY (business_entity_id) REFERENCES business_entity (business_entity_id),
    CONSTRAINT fk_business_partner_person FOREIGN KEY (person_entity_id) REFERENCES person_entity (person_entity_id),
    UNIQUE KEY uq_business_partner_reference (partner_reference),
    INDEX ix_business_partner_name (partner_name),
    INDEX ix_business_partner_status (status_code),
    INDEX ix_business_partner_type (partner_type_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS business_partner_role (
    business_partner_role_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    business_partner_id BIGINT UNSIGNED NOT NULL,
    role_code VARCHAR(100) NOT NULL,
    valid_from DATE NULL,
    valid_to DATE NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_business_partner_role_partner FOREIGN KEY (business_partner_id) REFERENCES business_partner (business_partner_id),
    UNIQUE KEY uq_business_partner_role (business_partner_id, role_code),
    INDEX ix_business_partner_role_code (role_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_method (
    contact_method_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    contact_type_code VARCHAR(50) NOT NULL,
    contact_value VARCHAR(255) NOT NULL,
    display_label VARCHAR(255) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX ix_contact_method_type (contact_type_code),
    INDEX ix_contact_method_value (contact_value)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS address (
    address_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255) NULL,
    address_line_3 VARCHAR(255) NULL,
    town_city VARCHAR(150) NULL,
    county_region VARCHAR(150) NULL,
    postcode VARCHAR(50) NULL,
    country_code VARCHAR(10) NULL DEFAULT 'GB',
    latitude DECIMAL(10, 7) NULL,
    longitude DECIMAL(10, 7) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX ix_address_postcode (postcode),
    INDEX ix_address_town_city (town_city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS business_partner_communication (
    business_partner_communication_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    business_partner_id BIGINT UNSIGNED NOT NULL,
    contact_method_id BIGINT UNSIGNED NULL,
    address_id BIGINT UNSIGNED NULL,
    communication_type_code VARCHAR(100) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    valid_from DATE NULL,
    valid_to DATE NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_business_partner_communication_partner FOREIGN KEY (business_partner_id) REFERENCES business_partner (business_partner_id),
    CONSTRAINT fk_business_partner_communication_contact FOREIGN KEY (contact_method_id) REFERENCES contact_method (contact_method_id),
    CONSTRAINT fk_business_partner_communication_address FOREIGN KEY (address_id) REFERENCES address (address_id),
    INDEX ix_bp_comm_partner (business_partner_id),
    INDEX ix_bp_comm_type (communication_type_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS business_partner_person (
    business_partner_person_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    business_partner_id BIGINT UNSIGNED NOT NULL,
    person_entity_id BIGINT UNSIGNED NOT NULL,
    job_title VARCHAR(255) NULL,
    department VARCHAR(255) NULL,
    role_code VARCHAR(100) NULL,
    is_primary_contact BOOLEAN NOT NULL DEFAULT FALSE,
    is_decision_maker BOOLEAN NOT NULL DEFAULT FALSE,
    is_accounts_contact BOOLEAN NOT NULL DEFAULT FALSE,
    is_project_contact BOOLEAN NOT NULL DEFAULT FALSE,
    is_site_contact BOOLEAN NOT NULL DEFAULT FALSE,
    valid_from DATE NULL,
    valid_to DATE NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_business_partner_person_partner FOREIGN KEY (business_partner_id) REFERENCES business_partner (business_partner_id),
    CONSTRAINT fk_business_partner_person_person FOREIGN KEY (person_entity_id) REFERENCES person_entity (person_entity_id),
    INDEX ix_bp_person_partner (business_partner_id),
    INDEX ix_bp_person_person (person_entity_id),
    INDEX ix_bp_person_role (role_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS business_function (
    business_function_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    parent_business_function_id BIGINT UNSIGNED NULL,
    function_code VARCHAR(100) NOT NULL,
    function_name VARCHAR(255) NOT NULL,
    function_level INT NOT NULL DEFAULT 1,
    description TEXT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_business_function_parent FOREIGN KEY (parent_business_function_id) REFERENCES business_function (business_function_id),
    UNIQUE KEY uq_business_function_code (function_code),
    INDEX ix_business_function_parent (parent_business_function_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS organisation_unit (
    organisation_unit_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    parent_organisation_unit_id BIGINT UNSIGNED NULL,
    business_function_id BIGINT UNSIGNED NULL,
    unit_code VARCHAR(100) NOT NULL,
    unit_name VARCHAR(255) NOT NULL,
    unit_type_code VARCHAR(100) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_organisation_unit_parent FOREIGN KEY (parent_organisation_unit_id) REFERENCES organisation_unit (organisation_unit_id),
    CONSTRAINT fk_organisation_unit_business_function FOREIGN KEY (business_function_id) REFERENCES business_function (business_function_id),
    UNIQUE KEY uq_organisation_unit_code (unit_code),
    INDEX ix_organisation_unit_parent (parent_organisation_unit_id),
    INDEX ix_organisation_unit_function (business_function_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `position` (
    position_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organisation_unit_id BIGINT UNSIGNED NOT NULL,
    business_function_id BIGINT UNSIGNED NULL,
    reports_to_position_id BIGINT UNSIGNED NULL,
    position_code VARCHAR(100) NULL,
    position_title VARCHAR(255) NOT NULL,
    position_type_code VARCHAR(100) NULL,
    is_manager BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_position_organisation_unit FOREIGN KEY (organisation_unit_id) REFERENCES organisation_unit (organisation_unit_id),
    CONSTRAINT fk_position_business_function FOREIGN KEY (business_function_id) REFERENCES business_function (business_function_id),
    CONSTRAINT fk_position_reports_to FOREIGN KEY (reports_to_position_id) REFERENCES `position` (position_id),
    UNIQUE KEY uq_position_code (position_code),
    INDEX ix_position_org_unit (organisation_unit_id),
    INDEX ix_position_function (business_function_id),
    INDEX ix_position_reports_to (reports_to_position_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS employee (
    employee_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    person_entity_id BIGINT UNSIGNED NOT NULL,
    employee_number VARCHAR(100) NOT NULL,
    employment_status_code VARCHAR(100) NOT NULL DEFAULT 'active',
    employment_type_code VARCHAR(100) NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    primary_organisation_unit_id BIGINT UNSIGNED NULL,
    primary_position_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_person FOREIGN KEY (person_entity_id) REFERENCES person_entity (person_entity_id),
    CONSTRAINT fk_employee_primary_org_unit FOREIGN KEY (primary_organisation_unit_id) REFERENCES organisation_unit (organisation_unit_id),
    CONSTRAINT fk_employee_primary_position FOREIGN KEY (primary_position_id) REFERENCES `position` (position_id),
    UNIQUE KEY uq_employee_number (employee_number),
    INDEX ix_employee_person (person_entity_id),
    INDEX ix_employee_status (employment_status_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS employee_position (
    employee_position_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    position_id BIGINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_position_employee FOREIGN KEY (employee_id) REFERENCES employee (employee_id),
    CONSTRAINT fk_employee_position_position FOREIGN KEY (position_id) REFERENCES `position` (position_id),
    INDEX ix_employee_position_employee (employee_id),
    INDEX ix_employee_position_position (position_id),
    INDEX ix_employee_position_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
