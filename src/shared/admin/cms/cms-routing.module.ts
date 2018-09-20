import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { CmsComponent } from './cms.component';
import { CmsListComponent } from './cms-list/cms-list.component';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';
import { CmsAddComponent } from './cms-add/cms-add.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [{
  path: '',
  redirectTo: 'list',
  canActivate: [AdminGuard],
  component: CmsComponent
},
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: CmsListComponent
  },
  {
    path: 'detail/:key',
    canActivate: [AdminGuard],
    component: CmsDetailComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: CmsAddComponent
  }, {
    path: ':key/cms-details',
    canActivate: [AdminGuard],
    loadChildren: './../cms-detail/cms-detail.module#CmsDetailModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule]
})
export class CmsRoutingModule {
}
