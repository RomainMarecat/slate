import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportListComponent } from './sport-list.component';


const routes: Routes = [
  {
    path: '',
    component: SportListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportListRoutingModule {
}
