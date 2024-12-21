import React, { useState } from 'react';
import styled from 'styled-components';
import { searchGamesByName } from '../services/searchGamesIGDB';

const SearchByGameNameForm: React.FC = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<any[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Limpiar el error antes de iniciar la búsqueda
        setResults([]); // Limpiar resultados previos

        if (!name) {
            setError('El nombre del juego es obligatorio');
            return;
        }

        try {
            const response = await searchGamesByName(name);
            setResults(response); // Guardar los resultados en el estado
        } catch (error) {
            setError('Error al buscar juegos. Inténtalo nuevamente.');
            console.error('Error al buscar juego:', error);
        }
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="name">Busca juegos por nombre</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <Button type="submit">Buscar</Button>
            </Form>

            {error && <Message>{error}</Message>}

            {/* Mostrar resultados */}
            {results.length > 0 && (
                <ResultsGrid>
                    {results.map((game) => (
                        <Card key={game.id}>
                            <ImageContainer>
                                {game.cover ? (
                                    <GameImage
                                        src={`https:${game.cover.url}`}
                                        alt={game.name}
                                    />
                                ) : (
                                    <Placeholder>No Image</Placeholder>
                                )}
                            </ImageContainer>
                            <CardContent>
                                <GameTitle>{game.name}</GameTitle>
                                <GameDescription>
                                    {game.summary
                                        ? game.summary.slice(0, 150) + '...'
                                        : 'No description available.'}
                                </GameDescription>
                            </CardContent>
                        </Card>
                    ))}
                </ResultsGrid>
            )}
        </FormContainer>
    );
};

export default SearchByGameNameForm;

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

const Message = styled.div`
    margin-top: 10px;
    color: red;
`;

const ResultsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 50px; 
`;

const Card = styled.div`
    background: #2a2a2a;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.03);
    }
`;

const ImageContainer = styled.div`
    height: 200px; /* Tamaño más pequeño para evitar pixelado */
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a1a;
    overflow: hidden;
`;

const GameImage = styled.img`
    max-height: 100%; /* Limita la altura para evitar pixelado */
    width: auto; /* Mantiene las proporciones originales */
    object-fit: contain; /* Ajusta la imagen dentro del contenedor sin recortar */
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

const CardContent = styled.div`
    padding: 15px;
`;

const GameTitle = styled.h3`
    font-size: 18px;
    color: #ff477e;
    margin-bottom: 10px;
`;

const GameDescription = styled.p`
    font-size: 14px;
    color: #dcdcdc;
    line-height: 1.5;
`;
