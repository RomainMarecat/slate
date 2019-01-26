import { LOCALE_ID, NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module.tns';
import { AppRootComponent } from './core/root.component.tns';
import { CheckForUpdateService } from '../shared/pwa/shared/check-for-update.service';
import { AppHomepageComponent } from './app/app-homepage.component';
import { Angulartics2Module } from 'angulartics2';
import { CommonModule } from '@angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { MockUserService } from '../shared/user/shared/mock-user.service';

@NgModule({
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    Angulartics2Module.forRoot(),
    // CoreModule.forRoot(environment),
    CommonModule,
    // MenuModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule
  ],
  declarations: [
    AppRootComponent,
    AppHomepageComponent
  ],
  bootstrap: [
    AppRootComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    CheckForUpdateService,
    MockUserService
  ],
})
export class AppModule {
}
