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
    path: 'a2hs',
    loadChildren: () => import('./../shared/a2hs/a2hs.module').then(m => m.A2hsModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('./../shared/chart/chart.module').then(m => m.ChartModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./../shared/product/product.module').then(m => m.SharedProductWithRoutesModule)
  },
  {
    path: 'gprd',
    loadChildren: () => import('./../shared/gprd/gprd.module').then(m => m.GprdModule)
  },
  {
    path: 'boards',
    loadChildren: () => import('./../shared/board/board.module').then(m => m.BoardModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./../shared/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./../shared/timeline/timeline.module').then(m => m.TimelineModule)
  },
  {
    path: 'layout-builder',
    loadChildren: () => import('./../shared/layout-builder/layout-builder.module').then(m => m.LayoutBuilderModule)
  },
  {
    path: 'invoices',
    loadChildren: () => import('./../shared/invoice/invoice.module').then(m => m.InvoiceModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./../shared/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'material',
    loadChildren: () => import('./../shared/material/example-material.module').then(m => m.ExampleMaterialModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./../shared/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./../shared/map/map.module').then(m => m.MapModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./../shared/agenda/firebase-agenda.module').then(m => m.FirebaseAgendaModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./../shared/article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./../shared/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./../shared/faq/faq.module').then(m => m.FaqModule)
  },
  {
    path: 'content',
    loadChildren: () => import('./../shared/cms-detail/cms-detail.module').then(m => m.CmsDetailModule)
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
