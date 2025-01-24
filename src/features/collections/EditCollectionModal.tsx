import React, { useState } from "react";
import styled from "styled-components";
import { updateCollection } from "../../services/collectionService";

// Tipos de las props que recibe el componente
interface EditCollectionModalProps {
    collection: {
        id: number;
        name: string;
    };
    token: string;
    onUpdate: (updatedName: string) => void;
    onClose: () => void;
}

const EditCollectionModal: React.FC<EditCollectionModalProps> = ({
    collection,
    token,
    onUpdate,
    onClose,
}) => {
    const [localName, setLocalName] = useState(collection.name); // Estado local para manejar el input

    // Maneja la acción de guardar los cambios
    const handleSave = async () => {
        try {
            await updateCollection(collection.id, { name: localName }, token);
            onUpdate(localName);

            onClose();
        } catch (error) {
            console.error("Error updating collection:", error);
            alert("No se pudo actualizar la colección.");
        }
    };

    return (
        <>
            <h3>Editar Colección</h3>
            <Input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
            />
            <ModalActions>
                <ModalButton onClick={onClose}>Cancelar</ModalButton>
                <ModalButton primary onClick={handleSave}>
                    Guardar
                </ModalButton>
            </ModalActions>
        </>
    );
};

export default EditCollectionModal;

// Estilos del modal
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

