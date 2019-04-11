import React, { Component, Fragment } from 'react';
import { stringify } from 'svgson';
import HtmlReactParser from 'html-react-parser';
import GitHubHeader from './GitHubHeader/GitHubHeader';
import * as Users from '../../../resources/Users/Users';
import * as CalendarUtils from '../../../utils/CalendarUtils';
import BasicCalendar from '../../../resources/BasicCalendar/BasicCalendar.json';
import { SvgPopUp } from './GitHubSvg.style';

class GitHubSvg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalContributions: 0,
      actualCalendar: BasicCalendar,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchFirstGitHubUserCalendar();
  }

  componentWillUnmount() {
    this.removePopUpEventListener();
  }

  processGitHubCalendar(currentUserJsonCalendar) {
    const { actualCalendar: { ...actualCalendar } } = this.state;

    const updatedActualCalendar = CalendarUtils.GitHub
      .mergeCalendars(actualCalendar, currentUserJsonCalendar);

    const currentUserTotalContributions = CalendarUtils.GitHub
      .getTotalContributions(currentUserJsonCalendar);

    this.writeState({
      currentUserTotalContributions,
      updatedActualCalendar,
    });
  }

  processGitLabCalendar(currentUserJsonCalendar) {
    const { actualCalendar: { ...actualCalendar } } = this.state;

    const updatedActualCalendar = CalendarUtils.GitLab
      .mergeCalendars(actualCalendar, currentUserJsonCalendar);

    const currentUserTotalContributions = CalendarUtils.GitLab
      .getTotalContributions(currentUserJsonCalendar);

    this.writeState({
      currentUserTotalContributions,
      updatedActualCalendar,
    });
  }

  async fetchFirstGitHubUserCalendar() {
    const firstGitHubUser = Users.GithubUsernames[0];

    const firstUserJsonCalendar = await CalendarUtils.GitHub
      .getJsonFormattedCalendarSync(firstGitHubUser);

    this.setState({
      isLoading: false,
    });

    if (CalendarUtils.GitHub.calendarIsFullWidth(firstUserJsonCalendar)) {
      const currentUserTotalContributions = CalendarUtils.GitHub
        .getTotalContributions(firstUserJsonCalendar);

      this.writeState({
        currentUserTotalContributions,
        updatedActualCalendar: firstUserJsonCalendar,
      });

      this.fetchRemainingCalendars();
    } else {
      // eslint-disable-next-line no-console
      console.error(
        CalendarUtils.GitHub.getIncorrectFirstUserCalendarErrorMessage(),
      );
    }

    this.addPopUpEventListeners();
  }

  fetchRemainingCalendars() {
    Users.GithubUsernames.slice(1).map(async (gitHubUsername) => {
      const currentUserJsonCalendar = await CalendarUtils.GitHub
        .getJsonFormattedCalendar(gitHubUsername);

      this.processGitHubCalendar(currentUserJsonCalendar);
    });

    Users.GitlabUsernames.map(async (gitLabUsername) => {
      const currentUserJsonCalendar = await CalendarUtils.GitLab
        .getJsonFormattedCalendar(gitLabUsername);

      this.processGitLabCalendar(currentUserJsonCalendar);
    });
  }

  writeState(data) {
    const { currentUserTotalContributions, updatedActualCalendar } = data;

    this.setState(prevState => ({
      totalContributions: prevState.totalContributions + currentUserTotalContributions,
      actualCalendar: {
        ...updatedActualCalendar,
      },
    }));
  }

  showPopUp(event) {
    const rectElement = event.target;

    const dataCount = rectElement.getAttribute('data-count');
    const dataDate = rectElement.getAttribute('data-date');
    const rectCoordinateProperties = rectElement.getBoundingClientRect();

    const gitHubPopUp = document.getElementById('gitHubPopUp');
    const contributionText = document.createTextNode(`${dataCount} contributions on ${dataDate}`);

    gitHubPopUp.appendChild(contributionText);
    gitHubPopUp.style.display = 'block';
    gitHubPopUp.style.top = `${rectCoordinateProperties.top - 25}px`;
    gitHubPopUp.style.left = `${rectCoordinateProperties.left - (gitHubPopUp.clientWidth / 2)}px`;   
  }

  hidePopUp() {
    const gitHubPopUp = document.getElementById('gitHubPopUp');

    if (gitHubPopUp.childNodes.length === 0) {
      return;
    }

    gitHubPopUp.style.display = 'none';
    gitHubPopUp.style.top = '0px';
    gitHubPopUp.style.left = '0px;'
    
    gitHubPopUp.removeChild(gitHubPopUp.childNodes[0]);
  }

  addPopUpEventListeners() {
    const rectElements = document.getElementsByTagName('rect');
    const rects = Array.from(rectElements);

    rects.map((rect) => {
      rect.addEventListener('mouseover', this.showPopUp);
      rect.addEventListener('mouseleave', this.hidePopUp);
    });
  }

  removePopUpEventListener() {
    const rects = Array.from(document.getElementsByTagName('rect'));

    rects.map((rect) => {
      rect.removeEventListener('mouseover', this.showPopUp);
      rect.removeEventListener('mouseleave', this.hidePopUp);
    });    
  }

  render() {
    const {
      totalContributions,
      actualCalendar: { ...actualCalendar },
      isLoading,
    } = this.state;
    
    const stringifiedHTMLContent = stringify(actualCalendar);
    
    return (
      <Fragment>
        <GitHubHeader
          isLoading={isLoading}
          totalContributions={totalContributions}
        />
        {HtmlReactParser(stringifiedHTMLContent)}
        <SvgPopUp id="gitHubPopUp" />
      </Fragment>
    );
  }
}

export default GitHubSvg;
