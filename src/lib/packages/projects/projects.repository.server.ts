import { db } from '$lib/server/db/connection';
import type {
	CreateProjectInput,
	ProjectCommercialSummary,
	ProjectDashboard,
	ProjectExternalContact,
	ProjectRecord,
	ProjectResponsibility,
	ProjectScopeSummary,
	TransitionProjectStateInput
} from './projects.types';

function createProjectReference(input: CreateProjectInput): string {
	return input.projectReference ?? `PROJ-${Date.now()}`;
}

const projectSelect = `
	SELECT
		project_id AS projectId,
		project_reference AS projectReference,
		project_name AS projectName,
		project_type_code AS projectTypeCode,
		project_state_code AS projectStateCode,
		primary_client_business_partner_id AS primaryClientBusinessPartnerId,
		enquiry_date AS enquiryDate,
		expected_start_date AS expectedStartDate,
		expected_completion_date AS expectedCompletionDate,
		actual_start_date AS actualStartDate,
		actual_completion_date AS actualCompletionDate,
		description,
		notes,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM project
`;

const projectCommercialSummarySelect = `
	SELECT
		project_id AS projectId,
		project_reference AS projectReference,
		project_name AS projectName,
		project_state_code AS projectStateCode,
		client_business_partner_id AS clientBusinessPartnerId,
		client_name AS clientName,
		service_count AS serviceCount,
		location_count AS locationCount,
		quoted_total AS quotedTotal,
		sales_invoice_total AS salesInvoiceTotal,
		supplier_invoice_total AS supplierInvoiceTotal,
		gross_margin_before_tax AS grossMarginBeforeTax,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM vw_project_commercial_summary
`;

const projectResponsibilitySelect = `
	SELECT
		project_id AS projectId,
		project_reference AS projectReference,
		project_name AS projectName,
		project_role_code AS projectRoleCode,
		employee_number AS employeeNumber,
		person_entity_id AS personEntityId,
		first_name AS firstName,
		last_name AS lastName,
		position_title AS positionTitle,
		unit_name AS unitName,
		function_name AS functionName,
		allocation_percent AS allocationPercent,
		is_primary AS isPrimary,
		is_active AS isActive
	FROM vw_project_responsibility
`;

const projectExternalContactSelect = `
	SELECT
		project_id AS projectId,
		project_reference AS projectReference,
		project_name AS projectName,
		business_partner_id AS businessPartnerId,
		partner_name AS partnerName,
		partner_project_role AS partnerProjectRole,
		person_entity_id AS personEntityId,
		first_name AS firstName,
		last_name AS lastName,
		job_title AS jobTitle,
		department,
		organisation_role AS organisationRole,
		project_contact_role_code AS projectContactRoleCode,
		is_primary AS isPrimary,
		is_active AS isActive
	FROM vw_project_external_contacts
`;

const projectScopeSummarySelect = `
	SELECT
		project_id AS projectId,
		project_reference AS projectReference,
		project_name AS projectName,
		project_location_id AS projectLocationId,
		location_name AS locationName,
		address_line_1 AS addressLine1,
		town_city AS townCity,
		postcode,
		project_service_id AS projectServiceId,
		service_code AS serviceCode,
		service_name AS serviceName,
		service_description AS serviceDescription,
		quantity,
		unit_code AS unitCode,
		project_service_status AS projectServiceStatus
	FROM vw_project_scope_summary
`;

export async function listProjectCommercialSummaries(): Promise<ProjectCommercialSummary[]> {
	const [rows] = await db.query(`${projectCommercialSummarySelect} ORDER BY updatedAt DESC, createdAt DESC`);
	return rows as ProjectCommercialSummary[];
}

export async function getProjectById(projectId: number): Promise<ProjectRecord | null> {
	const [rows] = await db.query(`${projectSelect} WHERE project_id = :projectId LIMIT 1`, { projectId });
	return (rows as ProjectRecord[])[0] ?? null;
}

