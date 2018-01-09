export class Attribute {
  key ?: string;
  name: string;
  translations: {
    fr: string;
  };
  slug: string;
  type: string;
  order_by: string;
  // At the moment, there are name in this array
  // After Terms Entity should be created to implements:
  // Thumbnail, name, description, slug, count
  terms: string[];
}
