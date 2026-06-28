CREATE TABLE IF NOT EXISTS legal_entity (
    legal_entity_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_id BIGINT UNSIGNED NOT NULL UNIQUE,
    legal_entity_reference VARCHAR(100) NOT NULL UNIQUE,
    legal_name VARCHAR(255) NOT NULL,
    trading_name VARCHAR(255) NULL,
    tax_identifier VARCHAR(100) NULL,
    company_registration_number VARCHAR(100) NULL,
    website_url VARCHAR(255) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_legal_entity_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id)
);

CREATE TABLE IF NOT EXISTS business_location (
    business_location_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    legal_entity_id BIGINT UNSIGNED NOT NULL,
    address_id BIGINT UNSIGNED NULL,
    location_reference VARCHAR(100) NOT NULL UNIQUE,
    location_name VARCHAR(255) NOT NULL,
    location_type_code VARCHAR(100) NOT NULL DEFAULT 'OFFICE',
    city VARCHAR(150) NULL,
    country_code CHAR(2) NOT NULL DEFAULT 'GB',
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_business_location_legal_entity
        FOREIGN KEY (legal_entity_id)
        REFERENCES legal_entity (legal_entity_id),

    CONSTRAINT fk_business_location_address
        FOREIGN KEY (address_id)
        REFERENCES address (address_id),

    INDEX ix_business_location_legal_entity (legal_entity_id),
    INDEX ix_business_location_status (status_code)
);

CREATE TABLE IF NOT EXISTS organisation_unit (
    organisation_unit_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    legal_entity_id BIGINT UNSIGNED NOT NULL,
    parent_organisation_unit_id BIGINT UNSIGNED NULL,
    business_location_id BIGINT UNSIGNED NULL,
    organisation_unit_reference VARCHAR(100) NOT NULL UNIQUE,
    organisation_unit_name VARCHAR(255) NOT NULL,
    organisation_unit_type_code VARCHAR(100) NOT NULL DEFAULT 'DEPARTMENT',
    cost_centre_code VARCHAR(100) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_organisation_unit_legal_entity
        FOREIGN KEY (legal_entity_id)
        REFERENCES legal_entity (legal_entity_id),

    CONSTRAINT fk_organisation_unit_parent
        FOREIGN KEY (parent_organisation_unit_id)
        REFERENCES organisation_unit (organisation_unit_id),

    CONSTRAINT fk_organisation_unit_location
        FOREIGN KEY (business_location_id)
        REFERENCES business_location (business_location_id),

    INDEX ix_organisation_unit_legal_entity (legal_entity_id),
    INDEX ix_organisation_unit_parent (parent_organisation_unit_id),
    INDEX ix_organisation_unit_status (status_code)
);

