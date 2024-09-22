import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const UserDashboard: React.FC = () => {
    const { isAuthenticated, user } = useAuth(); // Obtenemos el estado de autenticación del contexto
    const navigate = useNavigate();

    // Si el usuario no está autenticado, lo redirigimos al login
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirigir al login si no está autenticado
        }
    }, [isAuthenticated, navigate]);

    // Si no está autenticado, no renderizamos nada mientras redirige
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div>
            <h1>User Dashboard</h1>
            <p>Welcome, {user?.email}!</p>
            {/* Puedes agregar más elementos al dashboard aquí */}
        </div>
    );
};

export default UserDashboard;
