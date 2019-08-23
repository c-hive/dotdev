import React from "react";
import styled from "styled-components";
import { categoriesDisplayerStyle } from "./CategoriesDisplayer.style";

const CategoriesDisplayer = styled.div`
  ${categoriesDisplayerStyle}
`;

const categoriesDisplayer = ({ categories }) => (
  <div>
    {categories.map(category => (
      <CategoriesDisplayer key={category}>{category}</CategoriesDisplayer>
    ))}
  </div>
);

export default categoriesDisplayer;