CREATE TABLE IF NOT EXISTS grade (
    grade_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    grade_code VARCHAR(100) NOT NULL UNIQUE,
    grade_name VARCHAR(255) NOT NULL,
    minimum_salary DECIMAL(15, 2) NULL,
    maximum_salary DECIMAL(15, 2) NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_role (
    job_role_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    job_role_code VARCHAR(100) NOT NULL UNIQUE,
    job_title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    grade_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_job_role_grade
        FOREIGN KEY (grade_id)
        REFERENCES grade (grade_id),

    INDEX ix_job_role_grade (grade_id),
    INDEX ix_job_role_status (status_code)
);

CREATE TABLE IF NOT EXISTS workforce_position (
    workforce_position_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    position_reference VARCHAR(100) NOT NULL UNIQUE,
    position_title VARCHAR(255) NOT NULL,
    job_role_id BIGINT UNSIGNED NOT NULL,
    organisation_unit_id BIGINT UNSIGNED NOT NULL,
    business_location_id BIGINT UNSIGNED NULL,
    reports_to_position_id BIGINT UNSIGNED NULL,
    headcount_budget DECIMAL(8, 2) NOT NULL DEFAULT 1.00,
    position_status_code VARCHAR(100) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_workforce_position_job_role
        FOREIGN KEY (job_role_id)
        REFERENCES job_role (job_role_id),

    CONSTRAINT fk_workforce_position_org_unit
        FOREIGN KEY (organisation_unit_id)
        REFERENCES organisation_unit (organisation_unit_id),

    CONSTRAINT fk_workforce_position_location
        FOREIGN KEY (business_location_id)
        REFERENCES business_location (business_location_id),

    CONSTRAINT fk_workforce_position_reports_to
        FOREIGN KEY (reports_to_position_id)
        REFERENCES workforce_position (workforce_position_id),

    INDEX ix_workforce_position_job_role (job_role_id),
    INDEX ix_workforce_position_org_unit (organisation_unit_id),
    INDEX ix_workforce_position_reports_to (reports_to_position_id),
    INDEX ix_workforce_position_status (position_status_code)
);

CREATE TABLE IF NOT EXISTS employee (
    employee_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    person_id BIGINT UNSIGNED NOT NULL UNIQUE,
    employee_number VARCHAR(100) NOT NULL UNIQUE,
    hire_date DATE NOT NULL,
    employment_status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    worker_type_code VARCHAR(100) NOT NULL DEFAULT 'EMPLOYEE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_person
        FOREIGN KEY (person_id)
        REFERENCES person (person_id),

    INDEX ix_employee_status (employment_status_code),
    INDEX ix_employee_worker_type (worker_type_code)
);

CREATE TABLE IF NOT EXISTS employment (
    employment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    legal_entity_id BIGINT UNSIGNED NOT NULL,
    organisation_unit_id BIGINT UNSIGNED NULL,
    employment_reference VARCHAR(100) NOT NULL UNIQUE,
    employment_type_code VARCHAR(100) NOT NULL DEFAULT 'PERMANENT',
    start_date DATE NOT NULL,
    end_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employment_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_employment_legal_entity
        FOREIGN KEY (legal_entity_id)
        REFERENCES legal_entity (legal_entity_id),

    CONSTRAINT fk_employment_org_unit
        FOREIGN KEY (organisation_unit_id)
        REFERENCES organisation_unit (organisation_unit_id),

    INDEX ix_employment_employee (employee_id),
    INDEX ix_employment_legal_entity (legal_entity_id),
    INDEX ix_employment_status (status_code)
);

CREATE TABLE IF NOT EXISTS employment_contract (
    employment_contract_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employment_id BIGINT UNSIGNED NOT NULL,
    contract_reference VARCHAR(100) NOT NULL UNIQUE,
    contract_type_code VARCHAR(100) NOT NULL DEFAULT 'STANDARD',
    salary_basis_code VARCHAR(100) NOT NULL DEFAULT 'ANNUAL',
    contracted_hours_per_week DECIMAL(6, 2) NULL,
    annual_salary DECIMAL(15, 2) NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    start_date DATE NOT NULL,
    end_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employment_contract_employment
        FOREIGN KEY (employment_id)
        REFERENCES employment (employment_id),

    INDEX ix_employment_contract_employment (employment_id),
    INDEX ix_employment_contract_status (status_code)
);

CREATE TABLE IF NOT EXISTS position_assignment (
    position_assignment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    workforce_position_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    assignment_type_code VARCHAR(100) NOT NULL DEFAULT 'PRIMARY',
    allocation_percentage DECIMAL(5, 2) NOT NULL DEFAULT 100.00,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_position_assignment_position
        FOREIGN KEY (workforce_position_id)
        REFERENCES workforce_position (workforce_position_id),

    CONSTRAINT fk_position_assignment_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT uq_position_assignment_period
        UNIQUE (workforce_position_id, employee_id, start_date),

    INDEX ix_position_assignment_employee (employee_id),
    INDEX ix_position_assignment_status (status_code)
);

CREATE TABLE IF NOT EXISTS candidate (
    candidate_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    person_id BIGINT UNSIGNED NOT NULL UNIQUE,
    candidate_reference VARCHAR(100) NOT NULL UNIQUE,
    source_code VARCHAR(100) NULL,
    resume_url VARCHAR(500) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'NEW',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_candidate_person
        FOREIGN KEY (person_id)
        REFERENCES person (person_id),

    INDEX ix_candidate_status (status_code)
);

CREATE TABLE IF NOT EXISTS job_opening (
    job_opening_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    opening_reference VARCHAR(100) NOT NULL UNIQUE,
    workforce_position_id BIGINT UNSIGNED NULL,
    job_role_id BIGINT UNSIGNED NOT NULL,
    organisation_unit_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    posted_date DATE NULL,
    closing_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_job_opening_position
        FOREIGN KEY (workforce_position_id)
        REFERENCES workforce_position (workforce_position_id),

    CONSTRAINT fk_job_opening_job_role
        FOREIGN KEY (job_role_id)
        REFERENCES job_role (job_role_id),

    CONSTRAINT fk_job_opening_org_unit
        FOREIGN KEY (organisation_unit_id)
        REFERENCES organisation_unit (organisation_unit_id),

    INDEX ix_job_opening_position (workforce_position_id),
    INDEX ix_job_opening_status (status_code)
);

CREATE TABLE IF NOT EXISTS job_application (
    job_application_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    job_opening_id BIGINT UNSIGNED NOT NULL,
    candidate_id BIGINT UNSIGNED NOT NULL,
    applied_date DATE NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'SUBMITTED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_job_application_opening
        FOREIGN KEY (job_opening_id)
        REFERENCES job_opening (job_opening_id),

    CONSTRAINT fk_job_application_candidate
        FOREIGN KEY (candidate_id)
        REFERENCES candidate (candidate_id),

    CONSTRAINT uq_job_application_candidate
        UNIQUE (job_opening_id, candidate_id),

    INDEX ix_job_application_status (status_code)
);

CREATE TABLE IF NOT EXISTS interview (
    interview_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    job_application_id BIGINT UNSIGNED NOT NULL,
    interviewer_employee_id BIGINT UNSIGNED NULL,
    scheduled_at TIMESTAMP NOT NULL,
    interview_type_code VARCHAR(100) NOT NULL DEFAULT 'FIRST_STAGE',
    status_code VARCHAR(100) NOT NULL DEFAULT 'SCHEDULED',
    feedback TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_interview_application
        FOREIGN KEY (job_application_id)
        REFERENCES job_application (job_application_id),

    CONSTRAINT fk_interview_interviewer
        FOREIGN KEY (interviewer_employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_interview_application (job_application_id),
    INDEX ix_interview_scheduled_at (scheduled_at),
    INDEX ix_interview_status (status_code)
);

CREATE TABLE IF NOT EXISTS employment_offer (
    employment_offer_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    job_application_id BIGINT UNSIGNED NOT NULL,
    offer_reference VARCHAR(100) NOT NULL UNIQUE,
    offered_salary DECIMAL(15, 2) NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    proposed_start_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    offered_at TIMESTAMP NULL,
    accepted_at TIMESTAMP NULL,
    declined_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employment_offer_application
        FOREIGN KEY (job_application_id)
        REFERENCES job_application (job_application_id),

    INDEX ix_employment_offer_application (job_application_id),
    INDEX ix_employment_offer_status (status_code)
);

CREATE TABLE IF NOT EXISTS employee_emergency_contact (
    employee_emergency_contact_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    relationship_code VARCHAR(100) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email_address VARCHAR(255) NULL,
    priority_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_emergency_contact_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_employee_emergency_contact_employee (employee_id)
);

CREATE TABLE IF NOT EXISTS employee_dependent (
    employee_dependent_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    dependent_name VARCHAR(255) NOT NULL,
    relationship_code VARCHAR(100) NOT NULL,
    birth_date DATE NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_dependent_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_employee_dependent_employee (employee_id)
);

CREATE TABLE IF NOT EXISTS employee_document (
    employee_document_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    document_type_code VARCHAR(100) NOT NULL,
    document_reference VARCHAR(255) NOT NULL,
    issue_date DATE NULL,
    expiry_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_document_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_employee_document_employee (employee_id),
    INDEX ix_employee_document_expiry (expiry_date)
);

CREATE TABLE IF NOT EXISTS skill (
    skill_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    skill_code VARCHAR(100) NOT NULL UNIQUE,
    skill_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS competency (
    competency_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    competency_code VARCHAR(100) NOT NULL UNIQUE,
    competency_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS competency_level (
    competency_level_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    competency_level_code VARCHAR(100) NOT NULL UNIQUE,
    competency_level_name VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    description TEXT NULL,
    active_flag BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS person_skill (
    person_skill_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    person_id BIGINT UNSIGNED NOT NULL,
    skill_id BIGINT UNSIGNED NOT NULL,
    years_of_experience DECIMAL(5, 2) NULL,
    evidence_notes TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_person_skill_person
        FOREIGN KEY (person_id)
        REFERENCES person (person_id),

    CONSTRAINT fk_person_skill_skill
        FOREIGN KEY (skill_id)
        REFERENCES skill (skill_id),

    CONSTRAINT uq_person_skill
        UNIQUE (person_id, skill_id),

    INDEX ix_person_skill_skill (skill_id)
);

CREATE TABLE IF NOT EXISTS person_competency (
    person_competency_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    person_id BIGINT UNSIGNED NOT NULL,
    competency_id BIGINT UNSIGNED NOT NULL,
    competency_level_id BIGINT UNSIGNED NULL,
    assessed_by_employee_id BIGINT UNSIGNED NULL,
    assessed_date DATE NULL,
    expiry_date DATE NULL,
    evidence_notes TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_person_competency_person
        FOREIGN KEY (person_id)
        REFERENCES person (person_id),

    CONSTRAINT fk_person_competency_competency
        FOREIGN KEY (competency_id)
        REFERENCES competency (competency_id),

    CONSTRAINT fk_person_competency_level
        FOREIGN KEY (competency_level_id)
        REFERENCES competency_level (competency_level_id),

    CONSTRAINT fk_person_competency_assessor
        FOREIGN KEY (assessed_by_employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT uq_person_competency
        UNIQUE (person_id, competency_id),

    INDEX ix_person_competency_competency (competency_id),
    INDEX ix_person_competency_expiry (expiry_date)
);

CREATE TABLE IF NOT EXISTS certification (
    certification_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    certification_code VARCHAR(100) NOT NULL UNIQUE,
    certification_name VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NULL,
    description TEXT NULL,
    expiry_required_flag BOOLEAN NOT NULL DEFAULT FALSE,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS person_certification (
    person_certification_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    person_id BIGINT UNSIGNED NOT NULL,
    certification_id BIGINT UNSIGNED NOT NULL,
    certificate_reference VARCHAR(255) NULL,
    issue_date DATE NULL,
    expiry_date DATE NULL,
    evidence_notes TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_person_certification_person
        FOREIGN KEY (person_id)
        REFERENCES person (person_id),

    CONSTRAINT fk_person_certification_certification
        FOREIGN KEY (certification_id)
        REFERENCES certification (certification_id),

    CONSTRAINT uq_person_certification
        UNIQUE (person_id, certification_id, issue_date),

    INDEX ix_person_certification_expiry (expiry_date)
);

CREATE TABLE IF NOT EXISTS training (
    training_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    training_code VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    provider VARCHAR(255) NULL,
    duration_hours DECIMAL(8, 2) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS training_enrollment (
    training_enrollment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    training_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    enrollment_date DATE NOT NULL,
    completion_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ENROLLED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_training_enrollment_training
        FOREIGN KEY (training_id)
        REFERENCES training (training_id),

    CONSTRAINT fk_training_enrollment_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT uq_training_enrollment
        UNIQUE (training_id, employee_id, enrollment_date),

    INDEX ix_training_enrollment_employee (employee_id),
    INDEX ix_training_enrollment_status (status_code)
);

CREATE TABLE IF NOT EXISTS work_pattern (
    work_pattern_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    work_pattern_code VARCHAR(100) NOT NULL UNIQUE,
    work_pattern_name VARCHAR(255) NOT NULL,
    weekly_hours DECIMAL(6, 2) NOT NULL,
    working_days_per_week DECIMAL(4, 2) NULL,
    description TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_work_pattern (
    employee_work_pattern_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    work_pattern_id BIGINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_work_pattern_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_employee_work_pattern_pattern
        FOREIGN KEY (work_pattern_id)
        REFERENCES work_pattern (work_pattern_id),

    CONSTRAINT uq_employee_work_pattern_period
        UNIQUE (employee_id, work_pattern_id, start_date),

    INDEX ix_employee_work_pattern_employee (employee_id)
);

CREATE TABLE IF NOT EXISTS leave_type (
    leave_type_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    leave_type_code VARCHAR(100) NOT NULL UNIQUE,
    leave_type_name VARCHAR(255) NOT NULL,
    paid_flag BOOLEAN NOT NULL DEFAULT TRUE,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leave_policy (
    leave_policy_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    legal_entity_id BIGINT UNSIGNED NOT NULL,
    leave_type_id BIGINT UNSIGNED NOT NULL,
    policy_name VARCHAR(255) NOT NULL,
    default_annual_days DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
    carry_forward_allowed_flag BOOLEAN NOT NULL DEFAULT FALSE,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_leave_policy_legal_entity
        FOREIGN KEY (legal_entity_id)
        REFERENCES legal_entity (legal_entity_id),

    CONSTRAINT fk_leave_policy_type
        FOREIGN KEY (leave_type_id)
        REFERENCES leave_type (leave_type_id),

    CONSTRAINT uq_leave_policy
        UNIQUE (legal_entity_id, leave_type_id, policy_name),

    INDEX ix_leave_policy_legal_entity (legal_entity_id)
);

CREATE TABLE IF NOT EXISTS leave_allocation (
    leave_allocation_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    leave_type_id BIGINT UNSIGNED NOT NULL,
    allocation_year INT NOT NULL,
    allocated_days DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
    carried_forward_days DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
    used_days DECIMAL(6, 2) NOT NULL DEFAULT 0.00,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_leave_allocation_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_leave_allocation_type
        FOREIGN KEY (leave_type_id)
        REFERENCES leave_type (leave_type_id),

    CONSTRAINT uq_leave_allocation
        UNIQUE (employee_id, leave_type_id, allocation_year),

    INDEX ix_leave_allocation_year (allocation_year)
);

CREATE TABLE IF NOT EXISTS leave_request (
    leave_request_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    leave_type_id BIGINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    requested_days DECIMAL(6, 2) NOT NULL,
    reason TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'SUBMITTED',
    approved_by_employee_id BIGINT UNSIGNED NULL,
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_leave_request_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_leave_request_type
        FOREIGN KEY (leave_type_id)
        REFERENCES leave_type (leave_type_id),

    CONSTRAINT fk_leave_request_approver
        FOREIGN KEY (approved_by_employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_leave_request_employee (employee_id),
    INDEX ix_leave_request_dates (start_date, end_date),
    INDEX ix_leave_request_status (status_code)
);

CREATE TABLE IF NOT EXISTS absence (
    absence_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    absence_type_code VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    absence_days DECIMAL(6, 2) NULL,
    source_leave_request_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'RECORDED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_absence_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_absence_leave_request
        FOREIGN KEY (source_leave_request_id)
        REFERENCES leave_request (leave_request_id),

    INDEX ix_absence_employee (employee_id),
    INDEX ix_absence_dates (start_date, end_date),
    INDEX ix_absence_status (status_code)
);

CREATE TABLE IF NOT EXISTS attendance_event (
    attendance_event_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    event_date DATE NOT NULL,
    clock_in_at TIMESTAMP NULL,
    clock_out_at TIMESTAMP NULL,
    attendance_status_code VARCHAR(100) NOT NULL DEFAULT 'RECORDED',
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_event_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_attendance_event_employee_date (employee_id, event_date),
    INDEX ix_attendance_event_status (attendance_status_code)
);

CREATE TABLE IF NOT EXISTS resource_assignment (
    resource_assignment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    project_id BIGINT UNSIGNED NULL,
    work_container_id BIGINT UNSIGNED NULL,
    assignment_role_code VARCHAR(100) NOT NULL DEFAULT 'RESOURCE',
    planned_start_date DATE NOT NULL,
    planned_end_date DATE NULL,
    planned_hours DECIMAL(10, 2) NULL,
    allocation_percentage DECIMAL(5, 2) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'PLANNED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_resource_assignment_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_resource_assignment_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id),

    CONSTRAINT fk_resource_assignment_work_container
        FOREIGN KEY (work_container_id)
        REFERENCES work_container (work_container_id),

    INDEX ix_resource_assignment_employee (employee_id),
    INDEX ix_resource_assignment_project (project_id),
    INDEX ix_resource_assignment_work_container (work_container_id),
    INDEX ix_resource_assignment_dates (planned_start_date, planned_end_date),
    INDEX ix_resource_assignment_status (status_code)
);

CREATE TABLE IF NOT EXISTS timesheet (
    timesheet_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    submitted_at TIMESTAMP NULL,
    approved_by_employee_id BIGINT UNSIGNED NULL,
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_timesheet_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_timesheet_approver
        FOREIGN KEY (approved_by_employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT uq_timesheet_period
        UNIQUE (employee_id, period_start_date, period_end_date),

    INDEX ix_timesheet_status (status_code)
);

CREATE TABLE IF NOT EXISTS timesheet_line (
    timesheet_line_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    timesheet_id BIGINT UNSIGNED NOT NULL,
    project_id BIGINT UNSIGNED NULL,
    work_container_id BIGINT UNSIGNED NULL,
    work_date DATE NOT NULL,
    hours DECIMAL(8, 2) NOT NULL,
    chargeable_flag BOOLEAN NOT NULL DEFAULT FALSE,
    activity_code VARCHAR(100) NULL,
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_timesheet_line_timesheet
        FOREIGN KEY (timesheet_id)
        REFERENCES timesheet (timesheet_id),

    CONSTRAINT fk_timesheet_line_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id),

    CONSTRAINT fk_timesheet_line_work_container
        FOREIGN KEY (work_container_id)
        REFERENCES work_container (work_container_id),

    INDEX ix_timesheet_line_timesheet (timesheet_id),
    INDEX ix_timesheet_line_project (project_id),
    INDEX ix_timesheet_line_work_date (work_date)
);

CREATE TABLE IF NOT EXISTS salary_component (
    salary_component_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    component_code VARCHAR(100) NOT NULL UNIQUE,
    component_name VARCHAR(255) NOT NULL,
    component_type_code VARCHAR(100) NOT NULL DEFAULT 'EARNING',
    description TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_salary_component (
    employee_salary_component_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    salary_component_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    effective_from DATE NOT NULL,
    effective_to DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_salary_component_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_employee_salary_component_component
        FOREIGN KEY (salary_component_id)
        REFERENCES salary_component (salary_component_id),

    CONSTRAINT uq_employee_salary_component
        UNIQUE (employee_id, salary_component_id, effective_from),

    INDEX ix_employee_salary_component_employee (employee_id)
);

CREATE TABLE IF NOT EXISTS benefit (
    benefit_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    benefit_code VARCHAR(100) NOT NULL UNIQUE,
    benefit_name VARCHAR(255) NOT NULL,
    benefit_type_code VARCHAR(100) NOT NULL,
    description TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_benefit (
    employee_benefit_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    benefit_id BIGINT UNSIGNED NOT NULL,
    enrollment_date DATE NOT NULL,
    end_date DATE NULL,
    premium_amount DECIMAL(15, 2) NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_benefit_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_employee_benefit_benefit
        FOREIGN KEY (benefit_id)
        REFERENCES benefit (benefit_id),

    CONSTRAINT uq_employee_benefit
        UNIQUE (employee_id, benefit_id, enrollment_date),

    INDEX ix_employee_benefit_employee (employee_id)
);

CREATE TABLE IF NOT EXISTS payroll_run (
    payroll_run_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    legal_entity_id BIGINT UNSIGNED NOT NULL,
    payroll_reference VARCHAR(100) NOT NULL UNIQUE,
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    payment_date DATE NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payroll_run_legal_entity
        FOREIGN KEY (legal_entity_id)
        REFERENCES legal_entity (legal_entity_id),

    INDEX ix_payroll_run_legal_entity (legal_entity_id),
    INDEX ix_payroll_run_period (period_start_date, period_end_date),
    INDEX ix_payroll_run_status (status_code)
);

CREATE TABLE IF NOT EXISTS payslip (
    payslip_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    payroll_run_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    gross_pay DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    deductions DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    net_pay DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payslip_payroll_run
        FOREIGN KEY (payroll_run_id)
        REFERENCES payroll_run (payroll_run_id),

    CONSTRAINT fk_payslip_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT uq_payslip_employee_run
        UNIQUE (payroll_run_id, employee_id),

    INDEX ix_payslip_employee (employee_id),
    INDEX ix_payslip_status (status_code)
);

CREATE TABLE IF NOT EXISTS payslip_line (
    payslip_line_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    payslip_id BIGINT UNSIGNED NOT NULL,
    salary_component_id BIGINT UNSIGNED NOT NULL,
    line_type_code VARCHAR(100) NOT NULL DEFAULT 'EARNING',
    amount DECIMAL(15, 2) NOT NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'GBP',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payslip_line_payslip
        FOREIGN KEY (payslip_id)
        REFERENCES payslip (payslip_id),

    CONSTRAINT fk_payslip_line_component
        FOREIGN KEY (salary_component_id)
        REFERENCES salary_component (salary_component_id),

    INDEX ix_payslip_line_payslip (payslip_id)
);

CREATE TABLE IF NOT EXISTS performance_review (
    performance_review_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    reviewer_employee_id BIGINT UNSIGNED NULL,
    review_period_start_date DATE NULL,
    review_period_end_date DATE NULL,
    review_date DATE NOT NULL,
    rating_code VARCHAR(100) NULL,
    feedback TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_performance_review_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_performance_review_reviewer
        FOREIGN KEY (reviewer_employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_performance_review_employee (employee_id),
    INDEX ix_performance_review_date (review_date),
    INDEX ix_performance_review_status (status_code)
);

CREATE TABLE IF NOT EXISTS review_goal (
    review_goal_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    performance_review_id BIGINT UNSIGNED NOT NULL,
    goal_description TEXT NOT NULL,
    target_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_goal_review
        FOREIGN KEY (performance_review_id)
        REFERENCES performance_review (performance_review_id),

    INDEX ix_review_goal_review (performance_review_id),
    INDEX ix_review_goal_status (status_code)
);

CREATE TABLE IF NOT EXISTS development_plan (
    development_plan_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    plan_reference VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    start_date DATE NULL,
    target_completion_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_development_plan_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_development_plan_employee (employee_id),
    INDEX ix_development_plan_status (status_code)
);

CREATE TABLE IF NOT EXISTS equipment (
    equipment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    equipment_reference VARCHAR(100) NOT NULL UNIQUE,
    equipment_name VARCHAR(255) NOT NULL,
    serial_number VARCHAR(255) NULL,
    equipment_type_code VARCHAR(100) NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    INDEX ix_equipment_status (status_code),
    INDEX ix_equipment_type (equipment_type_code)
);

CREATE TABLE IF NOT EXISTS equipment_assignment (
    equipment_assignment_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    equipment_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    assigned_date DATE NOT NULL,
    returned_date DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ASSIGNED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_equipment_assignment_equipment
        FOREIGN KEY (equipment_id)
        REFERENCES equipment (equipment_id),

    CONSTRAINT fk_equipment_assignment_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_equipment_assignment_equipment (equipment_id),
    INDEX ix_equipment_assignment_employee (employee_id),
    INDEX ix_equipment_assignment_status (status_code)
);

CREATE TABLE IF NOT EXISTS onboarding_task (
    onboarding_task_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    task_description TEXT NULL,
    due_date DATE NULL,
    assigned_to_employee_id BIGINT UNSIGNED NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_onboarding_task_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_onboarding_task_assigned_to
        FOREIGN KEY (assigned_to_employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_onboarding_task_employee (employee_id),
    INDEX ix_onboarding_task_due_date (due_date),
    INDEX ix_onboarding_task_status (status_code)
);

CREATE TABLE IF NOT EXISTS system_access_request (
    system_access_request_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT UNSIGNED NOT NULL,
    requested_by_employee_id BIGINT UNSIGNED NULL,
    system_name VARCHAR(255) NOT NULL,
    access_role_code VARCHAR(100) NOT NULL,
    reason TEXT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'REQUESTED',
    requested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_system_access_request_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),

    CONSTRAINT fk_system_access_request_requested_by
        FOREIGN KEY (requested_by_employee_id)
        REFERENCES employee (employee_id),

    INDEX ix_system_access_request_employee (employee_id),
    INDEX ix_system_access_request_status (status_code)
);
