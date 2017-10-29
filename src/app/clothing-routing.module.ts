import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClothingAddComponent } from './clothing-add/clothing-add.component';
import { ClothingListComponent } from './clothing-list/clothing-list.component';
import { ClothingDetailComponent } from './clothing-detail/clothing-detail.component';
import { ClothingComponent } from './clothing/clothing.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UserGuard } from './shared/guard/user.guard';

const routes: Routes = [{
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
    path: 'coming-soon',
    component: ComingSoonComponent
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
