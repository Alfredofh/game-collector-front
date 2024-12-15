import React from "react";
import { getCollections } from "../services/collectionService";
import { useState, useEffect } from "react";

interface Collection {
    id: number;
    name: string;
    user_id: number;
    created_at: string;
}

interface CollectionListProps {
    token: string;
}

const CollectionList: React.FC<CollectionListProps> = ({ token }) => {
    const [collections, setCollections] = useState<Collection[]>([]);
    console.log("collections", collections);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const data = await getCollections(token);
                setCollections(data);
            } catch (err: any) {
                setError('Error al cargar las colecciones');
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, [token]);

    if (loading) return <p>Cargando colecciones...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Mis Colecciones</h2>
            {collections.length === 0 ? (
                <p>No tienes colecciones aún.</p>
            ) : (
                <ul>
                    {collections.map((collection) => (
                        <li key={collection.id}>
                            <strong>{collection.name}</strong> - Creada el: {new Date(collection.created_at).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CollectionList;