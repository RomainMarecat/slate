import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileListComponent } from './profile-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileListComponent
  },
  {
    path: ':sport',
    component: ProfileListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileListRoutingModule {
}
