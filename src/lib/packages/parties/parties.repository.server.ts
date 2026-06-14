import { db } from '$lib/server/db/connection';
import type { Party } from './parties.types';

export async function listParties(): Promise<Party[]> {
	const [rows] = await db.query(`
		SELECT
			party_id AS partyId,
			party_type_code AS partyTypeCode,
			display_name AS displayName,
			status_code AS statusCode,
			created_at AS createdAt,
			updated_at AS updatedAt
		FROM party
		ORDER BY display_name
	`);

	return rows as Party[];
}
export interface CreateOrganisationInput {
	displayName: string;
	organisationName: string;
	organisationNumber?: string | null;
	vatNumber?: string | null;
	organisationTypeCode?: string | null;
}

export async function createOrganisation(input: CreateOrganisationInput): Promise<number> {
	const connection = await db.getConnection();

	try {
		await connection.beginTransaction();

		const [partyResult] = await connection.query(
			`
			INSERT INTO party (
				party_type_code,
				display_name,
				status_code
			)
			VALUES (
				'ORGANISATION',
				:displayName,
				'ACTIVE'
			)
			`,
			{
				displayName: input.displayName
			}
		);

		const partyId = Number((partyResult as { insertId: number }).insertId);

		await connection.query(
			`
			INSERT INTO organisation (
				party_id,
				organisation_name,
				organisation_number,
				vat_number,
				organisation_type_code
			)
			VALUES (
				:partyId,
				:organisationName,
				:organisationNumber,
				:vatNumber,
				:organisationTypeCode
			)
			`,
			{
				partyId,
				organisationName: input.organisationName,
				organisationNumber: input.organisationNumber ?? null,
				vatNumber: input.vatNumber ?? null,
				organisationTypeCode: input.organisationTypeCode ?? null
			}
		);

		await connection.commit();

		return partyId;
	} catch (error) {
		await connection.rollback();
		throw error;
	} finally {
		connection.release();
	}
}

export async function getPartyById(partyId: number): Promise<Party | null> {
	const [rows] = await db.query(
		`
		SELECT
			party_id AS partyId,
			party_type_code AS partyTypeCode,
			display_name AS displayName,
			status_code AS statusCode,
			created_at AS createdAt,
			updated_at AS updatedAt
		FROM party
		WHERE party_id = :partyId
		LIMIT 1
		`,
		{ partyId }
	);

	const result = rows as Party[];
	return result[0] ?? null;
}
export async function listClients(): Promise<Party[]> {
	const [rows] = await db.query(`
		SELECT
			p.party_id AS partyId,
			p.party_type_code AS partyTypeCode,
			p.display_name AS displayName,
			p.status_code AS statusCode,
			p.created_at AS createdAt,
			p.updated_at AS updatedAt
		FROM party p
		INNER JOIN party_role pr
			ON pr.party_id = p.party_id
			AND pr.role_code = 'CLIENT'
			AND pr.status_code = 'ACTIVE'
		ORDER BY p.display_name
	`);

	return rows as Party[];
}

export interface CreateClientInput {
	clientType: 'ORGANISATION' | 'PERSON';
	displayName: string;

	firstName?: string | null;
	lastName?: string | null;

	organisationName?: string | null;
	organisationNumber?: string | null;
	vatNumber?: string | null;
}

