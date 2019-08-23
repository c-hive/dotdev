import React, { Fragment } from "react";
import styled from "styled-components";
import TeamContributionCalendarDisplayer from "../TeamContributionCalendarDisplayer/TeamContributionCalendarDisplayer";
import Header from "../Header/Header";
import Medium from "../Medium/Medium";
import OneCol from "../UI/Layout/OneCol";
import TwoCol from "../UI/Layout/TwoCol";
import { appStyle } from "./App.style";

const App = styled.div`
  ${appStyle}
`;

const app = () => (
  <Fragment>
    <Header />
    <App>
      <OneCol>
        <TeamContributionCalendarDisplayer />
      </OneCol>
      <TwoCol>
        <Medium />
      </TwoCol>
    </App>
  </Fragment>
);

export default app;
