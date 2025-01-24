import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Call the context's logout function to update the app state
        logout();

        // Redirect the user to the login page
        navigate('/login');
    }, [navigate, logout]);

    return null;
};

export default Logout;
