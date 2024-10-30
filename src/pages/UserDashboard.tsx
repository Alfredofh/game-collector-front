import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const UserDashboard: React.FC = () => {
    const { isAuthenticated, user } = useAuth(); 
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
        </div>
    );
};

export default UserDashboard;
