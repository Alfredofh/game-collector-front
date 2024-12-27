import React, { useState, useEffect } from "react";
import { getCollections, updateCollection, deleteCollection } from "../services/collectionService";
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Collection | null>(null);
    const [newName, setNewName] = useState("");
    const [successFeedback, setSuccessFeedback] = useState<{ message: string; icon: string } | null>(null);
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

    const handleEditClick = (collection: Collection) => {
        setSelectedCollection(collection);
        setNewName(collection.name);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (collection: Collection) => {
        setDeleteTarget(collection);
        setIsDeleteModalOpen(true);
    };

    const handleSave = async () => {
        if (!selectedCollection) return;

        try {
            await updateCollection(selectedCollection.id, { name: newName }, token);
            setSuccessFeedback({
                message: "¡Colección actualizada con éxito!",
                icon: "✔",
            });
            setTimeout(() => {
                setIsModalOpen(false);
                setSuccessFeedback(null);
            }, 2000);
            setCollections((prevCollections) =>
                prevCollections.map((collection) =>
                    collection.id === selectedCollection.id
                        ? { ...collection, name: newName }
                        : collection
                )
            );
        } catch (error) {
            console.error("Error al actualizar la colección:", error);
            alert("No se pudo actualizar la colección.");
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteCollection(deleteTarget.id, token);
            setSuccessFeedback({
                message: "¡Colección borrada exitosamente!",
                icon: "🗑️",
            });
            setCollections((prevCollections) =>
                prevCollections.filter((collection) => collection.id !== deleteTarget.id)
            );
            setTimeout(() => {
                setIsDeleteModalOpen(false);
                setSuccessFeedback(null);
            }, 2000);
        } catch (error) {
            console.error("Error al borrar la colección:", error);
            alert("No se pudo borrar la colección.");
        }
    };

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
                        <ButtonGroup>
                            <EditButton onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(collection);
                            }}>
                                <i className="fas fa-edit" />
                            </EditButton>
                            <DeleteButton onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(collection);
                            }}>
                                <i className="fas fa-trash-alt" />
                            </DeleteButton>
                        </ButtonGroup>
                    </ListItem>

                ))}
            </List>

            {/* Modal para Editar */}
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        {successFeedback ? (
                            <SuccessMessage>
                                <CheckIcon>{successFeedback.icon}</CheckIcon> {successFeedback.message}
                            </SuccessMessage>
                        ) : (
                            <>
                                <h3>Editar Colección</h3>
                                <Input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <ModalActions>
                                    <ModalButton onClick={() => setIsModalOpen(false)}>Cancelar</ModalButton>
                                    <ModalButton primary onClick={handleSave}>
                                        Guardar
                                    </ModalButton>
                                </ModalActions>
                            </>
                        )}
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* Modal para Eliminar */}
            {isDeleteModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        {successFeedback ? (
                            <SuccessMessage>
                                <CheckIcon>{successFeedback.icon}</CheckIcon> {successFeedback.message}
                            </SuccessMessage>
                        ) : (
                            <>
                                <h3>¿Estás seguro de que deseas eliminar esta colección?</h3>
                                <p>{deleteTarget?.name}</p>
                                <ModalActions>
                                    <ModalButton onClick={() => setIsDeleteModalOpen(false)}>Cancelar</ModalButton>
                                    <ModalButton primary onClick={handleDelete}>Eliminar</ModalButton>
                                </ModalActions>
                            </>
                        )}
                    </ModalContent>
                </ModalOverlay>
            )}
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
`;

const ItemName = styled.span`
    font-size: 18px;
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
        font-size: 18px; // Tamaño del icono
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
        font-size: 18px; // Tamaño del icono
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; // Espaciado entre botones
`;


const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #3c3c3c;
    color: #ffffff;
    padding: 20px;
    border: 4px solid #000000;
    box-shadow: 5px 5px #000000;
    text-align: center;
    width: 300px;
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

const SuccessMessage = styled.div`
    color: #3be13b;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const CheckIcon = styled.span`
    font-size: 30px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 3px solid #000000;
    background-color: #1e1e1e;
    color: #ffffff;
    box-shadow: 2px 2px #000000;
    font-family: 'Roboto Mono', monospace;
`;

export default CollectionList;
