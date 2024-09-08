import { openDb } from '../config/database';
import { Client } from '../models/client';

export async function getAllClients(): Promise<Client[]> {
    const db = await openDb();
    return db.all<Client[]>('SELECT * FROM Client');
}

export async function getClientById(id: number): Promise<Client | undefined> {
    const db = await openDb();
    return db.get<Client>('SELECT * FROM Client WHERE Id = ?', id);
}

export async function createClient(client: Client): Promise<number> {
    const db = await openDb();
    const result = await db.run(
        'INSERT INTO Client (GivenName, Surname, DateOfBirth, PrimaryLanguageId, SecondaryLanguageId, FundingSourceId) VALUES (?, ?, ?, ?, ?, ?)',
        [client.GivenName, client.Surname, client.DateOfBirth, client.PrimaryLanguageId, client.SecondaryLanguageId, client.FundingSourceId]
    );
    return result.lastID!;
}

export async function updateClient(id: number, client: Client): Promise<void> {
    const db = await openDb();
    await db.run(
        'UPDATE Client SET GivenName = ?, Surname = ?, DateOfBirth = ?, PrimaryLanguageId = ?, SecondaryLanguageId = ?, FundingSourceId = ? WHERE Id = ?',
        [client.GivenName, client.Surname, client.DateOfBirth, client.PrimaryLanguageId, client.SecondaryLanguageId, client.FundingSourceId, id]
    );
}

export async function deleteClient(id: number): Promise<void> {
    const db = await openDb();
    await db.run('DELETE FROM Client WHERE Id = ?', id);
}