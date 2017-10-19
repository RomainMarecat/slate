import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClothingAddComponent } from './clothing-add/clothing-add.component';
import { ClothingListComponent } from './clothing-list/clothing-list.component';
import { ClothingDetailComponent } from './clothing-detail/clothing-detail.component';
import { ClothingComponent } from './clothing/clothing.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

const routes: Routes = [{
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    children: [{
      path: '',
      component: ComingSoonComponent
    }]
  },
  {
    path: 'list',
    component: ClothingListComponent
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent
  }, {
    path: 'add',
    component: ClothingAddComponent
  }, {
    path: 'detail/:key',
    component: ClothingDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClothingRoutingModule {}
