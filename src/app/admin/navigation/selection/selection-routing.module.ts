import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../../../core/shared/guard/admin.guard';
import { SelectionComponent } from './selection.component';
import { SelectionListComponent } from './selection-list/selection-list.component';

const routes: Routes = [
{
  path: 'selection',
  pathMatch: 'full',
  canActivate: [AdminGuard],
  children: [{
      path: '',
      component: SelectionComponent
    },
    {
      path: 'list',
      component: SelectionListComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectionRoutingModule { }
