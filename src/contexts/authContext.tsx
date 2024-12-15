import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    user: { id: number; email: string } | null;
    token: string | null; // Agregar token como parte del contexto
    login: (token: string) => void;
    logout: () => void;
}

// Definir las props para AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ id: number; email: string } | null>(null);
    const [token, setToken] = useState<string | null>(null); // Estado para el token

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                // Decodificar el token para obtener la información del usuario
                const decodedUser = JSON.parse(atob(storedToken.split('.')[1])) as { id: number; email: string };
                setUser(decodedUser);
                setToken(storedToken); // Guardamos el token en el estado
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token); // Guardar el token en localStorage
        const decodedUser = JSON.parse(atob(token.split('.')[1])) as { id: number; email: string };
        setUser(decodedUser);
        setToken(token); // Guardamos el token en el estado
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        setUser(null);
        setToken(null); // Limpiar el token en el estado
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
