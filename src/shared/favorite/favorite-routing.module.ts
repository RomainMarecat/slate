import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { FavoriteComponent } from './favorite/favorite.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteComponent,
    children: [
      {
        path: '',
        component: FavoriteListComponent,
        data: {
          breadcrumb: 'breadcrumb.favorite-list',
        },
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class FavoriteRoutingModule {
}
