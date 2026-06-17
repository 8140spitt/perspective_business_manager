import { listSalesLifecycleRecords } from '$lib/packages/commercial/commercial.service.server';

export async function load() {
	const records = await listSalesLifecycleRecords();

	return {
		tenders: records.filter((record) => record.objectType === 'tender')
	};
}
