import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCollectionById } from '../services/collectionService';
import { deleteGame, updateGame } from '../services/gamesService';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import SearchByGameNameForm from './searchForm';
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import VideogameForm from './VideoGameForm';
interface CollectionDetailProps {
    collectionId: number;
}
const CollectionDetail: React.FC<CollectionDetailProps> = ({ collectionId }) => {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const [collection, setCollection] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGame, setSelectedGame] = useState<any>(null);
    const navigate = useNavigate();
    const { isOpen, content, openModal, closeModal } = useModal();

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

    const handleEditGameClick = (game: any) => {
        setSelectedGame(game);
        console.log("game", game);

        openModal(
            <VideogameForm
                initialFormState={{
                    name: game.name,
                    platform: game.platform,
                    release_year: game.release_year,
                    value: game.value || null,
                    upc: game.upc || '',
                    ean: game.ean || '',
                    description: game.description || '',
                    image_url: game.image_url || '',
                }}
                isEdit={true}
                collectionId={collection.id}
                onSubmit={(updatedGame) => handleUpdateGame(game.id, updatedGame)}
            />
        );
    };

    const handleUpdateGame = async (gameId: number, updatedGame: any) => {
        try {
            const payload = {
                name: updatedGame.name,
                platform: updatedGame.platform,
                release_year: updatedGame.release_year,
                value: updatedGame.value,
                upc: updatedGame.upc || null,
                ean: updatedGame.ean || null,
                description: updatedGame.description || '',
                image_url: updatedGame.image_url || '',
                collection_id: collection.id,
            };

            const updatedGameFromAPI = await updateGame(gameId, payload, token!);

            setCollection((prev: any) => ({
                ...prev,
                video_games: prev.video_games.map((game: any) =>
                    game.id === gameId ? { ...game, ...updatedGameFromAPI } : game
                ),
            }));
            closeModal();
        } catch (error) {
            console.error('Error al actualizar el juego:', error);
        }
    };



    const handleDeleteGameClick = (gameId: number) => {
        openModal(
            <>
                <h3>¿Estás seguro de que deseas eliminar este juego?</h3>
                <ModalActions>
                    <ModalButton onClick={closeModal}>Cancelar</ModalButton>
                    <ModalButton
                        primary
                        onClick={async () => {
                            try {
                                await deleteGame(gameId, token!);
                                setCollection((prev: any) => ({
                                    ...prev,
                                    video_games: prev.video_games.filter(
                                        (game: any) => game.id !== gameId
                                    ),
                                }));
                                closeModal();
                            } catch (error) {
                                console.error("Error al borrar el juego:", error);
                                alert("No se pudo borrar el juego.");
                            }
                        }}
                    >
                        Eliminar
                    </ModalButton>
                </ModalActions>
            </>
        );
    };

    if (loading) return <Container>Cargando colección...</Container>;
    if (error) return <Container>{error}</Container>;


    return (
        <Container>
            <Title>{collection.name}</Title>
            <Description>Creada el: {new Date(collection.created_at).toLocaleDateString()}</Description>
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
                            <ButtonGroup>
                                <EditButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditGameClick(game);
                                    }}
                                >
                                    <i className="fas fa-edit" />
                                </EditButton>
                                <DeleteButton onClick={() => handleDeleteGameClick(game.id)}>
                                    <i className="fas fa-trash-alt" />
                                </DeleteButton>
                            </ButtonGroup>
                        </GameItem>
                    ))}
                </GameList>

            ) : (
                <Description>No hay juegos en esta colección.</Description>

            )}
            <Modal isOpen={isOpen} onClose={closeModal}>
                {content}
            </Modal>
            <Title>Usa el buscador y añade en 1 click o añade tus datos</Title>
            <SearchByGameNameForm collectionId={collection.id} />
            <Button onClick={() => navigate(`/collection/${collection.id}/add-videogame`)}>
                {collection.games && collection.games.length > 0 ? 'Añadir otro juego' : 'Quieres añadir un juego?'}
            </Button>
        </Container>
    );
};

// Styles


const Container = styled.div`
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background-color: #3c3c3c;
    border: 4px solid #000000;
    box-shadow: 5px 5px #000000;
    color: #ffffff;
`;

const Title = styled.h1`
    font-size: 18px;
    padding: 10px; 
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
    min-height: 140px;
    background-color: #1e1e1e;
    color: #ffffff;
    margin-bottom: 15px;
    padding: 10px 15px;
    border: 3px solid #000000;
    box-shadow: 2px 2px #000000;
    font-family: 'Roboto Mono', monospace;
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 15px;
    justify-items: center;
    align-items: center;

    &:nth-child(4n) {
        justify-self: end; 
    }
`;
;

const GameName = styled.span`
    text-transform: uppercase;
    font-size: 16px;
`;

const GameDetails = styled.span`
    font-size: 13px;
    color: #aaaaaa;
    max-width: 200px;
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
    object-fit: contain; 
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

const ModalActions = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
    background-color: ${(props) => (props.primary ? "#e63946" : "#444444")};
    color: #ffffff;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${(props) => (props.primary ? "#a62030" : "#333333")};
    }
`;

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
        font-size: 22px; 
    }
`;

const EditButton = styled.button`
    background-color: transparent;
    color: #1b9aaa;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-right: 8px;

    &:hover {
        color: #148a8a;
    }

    i {
        font-size: 22px; 
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: right;
    gap: 10px; 
`;

export default CollectionDetail;
