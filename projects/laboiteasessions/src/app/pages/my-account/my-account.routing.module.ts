import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { MyAccountComponent } from './my-account.component';

const myAccountRoutes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        override: true,
        title: 'Mon Compte',
        description: 'laboiteasessions - Mon Compte'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(myAccountRoutes)],
  exports: [RouterModule],
})
export class MyAccountRoutingModule {
}
