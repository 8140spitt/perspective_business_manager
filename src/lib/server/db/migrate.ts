import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './connection';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaDir = path.join(__dirname, 'schema');

function splitSqlStatements(sql: string) {
	return sql
		.split(';')
		.map((statement) => statement.trim())
		.filter(Boolean);
}

async function run() {
	const files = await fs.readdir(schemaDir);

	const sqlFiles = files.filter((file) => file.endsWith('.sql')).sort();

	for (const file of sqlFiles) {
		const filePath = path.join(schemaDir, file);
		const sql = await fs.readFile(filePath, 'utf8');

		if (!sql.trim()) {
			console.log(`Skipping empty migration: ${file}`);
			continue;
		}

		console.log(`Running migration: ${file}`);

		const statements = splitSqlStatements(sql);

		for (const statement of statements) {
			await db.query(statement);
		}
	}

	console.log('Migrations complete.');
	await db.end();
}

run().catch((error) => {
	console.error('Migration failed.');
	console.error(error);
	process.exit(1);
});
