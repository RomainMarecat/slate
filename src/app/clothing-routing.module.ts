import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClothingAddComponent } from './clothing-add/clothing-add.component';
import { ClothingListComponent } from './clothing-list/clothing-list.component';
import { ClothingDetailComponent } from './clothing-detail/clothing-detail.component';
import { UserGuard } from './shared/guard/user.guard';

const routes: Routes = [{
    // On root we go to root. On other route we start with this route and go on children route
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    children: [{
      path: '',
      component: ClothingListComponent
    }]
  },
  {
    path: 'list',
    component: ClothingListComponent
  },
  {
    path: 'add',
    component: ClothingAddComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'detail/:key',
    component: ClothingDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClothingRoutingModule {}
