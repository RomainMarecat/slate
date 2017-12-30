export class Selection {
  key ?: string;
  name: string;
  alias ?: string;
  slug ?: string;
  translations: {
    fr: string;
  };
  description: string;
  keywords ?: string;
  level ?: number;
  lft ?: string;
  rgt ?: string;
  root ?: boolean;
  parent ?: string;
  published_at ?: Date;
  published ?: boolean;
  products ?: string[];
  images ?: string[];
}
