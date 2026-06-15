CREATE TABLE IF NOT EXISTS activity (
    activity_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    activity_reference VARCHAR(100) NOT NULL,
    activity_type_code VARCHAR(100) NOT NULL,
    activity_name VARCHAR(255) NOT NULL,
    description TEXT NULL,

    instruction_id BIGINT UNSIGNED NULL,
    project_id BIGINT UNSIGNED NULL,
    property_id BIGINT UNSIGNED NULL,

    lead_party_id BIGINT UNSIGNED NULL,
    workflow_instance_id BIGINT UNSIGNED NULL,

    planned_start_at TIMESTAMP NULL,
    planned_finish_at TIMESTAMP NULL,
    actual_start_at TIMESTAMP NULL,
    actual_finish_at TIMESTAMP NULL,

    status_code VARCHAR(100) NOT NULL DEFAULT 'PLANNED',
    priority_code VARCHAR(100) NOT NULL DEFAULT 'NORMAL',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_activity_instruction
        FOREIGN KEY (instruction_id)
        REFERENCES instruction (instruction_id),

    CONSTRAINT fk_activity_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id),

    CONSTRAINT fk_activity_property
        FOREIGN KEY (property_id)
        REFERENCES property (property_id),

    CONSTRAINT fk_activity_lead_party
        FOREIGN KEY (lead_party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_activity_workflow_instance
        FOREIGN KEY (workflow_instance_id)
        REFERENCES workflow_instance (workflow_instance_id),

    CONSTRAINT uq_activity_reference
        UNIQUE (activity_reference),

    INDEX ix_activity_type (activity_type_code),
    INDEX ix_activity_status (status_code),
    INDEX ix_activity_instruction (instruction_id),
    INDEX ix_activity_project (project_id),
    INDEX ix_activity_property (property_id)
);

CREATE TABLE IF NOT EXISTS activity_area (
    activity_area_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    activity_id BIGINT UNSIGNED NOT NULL,
    parent_activity_area_id BIGINT UNSIGNED NULL,

    area_code VARCHAR(100) NOT NULL,
    area_name VARCHAR(255) NOT NULL,
    area_type_code VARCHAR(100) NULL,
    description TEXT NULL,
    sort_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_activity_area_activity
        FOREIGN KEY (activity_id)
        REFERENCES activity (activity_id),

    CONSTRAINT fk_activity_area_parent
        FOREIGN KEY (parent_activity_area_id)
        REFERENCES activity_area (activity_area_id),

    CONSTRAINT uq_activity_area_code
        UNIQUE (activity_id, area_code),

    INDEX ix_activity_area_parent (parent_activity_area_id)
);

