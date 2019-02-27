import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';

import { TranslateLoader, TranslateModule, MissingTranslationHandler } from '@ngx-translate/core';

import { TranslatesBrowserLoaderService } from './translates-browser-loader.service';
import { CommonMissingTranslationHandler, I18nService } from '../i18n.service';

export function translateStaticLoader(
  http: HttpClient,
  transferState: TransferState,
): TranslatesBrowserLoaderService {
  return new TranslatesBrowserLoaderService('/assets/i18n/', '.json', transferState, http);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CommonMissingTranslationHandler,
      },
      loader: {
        provide: TranslateLoader,
        useFactory: translateStaticLoader,
        deps: [HttpClient, TransferState],
      },
    }),
  ],
  providers: [I18nService],
})
export class TranslatesBrowserModule {
}
