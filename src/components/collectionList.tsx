import React, { useState, useEffect } from "react";
import { getCollections, updateCollection } from "../services/collectionService";
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
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const [newName, setNewName] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
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

    const handleSave = async () => {
        if (!selectedCollection) return;

        try {
            await updateCollection(selectedCollection.id, { name: newName }, token);
            setIsSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setIsSuccess(false);
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

    if (loading) return <p>Cargando colecciones...</p>;
    if (error) return <p>{error}</p>;
    if (collections.length === 0) return <p>No tienes colecciones disponibles. ¡Crea una nueva!</p>;

    return (
        <ListContainer>
            <Title>Mis Colecciones</Title>
            <List>
                {collections.map((collection) => (
                    <ListItem key={collection.id}>
                        <ItemName>{collection.name}</ItemName>
                        <EditButton onClick={() => handleEditClick(collection)}>Editar</EditButton>
                    </ListItem>
                ))}
            </List>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        {isSuccess ? (
                            <SuccessMessage>
                                <CheckIcon>✔</CheckIcon> ¡Colección actualizada con éxito!
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
`;

const ItemName = styled.span`
    font-size: 18px;
`;

const EditButton = styled.button`
    background-color: transparent;
    color: #1b9aaa;
    border: none;
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    &:hover {
        color: #148a8a;
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
`;

const ModalActions = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
    background-color: ${(props) => (props.primary ? "#1b9aaa" : "#444444")};
    color: #ffffff;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${(props) => (props.primary ? "#148a8a" : "#333333")};
    }
`;



export default CollectionList;