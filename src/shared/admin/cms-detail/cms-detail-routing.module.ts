import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { CmsDetailListComponent } from './cms-detail-list/cms-detail-list.component';
import { CmsDetailAddComponent } from './cms-detail-add/cms-detail-add.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: CmsDetailComponent,
    data: {
      breadcrumb: 'breadcrumb.cms-detail.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: CmsDetailListComponent,
        data: {
          breadcrumb: 'breadcrumb.cms-detail.list'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: CmsDetailAddComponent,
        data: {
          breadcrumb: 'breadcrumb.cms-detail.add'
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
export class CmsDetailRoutingModule {
}
