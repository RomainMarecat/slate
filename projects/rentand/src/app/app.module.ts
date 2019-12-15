import { HttpClientModule } from '@angular/common/http';
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
import { AuthService } from './shared/services/auth.service';
import { MonoService } from './shared/services/mono.service';
import { ToastService } from './shared/services/toast.service';
import { APP_REDUCERS, appReducers } from './shared/store/app.reducer';

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
        useFactory: jwtOptionsFactory
      }
    }),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    BookingPipeService,
    MonoService,
    // UserService,
    AuthService,
    ToastService,
    // PublicGuard,
    // UserGuard,
    // BookingsService,
    {
      provide: APP_REDUCERS,
      useValue: appReducers
    }
  ]
})
export class AppModule {
}
