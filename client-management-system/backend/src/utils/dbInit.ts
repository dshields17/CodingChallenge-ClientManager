
import path from 'path';
import { Database } from 'sqlite';
import { readFileLines } from './fileUtil';


async function populateTable(db: Database, tableName: string, dataFile: string) {
    const items = await readFileLines(path.join(__dirname, '../../data', dataFile));

    const existingItems = await db.all(`SELECT Name FROM ${tableName}`);
    const existingNames = new Set(existingItems.map(item => item.Name));

    for (const item of items) {
        if (!existingNames.has(item)) {
            await db.run(`INSERT INTO ${tableName} (Name) VALUES (?)`, item);
            console.log(`Added ${item} to ${tableName}`);
        }
    }
}

export async function initializeTables(db: Database) {
    await populateTable(db, 'FundingSource', 'FundingSources.txt');
    await populateTable(db, 'Language', 'Languages.txt');
    console.log('Reference data initialized');
}