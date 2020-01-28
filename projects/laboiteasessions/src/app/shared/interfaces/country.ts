export interface Country {
  id: string;
  name: string;
  translations: string[];
  latlng: string;
  demonth: string;
  timezone: string;
  currencies: string[];
  currency: string;
  demonym: {
    fr: string;
    en: string;
  };
  alpha2: string;
  alpha3: string;
  calling_codes: any;
  numeric_code: number;
}
