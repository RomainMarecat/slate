import { Day } from './day';
import * as faker from 'faker';
import * as moment from 'moment';
import { Twix, TwixIter } from 'twix';
import { Moment } from 'moment';

export const mockDay: Day = {
  title: faker.company.catchPhrase(),
  key: faker.random.uuid(),
  value: moment(faker.date.recent())
};

export class MockDayAvailabilities {
  static getDayAvailabilities() {
    const daysAvailability = new Map();
    const dateRange: TwixIter = moment()
      .twix(moment().add(7, 'day'))
      .iterate(1, 'days');
    const days: Day[] = [];
    // Loading all days
    while (dateRange.hasNext()) {
      const date: Twix = dateRange.next();
      days.push({
        title: date.format('DD/MM/YYYY'),
        key: date.format('YYYY-MM-DD'),
        value: moment(date.toDate())
      });
      daysAvailability.set(date.format('YYYY-MM-DD'), []);
    }

    return daysAvailability;
  }

  static getDays() {
    const dateRange: TwixIter = moment()
      .twix(moment().add(7, 'day'))
      .iterate(1, 'days');
    const days: Day[] = [];
    // Loading all days
    while (dateRange.hasNext()) {
      const date: Twix = dateRange.next();
      days.push({
        title: date.format('DD/MM/YYYY'),
        key: date.format('YYYY-MM-DD'),
        value: moment(date.toDate())
      });
    }

    return days;
  }
}

export const mockDays: Day[] = MockDayAvailabilities.getDays();

export const mockAvailabilities: Map<string, string[]> = MockDayAvailabilities.getDayAvailabilities();

export const mockEnd: Moment = moment().add(7, 'day');
export const mockStart: Moment = moment();
