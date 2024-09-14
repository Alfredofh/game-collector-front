import axios from '../utils/axiosConfig';

interface RegisterUserData {
    username: string;
    email: string;
    password: string;
}

export const registerUser = async (userData: RegisterUserData) => {
    const response = await axios.post('/users', userData);
    return response.data;
};
