import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './../shared/guard/admin.guard';

const routes: Routes = [{
    path: '',
    component: HomeComponent
  },
  {
    canActivate: [AdminGuard],
    path: 'category',
    loadChildren: './navigation/category/category.module#CategoryModule'
  },
  {
    canActivate: [AdminGuard],
    path: 'cms',
    loadChildren: './cms/cms.module#CmsModule'
  },
  {
    canActivate: [AdminGuard],
    path: 'post',
    loadChildren: './post/post.module#PostModule'
  },
  {
    canActivate: [AdminGuard],
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
