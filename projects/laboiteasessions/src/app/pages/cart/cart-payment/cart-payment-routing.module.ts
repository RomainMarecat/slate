import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPaymentComponent } from './cart-payment.component';


const routes: Routes = [{
  path: 'cart/payment',
  component: CartPaymentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartPaymentRoutingModule {
}
