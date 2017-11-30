import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './../../shared/guard/admin.guard';
import { CmsDetailListComponent } from './cms-detail-list/cms-detail-list.component';
import { CmsDetailAddComponent } from './cms-detail-add/cms-detail-add.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'list',
    canActivate: [AdminGuard],
    component: CmsDetailListComponent
  },
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: CmsDetailListComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: CmsDetailAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsDetailRoutingModule {}
