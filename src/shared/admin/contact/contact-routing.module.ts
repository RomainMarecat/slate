import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AdminGuard } from '../../guard/admin.guard';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: ContactComponent,
    data: {
      breadcrumb: 'breadcrumb.contacts.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: ContactListComponent,
        data: {
          breadcrumb: 'breadcrumb.contacts.list'
        },
      },
      {
        path: 'detail/:key',
        canActivate: [AdminGuard],
        component: ContactDetailComponent,
        data: {
          breadcrumb: 'breadcrumb.contacts.detail'
        },
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule]
})
export class ContactRoutingModule {
}
