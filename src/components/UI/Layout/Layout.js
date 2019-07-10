import React from "react";
import Header from "../Header/Header";

const layout = props => {
  const { children } = props;

  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default layout;
