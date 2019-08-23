import { css } from "styled-components";
import { breakpoints } from "../../../resources/Breakpoints/Breakpoints";

export const twoColStyle = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    width: 48%;

    @media (max-width: ${breakpoints.large}) {
      width: 100%;
    }
  }
`;
