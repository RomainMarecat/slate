import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdminGuard } from 'shared/guard/admin.guard';

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
  }, {
    path: 'charts',
    loadChildren: './chart/chart.module#ChartModule'
  }, {
    path: 'gprd',
    loadChildren: './gprd/gprd.module#GprdModule'
  },
  {
    path: 'board/:key',
    loadChildren: './board/board.module#BoardModule'
  },
  {
    path: 'admin',
    loadChildren: './../shared/admin/admin.module#AdminModule'
  },
  {
    path: 'material',
    loadChildren: './../shared/material/material.module#MaterialModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
