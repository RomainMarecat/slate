import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'list',
    canActivate: [AdminGuard],
    component: PartnerListComponent
  },
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: PartnerListComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: PartnerEditComponent
  },
  {
    path: 'edit/:key',
    canActivate: [AdminGuard],
    component: PartnerEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule {}
