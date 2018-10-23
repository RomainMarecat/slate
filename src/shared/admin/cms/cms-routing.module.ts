import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { CmsListComponent } from './cms-list/cms-list.component';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';
import { CmsAddComponent } from './cms-add/cms-add.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { CmsComponent } from './cms/cms.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: CmsComponent,
    data: {
      breadcrumb: 'breadcrumb.cms.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: CmsListComponent,
        data: {
          breadcrumb: 'breadcrumb.cms.list'
        },
      },
      {
        path: 'detail/:key',
        canActivate: [AdminGuard],
        component: CmsDetailComponent,
        data: {
          breadcrumb: 'breadcrumb.cms.detail'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: CmsAddComponent,
        data: {
          breadcrumb: 'breadcrumb.cms.add'
        },
      }
    ]
  },
  {
    path: ':key/cms-details',
    canActivate: [AdminGuard],
    loadChildren: './../cms-detail/cms-detail.module#CmsDetailModule'
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
export class CmsRoutingModule {
}
