import Database from 'better-sqlite3';
import BetterSqlite3 from 'better-sqlite3';
import * as bcrypt from 'bcrypt';

const db: BetterSqlite3.Database = new Database('db.sqlite', { verbose: console.log });

export interface User {
	id: number;
	isAdmin: number;
	username: string;
	password: string;
	email: string;
}

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      	id INTEGER PRIMARY KEY AUTOINCREMENT,
		isAdmin INTEGER NOT NULL,
      	username TEXT UNIQUE NOT NULL,
      	password TEXT NOT NULL,
      	email TEXT UNIQUE
    );
`);

export interface Session {
	id: string;
	user_id: number;
}

db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      	session_id TEXT PRIMARY KEY,
      	user_id INTEGER,
      	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
`);

export interface ProductType {
	id: number;
	name: string;
	long_name: string;
}

db.exec(`
	CREATE TABLE IF NOT EXISTS product_type (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT,
		long_name TEXT
	);
`);
db.exec(`INSERT INTO product_type(name, long_name) VALUES ('CPU', 'Processor');`);
db.exec(`INSERT INTO product_type(name, long_name) VALUES ('RAM', 'Memory');`);
db.exec(`INSERT INTO product_type(name, long_name) VALUES ('MOBO', 'Motherboard');`);
db.exec(`INSERT INTO product_type(name, long_name) VALUES ('CASE', 'Computer case');`);

export interface Product {
	id: number;
	type_id: number;
	name: string;
	price: number;
	vendor: string;
	data: string;
}

db.exec(`
	CREATE TABLE IF NOT EXISTS product (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		type_id INTEGER,
		name TEXT,
		price INTEGER,
		vendor TEXT,
		data TEXT,
		FOREIGN KEY (type_id) REFERENCES product_type(id) ON DELETE CASCADE
	);
`);

export interface Basket {
	id: number;
	user_id: number;
	product_id: string;
}

db.exec(`
	CREATE TABLE IF NOT EXISTS basket (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER,
		product_id TEXT,
      	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
		FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
	);
`);

export interface UserSession {
	user: User;
	session: Session;
}

export async function createUser(
	username: string,
	password: string,
	email: string
): Promise<number> {
	const sql1 = db.prepare<[], { 'COUNT(*)': number }>(`SELECT COUNT(*) FROM users;`);
	const isFirstUser: number = sql1.get()!['COUNT(*)'] > 0 ? 0 : 1;
	const sql2 = db.prepare<[number, string, string, string]>(
		`INSERT INTO users (isAdmin, username, password, email) VALUES (?, ?, ?, ?);`
	);
	password = bcrypt.hashSync(password, 10);
	return sql2.run(isFirstUser, username, password, email).lastInsertRowid as number;
}

export async function checkLogin(
	username: string,
	password: string
): Promise<UserSession | undefined> {
	const sql = db.prepare<string, User>(`SELECT * FROM users WHERE username = ?`);
	const user = sql.get(username);
	if (user && bcrypt.compareSync(password, user.password)) {
		const sid = crypto.randomUUID();
		const sql2 = db.prepare<[string, number]>(
			`INSERT INTO sessions (session_id, user_id) VALUES (?, ?)`
		);
		sql2.run(sid, user.id);
		return { user: user, session: { id: sid, user_id: user.id } };
	} else {
		return undefined;
	}
}

export async function getUserBySID(sid: string | undefined): Promise<User | undefined> {
	if (!sid) return undefined;
	const sql = db.prepare<string, User>(`
		SELECT users.*
      	FROM users
      	JOIN sessions ON users.id = sessions.user_id
      	WHERE sessions.session_id = ?;
	`);
	return sql.get(sid);
}

export async function removeSession(sid: string): Promise<boolean> {
	const sql = db.prepare(`DELETE FROM sessions WHERE session_id = ?`);
	return sql.run(sid).changes > 0;
}

export async function deleteUser(id: number): Promise<boolean> {
	const sql = db.prepare(`DELETE FROM users WHERE id = ?`);
	return sql.run(id).changes > 0;
}

export async function addToBasket(userId: number, productId: string): Promise<boolean> {
	const sql = db.prepare(`INSERT INTO basket(user_id, product_id) VALUES (?, ?)`);
	return sql.run(userId, productId).changes > 0;
}

export async function getProductById(productId: string): Promise<Product | undefined> {
	const sql = db.prepare<string, Product>(`SELECT * FROM product WHERE id = ?`);
	return sql.get(productId);
}

export async function getProductTypeFromName(name: string): Promise<ProductType | undefined> {
	const sql = db.prepare<string, ProductType>(`SELECT * FROM product_type WHERE name = ?`);
	return sql.get(name);
}

export async function getProductsInCategory(categoryId: number): Promise<Product[]> {
	const sql = db.prepare<number, Product>(`SELECT * FROM product WHERE type_id = ?`);
	return sql.all(categoryId);
}

export async function createCategory(name: string, long_name: string): Promise<boolean> {
	const sql = db.prepare(`INSERT INTO product_type(name, long_name) VALUES (?, ?)`);
	return sql.run(name, long_name).changes > 0;
}

export async function createProduct(
	type_id: number,
	name: string,
	price: number,
	vendor: string,
	extra: string
): Promise<number> {
	const sql = db.prepare(
		`INSERT INTO product(type_id, name, price, vendor, data) VALUES (?, ?, ?, ?, ?)`
	);
	return sql.run(type_id, name, price, vendor, extra).lastInsertRowid as number;
}

export async function getCategories(): Promise<ProductType[]> {
	const sql = db.prepare<[], ProductType>(`SELECT * FROM product_type`);
	return sql.all();
}
