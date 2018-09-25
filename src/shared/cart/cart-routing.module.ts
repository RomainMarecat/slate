import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import { UserGuard } from '../guard/user.guard';
import { CartComponent } from './cart/cart.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: ':key/payment',
    canActivate: [UserGuard],
    component: CartPaymentComponent
  },
  {
    path: 'index',
    component: CartComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class CartRoutingModule {
}
