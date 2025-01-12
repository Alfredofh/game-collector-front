// src/pages/CollectionPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CollectionDetail from '../components/collectionDetails';

const PageContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    color: #ffffff;
`;

const CollectionPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <PageContainer>ID de colección no válido</PageContainer>;

    return (
        <PageContainer>
            <h1>Detalle de la Colección</h1>
            <CollectionDetail collectionId={parseInt(id, 10)} />
        </PageContainer>
    );
};

export default CollectionPage;
