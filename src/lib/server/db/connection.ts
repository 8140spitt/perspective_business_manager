import 'dotenv/config';
import mysql from 'mysql2/promise';

const MYSQL_HOST = process.env.MYSQL_HOST ?? 'localhost';
const MYSQL_PORT = Number(process.env.MYSQL_PORT ?? 3306);
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

if (!MYSQL_DATABASE) {
	throw new Error('MYSQL_DATABASE is not set in .env');
}

if (!MYSQL_USER) {
	throw new Error('MYSQL_USER is not set in .env');
}

export const db = mysql.createPool({
	host: MYSQL_HOST,
	port: MYSQL_PORT,
	database: MYSQL_DATABASE,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	namedPlaceholders: true
});
