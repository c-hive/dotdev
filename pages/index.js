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

  rect[class=day]:hover + .contributionText + .rectBackground {
    visibility: visible;
    display:block;
  }

  rect[class=day]:hover + .contributionText {
    visibility: visible;
    display:block;
  }

  .contributionText {
    fill: black;
    display: none;
  }

  .rectBackground {
    display: none;
    visibility: visible;
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
