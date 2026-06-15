export interface Property {
	propertyId: number;
	propertyName: string | null;
	addressId: number | null;
	propertyTypeCode: string | null;
	tenureCode: string | null;
	statusCode: string;
	createdAt: string;
	updatedAt: string | null;
}

export interface PropertyListItem {
	propertyId: number;
	propertyName: string | null;
	addressLine1: string | null;
	townCity: string | null;
	postcode: string | null;
	propertyTypeCode: string | null;
	statusCode: string;
}

export interface CreatePropertyInput {
	propertyName?: string | null;
	addressLine1: string;
	addressLine2?: string | null;
	townCity?: string | null;
	countyRegion?: string | null;
	postcode?: string | null;
	propertyTypeCode?: string | null;
	tenureCode?: string | null;
}

export interface LinkClientPropertyInput {
	clientId: number;
	propertyId: number;
	roleCode: string;
	relationshipLabel?: string | null;
	isPrimary?: boolean;
}
