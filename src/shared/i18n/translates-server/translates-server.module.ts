import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { TranslateLoader, TranslateModule, MissingTranslationHandler } from '@ngx-translate/core';


import { TranslatesServerLoaderService } from './translates-server-loader.service';
import { CommonMissingTranslationHandler, I18nService } from '../i18n.service';

export function translateFactory(transferState: TransferState): TranslatesServerLoaderService {
  return new TranslatesServerLoaderService('./functions/dist/assets/i18n', '.json', transferState);
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
        useFactory: translateFactory,
        deps: [TransferState],
      },
    }),
  ],
  providers: [I18nService],
})
export class TranslatesServerModule {
}
