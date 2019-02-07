import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader } from '@ngx-translate/core';

export class TranslateBrowserLoader implements TranslateLoader {

  constructor(
    private prefix = 'i18n',
    private suffix = '.json',
    private transferState: TransferState,
    private http: HttpClient) {
  }

  getTranslation(lang: string): Observable<any> {

    const key: StateKey<number> = makeStateKey<number>(`transfer-state-i18n-${lang}`);
    const data = this.transferState.get(key, null);

    // First we are looking for the translations in transfer-state, if none found, http load as fallback
    if (data) {
      return new Observable(observer => {
        observer.next(data);
        observer.complete();
      });
    } else {
      return new TranslateHttpLoader(this.http, this.prefix, this.suffix).getTranslation(lang);
    }
  }
}
