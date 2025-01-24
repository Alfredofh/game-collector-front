import React from 'react';
import CreateCollectionForm from '../features/collections/CreateCollectionForm';

const CreateCollectionPage: React.FC = () => {
    return (
        <div>
            <h1>Create new collection</h1>
            <CreateCollectionForm />
        </div>
    );
};

export default CreateCollectionPage;
