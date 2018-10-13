import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { MapListComponent } from './map-list/map-list.component';
import { MapEditComponent } from './map-edit/map-edit.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: '',
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
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule]
})
export class MapRoutingModule {
}
