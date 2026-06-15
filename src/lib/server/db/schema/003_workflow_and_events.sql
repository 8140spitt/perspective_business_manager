CREATE TABLE IF NOT EXISTS workflow_definition (
    workflow_definition_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    workflow_code VARCHAR(100) NOT NULL,
    workflow_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    entity_type_code VARCHAR(100) NOT NULL,
    version_number INT NOT NULL DEFAULT 1,
    active_flag BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_workflow_definition_code_version
        UNIQUE (workflow_code, version_number)
);

CREATE TABLE IF NOT EXISTS workflow_state (
    workflow_state_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    workflow_definition_id BIGINT UNSIGNED NOT NULL,
    state_code VARCHAR(100) NOT NULL,
    state_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    is_initial BOOLEAN NOT NULL DEFAULT FALSE,
    is_terminal BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT NOT NULL DEFAULT 0,
    active_flag BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_workflow_state_definition
        FOREIGN KEY (workflow_definition_id)
        REFERENCES workflow_definition (workflow_definition_id),

    CONSTRAINT uq_workflow_state_code
        UNIQUE (workflow_definition_id, state_code)
);

CREATE TABLE IF NOT EXISTS workflow_transition (
    workflow_transition_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    workflow_definition_id BIGINT UNSIGNED NOT NULL,
    from_workflow_state_id BIGINT UNSIGNED NULL,
    to_workflow_state_id BIGINT UNSIGNED NOT NULL,
    transition_code VARCHAR(100) NOT NULL,
    transition_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    requires_note BOOLEAN NOT NULL DEFAULT FALSE,
    active_flag BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_workflow_transition_definition
        FOREIGN KEY (workflow_definition_id)
        REFERENCES workflow_definition (workflow_definition_id),

    CONSTRAINT fk_workflow_transition_from_state
        FOREIGN KEY (from_workflow_state_id)
        REFERENCES workflow_state (workflow_state_id),

    CONSTRAINT fk_workflow_transition_to_state
        FOREIGN KEY (to_workflow_state_id)
        REFERENCES workflow_state (workflow_state_id),

    CONSTRAINT uq_workflow_transition_code
        UNIQUE (workflow_definition_id, transition_code)
);

CREATE TABLE IF NOT EXISTS workflow_action (
    workflow_action_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    workflow_transition_id BIGINT UNSIGNED NOT NULL,
    action_code VARCHAR(100) NOT NULL,
    action_name VARCHAR(255) NOT NULL,
    action_type_code VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
    action_order INT NOT NULL DEFAULT 0,
    configuration_json JSON NULL,
    active_flag BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_workflow_action_transition
        FOREIGN KEY (workflow_transition_id)
        REFERENCES workflow_transition (workflow_transition_id),

    CONSTRAINT uq_workflow_action_code
        UNIQUE (workflow_transition_id, action_code)
);

CREATE TABLE IF NOT EXISTS workflow_instance (
    workflow_instance_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    workflow_definition_id BIGINT UNSIGNED NOT NULL,
    entity_type_code VARCHAR(100) NOT NULL,
    entity_id BIGINT UNSIGNED NOT NULL,
    instance_reference VARCHAR(100) NULL,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_workflow_instance_definition
        FOREIGN KEY (workflow_definition_id)
        REFERENCES workflow_definition (workflow_definition_id),

    CONSTRAINT uq_workflow_instance_entity
        UNIQUE (entity_type_code, entity_id, workflow_definition_id)
);

CREATE TABLE IF NOT EXISTS workflow_instance_state (
    workflow_instance_state_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    workflow_instance_id BIGINT UNSIGNED NOT NULL,
    workflow_state_id BIGINT UNSIGNED NOT NULL,
    entered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    entered_by_party_id BIGINT UNSIGNED NULL,
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_workflow_instance_state_instance
        FOREIGN KEY (workflow_instance_id)
        REFERENCES workflow_instance (workflow_instance_id),

    CONSTRAINT fk_workflow_instance_state_state
        FOREIGN KEY (workflow_state_id)
        REFERENCES workflow_state (workflow_state_id),

    CONSTRAINT fk_workflow_instance_state_party
        FOREIGN KEY (entered_by_party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_workflow_instance_state_current
        UNIQUE (workflow_instance_id)
);

CREATE TABLE IF NOT EXISTS business_event (
    business_event_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_reference VARCHAR(100) NULL,
    entity_type_code VARCHAR(100) NOT NULL,
    entity_id BIGINT UNSIGNED NOT NULL,
    event_type_code VARCHAR(100) NOT NULL,
    event_category_code VARCHAR(100) NOT NULL DEFAULT 'GENERAL',
    workflow_instance_id BIGINT UNSIGNED NULL,
    workflow_transition_id BIGINT UNSIGNED NULL,
    from_workflow_state_id BIGINT UNSIGNED NULL,
    to_workflow_state_id BIGINT UNSIGNED NULL,
    performed_by_party_id BIGINT UNSIGNED NULL,
    event_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT NULL,
    payload_json JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_business_event_workflow_instance
        FOREIGN KEY (workflow_instance_id)
        REFERENCES workflow_instance (workflow_instance_id),

    CONSTRAINT fk_business_event_transition
        FOREIGN KEY (workflow_transition_id)
        REFERENCES workflow_transition (workflow_transition_id),

    CONSTRAINT fk_business_event_from_state
        FOREIGN KEY (from_workflow_state_id)
        REFERENCES workflow_state (workflow_state_id),

    CONSTRAINT fk_business_event_to_state
        FOREIGN KEY (to_workflow_state_id)
        REFERENCES workflow_state (workflow_state_id),

    CONSTRAINT fk_business_event_performed_by_party
        FOREIGN KEY (performed_by_party_id)
        REFERENCES party (party_id),

    INDEX ix_business_event_entity (entity_type_code, entity_id),
    INDEX ix_business_event_type (event_type_code),
    INDEX ix_business_event_timestamp (event_timestamp),
    INDEX ix_business_event_workflow_instance (workflow_instance_id)
);