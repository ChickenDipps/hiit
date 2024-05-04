import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Opens the database and runs the migration from the migration folder
export async function main() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.migrate({ migrationsPath: './migration' });
  return db;
}

main();
