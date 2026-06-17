import { db } from '$lib/server/db/connection';
import type {
	CreateSalesLifecycleInput,
	SalesLifecycleRecord,
	SalesObjectType,
	TransitionSalesLifecycleInput
} from './commercial.types';

type CommercialObjectConfig = {
	tableName: string;
	idColumn: string;
	referenceColumn: string;
	referencePrefix: string;
	defaultStageCode: string;
};

const commercialObjectConfig: Record<SalesObjectType, CommercialObjectConfig> = {
	lead: {
		tableName: 'lead_record',
		idColumn: 'lead_id',
		referenceColumn: 'lead_reference',
		referencePrefix: 'LEAD',
		defaultStageCode: 'new'
	},
	enquiry: {
		tableName: 'enquiry',
		idColumn: 'enquiry_id',
		referenceColumn: 'enquiry_reference',
		referencePrefix: 'ENQ',
		defaultStageCode: 'new'
	},
	opportunity: {
		tableName: 'opportunity',
		idColumn: 'opportunity_id',
		referenceColumn: 'opportunity_reference',
		referencePrefix: 'OPP',
		defaultStageCode: 'new'
	},
	proposal: {
		tableName: 'proposal',
		idColumn: 'proposal_id',
		referenceColumn: 'proposal_reference',
		referencePrefix: 'PROP',
		defaultStageCode: 'draft'
	},
	quotation: {
		tableName: 'quotation',
		idColumn: 'quotation_id',
		referenceColumn: 'quotation_reference',
		referencePrefix: 'QUO',
		defaultStageCode: 'draft'
	},
	tender: {
		tableName: 'tender',
		idColumn: 'tender_id',
		referenceColumn: 'tender_reference',
		referencePrefix: 'TEN',
		defaultStageCode: 'draft'
	}
};

const commercialLifecycleSelect = `
	SELECT
		lead_id AS id,
		'lead' AS objectType,
		status_code AS stageCode,
		lead_reference AS reference,
		title,
		client_account_id AS clientAccountId,
		party_id AS partyId,
		estimated_value AS estimatedValue,
		estimated_currency_code AS estimatedCurrencyCode,
		expected_decision_date AS expectedDecisionDate,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM lead_record
	UNION ALL
	SELECT
		enquiry_id AS id,
		'enquiry' AS objectType,
		status_code AS stageCode,
		enquiry_reference AS reference,
		title,
		client_account_id AS clientAccountId,
		party_id AS partyId,
		estimated_value AS estimatedValue,
		estimated_currency_code AS estimatedCurrencyCode,
		expected_decision_date AS expectedDecisionDate,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM enquiry
	UNION ALL
	SELECT
		opportunity_id AS id,
		'opportunity' AS objectType,
		status_code AS stageCode,
		opportunity_reference AS reference,
		title,
		client_account_id AS clientAccountId,
		party_id AS partyId,
		estimated_value AS estimatedValue,
		estimated_currency_code AS estimatedCurrencyCode,
		expected_decision_date AS expectedDecisionDate,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM opportunity
	UNION ALL
	SELECT
		proposal_id AS id,
		'proposal' AS objectType,
		status_code AS stageCode,
		proposal_reference AS reference,
		title,
		client_account_id AS clientAccountId,
		party_id AS partyId,
		net_amount AS estimatedValue,
		currency_code AS estimatedCurrencyCode,
		NULL AS expectedDecisionDate,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM proposal
	UNION ALL
	SELECT
		quotation_id AS id,
		'quotation' AS objectType,
		status_code AS stageCode,
		quotation_reference AS reference,
		title,
		client_account_id AS clientAccountId,
		party_id AS partyId,
		net_amount AS estimatedValue,
		currency_code AS estimatedCurrencyCode,
		NULL AS expectedDecisionDate,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM quotation
	UNION ALL
	SELECT
		tender_id AS id,
		'tender' AS objectType,
		status_code AS stageCode,
		tender_reference AS reference,
		title,
		client_account_id AS clientAccountId,
		party_id AS partyId,
		NULL AS estimatedValue,
		NULL AS estimatedCurrencyCode,
		NULL AS expectedDecisionDate,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM tender
`;

function getConfig(objectType: SalesObjectType): CommercialObjectConfig {
	return commercialObjectConfig[objectType];
}

function createReference(config: CommercialObjectConfig, input: CreateSalesLifecycleInput): string {
	return input.reference ?? `${config.referencePrefix}-${Date.now()}`;
}

export async function listSalesLifecycleRecords(): Promise<SalesLifecycleRecord[]> {
	const [rows] = await db.query(`${commercialLifecycleSelect} ORDER BY createdAt DESC`);
	return rows as SalesLifecycleRecord[];
}

export async function getSalesLifecycleRecordById(
	objectType: SalesObjectType,
	id: number
): Promise<SalesLifecycleRecord | null> {
	const config = getConfig(objectType);
	const [rows] = await db.query(
		`
		SELECT *
		FROM (${commercialLifecycleSelect}) commercial_lifecycle
		WHERE objectType = :objectType
		AND id = :id
		LIMIT 1
		`,
		{ objectType, id }
	);

	return (rows as SalesLifecycleRecord[])[0] ?? null;
}

export async function createSalesLifecycleRecord(input: CreateSalesLifecycleInput): Promise<number> {
	const config = getConfig(input.objectType);
	const reference = createReference(config, input);

	const [result] = await db.query(
		`
		INSERT INTO ${config.tableName} (
			${config.referenceColumn},
			client_account_id,
			party_id,
			status_code,
			title
		)
		VALUES (
			:reference,
			:clientAccountId,
			:partyId,
			:stageCode,
			:title
		)
		`,
		{
			reference,
			clientAccountId: input.clientAccountId ?? null,
			partyId: input.partyId ?? null,
			stageCode: config.defaultStageCode,
			title: input.title
		}
	);

	return Number((result as { insertId: number }).insertId);
}

export async function transitionSalesLifecycleRecord(input: TransitionSalesLifecycleInput): Promise<void> {
	const config = getConfig(input.objectType);
	const current = await getSalesLifecycleRecordById(input.objectType, input.id);

	await db.query(
		`
		UPDATE ${config.tableName}
		SET status_code = :stageCode
		WHERE ${config.idColumn} = :id
		`,
		{
			id: input.id,
			stageCode: input.stageCode
		}
	);

	await db.query(
		`
		INSERT INTO commercial_status_history (
			object_type_code,
			object_id,
			from_status_code,
			to_status_code,
			reason,
			changed_by
		)
		VALUES (
			:objectType,
			:id,
			:fromStageCode,
			:toStageCode,
			:reason,
			:changedBy
		)
		`,
		{
			objectType: input.objectType,
			id: input.id,
			fromStageCode: current?.stageCode ?? null,
			toStageCode: input.stageCode,
			reason: input.reason ?? null,
			changedBy: input.changedBy ?? null
		}
	);
}

export const commercialRepository = {
	list: listSalesLifecycleRecords,
	getById: getSalesLifecycleRecordById,
	create: createSalesLifecycleRecord,
	transition: transitionSalesLifecycleRecord
};
