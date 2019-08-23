import React from "react";
import styled from "styled-components";
import { twoColStyle } from "./TwoCol.style";

const TwoCol = styled.div`
  ${twoColStyle}
`;

const twoCol = props => {
  const { children } = props;

  return <TwoCol>{children}</TwoCol>;
};

export default twoCol;
