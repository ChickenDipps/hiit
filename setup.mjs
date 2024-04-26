import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.migrate({ migrationsPath: './migration' });
  return db;
}

init();
