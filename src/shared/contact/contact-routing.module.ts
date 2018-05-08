import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactAddComponent } from './contact-add/contact-add.component';

const routes: Routes = [
  {
    path: '',
    component: ContactAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
