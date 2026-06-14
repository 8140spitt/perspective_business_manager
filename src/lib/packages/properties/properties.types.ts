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
