import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { BookingPipeService } from './pages/booking-pipe/booking-pipe.service';
import { CartListEffect } from './pages/cart/cart-list/effect/cart-list.effect';
import { CartModule } from './pages/cart/cart.module';
import { jwtOptionsFactory } from './shared/factory/jwt-options.factory';
import { InvalidJwtInterceptor } from './shared/interceptors/invalid-jwt.interceptor';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { AuthenticationService } from './shared/services/authentication.service';
import { StorageService } from './shared/services/storage.service';
import { ToastService } from './shared/services/toast.service';
import { UserService } from './shared/services/user.service';
import { APP_REDUCERS, appReducers } from './shared/store/app.reducer';
import { GetUserEffect } from './shared/store/user/effects/get-user.effect';
import { LoginEffect } from './shared/store/user/effects/login.effect';
import { LogoutEffect } from './shared/store/user/effects/logout.effect';
import { RegisterEffect } from './shared/store/user/effects/register.effect';

@NgModule({
  imports: [
    // Navigation components
    MatSidenavModule,
    NavbarModule,
    SidenavMenuModule,
    FooterModule,
    CartModule,
    // Browser modules
    BrowserModule.withServerTransition({appId: 'rentand'}),
    BrowserAnimationsModule,
    HttpClientModule,
    TransferHttpCacheModule,
    ResponsiveModule.forRoot(),
    RouterModule,
    // Ngrx Store modules
    StoreModule.forRoot(APP_REDUCERS),
    EffectsModule.forRoot([
      CartListEffect,
      LoginEffect,
      RegisterEffect,
      LogoutEffect,
      GetUserEffect,
    ]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // Routing
    AppRoutingModule,
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
    BookingPipeService,
    UserService,
    // UserService,
    AuthenticationService,
    ToastService,
    // PublicGuard,
    // UserGuard,
    // BookingsService,
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
  ]
})
export class AppModule {
}
