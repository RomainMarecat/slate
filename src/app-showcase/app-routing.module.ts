import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { HomeComponent } from './home/home.component';

export function ManualLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['fr', 'en'], 'routes.');
}

const routes: Routes = [
  {
    path: '',
    canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'meta.title.homepage'
          }
        }
      },
      {
        path: 'admin',
        loadChildren: () => import('./../shared/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./../shared/contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'agenda',
        loadChildren: () => import('./../shared/agenda/firebase-agenda.module').then(m => m.FirebaseAgendaModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./../shared/cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('./../shared/faq/faq.module').then(m => m.FaqModule)
      }]
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
