import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    #root {
        width: 100vw;
        height: 100vh;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: 'Nunito', sans-serif;
        background: rgb(104, 59, 174);
        background: linear-gradient(
            0deg,
            rgba(104, 59, 174, 1) 36%,
            rgba(96, 117, 226, 1) 100%
        );
    }
    h1, h2, p {
        margin: 0;
    }

    button {
        all: unset;
        cursor: pointer;
    }
    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
