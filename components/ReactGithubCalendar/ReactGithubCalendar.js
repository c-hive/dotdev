import React, { Component } from 'react';
import GithubCalendar from 'github-calendar';

import '../../node_modules/github-calendar/dist/github-calendar.css';
import '../../node_modules/github-calendar/dist/github-calendar-responsive.css';

class ReactGithubCalendar extends Component {
  constructor(props) {
    super(props);

    this.container = null;
  }

  componentDidMount() {
    const { userName } = this.props;

    GithubCalendar(this.container, userName);
  }

  render() {
    return (
      <div
        className="calendar"
        ref={(el) => {
          this.container = el;
        }}
      />
    );
  }
}

export default ReactGithubCalendar;
