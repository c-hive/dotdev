import React, { Component } from "react";
import TeamContributionCalendar from "@c-hive/team-contribution-calendar";
import * as Users from "../../../resources/Users/Users";

class TeamContributionCalendarDisplayer extends Component {
  constructor(props) {
    super(props);

    this.calendarContainer = null;
  }

  componentDidMount() {
    TeamContributionCalendar(this.calendarContainer, Users.githubUsernames, Users.gitlabUsernames);
  }

  render() {
    return (
      <div
        className="calendarContainer"
        ref={el => {
          this.calendarContainer = el;
        }}
      />
    );
  }
}

export default TeamContributionCalendarDisplayer;
