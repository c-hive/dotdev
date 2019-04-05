import * as Common from './Common';
import * as TestUtils from '../../TestUtils/TestUtils';

describe('Common', () => {
  describe('getFillColor', () => {
    describe('when the total of the daily contributions is 0', () => {
      const totalDailyContributions = 0;

      it('sets the default color', () => {
        const expectedFillColor = '#ebedf0';

        const actualFillColor = Common.getFillColor(totalDailyContributions);

        expect(actualFillColor).toEqual(expectedFillColor);
      });
    });

    describe('when the total of the daily contributions is higher than 0 and less than 10', () => {
      const totalDailyContributions = 9;

      it('sets the `#c6e48b` color', () => {
        const expectedFillColor = '#c6e48b';

        const actualFillColor = Common.getFillColor(totalDailyContributions);

        expect(actualFillColor).toEqual(expectedFillColor);
      });
    });

    describe('when the total of the daily contributions is higher than or equal to 10 and less than 20', () => {
      const totalDailyContributions = 19;

      it('sets the `#7bc96f` color', () => {
        const expectedFillColor = '#7bc96f';

        const actualFillColor = Common.getFillColor(totalDailyContributions);

        expect(actualFillColor).toEqual(expectedFillColor);
      });
    });

    describe('when the total of the daily contributions is higher than or equal to 20 and less than 30', () => {
      const totalDailyContributions = 29;

      it('sets the `#239a3b` color', () => {
        const expectedFillColor = '#239a3b';

        const actualFillColor = Common.getFillColor(totalDailyContributions);

        expect(actualFillColor).toEqual(expectedFillColor);
      });
    });

    describe('when the total of the daily contributions is higher than or equal to 30', () => {
      const totalDailyContributions = 30;

      it('sets the `#196127` color', () => {
        const expectedFillColor = '#196127';

        const actualFillColor = Common.getFillColor(totalDailyContributions);

        expect(actualFillColor).toEqual(expectedFillColor);
      });
    });
  });

  describe('getCalendarDataByIndexes', () => {
    const calendarData = TestUtils.getFakeContributionsObjectWithDailyCounts([12])[0];
    const weekIndex = 0;

    describe('when the day index is defined', () => {
      const dayIndex = 0;

      it('returns the daily data of the given week', () => {
        const expectedDailyData = calendarData.children[0]
          .children[weekIndex].children[dayIndex];

        const actualDailyData = Common.getCalendarDataByIndexes(calendarData, weekIndex, dayIndex);

        expect(actualDailyData).toEqual(expectedDailyData);
      });
    });

    describe('when the day index is not defined', () => {
      it('returns the weekly data', () => {
        const expectedWeeklyData = calendarData.children[0].children[weekIndex];

        const actualWeeklyData = Common.getCalendarDataByIndexes(calendarData, weekIndex);

        expect(actualWeeklyData).toEqual(expectedWeeklyData);
      });
    });
  });
});
