CREATE TABLE IF NOT EXISTS ref_code_set (
    code_set_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code_set_key VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    active_flag BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ref_code_value (
    code_value_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code_set_id BIGINT UNSIGNED NOT NULL,
    code_value VARCHAR(100) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    active_flag BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_ref_code_value_set
        FOREIGN KEY (code_set_id)
        REFERENCES ref_code_set (code_set_id),

    CONSTRAINT uq_ref_code_value
        UNIQUE (code_set_id, code_value)
);

CREATE TABLE IF NOT EXISTS party (
    party_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_type_code VARCHAR(100) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS person (
    person_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_id BIGINT UNSIGNED NOT NULL UNIQUE,
    title VARCHAR(50) NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_names VARCHAR(255) NULL,
    last_name VARCHAR(100) NOT NULL,
    preferred_name VARCHAR(100) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_person_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id)
);

CREATE TABLE IF NOT EXISTS organisation (
    organisation_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_id BIGINT UNSIGNED NOT NULL UNIQUE,
    organisation_name VARCHAR(255) NOT NULL,
    organisation_number VARCHAR(100) NULL,
    vat_number VARCHAR(100) NULL,
    organisation_type_code VARCHAR(100) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_organisation_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id)
);

CREATE TABLE IF NOT EXISTS party_role (
    party_role_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_id BIGINT UNSIGNED NOT NULL,
    role_code VARCHAR(100) NOT NULL,
    date_from DATE NULL,
    date_to DATE NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_party_role_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT uq_party_role_period
        UNIQUE (party_id, role_code, date_from)
);

CREATE TABLE IF NOT EXISTS address (
    address_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255) NULL,
    town_city VARCHAR(150) NULL,
    county_region VARCHAR(150) NULL,
    postcode VARCHAR(30) NULL,
    country_code CHAR(2) NOT NULL DEFAULT 'GB',
    uprn VARCHAR(100) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS party_address (
    party_address_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_id BIGINT UNSIGNED NOT NULL,
    address_id BIGINT UNSIGNED NOT NULL,
    address_type_code VARCHAR(100) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    date_from DATE NULL,
    date_to DATE NULL,

    CONSTRAINT fk_party_address_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_party_address_address
        FOREIGN KEY (address_id)
        REFERENCES address (address_id)
);

CREATE TABLE IF NOT EXISTS contact_method (
    contact_method_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    party_id BIGINT UNSIGNED NOT NULL,
    contact_type_code VARCHAR(100) NOT NULL,
    contact_value VARCHAR(255) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_contact_method_party
        FOREIGN KEY (party_id)
        REFERENCES party (party_id)
);

CREATE TABLE IF NOT EXISTS property (
    property_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_name VARCHAR(255) NULL,
    address_id BIGINT UNSIGNED NULL,
    property_type_code VARCHAR(100) NULL,
    tenure_code VARCHAR(100) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_property_address
        FOREIGN KEY (address_id)
        REFERENCES address (address_id)
);

CREATE TABLE IF NOT EXISTS property_unit (
    property_unit_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    unit_name VARCHAR(255) NOT NULL,
    unit_reference VARCHAR(100) NULL,
    floor_level VARCHAR(100) NULL,
    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_property_unit_property
        FOREIGN KEY (property_id)
        REFERENCES property (property_id)
);

CREATE TABLE IF NOT EXISTS party_relationship (
    party_relationship_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    from_party_id BIGINT UNSIGNED NOT NULL,
    to_party_id BIGINT UNSIGNED NOT NULL,

    relationship_type_code VARCHAR(100) NOT NULL,
    relationship_label VARCHAR(255) NULL,

    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    date_from DATE NULL,
    date_to DATE NULL,

    status_code VARCHAR(100) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_party_relationship_from_party
        FOREIGN KEY (from_party_id)
        REFERENCES party (party_id),

    CONSTRAINT fk_party_relationship_to_party
        FOREIGN KEY (to_party_id)
        REFERENCES party (party_id)
);