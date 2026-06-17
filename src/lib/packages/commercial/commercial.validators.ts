import { SALES_OBJECT_TYPES, SALES_STAGE_CODES } from './commercial.constants';
import type { CreateSalesLifecycleInput, TransitionSalesLifecycleInput } from './commercial.types';

export type ValidationResult = {
	success: boolean;
	issues: string[];
};

function isPositiveInteger(value: unknown): value is number {
	return Number.isInteger(value) && Number(value) > 0;
}

export function validateCreateSalesLifecycleInput(input: CreateSalesLifecycleInput): ValidationResult {
	const issues: string[] = [];

	if (!SALES_OBJECT_TYPES.includes(input.objectType)) {
		issues.push('objectType must be a supported sales object type.');
	}

	if (!input.title || input.title.trim().length === 0) {
		issues.push('title is required.');
	}

	if (input.clientAccountId !== undefined && input.clientAccountId !== null && !isPositiveInteger(input.clientAccountId)) {
		issues.push('clientAccountId must be a positive integer when supplied.');
	}

	if (input.partyId !== undefined && input.partyId !== null && !isPositiveInteger(input.partyId)) {
		issues.push('partyId must be a positive integer when supplied.');
	}

	if (input.estimatedValue !== undefined && input.estimatedValue !== null && input.estimatedValue < 0) {
		issues.push('estimatedValue cannot be negative.');
	}

	if (input.estimatedCurrencyCode && input.estimatedCurrencyCode.length !== 3) {
		issues.push('estimatedCurrencyCode must be a three-character ISO currency code.');
	}

	return {
		success: issues.length === 0,
		issues
	};
}

export function validateTransitionSalesLifecycleInput(input: TransitionSalesLifecycleInput): ValidationResult {
	const issues: string[] = [];

	if (!Number.isInteger(input.id) || input.id <= 0) {
		issues.push('id must be a positive integer.');
	}

	if (!SALES_OBJECT_TYPES.includes(input.objectType)) {
		issues.push('objectType must be a supported sales object type.');
	}

	if (!SALES_STAGE_CODES.includes(input.stageCode)) {
		issues.push('stageCode must be a supported sales stage.');
	}

	if (input.changedBy !== undefined && input.changedBy !== null && !isPositiveInteger(input.changedBy)) {
		issues.push('changedBy must be a positive integer when supplied.');
	}

	return {
		success: issues.length === 0,
		issues
	};
}

export function validateCommercialInput(input: unknown): ValidationResult {
	void input;
	return { success: true, issues: [] };
}
