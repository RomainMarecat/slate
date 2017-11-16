import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class I18nService {

  private _locale: string;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private translateService: TranslateService
  ) {
    // set default Language. It fallback to en if language doesn't exist
    this.locale = 'en';
    this.translateService.setDefaultLang(this.locale);
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang !== this.locale) {
      this.locale = browserLang;
      this.initLocale(browserLang);
    }
  }

  initLocale(lang: string) {
    this.translateService.use(lang);
  }

  set locale(locale) {
    this._locale = locale;
  }

  get locale() {
    return this._locale;
  }
}
