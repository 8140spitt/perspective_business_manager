import { db } from '$lib/server/db/connection';
import type { ClientAccount, CreateClientAccountInput } from './client-accounts.types';

const clientAccountSelect = `
	SELECT
		client_account_id AS clientAccountId,
		party_id AS partyId,
		client_reference AS clientReference,
		client_type_code AS clientTypeCode,
		status_code AS statusCode,
		onboarding_status_code AS onboardingStatusCode,
		source_code AS sourceCode,
		opened_at AS openedAt,
		closed_at AS closedAt,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM client_account
`;

export async function listClientAccounts(): Promise<ClientAccount[]> {
	const [rows] = await db.query(`${clientAccountSelect} ORDER BY opened_at DESC`);
	return rows as ClientAccount[];
}

export async function getClientAccountById(clientAccountId: number): Promise<ClientAccount | null> {
	const [rows] = await db.query(
		`${clientAccountSelect} WHERE client_account_id = :clientAccountId LIMIT 1`,
		{ clientAccountId }
	);
	return (rows as ClientAccount[])[0] ?? null;
}

export async function getClientAccountByPartyId(partyId: number): Promise<ClientAccount | null> {
	const [rows] = await db.query(`${clientAccountSelect} WHERE party_id = :partyId LIMIT 1`, { partyId });
	return (rows as ClientAccount[])[0] ?? null;
}

export async function createClientAccount(input: CreateClientAccountInput): Promise<number> {
	const clientReference = input.clientReference ?? `CLI-${Date.now()}`;

	const [result] = await db.query(
		`
		INSERT INTO client_account (
			party_id,
			client_reference,
			client_type_code,
			onboarding_status_code,
			source_code,
			status_code
		)
		VALUES (
			:partyId,
			:clientReference,
			:clientTypeCode,
			:onboardingStatusCode,
			:sourceCode,
			'ACTIVE'
		)
		`,
		{
			partyId: input.partyId,
			clientReference,
			clientTypeCode: input.clientTypeCode ?? 'STANDARD',
			onboardingStatusCode: input.onboardingStatusCode ?? 'NEW',
			sourceCode: input.sourceCode ?? null
		}
	);

	return Number((result as { insertId: number }).insertId);
}
