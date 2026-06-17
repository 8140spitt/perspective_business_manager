import { commercialRepository } from './commercial.repository.server';
import type { CreateSalesLifecycleInput, SalesLifecycleRecord, TransitionSalesLifecycleInput } from './commercial.types';
import {
	validateCreateSalesLifecycleInput,
	validateTransitionSalesLifecycleInput
} from './commercial.validators';

export const commercialService = {
	list(): SalesLifecycleRecord[] {
		return commercialRepository.list();
	},

	create(input: CreateSalesLifecycleInput): SalesLifecycleRecord {
		const validation = validateCreateSalesLifecycleInput(input);

		if (!validation.success) {
			throw new Error(validation.issues.join(' '));
		}

		return commercialRepository.create(input);
	},

	transition(input: TransitionSalesLifecycleInput): void {
		const validation = validateTransitionSalesLifecycleInput(input);

		if (!validation.success) {
			throw new Error(validation.issues.join(' '));
		}
	}
};
