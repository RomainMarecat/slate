import { Article } from './article';

export const mockArticle: Article = {
  key: 'd4f32s',
  name: 'test',
  translations: {
    fr: 'test'
  },
  slug: 'test',
  description: 'test',
  published: true,
  published_at: Math.floor(Date.now() / 1000) as unknown as any
};
