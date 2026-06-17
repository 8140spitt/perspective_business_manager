const fs = require('fs');
const path = require('path');

const dirs = [
	'src/routes/app/dashboard',
	'src/routes/app/customers',
	'src/routes/app/sales',
	'src/routes/app/projects',
	'src/routes/app/operations',
	'src/routes/app/resources',
	'src/routes/app/procurement',
	'src/routes/app/finance',
	'src/routes/app/assets',
	'src/routes/app/documents',
	'src/routes/app/compliance',
	'src/routes/app/reporting',
	'src/routes/app/administration',

	'src/routes/app/parties/[partyId]',
	'src/routes/app/properties/[propertyId]',
	'src/routes/app/instructions/[instructionId]',
	'src/routes/app/workflows',
	'src/routes/app/evidence',
	'src/routes/app/surveys',
	'src/routes/app/reports',
	'src/routes/app/admin/reference-data',

	'src/lib/server/db/schema',
	'src/lib/server/auth',

	'src/lib/components/app-shell',
	'src/lib/components/forms',
	'src/lib/components/tables',
	'src/lib/components/status',
	'src/lib/components/workflow',

	'src/lib/packages/core',
	'src/lib/packages/reference-data',
	'src/lib/packages/parties',
	'src/lib/packages/client-accounts',
	'src/lib/packages/supplier-accounts',
	'src/lib/packages/assets',
	'src/lib/packages/properties',
	'src/lib/packages/agreements',
	'src/lib/packages/commercial',
	'src/lib/packages/contracts',
	'src/lib/packages/projects',
	'src/lib/packages/work',
	'src/lib/packages/activities',
	'src/lib/packages/resources',
	'src/lib/packages/procurement',
	'src/lib/packages/finance',
	'src/lib/packages/documents',
	'src/lib/packages/evidence',
	'src/lib/packages/controls',
	'src/lib/packages/compliance',
	'src/lib/packages/workflows',
	'src/lib/packages/events',
	'src/lib/packages/frameworks',
	'src/lib/packages/audit',
	'src/lib/packages/reports',
	'src/lib/packages/integrations',
	'src/lib/packages/administration',
	'src/lib/packages/inspections',
	'src/lib/packages/building-surveying'
];

const files = [
	'src/hooks.server.ts',

	'src/lib/server/db/connection.ts',
	'src/lib/server/db/migrate.ts',

	'src/lib/server/db/schema/001_core.sql',
	'src/lib/server/db/schema/002_seed_reference_data.sql',
	'src/lib/server/db/schema/003_building_surveying.sql',
	'src/lib/server/db/schema/004_schedule_of_conditions.sql',
	'src/lib/server/db/schema/005_dilapidations.sql',
	'src/lib/server/db/schema/006_reinstatement_cost_assessment.sql',
	'src/lib/server/db/schema/007_insurance_reinstatement.sql',
	'src/lib/server/db/schema/008_project_management.sql',
	'src/lib/server/db/schema/009_commercial_property.sql',
	'src/lib/server/db/schema/010_finance.sql',
	'src/lib/server/db/schema/011_compliance.sql',

	'src/routes/app/+layout.svelte',
	'src/routes/app/+page.svelte',

	'src/routes/app/parties/+page.server.ts',
	'src/routes/app/parties/+page.svelte',
	'src/routes/app/parties/[partyId]/+page.server.ts',
	'src/routes/app/parties/[partyId]/+page.svelte',

	'src/routes/app/properties/+page.server.ts',
	'src/routes/app/properties/+page.svelte',
	'src/routes/app/properties/[propertyId]/+page.server.ts',
	'src/routes/app/properties/[propertyId]/+page.svelte',

	'src/routes/app/instructions/+page.server.ts',
	'src/routes/app/instructions/+page.svelte',
	'src/routes/app/instructions/[instructionId]/+page.server.ts',
	'src/routes/app/instructions/[instructionId]/+page.svelte',

	'src/routes/app/workflows/+page.server.ts',
	'src/routes/app/workflows/+page.svelte',
	'src/routes/app/documents/+page.server.ts',
	'src/routes/app/documents/+page.svelte',
	'src/routes/app/evidence/+page.server.ts',
	'src/routes/app/evidence/+page.svelte',
	'src/routes/app/surveys/+page.server.ts',
	'src/routes/app/surveys/+page.svelte',
	'src/routes/app/reports/+page.server.ts',
	'src/routes/app/reports/+page.svelte',
	'src/routes/app/finance/+page.server.ts',
	'src/routes/app/finance/+page.svelte',
	'src/routes/app/compliance/+page.server.ts',
	'src/routes/app/compliance/+page.svelte',
	'src/routes/app/admin/reference-data/+page.server.ts',
	'src/routes/app/admin/reference-data/+page.svelte'
];

const packages = [
	'core',
	'reference-data',
	'parties',
	'client-accounts',
	'supplier-accounts',
	'assets',
	'properties',
	'agreements',
	'commercial',
	'contracts',
	'projects',
	'work',
	'activities',
	'resources',
	'procurement',
	'finance',
	'documents',
	'evidence',
	'controls',
	'compliance',
	'workflows',
	'events',
	'frameworks',
	'audit',
	'reports',
	'integrations',
	'administration',
	'inspections',
	'building-surveying'
];

for (const dir of dirs) {
	fs.mkdirSync(path.resolve(dir), { recursive: true });
}

for (const file of files) {
	const fullPath = path.resolve(file);
	fs.mkdirSync(path.dirname(fullPath), { recursive: true });

	if (!fs.existsSync(fullPath)) {
		fs.writeFileSync(fullPath, '', 'utf8');
	}
}

for (const pkg of packages) {
	const base = `src/lib/packages/${pkg}`;

	const packageFiles = [
		'index.ts',
		`${pkg}.types.ts`,
		`${pkg}.repository.server.ts`,
		`${pkg}.service.server.ts`,
		`${pkg}.validators.ts`,
		`${pkg}.constants.ts`
	];

	for (const file of packageFiles) {
		const fullPath = path.resolve(base, file);
		fs.mkdirSync(path.dirname(fullPath), { recursive: true });

		if (!fs.existsSync(fullPath)) {
			fs.writeFileSync(fullPath, '', 'utf8');
		}
	}
}

console.log('Perspective OS folder structure created successfully.');
