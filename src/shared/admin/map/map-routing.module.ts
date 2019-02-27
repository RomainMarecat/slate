import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { MapListComponent } from './map-list/map-list.component';
import { MapEditComponent } from './map-edit/map-edit.component';
import { LocalizeRouterModule } from 'localize-router';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: MapComponent,
    data: {
      breadcrumb: 'breadcrumb.map.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: MapListComponent,
        data: {
          breadcrumb: 'breadcrumb.map.list'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: MapEditComponent,
        data: {
          breadcrumb: 'breadcrumb.map.add'
        },
      },
      {
        path: 'edit/:key',
        canActivate: [AdminGuard],
        component: MapEditComponent,
        data: {
          breadcrumb: 'breadcrumb.map.edit'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule]
})
export class MapRoutingModule {
}
