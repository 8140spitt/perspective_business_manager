-- PBM v1 project-centric ERP: tenant business profile seed

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';

INSERT INTO business_entity (
    legal_name,
    trading_name,
    notes,
    is_active
)
SELECT
    _utf8mb4'Perspective Building Consultancy' COLLATE utf8mb4_unicode_ci,
    _utf8mb4'Perspective Building Consultancy' COLLATE utf8mb4_unicode_ci,
    _utf8mb4'Tenant business profile used to anchor the PBM operating model.' COLLATE utf8mb4_unicode_ci,
    TRUE
WHERE NOT EXISTS (
    SELECT 1
    FROM business_entity
    WHERE legal_name = _utf8mb4'Perspective Building Consultancy' COLLATE utf8mb4_unicode_ci
);

SET @TENANT_BUSINESS_ENTITY_ID := (
    SELECT business_entity_id
    FROM business_entity
    WHERE legal_name = _utf8mb4'Perspective Building Consultancy' COLLATE utf8mb4_unicode_ci
    ORDER BY business_entity_id
    LIMIT 1
);

INSERT INTO business_partner (
    partner_type_code,
    business_entity_id,
    partner_name,
    partner_reference,
    status_code,
    notes
)
SELECT
    _utf8mb4'organisation' COLLATE utf8mb4_unicode_ci,
    @TENANT_BUSINESS_ENTITY_ID,
    _utf8mb4'Perspective Building Consultancy' COLLATE utf8mb4_unicode_ci,
    _utf8mb4'TENANT-BUSINESS' COLLATE utf8mb4_unicode_ci,
    _utf8mb4'active' COLLATE utf8mb4_unicode_ci,
    _utf8mb4'Tenant business/account using PBM.' COLLATE utf8mb4_unicode_ci
WHERE @TENANT_BUSINESS_ENTITY_ID IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM business_partner
    WHERE partner_reference = _utf8mb4'TENANT-BUSINESS' COLLATE utf8mb4_unicode_ci
);

UPDATE business_partner
SET
    business_entity_id = @TENANT_BUSINESS_ENTITY_ID,
    partner_name = _utf8mb4'Perspective Building Consultancy' COLLATE utf8mb4_unicode_ci,
    status_code = _utf8mb4'active' COLLATE utf8mb4_unicode_ci
WHERE partner_reference = _utf8mb4'TENANT-BUSINESS' COLLATE utf8mb4_unicode_ci
  AND @TENANT_BUSINESS_ENTITY_ID IS NOT NULL;

SET @TENANT_BUSINESS_PARTNER_ID := (
    SELECT business_partner_id
    FROM business_partner
    WHERE partner_reference = _utf8mb4'TENANT-BUSINESS' COLLATE utf8mb4_unicode_ci
    ORDER BY business_partner_id
    LIMIT 1
);

INSERT INTO business_partner_role (
    business_partner_id,
    role_code,
    is_primary,
    is_active
)
SELECT
    @TENANT_BUSINESS_PARTNER_ID,
    _utf8mb4'tenant_business' COLLATE utf8mb4_unicode_ci,
    TRUE,
    TRUE
WHERE @TENANT_BUSINESS_PARTNER_ID IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM business_partner_role
    WHERE business_partner_id = @TENANT_BUSINESS_PARTNER_ID
      AND role_code = _utf8mb4'tenant_business' COLLATE utf8mb4_unicode_ci
);
