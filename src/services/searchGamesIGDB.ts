import axios, { AxiosError } from 'axios';

export const searchGamesByName = async (query: string) => {
    try {
        const response = await axios.get('/api/igdb/search', {
            params: { query },
        });

        if (response.status === 200 && response.data) {
            return response.data; // Devuelve los datos, aunque estén vacíos
        }

        // Caso inesperado sin datos
        return [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.error('Network error:', error);
                throw { status: 0, message: 'Network error. Please check your connection.' };
            }

            console.error('Server error:', error);
            throw {
                status: error.response.status,
                message: error.response.statusText || 'Unknown server error.',
            };
        }

        console.error('Unknown error:', error);
        throw { status: -1, message: 'An unknown error occurred.' };
    }
};
