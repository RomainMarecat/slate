import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    // AppModule - FIRST!!!
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    //TranslatesServerModule.forRoot(environment.appName)
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {
}
