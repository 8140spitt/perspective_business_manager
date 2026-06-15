export interface ClientAccount {
	clientAccountId: number;
	partyId: number;
	clientReference: string;
	clientTypeCode: string;
	statusCode: string;
	onboardingStatusCode: string;
	sourceCode: string | null;
	openedAt: string;
	closedAt: string | null;
	createdAt: string;
	updatedAt: string | null;
}

export interface CreateClientAccountInput {
	partyId: number;
	clientReference?: string | null;
	clientTypeCode?: string;
	onboardingStatusCode?: string;
	sourceCode?: string | null;
}
