import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [{
    // On root we go to root. On other route we start with this route and go on children route
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    children: [{
      path: '',
      pathMatch: 'full',
      component: DashboardComponent
    }]
  },
  {
    path: 'boards',
    loadChildren: './board/board.module#BoardModule'
  },
  {
    path: 'board/:key',
    loadChildren: './board/board.module#BoardModule'
  },
  {
    path: 'admin',
    loadChildren: './../shared/admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
