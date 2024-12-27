import axios from 'axios';

export const addGameToCollection = async (payload: any, token: string) => {
    try {
        const response = await axios.post(
            '/api/videogames/add',
            payload, // Enviar el payload ajustado
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al añadir el juego a la colección:', error);
        throw new Error('No se pudo añadir el juego a la colección');
    }
};
