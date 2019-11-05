import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppRootComponent } from './core/root.component';
import { environment } from './environments/environment';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: environment.firebase.projectId}),
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    CoreModule.forRoot(environment),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    AppRoutingModule
  ],
  declarations: [
    AppRootComponent
  ],
  bootstrap: [
    AppRootComponent
  ]
})
export class AppModule {
}
