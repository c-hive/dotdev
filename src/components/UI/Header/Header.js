import React from "react";
import styled from "styled-components";
import { headerStyle } from "./Header.style";
import ToggleButton from "../ToggleButton/ToggleButton";

const Header = styled.div`
  ${headerStyle}
`;

const header = () => (
  <Header>
    <img src="static/logo/logo.png" alt="C-Hive" />
    <p>C-Hive</p>
    <ToggleButton />
  </Header>
);

export default header;
