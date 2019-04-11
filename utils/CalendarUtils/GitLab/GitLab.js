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
