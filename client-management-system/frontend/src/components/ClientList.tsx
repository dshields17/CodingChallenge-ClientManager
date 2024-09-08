import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClients, getLanguages, getFundingSources, deleteClient } from '../services/api';
import { Client } from '../models/Client';
import { ReferenceItem } from '../models/ReferenceItem';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [languages, setLanguages] = useState<ReferenceItem[]>([]);
    const [fundingSources, setFundingSources] = useState<ReferenceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [clientsData, languagesData, fundingSourcesData] = await Promise.all([
                getClients(),
                getLanguages(),
                getFundingSources()
            ]);
            setClients(clientsData);
            setLanguages(languagesData);
            setFundingSources(fundingSourcesData);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setError('Failed to load data. Please try again later.');
            setLoading(false);
        }
    };

    const getLanguageName = (id?: number) => {
        return languages.find(lang => lang.Id === id)?.Name || 'Unknown';
    };

    const getFundingSourceName = (id: number) => {
        return fundingSources.find(source => source.Id === id)?.Name || 'Unknown';
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                await deleteClient(id);
                setClients(clients.filter(client => client.Id !== id));
            } catch (error) {
                console.error('Failed to delete client:', error);
                setError('Failed to delete client. Please try again later.');
            }
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="client-list">
            <h1>Client List</h1>
            <Link to="/new" className="add-client-btn">Add New Client</Link>
            {clients.length === 0 ? (<p className="no-clients">No clients found. Add a new client to get started.</p>) 
            : (<table className="client-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Primary Language</th>
                    <th>Secondary Language</th>
                    <th>Funding Source</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.Id}>
                    <td>{client.GivenName} {client.Surname}</td>
                    <td>{new Date(client.DateOfBirth).toLocaleDateString()}</td>
                    <td>{getLanguageName(client.PrimaryLanguageId)}</td>
                    <td>{client.SecondaryLanguageId !== 0 ? getLanguageName(client.SecondaryLanguageId) : '-'}</td>
                    <td>{getFundingSourceName(client.FundingSourceId)}</td>
                    <td>
                        <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(client.Id)}
                        aria-label={`Delete ${client.GivenName} ${client.Surname}`}
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default ClientList;