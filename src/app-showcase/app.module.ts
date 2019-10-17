import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppRootComponent } from './core/root.component';
import { environment } from './environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(environment),
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
