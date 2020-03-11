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
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./../shared/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./../shared/admin/admin.module').then(m => m.AdminModule)
  },
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
