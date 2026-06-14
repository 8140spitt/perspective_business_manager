import { db } from '$lib/server/db/connection';
import type { Property, PropertyListItem } from './properties.types';

export async function listProperties(): Promise<PropertyListItem[]> {
	const [rows] = await db.query(`
		SELECT
			p.property_id AS propertyId,
			p.property_name AS propertyName,
			a.address_line_1 AS addressLine1,
			a.town_city AS townCity,
			a.postcode AS postcode,
			p.property_type_code AS propertyTypeCode,
			p.status_code AS statusCode
		FROM property p
		LEFT JOIN address a
			ON a.address_id = p.address_id
		ORDER BY p.created_at DESC
	`);

	return rows as PropertyListItem[];
}

export async function getPropertyById(propertyId: number): Promise<Property | null> {
	const [rows] = await db.query(
		`
		SELECT
			property_id AS propertyId,
			property_name AS propertyName,
			address_id AS addressId,
			property_type_code AS propertyTypeCode,
			tenure_code AS tenureCode,
			status_code AS statusCode,
			created_at AS createdAt,
			updated_at AS updatedAt
		FROM property
		WHERE property_id = :propertyId
		LIMIT 1
		`,
		{ propertyId }
	);

	const result = rows as Property[];
	return result[0] ?? null;
}

export interface CreatePropertyInput {
	propertyName?: string | null;
	addressLine1: string;
	addressLine2?: string | null;
	townCity?: string | null;
	countyRegion?: string | null;
	postcode?: string | null;
	propertyTypeCode?: string | null;
	tenureCode?: string | null;
}

export async function createProperty(input: CreatePropertyInput): Promise<number> {
	const connection = await db.getConnection();

	try {
		await connection.beginTransaction();

		const [addressResult] = await connection.query(
			`
			INSERT INTO address (
				address_line_1,
				address_line_2,
				town_city,
				county_region,
				postcode,
				country_code
			)
			VALUES (
				:addressLine1,
				:addressLine2,
				:townCity,
				:countyRegion,
				:postcode,
				'GB'
			)
			`,
			{
				addressLine1: input.addressLine1,
				addressLine2: input.addressLine2 ?? null,
				townCity: input.townCity ?? null,
				countyRegion: input.countyRegion ?? null,
				postcode: input.postcode ?? null
			}
		);

		const addressId = Number((addressResult as { insertId: number }).insertId);

		const propertyReference = `PROP-${Date.now()}`;

		const [propertyResult] = await connection.query(
			`
	INSERT INTO property (
		property_reference,
		property_name,
		address_id,
		property_type_code,
		tenure_code,
		status_code
	)
	VALUES (
		:propertyReference,
		:propertyName,
		:addressId,
		:propertyTypeCode,
		:tenureCode,
		'ACTIVE'
	)
	`,
			{
				propertyReference,
				propertyName: input.propertyName ?? null,
				addressId,
				propertyTypeCode: input.propertyTypeCode ?? null,
				tenureCode: input.tenureCode ?? null
			}
		);

		await connection.commit();

		return Number((propertyResult as { insertId: number }).insertId);
	} catch (error) {
		await connection.rollback();
		throw error;
	} finally {
		connection.release();
	}
}
