import { db } from '$lib/server/db/connection';
import type { CreateInstructionInput, Instruction } from './instructions.types';

const instructionSelect = `
	SELECT
		instruction_id AS instructionId,
		instruction_reference AS instructionReference,
		client_account_id AS clientAccountId,
		instruction_type_code AS instructionTypeCode,
		service_line_code AS serviceLineCode,
		status_code AS statusCode,
		priority_code AS priorityCode,
		title,
		summary,
		received_at AS receivedAt,
		accepted_at AS acceptedAt,
		target_issue_date AS targetIssueDate,
		closed_at AS closedAt,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM instruction
`;

export async function listInstructions(): Promise<Instruction[]> {
	const [rows] = await db.query(`${instructionSelect} ORDER BY created_at DESC`);
	return rows as Instruction[];
}

export async function getInstructionById(instructionId: number): Promise<Instruction | null> {
	const [rows] = await db.query(
		`${instructionSelect} WHERE instruction_id = :instructionId LIMIT 1`,
		{ instructionId }
	);
	return (rows as Instruction[])[0] ?? null;
}

export async function createInstruction(input: CreateInstructionInput): Promise<number> {
	const instructionReference = input.instructionReference?.trim() || `INS-${Date.now()}`;

	const [result] = await db.query(
		`
		INSERT INTO instruction (
			instruction_reference,
			client_account_id,
			instruction_type_code,
			service_line_code,
			status_code,
			priority_code,
			title,
			summary,
			received_at,
			target_issue_date
		)
		VALUES (
			:instructionReference,
			:clientAccountId,
			:instructionTypeCode,
			:serviceLineCode,
			'DRAFT',
			:priorityCode,
			:title,
			:summary,
			:receivedAt,
			:targetIssueDate
		)
		`,
		{
			instructionReference,
			clientAccountId: input.clientAccountId,
			instructionTypeCode: input.instructionTypeCode,
			serviceLineCode: input.serviceLineCode,
			priorityCode: input.priorityCode ?? 'NORMAL',
			title: input.title,
			summary: input.summary ?? null,
			receivedAt: input.receivedAt ?? null,
			targetIssueDate: input.targetIssueDate ?? null
		}
	);

	return Number((result as { insertId: number }).insertId);
}
