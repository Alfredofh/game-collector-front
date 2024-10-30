import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateCollectionForm from '../components/CreateCollectionForm';

const CreateCollectionPage: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string | null>(null);

    const handleCollectionCreated = (msg: string) => {
        setMessage(msg);
        navigate('/collection');
    };

    return (
        <div>
            <h1>Create new collection</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <CreateCollectionForm onCollectionCreated={handleCollectionCreated} />
        </div>
    );
};

export default CreateCollectionPage;
