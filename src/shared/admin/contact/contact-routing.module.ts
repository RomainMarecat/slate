import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AdminGuard } from '../../guard/admin.guard';

const routes: Routes =  [ {
  path: '',
  redirectTo: 'list',
  canActivate: [ AdminGuard ],
  component: ContactListComponent
},
  {
    path: 'list',
    canActivate: [ AdminGuard ],
    component: ContactListComponent
  },
  {
    path: 'detail/:key',
    canActivate: [ AdminGuard ],
    component: ContactDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
