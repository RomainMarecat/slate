import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../../guard/admin.guard';
import { SelectionComponent } from './selection.component';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SelectionAddComponent } from './selection-add/selection-add.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'list',
    canActivate: [AdminGuard],
    component: SelectionComponent
  },
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: SelectionListComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: SelectionAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectionRoutingModule {}
