import {
	createClientAccount,
	getClientAccountById,
	getClientAccountByPartyId,
	listClientAccounts
} from './client-accounts.repository.server';
import type { ClientAccount, CreateClientAccountInput } from './client-accounts.types';
import { validateCreateClientAccount } from './client-accounts.validators';

export async function getClientAccounts(): Promise<ClientAccount[]> {
	return listClientAccounts();
}

export async function getClientAccount(clientAccountId: number): Promise<ClientAccount> {
	const clientAccount = await getClientAccountById(clientAccountId);

	if (!clientAccount) {
		throw new Error('Client account not found.');
	}

	return clientAccount;
}

export async function getClientAccountForParty(partyId: number): Promise<ClientAccount | null> {
	return getClientAccountByPartyId(partyId);
}

export async function createClientAccountRecord(input: CreateClientAccountInput): Promise<number> {
	validateCreateClientAccount(input);
	return createClientAccount(input);
}
