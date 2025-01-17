import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CollectionList from '../components/collectionsList';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';




const CollectionPage: React.FC = () => {
    const { isAuthenticated, user, token } = useAuth();
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <PageContainer>
            <CollectionList token={token || ''} />
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

export default CollectionPage;