export async function getProjectCommercialSummary(
	projectId: number
): Promise<ProjectCommercialSummary | null> {
	const [rows] = await db.query(`${projectCommercialSummarySelect} WHERE project_id = :projectId LIMIT 1`, {
		projectId
	});
	return (rows as ProjectCommercialSummary[])[0] ?? null;
}

export async function listProjectResponsibilities(projectId: number): Promise<ProjectResponsibility[]> {
	const [rows] = await db.query(
		`${projectResponsibilitySelect} WHERE project_id = :projectId ORDER BY isPrimary DESC, projectRoleCode`,
		{ projectId }
	);
	return rows as ProjectResponsibility[];
}

export async function listProjectExternalContacts(projectId: number): Promise<ProjectExternalContact[]> {
	const [rows] = await db.query(
		`${projectExternalContactSelect} WHERE project_id = :projectId ORDER BY isPrimary DESC, projectContactRoleCode`,
		{ projectId }
	);
	return rows as ProjectExternalContact[];
}

export async function listProjectScope(projectId: number): Promise<ProjectScopeSummary[]> {
	const [rows] = await db.query(
		`${projectScopeSummarySelect} WHERE project_id = :projectId ORDER BY projectLocationId, projectServiceId`,
		{ projectId }
	);
	return rows as ProjectScopeSummary[];
}

export async function getProjectDashboard(projectId: number): Promise<ProjectDashboard> {
	const [summary, responsibilities, externalContacts, scope] = await Promise.all([
		getProjectCommercialSummary(projectId),
		listProjectResponsibilities(projectId),
		listProjectExternalContacts(projectId),
		listProjectScope(projectId)
	]);

	return {
		summary,
		responsibilities,
		externalContacts,
		scope
	};
}

export async function createProject(input: CreateProjectInput): Promise<number> {
	const projectReference = createProjectReference(input);

	const [result] = await db.query(
		`
		INSERT INTO project (
			project_reference,
			project_name,
			project_type_code,
			project_state_code,
			primary_client_business_partner_id,
			enquiry_date,
			description,
			notes
		)
		VALUES (
			:projectReference,
			:projectName,
			:projectTypeCode,
			:projectStateCode,
			:primaryClientBusinessPartnerId,
			:enquiryDate,
			:description,
			:notes
		)
		`,
		{
			projectReference,
			projectName: input.projectName,
			projectTypeCode: input.projectTypeCode ?? null,
			projectStateCode: input.projectStateCode ?? 'enquiry',
			primaryClientBusinessPartnerId: input.primaryClientBusinessPartnerId ?? null,
			enquiryDate: input.enquiryDate ?? null,
			description: input.description ?? null,
			notes: input.notes ?? null
		}
	);

	return Number((result as { insertId: number }).insertId);
}

export async function transitionProjectState(input: TransitionProjectStateInput): Promise<void> {
	const current = await getProjectById(input.projectId);

	await db.query(
		`
		UPDATE project
		SET
			project_state_code = :toStateCode,
			updated_at = CURRENT_TIMESTAMP
		WHERE project_id = :projectId
		`,
		{
			projectId: input.projectId,
			toStateCode: input.toStateCode
		}
	);

	await db.query(
		`
		INSERT INTO project_status_history (
			project_id,
			from_state_code,
			to_state_code,
			changed_by_person_id,
			reason
		)
		VALUES (
			:projectId,
			:fromStateCode,
			:toStateCode,
			:changedByPersonId,
			:reason
		)
		`,
		{
			projectId: input.projectId,
			fromStateCode: current?.projectStateCode ?? null,
			toStateCode: input.toStateCode,
			changedByPersonId: input.changedByPersonId ?? null,
			reason: input.reason ?? null
		}
	);
}

export const projectsRepository = {
	listProjectCommercialSummaries,
	getProjectById,
	getProjectCommercialSummary,
	listProjectResponsibilities,
	listProjectExternalContacts,
	listProjectScope,
	getProjectDashboard,
	createProject,
	transitionProjectState
};
