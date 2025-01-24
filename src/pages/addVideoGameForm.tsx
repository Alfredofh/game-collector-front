import React from 'react';
import VideogameForm from '../features/games/VideoGameForm';
import { addGameToCollection } from '../services/gamesService';
import { useAuth } from '../contexts/authContext';
import { useParams } from 'react-router-dom';

const AddVideoGameForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    console.log("id", id);

    const initialFormState = {
        name: '',
        platform: '',
        release_year: null,
        value: null,
        upc: '',
        ean: '',
        description: '',
        image_url: '',
    };

    const handleSubmit = async (formState: any) => {
        if (!token) return;
        await addGameToCollection({ ...formState, collection_id: parseInt(id || '0', 10) }, token);
    };

    return <VideogameForm initialFormState={initialFormState}
        onSubmit={handleSubmit}
        collectionId={id ? parseInt(id, 10) : 0}
    />
};

export default AddVideoGameForm;
