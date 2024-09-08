import axios from 'axios';
import { Client } from '../models/Client';
import { ReferenceItem } from '../models/ReferenceItem';

const API_URL = 'http://localhost:3001/api/v1';

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const createClient = async (client: Omit<Client, 'Id'>): Promise<Client> => {
  try {
    const response = await axios.post(`${API_URL}/clients`, client);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/clients/${id}`);
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

export const getLanguages = async (): Promise<ReferenceItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/clients/reference/languages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

export const getFundingSources = async (): Promise<ReferenceItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/clients/reference/funding-sources`);
    return response.data;
  } catch (error) {
    console.error('Error fetching funding sources:', error);
    throw error;
  }
};