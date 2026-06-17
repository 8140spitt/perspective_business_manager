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

export async function convertEnquiryToOpportunity(enquiryId: number): Promise<number> {
	const enquiry = await getSalesLifecycleRecordById('enquiry', enquiryId);

	if (!enquiry) {
		throw new Error('Enquiry was not found.');
	}

	if (enquiry.stageCode === 'converted') {
		throw new Error('Enquiry has already been converted.');
	}

	const opportunityId = await createSalesLifecycleRecord({
		objectType: 'opportunity',
		title: enquiry.title,
		summary: enquiry.summary,
		clientAccountId: enquiry.clientAccountId,
		partyId: enquiry.partyId,
		estimatedValue: enquiry.estimatedValue,
		estimatedCurrencyCode: enquiry.estimatedCurrencyCode,
		expectedDecisionDate: enquiry.expectedDecisionDate
	});

	await transitionSalesLifecycleRecord({
		objectType: 'enquiry',
		id: enquiry.id,
		stageCode: 'converted',
		reason: `Converted to opportunity ${opportunityId}`
	});

	return opportunityId;
}

export const commercialService = {
	list: listSalesLifecycleRecords,
	getById: getSalesLifecycleRecordById,
	create: createSalesLifecycleRecord,
	transition: transitionSalesLifecycleRecord,
	convertEnquiryToOpportunity
};
