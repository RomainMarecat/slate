import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { localizeLoaderFactory } from '../shared/router/localize.factory';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./../shared/product/product.module').then(m => m.SharedProductWithRoutesModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./../shared/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./../shared/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./../shared/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: '',
    loadChildren: () => import('./../shared/category/category.module').then(m => m.CategoryModule)
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
