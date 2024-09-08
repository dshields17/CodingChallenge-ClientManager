import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ClientList from '../components/ClientList';

jest.mock('../services/api', () => ({
  getClients: jest.fn(() => Promise.resolve([])),
  getLanguages: jest.fn(() => Promise.resolve([])),
  getFundingSources: jest.fn(() => Promise.resolve([]))
}));

describe('ClientList Component', () => {
  it('renders loading state', () => {
    render(
      <Router>
        <ClientList />
      </Router>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});