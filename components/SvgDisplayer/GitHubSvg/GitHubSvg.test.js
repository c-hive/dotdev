import React from 'react';
import { shallow } from 'enzyme';
import GitHubSvg from './GitHubSvg';
import GitHubHeader from './GitHubHeader/GitHubHeader';
import * as CalendarUtils from '../../../utils/CalendarUtils';
import * as Users from '../../../resources/Users/Users';
import * as TestUtils from '../../../utils/TestUtils/TestUtils';

jest.mock('../../../utils/CalendarUtils/GitHub/GitHub', () => require
  .requireActual('../../../utils/TestUtils/TestUtils')
  .mockOriginalFunctionality(
    '../CalendarUtils/GitHub/GitHub',
  ));

jest.mock('../../../utils/CalendarUtils/GitLab/GitLab', () => require
  .requireActual('../../../utils/TestUtils/TestUtils')
  .mockOriginalFunctionality(
    '../CalendarUtils/GitLab/GitLab',
  ));

jest.mock('../../../utils/JavaScriptUtils/JavaScriptUtils', () => require
  .requireActual('../../../utils/TestUtils/TestUtils')
  .mockOriginalFunctionality(
    '../JavaScriptUtils/JavaScriptUtils',
  ));

jest.mock('html-react-parser');

