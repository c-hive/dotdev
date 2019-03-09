import React from 'react';
import { Header } from './App.style';
import ReactGithubCalendar from '../ReactGithubCalendar/ReactGithubCalendar';

const app = () => (
  <div>
    <Header>
      <img src="static/logo/logo.png" alt="C-Hive" />
      <p>C-Hive</p>
    </Header>
    <ReactGithubCalendar userName="gomorizsolt" />
  </div>
);

export default app;
