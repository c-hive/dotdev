import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        width: 100%;
        height: 100%;
        transition: background 1s;
        background: ${props => props.theme.background};
        color: ${props => props.theme.color};
    }
`;
