import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import CollectionList from '../components/collectionsList';
const UserDashboard: React.FC = () => {
    const { isAuthenticated, user, token } = useAuth();
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirigir al login si no está autenticado
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div>
            <h1>User Dashboard</h1>
            <p>Welcome, {user?.email}!</p>
            <CollectionList token={token || ''} />
        </div>
    );
};

export default UserDashboard;
