import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCollectionById } from '../services/collectionService';
import { useAuth } from '../contexts/authContext';

interface CollectionDetailProps {
    collectionId: number;
}
const CollectionDetail: React.FC<CollectionDetailProps> = ({ collectionId }) => {
    const { id } = useParams<{ id: string }>(); // Obtenemos el id de los parámetros de la URL
    const { token } = useAuth(); // Obtenemos el token del contexto de autenticación
    const [collection, setCollection] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCollection = async () => {
            if (!token) {
                setError('Usuario no autenticado');
                setLoading(false);
                return;
            }

            try {
                const data = await getCollectionById(parseInt(id || '0', 10), token);
                setCollection(data);
            } catch (err: any) {
                setError('Error al obtener la colección');
            } finally {
                setLoading(false);
            }
        };

        fetchCollection();
    }, [id, token]);

    if (loading) return <Container>Cargando colección...</Container>;
    if (error) return <Container>{error}</Container>;

    return (
        <Container>
            <Title>{collection.name}</Title>
            <Description>Creada el: {new Date(collection.created_at).toLocaleDateString()}</Description>
            {collection.games && collection.games.length > 0 ? (
                <GameList>
                    {collection.games.map((game: any) => (
                        <GameItem key={game.id}>
                            <GameName>{game.name}</GameName>
                            <GameDetails>
                                {game.platform} - {game.release_year}
                            </GameDetails>
                        </GameItem>
                    ))}
                </GameList>
            ) : (
                <Description>No hay juegos en esta colección.</Description>
            )}
        </Container>
    );
};

// Styles
const Container = styled.div`
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #3c3c3c;
    border: 4px solid #000000;
    box-shadow: 5px 5px #000000;
    color: #ffffff;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
    text-align: center;
`;

const Description = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
`;

const GameList = styled.ul`
    list-style: none;
    padding: 0;
`;

const GameItem = styled.li`
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
`;

const GameName = styled.span`
    font-size: 18px;
`;

const GameDetails = styled.span`
    font-size: 14px;
    color: #aaaaaa;
`;
export default CollectionDetail;
