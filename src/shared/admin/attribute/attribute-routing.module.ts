import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeEditComponent } from './attribute-edit/attribute-edit.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'list',
    canActivate: [AdminGuard],
    component: AttributeListComponent
  },
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: AttributeListComponent
  },
  {
    path: 'edit/:key',
    canActivate: [AdminGuard],
    component: AttributeEditComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: AttributeEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeRoutingModule {}
