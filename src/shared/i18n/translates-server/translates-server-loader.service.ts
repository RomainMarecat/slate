import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';

import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LocalizeParser } from 'localize-router';
import { Routes } from '@angular/router';

const fs = require('fs');

export class TranslatesServerLoaderService implements TranslateLoader {
  constructor(
    private prefix: string = 'i18n',
    private suffix: string = '.json',
    private transferState: TransferState,
  ) {
  }

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const jsonData: any = JSON.parse(
        fs.readFileSync(`${this.prefix}/${lang}${this.suffix}`, 'utf8'),
      );
      const key: StateKey<number> = makeStateKey<number>(`transfer-translate-${lang}`);
      this.transferState.set(key, jsonData);
      observer.next(jsonData);
      observer.complete();
    });
  }
}

export class LocalizeUniversalLoader extends LocalizeParser {
  /**
   * Gets config from the server
   */
  public load(routes: Routes): Promise<any> {
    return new Promise((resolve: any) => {
      const data: any = JSON.parse(fs.readFileSync(`assets/locales.json`, 'utf8'));
      this.locales = data.locales;
      this.prefix = data.prefix;
      this.init(routes).then(resolve);
    });
  }
}
