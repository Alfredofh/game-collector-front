import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Dashboard: React.FC = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h1>Welcome back, {user?.email}!</h1>
                    <p>Here are your collections and recent activities:</p>
                    {/* Aquí puedes añadir componentes personalizados para el usuario logueado */}
                    <Link to="/collections">View My Collections</Link>
                </div>
            ) : (
                <div>
                    <h1>Welcome to Game Collections App!</h1>
                    <p>Manage your game collections, track prices, and find new titles.</p>
                    <div>
                        <Link to="/register">Create an Account</Link> or <Link to="/login">Log In</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