CREATE TABLE IF NOT EXISTS observation (
    observation_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    observation_reference VARCHAR(100) NOT NULL,
    activity_id BIGINT UNSIGNED NOT NULL,
    activity_area_id BIGINT UNSIGNED NULL,

    observation_type_code VARCHAR(100) NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'OPEN',
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,

    observed_at TIMESTAMP NULL,
    observed_by_party_id BIGINT UNSIGNED NULL,
    workflow_instance_id BIGINT UNSIGNED NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_observation_activity
        FOREIGN KEY (activity_id)
        REFERENCES activity (activity_id),

    CONSTRAINT fk_observation_activity_area
        FOREIGN KEY (activity_area_id)
        REFERENCES activity_area (activity_area_id),

    CONSTRAINT fk_observation_observed_by_party
        FOREIGN KEY (observed_by_party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_observation_workflow_instance
        FOREIGN KEY (workflow_instance_id)
        REFERENCES workflow_instance (workflow_instance_id),

    CONSTRAINT uq_observation_reference
        UNIQUE (observation_reference),

    INDEX ix_observation_activity (activity_id),
    INDEX ix_observation_area (activity_area_id),
    INDEX ix_observation_type (observation_type_code),
    INDEX ix_observation_status (status_code)
);

CREATE TABLE IF NOT EXISTS assessment (
    assessment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    assessment_reference VARCHAR(100) NOT NULL,
    observation_id BIGINT UNSIGNED NOT NULL,

    assessment_type_code VARCHAR(100) NOT NULL,
    severity_code VARCHAR(100) NULL,
    likelihood_code VARCHAR(100) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',

    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    conclusion TEXT NULL,

    assessed_at TIMESTAMP NULL,
    assessed_by_party_id BIGINT UNSIGNED NULL,
    workflow_instance_id BIGINT UNSIGNED NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_assessment_observation
        FOREIGN KEY (observation_id)
        REFERENCES observation (observation_id),

    CONSTRAINT fk_assessment_assessed_by_party
        FOREIGN KEY (assessed_by_party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_assessment_workflow_instance
        FOREIGN KEY (workflow_instance_id)
        REFERENCES workflow_instance (workflow_instance_id),

    CONSTRAINT uq_assessment_reference
        UNIQUE (assessment_reference),

    INDEX ix_assessment_observation (observation_id),
    INDEX ix_assessment_type (assessment_type_code),
    INDEX ix_assessment_severity (severity_code),
    INDEX ix_assessment_status (status_code)
);

CREATE TABLE IF NOT EXISTS action (
    action_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    action_reference VARCHAR(100) NOT NULL,
    assessment_id BIGINT UNSIGNED NOT NULL,

    action_type_code VARCHAR(100) NOT NULL,
    priority_code VARCHAR(100) NOT NULL DEFAULT 'NORMAL',
    status_code VARCHAR(100) NOT NULL DEFAULT 'OPEN',

    title VARCHAR(255) NOT NULL,
    description TEXT NULL,

    assigned_party_id BIGINT UNSIGNED NULL,
    due_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    workflow_instance_id BIGINT UNSIGNED NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_action_assessment
        FOREIGN KEY (assessment_id)
        REFERENCES assessment (assessment_id),

    CONSTRAINT fk_action_assigned_party
        FOREIGN KEY (assigned_party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_action_workflow_instance
        FOREIGN KEY (workflow_instance_id)
        REFERENCES workflow_instance (workflow_instance_id),

    CONSTRAINT uq_action_reference
        UNIQUE (action_reference),

    INDEX ix_action_assessment (assessment_id),
    INDEX ix_action_type (action_type_code),
    INDEX ix_action_status (status_code),
    INDEX ix_action_due_at (due_at)
);

CREATE TABLE IF NOT EXISTS outcome (
    outcome_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    outcome_reference VARCHAR(100) NOT NULL,
    action_id BIGINT UNSIGNED NULL,
    activity_id BIGINT UNSIGNED NULL,
    deliverable_id BIGINT UNSIGNED NULL,

    outcome_type_code VARCHAR(100) NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',

    title VARCHAR(255) NOT NULL,
    summary TEXT NULL,
    conclusion TEXT NULL,

    produced_at TIMESTAMP NULL,
    produced_by_party_id BIGINT UNSIGNED NULL,
    workflow_instance_id BIGINT UNSIGNED NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_outcome_action
        FOREIGN KEY (action_id)
        REFERENCES action (action_id),

    CONSTRAINT fk_outcome_activity
        FOREIGN KEY (activity_id)
        REFERENCES activity (activity_id),

    CONSTRAINT fk_outcome_deliverable
        FOREIGN KEY (deliverable_id)
        REFERENCES deliverable (deliverable_id),

    CONSTRAINT fk_outcome_produced_by_party
        FOREIGN KEY (produced_by_party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_outcome_workflow_instance
        FOREIGN KEY (workflow_instance_id)
        REFERENCES workflow_instance (workflow_instance_id),

    CONSTRAINT uq_outcome_reference
        UNIQUE (outcome_reference),

    INDEX ix_outcome_action (action_id),
    INDEX ix_outcome_activity (activity_id),
    INDEX ix_outcome_deliverable (deliverable_id),
    INDEX ix_outcome_type (outcome_type_code),
    INDEX ix_outcome_status (status_code)
);

CREATE TABLE IF NOT EXISTS outcome_revision (
    outcome_revision_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    outcome_id BIGINT UNSIGNED NOT NULL,
    revision_number INT NOT NULL,
    revision_code VARCHAR(100) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',

    document_reference VARCHAR(255) NULL,
    storage_reference VARCHAR(500) NULL,
    notes TEXT NULL,

    prepared_by_party_id BIGINT UNSIGNED NULL,
    reviewed_by_party_id BIGINT UNSIGNED NULL,
    approved_by_party_id BIGINT UNSIGNED NULL,

    prepared_at TIMESTAMP NULL,
    reviewed_at TIMESTAMP NULL,
    approved_at TIMESTAMP NULL,
    issued_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_outcome_revision_outcome
        FOREIGN KEY (outcome_id)
        REFERENCES outcome (outcome_id),

    CONSTRAINT fk_outcome_revision_prepared_by_party
        FOREIGN KEY (prepared_by_party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_outcome_revision_reviewed_by_party
        FOREIGN KEY (reviewed_by_party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_outcome_revision_approved_by_party
        FOREIGN KEY (approved_by_party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_outcome_revision_number
        UNIQUE (outcome_id, revision_number),

    INDEX ix_outcome_revision_status (status_code),
    INDEX ix_outcome_revision_issued_at (issued_at)
);

CREATE TABLE IF NOT EXISTS evidence_item (
    evidence_item_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    evidence_reference VARCHAR(100) NOT NULL,

    activity_id BIGINT UNSIGNED NULL,
    activity_area_id BIGINT UNSIGNED NULL,
    observation_id BIGINT UNSIGNED NULL,
    assessment_id BIGINT UNSIGNED NULL,
    action_id BIGINT UNSIGNED NULL,
    outcome_id BIGINT UNSIGNED NULL,

    evidence_type_code VARCHAR(100) NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',

    title VARCHAR(255) NULL,
    description TEXT NULL,
    file_name VARCHAR(255) NULL,
    mime_type VARCHAR(255) NULL,
    storage_reference VARCHAR(500) NULL,
    external_reference VARCHAR(255) NULL,

    captured_at TIMESTAMP NULL,
    captured_by_party_id BIGINT UNSIGNED NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_evidence_activity
        FOREIGN KEY (activity_id)
        REFERENCES activity (activity_id),

    CONSTRAINT fk_evidence_activity_area
        FOREIGN KEY (activity_area_id)
        REFERENCES activity_area (activity_area_id),

    CONSTRAINT fk_evidence_observation
        FOREIGN KEY (observation_id)
        REFERENCES observation (observation_id),

    CONSTRAINT fk_evidence_assessment
        FOREIGN KEY (assessment_id)
        REFERENCES assessment (assessment_id),

    CONSTRAINT fk_evidence_action
        FOREIGN KEY (action_id)
        REFERENCES action (action_id),

    CONSTRAINT fk_evidence_outcome
        FOREIGN KEY (outcome_id)
        REFERENCES outcome (outcome_id),

    CONSTRAINT fk_evidence_captured_by_party
        FOREIGN KEY (captured_by_party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_evidence_reference
        UNIQUE (evidence_reference),

    INDEX ix_evidence_activity (activity_id),
    INDEX ix_evidence_observation (observation_id),
    INDEX ix_evidence_assessment (assessment_id),
    INDEX ix_evidence_action (action_id),
    INDEX ix_evidence_outcome (outcome_id),
    INDEX ix_evidence_type (evidence_type_code),
    INDEX ix_evidence_status (status_code)
);