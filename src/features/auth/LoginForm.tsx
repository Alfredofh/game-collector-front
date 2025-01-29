import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loginUser, requestPasswordReset } from '../../services/userServices';
import { useAuth } from '../../contexts/authContext';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, login } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [showReset, setShowReset] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        try {
            const response = await loginUser({ email, password });
            login(response.token);
        } catch (err: any) {
            setError('Invalid email or password');
            console.error('Error during login:', err);
        }
    };

    const handlePasswordReset = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email) {
            setError('Please enter your email to reset password');
            return;
        }
        try {
            await requestPasswordReset(email);
            setMessage('If this email exists, a reset link has been sent.');
            setError(null);
        } catch (err: any) {
            setError('Error requesting password reset');
            console.error('Password reset error:', err);
        }
    };

    return (
        <FormContainer>
            <h2>User Login</h2>
            {showReset ? (
                <Form onSubmit={handlePasswordReset}>
                    <Label htmlFor="reset-email">Enter your email:</Label>
                    <Input
                        type="email"
                        id="reset-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit">Send Reset Link</Button>
                    <Button type="button" onClick={() => setShowReset(false)}>Back to Login</Button>
                </Form>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit">Login</Button>
                    <ForgotPasswordLink onClick={() => setShowReset(true)}>Forgot password?</ForgotPasswordLink>
                </Form>
            )}
            {error && <Message>{error}</Message>}
            {message && <Message success>{message}</Message>}
        </FormContainer>
    );
};

const ForgotPasswordLink = styled.p`
    color: #1b9aaa;
    cursor: pointer;
    text-align: center;
    margin-top: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

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
`;

const Message = styled.p<{ success?: boolean }>`
    color: ${(props) => (props.success ? '#3be13b' : '#ff0d72')};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
`;

export default LoginForm;
