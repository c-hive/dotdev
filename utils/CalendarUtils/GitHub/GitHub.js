/* eslint-disable no-console */
import { parse, parseSync } from 'svgson';
import * as JavaScriptUtils from '../../JavaScriptUtils/JavaScriptUtils';
import * as Common from '../Common/Common';
import * as Proxy from '../../Proxy/Proxy';

export const getIncorrectFirstUserCalendarErrorMessage = () => 'The first GitHub user\'s calendar in the list is incorrect. Please read the Constraint phase in README.md so that get further information about the reason for the error.';

const getCurrentUserSvg = async (gitHubUsername) => {
  const userUrl = Proxy.getGitHubProxyUrl(gitHubUsername);
  const responseData = await fetch(userUrl);

  return responseData.text()
    .then((body) => {
      const div = document.createElement('div');
      div.innerHTML = body;
      const rawUserSVG = div.querySelector('.js-calendar-graph-svg');

      return rawUserSVG;
    }).catch(err => console.log(err));
};

export const mergeCalendars = (actualCalendar, currentUserJsonCalendar) => {
  const copiedActualCalendar = JavaScriptUtils.deepCopyObject(actualCalendar);

  currentUserJsonCalendar.children[0].children.forEach((weeklyData, weekIndex) => {
    weeklyData.children.forEach((dailyData, dayIndex) => {
      if (dailyData.attributes['data-count']) {
        const actualCalendarDailyData = Common
          .getCalendarDataByIndexes(copiedActualCalendar, weekIndex, dayIndex);
        const totalDailyContributions = Number(actualCalendarDailyData.attributes['data-count']) + Number(dailyData.attributes['data-count']);

        copiedActualCalendar.children[0].children[weekIndex].children[dayIndex].attributes = {
          ...actualCalendarDailyData.attributes,
          'data-count': String(totalDailyContributions),
          fill: Common.getFillColor(totalDailyContributions),
        };
      }
    });
    
    if (weeklyData.name !== "text") {
      const lengthOfWeek = weeklyData.children.length * 3;
      const copiedActualCalendarWeek = copiedActualCalendar.children[0].children[weekIndex].children;

      for (let j = 1; j <= lengthOfWeek; j += 3) {
        const attr = copiedActualCalendarWeek[j - 1].attributes;
        
        if (copiedActualCalendarWeek.length !== lengthOfWeek) {          
          copiedActualCalendarWeek.splice(j, 0, {
            name: 'text',
            type: 'element',
            attributes: { class: 'contributionText', x: attr.x - 124, y: attr.y - 4 },
            children: [{
              name: '',
              children: [],
              attributes: {},
              type: 'text',
              value: `${attr['data-count']} contribution on ${attr['data-date']}`
            }],
            value: ''
          });

          copiedActualCalendarWeek.splice(j + 1, 0, {
            name: 'rect',
            type: 'element',
            attributes: { width: 124, height: 14, class: 'rectBackground', fill: 'rgba(0,0,0,0.3)', x: attr.x - 126, y: attr.y - 14 },
            children: [],
            value: ''
          });
        } else {
          copiedActualCalendarWeek[j].children[0].value =
            `${attr['data-count']} contribution on ${attr['data-date']}`;
        }
      }
    }

  });

  return copiedActualCalendar;
};

export const getTotalContributions = (currentUserJsonCalendar) => {
  let sum = 0;

  currentUserJsonCalendar.children[0].children.forEach((weeklyData) => {
    weeklyData.children.forEach((dailyData) => {
      if (dailyData.attributes['data-count']) {
        sum += Number(dailyData.attributes['data-count']);
      }
    });
  });

  return sum;
};

export const getJsonFormattedCalendar = async (gitHubUsername) => {
  const rawUserSvg = await getCurrentUserSvg(gitHubUsername);

  return parse(rawUserSvg.outerHTML)
    .then(parsedGitHubCalendar => parsedGitHubCalendar)
    .catch(err => console.log(err));
};

export const getJsonFormattedCalendarSync = async (gitHubUsername) => {
  const userCalendar = await getCurrentUserSvg(gitHubUsername);

  return parseSync(userCalendar.outerHTML);
};

export const calendarIsFullWidth = (calendar) => {
  const normalSizedCalendarWidth = '669';

  return calendar.attributes.width === normalSizedCalendarWidth;
};
