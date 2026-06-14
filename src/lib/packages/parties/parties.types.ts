export type PartyTypeCode = 'PERSON' | 'ORGANISATION';

export type PartyStatusCode = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface Party {
	partyId: number;
	partyTypeCode: PartyTypeCode;
	displayName: string;
	statusCode: PartyStatusCode;
	createdAt: string;
	updatedAt: string | null;
}
