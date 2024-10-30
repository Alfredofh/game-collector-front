import axios from '../utils/axiosConfig';

interface CollectionData {
    name: string;
}

// Crear nueva colección
export const createCollection = async (collectionData: CollectionData, token: string) => {
    const response = await axios.post('/colecciones', collectionData, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    return response.data;
};

// Obtener todas las colecciones de un usuario
export const getCollections = async (token: string) => {
    const response = await axios.get('/colecciones', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; // Devuelve el listado de colecciones
};

// Borrar una colección por ID
export const deleteCollection = async (collectionId: number, token: string) => {
    const response = await axios.delete(`/colecciones/${collectionId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; // Devuelve la respuesta de la eliminación
};
