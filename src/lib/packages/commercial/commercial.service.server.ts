import { commercialRepository } from './commercial.repository.server';
import type { CreateSalesLifecycleInput, SalesLifecycleRecord, TransitionSalesLifecycleInput } from './commercial.types';
import {
	validateCreateSalesLifecycleInput,
	validateTransitionSalesLifecycleInput
} from './commercial.validators';

export async function listSalesLifecycleRecords(): Promise<SalesLifecycleRecord[]> {
	return commercialRepository.list();
}

export async function getSalesLifecycleRecordById(
	objectType: CreateSalesLifecycleInput['objectType'],
	id: number
): Promise<SalesLifecycleRecord | null> {
	return commercialRepository.getById(objectType, id);
}

export async function createSalesLifecycleRecord(input: CreateSalesLifecycleInput): Promise<number> {
	const validation = validateCreateSalesLifecycleInput(input);

	if (!validation.success) {
		throw new Error(validation.issues.join(' '));
	}

	return commercialRepository.create(input);
}

export async function transitionSalesLifecycleRecord(input: TransitionSalesLifecycleInput): Promise<void> {
	const validation = validateTransitionSalesLifecycleInput(input);

	if (!validation.success) {
		throw new Error(validation.issues.join(' '));
	}

	await commercialRepository.transition(input);
}

export const commercialService = {
	list: listSalesLifecycleRecords,
	getById: getSalesLifecycleRecordById,
	create: createSalesLifecycleRecord,
	transition: transitionSalesLifecycleRecord
};
