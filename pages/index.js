import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import App from '../components/App/App';

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const indexPage = () => (
  <React.Fragment>
    <Normalize />
    <GlobalStyle />
    <App />
  </React.Fragment>
);

export default indexPage;
