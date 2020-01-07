import { Event } from '@romainmarecat/ngx-calendar';
import * as moment_ from 'moment';

const moment = moment_;

export const mockEvent: Event = {
  id: '01a51b92-1b7b-4533-93ea-b5cff32d9f4d',
  start: moment('2018-01-0110:00', 'YYYY-MM-DDHH:mm').toDate(),
  end: moment('2018-01-0112:00', 'YYYY-MM-DDHH:mm').toDate(),
  comment: 'test',
  pause: 0,
};
