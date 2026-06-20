-- PBM v1 project-centric ERP dashboard views

CREATE OR REPLACE VIEW vw_project_commercial_summary AS
SELECT
    p.project_id,
    p.project_reference,
    p.project_name,
    p.project_state_code,
    client.business_partner_id AS client_business_partner_id,
    client.partner_name AS client_name,
    COUNT(DISTINCT ps.project_service_id) AS service_count,
    COUNT(DISTINCT pl.project_location_id) AS location_count,
    COALESCE(q.quote_total, 0) AS quoted_total,
    COALESCE(si.sales_invoice_total, 0) AS sales_invoice_total,
    COALESCE(supi.supplier_invoice_total, 0) AS supplier_invoice_total,
    COALESCE(si.sales_invoice_subtotal, 0) - COALESCE(supi.supplier_invoice_subtotal, 0) AS gross_margin_before_tax,
    p.created_at,
    p.updated_at
FROM project p
LEFT JOIN business_partner client
    ON client.business_partner_id = p.primary_client_business_partner_id
LEFT JOIN project_location pl
    ON pl.project_id = p.project_id
LEFT JOIN project_service ps
    ON ps.project_id = p.project_id
LEFT JOIN (
    SELECT
        project_id,
        SUM(total_amount) AS quote_total
    FROM project_quote
    GROUP BY project_id
) q
    ON q.project_id = p.project_id
LEFT JOIN (
    SELECT
        project_id,
        SUM(total_amount) AS sales_invoice_total,
        SUM(subtotal_amount) AS sales_invoice_subtotal
    FROM sales_invoice
    GROUP BY project_id
) si
    ON si.project_id = p.project_id
LEFT JOIN (
    SELECT
        project_id,
        SUM(total_amount) AS supplier_invoice_total,
        SUM(subtotal_amount) AS supplier_invoice_subtotal
    FROM supplier_invoice
    GROUP BY project_id
) supi
    ON supi.project_id = p.project_id
GROUP BY
    p.project_id,
    p.project_reference,
    p.project_name,
    p.project_state_code,
    client.business_partner_id,
    client.partner_name,
    q.quote_total,
    si.sales_invoice_total,
    si.sales_invoice_subtotal,
    supi.supplier_invoice_total,
    supi.supplier_invoice_subtotal,
    p.created_at,
    p.updated_at;

CREATE OR REPLACE VIEW vw_project_responsibility AS
SELECT
    p.project_id,
    p.project_reference,
    p.project_name,
    pa.project_role_code,
    e.employee_number,
    pe.person_entity_id,
    pe.first_name,
    pe.last_name,
    pos.position_title,
    ou.unit_name,
    bf.function_name,
    pa.allocation_percent,
    pa.is_primary,
    pa.is_active
FROM project_assignment pa
JOIN project p
    ON p.project_id = pa.project_id
LEFT JOIN employee e
    ON e.employee_id = pa.employee_id
LEFT JOIN person_entity pe
    ON pe.person_entity_id = COALESCE(e.person_entity_id, pa.person_entity_id)
LEFT JOIN `position` pos
    ON pos.position_id = pa.position_id
LEFT JOIN organisation_unit ou
    ON ou.organisation_unit_id = pos.organisation_unit_id
LEFT JOIN business_function bf
    ON bf.business_function_id = pos.business_function_id;

CREATE OR REPLACE VIEW vw_project_external_contacts AS
SELECT
    p.project_id,
    p.project_reference,
    p.project_name,
    bp.business_partner_id,
    bp.partner_name,
    pp.project_role_code AS partner_project_role,
    pe.person_entity_id,
    pe.first_name,
    pe.last_name,
    bpp.job_title,
    bpp.department,
    bpp.role_code AS organisation_role,
    pc.project_contact_role_code,
    pc.is_primary,
    pc.is_active
FROM project_contact pc
JOIN project p
    ON p.project_id = pc.project_id
JOIN business_partner_person bpp
    ON bpp.business_partner_person_id = pc.business_partner_person_id
JOIN business_partner bp
    ON bp.business_partner_id = bpp.business_partner_id
JOIN person_entity pe
    ON pe.person_entity_id = bpp.person_entity_id
LEFT JOIN project_party pp
    ON pp.project_id = p.project_id
   AND pp.business_partner_id = bp.business_partner_id;

CREATE OR REPLACE VIEW vw_project_scope_summary AS
SELECT
    p.project_id,
    p.project_reference,
    p.project_name,
    pl.project_location_id,
    pl.location_name,
    a.address_line_1,
    a.town_city,
    a.postcode,
    ps.project_service_id,
    sc.service_code,
    sc.service_name,
    ps.service_description,
    ps.quantity,
    ps.unit_code,
    ps.status_code AS project_service_status
FROM project p
LEFT JOIN project_location pl
    ON pl.project_id = p.project_id
LEFT JOIN address a
    ON a.address_id = pl.address_id
LEFT JOIN project_service ps
    ON ps.project_id = p.project_id
   AND (ps.project_location_id = pl.project_location_id OR ps.project_location_id IS NULL)
LEFT JOIN service_catalogue sc
    ON sc.service_catalogue_id = ps.service_catalogue_id;
