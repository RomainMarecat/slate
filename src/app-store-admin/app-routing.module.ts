import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
  ManualParserLoader
} from 'localize-router';
import { Location } from '@angular/common';

export function ManualLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['fr', 'en'], 'routes.');
}

const routes: Routes = [
  {
    // On root we go to root. On other route we start with this route and go on children route
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  // {
  //   path: 'charts',
  //   loadChildren: './../shared/chart/chart.module#ChartModule'
  // },
  // {
  //   path: 'invoice',
  //   loadChildren: './../shared/invoice/invoice.module#InvoiceModule'
  // },
  // {
  //   path: 'users',
  //   loadChildren: './../shared/user/user.module#UserModule'
  // },
  {
    path: 'contact',
    loadChildren: './../shared/contact/contact.module#ContactModule'
  },
  {
    path: 'admin',
    loadChildren: './../shared/admin/admin.module#AdminModule'
  },
  // {
  //   path: 'cart',
  //   loadChildren: './../shared/cart/cart.module#CartModule'
  // },
  // {
  //   path: 'shipping',
  //   loadChildren: './../shared/shipping/shipping.module#ShippingModule'
  // },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: ManualLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings]
      },
      alwaysSetPrefix: false
    }),
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [
    LocalizeRouterModule,
    RouterModule
  ]
})
export class AppRoutingModule {
}
