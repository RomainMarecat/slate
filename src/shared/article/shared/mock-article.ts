import { Article } from './article';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

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
