import { OnlineSession } from './online-session';

export const mockOnlineSession: OnlineSession = {
  key: 'test1',
  session_type: {
    name: 'test1',
    max_persons: 1,
    booking_delay: 1,
    duration: 60,
    pause: 0,
  },
  prices: [10, 20],
  date_range: {
    start: '2018-01-01',
    end: '2019-12-31',
  },
  time_range: {
    start: '08:00',
    end: '19:00',
  }
};
