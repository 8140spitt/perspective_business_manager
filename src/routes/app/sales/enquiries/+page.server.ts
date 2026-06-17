import { listSalesLifecycleRecords } from '$lib/packages/commercial/commercial.service.server';

export async function load() {
	const records = await listSalesLifecycleRecords();

	return {
		enquiries: records.filter((record) => record.objectType === 'enquiry')
	};
}
