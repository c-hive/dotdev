import React from "react";
import Head from "next/head";
import { Normalize } from "styled-normalize";
import { GlobalStyle } from "../src/common/GlobalStyle/GlobalStyle";
import App from "../src/components/App/App";
import { ThemeProvider } from "../src/contexts/Theme";
import { ConfigProvider } from "../src/contexts/Config";
// The CI would complain about the missing config file if the rule was not ignored.
// Reason: at build-time, the config comes from an environment variable so it's not committed directly to the repository.
// eslint-disable-next-line import/no-unresolved
import config from "../config/config.yml";

const indexPage = () => (
  <>
    <Head>
      <title>{config.name}</title>
    </Head>
    <ThemeProvider>
      <Normalize />
      <GlobalStyle />
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </ThemeProvider>
  </>
);

export default indexPage;
