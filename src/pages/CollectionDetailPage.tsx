import React from 'react';
import styled from 'styled-components';
import CollectionDetail from '../components/collectionDetails';
import { useParams } from 'react-router-dom';

const CollectionDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <PageContainer>ID de colección no válido</PageContainer>;

    return (
        <PageContainer>
            <CollectionDetail collectionId={parseInt(id, 10)} />
        </PageContainer>
    );
};


//styles

const PageContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    color: #ffffff;
`;

export default CollectionDetailPage;
