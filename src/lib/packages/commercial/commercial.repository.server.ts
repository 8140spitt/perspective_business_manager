import type { CreateSalesLifecycleInput, SalesLifecycleRecord } from './commercial.types';

export const commercialRepository = {
	list(): SalesLifecycleRecord[] {
		return [];
	},

	create(input: CreateSalesLifecycleInput): SalesLifecycleRecord {
		return {
			id: 0,
			objectType: input.objectType,
			stageCode: 'new',
			reference: '',
			title: input.title
		};
	}
};
