import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient, getLanguages, getFundingSources } from '../services/api';
import { ReferenceItem } from '../models/ReferenceItem';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

    // Configure Toastr
toastr.options = {
    positionClass: 'toast-top-center',
    hideMethod: 'fadeOut',
    hideDuration: 300,
    timeOut: 3000
};

const ClientWizard: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [client, setClient] = useState({
        GivenName: '',
        Surname: '',
        DateOfBirth: '',
        PrimaryLanguageId: 0,
        SecondaryLanguageId: 0,
        FundingSourceId: 0
    });
    const [languages, setLanguages] = useState<ReferenceItem[]>([]);
    const [fundingSources, setFundingSources] = useState<ReferenceItem[]>([]);
    const [errors, setErrors] = useState({
        GivenName: false,
        Surname: false,
        DateOfBirth: false,
        PrimaryLanguageId: false,
        FundingSourceId: false
    });

    useEffect(() => {
        const fetchReferenceData = async () => {
            try {
                const [languagesData, fundingSourcesData] = await Promise.all([
                    getLanguages(),
                    getFundingSources()
                ]);
                setLanguages(languagesData);
                setFundingSources(fundingSourcesData);
            } catch (error) {
                console.error('Error fetching reference data:', error);
                toastr.error('Failed to load reference data. Please try again.');
            }
        };
        fetchReferenceData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = e.target.type === 'number' ? parseInt(value) : value;
    setClient({ ...client, [name]: newValue });
        validateField(name, newValue);
    };

    const validateField = (name: string, value: any) => {
        let isValid = true;
        let errorMessage = '';

        switch (name) {
            case 'GivenName':
            isValid = value.trim() !== '';
            errorMessage = 'Given name cannot be empty';
            break;
            case 'Surname':
            isValid = value.trim() !== '';
            errorMessage = 'Surname cannot be empty';
            break;
            case 'DateOfBirth':
            const date = new Date(value);
            const minDate = new Date('1900-01-01');
            const today = new Date();
            isValid = date >= minDate && date <= today;
            errorMessage = 'Date of birth must be between 1/1/1900 and today';
            break;
            case 'PrimaryLanguageId':
            isValid = value !== 0;
            errorMessage = 'Primary language is required';
            break;
            case 'FundingSourceId':
            isValid = value !== 0;
            errorMessage = 'Funding source is required';
            break;
        }

        setErrors(prev => ({ ...prev, [name]: !isValid }));

        if (!isValid) {
            toastr.error(errorMessage);
        }

        return isValid;
    };

    const validateStep = () => {
        let isValid = true;
        if (step === 1) {
            isValid = validateField('GivenName', client.GivenName) && validateField('Surname', client.Surname);
        } else if (step === 2) {
            isValid = validateField('DateOfBirth', client.DateOfBirth);
        } else if (step === 3) {
            isValid = validateField('PrimaryLanguageId', client.PrimaryLanguageId) && validateField('FundingSourceId', client.FundingSourceId);
        }
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep()) {
            try {
                await createClient(client);
                toastr.success('Client added successfully!');
                navigate('/');
            } catch (error) {
                console.error('Failed to create client:', error);
                toastr.error('Failed to add client. Please try again.');
            }
        }
    };

    const moveStep = (direction: 'next' | 'previous') => {
        if (direction === 'next' && validateStep()) {
            setStep(prev => prev + 1);
        } else if (direction === 'previous') {
            setStep(prev => prev - 1);
        }
    };

    const renderProgressBar = () => {
        return (
            <div className="progress-bar">
                {[1, 2, 3].map((num) => (
                    <div key={num} className={`step ${num <= step ? 'active' : ''}`}>
                    {num}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="client-wizard">
            <h1>Add New Client</h1>
            {renderProgressBar()}
            <form onSubmit={handleSubmit}>
            {step === 1 && (
                <div className="form-step">
                    <h2>Personal Information</h2>
                    <input type="text" name="GivenName" value={client.GivenName} onChange={handleChange} placeholder="Given Name(s)" required className={errors.GivenName ? 'inputError' : ''}/>
                    <input type="text" name="Surname" value={client.Surname} onChange={handleChange} placeholder="Surname" required className={errors.Surname ? 'inputError' : ''}/>
                    <button type="button" onClick={() => moveStep('next')}>Next</button>
                </div>
            )}
            {step === 2 && (
                <div className="form-step">
                <h2>Date of Birth</h2>
                <input type="date" name="DateOfBirth" value={client.DateOfBirth} onChange={handleChange} required className={errors.DateOfBirth ? 'inputError' : ''}/>
                <button type="button" onClick={() => moveStep('previous')}>Previous</button>
                <button type="button" onClick={() => moveStep('next')}>Next</button>
                </div>
            )}
            {step === 3 && (
                <div className="form-step">
                <h2>Additional Information</h2>
                <select name="PrimaryLanguageId" value={client.PrimaryLanguageId} onChange={handleChange} required className={errors.PrimaryLanguageId ? 'inputError' : ''}>
                    <option value="">Select Primary Language</option>
                    {languages.map(lang => (<option key={lang.Id} value={lang.Id}>{lang.Name}</option>))}
                </select>
                <select name="SecondaryLanguageId" value={client.SecondaryLanguageId} onChange={handleChange}>
                    <option value="">Select Secondary Language</option>
                    {languages.map(lang => (<option key={lang.Id} value={lang.Id}>{lang.Name}</option>))}
                </select>
                <select name="FundingSourceId" value={client.FundingSourceId} onChange={handleChange} required className={errors.FundingSourceId ? 'inputError' : ''}>
                    <option value="">Select Funding Source</option>
                    {fundingSources.map(source => (<option key={source.Id} value={source.Id}>{source.Name}</option>))}
                </select>
                <button type="button" onClick={() => moveStep('previous')}>Previous</button>
                <button type="submit">Add Client</button>
                </div>
            )}
            </form>
        </div>
        );
    };

    export default ClientWizard;