-- PBM v1 project-centric ERP: owning business profile seed

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
    _utf8mb4'Business profile used to anchor the PBM operating model.' COLLATE utf8mb4_unicode_ci,
    TRUE
WHERE NOT EXISTS (
    SELECT 1
    FROM business_entity
    WHERE legal_name = _utf8mb4'Perspective Building Consultancy' COLLATE utf8mb4_unicode_ci
);

SET @OWNING_BUSINESS_ENTITY_ID := (
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
    @OWNING_BUSINESS_ENTITY_ID,
    _utf8mb4'Perspective Building Consultancy' COLLATE utf8mb4_unicode_ci,
    _utf8mb4'OWNING-BUSINESS' COLLATE utf8mb4_unicode_ci,
    _utf8mb4'active' COLLATE utf8mb4_unicode_ci,
    _utf8mb4'Business that owns and operates this PBM installation.' COLLATE utf8mb4_unicode_ci
WHERE @OWNING_BUSINESS_ENTITY_ID IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM business_partner
    WHERE partner_reference IN (
        _utf8mb4'OWNING-BUSINESS' COLLATE utf8mb4_unicode_ci,
        _utf8mb4'TENANT-BUSINESS' COLLATE utf8mb4_unicode_ci
    )
);

UPDATE business_partner
SET
    business_entity_id = @OWNING_BUSINESS_ENTITY_ID,
    partner_name = _utf8mb4'Perspective Building Consultancy' COLLATE utf8mb4_unicode_ci,
    partner_reference = _utf8mb4'OWNING-BUSINESS' COLLATE utf8mb4_unicode_ci,
    status_code = _utf8mb4'active' COLLATE utf8mb4_unicode_ci,
    notes = _utf8mb4'Business that owns and operates this PBM installation.' COLLATE utf8mb4_unicode_ci
WHERE partner_reference IN (
    _utf8mb4'OWNING-BUSINESS' COLLATE utf8mb4_unicode_ci,
    _utf8mb4'TENANT-BUSINESS' COLLATE utf8mb4_unicode_ci
)
  AND @OWNING_BUSINESS_ENTITY_ID IS NOT NULL;

SET @OWNING_BUSINESS_PARTNER_ID := (
    SELECT business_partner_id
    FROM business_partner
    WHERE partner_reference = _utf8mb4'OWNING-BUSINESS' COLLATE utf8mb4_unicode_ci
    ORDER BY business_partner_id
    LIMIT 1
);

UPDATE business_partner_role
SET role_code = _utf8mb4'owning_business' COLLATE utf8mb4_unicode_ci
WHERE role_code = _utf8mb4'tenant_business' COLLATE utf8mb4_unicode_ci;

INSERT INTO business_partner_role (
    business_partner_id,
    role_code,
    is_primary,
    is_active
)
SELECT
    @OWNING_BUSINESS_PARTNER_ID,
    _utf8mb4'owning_business' COLLATE utf8mb4_unicode_ci,
    TRUE,
    TRUE
WHERE @OWNING_BUSINESS_PARTNER_ID IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM business_partner_role
    WHERE business_partner_id = @OWNING_BUSINESS_PARTNER_ID
      AND role_code = _utf8mb4'owning_business' COLLATE utf8mb4_unicode_ci
);