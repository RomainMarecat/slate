import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: '',
    component: DeliveryComponent,
    children: [
      {
        path: '',
        component: DeliveryListComponent
      },
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
export class DeliveryRoutingModule {
}
