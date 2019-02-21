import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

export function ManualLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['fr', 'en'], 'routes.');
}

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'products',
    loadChildren: './../shared/product/product.module#ProductModule'
  },
  {
    path: 'cart',
    loadChildren: './../shared/cart/cart.module#CartModule'
  },
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
