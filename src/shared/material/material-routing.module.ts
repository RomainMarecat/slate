import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { MaterialComponent } from './material/material.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialComponent,
    data: {
      breadcrumb: 'breadcrumb.material.title'
    },
    children: [
      {
        path: '',
        component: SummaryComponent,
        data: {
          breadcrumb: 'breadcrumb.material.summary'
        }
      },
      {
        path: 'button-indicators',
        loadChildren: './button/button.module#ButtonModule',
        data: {
          breadcrumb: 'breadcrumb.material.button.title'
        }
      },
      {
        path: 'datatable',
        loadChildren: './datatable/datatable.module#DatatableModule',
        data: {
          breadcrumb: 'breadcrumb.material.datatable.title'
        }
      },
      {
        path: 'form',
        loadChildren: './form/form.module#FormModule',
        data: {
          breadcrumb: 'breadcrumb.material.form.title'
        }
      },
      {
        path: 'layout',
        loadChildren: './layout/layout.module#LayoutModule',
        data: {
          breadcrumb: 'breadcrumb.material.layout.title'
        }
      },
      {
        path: 'navigation',
        loadChildren: './navigation/nav.module#NavModule',
        data: {
          breadcrumb: 'breadcrumb.material.navigation.title'
        }
      },
      {
        path: 'popup',
        loadChildren: './popup/popup.module#PopupModule',
        data: {
          breadcrumb: 'breadcrumb.material.popup.title'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class MaterialRoutingModule {
}
