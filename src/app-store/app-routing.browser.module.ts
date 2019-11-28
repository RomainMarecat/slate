import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { localizeLoaderFactory } from '../shared/router/localize.factory';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'products',
    loadChildren: './../shared/product/product.module#SharedProductWithRoutesModule'
  },
  {
    path: 'cart',
    loadChildren: './../shared/cart/cart.module#CartModule'
  },
  {
    path: 'account',
    loadChildren: './../shared/account/account.module#AccountModule'
  },
  {
    path: 'contact',
    loadChildren: './../shared/contact/contact.module#ContactModule'
  },
  {
    path: '',
    loadChildren: './../shared/category/category.module#CategoryModule'
  },
];

@NgModule({
  imports: [
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings]
      },
      alwaysSetPrefix: false
    }),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [
    LocalizeRouterModule,
    RouterModule
  ]
})
export class AppRoutingBrowserModule {
}
