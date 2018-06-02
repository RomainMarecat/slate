import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../../guard/admin.guard';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SelectionEditComponent } from './selection-edit/selection-edit.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'list',
    canActivate: [AdminGuard]
  },
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: SelectionListComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: SelectionEditComponent
  },
  {
    path: 'edit/:key',
    canActivate: [AdminGuard],
    component: SelectionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectionRoutingModule {}
