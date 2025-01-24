import React, { useEffect, useState } from "react";
import { getCollections, deleteCollection } from "../../services/collectionService";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../../components/Modal";
import useModal from "../../hooks/useModal";
import EditCollectionModal from "./EditCollectionModal";
import { useNotification } from "../../contexts/NotificationContext";
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
    const { isOpen, content, openModal, closeModal } = useModal();
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const data = await getCollections(token);
                setCollections(data);
            } catch (error) {
                console.error("Error fetching collections:", error);
            }
        };

        fetchCollections();
    }, [token]);

    const handleEditClick = (collection: Collection) => {
        openModal(
            <EditCollectionModal
                collection={collection}
                token={token}
                onUpdate={(updatedName) => {
                    setCollections((prev) =>
                        prev.map((item) =>
                            item.id === collection.id ? { ...item, name: updatedName } : item
                        )
                    );
                    addNotification(`Colección "${updatedName}" actualizada con éxito`, "success");
                }}
                onClose={closeModal}
            />
        );
    };


    const handleDeleteClick = (collection: Collection) => {
        openModal(
            <>
                <h3>¿Estás seguro de que deseas eliminar esta colección?</h3>
                <p>{collection.name}</p>
                <ModalActions>
                    <ModalButton onClick={closeModal}>Cancelar</ModalButton>
                    <ModalButton
                        primary
                        onClick={async () => {
                            try {
                                await deleteCollection(collection.id, token);
                                addNotification(
                                    `Colección "${collection.name}" eliminada con éxito`,
                                    "success"
                                );
                                setCollections((prev) =>
                                    prev.filter((item) => item.id !== collection.id)
                                );
                                closeModal();
                            } catch (error) {
                                console.error("Error deleting collection:", error);
                                addNotification("Error al eliminar la colección", "error");
                            }
                        }}
                    >
                        Eliminar
                    </ModalButton>
                </ModalActions>
            </>
        );
    };

    if (collections.length === 0) {
        return <p>No tienes colecciones disponibles. ¡Crea una nueva!</p>;
    }

    return (
        <ListContainer>
            <Title>Mis Colecciones</Title>
            <List>
                {collections.map((collection) => (
                    <ListItem
                        key={collection.id}
                        onClick={() => navigate(`/collection/${collection.id}`)}
                    >
                        <ItemName>{collection.name}</ItemName>
                        <ButtonGroup>
                            <EditButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(collection);
                                }}
                            >
                                <i className="fas fa-edit" />
                            </EditButton>
                            <DeleteButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(collection);
                                }}
                            >
                                <i className="fas fa-trash-alt" />
                            </DeleteButton>
                        </ButtonGroup>
                    </ListItem>
                ))}
            </List>
            <Modal isOpen={isOpen} onClose={closeModal}>
                {content}
            </Modal>
        </ListContainer>
    );
};

export default CollectionList;

// styles
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
    font-family: "Roboto Mono", monospace;
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
        font-size: 20px; // Tamaño del icono
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
        font-size: 20px; // Tamaño del icono
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; // Espaciado entre botones
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

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 3px solid #000000;
    background-color: #1e1e1e;
    color: #ffffff;
    box-shadow: 2px 2px #000000;
    font-family: "Roboto Mono", monospace;
`;
