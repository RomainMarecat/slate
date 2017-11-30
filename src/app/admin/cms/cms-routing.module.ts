import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './../../shared/guard/admin.guard';
import { CmsComponent } from './cms.component';
import { CmsListComponent } from './cms-list/cms-list.component';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';
import { CmsAddComponent } from './cms-add/cms-add.component';

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
    path: 'cms/:key/cms-detail',
    canActivate: [AdminGuard],
    loadChildren: './../cms/cms-detail.module#CmsDetailModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule {}
