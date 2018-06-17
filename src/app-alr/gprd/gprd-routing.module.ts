import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GprdComponent } from './gprd/gprd.component';

const routes: Routes = [
  {path: 'gprd', component: GprdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GprdRoutingModule {
}
