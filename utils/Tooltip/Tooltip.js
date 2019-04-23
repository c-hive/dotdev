export const showToolTip = (event) => {
  const rectElement = event.target;

  const dataCount = rectElement.getAttribute('data-count');
  const dataDate = rectElement.getAttribute('data-date');
  const rectCoordinateProperties = rectElement.getBoundingClientRect();

  const gitHubToolTip = document.getElementById('gitHubToolTip');
  const contributionText = document.createTextNode(`${dataCount} contributions on ${dataDate}`);

  gitHubToolTip.appendChild(contributionText);
  gitHubToolTip.style.display = 'block';
  gitHubToolTip.style.top = `${rectCoordinateProperties.top - 25}px`;
  gitHubToolTip.style.left = `${rectCoordinateProperties.left - (gitHubToolTip.clientWidth / 2)}px`;
}

export const hideToolTip = () => {
  const gitHubToolTip = document.getElementById('gitHubToolTip');

  if (gitHubToolTip.childNodes.length === 0) {
    return;
  }

  gitHubToolTip.style.display = 'none';
  gitHubToolTip.style.top = '0px';
  gitHubToolTip.style.left = '0px;';

  gitHubToolTip.removeChild(gitHubToolTip.childNodes[0]);
}

export const addToolTipEventListeners = () => {
  const rectElements = document.getElementsByTagName('rect');
  const rects = Array.from(rectElements);

  rects.map((rect) => {
    rect.addEventListener('mouseover', showToolTip);
    rect.addEventListener('mouseleave', hideToolTip);

    return null;
  });
}