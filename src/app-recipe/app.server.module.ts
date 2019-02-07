import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppRootComponent } from './core/root.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { TransferState } from '@angular/platform-browser';
import { TranslateServerLoader } from '../shared/i18n/translate-server-loader.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


export function translateFactory(transferState: TransferState): TranslateServerLoader {
  return new TranslateServerLoader('/assets/i18n', '.json', transferState);
}

@NgModule({
  imports: [
    AppModule,
    FlexLayoutServerModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [TransferState]
      }
    })
  ],
  bootstrap: [AppRootComponent],
})
export class AppServerModule {
}
