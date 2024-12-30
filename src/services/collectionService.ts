import axios from '../utils/axiosConfig';

interface CollectionData {
    name: string;
}

// Crear nueva colección
export const createCollection = async (collectionData: CollectionData, token: string) => {
    try {
        const response = await axios.post('/collection', collectionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear la colección:', error);
        throw new Error('No se pudo añadir la colección');
    }

};

// Obtener todas las collection de un usuario
export const getCollections = async (token: string) => {
    try {
        const response = await axios.get('/collection', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Devuelve el listado de collection
    } catch (error) {
        console.error('Error al obtener las colecciones:', error);
        throw new Error('No se pudo obtener las colecciones');
    }

};

// Obtener coleccion de un usuario por Id
export const getCollectionById = async (collectionId: number, token: string) => {
    try {
        const response = await axios.get(`/collection/${collectionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener la colección:', error);
        throw new Error('No se pudo obtener la colección');
    }

};

//Actualizar collection
export const updateCollection = async (collectionId: number, collectionData: CollectionData, token:
    string) => {
    try {
        const response = await axios.put(`/collection/${collectionId}`, collectionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la colección:', error);
        throw new Error('No se pudo actualizar la colección');
    }

};


// Borrar una colección por ID
export const deleteCollection = async (collectionId: number, token: string) => {
    try {
        const response = await axios.delete(`/collection/${collectionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al borrar la colección:', error);
        throw new Error('No se pudo borrar la colección');
    }

};
