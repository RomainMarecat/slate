import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class I18nService {

  private locale: string;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private translateService: TranslateService
  ) {
    // set default Language. It fallback to en if language doesn't exist
    this.translateService.setDefaultLang('fr');
    if (locale && locale.length > 0) {
      this.locale = locale.length > 2 ? locale.substr(0, 2) : locale;
    } else {
      this.locale = 'fr';
    }
  }

  initLocale() {
    this.translateService.use(this.locale);
  }
}
