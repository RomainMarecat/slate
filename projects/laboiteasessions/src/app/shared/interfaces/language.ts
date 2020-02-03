export interface Language {
  id: string;
  _iso6391: string;
  _iso6392: string;
  native_name: string;
  translations: {
    [key: string]: string;
  };
}
