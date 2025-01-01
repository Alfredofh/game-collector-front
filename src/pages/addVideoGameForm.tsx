import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { searchGamesByName } from '../services/searchGamesIGDB';
import { addGameToCollection } from '../services/gamesService';
import { useAuth } from '../contexts/authContext';
import Modal from '../components/Modal';
type FormState = {
    name: string;
    platform: string;
    release_year: number | null;
    value: number | null;
    upc: string;
    ean: string;
    description: string;
    image_url: string;
};

type PlatformOption = {
    id: number;
    name: string;
};

const AddVideogameForm: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // id corresponds to the collection ID
    const { token } = useAuth(); // Obtenemos el token del contexto

    // Estado inicial del formulario
    const initialFormState: FormState = {
        name: '',
        platform: '',
        release_year: null,
        value: null,
        upc: '',
        ean: '',
        description: '',
        image_url: '',
    };

    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [isLoading, setIsLoading] = useState(false);
    const [platformOptions, setPlatformOptions] = useState<PlatformOption[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: name === 'release_year' || name === 'value' ? Number(value) || '' : value,
        }));
    };

    const handleNameBlur = async () => {
        if (!formState.name) return;
        setIsLoading(true);
        try {
            const [game] = await searchGamesByName(formState.name);
            if (game) {
                setPlatformOptions(game.platforms?.map((p: any) => ({ id: p.id, name: p.name })) || []);
                setFormState((prevState) => ({
                    ...prevState,
                    release_year: game.first_release_date
                        ? new Date(game.first_release_date * 1000).getFullYear()
                        : null,
                    description: game.summary || '',
                    image_url: game.cover?.url || '',
                }));
            }
        } catch (error) {
            console.error('Error fetching game data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            alert('You must be logged in to add a videogame.');
            return;
        }

        try {
            const videogameData = {
                ...formState,
                collection_id: parseInt(id || '0', 10),
            };
            await addGameToCollection(videogameData, token)
            setFormState(initialFormState);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error adding videogame:', error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
            e.preventDefault();
        }
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                <div>
                    <Label htmlFor="name">Name:</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        onBlur={handleNameBlur}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="platform">Platform:</Label>
                    <Select
                        id="platform"
                        name="platform"
                        value={formState.platform}
                        onChange={handleChange}
                    >
                        <option value="">Select a platform</option>
                        {platformOptions.map((platform) => (
                            <option key={platform.id} value={platform.name}>
                                {platform.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Label htmlFor="release_year">Release Year:</Label>
                    <Input
                        type="number"
                        id="release_year"
                        name="release_year"
                        value={formState.release_year ?? ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="value">Value ($):</Label>
                    <Input
                        type="number"
                        id="value"
                        name="value"
                        value={formState.value ?? ''}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                    <Label htmlFor="description">Description:</Label>
                    <TextArea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                    />
                </div>
                {isLoading && <p>Loading game details...</p>}
                <Button type="submit">Add Videogame</Button>
            </Form>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>What would you like to do next?</h3>
                <ModalOptions>
                    <OptionButton onClick={() => setIsModalOpen(false)}>
                        Add Another Game
                    </OptionButton>
                    <OptionButton onClick={() => navigate(`/collection/${id}`)}>
                        Go to Game List
                    </OptionButton>
                </ModalOptions>
            </Modal>

        </FormContainer>

    );
};

const FormContainer = styled.div`
    display: flex;
    height: 50vh;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    color: #ffffff;
`;

const Form = styled.form`
    max-width: 800px;
    padding: 20px;
    background-color: #3c3c3c;
    border: 4px solid #000000;
    box-shadow: 5px 5px #000000;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
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

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 3px solid #000000;
    background-color: #1e1e1e;
    color: #ffffff;
    box-shadow: 2px 2px #000000;
    font-family: 'Roboto Mono', monospace;
`;

const TextArea = styled.textarea`
    grid-column: span 2;
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 3px solid #000000;
    background-color: #1e1e1e;
    color: #ffffff;
    box-shadow: 2px 2px #000000;
    font-family: 'Roboto Mono', monospace;
    resize: none;
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

const ModalOptions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const OptionButton = styled.button`
    padding: 10px 20px;
    background-color: #1b9aaa;
    color: #ffffff;
    border: 3px solid #000000;
    cursor: pointer;
    font-family: 'Press Start 2P', cursive;
    transition: background-color 0.3s;

    &:hover {
        background-color: #148d88;
    }
`;

export default AddVideogameForm;
