import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppRootComponent } from './core/root.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatesServerModule } from '../shared/i18n/translates-server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    FlexLayoutServerModule,
    ModuleMapLoaderModule,
    TranslatesServerModule
  ],
  bootstrap: [AppRootComponent],
})
export class AppServerModule {
}
