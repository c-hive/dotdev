import { css } from "styled-components";

export const headerStyle = css`
  display: flex;
  align-items: center;
  max-width: 95vw;
  margin: 0px auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  & > img {
    max-height: 75px;
    max-width: 75px;
    margin: 20px 15px 20px 20px;
  }

  & > p {
    font-size: 1.5em;
    font-weight: 600;
  }
`;
