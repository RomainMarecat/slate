import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'products',
    loadChildren: './../shared/product/product.module#SharedProductModule'
  },
  {
    path: 'cart',
    loadChildren: './../shared/cart/cart.module#CartModule'
  },
];

const fs = require('fs');

export class LocalizeUniversalLoader extends LocalizeParser {
  /**
   * Gets config from the server
   */
  public load(appRoutes: Routes): Promise<any> {
    return new Promise((resolve: any) => {
      const data: any = JSON.parse(fs.readFileSync(`src/app-store/assets/i18n/fr.json`, 'utf8'));
      this.locales = data.locales;
      this.prefix = data.prefix;
      this.init(appRoutes).then(resolve);
    });
  }
}

export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new LocalizeUniversalLoader(translate, location, settings);
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeLoaderFactory,
        deps: [TranslateService, Location]
      }
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
export class AppRoutingServerModule {
}
