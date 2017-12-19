import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './core/root.component';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment.hockey';

@NgModule({
  imports: [
    BrowserModule,
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
export class AppModule {}
