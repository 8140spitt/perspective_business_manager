import type { SALES_OBJECT_TYPES, SALES_STAGE_CODES } from './commercial.constants';

export type SalesObjectType = (typeof SALES_OBJECT_TYPES)[number];

export type SalesStageCode = (typeof SALES_STAGE_CODES)[number];

export type SalesLifecycleRecord = {
	id: number;
	objectType: SalesObjectType;
	stageCode: SalesStageCode;
	reference: string;
	title: string;
	summary: string | null;
	clientAccountId: number | null;
	partyId: number | null;
	estimatedValue: number | null;
	estimatedCurrencyCode: string | null;
	expectedDecisionDate: string | null;
	createdAt: string | null;
	updatedAt: string | null;
};

export type CreateSalesLifecycleInput = {
	objectType: SalesObjectType;
	reference?: string;
	title: string;
	summary?: string | null;
	clientAccountId?: number | null;
	partyId?: number | null;
	estimatedValue?: number | null;
	estimatedCurrencyCode?: string | null;
	expectedDecisionDate?: string | null;
};

export type TransitionSalesLifecycleInput = {
	id: number;
	objectType: SalesObjectType;
	stageCode: SalesStageCode;
	reason?: string | null;
	changedBy?: number | null;
};