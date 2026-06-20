import { db } from '$lib/server/db/connection';
import type {
	BusinessFunctionRecord,
	BusinessProfileRecord,
	EmployeePositionRecord,
	EmployeeRecord,
	OrganisationDashboard,
	OrganisationUnitRecord,
	PositionRecord
} from './organisation.types';

const businessProfileSelect = `
	SELECT
		bp.business_partner_id AS businessPartnerId,
		be.business_entity_id AS businessEntityId,
		bp.partner_reference AS partnerReference,
		bp.partner_name AS partnerName,
		bp.status_code AS partnerStatusCode,
		be.legal_name AS legalName,
		be.trading_name AS tradingName,
		be.company_number AS companyNumber,
		be.vat_number AS vatNumber,
		be.tax_reference AS taxReference,
		be.industry_code AS industryCode,
		be.website,
		COALESCE(be.notes, bp.notes) AS notes,
		bp.created_at AS createdAt,
		bp.updated_at AS updatedAt
	FROM business_partner bp
	JOIN business_partner_role bpr
		ON bpr.business_partner_id = bp.business_partner_id
		AND bpr.role_code = 'tenant_business'
		AND bpr.is_active = TRUE
	LEFT JOIN business_entity be
		ON be.business_entity_id = bp.business_entity_id
`;

const businessFunctionSelect = `
	SELECT
		bf.business_function_id AS businessFunctionId,
		bf.parent_business_function_id AS parentBusinessFunctionId,
		parent.function_name AS parentFunctionName,
		bf.function_code AS functionCode,
		bf.function_name AS functionName,
		bf.function_level AS functionLevel,
		bf.description,
		bf.is_active AS isActive,
		bf.created_at AS createdAt,
		bf.updated_at AS updatedAt
	FROM business_function bf
	LEFT JOIN business_function parent
		ON parent.business_function_id = bf.parent_business_function_id
`;

const organisationUnitSelect = `
	SELECT
		ou.organisation_unit_id AS organisationUnitId,
		ou.parent_organisation_unit_id AS parentOrganisationUnitId,
		parent.unit_name AS parentUnitName,
		ou.business_function_id AS businessFunctionId,
		bf.function_name AS functionName,
		ou.unit_code AS unitCode,
		ou.unit_name AS unitName,
		ou.unit_type_code AS unitTypeCode,
		ou.is_active AS isActive,
		ou.created_at AS createdAt,
		ou.updated_at AS updatedAt
	FROM organisation_unit ou
	LEFT JOIN organisation_unit parent
		ON parent.organisation_unit_id = ou.parent_organisation_unit_id
	LEFT JOIN business_function bf
		ON bf.business_function_id = ou.business_function_id
`;

const positionSelect = `
	SELECT
		p.position_id AS positionId,
		p.organisation_unit_id AS organisationUnitId,
		ou.unit_name AS unitName,
		p.business_function_id AS businessFunctionId,
		bf.function_name AS functionName,
		p.reports_to_position_id AS reportsToPositionId,
		manager.position_title AS reportsToPositionTitle,
		p.position_code AS positionCode,
		p.position_title AS positionTitle,
		p.position_type_code AS positionTypeCode,
		p.is_manager AS isManager,
		p.is_active AS isActive,
		p.created_at AS createdAt,
		p.updated_at AS updatedAt
	FROM \`position\` p
	LEFT JOIN organisation_unit ou
		ON ou.organisation_unit_id = p.organisation_unit_id
	LEFT JOIN business_function bf
		ON bf.business_function_id = p.business_function_id
	LEFT JOIN \`position\` manager
		ON manager.position_id = p.reports_to_position_id
`;

