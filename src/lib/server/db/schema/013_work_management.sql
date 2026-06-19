CREATE TABLE IF NOT EXISTS work_container (
    work_container_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    work_container_reference VARCHAR(100) NOT NULL UNIQUE,
    work_container_type_code VARCHAR(100) NOT NULL,
    client_account_id BIGINT UNSIGNED NULL,
    party_id BIGINT UNSIGNED NULL,
    source_object_type_code VARCHAR(100) NULL,
    source_object_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'draft',
    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    planned_start_date DATE NULL,
    planned_end_date DATE NULL,
    actual_start_date DATE NULL,
    actual_end_date DATE NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_account_id) REFERENCES client_account (client_account_id),
    FOREIGN KEY (party_id) REFERENCES party (party_id),
    INDEX ix_work_container_client_account (client_account_id),
    INDEX ix_work_container_type_status (work_container_type_code, status_code),
    INDEX ix_work_container_source (source_object_type_code, source_object_id)
);

CREATE TABLE IF NOT EXISTS work_service_catalogue (
    work_service_catalogue_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    service_code VARCHAR(100) NOT NULL UNIQUE,
    service_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS work_container_service (
    work_container_service_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    work_container_id BIGINT UNSIGNED NOT NULL,
    service_code VARCHAR(100) NOT NULL,
    supplier_party_id BIGINT UNSIGNED NULL,
    supply_mode_code VARCHAR(100) NOT NULL DEFAULT 'internal',
    status_code VARCHAR(100) NOT NULL DEFAULT 'planned',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (work_container_id) REFERENCES work_container (work_container_id),
    FOREIGN KEY (service_code) REFERENCES work_service_catalogue (service_code),
    FOREIGN KEY (supplier_party_id) REFERENCES party (party_id),
    INDEX ix_work_container_service_container (work_container_id),
    INDEX ix_work_container_service_supplier (supplier_party_id)
);

CREATE TABLE IF NOT EXISTS work_instruction (
    work_instruction_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    work_instruction_reference VARCHAR(100) NOT NULL UNIQUE,
    work_container_id BIGINT UNSIGNED NOT NULL,
    instruction_type_code VARCHAR(100) NOT NULL DEFAULT 'service_instruction',
    service_code VARCHAR(100) NULL,
    supplier_party_id BIGINT UNSIGNED NULL,
    assigned_party_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'draft',
    title VARCHAR(255) NOT NULL,
    instruction_text TEXT NULL,
    due_date DATE NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (work_container_id) REFERENCES work_container (work_container_id),
    FOREIGN KEY (service_code) REFERENCES work_service_catalogue (service_code),
    FOREIGN KEY (supplier_party_id) REFERENCES party (party_id),
    FOREIGN KEY (assigned_party_id) REFERENCES party (party_id),
    INDEX ix_work_instruction_container (work_container_id),
    INDEX ix_work_instruction_status (status_code),
    INDEX ix_work_instruction_supplier (supplier_party_id)
);

CREATE TABLE IF NOT EXISTS work_status_history (
    work_status_history_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    object_type_code VARCHAR(100) NOT NULL,
    object_id BIGINT UNSIGNED NOT NULL,
    from_status_code VARCHAR(100) NULL,
    to_status_code VARCHAR(100) NOT NULL,
    reason TEXT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    changed_by BIGINT UNSIGNED NULL,
    FOREIGN KEY (changed_by) REFERENCES party (party_id),
    INDEX ix_work_status_history_object (object_type_code, object_id),
    INDEX ix_work_status_history_changed_at (changed_at)
);
