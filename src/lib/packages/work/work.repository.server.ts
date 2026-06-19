import { db } from '$lib/server/db/connection';
import type {
	CreateWorkContainerInput,
	CreateWorkInstructionInput,
	CreateWorkServiceInput,
	TransitionWorkStatusInput,
	WorkContainerRecord,
	WorkInstructionRecord,
	WorkServiceRecord
} from './work.types';

function createReference(prefix: string, suppliedReference?: string): string {
	return suppliedReference ?? `${prefix}-${Date.now()}`;
}

export async function listWorkContainers(): Promise<WorkContainerRecord[]> {
	const [rows] = await db.query(`
		SELECT
			work_container_id AS id,
			work_container_reference AS reference,
			work_container_type_code AS typeCode,
			client_account_id AS clientAccountId,
			party_id AS partyId,
			source_object_type_code AS sourceObjectTypeCode,
			source_object_id AS sourceObjectId,
			status_code AS statusCode,
			title,
			summary,
			planned_start_date AS plannedStartDate,
			planned_end_date AS plannedEndDate,
			actual_start_date AS actualStartDate,
			actual_end_date AS actualEndDate,
			created_at AS createdAt,
			updated_at AS updatedAt
		FROM work_container
		ORDER BY created_at DESC
	`);

	return rows as WorkContainerRecord[];
}

export async function getWorkContainerById(id: number): Promise<WorkContainerRecord | null> {
	const [rows] = await db.query(
		`
		SELECT
			work_container_id AS id,
			work_container_reference AS reference,
			work_container_type_code AS typeCode,
			client_account_id AS clientAccountId,
			party_id AS partyId,
			source_object_type_code AS sourceObjectTypeCode,
			source_object_id AS sourceObjectId,
			status_code AS statusCode,
			title,
			summary,
			planned_start_date AS plannedStartDate,
			planned_end_date AS plannedEndDate,
			actual_start_date AS actualStartDate,
			actual_end_date AS actualEndDate,
			created_at AS createdAt,
			updated_at AS updatedAt
		FROM work_container
		WHERE work_container_id = :id
		LIMIT 1
		`,
		{ id }
	);

	return (rows as WorkContainerRecord[])[0] ?? null;
}

export async function createWorkContainer(input: CreateWorkContainerInput): Promise<number> {
	const reference = createReference('WORK', input.reference);

	const [result] = await db.query(
		`
		INSERT INTO work_container (
			work_container_reference,
			work_container_type_code,
			client_account_id,
			party_id,
			source_object_type_code,
			source_object_id,
			status_code,
			title,
			summary,
			planned_start_date,
			planned_end_date
		)
		VALUES (
			:reference,
			:typeCode,
			:clientAccountId,
			:partyId,
			:sourceObjectTypeCode,
			:sourceObjectId,
			'draft',
			:title,
			:summary,
			:plannedStartDate,
			:plannedEndDate
		)
		`,
		{
			reference,
			typeCode: input.typeCode,
			clientAccountId: input.clientAccountId ?? null,
			partyId: input.partyId ?? null,
			sourceObjectTypeCode: input.sourceObjectTypeCode ?? null,
			sourceObjectId: input.sourceObjectId ?? null,
			title: input.title,
			summary: input.summary ?? null,
			plannedStartDate: input.plannedStartDate ?? null,
			plannedEndDate: input.plannedEndDate ?? null
		}
	);

	return Number((result as { insertId: number }).insertId);
}

export async function listWorkServices(): Promise<WorkServiceRecord[]> {
	const [rows] = await db.query(`
		SELECT
			work_service_catalogue_id AS id,
			service_code AS serviceCode,
			service_name AS serviceName,
			description,
			is_active AS isActive,
			created_at AS createdAt,
			updated_at AS updatedAt
		FROM work_service_catalogue
		ORDER BY service_name ASC
	`);

	return rows as WorkServiceRecord[];
}

export async function createWorkService(input: CreateWorkServiceInput): Promise<number> {
	const [result] = await db.query(
		`
		INSERT INTO work_service_catalogue (
			service_code,
			service_name,
			description
		)
		VALUES (
			:serviceCode,
			:serviceName,
			:description
		)
		`,
		{
			serviceCode: input.serviceCode,
			serviceName: input.serviceName,
			description: input.description ?? null
		}
	);

	return Number((result as { insertId: number }).insertId);
}

export async function listWorkInstructions(workContainerId: number): Promise<WorkInstructionRecord[]> {
	const [rows] = await db.query(
		`
		SELECT
			work_instruction_id AS id,
			work_instruction_reference AS reference,
			work_container_id AS workContainerId,
			instruction_type_code AS instructionTypeCode,
			service_code AS serviceCode,
			supplier_party_id AS supplierPartyId,
			assigned_party_id AS assignedPartyId,
			status_code AS statusCode,
			title,
			instruction_text AS instructionText,
			due_date AS dueDate,
			created_at AS createdAt,
			updated_at AS updatedAt
		FROM work_instruction
		WHERE work_container_id = :workContainerId
		ORDER BY created_at DESC
		`,
		{ workContainerId }
	);

	return rows as WorkInstructionRecord[];
}

export async function createWorkInstruction(input: CreateWorkInstructionInput): Promise<number> {
	const reference = createReference('WINST', input.reference);

	const [result] = await db.query(
		`
		INSERT INTO work_instruction (
			work_instruction_reference,
			work_container_id,
			instruction_type_code,
			service_code,
			supplier_party_id,
			assigned_party_id,
			status_code,
			title,
			instruction_text,
			due_date
		)
		VALUES (
			:reference,
			:workContainerId,
			:instructionTypeCode,
			:serviceCode,
			:supplierPartyId,
			:assignedPartyId,
			'draft',
			:title,
			:instructionText,
			:dueDate
		)
		`,
		{
			reference,
			workContainerId: input.workContainerId,
			instructionTypeCode: input.instructionTypeCode ?? 'service_instruction',
			serviceCode: input.serviceCode ?? null,
			supplierPartyId: input.supplierPartyId ?? null,
			assignedPartyId: input.assignedPartyId ?? null,
			title: input.title,
			instructionText: input.instructionText ?? null,
			dueDate: input.dueDate ?? null
		}
	);

	return Number((result as { insertId: number }).insertId);
}

export async function recordWorkStatusTransition(input: TransitionWorkStatusInput): Promise<void> {
	await db.query(
		`
		INSERT INTO work_status_history (
			object_type_code,
			object_id,
			from_status_code,
			to_status_code,
			reason,
			changed_by
		)
		VALUES (
			:objectTypeCode,
			:objectId,
			:fromStatusCode,
			:toStatusCode,
			:reason,
			:changedBy
		)
		`,
		{
			objectTypeCode: input.objectTypeCode,
			objectId: input.objectId,
			fromStatusCode: input.fromStatusCode ?? null,
			toStatusCode: input.toStatusCode,
			reason: input.reason ?? null,
			changedBy: input.changedBy ?? null
		}
	);
}

export const workRepository = {
	listContainers: listWorkContainers,
	getContainerById: getWorkContainerById,
	createContainer: createWorkContainer,
	listServices: listWorkServices,
	createService: createWorkService,
	listInstructions: listWorkInstructions,
	createInstruction: createWorkInstruction,
	recordStatusTransition: recordWorkStatusTransition
};
