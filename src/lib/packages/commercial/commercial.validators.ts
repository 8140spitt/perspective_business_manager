import { SALES_OBJECT_TYPES, SALES_STAGE_CODES } from './commercial.constants';
import type { CreateSalesLifecycleInput, TransitionSalesLifecycleInput } from './commercial.types';

export type ValidationResult = {
	success: boolean;
	issues: string[];
};

export function validateCreateSalesLifecycleInput(input: CreateSalesLifecycleInput): ValidationResult {
	const issues: string[] = [];

	if (!SALES_OBJECT_TYPES.includes(input.objectType)) {
		issues.push('objectType must be a supported sales object type.');
	}

	if (!input.title || input.title.trim().length === 0) {
		issues.push('title is required.');
	}

	if (input.estimatedValue !== undefined && input.estimatedValue < 0) {
		issues.push('estimatedValue cannot be negative.');
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

	if (!SALES_STAGE_CODES.includes(input.stageCode)) {
		issues.push('stageCode must be a supported sales stage.');
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
