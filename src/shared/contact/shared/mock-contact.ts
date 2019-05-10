import { Contact } from './contact';

export const mockContact: Contact = {
  key: 'd4f32s',
  last_message: 'test',
  user: {
    uid: '5623265',
    displayName: 'Romain M',
    email: 'store@fake.store',
    photoURL: 'lama.jpg'
  },
  conversations: [],
  created_at: new Date(),
  updated_at: new Date(),
};