const employeeSelect = `
	SELECT
		e.employee_id AS employeeId,
		e.person_entity_id AS personEntityId,
		e.employee_number AS employeeNumber,
		pe.first_name AS firstName,
		pe.last_name AS lastName,
		pe.known_as AS knownAs,
		e.employment_status_code AS employmentStatusCode,
		e.employment_type_code AS employmentTypeCode,
		e.start_date AS startDate,
		e.end_date AS endDate,
		e.primary_organisation_unit_id AS primaryOrganisationUnitId,
		ou.unit_name AS primaryUnitName,
		e.primary_position_id AS primaryPositionId,
		p.position_title AS primaryPositionTitle,
		e.created_at AS createdAt,
		e.updated_at AS updatedAt
	FROM employee e
	JOIN person_entity pe
		ON pe.person_entity_id = e.person_entity_id
	LEFT JOIN organisation_unit ou
		ON ou.organisation_unit_id = e.primary_organisation_unit_id
	LEFT JOIN \`position\` p
		ON p.position_id = e.primary_position_id
`;

const employeePositionSelect = `
	SELECT
		ep.employee_position_id AS employeePositionId,
		ep.employee_id AS employeeId,
		e.employee_number AS employeeNumber,
		pe.person_entity_id AS personEntityId,
		pe.first_name AS firstName,
		pe.last_name AS lastName,
		p.position_id AS positionId,
		p.position_title AS positionTitle,
		ou.organisation_unit_id AS organisationUnitId,
		ou.unit_name AS unitName,
		bf.business_function_id AS businessFunctionId,
		bf.function_name AS functionName,
		ep.start_date AS startDate,
		ep.end_date AS endDate,
		ep.is_primary AS isPrimary,
		ep.created_at AS createdAt,
		ep.updated_at AS updatedAt
	FROM employee_position ep
	JOIN employee e
		ON e.employee_id = ep.employee_id
	JOIN person_entity pe
		ON pe.person_entity_id = e.person_entity_id
	JOIN \`position\` p
		ON p.position_id = ep.position_id
	JOIN organisation_unit ou
		ON ou.organisation_unit_id = p.organisation_unit_id
	LEFT JOIN business_function bf
		ON bf.business_function_id = p.business_function_id
`;

export async function getBusinessProfile(): Promise<BusinessProfileRecord | null> {
	const [rows] = await db.query(`${businessProfileSelect} ORDER BY bpr.is_primary DESC, bp.business_partner_id LIMIT 1`);
	const profiles = rows as BusinessProfileRecord[];
	return profiles[0] ?? null;
}

export async function listBusinessFunctions(): Promise<BusinessFunctionRecord[]> {
	const [rows] = await db.query(`${businessFunctionSelect} ORDER BY bf.function_level, bf.function_code`);
	return rows as BusinessFunctionRecord[];
}

export async function listOrganisationUnits(): Promise<OrganisationUnitRecord[]> {
	const [rows] = await db.query(`${organisationUnitSelect} ORDER BY ou.unit_code`);
	return rows as OrganisationUnitRecord[];
}

export async function listPositions(): Promise<PositionRecord[]> {
	const [rows] = await db.query(`${positionSelect} ORDER BY ou.unit_code, p.position_title`);
	return rows as PositionRecord[];
}

export async function listEmployees(): Promise<EmployeeRecord[]> {
	const [rows] = await db.query(`${employeeSelect} ORDER BY pe.last_name, pe.first_name, e.employee_number`);
	return rows as EmployeeRecord[];
}

export async function listEmployeePositions(): Promise<EmployeePositionRecord[]> {
	const [rows] = await db.query(`${employeePositionSelect} ORDER BY ep.is_primary DESC, pe.last_name, pe.first_name`);
	return rows as EmployeePositionRecord[];
}

export async function getOrganisationDashboard(): Promise<OrganisationDashboard> {
	const [businessProfile, businessFunctions, organisationUnits, positions, employees, employeePositions] = await Promise.all([
		getBusinessProfile(),
		listBusinessFunctions(),
		listOrganisationUnits(),
		listPositions(),
		listEmployees(),
		listEmployeePositions()
	]);

	return {
		businessProfile,
		businessFunctions,
		organisationUnits,
		positions,
		employees,
		employeePositions
	};
}

export const organisationRepository = {
	getBusinessProfile,
	listBusinessFunctions,
	listOrganisationUnits,
	listPositions,
	listEmployees,
	listEmployeePositions,
	getOrganisationDashboard
};
