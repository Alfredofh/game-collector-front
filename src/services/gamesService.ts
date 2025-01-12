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


export const updateGame = async (gameId: number, payload: any, token: string) => {
    try {
        const response = await axios.put(
            `/api/videogames/update/${gameId}`,
            payload, // Enviar el payload ajustado            
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el juego:', error);
        throw new Error('No se pudo actualizar el juego');
    }
}

// Borrar un juego de una colección
export const deleteGame = async (gameId: number, token: string) => {
    console.log('gameId:', gameId, 'token:', token);
    try {
        const response = await axios.delete(`/api/videogames/remove/${gameId}`, {

            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al borrar el juego:', error);
        throw new Error('No se pudo borrar el juego');
    }
};
