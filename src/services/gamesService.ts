import axios from 'axios';

export const addGameToCollection = async (game: any, collectionId: any) => {
    console.log('Juego', game, 'Colección', collectionId);
    try {
        const response = await axios.post('/api/videogames/add', game, collectionId);
        return response.data;
    } catch (error) {
        console.error('Error al añadir el juego a la colección:', error);
        throw new Error('No se pudo añadir el juego a la colección');
    }
};
