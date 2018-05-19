import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import { UserGuard } from '../guard/user.guard';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: 'cart/:key/payment',
    canActivate: [UserGuard],
    component: CartPaymentComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
