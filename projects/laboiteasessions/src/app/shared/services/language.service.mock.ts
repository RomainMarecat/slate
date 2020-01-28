import { Observable } from 'rxjs';
import { Language } from '../interfaces/language';

export class MockLanguageService {

  getLanguages(): Observable<Language[]> {
    return new Observable<Language[]>((observer) => {
      observer.next(
        [{
          id: '',
          _iso6391: 'FR',
          _iso6392: 'FRA',
          native_name: 'Français',
          translations: {
            fr: 'Français',
            en: 'French'
          }
        }, {
          id: '',
          _iso6391: 'US',
          _iso6392: 'USA',
          native_name: 'American',
          translations: {
            fr: 'Américain',
            en: 'American'
          }
        }]
      );
      observer.complete();
    });
  }
}
