import React from "react";
import styled from "styled-components";
import ProjectDisplayer from "./ProjectDisplayer/ProjectDisplayer";
import settings from "../../../settings/settings.json";
import { projectsStyle } from "./Projects.style";

const Projects = styled.div`
  ${projectsStyle}
`;

const projects = () => {
  return (
    <Projects>
      <h2 className="title">Projects</h2>

      {settings.github.repos.map(repo => (
        <ProjectDisplayer
          key={repo}
          userName={settings.github.name}
          repoName={repo}
        />
      ))}
    </Projects>
  );
};

export default projects;
