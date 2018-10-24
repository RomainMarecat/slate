import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
  ManualParserLoader
} from '@gilsdav/ngx-translate-router';
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
    path: 'a2hs',
    loadChildren: './../shared/a2hs/a2hs.module#A2hsModule'
  },
  {
    path: 'charts',
    loadChildren: './../shared/chart/chart.module#ChartModule'
  },
  {
    path: 'products',
    loadChildren: './../shared/product/product.module#ProductModule'
  },
  {
    path: 'gprd',
    loadChildren: './../shared/gprd/gprd.module#GprdModule'
  },
  {
    path: 'boards',
    loadChildren: './../shared/board/board.module#BoardModule'
  },
  {
    path: 'admin',
    loadChildren: './../shared/admin/admin.module#AdminModule'
  },
  {
    path: 'timeline',
    loadChildren: './../shared/timeline/timeline.module#TimelineModule'
  },
  {
    path: 'layout-builder',
    loadChildren: './../shared/layout-builder/layout-builder.module#LayoutBuilderModule'
  },
  {
    path: 'invoices',
    loadChildren: './../shared/invoice/invoice.module#InvoiceModule'
  },
  {
    path: 'users',
    loadChildren: './../shared/user/user.module#UserModule'
  },
  {
    path: 'material',
    loadChildren: './../shared/material/material.module#MaterialModule'
  },
  {
    path: 'contact-us',
    loadChildren: './../shared/contact/contact.module#ContactModule'
  },
  {
    path: 'map',
    loadChildren: './../shared/map/map.module#MapModule'
  },
  {
    path: 'agenda',
    loadChildren: './../shared/agenda/agenda.module#AgendaModule'
  },
  {
    path: 'article',
    loadChildren: './../shared/article/article.module#ArticleModule'
  },
  {
    path: 'cart',
    loadChildren: './../shared/cart/cart.module#CartModule'
  },
  {
    path: 'faq',
    loadChildren: './../shared/faq/faq.module#FaqModule'
  },
  {
    path: 'content',
    loadChildren: './../shared/cms-detail/cms-detail.module#CmsDetailModule'
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