describe('<GitHubSvg />', () => {
  let gitHubSvgWrapper;

  // In order to get rid of `Cannot read property outerHTML of undefined`.
  const gitHubJsonCalendar = {
    ...TestUtils.getFakeContributionsObjectWithDailyCounts([5])[0],
    attributes: {
      width: '669',
    },
  };

  beforeEach(() => {
    CalendarUtils.GitHub.getJsonFormattedCalendar.mockImplementation(
      () => gitHubJsonCalendar,
    );

    CalendarUtils.GitHub.getJsonFormattedCalendarSync.mockImplementation(
      () => gitHubJsonCalendar,
    );

    CalendarUtils.GitLab.getJsonFormattedCalendar.mockImplementation(
      () => ({
        '2018-03-22': 12,
      }),
    );

    gitHubSvgWrapper = shallow(<GitHubSvg />);
  });

  it('renders GitHubHeader', () => {
    expect(gitHubSvgWrapper.find(GitHubHeader)).toHaveLength(1);
  });

  describe('showToolTip', () => {
    let target = document.createElement('rect');
    let dataCount = '2';
    let dataDate = '2019-01-01';
    target.setAttribute('data-count', dataCount);
    target.setAttribute('data-date', dataDate);
    
    let event = {
      target
    };

    it('calls document.getElementById with "gitHubToolTip"', () => {
      let toolTipDiv = document.createElement('div');
      let getElementByIdSpy = jest.fn().mockReturnValue(toolTipDiv);
      global.document.getElementById = getElementByIdSpy;

      GitHubSvg.showToolTip(event);

      expect(getElementByIdSpy).toHaveBeenCalledWith('gitHubToolTip');
    });

    it('calls createTextNode with the "TODO TEXT"', () => {
      let text = `${dataCount} contributions on ${dataDate}`;
      let textNode = document.createTextNode(text);
      let createTextNodeSpy = jest.fn().mockReturnValue(textNode);
      global.document.createTextNode = createTextNodeSpy;

      GitHubSvg.showToolTip(event);

      expect(createTextNodeSpy).toHaveBeenCalledWith(text);
    });

    it('calls appendChild with text node', () => {
      let toolTipDiv = document.createElement('div');
      let appendChildSpy = jest.fn();
      toolTipDiv.appendChild = appendChildSpy;
      global.document.getElementById = jest.fn().mockReturnValue(toolTipDiv);

      GitHubSvg.showToolTip(event);

      expect(appendChildSpy).not.toHaveBeenCalled();
    });
  });

  describe('hideToolTip', () => {
    it('calls document.getElementById with "gitHubToolTip"', () => {
      let toolTipDiv = document.createElement('div');
      let getElementByIdSpy = jest.fn().mockReturnValue(toolTipDiv);
      global.document.getElementById = getElementByIdSpy;

      GitHubSvg.hideToolTip();

      expect(getElementByIdSpy).toHaveBeenCalledWith('gitHubToolTip');
    });

    describe('when the toolTip doesn\'t have child', () => {
      it('doesn\'t call removeChild', () => {
        let toolTipDiv = document.createElement('div');
        let removeChildSpy = jest.fn();
        toolTipDiv.removeChild = removeChildSpy;
        global.document.getElementById = jest.fn().mockReturnValue(toolTipDiv);

        GitHubSvg.hideToolTip();

        expect(removeChildSpy).not.toHaveBeenCalled();
      });
    });

    describe('when the toolTip has child', () => {
      it('calls removeChild with the child', () => {
        let toolTipDiv = document.createElement('div');
        let toolTipChild = document.createTextNode('');
        let removeChildSpy = jest.fn();
        toolTipDiv.removeChild = removeChildSpy;
        toolTipDiv.appendChild(toolTipChild);
        global.document.getElementById = jest.fn().mockReturnValue(toolTipDiv);

        GitHubSvg.hideToolTip();

        expect(removeChildSpy).toHaveBeenCalledWith(toolTipChild);
      });
    });
  });

  describe('addToolTipEventListeners', () => {
    let rectElement = document.createElement('rect');
    let rectElements = [rectElement];
    let rects = Array.from(rectElements);
    let addEventListenerSpy = jest.fn();
    rects[0].addEventListener = addEventListenerSpy;
    let getElementsByTagName = jest.fn().mockReturnValue(rectElements);
    let fromMock = jest.fn().mockReturnValue(rects);

    it('calls document.getElemetsByTagName with "rect"', () => {
      global.document.getElementsByTagName = getElementsByTagName;

      GitHubSvg.removeToolTipEventListener();

      expect(getElementsByTagName).toHaveBeenCalledWith('rect');
    });

    it('calls Array.from() with rect elements', () => {
      Array.from = fromMock;

      GitHubSvg.removeToolTipEventListener();

      expect(fromMock).toHaveBeenCalledWith(rectElements);
    });

    it('calls addEventListener with "mouseover" and GitHubSvg.showToolTip function', () => {
      GitHubSvg.removeToolTipEventListener();

      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseover', GitHubSvg.showToolTip)
    });

    it('calls addEventListener with "mouseleave" and GitHubSvg.hideToolTip function', () => {
      GitHubSvg.removeToolTipEventListener();

      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseleave', GitHubSvg.hideToolTip)
    });
  });

  describe('removeToolTipEventListeners', () => {
    let rectElement = document.createElement('rect');
    let rectElements = [rectElement];
    let rects = Array.from(rectElements);
    let removeEventListenerSpy = jest.fn();
    rects[0].removeEventListener = removeEventListenerSpy;
    let getElementsByTagName = jest.fn().mockReturnValue(rectElements);
    let fromMock = jest.fn().mockReturnValue(rects);

    it('calls document.getElemetsByTagName with "rect"', () => {
      global.document.getElementsByTagName = getElementsByTagName;

      GitHubSvg.removeToolTipEventListener();

      expect(getElementsByTagName).toHaveBeenCalledWith('rect');
    });

    it('calls Array.from() with rect elements', () => {
      Array.from = fromMock;

      GitHubSvg.removeToolTipEventListener();

      expect(fromMock).toHaveBeenCalledWith(rectElements);
    });

    it('calls removeEventListener with "mouseover" and GitHubSvg.showToolTip function', () => {
      GitHubSvg.removeToolTipEventListener();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseover', GitHubSvg.showToolTip)
    });

    it('calls removeEventListener with "mouseleave" and GitHubSvg.hideToolTip function', () => {
      GitHubSvg.removeToolTipEventListener();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', GitHubSvg.hideToolTip)
    });
  });

  describe('fetchFirstGitHubUserCalendar', () => {
    it('sets `isLoading` to false', async () => {
      await gitHubSvgWrapper.instance().fetchFirstGitHubUserCalendar();

      expect(gitHubSvgWrapper.state('isLoading')).toBeFalsy();
    });

    describe('when the first GH user`s calendar is not full-width', () => {
      beforeEach(() => {
        CalendarUtils.GitHub.calendarIsFullWidth.mockImplementationOnce(() => false);
      });

      it('logs the returned value of `GithubContributionsCalendar.getIncorrectFirstUserCalendarErrorMessage` as an error', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
        const expectedErrorMessage = CalendarUtils.GitHub
          .getIncorrectFirstUserCalendarErrorMessage();

        await gitHubSvgWrapper.instance().fetchFirstGitHubUserCalendar();

        expect(consoleErrorSpy).toHaveBeenCalledWith(expectedErrorMessage);
      });
    });

    describe('when the first GH user`s calendar is full-width', () => {
      const firstUserJsonCalendar = TestUtils.getFakeContributionsObjectWithDailyCounts([5])[0];

      beforeEach(() => {
        CalendarUtils.GitHub.calendarIsFullWidth.mockImplementationOnce(
          () => true,
        );

        CalendarUtils.GitHub.getJsonFormattedCalendarSync.mockImplementationOnce(
          () => firstUserJsonCalendar,
        );
      });

      it('calculates the total contributions of the current user', async () => {
        await gitHubSvgWrapper.instance().fetchFirstGitHubUserCalendar();

        expect(CalendarUtils.GitHub.getTotalContributions)
          .toHaveBeenCalledWith(firstUserJsonCalendar);
      });

      it('calls `writeState` with the total contributions and the first user`s calendar', async () => {
        const currentUserTotalContributions = 512;
        CalendarUtils.GitHub.getTotalContributions.mockImplementationOnce(
          () => currentUserTotalContributions,
        );

        const writeStateSpy = jest.spyOn(gitHubSvgWrapper.instance(), 'writeState');
        const expectedWriteStateObject = {
          currentUserTotalContributions,
          updatedActualCalendar: firstUserJsonCalendar,
        };

        await gitHubSvgWrapper.instance().fetchFirstGitHubUserCalendar();

        expect(writeStateSpy).toHaveBeenCalledWith(expectedWriteStateObject);
      });

      it('fetches the remaining calendars', async () => {
        const fetchRemainingCalendarsSpy = jest.spyOn(gitHubSvgWrapper.instance(), 'fetchRemainingCalendars');

        await gitHubSvgWrapper.instance().fetchFirstGitHubUserCalendar();

        expect(fetchRemainingCalendarsSpy).toHaveBeenCalled();
      });
    });
  });

  describe('fetchRemainingCalendars', () => {
    describe('GitHub', () => {
      const expectedCalledTimes = Users.GithubUsernames.length - 1;
      let processGitHubCalendarSpy;

      beforeEach(() => {
        // The reason for using `mockImplementation` here is to avoid calling
        // `processGitHubCalendar` in each iteration with `undefined` param.
        processGitHubCalendarSpy = jest.spyOn(gitHubSvgWrapper.instance(), 'processGitHubCalendar').mockImplementation(() => {});
      });

      it('fetches the JSON formatted calendars', () => {
        // Resetting the mocked function as it'd return the wrong number of called times.
        CalendarUtils.GitHub.getJsonFormattedCalendar.mockReset();

        gitHubSvgWrapper.instance().fetchRemainingCalendars();

        expect(CalendarUtils.GitHub.getJsonFormattedCalendar)
          .toHaveBeenCalledTimes(expectedCalledTimes);
      });

      it('processes the calendars', async () => {
        await gitHubSvgWrapper.instance().fetchRemainingCalendars();

        expect(processGitHubCalendarSpy).toHaveBeenCalledTimes(expectedCalledTimes);
      });
    });

    describe('GitLab', () => {
      const expectedCalledTimes = Users.GitlabUsernames.length;
      let processGitLabCalendarSpy;

      beforeEach(() => {
        processGitLabCalendarSpy = jest.spyOn(gitHubSvgWrapper.instance(), 'processGitLabCalendar').mockImplementation(() => {});
      });

      it('fetches the JSON formatted calendars', () => {
        // Resetting for the same reason.
        CalendarUtils.GitLab.getJsonFormattedCalendar.mockReset();

        gitHubSvgWrapper.instance().fetchRemainingCalendars();

        expect(CalendarUtils.GitLab.getJsonFormattedCalendar)
          .toHaveBeenCalledTimes(expectedCalledTimes);
      });

      it('processes the calendars', async () => {
        await gitHubSvgWrapper.instance().fetchRemainingCalendars();

        expect(processGitLabCalendarSpy).toHaveBeenCalledTimes(expectedCalledTimes);
      });
    });
  });

  describe('processGitHubCalendar', () => {
    const exampleCalendars = TestUtils.getFakeContributionsObjectWithDailyCounts([2, 3]);
    const currentUserJsonCalendar = exampleCalendars[0];

    it('merges the actual and current user calendars', () => {
      const currentActualCalendar = gitHubSvgWrapper.state('actualCalendar');

      gitHubSvgWrapper.instance().processGitHubCalendar(currentUserJsonCalendar);

      expect(CalendarUtils.GitHub.mergeCalendars)
        .toHaveBeenCalledWith(currentActualCalendar, currentUserJsonCalendar);
    });

    it('calculates the total contributions', () => {
      gitHubSvgWrapper.instance().processGitHubCalendar(currentUserJsonCalendar);

      expect(CalendarUtils.GitHub.getTotalContributions)
        .toHaveBeenCalledWith(currentUserJsonCalendar);
    });

    it('calls `writeState` with the total contributions of the current user and the updated actual calendar', () => {
      const currentUserTotalContributions = 1024;

      CalendarUtils.GitHub.mergeCalendars.mockImplementationOnce(
        () => exampleCalendars[1],
      );

      CalendarUtils.GitHub.getTotalContributions.mockImplementationOnce(
        () => currentUserTotalContributions,
      );

      const writeStateSpy = jest.spyOn(gitHubSvgWrapper.instance(), 'writeState');

      const expectedWriteStateObject = {
        currentUserTotalContributions,
        updatedActualCalendar: exampleCalendars[1],
      };

      gitHubSvgWrapper.instance().processGitHubCalendar(currentUserJsonCalendar);

      expect(writeStateSpy).toHaveBeenCalledWith(expectedWriteStateObject);
    });
  });

  describe('processGitLabCalendar', () => {
    const currentUserJsonCalendar = {
      '2018-02-23': 5,
    };

    it('merges the actual and current user calendars', () => {
      const currentActualCalendar = gitHubSvgWrapper.state('actualCalendar');

      gitHubSvgWrapper.instance().processGitLabCalendar(currentUserJsonCalendar);

      expect(CalendarUtils.GitLab.mergeCalendars)
        .toHaveBeenCalledWith(currentActualCalendar, currentUserJsonCalendar);
    });

    it('calculates the total contributions', () => {
      gitHubSvgWrapper.instance().processGitLabCalendar(currentUserJsonCalendar);

      expect(CalendarUtils.GitLab.getTotalContributions)
        .toHaveBeenCalledWith(currentUserJsonCalendar);
    });

    it('calls `writeState` with the total contributions of the current user and the updated actual calendar', () => {
      const currentUserTotalContributions = 2048;
      const updatedActualCalendar = TestUtils.getFakeContributionsObjectWithDailyCounts([1])[0];

      CalendarUtils.GitLab.mergeCalendars.mockImplementationOnce(
        () => updatedActualCalendar,
      );

      CalendarUtils.GitLab.getTotalContributions.mockImplementationOnce(
        () => currentUserTotalContributions,
      );

      const writeStateSpy = jest.spyOn(gitHubSvgWrapper.instance(), 'writeState');

      const expectedWriteStateObject = {
        currentUserTotalContributions,
        updatedActualCalendar,
      };

      gitHubSvgWrapper.instance().processGitLabCalendar(currentUserJsonCalendar);

      expect(writeStateSpy).toHaveBeenCalledWith(expectedWriteStateObject);
    });
  });

  describe('writeState', () => {
    it('adds the received total contributions to `totalContributions`', () => {
      const data = { currentUserTotalContributions: 50 };
      const expectedTotalContributions = gitHubSvgWrapper.state('totalContributions') + data.currentUserTotalContributions;

      gitHubSvgWrapper.instance().writeState(data);

      expect(gitHubSvgWrapper.state('totalContributions')).toEqual(expectedTotalContributions);
    });

    it('updates the actual calendar', () => {
      const calendarGraph = TestUtils.getFakeContributionsObjectWithDailyCounts([3]);
      const data = { updatedActualCalendar: calendarGraph[0] };

      gitHubSvgWrapper.instance().writeState(data);

      expect(gitHubSvgWrapper.state('actualCalendar')).toEqual(data.updatedActualCalendar);
    });
  });
});
