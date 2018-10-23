import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import { UserGuard } from '../guard/user.guard';
import { CartComponent } from './cart/cart.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { CartStartComponent } from './cart-start/cart-start.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    children: [
      {
        path: '',
        component: CartStartComponent
      },
      {
        path: ':key/payment',
        canActivate: [UserGuard],
        component: CartPaymentComponent
      },
    ]
  }
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
export class CartRoutingModule {
}
