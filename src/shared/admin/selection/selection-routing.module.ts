import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SelectionEditComponent } from './selection-edit/selection-edit.component';
import { LocalizeRouterModule } from 'localize-router';
import { SelectionComponent } from './selection/selection.component';

const routes: Routes = [
  {
    path: '',
    component: SelectionComponent,
    canActivate: [AdminGuard],
    data: {
      breadcrumb: 'breadcrumb.selection.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: SelectionListComponent,
        data: {
          breadcrumb: 'breadcrumb.selection.list'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: SelectionEditComponent,
        data: {
          breadcrumb: 'breadcrumb.selection.add'
        },
      },
      {
        path: 'edit/:key',
        canActivate: [AdminGuard],
        component: SelectionEditComponent,
        data: {
          breadcrumb: 'breadcrumb.selection.edit'
        },
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
export class SelectionRoutingModule {
}
