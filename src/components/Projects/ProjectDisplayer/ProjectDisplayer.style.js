import { css } from "styled-components";

export const projectDisplayerStyle = css`
  text-align: left;
  margin-bottom: 1.2em;

  .loader {
    margin: 0 auto;
  }

  .repository_link {
    display: flex;
    text-decoration: none;
    flex-direction: column;

    .project_header {
      width: 100%;
      display: flex;
      align-items: baseline;

      .project_title {
        .repository_name {
          text-transform: uppercase;
          font-size: 1.4em;
          line-height: 1.3em;
          display: inline-block;
        }

        .project_star {
          display: inline-block;
          margin: 0 12px;

          svg {
            width: 12px;
            height: 12px;
            margin: 0 2px 0 0;
          }
        }
      }
    }

    .project_description {
      font-size: 1em;
      font-style: italic;
      font-weight: 200;
    }
  }
`;
