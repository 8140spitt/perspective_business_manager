INSERT IGNORE INTO ref_code_set (code_set_key, name, description) VALUES
('PARTY_TYPE', 'Party Type', 'Defines whether a party is a person or organisation'),
('PARTY_ROLE', 'Party Role', 'Roles that a party can perform'),
('STATUS', 'Generic Status', 'Reusable active/inactive/archive status values'),
('ADDRESS_TYPE', 'Address Type', 'Types of address linked to a party'),
('CONTACT_TYPE', 'Contact Type', 'Types of contact method');

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'PERSON', 'Person', 10
FROM ref_code_set
WHERE code_set_key = 'PARTY_TYPE';

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'ORGANISATION', 'Organisation', 20
FROM ref_code_set
WHERE code_set_key = 'PARTY_TYPE';

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'ACTIVE', 'Active', 10
FROM ref_code_set
WHERE code_set_key = 'STATUS';

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'INACTIVE', 'Inactive', 20
FROM ref_code_set
WHERE code_set_key = 'STATUS';

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'ARCHIVED', 'Archived', 30
FROM ref_code_set
WHERE code_set_key = 'STATUS';

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'CLIENT', 'Client', 10
FROM ref_code_set
WHERE code_set_key = 'PARTY_ROLE';

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'CONTRACTOR', 'Contractor', 20
FROM ref_code_set
WHERE code_set_key = 'PARTY_ROLE';

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'SURVEYOR', 'Surveyor', 30
FROM ref_code_set
WHERE code_set_key = 'PARTY_ROLE';

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'LANDLORD', 'Landlord', 40
FROM ref_code_set
WHERE code_set_key = 'PARTY_ROLE';

INSERT IGNORE INTO ref_code_value (code_set_id, code_value, display_name, sort_order)
SELECT code_set_id, 'TENANT', 'Tenant', 50
FROM ref_code_set
WHERE code_set_key = 'PARTY_ROLE';