import React from "react";
import styled from "styled-components";
import CategoriesDisplayer from "./CategoriesDisplayer/CategoriesDisplayer";
import { articleStyle } from "./Article.style";

const Article = styled.div`
  ${articleStyle}
`;

const article = ({ articleDetails }) => (
  <Article>
    <a href={articleDetails.link} target="_blank" rel="noopener noreferrer">
      {articleDetails.title}
    </a>
    <CategoriesDisplayer categories={articleDetails.categories} />
    <p>{new Date(articleDetails.pubDate).toDateString()}</p>
  </Article>
);

export default article;
