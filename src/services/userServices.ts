import axios from '../utils/axiosConfig';

interface RegisterUserData {
    username: string;
    email: string;
    password: string;
}

interface LoginUserData {
    email: string;
    password: string;
}


export const registerUser = async (userData: RegisterUserData) => {
    try {
        const response = await axios.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw new Error('No se pudo registrar el usuario');
    }

};


export const loginUser = async (userData: LoginUserData) => {
    try {
        const response = await axios.post('/login', userData);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw new Error('No se pudo iniciar sesión');
    }

}

// services/userServices.ts

export const requestPasswordReset = async (email: string) => {
    try {
        const response = await axios.post('/password-reset', { email });
        return response.data;
    } catch (error) {
        throw new Error('Failed to request password reset');
    }
};
