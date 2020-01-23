import { EventType, Session } from '@romainmarecat/ngx-calendar';
import * as moment_ from 'moment';

const moment = moment_;

export const mockSession: Session = {
  id: '0b8d674c-f1f6-4654-b44f-2b71019ffc45',
  event_type: EventType.session,
  nb_persons: 1,
  booking: 1,
  comment: 'test',
  customers: ['test'],
  duration: 15,
  start: new Date(),
  end: new Date(),
};

export const mockSessions: Session[] = [
  {
    id: 'e3891764-b626-4f42-8e9f-6fbc7a3f3f49',
    event_type: EventType.session,
    nb_persons: 1,
    booking: 1,
    comment: 'test1',
    customers: ['test'],
    duration: 15,
    start: moment().toDate(),
    end: moment().add('60', 'minute').toDate(),
  },
  {
    id: '1ed35627-4c92-4c23-ac47-88d0797ce823',
    event_type: EventType.session,
    nb_persons: 1,
    booking: 2,
    comment: 'test2',
    customers: ['test'],
    duration: 60,
    start: moment().toDate(),
    end: moment().add('1', 'day').toDate(),
  }
];
