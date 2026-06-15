import { createClient, getPartyById, listClients, listParties } from './parties.repository.server';
import { createClientAccountRecord } from '$lib/packages/client-accounts/client-accounts.service.server';
import type { CreateClientInput, Party } from './parties.types';
import { validateCreateClient } from './parties.validators';

export async function getParties(): Promise<Party[]> {
	return listParties();
}

export async function getParty(partyId: number): Promise<Party> {
	const party = await getPartyById(partyId);

	if (!party) {
		throw new Error('Party not found.');
	}

	return party;
}

export async function getClients(): Promise<Party[]> {
	return listClients();
}

export async function createClientRecord(input: CreateClientInput): Promise<number> {
	validateCreateClient(input);

	const partyId = await createClient(input);

	await createClientAccountRecord({
		partyId,
		clientReference: `CLI-${partyId.toString().padStart(6, '0')}`,
		clientTypeCode: 'STANDARD',
		onboardingStatusCode: 'NEW'
	});

	return partyId;
}
