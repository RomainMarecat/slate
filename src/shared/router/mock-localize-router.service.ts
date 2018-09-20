import { NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';
import { DummyLocalizeParser } from '@gilsdav/ngx-translate-router';

export class MockLocalizeRouterService {

  parser: DummyLocalizeParser = {currentLang: 'fr'} as DummyLocalizeParser;

  routerEvents: Subject<string> = new Subject<string>();

  init(): void {
    return;
  }

  /**
   * Change language and navigate to translated route
   */
  changeLanguage(lang: string, extras?: NavigationExtras, useNavigateMethod?: boolean): void {
    return;
  }

  /**
   * Translate route to current language
   * If new language is explicitly provided then replace language part in url with new language
   */
  translateRoute(path: string | any[]): string | any[] {
    return '';
  }
}
