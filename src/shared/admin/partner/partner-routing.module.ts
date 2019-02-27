import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';
import { LocalizeRouterModule } from 'localize-router';
import { PartnerComponent } from './partner/partner.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: PartnerComponent,
    data: {
      breadcrumb: 'breadcrumb.partner.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: PartnerListComponent,
        data: {
          breadcrumb: 'breadcrumb.partner.list'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: PartnerEditComponent,
        data: {
          breadcrumb: 'breadcrumb.partner.add'
        },
      },
      {
        path: 'edit/:key',
        canActivate: [AdminGuard],
        component: PartnerEditComponent,
        data: {
          breadcrumb: 'breadcrumb.partner.edit'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule]
})
export class PartnerRoutingModule {
}
