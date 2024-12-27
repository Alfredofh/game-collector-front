import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { searchGamesByName } from '../services/searchGamesIGDB';

type FormState = {
    name: string;
    platform: string;
    release_year: number | '';
    value: number | '';
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
    const navigate = useNavigate();

    const [formState, setFormState] = useState<FormState>({
        name: '',
        platform: '',
        release_year: '',
        value: '',
        upc: '',
        ean: '',
        description: '',
        image_url: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [platformOptions, setPlatformOptions] = useState<PlatformOption[]>([]);

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
                        : '',
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
        try {
            const videogameData = {
                ...formState,
                collection_id: parseInt(id || '0', 10),
            };
            await axios.post('/api/videogames/add', videogameData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Videogame added successfully!');
            navigate(`/collection/${id}`);
        } catch (error) {
            console.error('Error adding videogame:', error);
            alert('Failed to add videogame. Please try again.');
        }
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
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
                        value={formState.release_year}
                        onChange={handleChange}

                    />
                </div>
                <div>
                    <Label htmlFor="value">Value ($):</Label>
                    <Input
                        type="number"
                        id="value"
                        name="value"
                        value={formState.value}
                        onChange={handleChange}

                    />
                </div>
                <div>
                    <Label htmlFor="upc">UPC:</Label>
                    <Input
                        type="text"
                        id="upc"
                        name="upc"
                        value={formState.upc}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="ean">EAN:</Label>
                    <Input
                        type="text"
                        id="ean"
                        name="ean"
                        value={formState.ean}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="description">Description:</Label>
                    <TextArea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="image_url">Image URL:</Label>
                    <Input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={formState.image_url}
                        onChange={handleChange}
                    />
                </div>
                {isLoading && <p>Loading game details...</p>}
                <Button type="submit">Add Videogame</Button>
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

export default AddVideogameForm;
