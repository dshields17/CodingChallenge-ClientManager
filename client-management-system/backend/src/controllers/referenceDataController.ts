import { Request, Response } from 'express';
import { openDb } from '../config/database';

export async function getLanguages(req: Request, res: Response) {
    try {
        const db = await openDb();
        const languages = await db.all('SELECT * FROM Language');
        res.json(languages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving languages' });
    }
}

export async function getFundingSources(req: Request, res: Response) {
    try {
        const db = await openDb();
        const fundingSources = await db.all('SELECT * FROM FundingSource');
        res.json(fundingSources);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving funding sources' });
    }
}