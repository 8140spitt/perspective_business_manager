import type { SALES_OBJECT_TYPES, SALES_STAGE_CODES } from './commercial.constants';

export type SalesObjectType = (typeof SALES_OBJECT_TYPES)[number];

export type SalesStageCode = (typeof SALES_STAGE_CODES)[number];

export type SalesLifecycleRecord = {
	id: number;
	objectType: SalesObjectType;
	stageCode: SalesStageCode;
	reference: string;
	title: string;
	clientAccountId?: number;
	partyId?: number;
	estimatedValue?: number;
	estimatedCurrencyCode?: string;
	expectedDecisionDate?: string;
	createdAt?: string;
	updatedAt?: string;
};

export type CreateSalesLifecycleInput = {
	objectType: SalesObjectType;
	title: string;
	clientAccountId?: number;
	partyId?: number;
	estimatedValue?: number;
	estimatedCurrencyCode?: string;
	expectedDecisionDate?: string;
};

export type TransitionSalesLifecycleInput = {
	id: number;
	stageCode: SalesStageCode;
	reason?: string;
};
