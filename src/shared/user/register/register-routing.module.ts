import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterListComponent } from 'shared/user/register/register-list/register-list.component';
import { Register1Component } from 'shared/user/register/register1/register1.component';

const routes: Routes = [
  {
    path: 'users/registers',
    children: [
      {
        path: '',
        component: RegisterListComponent,
      },
      {
        path: 'register1',
        component: Register1Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
