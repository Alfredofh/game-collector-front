import axios from 'axios';

export const searchGamesByName = async (query: string) => {
    try {
        const response = await axios.get('/api/igdb/search', {
            params: { query },
        });
        return response.data;
    } catch (error) {
        console.error('Error al buscar juegos:', error);
        throw error;
    }
};
