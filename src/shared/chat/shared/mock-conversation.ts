import { mockUser } from '../../user/shared/mock-user';
import { Conversation } from './conversation';

export const mockConversation: Conversation = {
  key: 'd6323',
  message: 'test',
  contact: '4536596ds5s',
  user: mockUser,
  created_at: new Date(),
  updated_at: new Date(),
};
