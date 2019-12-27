import { Observable } from 'rxjs';
import { Language } from '../interfaces/language';

export class MockLanguageService {

  getLanguages(): Observable<Language[]> {
    return new Observable<Language[]>((observer) => {
      observer.next(
        [{
          ISO639_1: 'FR',
          ISO639_2: 'FRA',
          native_name: 'Français',
          trans: {
            fr: 'Français',
            en: 'French'
          }
        }, {
          ISO639_1: 'US',
          ISO639_2: 'USA',
          native_name: 'American',
          trans: {
            fr: 'Américain',
            en: 'American'
          }
        }]
      );
      observer.complete();
    });
  }
}
