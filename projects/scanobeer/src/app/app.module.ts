import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: environment.firebase.projectId}),
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
