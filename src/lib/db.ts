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
		id INTEGER PRIMARY KEY,
		name TEXT,
		long_name TEXT
	);
`);
db.exec(`INSERT INTO product_type(id, name, long_name) VALUES (1, 'CPU', 'Processzor');`);
db.exec(`INSERT INTO product_type(id, name, long_name) VALUES (2, 'RAM', 'Memória');`);
db.exec(`INSERT INTO product_type(id, name, long_name) VALUES (3, 'MOBO', 'Alaplap');`);
db.exec(`INSERT INTO product_type(id, name, long_name) VALUES (4, 'CASE', 'Számítógép ház');`);

export interface CPU extends Product {
	clockMHZ: number;
	cores: number;
}

export interface RAM extends Product {
	speedMHZ: number;
	sizeGB: number;
}

export interface MOBO extends Product {
	size: string;
}

export interface CASE extends Product {
	size: string;
}

export interface Product {
	id: string;
	type_id: number;
	name: string;
	price: number;
	image: string;
	vendor: string;
	data: string;
}

db.exec(`
	CREATE TABLE IF NOT EXISTS product (
		id TEXT PRIMARY KEY,
		type_id INTEGER,
		name TEXT,
		price INTEGER,
		image TEXT,
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

export async function getProductById<T extends Product>(productId: string): Promise<T | undefined> {
	const sql = db.prepare<string, Product>(`SELECT * FROM products WHERE id = ?`);
	const product = sql.get(productId);
	switch (product?.type_id) {
		case 0:
			return { ...product, ...JSON.parse(product.data) } satisfies CPU;
		case 1:
			return { ...product, ...JSON.parse(product.data) } satisfies RAM;
		case 2:
			return { ...product, ...JSON.parse(product.data) } satisfies MOBO;
		case 3:
			return { ...product, ...JSON.parse(product.data) } satisfies CASE;
		default:
			return undefined;
	}
}

export async function getProductTypeFromName(name: string): Promise<ProductType | undefined> {
	const sql = db.prepare<string, ProductType>(`SELECT * FROM product_type WHERE name = ?`);
	return sql.get(name);
}

export async function getProductsInCategory(categoryId: number): Promise<Product[]> {
	const sql = db.prepare<number, Product>(`SELECT * FROM product WHERE type_id = ?`);
	return sql.all(categoryId);
}
