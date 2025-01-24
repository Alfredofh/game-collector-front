import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createCollection } from '../../services/collectionService';
import { useNotification } from '../../contexts/NotificationContext';


const CreateCollectionForm: React.FC = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            setError('El nombre de la colección es obligatorio');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No estás autenticado');
            return;
        }

        try {
            const response = await createCollection({ name }, token);
            addNotification(`Colección "${name}" creada con éxito`, 'success');
            setTimeout(() => navigate('/collections'), 2000);
        } catch (error: any) {
            setError('Error al crear la colección');
            console.error('Error al crear colección:', error);
        }
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="name">Collection Name</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <Button type="submit">Create</Button>
            </Form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
`;

const Form = styled.form`
    max-width: 400px;
    padding: 20px;
    background-color: #3c3c3c;
    border: 4px solid #000000;
    box-shadow: 5px 5px #000000;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
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

const Button = styled.button`
    background-color: #1b9aaa;
    color: #ffffff;
    border: 3px solid #000000;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 2px 2px #000000;
    font-family: 'Press Start 2P', cursive;

    &:hover {
        background-color: #148a8a;
    }
`;

export default CreateCollectionForm;
