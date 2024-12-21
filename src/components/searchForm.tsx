import React, { useState } from 'react';
import styled from 'styled-components';

const SearchByGameNameForm: React.FC = () => {
    const [name, setName] = useState('');
    return (
        <FormContainer>
            <Form>
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
            <Message></Message>
            <Message success>{ }</Message>
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

const Message = styled.p<{ success?: boolean }>`
    color: ${(props) => (props.success ? '#3be13b' : '#ff0d72')};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
`;

export default SearchByGameNameForm;
