import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Header } from './App.style';
import ReactGithubCalendar from '../ReactGithubCalendar/ReactGithubCalendar';

describe('<App />', () => {
  let appWrapper;

  beforeEach(() => {
    appWrapper = shallow(<App />);
  });

  it('renders a Header', () => {
    expect(appWrapper.find(Header)).toHaveLength(1);
  });

  it('renders the logo', () => {
    expect(appWrapper.find('img')).toHaveLength(1);
  });

  it('renders the `C-Hive` text', () => {
    expect(appWrapper.find('p').text()).toEqual('C-Hive');
  });

  it('renders ReactGithubCalendar', () => {
    expect(appWrapper.find(ReactGithubCalendar)).toHaveLength(1);
  });
});
