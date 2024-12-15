import React, { useState, useEffect } from "react";
import { getCollections } from "../services/collectionService";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const data = await getCollections(token);
                setCollections(data);
            } catch (err: any) {
                if (err.response && err.response.status === 401) {
                    setError('No autorizado. Por favor, inicia sesión nuevamente.');
                } else {
                    setError('Error al cargar las colecciones. Intenta nuevamente.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, [token]);

    if (loading) return <p>Cargando colecciones...</p>;
    if (error) return <p>{error}</p>;
    if (collections.length === 0) return <p>No tienes colecciones disponibles. ¡Crea una nueva!</p>;

    return (
        <ListContainer>
            <Title>Mis Colecciones</Title>
            <List>
                {collections.map((collection) => (
                    <ListItem key={collection.id} onClick={() => navigate(`/collection/${collection.id}`)}>
                        <ItemName>{collection.name}</ItemName>
                        <ItemDate>Creada el: {new Date(collection.created_at).toLocaleDateString()}</ItemDate>
                    </ListItem>
                ))}
            </List>
        </ListContainer>
    );
};

// Styles
const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    padding: 20px;
    background-color: #3c3c3c;
    border: 4px solid #000000;
    box-shadow: 5px 5px #000000;
    max-width: 600px;
    margin: 20px auto;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    width: 100%;
`;

const ListItem = styled.li`
    background-color: #1e1e1e;
    color: #ffffff;
    margin-bottom: 15px;
    padding: 10px 15px;
    border: 3px solid #000000;
    box-shadow: 2px 2px #000000;
    font-family: 'Roboto Mono', monospace;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #292929;
    }
`;

const ItemName = styled.span`
    font-size: 18px;
`;

const ItemDate = styled.span`
    font-size: 14px;
    color: #aaaaaa;
`;

export default CollectionList;
