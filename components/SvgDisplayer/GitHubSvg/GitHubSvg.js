import React, { Component, Fragment } from 'react';
import { stringify } from 'svgson';
import HtmlReactParser from 'html-react-parser';
import GitHubHeader from './GitHubHeader/GitHubHeader';
import * as Users from '../../../resources/Users/Users';
import * as CalendarUtils from '../../../utils/CalendarUtils';
import BasicCalendar from '../../../resources/BasicCalendar/BasicCalendar.json';

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
  }

  fetchRemainingCalendars() {
    Users.GitlabUsernames.map(async (gitLabUsername) => {
      const currentUserJsonCalendar = await CalendarUtils.GitLab
        .getJsonFormattedCalendar(gitLabUsername);

      this.processGitLabCalendar(currentUserJsonCalendar);
    });

    Users.GithubUsernames.slice(1).map(async (gitHubUsername) => {
      const currentUserJsonCalendar = await CalendarUtils.GitHub
        .getJsonFormattedCalendar(gitHubUsername);

      this.processGitHubCalendar(currentUserJsonCalendar);
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
      </Fragment>
    );
  }
}

export default GitHubSvg;
