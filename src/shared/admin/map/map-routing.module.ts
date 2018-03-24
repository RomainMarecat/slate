import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { MapListComponent } from './map-list/map-list.component';
import { MapEditComponent } from './map-edit/map-edit.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'list',
  canActivate: [AdminGuard],
  component: MapListComponent
},
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: MapListComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: MapEditComponent
  },
  {
    path: 'edit/:key',
    canActivate: [AdminGuard],
    component: MapEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }