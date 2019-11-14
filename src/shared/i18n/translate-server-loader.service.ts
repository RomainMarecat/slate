import { join } from 'path';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

declare var require: any;
// require import needed for universal, as this is a native node module
// tslint:disable-next-line:no-require-imports
const fs = require('fs');

export class TranslateServerLoader implements TranslateLoader {

  constructor(
    private prefix = 'i18n',
    private suffix = '.json',
    private transferState: TransferState) {
  }

  getTranslation(lang: string): Observable<any> {
    return new Observable(observer => {
      const assetsFolder = join(process.cwd(), 'functions', 'dist', 'browser', this.prefix);
      const languageFile = `${assetsFolder}/${lang}${this.suffix}`;

      const jsonData = JSON.parse(fs.readFileSync(languageFile, 'utf8'));

      // Here we save the translations in the transfer-state
      const key: StateKey<number> = makeStateKey<number>(`transfer-state-i18n-${lang}`);
      this.transferState.set(key, jsonData);

      observer.next(jsonData);
      observer.complete();
    });
  }
}
