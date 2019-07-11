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
  {
    path: 'agenda/firebase-agenda',
    loadChildren: () => import('./../shared/agenda/firebase-agenda.module').then(mod => mod.FirebaseAgendaModule)
  },
  {
    path: 'agenda/simple-agenda',
    loadChildren: () => import('./../shared/agenda/simple-agenda.module').then(mod => mod.SimpleAgendaModule)
  },
  {
    path: 'contact',
    loadChildren: './../shared/contact/contact.module#ContactModule'
  },
  {
    path: 'admin',
    loadChildren: './../shared/admin/admin.module#AdminModule'
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
