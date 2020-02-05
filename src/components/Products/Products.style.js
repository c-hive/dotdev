import { css } from "styled-components";
import { breakpoints } from "../../resources/Breakpoints/Breakpoints";

export const productsStyle = css`
  /* display: block; */
  margin: 0 auto;
  max-width: 1300px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  @media (max-width: ${breakpoints.large}) {
    max-width: 100%;
  }

  .products__title {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 28px;
    display: block;
    width: 100%;
  }

  & > div {
    height: auto;
    flex-basis: 25%;
    -ms-flex: auto;
    width: 259px;
    position: relative;
    padding: 10px;
    box-sizing: border-box;

    @media (max-width: ${breakpoints.large}) {
      flex-basis: 50%;
    }

    @media (max-width: ${breakpoints.medium}) {
      flex-basis: 100%;
    }
  }
`;