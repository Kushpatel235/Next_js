// app/lib/db.ts
import { createKysely } from '@vercel/postgres-kysely';
import type { Generated, Kysely } from 'kysely';

// Define our database schema
export interface Database {
  books: BooksTable;
  users: UsersTable;
}

export interface BooksTable {
  id: Generated<number>;
  title: string;
  author: string;
  year: number;
  created_at: Generated<Date>;
}

export interface UsersTable {
  id: Generated<number>;
  email: string;
  password: string;
  created_at: Generated<Date>;
}

let cachedDb: Kysely<Database> | null = null;

export function hasDatabaseUrl() {
  return Boolean(process.env.POSTGRES_URL);
}

function getDb() {
  if (!hasDatabaseUrl()) {
    throw new Error('POSTGRES_URL is not configured.');
  }

  cachedDb ??= createKysely<Database>();
  return cachedDb;
}

// Delay creating the Vercel Postgres client until a query is actually run.
export const db = new Proxy({} as Kysely<Database>, {
  get(_target, property, receiver) {
    const value = Reflect.get(getDb(), property, receiver);
    return typeof value === 'function' ? value.bind(getDb()) : value;
  },
});
