import React, { useState } from 'react';
import { registerUser } from '../services/userServices';
import styled from 'styled-components';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validaciones en el frontend
        if (!username || !email || !password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('El formato del correo electrónico no es válido');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            const data = await registerUser({ username, email, password });
            setSuccess(data.message);
            setError(null);
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('Error de red. Inténtalo de nuevo más tarde.');
            }
            setSuccess(null);
        }
    };

    return (
        <FormContainer>
            <h2>Registro de Usuario</h2>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="username">Nombre de usuario:</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Correo electrónico:</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Contraseña:</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit">Registrarse</Button>
            </Form>
            {error && <Message>{error}</Message>}
            {success && <Message success>{success}</Message>}
        </FormContainer>
    );
};


// Definir los estilos usando styled-components
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    font-family: 'Press Start 2P', cursive;
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
    font-family: 'VT323', monospace;
`;

const Button = styled.button`
    background-color: #1b9aaa;
    color: #ffffff;
    border: 3px solid #000000;
    padding: 10px 20px;
    font-family: 'Press Start 2P', cursive;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 2px 2px #000000;

    &:hover {
        background-color: #0d6d8c;
    }
`;

const Message = styled.p<{ success?: boolean }>`
    color: ${(props) => (props.success ? '#3be13b' : '#ff0d72')};
`;


export default RegisterForm;