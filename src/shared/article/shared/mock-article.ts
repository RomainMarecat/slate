import { Article } from './article';
import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;

export const mockArticle: Article = {
  key: 'd4f32s',
  name: 'test',
  translations: {
    fr: 'test'
  },
  slug: 'test',
  description: 'test',
  published: true,
  published_at: Timestamp.now()
};
