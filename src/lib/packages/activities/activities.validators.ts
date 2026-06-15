export function requireText(value: string | undefined, fieldName: string): void {
	if (!value?.trim()) {
		throw new Error(`${fieldName} is required.`);
	}
}

export function requireId(value: number | undefined | null, fieldName: string): void {
	if (!value) {
		throw new Error(`${fieldName} is required.`);
	}
}
