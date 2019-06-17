import * as moment_ from 'moment';
import { EventType, Session } from '@romainmarecat/ngx-calendar';

const moment = moment_;

export const mockSession: Session = {
  details: {
    event_type: EventType.session,
    nb_persons: 1,
    booking: 1,
    info: 'test',
    customers: ['test'],
    duration: 15
  },
  start: new Date(),
  end: new Date(),
};

export const mockSessions: Session[] = [
  {
    details: {
      event_type: EventType.session,
      nb_persons: 1,
      booking: 1,
      info: 'test1',
      customers: ['test'],
      duration: 15
    },
    start: moment().toDate(),
    end: moment().add('60', 'minute').toDate(),
  },
  {
    details: {
      event_type: EventType.session,
      nb_persons: 1,
      booking: 2,
      info: 'test2',
      customers: ['test'],
      duration: 60
    },
    start: moment().toDate(),
    end: moment().add('1', 'day').toDate(),
  }
];
