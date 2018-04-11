import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRootComponent } from './core/root.component';

const routes: Routes = [{
    // On root we go to root. On other route we start with this route and go on children route
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    children: [{
      path: '',
      pathMatch: 'full',
      component: AppRootComponent
    }]
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
