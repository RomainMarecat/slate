import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class I18nService {

  locale: string;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private translateService: TranslateService
  ) {
    this.locale = locale.substring(0, locale.indexOf('-', 2));
    this.translateService.setDefaultLang(this.locale);
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang !== this.locale) {
      this.locale = browserLang;
      this.translateService.use(this.locale);
    }
  }
}
