import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    /* Reset de estilos */
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Estilos globales */
    body {
        font-family: 'Rubik', sans-serif;
        background-color: #2c2c2c; /* Fondo oscuro */
        color: #ffffff; /* Color de texto */
        margin: 0;
        padding: 0;
        line-height: 1.6; /* Espaciado para legibilidad */
    }

    h1, h2, h3 {
        color: #ff0d72; /* Color primario neón */
        font-family: 'Press Start 2P', cursive; /* Fuente de píxeles */
        text-shadow: 2px 2px #000000; /* Sombra para dar efecto retro */
    }

    p {
        font-family: 'Rubik', sans-serif; /* Fuente más legible */
        color: #d1d5db; /* Texto gris claro para contrastar */
    }

    button {
        font-family: 'Press Start 2P', cursive;
    }
`;

export default GlobalStyles;
