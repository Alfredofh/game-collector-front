import React, { useState } from 'react';
import styled from 'styled-components';
import { searchGamesByName } from '../../services/searchGamesIGDB';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
type FormState = {
    name: string;
    platform: PlatformOption[];
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

type VideogameFormProps = {
    initialFormState: FormState;
    onSubmit: (formState: FormState) => void;
    isEdit?: boolean;
    collectionId: number;
};

const VideogameForm: React.FC<VideogameFormProps> = ({
    initialFormState,
    onSubmit,
    isEdit = false,
    collectionId
}) => {
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [isLoading, setIsLoading] = useState(false);
    const [platformOptions, setPlatformOptions] = useState<PlatformOption[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormState((prevState) => ({
            ...prevState,
            [name]: name === 'release_year' || name === 'value' ? Number(value) || null : value,
        }));
    };



    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        selectedPlatform: PlatformOption
    ) => {
        setFormState((prevState) => {
            const isChecked = e.target.checked;

            const updatedPlatforms = isChecked
                ? [...prevState.platform, selectedPlatform] // Agrega la plataforma si se selecciona
                : prevState.platform.filter(p => p.id !== selectedPlatform.id); // Quita si se deselecciona

            return { ...prevState, platform: updatedPlatforms };
        });
    };


    useEffect(() => {
        if (isEdit) {
            // Si es edición, usar las plataformas del juego en lugar de llamar a la API
            setPlatformOptions(initialFormState.platform);
        }
    }, [isEdit, initialFormState.platform]);


    const handleNameBlur = async () => {
        if (!formState.name || isEdit) return;
        setIsLoading(true);
        setErrorMessage('');

        try {
            const games = await searchGamesByName(formState.name);

            if (games.length === 0) {
                setErrorMessage(`No games found matching "${formState.name}".`);
                return;
            }

            setPlatformOptions(games[0].platforms?.map((p: any) => ({ id: p.id, name: p.name })) || []);

            setFormState((prevState) => ({
                ...prevState,
                release_year: games[0].first_release_date
                    ? new Date(games[0].first_release_date * 1000).getFullYear()
                    : prevState.release_year,
                description: games[0].summary || prevState.description,
                image_url: games[0].cover?.url || prevState.image_url,
                platform: prevState.platform.length > 0 ? prevState.platform :
                    (games[0].platforms?.map((p: any) => ({ id: p.id, name: p.name })) || []),
            }));
        } catch (error: any) {
            setErrorMessage(error.message || 'Unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
        setIsModalOpen(true);
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
                    <Label>Plataforms:</Label>
                    {platformOptions.map((platform) => (
                        <CheckboxContainer key={platform.id}>
                            {/* Checkbox oculto */}
                            <HiddenCheckbox
                                id={`platform-${platform.id}`}
                                checked={formState.platform.some(p => p.id === platform.id)}
                                onChange={(e) => handleCheckboxChange(e, platform)}
                            />

                            {/* Checkbox estilizado */}
                            <StyledCheckbox
                                checked={formState.platform.some(p => p.id === platform.id)}
                                onClick={() =>
                                    handleCheckboxChange(
                                        { target: { checked: !formState.platform.some(p => p.id === platform.id) } } as any,
                                        platform
                                    )
                                }
                            />

                            <label htmlFor={`platform-${platform.id}`}>{platform.name}</label>
                        </CheckboxContainer>
                    ))}
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
                <Button type="submit">{isEdit ? 'Update Videogame' : 'Add Videogame'}</Button>
                {isLoading && <p>Loading game details...</p>}
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Form>
            {!isEdit && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h3>What would you like to do next?</h3>
                    <ModalOptions>
                        <OptionButton onClick={() => setIsModalOpen(false)}>
                            Add Another Game
                        </OptionButton>
                        <OptionButton onClick={() => navigate(`/collection/${collectionId}`)}>
                            Go to Game List
                        </OptionButton>
                    </ModalOptions>
                </Modal>
            )}
        </FormContainer>
    );
};

export default VideogameForm;

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

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    width: 20px;
    height: 20px;
    border: 2px solid #ff0d72;
    border-radius: 1px; 
    background: ${(props) => (props.checked ? "#ff0d72" : "transparent")};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s;

    &:after {
        content: "✔";
        color: #ffffff;
        font-size: 14px;
        display: ${(props) => (props.checked ? "block" : "none")};
    }
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

const ErrorMessage = styled.div`
    grid-column: span 2;
    color: red;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
    font-family: 'Roboto Mono', monospace;
    text-align: center;
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