import React from "react";
import styled from "styled-components";
import * as customHooks from "../../utils/CustomHooks/CustomHooks";
import * as mediumUtils from "./utils/MediumUtils";
import Article from "./Article/Article";
import Loader from "../UI/Loader/Loader";
import { mediumStyle } from "./Medium.style";

const Medium = styled.div`
  ${mediumStyle}
`;

const medium = () => {
  const articles = customHooks.useFetch(mediumUtils.getArticles);

  if (articles.isLoading) {
    return <Loader />;
  }

  if (articles.err) {
    const errorMessage =
      "An error has occurred while loading the Medium articles. Please try again later.";

    return <div>{errorMessage}</div>;
  }

  return (
    <Medium>
      <h2 className="title">Articles</h2>
      {articles.data.map(articleDetails => (
        <Article key={articleDetails.guid} articleDetails={articleDetails} />
      ))}
    </Medium>
  );
};

export default medium;
