import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    user: { id: number; email: string } | null;
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decodificar el token para obtener la información del usuario
            const user = JSON.parse(atob(token.split('.')[1])) as { id: number; email: string };
            setUser(user);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const user = JSON.parse(atob(token.split('.')[1])) as { id: number; email: string };
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
