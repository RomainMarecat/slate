import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AdminGuard ],
    component: SummaryComponent
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MaterialRoutingModule {
}
