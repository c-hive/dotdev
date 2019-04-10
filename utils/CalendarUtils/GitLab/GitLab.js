/* eslint-disable no-console */
import * as Proxy from '../../Proxy/Proxy';
import * as JavaScriptUtils from '../../JavaScriptUtils/JavaScriptUtils';
import * as Common from '../Common/Common';

export const getJsonFormattedCalendar = async (gitLabUsername) => {
  const url = Proxy.getGitLabProxyUrl(gitLabUsername);
  const userCalendar = await fetch(url);

  return userCalendar.json()
    .then(parsedUserCalendar => parsedUserCalendar)
    .catch(err => console.log(err));
};

const getSpecificDateContributions = (gitLabCalendar, date) => {
  if (gitLabCalendar[date]) {
    return gitLabCalendar[date];
  }

  return 0;
};

export const mergeCalendars = (actualCalendar, gitLabCalendar) => {
  const copiedActualCalendar = JavaScriptUtils.deepCopyObject(actualCalendar);

  copiedActualCalendar.children[0].children.forEach((weeklyData, weekIndex) => {
    weeklyData.children.forEach((dailyData, dayIndex) => {
      if (dailyData.attributes['data-count']) {
        const actualCalendarDailyData = Common
          .getCalendarDataByIndexes(actualCalendar, weekIndex, dayIndex);
        const totalDailyContributions = Number(actualCalendarDailyData.attributes['data-count']) + getSpecificDateContributions(gitLabCalendar, actualCalendarDailyData.attributes['data-date']);

        copiedActualCalendar.children[0].children[weekIndex].children[dayIndex].attributes = {
          ...actualCalendarDailyData.attributes,
          'data-count': String(totalDailyContributions),
          fill: Common.getFillColor(totalDailyContributions),
        };
      }
    });

   if (weeklyData.name !== "text") {
      const lengthOfWeek = weeklyData.children.length * 2;
      const copiedActualCalendarWeek = copiedActualCalendar.children[0].children[weekIndex].children;

      for (let j = 1; j <= lengthOfWeek; j += 3) {
        const attr = copiedActualCalendarWeek[j - 1].attributes;
        
        if (copiedActualCalendarWeek.length !== lengthOfWeek) {          
          copiedActualCalendarWeek.splice(j, 0, {
            name: 'text',
            type: 'element',
            attributes: { class: 'contributionText', x: attr.x, y: attr.y },
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

export const getTotalContributions = (gitLabCalendar) => {
  let sum = 0;

  Object.keys(gitLabCalendar).forEach((date) => {
    sum += gitLabCalendar[date];
  });

  return sum;
};
