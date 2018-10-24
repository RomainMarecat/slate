import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { A2hsComponent } from './a2hs/a2hs.component';

const routes: Routes = [
  {
    path: '',
    component: A2hsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class A2hsRoutingModule {
}
