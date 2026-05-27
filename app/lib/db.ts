// app/lib/db.ts
import { createKysely } from '@vercel/postgres-kysely';
import { Generated } from 'kysely';

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

// Create database connection
export const db = createKysely<Database>();