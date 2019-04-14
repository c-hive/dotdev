import React, { Component, Fragment } from 'react';
import { stringify } from 'svgson';
import HtmlReactParser from 'html-react-parser';
import GitHubHeader from './GitHubHeader/GitHubHeader';
import * as Users from '../../../resources/Users/Users';
import * as CalendarUtils from '../../../utils/CalendarUtils';
import BasicCalendar from '../../../resources/BasicCalendar/BasicCalendar.json';
import { SvgToolTip } from './GitHubSvg.style';

class GitHubSvg extends Component {
  static showToolTip(event) {
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

  static hideToolTip() {
    const gitHubToolTip = document.getElementById('gitHubToolTip');

    if (gitHubToolTip.childNodes.length === 0) {
      return;
    }

    gitHubToolTip.style.display = 'none';
    gitHubToolTip.style.top = '0px';
    gitHubToolTip.style.left = '0px;';

    gitHubToolTip.removeChild(gitHubToolTip.childNodes[0]);
  }

  static addToolTipEventListeners() {
    const rectElements = document.getElementsByTagName('rect');
    const rects = Array.from(rectElements);

    rects.map((rect) => {
      rect.addEventListener('mouseover', GitHubSvg.showToolTip);
      rect.addEventListener('mouseleave', GitHubSvg.hideToolTip);

      return null;
    });
  }

  static removeToolTipEventListener() {
    const rectElements = document.getElementsByTagName('rect');
    const rects = Array.from(rectElements);

    rects.map((rect) => {
      rect.removeEventListener('mouseover', GitHubSvg.showToolTip);
      rect.removeEventListener('mouseleave', GitHubSvg.hideToolTip);

      return null;
    });
  }

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
    GitHubSvg.removeToolTipEventListener();
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

    GitHubSvg.addToolTipEventListeners();
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
        <SvgToolTip id="gitHubToolTip" />
      </Fragment>
    );
  }
}

export default GitHubSvg;
