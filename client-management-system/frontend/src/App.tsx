import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientWizard from './components/ClientWizard';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<ClientList />} />
                    <Route path="/new" element={<ClientWizard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;