import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCollectionById } from '../services/collectionService';
import { deleteGame } from '../services/gamesService';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import SearchByGameNameForm from './searchForm';
interface CollectionDetailProps {
    collectionId: number;
}
const CollectionDetail: React.FC<CollectionDetailProps> = ({ collectionId }) => {
    const { id } = useParams<{ id: string }>(); // Obtenemos el id de los parámetros de la URL
    const { token } = useAuth(); // Obtenemos el token del contexto de autenticación
    const [collection, setCollection] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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

    const handleDeleteGame = async (gameId: number) => {
        try {
            await deleteGame(gameId, token!);
            setCollection((prev: any) => ({
                ...prev,
                video_games: prev.video_games.filter(
                    (game: any) => game.id !== gameId
                ),
            }));
            alert("Juego eliminado exitosamente.");
        } catch (error) {
            console.error("Error al borrar el juego:", error);
            alert("No se pudo borrar el juego.");
        }
    };
    if (loading) return <Container>Cargando colección...</Container>;
    if (error) return <Container>{error}</Container>;

    return (
        <Container>
            <Title>{collection.name}</Title>
            <Description>Creada el: {new Date(collection.created_at).toLocaleDateString()}</Description>
            <Title>Busca tu juego y añádelo en 1 click</Title>
            <SearchByGameNameForm collectionId={collection.id} />
            {collection.video_games && collection.video_games.length > 0 ? (
                <GameList>
                    {collection.video_games.map((game: any) => (
                        <GameItem key={game.id}>
                            <GameName>{game.name}</GameName>
                            <GameDetails>
                                {game.platform} - {game.release_year} -
                            </GameDetails>
                            <ImageContainer>
                                {game.image_url ? (
                                    <GameImage
                                        src={`${game.image_url}`}
                                        alt={game.name}
                                    />
                                ) : (
                                    <Placeholder>No Image</Placeholder>
                                )}
                            </ImageContainer>
                            <DeleteButton onClick={() => handleDeleteGame(game.id)}>
                                Borrar
                            </DeleteButton>
                        </GameItem>
                    ))}
                </GameList>
            ) : (
                <Description>No hay juegos en esta colección.</Description>

            )}
            <Button onClick={() => navigate(`/collection/${collection.id}/add-videogame`)}>
                {collection.games && collection.games.length > 0 ? 'Añadir otro juego' : 'Quieres añadir un juego?'}
            </Button>
        </Container>
    );
};

// Styles
const DeleteButton = styled.button`
    background-color: transparent;
    color: #e63946;
    border: none;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        color: #a62030;
    }

    i {
        font-size: 18px; // Tamaño del icono
    }
`;

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
    font-size: 16px;
`;

const GameDetails = styled.span`
    font-size: 13px;
    color: #aaaaaa;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a1a;
    overflow: hidden;
`;

const GameImage = styled.img`
    max-height: 100%; 
    width: auto;
    object-fit: contain; /
`;

const Placeholder = styled.div`
    color: gray;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    width: 100%;
    background: #333;
`;


const Button = styled.button`
    grid-column: span 2;
    background-color: #1b9aaa;
    color: #ffffff;
    border: 3px solid #000000;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 2px 2px #000000;
    font-family: 'Press Start 2P', cursive;
`;

export default CollectionDetail;
