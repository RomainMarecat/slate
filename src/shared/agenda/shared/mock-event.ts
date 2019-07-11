import * as moment_ from 'moment';
import { Event } from '@romainmarecat/ngx-calendar';

const moment = moment_;

export const mockEvent: Event = {
  key: 'test',
  start: moment('2018-01-0110:00', 'YYYY-MM-DDHH:mm').toDate(),
  end: moment('2018-01-0112:00', 'YYYY-MM-DDHH:mm').toDate(),
  details: {},
  comment: '',
  pause: 0,
};
