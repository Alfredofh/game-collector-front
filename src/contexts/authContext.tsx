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
    const [token, setToken] = useState<string | null>(null);
    const isTokenExpired = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            const expirationTime = payload.exp * 1000;

            return Date.now() > expirationTime;
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return true;
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            if (isTokenExpired(storedToken)) {
                logout();
            } else {
                try {
                    const decodedUser = JSON.parse(atob(storedToken.split('.')[1]));
                    setUser({ id: decodedUser.id, email: decodedUser.email });
                    setToken(storedToken);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error al decodificar el token:", error);
                    logout();
                }
            }
        }
    }, []);


    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decodedUser = JSON.parse(atob(token.split('.')[1])) as { id: number; email: string };
        setUser(decodedUser);
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
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
