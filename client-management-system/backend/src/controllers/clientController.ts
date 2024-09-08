import { Request, Response } from 'express';
import * as clientService from '../services/clientService';

export async function getAllClients(req: Request, res: Response) {
    try {
        const clients = await clientService.getAllClients();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving clients' });
    }
}

export async function getClientById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const client = await clientService.getClientById(id);
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving client' });
    }
}

export async function createClient(req: Request, res: Response) {
    try {
        const newClient = req.body;
        console.log(newClient);
        const id = await clientService.createClient(newClient);
        res.status(201).json({ id, ...newClient });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating client' });
    }
}

export async function updateClient(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const updatedClient = req.body;
        await clientService.updateClient(id, updatedClient);
        res.json({ id, ...updatedClient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating client' });
    }
}

export async function deleteClient(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        await clientService.deleteClient(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting client' });
    }
}