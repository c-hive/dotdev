import React from "react";
import styled from "styled-components";
import {
  projectDisplayerStyle,
  errorContainerStyle,
  languagesTextContainerStyle,
  languagesIconContainerStyle,
} from "./ProjectDisplayer.style";
import * as githubUtils from "../utils/GithubUtils";
import Loader from "../../UI/Loader/Loader";
import StarIcon from "../../UI/Icons/StarIcon";
import { useConfig } from "../../../contexts/Config";
import IconDisplayer from "../../UI/Icons/IconDisplayer";

const ProjectDisplayer = styled.div`
  ${projectDisplayerStyle}
`;

const ErrorContainer = styled.div`
  ${errorContainerStyle}
`;

const LanguagesTextContainer = styled.div`
  ${languagesTextContainerStyle}
`;

const LanguagesIconContainer = styled.div`
  ${languagesIconContainerStyle}
`;

const projectDisplayer = ({ userName, repoName }) => {
  const config = useConfig();
  const {
    githubFetchState,
    githubRepoLanguages,
    repoLanguages,
  } = githubUtils.useRepoLanguages(userName, repoName);

  if (githubFetchState.isLoading || githubRepoLanguages.isLoading) {
    return (
      <ProjectDisplayer>
        <Loader />
      </ProjectDisplayer>
    );
  }

  if (githubFetchState.err) {
    const errorMessage = `An error has occurred while loading the ${repoName} Github project. Please try again later.`;

    return <ErrorContainer>{errorMessage}</ErrorContainer>;
  }

  if (githubRepoLanguages.err) {
    /* eslint-disable-next-line no-console */
    console.warn(
      `An error has occurred while loading the ${repoName} Github project languages. Please try again later.`
    );
  }

  return (
    <ProjectDisplayer>
      <a
        className="repository_link"
        href={githubFetchState.data.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="project_header">
          <div className="project_title">
            <div className="repository_name">{githubFetchState.data.name}</div>
            <div className="project_star">
              <StarIcon />
              {githubFetchState.data.stargazers_count}
            </div>
          </div>
        </div>
        <div className="project_description">
          <div>{githubFetchState.data.description}</div>
        </div>
        {repoLanguages && config.display === "icon" ? (
          <LanguagesIconContainer>
            {repoLanguages.map(tech =>
              config.technologyIcons[tech.toLowerCase()] ? (
                <IconDisplayer
                  key={tech.toLowerCase()}
                  name={config.technologyIcons[tech.toLowerCase()].name}
                  src={config.technologyIcons[tech.toLowerCase()].icon}
                />
              ) : (
                /* eslint-disable-next-line no-console */
                console.warn(
                  `There is no icon path specified in the settings for ${tech} technology`
                )
              )
            )}
          </LanguagesIconContainer>
        ) : (
          <LanguagesTextContainer>
            {repoLanguages.map(language => {
              return <div key={language}>{language}</div>;
            })}
          </LanguagesTextContainer>
        )}
      </a>
    </ProjectDisplayer>
  );
};

export default projectDisplayer;