export async function createClient(input: CreateClientInput): Promise<number> {
	const connection = await db.getConnection();

	try {
		await connection.beginTransaction();

		const [partyResult] = await connection.query(
			`
			INSERT INTO party (
				party_type_code,
				display_name,
				status_code
			)
			VALUES (
				:partyTypeCode,
				:displayName,
				'ACTIVE'
			)
			`,
			{
				partyTypeCode: input.clientType,
				displayName: input.displayName
			}
		);

		const partyId = Number((partyResult as { insertId: number }).insertId);

		await connection.query(
			`
			INSERT INTO party_role (
				party_id,
				role_code,
				status_code
			)
			VALUES (
				:partyId,
				'CLIENT',
				'ACTIVE'
			)
			`,
			{ partyId }
		);

		if (input.clientType === 'ORGANISATION') {
			await connection.query(
				`
				INSERT INTO organisation (
					party_id,
					organisation_name,
					organisation_number,
					vat_number,
					organisation_type_code
				)
				VALUES (
					:partyId,
					:organisationName,
					:organisationNumber,
					:vatNumber,
					NULL
				)
				`,
				{
					partyId,
					organisationName: input.organisationName ?? input.displayName,
					organisationNumber: input.organisationNumber ?? null,
					vatNumber: input.vatNumber ?? null
				}
			);
		}

		if (input.clientType === 'PERSON') {
			await connection.query(
				`
				INSERT INTO person (
					party_id,
					first_name,
					last_name
				)
				VALUES (
					:partyId,
					:firstName,
					:lastName
				)
				`,
				{
					partyId,
					firstName: input.firstName ?? '',
					lastName: input.lastName ?? ''
				}
			);
		}

		await connection.commit();

		return partyId;
	} catch (error) {
		await connection.rollback();
		throw error;
	} finally {
		connection.release();
	}
}
export interface ClientContact {
	contactId: number;
	displayName: string;
	firstName: string;
	lastName: string;
	relationshipLabel: string | null;
	isPrimary: boolean;
	statusCode: string;
	createdAt: string;
}

export async function listClientContacts(clientId: number): Promise<ClientContact[]> {
	const [rows] = await db.query(
		`
		SELECT
			contact.party_id AS contactId,
			contact.display_name AS displayName,
			person.first_name AS firstName,
			person.last_name AS lastName,
			rel.relationship_label AS relationshipLabel,
			rel.is_primary AS isPrimary,
			contact.status_code AS statusCode,
			contact.created_at AS createdAt
		FROM party_relationship rel
		INNER JOIN party contact
			ON contact.party_id = rel.from_party_id
		INNER JOIN person
			ON person.party_id = contact.party_id
		WHERE rel.to_party_id = :clientId
			AND rel.relationship_type_code = 'CONTACT_OF'
			AND rel.status_code = 'ACTIVE'
		ORDER BY rel.is_primary DESC, contact.display_name
		`,
		{ clientId }
	);

	return rows as ClientContact[];
}

export interface CreateClientContactInput {
	clientId: number;
	firstName: string;
	lastName: string;
	relationshipLabel?: string | null;
	isPrimary?: boolean;
}

export async function createClientContact(input: CreateClientContactInput): Promise<number> {
	const connection = await db.getConnection();

	try {
		await connection.beginTransaction();

		const displayName = `${input.firstName} ${input.lastName}`.trim();

		const [partyResult] = await connection.query(
			`
			INSERT INTO party (
				party_type_code,
				display_name,
				status_code
			)
			VALUES (
				'PERSON',
				:displayName,
				'ACTIVE'
			)
			`,
			{ displayName }
		);

		const contactId = Number((partyResult as { insertId: number }).insertId);

		await connection.query(
			`
			INSERT INTO person (
				party_id,
				first_name,
				last_name
			)
			VALUES (
				:contactId,
				:firstName,
				:lastName
			)
			`,
			{
				contactId,
				firstName: input.firstName,
				lastName: input.lastName
			}
		);

		await connection.query(
			`
			INSERT INTO party_relationship (
				from_party_id,
				to_party_id,
				relationship_type_code,
				relationship_label,
				is_primary,
				status_code
			)
			VALUES (
				:contactId,
				:clientId,
				'CONTACT_OF',
				:relationshipLabel,
				:isPrimary,
				'ACTIVE'
			)
			`,
			{
				contactId,
				clientId: input.clientId,
				relationshipLabel: input.relationshipLabel ?? null,
				isPrimary: input.isPrimary ?? false
			}
		);

		await connection.commit();

		return contactId;
	} catch (error) {
		await connection.rollback();
		throw error;
	} finally {
		connection.release();
	}
}
