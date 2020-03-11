import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InjectionToken, LOCALE_ID, NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { MetaModule } from '@ngx-meta/core';

import 'hammerjs';
import { ResponsiveModule } from 'ngx-responsive';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing.module';
import { FooterModule } from './layout/footer/footer.module';
import { NavbarModule } from './layout/navbar/navbar.module';
import { SidenavMenuModule } from './layout/sidenav-menu/sidenav-menu.module';
import { jwtOptionsFactory } from './shared/factory/jwt-options.factory';
import { InvalidJwtInterceptor } from './shared/interceptors/invalid-jwt.interceptor';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { StorageService } from './shared/services/storage.service';
import { APP_REDUCERS, appReducers } from './shared/store/app.reducer';
import { GetUserEffect } from './shared/store/user/effects/get-user.effect';
import { LoginEffect } from './shared/store/user/effects/login.effect';
import { LogoutEffect } from './shared/store/user/effects/logout.effect';
import { RegisterEffect } from './shared/store/user/effects/register.effect';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { ScrollToTopButtonModule } from './shared/components/scroll-to-top-button/scroll-to-top-button.module';
import { InstanceFactory, NgForage, NgForageConfig } from 'ngforage';

registerLocaleData(localeEn);
registerLocaleData(localeFr);

export const STRIPE_KEY = new InjectionToken<string>('stripe_key');

export function ngForageFactory(ngForageConfig: NgForageConfig) {
  // @ts-ignore
  return new NgForage({}, new InstanceFactory(ngForageConfig));
}

@NgModule({
  imports: [
    // Navigation components
    MatSidenavModule,
    NavbarModule,
    SidenavMenuModule,
    FooterModule,
    // Browser modules
    BrowserModule.withServerTransition({appId: 'laboiteasessions'}),
    BrowserAnimationsModule,
    HttpClientModule,
    TransferHttpCacheModule,
    ResponsiveModule.forRoot(),
    RouterModule,
    // Ngrx Store modules
    StoreModule.forRoot(APP_REDUCERS),
    EffectsModule.forRoot([
      LoginEffect,
      RegisterEffect,
      LogoutEffect,
      GetUserEffect,
    ]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // Routing
    AppRoutingModule,
    ScrollToTopButtonModule,
    MetaModule.forRoot(),
    // Security
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [StorageService]
      }
    }),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: STRIPE_KEY,
      useValue: environment.stripeKey
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    {
      provide: APP_REDUCERS,
      useValue: appReducers
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidJwtInterceptor,
      multi: true
    },
    {
      provide: NgForage,
      useFactory: ngForageFactory,
      deps: [
        NgForageConfig
      ]
    }
  ]
})
export class AppModule {
}
