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
    const response = await axios.post('/users', userData);
    return response.data;
};


export const loginUser = async (userData: LoginUserData) => {
    const response = await axios.post('/api/login', userData);
    return response.data;
}