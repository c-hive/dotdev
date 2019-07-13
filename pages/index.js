import React from "react";
import Head from "next/head";
import { Normalize } from "styled-normalize";
import GlobalTheme from "../src/components/GlobalTheme/GlobalTheme";
import { GlobalStyle } from "../src/common/GlobalStyle/GlobalStyle";
import App from "../src/components/App/App";

const indexPage = () => (
  <GlobalTheme>
    <Head>
      <script src="https://cdn.jsdelivr.net/gh/c-hive/team-contribution-calendar/dist/team-contribution-calendar.min.js" />
    </Head>
    <Normalize />
    <GlobalStyle />
    <App />
  </GlobalTheme>
);

export default indexPage;
