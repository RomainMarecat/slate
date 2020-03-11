import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { LocalizeRouterModule } from 'localize-router';
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
        loadChildren: () => import('./button/button.module').then(m => m.ButtonModule),
        data: {
          breadcrumb: 'breadcrumb.material.button.title'
        }
      },
      {
        path: 'datatable',
        loadChildren: () => import('./datatable/datatable.module').then(m => m.DatatableModule),
        data: {
          breadcrumb: 'breadcrumb.material.datatable.title'
        }
      },
      {
        path: 'form',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule),
        data: {
          breadcrumb: 'breadcrumb.material.form.title'
        }
      },
      {
        path: 'layout',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
        data: {
          breadcrumb: 'breadcrumb.material.layout.title'
        }
      },
      {
        path: 'navigation',
        loadChildren: () => import('./navigation/nav.module').then(m => m.NavModule),
        data: {
          breadcrumb: 'breadcrumb.material.navigation.title'
        }
      },
      {
        path: 'popup',
        loadChildren: () => import('./popup/popup.module').then(m => m.PopupModule),
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
