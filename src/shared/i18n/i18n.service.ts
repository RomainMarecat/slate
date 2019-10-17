import { Inject, Injectable, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  availableLanguages: Array<string> = ['fr', 'en'];

  locale: string;

  constructor(@Inject(LOCALE_ID) locale: string,
              private translateService: TranslateService,
              @Inject(PLATFORM_ID) private platformId) {
  }

  addLanguage(onlyDefaultLang: boolean = false) {
    const locale = 'fr-FR';
    if (!this.locale) {
      this.locale = locale;
    }
    this.locale = this.locale.substring(0, this.locale.indexOf('-', 2));
    this.translateService.setDefaultLang(this.locale);
    const browserLanguage = this.translateService.getBrowserLang();

    if (!onlyDefaultLang && this.availableLanguages.indexOf(browserLanguage) !== -1) {
      // use language saved by currentUser
      this.translateService.use(browserLanguage);
      this.locale = browserLanguage;
    }

    if (browserLanguage !== this.locale) {
      this.translateService.use(this.locale);
    }
  }
}

export class CommonMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (
      params.key.match(/\w+\.\w+/) &&
      params.translateService.translations['fr'] &&
      !params.translateService.translations['fr'][params.key]
    ) {
      console.log(`${params.key}`);
    }
    return params.key;
  }
}
