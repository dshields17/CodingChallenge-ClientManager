import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import { initializeTables } from '../utils/dbInit';

export async function openDb(): Promise<Database> {
    return open({
        filename: path.resolve(__dirname, '../../', process.env.DATABASE_PATH || 'database.sqlite'),
        driver: sqlite3.Database
    });
}

export async function initDb() {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS Language (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS FundingSource (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS Client (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          GivenName TEXT NOT NULL,
          Surname TEXT NOT NULL,
          DateOfBirth DATE NOT NULL,
          PrimaryLanguageId INTEGER,
          SecondaryLanguageId INTEGER,
          FundingSourceId INTEGER NOT NULL,
          FOREIGN KEY (PrimaryLanguageId) REFERENCES Language(Id),
          FOREIGN KEY (SecondaryLanguageId) REFERENCES Language(Id),
          FOREIGN KEY (FundingSourceId) REFERENCES FundingSource(Id)
        );
    `);

    await initializeTables(db);

    console.log('Database initialized');
}