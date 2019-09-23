export const fetchRepo = (userName, repositoryName) => {
  const url = `https://api.github.com/repos/${userName}/${repositoryName}`;

  return fetch(url, {
    headers: {
      Accept: "application/vnd.github.baptiste-preview+json",
    },
  }).then(fetchedProjectDetails => fetchedProjectDetails.json());
};
