export interface Category {
  key?: string;
  alias?: string;
  name: string;
  translations: {
    fr: string;
  };
  image?: string;
  slug?: string;
  description: string;
  keywords?: string;
  level?: number;
  lft?: string;
  rgt?: string;
  root?: string;
  parent?: string;
  published_at?: Date;
  published?: boolean;
  metadata?: {
    size: number;
  };
}
