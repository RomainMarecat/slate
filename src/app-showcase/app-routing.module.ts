import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { HomeComponent } from './home/home.component';

export function ManualLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['fr', 'en'], 'routes.');
}

const routes: Routes = [{
  // On root we go to root. On other route we start with this route and go on children route
  path: '',
  redirectTo: '',
  pathMatch: 'full',
  children: [{
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }]
},
  {
    path: 'admin',
    loadChildren: './../shared/admin/admin.module#AdminModule'
  },
  {
    path: 'contact',
    loadChildren: './../shared/contact/contact.module#ContactModule'
  },
  {
    path: 'agenda',
    loadChildren: './../shared/agenda/firebase-agenda.module#FirebaseAgendaModule'
  },
  {
    path: 'cart',
    loadChildren: './../shared/cart/cart.module#CartModule'
  },
  {
    path: 'faq',
    loadChildren: './../shared/faq/faq.module#FaqModule'
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
    RouterModule.forRoot(routes)
  ],
  exports: [
    LocalizeRouterModule,
    RouterModule
  ]
})
export class AppRoutingModule {
}
