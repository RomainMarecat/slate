import { EventType } from '../../agenda/shared/event';
export const mockSession = {
  details: {
    event_type: EventType.session,
    nb_persons: 1,
    booking: 1,
    info: 'test',
    customers: [ 'test' ]
  },
  start: new Date(),
  end: new Date(),
};

export const mockSessions = [ {
  details: {
    event_type: EventType.session,
    nb_persons: 1,
    booking: 1,
    info: 'test1',
    customers: [ 'test' ]
  },
  start: new Date(),
  end: new Date(),
},
  {
    details: {
      event_type: EventType.session,
      nb_persons: 1,
      booking: 2,
      info: 'test2',
      customers: [ 'test' ]
    },
    start: new Date(),
    end: new Date(),
  }
];
